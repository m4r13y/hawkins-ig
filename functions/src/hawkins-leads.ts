import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { 
  rateLimit, 
  sanitizeObject, 
  validateLeadData, 
  detectSuspiciousActivity,
  logSecurityEvent 
} from './security';

// Initialize Firebase Admin with your existing configuration
// Since you have existing functions, this should already be initialized
let app;
try {
  app = admin.initializeApp();
} catch (error) {
  // App already initialized, get the default app
  const { getApps } = require("firebase-admin/app");
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
  leadScore?: number;
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

// Calculate lead score based on form data
function calculateLeadScore(data: InsuranceLeadData): number {
  let score = 0;
  
  // Urgency scoring
  if (data.urgency === 'immediate') score += 30;
  else if (data.urgency === 'within-30-days') score += 20;
  else if (data.urgency === 'within-3-months') score += 10;
  
  // Insurance types count (more types = higher score)
  score += data.insuranceTypes.length * 5;
  
  // Client type scoring
  if (data.clientType === 'business') score += 25;
  else if (data.clientType === 'family') score += 15;
  else if (data.clientType === 'individual') score += 10;
  
  // Age scoring for Medicare-related products
  if (data.age && parseInt(data.age) >= 65) score += 20;
  else if (data.age && parseInt(data.age) >= 60) score += 10;
  
  // Company name provided (business leads)
  if (data.company) score += 15;
  
  return Math.min(score, 100); // Cap at 100
}

// NEW LEAD FUNCTIONS - These won't conflict with your existing user/agent functions

// Submit Insurance Lead from Get Started Flow
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

    // Calculate lead score
    const leadScore = calculateLeadScore(sanitizedData);

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
        leadScore: leadScore,
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
        leadQuality: leadScore >= 70 ? 'high' : leadScore >= 40 ? 'medium' : 'low'
      }
    };

    // Save to leads collection in hawknest-database
    const docRef = await leadsCollection.add(leadData);

    // Log successful lead capture
    console.log('Insurance lead captured successfully:', {
      leadId: docRef.id,
      leadScore,
      clientType: sanitizedData.clientType,
      urgency: sanitizedData.urgency
    });

    return {
      success: true,
      leadId: docRef.id,
      leadScore,
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
        leadScore: 25, // Base score for contact form submissions
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

// Firestore trigger for new leads - sends notification
export const onNewLeadCreated = functions.firestore
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
      leadScore: submission.leadScore,
      source: leadData.source,
      leadQuality: submission.leadQuality
    });

    // You can add email notifications, CRM integrations, etc. here
    // For example, integrate with your existing notification system
    
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
      averageLeadScore: 0,
      leadsBySource: {} as Record<string, number>,
      leadsByClientType: {} as Record<string, number>
    };

    let totalScore = 0;

    leadsSnapshot.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const leadData = doc.data();
      const submission = leadData.submission || {};
      
      // Status counts (from submission data)
      if (submission.leadStatus === 'new') analytics.newLeads++;
      else if (submission.leadStatus === 'contacted') analytics.contactedLeads++;
      else if (submission.leadStatus === 'qualified') analytics.qualifiedLeads++;
      else if (submission.leadStatus === 'converted') analytics.convertedLeads++;

      // Lead score average (from submission data)
      totalScore += submission.leadScore || 0;

      // Source breakdown (using top-level source field)
      const source = leadData.source || 'unknown';
      analytics.leadsBySource[source] = (analytics.leadsBySource[source] || 0) + 1;

      // Client type breakdown (from submission data)
      const clientType = submission.clientType || submission.contactType || 'unknown';
      analytics.leadsByClientType[clientType] = (analytics.leadsByClientType[clientType] || 0) + 1;
    });

    analytics.averageLeadScore = analytics.totalLeads > 0 ? Math.round(totalScore / analytics.totalLeads) : 0;

    return analytics;

  } catch (error) {
    console.error('Error getting lead analytics:', error);
    throw new functions.https.HttpsError('internal', 'Failed to get analytics');
  }
});
