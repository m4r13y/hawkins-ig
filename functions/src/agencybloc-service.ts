import * as functions from 'firebase-functions';

// AgencyBloc API Configuration
const AGENCYBLOC_CONFIG = {
  baseUrl: 'https://app.agencybloc.com/api/v1/',
  sid: '8WPMJORYKG56QCG86D2R',
  key: '7f9a756960f51c8f3063c9f15e1cbe5242c3a1c0',
  rateLimit: 2000, // requests per 5-minute period
};

// Types for AgencyBloc API
interface AgencyBlocLeadData {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  cellphone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  date_of_birth?: string;
  gender?: string;
  coverage_type?: string;
  lead_source?: string;
}

interface AgencyBlocResponse {
  'Agencybloc Response': {
    Status: string;
    record_id?: string;
    Action: string;
    Exception?: {
      Status: string;
      Title: string;
      Message: string;
    };
  };
}

interface LeadSearchResponse {
  type: string;
  name: string;
  phone: string;
  record_id: string;
  status: string;
  assigned_user: string;
  create_date: string;
  last_update: string;
}

/**
 * Search for existing leads by phone number to prevent duplicates
 */
export async function searchLeadByPhone(phoneNumber: string): Promise<LeadSearchResponse[]> {
  const cleanPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
  
  const formData = new URLSearchParams({
    sid: AGENCYBLOC_CONFIG.sid,
    key: AGENCYBLOC_CONFIG.key,
    PhoneNumberSearchQuery: cleanPhone,
  });

  try {
    const response = await fetch(`${AGENCYBLOC_CONFIG.baseUrl}salesEnablement/leads/searchphone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`AgencyBloc search failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    functions.logger.error('AgencyBloc search error:', error);
    return []; // Return empty array on error to allow lead creation
  }
}

/**
 * Create a new lead in AgencyBloc
 */
export async function createAgencyBlocLead(leadData: AgencyBlocLeadData): Promise<string | null> {
  const formData = new URLSearchParams({
    sid: AGENCYBLOC_CONFIG.sid,
    key: AGENCYBLOC_CONFIG.key,
    ...leadData,
  });

  try {
    const response = await fetch(`${AGENCYBLOC_CONFIG.baseUrl}salesEnablement/leads/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`AgencyBloc create failed: ${response.status} ${response.statusText}`);
    }

    const data: AgencyBlocResponse = await response.json();
    
    if (data['Agencybloc Response'].Status === '200') {
      functions.logger.info('AgencyBloc lead created:', data['Agencybloc Response'].record_id);
      return data['Agencybloc Response'].record_id || null;
    } else {
      functions.logger.error('AgencyBloc create error:', data['Agencybloc Response'].Exception);
      return null;
    }
  } catch (error) {
    functions.logger.error('AgencyBloc create error:', error);
    return null;
  }
}

/**
 * Create a note with custom field data attached to a lead
 */
export async function attachLeadNote(
  recordId: string, 
  customData: any, 
  formType: string = 'Website Form'
): Promise<boolean> {
  const noteSubject = `Lead Details from Hawkins Insurance Group - ${formType}`;
  const noteBody = formatCustomFieldsNote(customData, formType);

  const formData = new URLSearchParams({
    sid: AGENCYBLOC_CONFIG.sid,
    key: AGENCYBLOC_CONFIG.key,
    entity_id: recordId,
    entity_type: 'Individual',
    attachment_note_1_body_text: noteBody,
    attachment_note_1_subject_text: noteSubject,
    attachment_note_1_pinned: '1', // Pin the note for visibility
    attach_file_to_note_1: '0', // No file attachments
  });

  try {
    const response = await fetch(`${AGENCYBLOC_CONFIG.baseUrl}notes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`AgencyBloc note creation failed: ${response.status} ${response.statusText}`);
    }

    const data: AgencyBlocResponse = await response.json();
    
    if (data['Agencybloc Response'].Status === '200') {
      functions.logger.info('AgencyBloc note created for record:', recordId);
      return true;
    } else {
      functions.logger.error('AgencyBloc note creation error:', data['Agencybloc Response'].Exception);
      return false;
    }
  } catch (error) {
    functions.logger.error('AgencyBloc note creation error:', error);
    return false;
  }
}

/**
 * Format custom fields data into a readable note
 */
