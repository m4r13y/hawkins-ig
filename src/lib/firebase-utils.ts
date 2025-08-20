import { httpsCallable } from 'firebase/functions';
import { functions, ensureFirebaseInitialized } from './firebase';

export interface FormSubmission {
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
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
}

// Create callable functions for lead management
let submitInsuranceLeadFunction: any = null;
let submitContactLeadFunction: any = null;

// Initialize functions when called
const initializeFunctions = () => {
  ensureFirebaseInitialized();
  if (functions && !submitInsuranceLeadFunction) {
    submitInsuranceLeadFunction = httpsCallable(functions, 'submitInsuranceLead');
    submitContactLeadFunction = httpsCallable(functions, 'submitContactLead');
  }
};

export async function submitGetStartedForm(formData: FormSubmission): Promise<string | null> {
  initializeFunctions();
  
  if (!submitInsuranceLeadFunction) {
    console.error('Firebase Functions is not initialized');
    return null;
  }

  try {
    const result = await submitInsuranceLeadFunction(formData);
    console.log('Insurance lead submitted successfully:', result.data);
    return (result.data as any)?.leadId || null;
  } catch (error) {
    console.error('Error submitting insurance lead:', error);
    return null;
  }
}

export async function submitContactForm(contactData: ContactFormData): Promise<string | null> {
  initializeFunctions();
  
  if (!submitContactLeadFunction) {
    console.error('Firebase Functions is not initialized');
    return null;
  }

  try {
    const result = await submitContactLeadFunction(contactData);
    console.log('Contact lead submitted successfully:', result.data);
    return (result.data as any)?.leadId || null;
  } catch (error) {
    console.error('Error submitting contact lead:', error);
    return null;
  }
}
