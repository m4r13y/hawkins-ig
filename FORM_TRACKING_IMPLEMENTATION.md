# Form-Specific Tracking Implementation Guide

## 🎯 **Current State vs. Required Implementation**

### **What We Have:**
- ✅ Generic tracking functions
- ✅ Event ID and deduplication
- ✅ Server-side Conversions API

### **What We Need to Add:**
- ❌ Specific form tracking calls
- ❌ Route-specific identification
- ❌ Custom parameters per form type

## 📝 **Specific Implementation Required**

### **1. Newsletter Signup (Footer)**
**File:** `src/components/animated-footer.tsx`
**Current Code:** Lines 24-35
```typescript
// BEFORE (current)
const result = await submitNewsletterSubscription({
  email: email.trim(),
  source: 'footer_newsletter'
})

// AFTER (add tracking)
import { trackNewsletterSignup } from '@/components/form-tracking'

const result = await submitNewsletterSubscription({
  email: email.trim(),
  source: 'footer_newsletter'
})

// Add this line after successful submission:
await trackNewsletterSignup(email.trim(), 'footer_newsletter')
```

### **2. Get Started Forms**
**File:** `src/components/get-started-flow.tsx`
**Current Code:** Lines 167-185
```typescript
// BEFORE (current)
submitGetStartedForm({
  ...formData,
  clientType,
  submissionTime: new Date().toISOString(),
  source: 'get_started_flow'
})

// AFTER (add tracking)
import { trackGetStartedSubmission } from '@/components/form-tracking'

const submissionResult = await submitGetStartedForm({
  ...formData,
  clientType,
  submissionTime: new Date().toISOString(),
  source: 'get_started_flow'
})

// Add this after successful submission:
await trackGetStartedSubmission({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  phone: formData.phone,
  zipCode: formData.zipCode,
  clientType: clientType,
  insuranceNeeds: formData.insuranceNeeds || [],
  currentCoverage: formData.currentCoverage,
  timeline: formData.timeline
}, `get_started_${clientType}`)
```

### **3. Page View Tracking**
**File:** `src/app/layout.tsx` or individual pages
```typescript
// Add to each route to track which get-started path:
import { trackPageView } from '@/components/form-tracking'

// In each get-started page component:
useEffect(() => {
  trackPageView(window.location.pathname)
}, [])
```

### **4. Route-Specific Tracking**

**Individual Route:** `/get-started/individual`
```typescript
await trackGetStartedSubmission(formData, 'get_started_individual')
```

**Family Route:** `/get-started/family`
```typescript
await trackGetStartedSubmission(formData, 'get_started_family')
```

**Business Route:** `/get-started/business`
```typescript
await trackGetStartedSubmission(formData, 'get_started_business')
```

**Agent Route:** `/get-started/agent`
```typescript
await trackGetStartedSubmission(formData, 'get_started_agent')
```

## 📊 **What Facebook Will See**

### **Newsletter Signup:**
```json
{
  "event_name": "CompleteRegistration",
  "custom_data": {
    "content_name": "Newsletter Registration",
    "registration_method": "newsletter"
  },
  "user_data": {
    "em": ["hashed_email"]
  }
}
```

### **Get Started - Individual:**
```json
{
  "event_name": "SubmitApplication",
  "custom_data": {
    "content_name": "get_started_individual Application",
    "application_type": "get_started_individual"
  },
  "user_data": {
    "em": ["hashed_email"],
    "ph": ["hashed_phone"],
    "fn": ["hashed_first_name"],
    "ln": ["hashed_last_name"],
    "zp": ["hashed_zip"]
  }
}
```

### **Get Started - Family:**
```json
{
  "event_name": "SubmitApplication",
  "custom_data": {
    "content_name": "get_started_family Application", 
    "application_type": "get_started_family"
  }
}
```

## 🔍 **Testing Your Implementation**

### **1. Check Event Details in Facebook:**
- Go to Events Manager > Your Pixel > Test Events
- Submit each form type
- Verify you see different `application_type` values:
  - `newsletter`
  - `get_started_individual`
  - `get_started_family`
  - `get_started_business`
  - `get_started_agent`

### **2. Verify Custom Data:**
Look for these custom parameters in Facebook Events Manager:
- `content_name`: Shows which specific form
- `application_type`: Shows the route/form type
- `registration_method`: For newsletter vs other registrations

### **3. Console Verification:**
Our tracking functions include console.log statements:
```
📧 Newsletter signup tracked: user@email.com from footer_newsletter
🎯 Get Started form tracked: individual - user@email.com
👀 Page view tracked: /get-started/individual (get_started_flow)
```

## ⚡ **Quick Implementation Checklist**

- [ ] Add tracking import to `animated-footer.tsx`
- [ ] Add tracking call after newsletter submission
- [ ] Add tracking import to `get-started-flow.tsx`
- [ ] Add tracking call after get-started submission with route context
- [ ] Add page view tracking to each get-started route
- [ ] Test each form submission in Facebook Test Events
- [ ] Verify different `application_type` values appear
- [ ] Check console logs for confirmation

This will give you complete visibility into:
- **Newsletter signups** vs **Get Started forms**
- **Which specific get-started route** (individual/family/business/agent)
- **Complete user journey** from page view to form submission