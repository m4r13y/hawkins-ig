# Facebook Conversions API Event Parameter Checklist for Hawkins Insurance

## 🎯 **Event-Specific Requirements**

### **1. Complete Registration** (Account/Newsletter signup)
**Required Parameters:**
- ✅ Event Time, Event Name, Event Source URL (auto)
- ✅ Event ID (auto-generated for deduplication)

**Customer Info to Collect:**
- 🔴 **Email** (CRITICAL - required for registration)
- 🟡 First Name, Last Name (improves matching)
- 🟡 Zip Code, State (for insurance targeting)

**Example Usage:**
```tsx
// When user signs up for newsletter or creates account
await trackCompleteRegistrationDual('newsletter', {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  zipCode: '75001',
  state: 'TX'
})
```

### **2. Contact** (Phone calls, chat, email contact)
**Required Parameters:**
- ✅ Event Time, Event Name, Event Source URL (auto)
- ✅ Event ID (auto-generated)

**Customer Info to Collect:**
- 🔴 **Email OR Phone** (CRITICAL - need contact method)
- 🟡 First Name, Last Name
- 🟡 State (insurance regulations vary)

**Example Usage:**
```tsx
// When user clicks phone number
await trackContactDual('phone', {
  phone: '555-123-4567',
  firstName: 'Jane',
  state: 'TX'
})
```

### **3. Lead** (Form submissions, interest indication)
**Required Parameters:**
- ✅ Event Time, Event Name, Event Source URL (auto)
- ✅ Event ID (auto-generated)

**Customer Info to Collect:**
- 🔴 **Email AND/OR Phone** (CRITICAL for follow-up)
- 🟡 First Name, Last Name (for personalization)
- 🟡 Zip Code, State (for territory assignment)

**Example Usage:**
```tsx
// When user submits contact form
await trackLeadDual('contact_form', {
  email: 'prospect@example.com',
  phone: '555-987-6543',
  firstName: 'Mike',
  lastName: 'Smith',
  zipCode: '76101',
  state: 'TX'
})
```

### **4. Schedule** (Appointment booking)
**Required Parameters:**
- ✅ Event Time, Event Name, Event Source URL (auto)
- ✅ Event ID (auto-generated)

**Customer Info to Collect:**
- 🔴 **Phone AND Email** (CRITICAL for appointment confirmation)
- 🔴 **First Name, Last Name** (CRITICAL for appointment)
- 🟡 State (for agent assignment)

**Example Usage:**
```tsx
// When consultation is booked
await trackScheduleDual('consultation', {
  email: 'client@example.com',
  phone: '555-555-1234',
  firstName: 'Sarah',
  lastName: 'Johnson',
  state: 'TX'
})
```

### **5. Submit Application** (Quote requests, applications)
**Required Parameters:**
- ✅ Event Time, Event Name, Event Source URL (auto)
- ✅ Event ID (auto-generated)

**Customer Info to Collect:**
- 🔴 **Email** (CRITICAL for application follow-up)
- 🔴 **First Name, Last Name** (CRITICAL for application)
- 🟡 Phone (for faster contact)
- 🟡 Zip Code, State (for rate calculations)

**Example Usage:**
```tsx
// When user requests insurance quote
await trackSubmitApplicationDual('life_insurance_quote', {
  email: 'applicant@example.com',
  phone: '555-444-3333',
  firstName: 'Robert',
  lastName: 'Williams',
  zipCode: '75034',
  state: 'TX'
})
```

## 🔍 **Testing Your Implementation**

### **Step 1: Check Data Collection**
Use our verification helper:
```tsx
import { verifyEventData, testEventCapture } from '@/components/event-verification'

// Run this in browser console to test
testEventCapture()
```

### **Step 2: Validate Form Integration**
Before sending events, validate your form data:
```tsx
import { validateFormDataForEvent } from '@/components/event-verification'

const validation = validateFormDataForEvent('Lead', {
  email: formData.email,
  phone: formData.phone,
  firstName: formData.firstName
})

if (!validation.isValid) {
  console.warn('Missing required data:', validation.missing)
}
```

### **Step 3: Monitor in Facebook Events Manager**
1. Go to Events Manager
2. Select your pixel
3. Check "Test Events" tab
4. Verify events are appearing with expected parameters

## ⚠️ **Common Issues to Check**

### **Missing Data Issues:**
- ❌ Forms not capturing email addresses
- ❌ Phone numbers not in correct format
- ❌ State abbreviations vs full names
- ❌ Empty or whitespace-only fields

### **Technical Issues:**
- ❌ Event ID not being generated (breaks deduplication)
- ❌ Server-side API not receiving events
- ❌ Pixel and Conversions API sending different data

### **Compliance Issues:**
- ❌ Not hashing PII data properly (auto-handled)
- ❌ Sending sensitive data that shouldn't be sent
- ❌ Missing required disclaimers on forms

## 📊 **Success Metrics to Monitor**

In Facebook Events Manager, watch these metrics:

1. **Event Match Quality** - Should be "Good" or "Excellent"
2. **Rate of Deduplication** - Should show both pixel and server events
3. **Data Freshness** - Should be under 15 minutes
4. **Event Coverage** - Should show events from both sources

## 🎯 **Quick Wins for Insurance Business**

1. **Always collect email** on any form submission
2. **Require phone number** for consultation requests
3. **Capture state** for compliance and territory routing
4. **Use consistent event naming** across all forms
5. **Test thoroughly** before going live

Your setup is now ready for production! The most critical thing is ensuring you're capturing email addresses and phone numbers for insurance leads.