function formatCustomFieldsNote(data: any, formType: string): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  let note = `=== HAWKINS INSURANCE GROUP LEAD ===\n`;
  note += `Lead Date: ${timestamp} CST\n`;
  note += `Form Type: ${formType}\n`;
  note += `Lead Source: Website - hawkinsig.com\n`;
  note += `Submission Method: Online Form\n\n`;

  // Form Steps Information
  if (formType === 'Get Started Form') {
    note += `=== FORM COMPLETION STEPS ===\n`;
    note += `Step 1: Client Type Selection - ${data.clientType || 'Not specified'}\n`;
    if (data.age) note += `Step 2: Age Information - ${data.age} years old\n`;
    if (data.familySize || data.employeeCount) {
      note += `Step 3: Household/Business Size - ${data.familySize ? `Family: ${data.familySize}` : ''} ${data.employeeCount ? `Employees: ${data.employeeCount}` : ''}\n`;
    }
    if (data.agentType) note += `Step 4: Agent Relationship - ${data.agentType}\n`;
    if (data.insuranceTypes) {
      note += `Step 5: Insurance Types - ${Array.isArray(data.insuranceTypes) ? data.insuranceTypes.join(', ') : data.insuranceTypes}\n`;
    }
    if (data.urgency) note += `Step 6: Timeline - ${data.urgency}\n`;
    note += `Step 7: Contact Information - Completed\n`;
    note += `\n`;
  }

  // Insurance Information
  if (data.insuranceTypes || data.insuranceType || data.currentCoverage || data.healthConditions) {
    note += `=== INSURANCE INFORMATION ===\n`;
    if (data.insuranceTypes) {
      note += `Interested Insurance Types: ${Array.isArray(data.insuranceTypes) ? data.insuranceTypes.join(', ') : data.insuranceTypes}\n`;
    }
    if (data.insuranceType && !data.insuranceTypes) {
      note += `Insurance Type: ${data.insuranceType}\n`;
    }
    if (data.currentCoverage) note += `Current Coverage: ${data.currentCoverage}\n`;
    if (data.healthConditions) note += `Health Conditions: ${data.healthConditions}\n`;
    if (data.urgency) note += `Timeline/Urgency: ${data.urgency}\n`;
    note += `\n`;
  }

  // Client Information
  if (data.clientType || data.age || data.familySize || data.employeeCount || data.company) {
    note += `=== CLIENT INFORMATION ===\n`;
    if (data.clientType) note += `Client Type: ${data.clientType}\n`;
    if (data.age) note += `Age: ${data.age} years old\n`;
    if (data.familySize) note += `Family/Household Size: ${data.familySize}\n`;
    if (data.employeeCount) note += `Number of Employees: ${data.employeeCount}\n`;
    if (data.company) note += `Company Name: ${data.company}\n`;
    note += `\n`;
  }

  // Agent/Relationship Information
  if (data.agentType || data.referralSource) {
    note += `=== AGENT RELATIONSHIP ===\n`;
    if (data.agentType) note += `Current Agent Status: ${data.agentType}\n`;
    if (data.referralSource) note += `Referral Source: ${data.referralSource}\n`;
    note += `\n`;
  }

  // Household/Financial Information
  if (data.householdSize || data.annualIncome || data.retirementPlanning) {
    note += `=== HOUSEHOLD INFORMATION ===\n`;
    if (data.householdSize) note += `Household Size: ${data.householdSize}\n`;
    if (data.annualIncome) note += `Annual Income: ${data.annualIncome}\n`;
    if (data.retirementPlanning) note += `Retirement Planning: ${data.retirementPlanning}\n`;
    note += `\n`;
  }

  // Contact Preferences
  if (data.preferredContactMethod || data.preferredContactTime || data.phone || data.email) {
    note += `=== CONTACT PREFERENCES ===\n`;
    if (data.preferredContactMethod) note += `Preferred Contact Method: ${data.preferredContactMethod}\n`;
    if (data.preferredContactTime) note += `Best Time to Call: ${data.preferredContactTime}\n`;
    if (data.phone) note += `Phone Number: ${data.phone}\n`;
    if (data.email) note += `Email Address: ${data.email}\n`;
    note += `\n`;
  }

  // Lead Scoring and Analysis
  if (data.leadScore || data.leadPriority || data.urgency) {
    note += `=== LEAD ANALYSIS ===\n`;
    if (data.leadScore) note += `Lead Score: ${data.leadScore}/100\n`;
    if (data.leadPriority) note += `Priority Level: ${data.leadPriority}\n`;
    if (data.urgency) note += `Urgency: ${data.urgency}\n`;
    
    // Add urgency explanation
    if (data.urgency === 'immediate') {
      note += `Urgency Note: Client needs coverage immediately - HIGH PRIORITY\n`;
    } else if (data.urgency === 'within-30-days') {
      note += `Urgency Note: Client needs coverage within 30 days - MEDIUM PRIORITY\n`;
    } else if (data.urgency === 'within-3-months') {
      note += `Urgency Note: Client needs coverage within 3 months - STANDARD PRIORITY\n`;
    }
    note += `\n`;
  }

  // Contact Form Specific
  if (data.message || data.comments) {
    note += `=== CLIENT MESSAGE ===\n`;
    note += `"${data.message || data.comments}"\n`;
    note += `\n`;
  }

  // Additional Notes
  if (data.additionalNotes) {
    note += `=== ADDITIONAL NOTES ===\n`;
    note += `${data.additionalNotes}\n`;
    note += `\n`;
  }

  // System Information
  note += `=== SYSTEM INFORMATION ===\n`;
  note += `Form Type: ${formType}\n`;
  note += `Submission Timestamp: ${timestamp}\n`;
  note += `Lead Source: Website Form (hawkinsig.com)\n`;
  if (data.ipAddress) note += `IP Address: ${data.ipAddress}\n`;
  if (data.userAgent) note += `Browser: ${data.userAgent.substring(0, 100)}...\n`;
  note += `\n`;

  // Technical Data (for debugging/reference)
  note += `=== TECHNICAL DATA ===\n`;
  note += `Firestore Lead ID: ${data.leadId || 'Not yet assigned'}\n`;
  note += `Form Data Keys: ${Object.keys(data).join(', ')}\n`;
  
  return note;
}

