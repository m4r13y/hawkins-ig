# Meta Custom Conversions Setup Guide
*Simple, step-by-step instructions for Hawkins Insurance Group*

## 🎯 **What You Need to Know**

Your Meta tracking sends **clean, Business Tools Terms compliant data**:
- `content_type` = "product" (always the same)
- `content_ids` = ["health", "medicare", "life"] (insurance types)  
- User data formatted per Meta's advanced matching specifications

**All parameters are Business Tools Terms compliant!** ✅
**Values are configured in Meta Custom Conversions for maximum flexibility** 🎯
**User data formatting follows Meta's advanced matching specs for optimal performance** 🚀

---

## 📋 **Step-by-Step Custom Conversions Setup**

### **STEP 1: Create Core Conversions (Do These First)**

Go to **Meta Ads Manager → Events Manager → Custom Conversions → Create**

#### **CV_001: All Insurance Consultations**
- **Event:** Schedule
- **Rule:** `content_type` equals `product`
- **Value:** Set custom value (e.g., $200)
- **Description:** Tracks all consultation bookings (actual appointments scheduled)

#### **CV_002: All Insurance Leads** 
- **Event:** Lead
- **Rule:** `content_type` equals `product`
- **Value:** Set custom value (e.g., $100)
- **Description:** Tracks all lead generation (interest expressed, forms completed)

#### **CV_003: Newsletter Signups**
- **Event:** CompleteRegistration
- **Rule:** `content_ids` contains `newsletter_subscription`
- **Value:** Set custom value (e.g., $20)
- **Description:** Tracks email subscriptions

### **STEP 2: Create Product-Specific Conversions (Do These Second)**

#### **CV_004: Medicare Prospects**
- **Event:** Any event
- **Rule:** `content_ids` contains `medicare`
- **Value:** Set custom value (e.g., $150)
- **Description:** Anyone interested in Medicare

#### **CV_005: Health Insurance Prospects**
- **Event:** Any event  
- **Rule:** `content_ids` contains `health`
- **Value:** Set custom value (e.g., $120)
- **Description:** Anyone interested in health insurance

#### **CV_006: Life Insurance Prospects**
- **Event:** Any event
- **Rule:** `content_ids` contains `life`
- **Value:** Set custom value (e.g., $100)
- **Description:** Anyone interested in life insurance

### **STEP 3: Create High-Value Conversions (Do These Third)**

#### **CV_007: Premium Consultations**
- **Event:** Schedule
- **Rule:** `content_type` equals `product` AND `value` greater than or equal to `250`
- **Value:** Set custom value (e.g., $300)
- **Description:** High-value consultation bookings (actual appointments)

#### **CV_008: Premium Leads**
- **Event:** Lead
- **Rule:** `content_type` equals `product` AND `value` greater than or equal to `400`
- **Value:** Set custom value (e.g., $500)
- **Description:** High-value lead generation (qualified prospects)

---

## 🎪 **Current Event Structure**

Your tracking sends clean, Business Tools Terms compliant data:

| Event Type | Event Name | Content IDs | When It Triggers |
|------------|------------|-------------|------------------|
| Newsletter Signup | CompleteRegistration | newsletter_subscription | Email subscription |
| Calendar Scheduling | Schedule | consultation | Actual consultation booking |
| Get Started Lead | Lead | health, medicare, life, etc. | Form completion, interest expressed |
| Contact Form | Lead | contact_inquiry | Contact inquiry |
| Quote Request | SubmitApplication | medicare, health, life, etc. | Insurance quote request |
| Page View | ViewContent | page_content | Content engagement |

**✅ Values configured in Meta Custom Conversions for maximum flexibility**  
**✅ User data formatted per Meta's advanced matching specifications**  
**✅ Phone numbers include country code (US: +1)**  
**✅ Names processed as lowercase letters only**  
**✅ Zip codes mapped to Meta's 'zp' parameter**

---

## 🏷️ **Current Insurance Types Tracked**

Your `content_ids` include these insurance types:
- `health` - Health Insurance
- `medicare` - Medicare Plans
- `life` - Life Insurance  
- `disability` - Disability Insurance
- `supplemental` - Supplemental Coverage
- `group` - Group Insurance
- `newsletter_subscription` - Newsletter

---

## ✅ **Easy Copy-Paste Rules**

### For Meta Ads Manager Rule Builder:

**All Consultations (Scheduled Appointments):**
```
content_type equals product
```

**All Leads (Interest Expressed):**  
```
content_type equals product
```

**Medicare Interest:**
```
content_ids contains medicare
```

**Health Insurance Interest:**
```
content_ids contains health
```

**Life Insurance Interest:**
```
content_ids contains life
```

**High-Value Consultations (Scheduled Appointments):**
```
content_type equals product AND value >= 250
```

**High-Value Leads (Qualified Prospects):**
```
content_type equals product AND value >= 400
```

---

## 🚀 **Why This Works**

✅ **Simple Rules** - Easy to set up and understand
✅ **Business Tools Terms Compliant** - No prohibited parameters
✅ **Flexible Targeting** - Target by product type or value
✅ **Scalable** - Add more conversions as needed
✅ **Working Data** - Your tracking is already sending perfect data

**Just copy the rules above into Meta Ads Manager and you're done!** 🎯