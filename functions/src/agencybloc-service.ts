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
  lead_source?: string;
  status?: string;
  agent_notes?: string;
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
 * Format custom fields data into a concise note for agent_notes field
 */
function formatCustomFieldsNote(data: any, formType: string): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let note = `${formType} - ${timestamp} CST\n`;
  note += `Source: hawkinsig.com\n\n`;

  // Essential form information
  if (data.clientType) note += `Client Type: ${data.clientType}\n`;
  if (data.age) note += `Age: ${data.age}\n`;
  if (data.insuranceTypes) {
    note += `Insurance Types: ${Array.isArray(data.insuranceTypes) ? data.insuranceTypes.join(', ') : data.insuranceTypes}\n`;
  }
  if (data.urgency) note += `Timeline: ${data.urgency}\n`;
  if (data.familySize) note += `Family Size: ${data.familySize}\n`;
  if (data.employeeCount) note += `Employees: ${data.employeeCount}\n`;
  if (data.agentType) note += `Current Agent: ${data.agentType}\n`;
  if (data.company) note += `Company: ${data.company}\n`;
  if (data.leadScore) note += `Lead Score: ${data.leadScore}/100\n`;

  // Contact form message
  if (data.message) note += `\nMessage: ${data.message}\n`;

  // Firestore reference
  if (data.leadId) note += `\nFirestore ID: ${data.leadId}`;
  
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
  
  // Set standard values as requested
  leadData.lead_source = 'website';
  leadData.status = 'open';

  // Add detailed notes as agent_notes custom field
  leadData.agent_notes = formatCustomFieldsNote(formData, formType);

  return leadData;
}

/**
 * Main function to create lead with notes in agent_notes field
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

    // Create the lead with notes included in agent_notes field
    const leadData = mapToAgencyBlocLead(formData, formType);
    const recordId = await createAgencyBlocLead(leadData);

    if (!recordId) {
      return {
        success: false,
        error: 'Failed to create lead in AgencyBloc',
      };
    }

    functions.logger.info('AgencyBloc lead created with notes in agent_notes field:', recordId);
    
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