/**
 * Map form data to AgencyBloc lead format
 */
export function mapToAgencyBlocLead(formData: any, formType: string = 'Website Form'): AgencyBlocLeadData {
  // Clean phone number to format (xxx) xxx-xxxx
  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone; // Return original if not 10 digits
  };

  // Map gender values
  const mapGender = (gender: string): string => {
    const lower = gender.toLowerCase();
    if (lower.includes('male') && !lower.includes('female')) return 'Male';
    if (lower.includes('female')) return 'Female';
    return gender;
  };

  // Map coverage types
  const mapCoverageType = (insuranceType: string | string[]): string => {
    let typeStr = '';
    if (Array.isArray(insuranceType)) {
      typeStr = insuranceType.join(', ').toLowerCase();
    } else {
      typeStr = insuranceType.toLowerCase();
    }
    
    if (typeStr.includes('medicare')) return 'Medicare';
    if (typeStr.includes('life')) return 'Life';
    if (typeStr.includes('health')) return 'Health';
    if (typeStr.includes('dental')) return 'Dental';
    if (typeStr.includes('vision')) return 'Vision';
    if (typeStr.includes('supplement')) return 'Medicare Supplement';
    if (typeStr.includes('advantage')) return 'Medicare Advantage';
    return 'Other';
  };

  // Determine lead source based on form type and data
  const determineLeadSource = (data: any, type: string): string => {
    if (data.source) return data.source;
    if (data.leadSource) return data.leadSource;
    
    switch (type.toLowerCase()) {
      case 'get started form':
      case 'insurance lead':
        return 'Website - Get Started Form';
      case 'contact form':
        return 'Website - Contact Form';
      case 'newsletter subscription':
      case 'newsletter update':
        return 'Website - Newsletter';
      default:
        return 'Website - hawkinsig.com';
    }
  };

  const leadData: AgencyBlocLeadData = {
    first_name: formData.firstName || formData.first_name || formData.name?.split(' ')[0] || '',
    last_name: formData.lastName || formData.last_name || formData.name?.split(' ').slice(1).join(' ') || '',
  };

  // Optional fields
  if (formData.email) leadData.email = formData.email;
  if (formData.phone) leadData.phone = formatPhone(formData.phone);
  if (formData.cellphone || formData.mobile) {
    leadData.cellphone = formatPhone(formData.cellphone || formData.mobile);
  }
  
  // Address information
  if (formData.address) leadData.address = formData.address;
  if (formData.city) leadData.city = formData.city;
  if (formData.state) leadData.state = formData.state;
  if (formData.zip || formData.zipCode) leadData.zip = formData.zip || formData.zipCode;

  // Personal information
  if (formData.dateOfBirth) {
    // Convert to MM/DD/YYYY format
    const date = new Date(formData.dateOfBirth);
    if (!isNaN(date.getTime())) {
      leadData.date_of_birth = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
  }
  
  if (formData.gender) leadData.gender = mapGender(formData.gender);
  if (formData.insuranceType || formData.insuranceTypes) {
    leadData.coverage_type = mapCoverageType(formData.insuranceType || formData.insuranceTypes);
  }
  
  // Lead source - more specific based on form type
  leadData.lead_source = determineLeadSource(formData, formType);

  return leadData;
}

/**
 * Main function to create lead and attach note
 */
export async function createLeadWithNote(
  formData: any, 
  formType: string = 'Website Form'
): Promise<{ success: boolean; recordId?: string; error?: string }> {
  try {
    // Check for duplicates if phone number provided
    if (formData.phone) {
      const existingLeads = await searchLeadByPhone(formData.phone);
      if (existingLeads.length > 0) {
        functions.logger.info('Duplicate lead found:', existingLeads[0]);
        return {
          success: false,
          error: 'Lead with this phone number already exists',
          recordId: existingLeads[0].record_id,
        };
      }
    }

    // Create the lead
    const leadData = mapToAgencyBlocLead(formData, formType);
    const recordId = await createAgencyBlocLead(leadData);

    if (!recordId) {
      return {
        success: false,
        error: 'Failed to create lead in AgencyBloc',
      };
    }

    // Attach the note with custom fields
    const noteCreated = await attachLeadNote(recordId, formData, formType);
    
    if (!noteCreated) {
      functions.logger.warn('Lead created but note attachment failed for record:', recordId);
    }

    return {
      success: true,
      recordId: recordId,
    };

  } catch (error) {
    functions.logger.error('AgencyBloc integration error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
