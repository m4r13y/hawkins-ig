# Meta Pixel Configuration Guide for Hawkins Insurance Group

## Critical Security Setup

### 1. Traffic Permissions (IMMEDIATE ACTION REQUIRED)
- **Go to**: Events Manager > Your Pixel > Settings > Traffic Permissions
- **Select**: "Allow list"
- **Add domain**: `hawkinsig.com`
- **Why**: Prevents unauthorized domains from using your pixel

### 2. Recommended Settings

#### Cookie Settings ✅
- First-party cookies: **ON** (Keep current setting)

#### Data Restrictions ✅  
- Core setup: **ON** (Keep current setting - good for insurance compliance)

#### Automatic Advanced Matching ❌
- Status: **OFF** (Leave disabled - Meta requirement for insurance)
- **Do NOT attempt to enable** - This is intentionally disabled for financial services

#### Track Events Automatically 🔄
- Current: **OFF**
- Recommended: **Turn ON**
- Benefits: Captures form submissions, button clicks, page views automatically
- Safe for insurance businesses

#### Event Setup
- Keep manual events we've implemented in code
- Automatic tracking will supplement, not replace your custom events

### 3. Conversions API (Future Enhancement)
- **Current**: Not set up
- **Recommendation**: Consider "Conversions API Gateway" later
- **Benefits**: Server-side tracking, better data quality, iOS 14.5+ compatibility
- **Priority**: Medium (implement after basic pixel is working)

### 4. Privacy Compliance for Insurance
Your current setup is compliant:
- ✅ Core data restrictions enabled
- ✅ Advanced matching disabled (as required)
- ✅ Manual event tracking (you control what data is sent)

### 5. Testing Checklist
1. Install Facebook Pixel Helper browser extension
2. Visit your website and verify pixel fires
3. Check Events Manager for incoming data
4. Test custom events (contact forms, quote requests)

## Event Tracking Implementation Status
- ✅ Base pixel installed
- ✅ PageView tracking
- ✅ Custom events ready (trackContact, trackQuoteRequest, etc.)
- 🔄 Need to add event calls to contact forms

## Next Steps Priority Order:
1. **URGENT**: Set up allow list with hawkinsig.com
2. **HIGH**: Enable automatic event tracking
3. **MEDIUM**: Add custom event tracking to forms
4. **LOW**: Consider Conversions API Gateway later