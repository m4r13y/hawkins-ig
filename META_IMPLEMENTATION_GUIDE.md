# Meta Conversions API - Exact Implementation Guide

## 📋 **Event Parameters by Type (From Meta Guide)**

### **1. ViewContent Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅  
- Event Source URL ✅
- Action Source ✅
- Event ID ✅
- Client User Agent ✅

**Customer Info (Optional):**
- None required, but valuable: Email, State, First Name, Last Name

**Implementation:**
```typescript
await trackViewContentDual('insurance_product', {
  // Only if user is logged in or data available
  email: userEmail,
  state: userState
})
```

### **2. SubmitApplication Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅
- Event Source URL ✅  
- Action Source ✅
- Event ID ✅

**Customer Info (Recommended by Meta):**
- State
- Last Name  
- Client User Agent ✅
- Email
- First Name
- Zip Code
- Phone
- Date of Birth

**Implementation:**
```typescript
await trackSubmitApplicationDual('insurance_quote', {
  email: formData.email,      // CRITICAL
  firstName: formData.firstName, // CRITICAL  
  lastName: formData.lastName,   // CRITICAL
  phone: formData.phone,
  state: formData.state,      // CRITICAL for insurance
  zipCode: formData.zipCode,
  dateOfBirth: formData.dob   // Important for insurance
})
```

### **3. Schedule Event** 
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅
- Event Source URL ✅
- Action Source ✅  
- Event ID ✅

**Customer Info (Recommended by Meta):**
- Last Name
- Client User Agent ✅
- Email  
- First Name
- Phone

**Implementation:**
```typescript
await trackScheduleDual('consultation', {
  email: formData.email,      // REQUIRED
  phone: formData.phone,      // REQUIRED  
  firstName: formData.firstName, // REQUIRED
  lastName: formData.lastName    // REQUIRED
})
```

### **4. CustomizeProduct Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅
- Event Source URL ✅
- Action Source ✅
- Event ID ✅
- Client User Agent ✅

**Customer Info (Optional):**
- Minimal requirements - mostly anonymous

**Implementation:**
```typescript
await trackCustomizeProductDual('life_insurance', {
  // Optional context if available
  state: userState
})
```

### **5. CompleteRegistration Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅
- Event Source URL ✅
- Action Source ✅
- Event ID ✅

**Customer Info (Recommended by Meta):**
- State
- Last Name
- Client User Agent ✅
- Email
- First Name

**Implementation:**
```typescript
await trackCompleteRegistrationDual('newsletter', {
  email: formData.email,      // REQUIRED for registration
  firstName: formData.firstName,
  lastName: formData.lastName,
  state: formData.state
})
```

### **6. Lead Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅  
- Event Source URL ✅
- Action Source ✅
- Event ID ✅

**Customer Info (Recommended by Meta):**
- State
- Last Name
- Client User Agent ✅
- Email
- First Name  
- Zip Code
- Phone

**Implementation:**
```typescript
await trackLeadDual('contact_form', {
  email: formData.email,      // CRITICAL
  phone: formData.phone,      // CRITICAL
  firstName: formData.firstName,
  lastName: formData.lastName,
  state: formData.state,
  zipCode: formData.zipCode
})
```

### **7. Search Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅
- Event Source URL ✅  
- Action Source ✅
- Event ID ✅
- Client User Agent ✅

**Customer Info (Optional):**
- Minimal - anonymous search tracking

**Implementation:**
```typescript
await trackSearchDual('medicare supplement plans')
```

### **8. Contact Event**
**Facebook Requirements:**
- Event Time ✅
- Event Name ✅
- Event Source URL ✅
- Action Source ✅
- Event ID ✅

**Customer Info (Recommended by Meta):**
- Last Name
- Client User Agent ✅
- Email
- First Name
- Phone

**Implementation:**
```typescript
await trackContactDual('phone', {
  email: formData.email,      // CRITICAL
  phone: formData.phone,      // CRITICAL
  firstName: formData.firstName,
  lastName: formData.lastName
})
```

## 🎯 **Priority Implementation Order**

### **High Priority (Revenue Events):**
1. **SubmitApplication** - Insurance quotes/applications
2. **Schedule** - Consultation bookings
3. **Lead** - Contact form submissions

### **Medium Priority (Engagement Events):**
4. **Contact** - Phone/email contact
5. **CompleteRegistration** - Newsletter signups

### **Low Priority (Awareness Events):**
6. **ViewContent** - Page views
7. **CustomizeProduct** - Quote customization
8. **Search** - Site search

## 📊 **Success Metrics to Monitor**

### **Event Match Quality:**
- **Good/Excellent**: Need email + phone + name
- **Fair**: Email or phone + name  
- **Poor**: Minimal data

### **Rate of Deduplication:**
- Should see both Pixel and Conversions API events
- Same event_id prevents double counting

### **Data Freshness:**  
- Should be under 15 minutes for real-time events

### **Event Coverage:**
- Both browser (Pixel) and server (Conversions API) sending same events

## 🔧 **Technical Implementation Notes**

### **Event ID:**
```typescript
const eventId = generateEventId() // Same ID for both Pixel and Conversions API
```

### **Event Time:**
```typescript
event_time: Math.floor(Date.now() / 1000) // Unix timestamp
```

### **User Data Hashing:**
```typescript
// Automatically handled in our processUserData function
userData.em = [hashData(email.toLowerCase().trim())]
userData.ph = [hashData(phone.replace(/\D/g, ''))]
```

This aligns perfectly with Meta's specifications and gives you the exact parameter requirements for each event type!