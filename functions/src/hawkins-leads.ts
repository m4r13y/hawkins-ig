import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getApps } from 'firebase-admin/app';
import { 
  rateLimit, 
  sanitizeObject, 
  validateLeadData, 
  detectSuspiciousActivity,
  logSecurityEvent 
} from './security';
import { createLeadWithNote } from './agencybloc-service';

// Helper function to retry failed AgencyBloc syncs
export const retryAgencyBlocSync = functions.https.onCall(async (data: { leadId?: string }, context) => {
  try {
    // Only allow authenticated users (agents/admins)
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
    }

    let query = leadsCollection.where('submission.agencyBlocSynced', '==', false);
    
    // If specific leadId provided, only retry that one
    if (data.leadId) {
      const docRef = leadsCollection.doc(data.leadId);
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new functions.https.HttpsError('not-found', 'Lead not found');
      }
      const leadData = doc.data();
      
      // Check if it needs retry
      if (leadData?.submission?.agencyBlocSynced !== false) {
        return { success: true, message: 'Lead already synced', processed: 0 };
      }
      
      // Process single lead
      const result = await processLeadForAgencyBloc(doc.id, leadData);
      return { success: true, message: 'Retry completed', processed: 1, results: [result] };
    }

    // Get failed syncs (limit to 10 per call to avoid timeouts)
    const failedSyncs = await query.limit(10).get();
    const results = [];
    
    for (const doc of failedSyncs.docs) {
      const leadData = doc.data();
      const result = await processLeadForAgencyBloc(doc.id, leadData);
      results.push(result);
    }

    return {
      success: true,
      message: `Processed ${results.length} failed syncs`,
      processed: results.length,
      results
    };

  } catch (error) {
    console.error('Error retrying AgencyBloc sync:', error);
    throw new functions.https.HttpsError('internal', 'Failed to retry AgencyBloc sync');
  }
});

