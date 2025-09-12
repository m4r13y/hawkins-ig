"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitWaitlistEntry = exports.submitNewsletterSubscription = exports.getLeadAnalytics = exports.onNewLeadCreated = exports.updateLeadStatus = exports.submitContactLead = exports.submitInsuranceLead = exports.retryAgencyBlocSync = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
const security_1 = require("./security");
const agencybloc_service_1 = require("./agencybloc-service");
// Helper function to retry failed AgencyBloc syncs
exports.retryAgencyBlocSync = functions.https.onCall(async (data, context) => {
    var _a;
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
            if (((_a = leadData === null || leadData === void 0 ? void 0 : leadData.submission) === null || _a === void 0 ? void 0 : _a.agencyBlocSynced) !== false) {
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
    }
    catch (error) {
        console.error('Error retrying AgencyBloc sync:', error);
        throw new functions.https.HttpsError('internal', 'Failed to retry AgencyBloc sync');
    }
});
// Helper function to process a single lead for AgencyBloc
async function processLeadForAgencyBloc(leadId, leadData) {
    var _a, _b, _c, _d, _e;
    try {
        const submission = leadData.submission || {};
        // Prepare AgencyBloc data based on lead type
        let agencyBlocData;
        let formType = 'Unknown Form';
        if (submission.clientType) {
            // Insurance lead
            formType = 'Get Started Form';
            agencyBlocData = {
                firstName: ((_a = leadData['lead-name']) === null || _a === void 0 ? void 0 : _a.split(' ')[0]) || 'Unknown',
                lastName: ((_b = leadData['lead-name']) === null || _b === void 0 ? void 0 : _b.split(' ').slice(1).join(' ')) || 'Lead',
                email: submission.email,
                phone: submission.phone,
                zipCode: submission.zipCode,
                insuranceType: ((_c = submission.insuranceTypes) === null || _c === void 0 ? void 0 : _c.join(', ')) || 'Unknown',
                clientType: submission.clientType,
                urgency: submission.urgency,
                leadScore: submission.leadScore,
                householdSize: submission.familySize,
                employeeCount: submission.employeeCount,
                agentType: submission.agentType,
                company: submission.company,
                additionalNotes: `Retry sync | Lead ID: ${leadId} | Client Type: ${submission.clientType}`,
            };
        }
        else if (submission.contactType) {
            // Contact lead
            formType = 'Contact Form';
            agencyBlocData = {
                firstName: ((_d = leadData['lead-name']) === null || _d === void 0 ? void 0 : _d.split(' ')[0]) || 'Unknown',
                lastName: ((_e = leadData['lead-name']) === null || _e === void 0 ? void 0 : _e.split(' ').slice(1).join(' ')) || 'Contact',
                email: submission.email,
                phone: submission.phone || '',
                insuranceType: 'General Inquiry',
                leadScore: submission.leadScore || 25,
                additionalNotes: `Retry sync | Contact Form | Message: ${submission.message} | Lead ID: ${leadId}`,
                comments: submission.message,
            };
        }
        else {
            throw new Error('Unknown lead type');
        }
        const agencyBlocResult = await (0, agencybloc_service_1.createLeadWithNote)(agencyBlocData, formType);
        if (agencyBlocResult.success) {
            // Update Firestore with success
            await leadsCollection.doc(leadId).update({
                'submission.agencyBlocRecordId': agencyBlocResult.recordId,
                'submission.agencyBlocSynced': true,
                'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp(),
                'submission.agencyBlocRetryCount': admin.firestore.FieldValue.increment(1)
            });
            return { leadId, success: true, recordId: agencyBlocResult.recordId };
        }
        else {
            // Update failure count
            await leadsCollection.doc(leadId).update({
                'submission.agencyBlocSyncError': agencyBlocResult.error,
                'submission.agencyBlocRetryCount': admin.firestore.FieldValue.increment(1),
                'submission.lastRetryAttempt': admin.firestore.FieldValue.serverTimestamp()
            });
            return { leadId, success: false, error: agencyBlocResult.error };
        }
    }
    catch (error) {
        console.error(`Error processing lead ${leadId} for AgencyBloc:`, error);
        return { leadId, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}
// Initialize Firebase Admin with your existing configuration
// Since you have existing functions, this should already be initialized
let app;
try {
    app = admin.initializeApp();
}
catch (error) {
    // App already initialized, get the default app
    app = (0, app_1.getApps)()[0];
}
// Use Firestore with explicit database ID for hawknest-database
// This follows the same pattern as your hawknest-admin functions
const db = (0, firestore_1.getFirestore)(app, "hawknest-database");
// Collection reference for leads
const leadsCollection = db.collection('leads');
// Validation functions - moved to security.ts for reuse
// Calculate lead score based on form data
function calculateLeadScore(data) {
    let score = 0;
    // Urgency scoring
    if (data.urgency === 'immediate')
        score += 30;
    else if (data.urgency === 'within-30-days')
        score += 20;
    else if (data.urgency === 'within-3-months')
        score += 10;
    // Insurance types count (more types = higher score)
    score += data.insuranceTypes.length * 5;
    // Client type scoring
    if (data.clientType === 'business')
        score += 25;
    else if (data.clientType === 'family')
        score += 15;
    else if (data.clientType === 'individual')
        score += 10;
    // Age scoring for Medicare-related products
    if (data.age && parseInt(data.age) >= 65)
        score += 20;
    else if (data.age && parseInt(data.age) >= 60)
        score += 10;
    // Company name provided (business leads)
    if (data.company)
        score += 15;
    return Math.min(score, 100); // Cap at 100
}
// NEW LEAD FUNCTIONS - These won't conflict with your existing user/agent functions
// Submit Insurance Lead from Get Started Flow
exports.submitInsuranceLead = functions.https.onCall(async (data, context) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        // Security: Rate limiting
        if (!(0, security_1.rateLimit)(context.rawRequest)) {
            (0, security_1.logSecurityEvent)('RATE_LIMIT_EXCEEDED', {
                ip: (_a = context.rawRequest) === null || _a === void 0 ? void 0 : _a.ip,
                userAgent: (_c = (_b = context.rawRequest) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c['user-agent']
            });
            throw new functions.https.HttpsError('resource-exhausted', 'Too many requests');
        }
        // Security: Sanitize input data
        const sanitizedData = (0, security_1.sanitizeObject)(data);
        // Security: Validate data
        const validation = (0, security_1.validateLeadData)(sanitizedData);
        if (!validation.valid) {
            throw new functions.https.HttpsError('invalid-argument', validation.errors.join(', '));
        }
        // Security: Detect suspicious activity
        if ((0, security_1.detectSuspiciousActivity)(sanitizedData, context)) {
            throw new functions.https.HttpsError('permission-denied', 'Submission blocked for security reasons');
        }
        // Calculate lead score
        const leadScore = calculateLeadScore(sanitizedData);
        // Prepare lead data with your specified structure
        const leadData = {
            'lead-name': sanitizedData.name,
            'date-time': admin.firestore.FieldValue.serverTimestamp(),
            source: ((_e = (_d = context.rawRequest) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e.referer) || 'hawkins-ig-website',
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
                ipAddress: ((_f = context.rawRequest) === null || _f === void 0 ? void 0 : _f.ip) || 'unknown',
                userAgent: ((_h = (_g = context.rawRequest) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h['user-agent']) || 'unknown',
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
        // Integrate with AgencyBloc CRM (non-blocking)
        try {
            const agencyBlocData = {
                firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
                lastName: sanitizedData.name.split(' ').slice(1).join(' ') || 'Unknown',
                email: sanitizedData.email,
                phone: sanitizedData.phone,
                zipCode: sanitizedData.zipCode,
                insuranceType: sanitizedData.insuranceTypes.join(', '),
                clientType: sanitizedData.clientType,
                urgency: sanitizedData.urgency,
                leadScore: leadScore,
                householdSize: sanitizedData.familySize,
                employeeCount: sanitizedData.employeeCount,
                agentType: sanitizedData.agentType,
                company: sanitizedData.company,
                additionalNotes: `Lead ID: ${docRef.id} | Client Type: ${sanitizedData.clientType} | Urgency: ${sanitizedData.urgency}`,
            };
            const agencyBlocResult = await (0, agencybloc_service_1.createLeadWithNote)(agencyBlocData, 'Get Started Form');
            if (agencyBlocResult.success) {
                console.log('AgencyBloc lead created:', agencyBlocResult.recordId);
                // Update Firestore record with AgencyBloc ID
                await docRef.update({
                    'submission.agencyBlocRecordId': agencyBlocResult.recordId,
                    'submission.agencyBlocSynced': true,
                    'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp()
                });
            }
            else {
                console.warn('AgencyBloc integration failed:', agencyBlocResult.error);
                // Update Firestore record to note sync failure (for retry later)
                await docRef.update({
                    'submission.agencyBlocSynced': false,
                    'submission.agencyBlocSyncError': agencyBlocResult.error,
                    'submission.agencyBlocSyncAttempted': admin.firestore.FieldValue.serverTimestamp()
                });
            }
        }
        catch (agencyBlocError) {
            console.error('AgencyBloc integration error (non-blocking):', agencyBlocError);
            // Don't throw - AgencyBloc failure shouldn't prevent Firestore success
        }
        return {
            success: true,
            leadId: docRef.id,
            leadScore,
            message: 'Lead captured successfully'
        };
    }
    catch (error) {
        console.error('Error submitting insurance lead:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'Failed to capture lead');
    }
});
// Submit Contact Lead
exports.submitContactLead = functions.https.onCall(async (data, context) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        // Security: Rate limiting
        if (!(0, security_1.rateLimit)(context.rawRequest)) {
            (0, security_1.logSecurityEvent)('RATE_LIMIT_EXCEEDED', {
                ip: (_a = context.rawRequest) === null || _a === void 0 ? void 0 : _a.ip,
                userAgent: (_c = (_b = context.rawRequest) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c['user-agent']
            });
            throw new functions.https.HttpsError('resource-exhausted', 'Too many requests');
        }
        // Security: Sanitize input data
        const sanitizedData = (0, security_1.sanitizeObject)(data);
        // Security: Basic validation for contact form
        if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
            throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
        }
        // Security: Detect suspicious activity
        if ((0, security_1.detectSuspiciousActivity)(sanitizedData, context)) {
            throw new functions.https.HttpsError('permission-denied', 'Submission blocked for security reasons');
        }
        // Prepare contact lead data with your specified structure
        const contactLeadData = {
            'lead-name': sanitizedData.name,
            'date-time': admin.firestore.FieldValue.serverTimestamp(),
            source: ((_e = (_d = context.rawRequest) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e.referer) || 'hawkins-ig-website',
            submission: {
                // Core contact submission details
                contactType: 'general-inquiry',
                email: sanitizedData.email,
                phone: sanitizedData.phone || null,
                message: sanitizedData.message,
                // Lead management data
                leadScore: 25,
                leadStatus: 'new',
                followUpRequired: true,
                // Security and audit data
                ipAddress: ((_f = context.rawRequest) === null || _f === void 0 ? void 0 : _f.ip) || 'unknown',
                userAgent: ((_h = (_g = context.rawRequest) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h['user-agent']) || 'unknown',
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
                insuranceType: 'General Inquiry',
                leadScore: 25,
                additionalNotes: `Contact Form Submission | Message: ${sanitizedData.message} | Lead ID: ${docRef.id}`,
                comments: sanitizedData.message,
            };
            const agencyBlocResult = await (0, agencybloc_service_1.createLeadWithNote)(agencyBlocData, 'Contact Form');
            if (agencyBlocResult.success) {
                console.log('AgencyBloc contact lead created:', agencyBlocResult.recordId);
                // Update Firestore record with AgencyBloc ID
                await docRef.update({
                    'submission.agencyBlocRecordId': agencyBlocResult.recordId,
                    'submission.agencyBlocSynced': true,
                    'submission.agencyBlocSyncDate': admin.firestore.FieldValue.serverTimestamp()
                });
            }
            else {
                console.warn('AgencyBloc contact integration failed:', agencyBlocResult.error);
                // Update Firestore record to note sync failure (for retry later)
                await docRef.update({
                    'submission.agencyBlocSynced': false,
                    'submission.agencyBlocSyncError': agencyBlocResult.error,
                    'submission.agencyBlocSyncAttempted': admin.firestore.FieldValue.serverTimestamp()
                });
            }
        }
        catch (agencyBlocError) {
            console.error('AgencyBloc contact integration error (non-blocking):', agencyBlocError);
            // Don't throw - AgencyBloc failure shouldn't prevent Firestore success
        }
        return {
            success: true,
            leadId: docRef.id,
            message: 'Contact lead captured successfully'
        };
    }
    catch (error) {
        console.error('Error submitting contact lead:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'Failed to capture contact lead');
    }
});
// Update Lead Status (for CRM integration)
exports.updateLeadStatus = functions.https.onCall(async (data, context) => {
    var _a, _b;
    try {
        if (!data.leadId || !data.status) {
            throw new functions.https.HttpsError('invalid-argument', 'Missing leadId or status');
        }
        // Update data structure to work with new document format
        const updateData = {
            'submission.leadStatus': data.status,
            'submission.lastContactDate': admin.firestore.FieldValue.serverTimestamp(),
            'submission.updatedBy': ((_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid) || 'system'
        };
        if (data.notes) {
            updateData['submission.notes'] = admin.firestore.FieldValue.arrayUnion({
                note: data.notes,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                addedBy: ((_b = context.auth) === null || _b === void 0 ? void 0 : _b.uid) || 'system'
            });
        }
        await leadsCollection.doc(data.leadId).update(updateData);
        console.log('Lead status updated:', data.leadId, data.status);
        return {
            success: true,
            message: 'Lead status updated successfully'
        };
    }
    catch (error) {
        console.error('Error updating lead status:', error);
        throw new functions.https.HttpsError('internal', 'Failed to update lead status');
    }
});
// Firestore trigger for new leads - sends notification
exports.onNewLeadCreated = functions.firestore
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
        leadScore: submission.leadScore,
        source: leadData.source,
        leadQuality: submission.leadQuality
    });
    // You can add email notifications, CRM integrations, etc. here
    // For example, integrate with your existing notification system
    return null;
});
// Get Lead Analytics (for dashboard)
exports.getLeadAnalytics = functions.https.onCall(async (data, context) => {
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
            leadsBySource: {},
            leadsByClientType: {}
        };
        let totalScore = 0;
        leadsSnapshot.forEach((doc) => {
            const leadData = doc.data();
            const submission = leadData.submission || {};
            // Status counts (from submission data)
            if (submission.leadStatus === 'new')
                analytics.newLeads++;
            else if (submission.leadStatus === 'contacted')
                analytics.contactedLeads++;
            else if (submission.leadStatus === 'qualified')
                analytics.qualifiedLeads++;
            else if (submission.leadStatus === 'converted')
                analytics.convertedLeads++;
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
    }
    catch (error) {
        console.error('Error getting lead analytics:', error);
        throw new functions.https.HttpsError('internal', 'Failed to get analytics');
    }
});
// Submit newsletter subscription
exports.submitNewsletterSubscription = functions.https.onCall(async (data, context) => {
    try {
        // Rate limiting check
        const clientIP = context.rawRequest.ip;
        if (!(0, security_1.rateLimit)(context.rawRequest)) {
            (0, security_1.logSecurityEvent)('RATE_LIMIT_EXCEEDED', { ip: clientIP, action: 'newsletter_subscription' });
            throw new functions.https.HttpsError('resource-exhausted', 'Too many requests. Please try again later.');
        }
        // Validate and sanitize input
        const sanitizedData = (0, security_1.sanitizeObject)(data);
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
        if ((0, security_1.detectSuspiciousActivity)(sanitizedData, context)) {
            (0, security_1.logSecurityEvent)('SUSPICIOUS_ACTIVITY', { ip: clientIP, data: sanitizedData, action: 'newsletter_subscription' });
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
                        insuranceType: 'Newsletter Subscription',
                        leadScore: 15,
                        additionalNotes: `Newsletter subscription updated | Source: ${sanitizedData.source} | Firestore ID: ${docRef.id}`,
                    };
                    const agencyBlocResult = await (0, agencybloc_service_1.createLeadWithNote)(agencyBlocData, 'Newsletter Update');
                    if (agencyBlocResult.success) {
                        console.log('AgencyBloc newsletter update recorded:', agencyBlocResult.recordId);
                    }
                }
            }
            catch (agencyBlocError) {
                console.error('AgencyBloc newsletter integration error (non-blocking):', agencyBlocError);
            }
            return {
                success: true,
                message: 'Your subscription has been updated successfully!',
                id: docRef.id
            };
        }
        else {
            // Create new entry
            const docRef = await db.collection('newsletter').add(newsletterEntry);
            // AgencyBloc integration for new newsletter subscriptions (non-blocking)
            try {
                if (sanitizedData.name) {
                    const agencyBlocData = {
                        firstName: sanitizedData.name.split(' ')[0] || sanitizedData.name,
                        lastName: sanitizedData.name.split(' ').slice(1).join(' ') || 'Newsletter',
                        email: sanitizedData.email,
                        insuranceType: 'Newsletter Subscription',
                        leadScore: 10,
                        additionalNotes: `Newsletter subscription | Source: ${sanitizedData.source} | Firestore ID: ${docRef.id}`,
                    };
                    const agencyBlocResult = await (0, agencybloc_service_1.createLeadWithNote)(agencyBlocData, 'Newsletter Subscription');
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
            }
            catch (agencyBlocError) {
                console.error('AgencyBloc newsletter integration error (non-blocking):', agencyBlocError);
            }
            return {
                success: true,
                message: 'Thank you for subscribing! You\'ll receive updates about your coverage.',
                id: docRef.id
            };
        }
    }
    catch (error) {
        console.error('Error submitting newsletter subscription:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'Failed to submit newsletter subscription');
    }
});
// Submit waitlist entry
exports.submitWaitlistEntry = functions.https.onCall(async (data, context) => {
    try {
        // Rate limiting check
        const clientIP = context.rawRequest.ip;
        if (!(0, security_1.rateLimit)(context.rawRequest)) {
            (0, security_1.logSecurityEvent)('RATE_LIMIT_EXCEEDED', { ip: clientIP, action: 'waitlist_submission' });
            throw new functions.https.HttpsError('resource-exhausted', 'Too many requests. Please try again later.');
        }
        // Validate and sanitize input
        const sanitizedData = (0, security_1.sanitizeObject)(data);
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
        if ((0, security_1.detectSuspiciousActivity)(sanitizedData, context)) {
            (0, security_1.logSecurityEvent)('SUSPICIOUS_ACTIVITY', { ip: clientIP, data: sanitizedData, action: 'waitlist_submission' });
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
        }
        else {
            // Create new entry
            const docRef = await db.collection('waitlist').add(waitlistEntry);
            return {
                success: true,
                message: 'Thank you for joining the waitlist! We\'ll notify you when it\'s ready.',
                id: docRef.id
            };
        }
    }
    catch (error) {
        console.error('Error submitting waitlist entry:', error);
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }
        throw new functions.https.HttpsError('internal', 'Failed to submit waitlist entry');
    }
});
//# sourceMappingURL=hawkins-leads.js.map