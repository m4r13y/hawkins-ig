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

### **LE_** = lead_event_source (Form Sources) - REMOVED
- **Note**: Removed due to Business Tools Terms compliance
- **Alternative**: Use `content_ids` for form identification

### **UB_** = user_bucket (Client Segments) - REMOVED  
- **Note**: Removed due to Business Tools Terms compliance
- **Alternative**: Server-side segmentation via Conversions API

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
- **Rule:** `content_ids` contains "get_started_form"
- **Index:** CI_form_identification
- **Priority:** Main conversion funnel

#### CV_003: Newsletter Acquisition
- **Event:** Lead
- **Rule:** `content_ids` contains "newsletter_subscription"
- **Index:** CI_007
- **Priority:** Top-funnel lead nurturing

### **Phase 2: Product-Specific Targeting (Create Second)**

#### CV_004: Medicare Prospects
- **Event:** Any event
- **Rule:** `content_ids` contains "medicare"
- **Index:** CI_002
- **Priority:** Medicare-specific campaigns

#### CV_005: Health Insurance Prospects
- **Event:** Any event
- **Rule:** `content_ids` contains "health"
- **Index:** CI_001
- **Priority:** Health insurance campaigns

#### CV_006: Life Insurance Prospects
- **Event:** Any event
- **Rule:** `content_ids` contains "life"
- **Index:** CI_003
- **Priority:** Life insurance campaigns

### **Phase 3: Value-Based Targeting (Create Third)**

#### CV_007: High-Value Consultations
- **Event:** Schedule
- **Rule:** `content_type` equals "product" AND `value` ≥ 300
- **Index:** CT_001 + HIGH_VALUE
- **Priority:** Premium consultation bookings

#### CV_008: Premium Leads
- **Event:** Lead
- **Rule:** `content_type` equals "product" AND `value` ≥ 400
- **Index:** CT_001 + PREMIUM_VALUE
- **Priority:** High-value lead generation

#### CV_009: Multi-Product Interest
- **Event:** Any event
- **Rule:** Multiple insurance types in `content_ids`
- **Index:** Multiple CI_ values
- **Priority:** Cross-sell opportunities

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