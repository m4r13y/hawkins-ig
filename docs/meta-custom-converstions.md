# Indexed Custom Conversions System for Insurance Business
*Using # marked standard parameters for organized targeting*

## 🏷️ Parameter Index System:

### **CT_** = content_type (Product Types)
- `CT_001`: product (All insurance products)

### **CI_** = content_ids (Insurance Products)
- `CI_001`: health
- `CI_002`: medicare
- `CI_003`: life
- `CI_004`: disability
- `CI_005`: supplemental
- `CI_006`: group
- `CI_007`: newsletter_subscription

### **LE_** = lead_event_source (Form Sources)
- `LE_001`: get_started_form
- `LE_002`: newsletter_signup
- `LE_003`: contact_form
- `LE_004`: quote_request

### **UB_** = user_bucket (Client Segments)
- `UB_001`: individual
- `UB_002`: family
- `UB_003`: business
- `UB_004`: agent
- `UB_005`: newsletter_subscriber

---

## 🎯 Organized Custom Conversions:

### **Phase 1: Core Funnel (Create First)**

#### CV_001: Insurance Consultations
- **Event:** Schedule
- **Rule:** `content_type` equals "product" AND `value` ≥ 200
- **Index:** CT_001 + VALUE
- **Priority:** Highest intent conversions

#### CV_002: Primary Lead Generation  
- **Event:** Lead
- **Rule:** `lead_event_source` equals "get_started_form"
- **Index:** LE_001
- **Priority:** Main conversion funnel

#### CV_003: Newsletter Acquisition
- **Event:** Lead
- **Rule:** `content_ids` contains "newsletter_subscription"
- **Index:** CI_007
- **Priority:** Top-funnel lead nurturing

### **Phase 2: Client Segmentation (Create Second)**

#### CV_004: Individual Client Leads
- **Event:** Any event
- **Rule:** `user_bucket` equals "individual"
- **Index:** UB_001
- **Priority:** Volume targeting

#### CV_005: Family Insurance Plans
- **Event:** Any event
- **Rule:** `user_bucket` equals "family"
- **Index:** UB_002
- **Priority:** Mid-tier value targeting

#### CV_006: Business Insurance Clients
- **Event:** Any event
- **Rule:** `user_bucket` equals "business"
- **Index:** UB_003
- **Priority:** High-value targeting

### **Phase 3: Product-Specific (Create Third)**

#### CV_007: Medicare Prospects
- **Event:** Any event
- **Rule:** `content_ids` contains "medicare"
- **Index:** CI_002
- **Priority:** Medicare-specific campaigns

#### CV_008: Health Insurance Prospects
- **Event:** Any event
- **Rule:** `content_ids` contains "health"
- **Index:** CI_001
- **Priority:** Health insurance campaigns

#### CV_009: Life Insurance Prospects
- **Event:** Any event
- **Rule:** `content_ids` contains "life"
- **Index:** CI_003
- **Priority:** Life insurance campaigns

### **Phase 4: Advanced Combinations**

#### CV_010: High-Value Business Medicare
- **Event:** Any event
- **Rule:** `user_bucket` equals "business" AND `content_ids` contains "medicare" AND `value` ≥ 400
- **Index:** UB_003 + CI_002 + VALUE
- **Priority:** Premium group Medicare

#### CV_011: Multi-Product Individual Leads
- **Event:** Any event
- **Rule:** `user_bucket` equals "individual" AND multiple `content_ids`
- **Index:** UB_001 + Multiple CI_
- **Priority:** Cross-sell opportunities

#### CV_012: Business Health Insurance
- **Event:** Any event
- **Rule:** `user_bucket` equals "business" AND `content_ids` contains "health"
- **Index:** UB_003 + CI_001
- **Priority:** Group health plans

---

## 🚀 Implementation Benefits:

### **Organized Naming:**
- Easy to identify: CV_001, CV_002, etc.
- Parameter mapping: CT_ (product), CI_ (insurance types), LE_ (sources), UB_ (client types)
- Logical progression: Core → Segments → Products → Advanced

### **Scalable System:**
- Add new conversions with sequential numbers
- Clear parameter indexing with compliant usage
- Easy to track performance by category

### **Campaign Optimization:**
- Target specific insurance products via `content_ids`
- Segment by client type via `user_bucket`
- Track conversion sources via `lead_event_source`
- Measure funnel performance by conversion type

### **Compliance Benefits:**
- ✅ content_type: Always "product" (compliant)
- ✅ content_ids: Insurance types as product SKUs (compliant)
- ✅ user_bucket: Client segmentation (compliant)
- ✅ All parameters follow Meta's standard parameter guidelines

This gives you a **professional, scalable, AND fully compliant conversion system**! 🎯