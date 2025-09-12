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

export async function submitGetStartedForm(formData: FormSubmission): Promise<string | null> {
  ensureFirebaseInitialized();
  
  if (!functions) {
    console.error('Firebase functions not initialized for get started form');
    return null;
  }

  try {
    const submitInsuranceLead = httpsCallable(functions, 'submitInsuranceLead');
    const result = await submitInsuranceLead(formData);
    return (result.data as any)?.leadId || null;
  } catch (error) {
    console.error('Error submitting insurance lead:', error);
    return null;
  }
}

export async function submitContactForm(contactData: ContactFormData): Promise<string | null> {
  ensureFirebaseInitialized();
  
  if (!functions) {
    console.error('Firebase functions not initialized for contact form');
    return null;
  }

  try {
    const submitContactLead = httpsCallable(functions, 'submitContactLead');
    const result = await submitContactLead(contactData);
    return (result.data as any)?.leadId || null;
  } catch (error) {
    console.error('Error submitting contact lead:', error);
    return null;
  }
}
