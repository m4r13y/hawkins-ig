# Meta Custom Conversions Setup Guide
*Simple, step-by-step instructions for Hawkins Insurance Group*

## 🎯 **What You Need to Know**

Your Meta tracking sends **3 key parameters** that work perfectly for custom conversions:
- `content_type` = "product" (always the same)
- `content_ids` = ["health", "medicare", "life"] (insurance types)  
- `value` = 250, 500, etc. (dollar amounts)

**All parameters are Business Tools Terms compliant!** ✅

---

## 📋 **Step-by-Step Custom Conversions Setup**

### **STEP 1: Create Core Conversions (Do These First)**

Go to **Meta Ads Manager → Events Manager → Custom Conversions → Create**

#### **CV_001: All Insurance Consultations**
- **Event:** Schedule
- **Rule:** `content_type` equals `product`
- **Value:** Use event value
- **Description:** Tracks all consultation bookings

#### **CV_002: All Insurance Leads** 
- **Event:** Lead
- **Rule:** `content_type` equals `product`
- **Value:** Use event value  
- **Description:** Tracks all lead generation

#### **CV_003: Newsletter Signups**
- **Event:** CompleteRegistration
- **Rule:** `content_ids` contains `newsletter_subscription`
- **Value:** Use event value
- **Description:** Tracks email subscriptions

### **STEP 2: Create Product-Specific Conversions (Do These Second)**

#### **CV_004: Medicare Prospects**
- **Event:** Any event
- **Rule:** `content_ids` contains `medicare`
- **Value:** Use event value
- **Description:** Anyone interested in Medicare

#### **CV_005: Health Insurance Prospects**
- **Event:** Any event  
- **Rule:** `content_ids` contains `health`
- **Value:** Use event value
- **Description:** Anyone interested in health insurance

#### **CV_006: Life Insurance Prospects**
- **Event:** Any event
- **Rule:** `content_ids` contains `life`
- **Value:** Use event value
- **Description:** Anyone interested in life insurance

### **STEP 3: Create High-Value Conversions (Do These Third)**

#### **CV_007: Premium Consultations**
- **Event:** Schedule
- **Rule:** `content_type` equals `product` AND `value` greater than or equal to `300`
- **Value:** Use event value
- **Description:** High-value consultation bookings

#### **CV_008: Premium Leads**
- **Event:** Lead
- **Rule:** `content_type` equals `product` AND `value` greater than or equal to `500`
- **Value:** Use event value
- **Description:** High-value lead generation

---

## 🎪 **Current Event Values in Your System**

| Event Type | Current Value | When It Triggers |
|------------|---------------|------------------|
| Newsletter Signup | $25 | Email subscription |
| Get Started - Schedule | $250 | Consultation booking |
| Get Started - Lead | $500 | Form completion |
| Contact Form | $100 | Contact inquiry |
| Quote Request | $300 | Insurance quote |
| Page View | $50 | Content engagement |

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

**All Consultations:**
```
content_type equals product
```

**All Leads:**  
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

**High-Value Consultations:**
```
content_type equals product AND value >= 300
```

**High-Value Leads:**
```
content_type equals product AND value >= 500
```

---

## 🚀 **Why This Works**

✅ **Simple Rules** - Easy to set up and understand
✅ **Business Tools Terms Compliant** - No prohibited parameters
✅ **Flexible Targeting** - Target by product type or value
✅ **Scalable** - Add more conversions as needed
✅ **Working Data** - Your tracking is already sending perfect data

**Just copy the rules above into Meta Ads Manager and you're done!** 🎯