// Helper function to process a single lead for AgencyBloc
async function processLeadForAgencyBloc(leadId: string, leadData: any) {
  try {
    const submission = leadData.submission || {};
    
    // Prepare AgencyBloc data based on lead type
    let agencyBlocData;
    let formType = 'Unknown Form';
    
    if (submission.clientType) {
      // Insurance lead
      formType = 'Get Started Form';
      agencyBlocData = {
        firstName: leadData['lead-name']?.split(' ')[0] || 'Unknown',
        lastName: leadData['lead-name']?.split(' ').slice(1).join(' ') || 'Lead',
        email: submission.email,
        phone: submission.phone,
        zipCode: submission.zipCode,
        insuranceTypes: submission.insuranceTypes,
        clientType: submission.clientType,
        urgency: submission.urgency,
        familySize: submission.familySize,
        employeeCount: submission.employeeCount,
        agentType: submission.agentType,
        company: submission.company,
        leadId: leadId,
        additionalNotes: `Retry sync | Lead ID: ${leadId} | Client Type: ${submission.clientType}`,
      };
    } else if (submission.contactType) {
      // Contact lead
      formType = 'Contact Form';
      agencyBlocData = {
        firstName: leadData['lead-name']?.split(' ')[0] || 'Unknown',
        lastName: leadData['lead-name']?.split(' ').slice(1).join(' ') || 'Contact',
        email: submission.email,
        phone: submission.phone || '',
        leadId: leadId,
        message: submission.message,
        additionalNotes: `Retry sync | Contact Form | Message: ${submission.message} | Lead ID: ${leadId}`,
      };
    } else {
      throw new Error('Unknown lead type');
    }

    const agencyBlocResult = await createLeadWithNote(agencyBlocData, formType);
    
    if (agencyBlocResult.success) {
      // Update Firestore with success
      await leadsCollection.doc(leadId).update({
        'submission.agencyBlocRecordId': agencyBlocResult.recordId,
        'submission.agencyBlocSynced': true,
        'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp(),
        'submission.agencyBlocRetryCount': admin.firestore.FieldValue.increment(1)
      });
      
      return { leadId, success: true, recordId: agencyBlocResult.recordId };
    } else {
      // Update failure count
      await leadsCollection.doc(leadId).update({
        'submission.agencyBlocSyncError': agencyBlocResult.error,
        'submission.agencyBlocRetryCount': admin.firestore.FieldValue.increment(1),
        'submission.lastRetryAttempt': admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { leadId, success: false, error: agencyBlocResult.error };
    }
  } catch (error) {
    console.error(`Error processing lead ${leadId} for AgencyBloc:`, error);
    return { leadId, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Initialize Firebase Admin with your existing configuration
// Since you have existing functions, this should already be initialized
let app;
try {
  app = admin.initializeApp();
} catch (error) {
  // App already initialized, get the default app
  app = getApps()[0];
}

// Use Firestore with explicit database ID for hawknest-database
// This follows the same pattern as your hawknest-admin functions
const db = getFirestore(app, "hawknest-database");

// Collection reference for leads
const leadsCollection = db.collection('leads');

// Lead-specific interfaces (different from user/agent data)
interface InsuranceLeadData {
  clientType: string;
  age?: string;
  familySize?: string;
  employeeCount?: string;
  agentType?: string;
  insuranceTypes: string[];
  urgency: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  zipCode: string;
  source: string;
  leadStatus: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
}

interface ContactLeadData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  leadStatus: 'new';
}

// Validation functions - moved to security.ts for reuse

// NEW LEAD FUNCTIONS - These won't conflict with your existing user/agent functions

// OPTIMIZED VERSION: Minimal lead submission for speed
export const submitInsuranceLeadFast = functions.https.onCall(async (data: InsuranceLeadData, context) => {
  try {
    // Minimal validation for speed
    if (!data.name || !data.email) {
      throw new functions.https.HttpsError('invalid-argument', 'Name and email required');
    }

    // Simplified lead data structure
    const leadData = {
      'lead-name': data.name,
      'date-time': admin.firestore.FieldValue.serverTimestamp(),
      source: 'hawkins-ig-website',
      submission: {
        clientType: data.clientType,
        insuranceTypes: data.insuranceTypes || [],
        urgency: data.urgency,
        email: data.email,
        phone: data.phone,
        zipCode: data.zipCode,
        leadStatus: 'new',
        // Minimal tracking
        ipAddress: context.rawRequest?.ip || 'unknown',
        formSource: data.source || 'get-started-flow',
        // Mark for background processing
        agencyBlocSynced: false,
        needsProcessing: true
      }
    };

    // Save to Firestore immediately
    const docRef = await leadsCollection.add(leadData);

    // Return success immediately (no AgencyBloc wait)
    return {
      success: true,
      leadId: docRef.id,
      message: 'Lead captured successfully'
    };

  } catch (error) {
    console.error('Error submitting insurance lead (fast):', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to capture lead');
  }
});

// Original version with full security (keep for high-security scenarios)
export const submitInsuranceLead = functions.https.onCall(async (data: InsuranceLeadData, context) => {
  try {
    // Security: Rate limiting
    if (!rateLimit(context.rawRequest)) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        ip: context.rawRequest?.ip,
        userAgent: context.rawRequest?.headers?.['user-agent']
      });
      throw new functions.https.HttpsError('resource-exhausted', 'Too many requests');
    }

    // Security: Sanitize input data
    const sanitizedData = sanitizeObject(data) as InsuranceLeadData;

    // Security: Validate data
    const validation = validateLeadData(sanitizedData);
    if (!validation.valid) {
      throw new functions.https.HttpsError('invalid-argument', validation.errors.join(', '));
    }

    // Security: Detect suspicious activity
    if (detectSuspiciousActivity(sanitizedData, context)) {
      throw new functions.https.HttpsError('permission-denied', 'Submission blocked for security reasons');
    }

    // Prepare lead data with your specified structure
    const leadData = {
      'lead-name': sanitizedData.name,
      'date-time': admin.firestore.FieldValue.serverTimestamp(),
      source: context.rawRequest?.headers?.referer || 'hawkins-ig-website',
      submission: {
        // Core submission details
        clientType: sanitizedData.clientType,
        age: sanitizedData.age || null,
        familySize: sanitizedData.familySize || null,
        employeeCount: sanitizedData.employeeCount || null,
        agentType: sanitizedData.agentType || null,
        insuranceTypes: sanitizedData.insuranceTypes || [],
        urgency: sanitizedData.urgency,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        company: sanitizedData.company || null,
        zipCode: sanitizedData.zipCode,
        // Additional tracking data
        formSource: sanitizedData.source || 'get-started-flow',
        leadStatus: 'new',
        followUpRequired: true,
        // Security and audit data
        ipAddress: context.rawRequest?.ip || 'unknown',
        userAgent: context.rawRequest?.headers?.['user-agent'] || 'unknown',
        submittedVia: 'hawkins-ig-website',
        // Lead management
        assignedAgent: null,
        lastContactDate: null,
        nextFollowUpDate: null,
        notes: [],
        conversionValue: null,
        // Audit data
        leadQuality: 'standard'
      }
    };

    // Save to leads collection in hawknest-database
    const docRef = await leadsCollection.add(leadData);

    // Log successful lead capture
    console.log('Insurance lead captured successfully:', {
      leadId: docRef.id,
      clientType: sanitizedData.clientType,
      urgency: sanitizedData.urgency
    });

    // Integrate with AgencyBloc CRM (non-blocking)
    try {
      const agencyBlocData = {
        firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
        lastName: sanitizedData.name.split(' ').slice(1).join(' ') || 'Unknown',
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        zipCode: sanitizedData.zipCode,
        insuranceTypes: sanitizedData.insuranceTypes,
        clientType: sanitizedData.clientType,
        age: sanitizedData.age,
        familySize: sanitizedData.familySize,
        employeeCount: sanitizedData.employeeCount,
        agentType: sanitizedData.agentType,
        company: sanitizedData.company,
        urgency: sanitizedData.urgency,
        leadId: docRef.id,
        source: sanitizedData.source || 'get-started-flow',
        ipAddress: context.rawRequest?.ip || 'unknown',
        userAgent: context.rawRequest?.headers?.['user-agent'] || 'unknown',
        additionalNotes: `Firestore Lead ID: ${docRef.id} | Client Type: ${sanitizedData.clientType} | Timeline: ${sanitizedData.urgency}`,
      };

      const agencyBlocResult = await createLeadWithNote(agencyBlocData, 'Get Started Form');
      
      if (agencyBlocResult.success) {
        console.log('AgencyBloc lead created:', agencyBlocResult.recordId);
        // Update Firestore record with AgencyBloc ID
        await docRef.update({
          'submission.agencyBlocRecordId': agencyBlocResult.recordId,
          'submission.agencyBlocSynced': true,
          'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        console.warn('AgencyBloc integration failed:', agencyBlocResult.error);
        // Update Firestore record to note sync failure (for retry later)
        await docRef.update({
          'submission.agencyBlocSynced': false,
          'submission.agencyBlocSyncError': agencyBlocResult.error,
          'submission.agencyBlocSyncAttempted': admin.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (agencyBlocError) {
      console.error('AgencyBloc integration error (non-blocking):', agencyBlocError);
      // Don't throw - AgencyBloc failure shouldn't prevent Firestore success
    }

    return {
      success: true,
      leadId: docRef.id,
      message: 'Lead captured successfully'
    };

  } catch (error) {
    console.error('Error submitting insurance lead:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to capture lead');
  }
});

// Submit Contact Lead
export const submitContactLead = functions.https.onCall(async (data: ContactLeadData, context) => {
  try {
    // Security: Rate limiting
    if (!rateLimit(context.rawRequest)) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        ip: context.rawRequest?.ip,
        userAgent: context.rawRequest?.headers?.['user-agent']
      });
      throw new functions.https.HttpsError('resource-exhausted', 'Too many requests');
    }

    // Security: Sanitize input data
    const sanitizedData = sanitizeObject(data) as ContactLeadData;

    // Security: Basic validation for contact form
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    // Security: Detect suspicious activity
    if (detectSuspiciousActivity(sanitizedData, context)) {
      throw new functions.https.HttpsError('permission-denied', 'Submission blocked for security reasons');
    }

    // Prepare contact lead data with your specified structure
    const contactLeadData = {
      'lead-name': sanitizedData.name,
      'date-time': admin.firestore.FieldValue.serverTimestamp(),
      source: context.rawRequest?.headers?.referer || 'hawkins-ig-website',
      submission: {
        // Core contact submission details
        contactType: 'general-inquiry',
        email: sanitizedData.email,
        phone: sanitizedData.phone || null,
        message: sanitizedData.message,
        // Lead management data
        leadStatus: 'new',
        followUpRequired: true,
        // Security and audit data
        ipAddress: context.rawRequest?.ip || 'unknown',
        userAgent: context.rawRequest?.headers?.['user-agent'] || 'unknown',
        submittedVia: 'hawkins-ig-website',
        formSource: sanitizedData.source || 'contact-form',
        // Lead management
        assignedAgent: null,
        lastContactDate: null,
        nextFollowUpDate: null,
        notes: [],
        conversionValue: null,
        leadQuality: 'low' // Contact forms start as low priority
      }
    };

    // Save to leads collection in hawknest-database
    const docRef = await leadsCollection.add(contactLeadData);

    // Log successful contact lead
    console.log('Contact lead captured successfully:', docRef.id);

    // Integrate with AgencyBloc CRM (non-blocking)
    try {
      const agencyBlocData = {
        firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
        lastName: sanitizedData.name.split(' ').slice(1).join(' ') || 'Unknown',
        email: sanitizedData.email,
        phone: sanitizedData.phone || '',
        leadId: docRef.id,
        message: sanitizedData.message,
        comments: sanitizedData.message,
        source: sanitizedData.source || 'contact-form',
        ipAddress: context.rawRequest?.ip || 'unknown',
        userAgent: context.rawRequest?.headers?.['user-agent'] || 'unknown',
        additionalNotes: `Contact Form Submission | Firestore Lead ID: ${docRef.id} | Source: Contact Page`,
      };

      const agencyBlocResult = await createLeadWithNote(agencyBlocData, 'Contact Form');
      
      if (agencyBlocResult.success) {
        console.log('AgencyBloc contact lead created:', agencyBlocResult.recordId);
        // Update Firestore record with AgencyBloc ID
        await docRef.update({
          'submission.agencyBlocRecordId': agencyBlocResult.recordId,
          'submission.agencyBlocSynced': true,
          'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        console.warn('AgencyBloc contact integration failed:', agencyBlocResult.error);
        // Update Firestore record to note sync failure (for retry later)
        await docRef.update({
          'submission.agencyBlocSynced': false,
          'submission.agencyBlocSyncError': agencyBlocResult.error,
          'submission.agencyBlocSyncAttempted': admin.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (agencyBlocError) {
      console.error('AgencyBloc contact integration error (non-blocking):', agencyBlocError);
      // Don't throw - AgencyBloc failure shouldn't prevent Firestore success
    }

    return {
      success: true,
      leadId: docRef.id,
      message: 'Contact lead captured successfully'
    };

  } catch (error) {
    console.error('Error submitting contact lead:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to capture contact lead');
  }
});

// Update Lead Status (for CRM integration)
export const updateLeadStatus = functions.https.onCall(async (data: {
  leadId: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  notes?: string;
}, context) => {
  try {
    if (!data.leadId || !data.status) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing leadId or status');
    }

    // Update data structure to work with new document format
    const updateData: any = {
      'submission.leadStatus': data.status,
      'submission.lastContactDate': admin.firestore.FieldValue.serverTimestamp(),
      'submission.updatedBy': context.auth?.uid || 'system'
    };

    if (data.notes) {
      updateData['submission.notes'] = admin.firestore.FieldValue.arrayUnion({
        note: data.notes,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        addedBy: context.auth?.uid || 'system'
      });
    }

    await leadsCollection.doc(data.leadId).update(updateData);

    console.log('Lead status updated:', data.leadId, data.status);

    return {
      success: true,
      message: 'Lead status updated successfully'
    };

  } catch (error) {
    console.error('Error updating lead status:', error);
    throw new functions.https.HttpsError('internal', 'Failed to update lead status');
  }
});

// Firestore trigger for new leads - sends notification and processes AgencyBloc
export const onNewLeadCreated = functions.firestore
  .database('hawknest-database')
  .document('leads/{leadId}')
  .onCreate(async (snap, context) => {
    const leadData = snap.data();
    const leadId = context.params.leadId;
    const submission = leadData.submission || {};
    
    // Log new lead for monitoring with new structure
    console.log('New lead created:', {
      leadId,
      leadName: leadData['lead-name'],
      clientType: submission.clientType || submission.contactType,
      urgency: submission.urgency || 'not-specified',
      source: leadData.source,
      leadQuality: submission.leadQuality
    });

    // Process AgencyBloc integration in background if needed
    if (submission.needsProcessing && !submission.agencyBlocSynced) {
      try {
        console.log('Processing AgencyBloc integration for lead:', leadId);
        
        // Prepare AgencyBloc data
        const agencyBlocData = {
          firstName: leadData['lead-name']?.split(' ')[0] || 'Unknown',
          lastName: leadData['lead-name']?.split(' ').slice(1).join(' ') || 'Lead',
          email: submission.email,
          phone: submission.phone,
          zipCode: submission.zipCode,
          insuranceType: submission.insuranceTypes?.join(', ') || 'Unknown',
          clientType: submission.clientType,
          urgency: submission.urgency,
          additionalNotes: `Background sync | Lead ID: ${leadId} | Client Type: ${submission.clientType}`,
        };

        const agencyBlocResult = await createLeadWithNote(agencyBlocData, 'Get Started Form');
        
        if (agencyBlocResult.success) {
          // Update with success
          await snap.ref.update({
            'submission.agencyBlocRecordId': agencyBlocResult.recordId,
            'submission.agencyBlocSynced': true,
            'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp(),
            'submission.needsProcessing': false
          });
          console.log('AgencyBloc integration completed for lead:', leadId);
        } else {
          // Mark for retry
          await snap.ref.update({
            'submission.agencyBlocSyncError': agencyBlocResult.error,
            'submission.agencyBlocSyncAttempted': admin.firestore.FieldValue.serverTimestamp()
          });
          console.error('AgencyBloc integration failed for lead:', leadId, agencyBlocResult.error);
        }
      } catch (error) {
        console.error('Background AgencyBloc processing error:', error);
        await snap.ref.update({
          'submission.agencyBlocSyncError': error instanceof Error ? error.message : 'Unknown error',
          'submission.agencyBlocSyncAttempted': admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }
    
    return null;
  });

// Get Lead Analytics (for dashboard)
export const getLeadAnalytics = functions.https.onCall(async (data, context) => {
  try {
    // Only allow authenticated users (agents/admins)
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
    }

    const now = admin.firestore.Timestamp.now();
    const thirtyDaysAgo = admin.firestore.Timestamp.fromMillis(now.toMillis() - (30 * 24 * 60 * 60 * 1000));

    // Get leads from last 30 days using the new date-time field
    const leadsSnapshot = await leadsCollection
      .where('date-time', '>=', thirtyDaysAgo)
      .get();

    const analytics = {
      totalLeads: leadsSnapshot.size,
      newLeads: 0,
      contactedLeads: 0,
      qualifiedLeads: 0,
      convertedLeads: 0,
      leadsBySource: {} as Record<string, number>,
      leadsByClientType: {} as Record<string, number>
    };

    leadsSnapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const leadData = doc.data();
      const submission = leadData.submission || {};
      
      // Status counts (from submission data)
      if (submission.leadStatus === 'new') analytics.newLeads++;
      else if (submission.leadStatus === 'contacted') analytics.contactedLeads++;
      else if (submission.leadStatus === 'qualified') analytics.qualifiedLeads++;
      else if (submission.leadStatus === 'converted') analytics.convertedLeads++;

      // Source breakdown (using top-level source field)
      const source = leadData.source || 'unknown';
      analytics.leadsBySource[source] = (analytics.leadsBySource[source] || 0) + 1;

      // Client type breakdown (from submission data)
      const clientType = submission.clientType || submission.contactType || 'unknown';
      analytics.leadsByClientType[clientType] = (analytics.leadsByClientType[clientType] || 0) + 1;
    });

    return analytics;

  } catch (error) {
    console.error('Error getting lead analytics:', error);
    throw new functions.https.HttpsError('internal', 'Failed to get analytics');
  }
});

// Waitlist submission interface
interface WaitlistData {
  name: string;
  email: string;
  feature: string;
  product: string; // hawknest or hawknest-admin
}

// Newsletter subscription interface
interface NewsletterData {
  email: string;
  name?: string;
  source?: string;
}

// Submit newsletter subscription
export const submitNewsletterSubscription = functions.https.onCall(async (data: NewsletterData, context) => {
  try {
    // Rate limiting check
    const clientIP = context.rawRequest.ip;
    if (!rateLimit(context.rawRequest)) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { ip: clientIP, action: 'newsletter_subscription' });
      throw new functions.https.HttpsError('resource-exhausted', 'Too many requests. Please try again later.');
    }

    // Validate and sanitize input
    const sanitizedData = sanitizeObject(data);
    
    // Basic validation
    if (!sanitizedData.email) {
      throw new functions.https.HttpsError('invalid-argument', 'Email is required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email format');
    }

    // Check for suspicious activity
    if (detectSuspiciousActivity(sanitizedData, context)) {
      logSecurityEvent('SUSPICIOUS_ACTIVITY', { ip: clientIP, data: sanitizedData, action: 'newsletter_subscription' });
      throw new functions.https.HttpsError('invalid-argument', 'Submission blocked for security reasons');
    }

    // Create newsletter subscription entry
    const newsletterEntry = {
      email: sanitizedData.email,
      name: sanitizedData.name || '',
      source: sanitizedData.source || 'website',
      subscribedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      clientIP: clientIP
    };

    // Check for duplicate email
    const existingEntry = await db.collection('newsletter')
      .where('email', '==', sanitizedData.email)
      .limit(1)
      .get();

    if (!existingEntry.empty) {
      // Update existing entry instead of creating duplicate
      const docRef = existingEntry.docs[0].ref;
      await docRef.update({
        name: sanitizedData.name || '',
        source: sanitizedData.source || 'website',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active' // Reactivate if previously unsubscribed
      });

      // AgencyBloc integration for newsletter updates (non-blocking)
      try {
        if (sanitizedData.name) {
          const agencyBlocData = {
            firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
            lastName: sanitizedData.name.split(' ').slice(1).join(' ') || 'Newsletter',
            email: sanitizedData.email,
            source: sanitizedData.source || 'newsletter-update',
            ipAddress: clientIP,
            userAgent: context.rawRequest?.headers?.['user-agent'] || 'unknown',
            additionalNotes: `Newsletter subscription updated | Source: ${sanitizedData.source} | Firestore ID: ${docRef.id}`,
          };

          const agencyBlocResult = await createLeadWithNote(agencyBlocData, 'Newsletter Update');
          if (agencyBlocResult.success) {
            console.log('AgencyBloc newsletter update recorded:', agencyBlocResult.recordId);
          }
        }
      } catch (agencyBlocError) {
        console.error('AgencyBloc newsletter integration error (non-blocking):', agencyBlocError);
      }
      
      return { 
        success: true, 
        message: 'Your subscription has been updated successfully!',
        id: docRef.id 
      };
    } else {
      // Create new entry
      const docRef = await db.collection('newsletter').add(newsletterEntry);

      // AgencyBloc integration for new newsletter subscriptions (non-blocking)
      try {
        if (sanitizedData.name) {
          const agencyBlocData = {
            firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
            lastName: sanitizedData.name.split(' ').slice(1).join(' ') || 'Newsletter',
            email: sanitizedData.email,
            source: sanitizedData.source || 'newsletter-signup',
            ipAddress: clientIP,
            userAgent: context.rawRequest?.headers?.['user-agent'] || 'unknown',
            additionalNotes: `Newsletter subscription | Source: ${sanitizedData.source} | Firestore ID: ${docRef.id}`,
          };

          const agencyBlocResult = await createLeadWithNote(agencyBlocData, 'Newsletter Subscription');
          if (agencyBlocResult.success) {
            console.log('AgencyBloc newsletter lead created:', agencyBlocResult.recordId);
            // Update Firestore record with AgencyBloc ID
            await docRef.update({
              agencyBlocRecordId: agencyBlocResult.recordId,
              agencyBlocSynced: true,
              agencyBlocSyncDate: admin.firestore.FieldValue.serverTimestamp()
            });
          }
        }
      } catch (agencyBlocError) {
        console.error('AgencyBloc newsletter integration error (non-blocking):', agencyBlocError);
      }
      
      return { 
        success: true, 
        message: 'Thank you for subscribing! You\'ll receive updates about your coverage.',
        id: docRef.id 
      };
    }

  } catch (error) {
    console.error('Error submitting newsletter subscription:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to submit newsletter subscription');
  }
});

// Submit waitlist entry
export const submitWaitlistEntry = functions.https.onCall(async (data: WaitlistData, context) => {
  try {
    // Rate limiting check
    const clientIP = context.rawRequest.ip;
    if (!rateLimit(context.rawRequest)) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { ip: clientIP, action: 'waitlist_submission' });
      throw new functions.https.HttpsError('resource-exhausted', 'Too many requests. Please try again later.');
    }

    // Validate and sanitize input
    const sanitizedData = sanitizeObject(data);
    
    // Basic validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.feature || !sanitizedData.product) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email format');
    }

    // Check for suspicious activity
    if (detectSuspiciousActivity(sanitizedData, context)) {
      logSecurityEvent('SUSPICIOUS_ACTIVITY', { ip: clientIP, data: sanitizedData, action: 'waitlist_submission' });
      throw new functions.https.HttpsError('invalid-argument', 'Submission blocked for security reasons');
    }

    // Create waitlist entry
    const waitlistEntry = {
      ...sanitizedData,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      source: 'website',
      clientIP: clientIP
    };

    // Check for duplicate email for same product
    const existingEntry = await db.collection('waitlist')
      .where('email', '==', sanitizedData.email)
      .where('product', '==', sanitizedData.product)
      .limit(1)
      .get();

    if (!existingEntry.empty) {
      // Update existing entry instead of creating duplicate
      const docRef = existingEntry.docs[0].ref;
      await docRef.update({
        name: sanitizedData.name,
        feature: sanitizedData.feature,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { 
        success: true, 
        message: 'Your waitlist entry has been updated successfully!',
        id: docRef.id 
      };
    } else {
      // Create new entry
      const docRef = await db.collection('waitlist').add(waitlistEntry);
      
      return { 
        success: true, 
        message: 'Thank you for joining the waitlist! We\'ll notify you when it\'s ready.',
        id: docRef.id 
      };
    }

  } catch (error) {
    console.error('Error submitting waitlist entry:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to submit waitlist entry');
  }
});
