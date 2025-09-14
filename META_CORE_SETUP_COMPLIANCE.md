# Meta Core Setup Compliant Implementation
# Updated tracking to comply with Meta Business Tools Terms

## 🚨 **Important: Core Setup Compliance**

Meta Core Setup restricts:
1. **Custom parameters** (anything not in Meta's standard parameter list)
2. **URL paths and query parameters** (only domain allowed)

## ✅ **Compliant Event Structure**

### **Standard Parameters We Can Use:**
- `content_name` - Name/title of the content
- `content_category` - Category of content (max 5 levels)
- `content_ids` - Array of product IDs
- `content_type` - "product" or "product_group" ONLY
- `currency` - ISO currency code
- `value` - Monetary value
- `num_items` - Number of items
- User data (email, phone, name, city, state, zip, etc.)

### **❌ Custom Parameters to Remove:**
- `application_type` → Use `content_category` instead
- `registration_method` → Use `content_category` instead  
- `insurance_type` → Use `content_category` instead
- `lead_type` → Use `content_category` instead
- `user_journey` → Remove completely
- `referral_source` → Remove completely
- `from_domain`, `to_domain` → Remove completely

---

## 🔄 **Updated Event Mapping**

### **Newsletter Signup:**
```json
{
  "event_name": "CompleteRegistration",
  "custom_data": {
    "content_name": "Newsletter Registration",
    "content_category": "newsletter"
  }
}
```

### **Get Started Form - Individual:**
```json
{
  "event_name": "SubmitApplication", 
  "custom_data": {
    "content_name": "Get Started Application",
    "content_category": "individual"
  }
}
```

### **Get Started Form - Family:**
```json
{
  "event_name": "SubmitApplication",
  "custom_data": {
    "content_name": "Get Started Application", 
    "content_category": "family"
  }
}
```

### **Insurance Quote Request:**
```json
{
  "event_name": "InitiateCheckout",
  "custom_data": {
    "content_name": "Insurance Quote",
    "content_category": "medicare" // or "life", "health", etc.
  }
}
```

### **Page Views:**
```json
{
  "event_name": "ViewContent",
  "custom_data": {
    "content_name": "Get Started Page",
    "content_category": "individual" // or "family", "business", "agent"
  }
}
```

---

## 🛠 **Implementation Changes Required**

### **1. Update Dual Tracking Function**
Remove custom parameters, use only standard ones:

```typescript
// BEFORE (Non-compliant)
await trackEventDual('SubmitApplication', {
  userData: userData,
  customData: {
    content_name: 'Get Started Application',
    application_type: 'get_started_individual', // ❌ Custom parameter
    insurance_type: 'health', // ❌ Custom parameter  
    user_journey: 'lead_generation' // ❌ Custom parameter
  }
})

// AFTER (Compliant)
await trackEventDual('SubmitApplication', {
  userData: userData,
  customData: {
    content_name: 'Get Started Application',
    content_category: 'individual' // ✅ Standard parameter
  }
})
```

### **2. Update URL Handling**
Only send domain, no paths:

```typescript
// BEFORE (Non-compliant)
event_source_url: 'https://hawkinsig.com/get-started/individual?utm_source=google'

// AFTER (Compliant)  
event_source_url: 'https://hawkinsig.com'
```

### **3. Update Form Tracking Functions**
Simplify to use only standard parameters:

```typescript
// Newsletter signup
export const trackNewsletterSignup = async (email: string) => {
  await trackCompleteRegistrationDual('newsletter', { email })
}

// Get started form  
export const trackGetStartedSubmission = async (
  formData: { /* form fields */ },
  clientType: 'individual' | 'family' | 'business' | 'agent'
) => {
  await trackSubmitApplicationDual(clientType, {
    email: formData.email,
    phone: formData.phone,
    firstName: formData.firstName,
    lastName: formData.lastName,
    zipCode: formData.zipCode,
    state: formData.state
  })
}
```

---

## ⚠️ **Impact of Compliance Changes**

### **What We Lose:**
1. **Detailed custom tracking** - Can't distinguish between different form types as granularly
2. **Cross-domain journey tracking** - Can't track user flow between domains with custom parameters
3. **Advanced segmentation** - Custom audiences based on detailed parameters won't work
4. **URL-based tracking** - Can't track specific page paths

### **What We Keep:**
1. **Core conversion events** - SubmitApplication, CompleteRegistration, Lead, etc.
2. **User data matching** - Email, phone, name, location for audience building
3. **Standard event optimization** - Facebook can still optimize for core events
4. **Basic content categorization** - Using content_category for broad segmentation

---

## 🎯 **Recommended Strategy**

### **Option 1: Full Compliance (Safest)**
- Remove all custom parameters immediately
- Use only content_name and content_category
- Accept reduced tracking granularity
- Focus on core conversion events

### **Option 2: Hybrid Approach**
- Keep current implementation for now
- Monitor Meta Events Manager for warnings
- Prepare compliant version as backup
- Switch if Core Setup gets enforced

### **Option 3: Test and Validate**
- Check if your pixel already has Core Setup enabled
- Review Events Manager for any blocked parameters
- Implement compliant version gradually

---

## 🚀 **Next Steps**

1. **Check Current Status**: Go to Meta Events Manager → Data Sources → Your Pixel → Check for Core Setup notifications
2. **Review Blocked Parameters**: Look for any warnings about custom parameters
3. **Implement Compliant Version**: Update tracking functions to use only standard parameters
4. **Test Compliance**: Verify events still fire correctly with reduced parameters
5. **Monitor Performance**: Track conversion rates before/after compliance changes

Would you like me to implement the compliant version now, or would you prefer to check your current Meta Events Manager status first?