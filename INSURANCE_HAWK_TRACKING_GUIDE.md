# Meta Pixel Implementation Guide for Insurance Hawk App
# Cross-Domain Tracking Setup for hawkinsig.com → insurance-hawk.com

## 🎯 **Overview**
This guide implements Meta Pixel tracking in your Insurance Hawk app to continue the user journey from Hawkins IG, enabling proper attribution across domains.

## 📁 **File Structure to Create**

```
src/
├── components/
│   ├── meta-pixel.tsx           # Meta Pixel component
│   ├── dual-tracking.tsx        # Client + Server tracking
│   ├── form-tracking.tsx        # Quote-specific tracking
│   └── cross-domain-tracking.tsx # Cross-domain continuity
├── app/
│   ├── api/
│   │   └── conversions/
│   │       └── route.ts          # Conversions API endpoint
│   └── layout.tsx                # Root layout with pixel
└── lib/
    └── tracking-config.ts        # Shared tracking configuration
```

---

## 🔧 **1. Environment Configuration**

### `.env.local`
```bash
# Meta Pixel Configuration (Same as Hawkins IG)
NEXT_PUBLIC_META_PIXEL_ID=1274893120216161

# Meta Conversions API Configuration 
META_CONVERSIONS_API_ACCESS_TOKEN=EAAUIeGfjIE4BPUwSVZB6ZCITr8OElpdY64yYmFgur8Pp7pO7ZB93qbjulifIBQwNQztENkLQSSZAdUQLd0aVPyhpxLZBbpgXtCMnyBpYNzbh4vWFd6l5KLVuX42g2rjDdaqhTMZAtJZA5q0AGplLafosHWQZBNrfZBVBV7R2ety5VhdytsiCLTdBUNEMPPDYU1AZDZD

# Test Event Code
META_TEST_EVENT_CODE=TEST88538

# Cross-Domain Configuration
NEXT_PUBLIC_HAWKINS_IG_DOMAIN=hawkinsig.com
NEXT_PUBLIC_INSURANCE_HAWK_DOMAIN=insurance-hawk.com
```

### `.env.production`
```bash
# Same as .env.local but for production
NEXT_PUBLIC_META_PIXEL_ID=1274893120216161
META_CONVERSIONS_API_ACCESS_TOKEN=EAAUIeGfjIE4BPUwSVZB6ZCITr8OElpdY64yYmFgur8Pp7pO7ZB93qbjulifIBQwNQztENkLQSSZAdUQLd0aVPyhpxLZBbpgXtCMnyBpYNzbh4vWFd6l5KLVuX42g2rjDdaqhTMZAtJZA5q0AGplLafosHWQZBNrfZBVBV7R2ety5VhdytsiCLTdBUNEMPPDYU1AZDZD
META_TEST_EVENT_CODE=TEST88538
NEXT_PUBLIC_HAWKINS_IG_DOMAIN=hawkinsig.com
NEXT_PUBLIC_INSURANCE_HAWK_DOMAIN=insurance-hawk.com
```

---

## 🔗 **2. Cross-Domain Tracking Configuration**

### `src/lib/tracking-config.ts`
```typescript
// Shared tracking configuration between Hawkins IG and Insurance Hawk

export const TRACKING_CONFIG = {
  // Same pixel ID for both domains
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID!,
  
  // Cross-domain settings
  domains: {
    hawkinsIg: process.env.NEXT_PUBLIC_HAWKINS_IG_DOMAIN || 'hawkinsig.com',
    insuranceHawk: process.env.NEXT_PUBLIC_INSURANCE_HAWK_DOMAIN || 'insurance-hawk.com'
  },
  
  // Event mapping for user journey
  events: {
    // From Hawkins IG
    getStarted: 'SubmitApplication',
    newsletter: 'CompleteRegistration',
    pageView: 'ViewContent',
    
    // Insurance Hawk specific
    quoteStarted: 'InitiateCheckout',
    quoteCompleted: 'Purchase',
    leadGenerated: 'Lead',
    contactRequested: 'Contact'
  },
  
  // URL parameters for cross-domain tracking
  trackingParams: {
    source: 'utm_source',
    medium: 'utm_medium', 
    campaign: 'utm_campaign',
    fbclid: 'fbclid', // Facebook click ID
    eventId: 'event_id', // For deduplication
    userJourney: 'user_journey' // Track journey stage
  }
}

// Helper to detect referral from Hawkins IG
export const isFromHawkinsIG = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const referrer = document.referrer
  const urlParams = new URLSearchParams(window.location.search)
  
  return (
    referrer.includes(TRACKING_CONFIG.domains.hawkinsIg) ||
    urlParams.get('utm_source') === 'hawkins_ig' ||
    urlParams.has('user_journey')
  )
}

// Generate cross-domain tracking URL
export const buildCrossDomainUrl = (
  baseUrl: string,
  eventId?: string,
  userJourney?: string,
  additionalParams?: Record<string, string>
): string => {
  const url = new URL(baseUrl)
  
  // Add tracking parameters
  if (eventId) {
    url.searchParams.set('event_id', eventId)
  }
  
  if (userJourney) {
    url.searchParams.set('user_journey', userJourney)
  }
  
  // Add source attribution
  url.searchParams.set('utm_source', 'hawkins_ig')
  url.searchParams.set('utm_medium', 'referral')
  
  // Add any additional parameters
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  
  return url.toString()
}
```

---

## 📝 **3. Insurance Hawk Specific Event Tracking**

### `src/components/form-tracking.tsx`
```typescript
// Insurance Hawk Quote-Specific Tracking
import { 
  trackInitiateCheckoutDual,
  trackPurchaseDual,
  trackLeadDual,
  trackContactDual,
  trackViewContentDual 
} from './dual-tracking'

// Quote Started Event
export const trackQuoteStarted = async (
  quoteData: {
    insuranceType: string
    coverage?: string
    premium?: number
    email?: string
    zipCode?: string
    userId?: string
  },
  source: string = 'quote_form'
) => {
  await trackInitiateCheckoutDual('insurance_quote', {
    email: quoteData.email,
    zipCode: quoteData.zipCode,
  }, {
    content_name: \`\${quoteData.insuranceType} Quote\`,
    content_type: 'insurance_quote',
    insurance_type: quoteData.insuranceType,
    value: quoteData.premium || 0,
    currency: 'USD',
    source: source
  })
  
  console.log(\`🛒 Quote started: \${quoteData.insuranceType} - \${quoteData.email}\`)
}

// Quote Completed Event  
export const trackQuoteCompleted = async (
  quoteData: {
    insuranceType: string
    premium: number
    coverage: string
    email: string
    phone?: string
    firstName?: string
    lastName?: string
    zipCode?: string
    quoteId: string
  },
  source: string = 'quote_completion'
) => {
  await trackPurchaseDual('insurance_quote_completed', {
    email: quoteData.email,
    phone: quoteData.phone,
    firstName: quoteData.firstName,
    lastName: quoteData.lastName,
    zipCode: quoteData.zipCode,
  }, {
    content_name: \`\${quoteData.insuranceType} Quote Completed\`,
    content_type: 'insurance_quote',
    insurance_type: quoteData.insuranceType,
    value: quoteData.premium,
    currency: 'USD',
    quote_id: quoteData.quoteId,
    coverage_type: quoteData.coverage,
    source: source
  })
  
  console.log(\`💰 Quote completed: \${quoteData.insuranceType} - $\${quoteData.premium} - \${quoteData.email}\`)
}

// Lead Generation (When user requests contact)
export const trackInsuranceLeadGenerated = async (
  leadData: {
    email: string
    phone?: string
    firstName?: string
    lastName?: string
    zipCode?: string
    insuranceInterest: string[]
    preferredContact?: string
    urgency?: string
  },
  source: string = 'lead_form'
) => {
  await trackLeadDual('insurance_lead', {
    email: leadData.email,
    phone: leadData.phone,
    firstName: leadData.firstName,
    lastName: leadData.lastName,
    zipCode: leadData.zipCode,
  }, {
    content_name: 'Insurance Lead Generated',
    lead_type: 'insurance_inquiry',
    insurance_types: leadData.insuranceInterest.join(','),
    preferred_contact: leadData.preferredContact || 'email',
    urgency: leadData.urgency || 'normal',
    source: source
  })
  
  console.log(\`🎯 Insurance lead: \${leadData.insuranceInterest.join(', ')} - \${leadData.email}\`)
}

// Contact Request Event
export const trackContactRequest = async (
  contactData: {
    name: string
    email: string
    phone?: string
    message: string
    requestType: 'quote' | 'consultation' | 'support' | 'general'
    insuranceType?: string
  },
  source: string = 'contact_form'
) => {
  const [firstName, ...lastNameParts] = contactData.name.split(' ')
  const lastName = lastNameParts.join(' ')
  
  await trackContactDual('contact_request', {
    email: contactData.email,
    phone: contactData.phone,
    firstName: firstName,
    lastName: lastName,
  }, {
    content_name: 'Contact Request',
    contact_type: contactData.requestType,
    insurance_type: contactData.insuranceType,
    source: source
  })
  
  console.log(\`📞 Contact request: \${contactData.requestType} - \${contactData.email}\`)
}

// Cross-Domain Journey Tracking
export const trackCrossDomainJourney = async (
  journeyData: {
    fromDomain: string
    toDomain: string
    userAction: string
    eventId?: string
    userData?: {
      email?: string
      zipCode?: string
    }
  }
) => {
  await trackViewContentDual('cross_domain_journey', journeyData.userData || {}, {
    content_name: 'Cross Domain Journey',
    from_domain: journeyData.fromDomain,
    to_domain: journeyData.toDomain,
    user_action: journeyData.userAction,
    journey_stage: 'transition'
  })
  
  console.log(\`🔗 Cross-domain: \${journeyData.fromDomain} → \${journeyData.toDomain} (\${journeyData.userAction})\`)
}

// Page View with Cross-Domain Context
export const trackInsurancePageView = async (
  route: string, 
  userContext?: {
    email?: string
    zipCode?: string
    referralSource?: string
    userJourney?: string
  }
) => {
  let contentType = 'general'
  
  if (route.includes('/quotes/')) {
    contentType = 'quote_page'
  } else if (route.includes('/contact')) {
    contentType = 'contact_page'
  } else if (route.includes('/insurance/')) {
    contentType = 'product_page'
  }
  
  await trackViewContentDual(contentType, userContext || {}, {
    content_name: \`Insurance Hawk - \${route}\`,
    page_type: contentType,
    referral_source: userContext?.referralSource,
    user_journey: userContext?.userJourney
  })
  
  console.log(\`👀 Insurance page view: \${route} (\${contentType})\`)
}
```

---

## 🚀 **4. Implementation Steps**

### **Step 1: Copy Core Files**
1. Copy `meta-pixel.tsx` from Hawkins IG
2. Copy `dual-tracking.tsx` from Hawkins IG  
3. Copy the Conversions API route from Hawkins IG
4. Create the new files shown above

### **Step 2: Update Layout**
Add to your Insurance Hawk `layout.tsx`:

```typescript
import MetaPixel from '@/components/meta-pixel'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}
```

### **Step 3: Add Cross-Domain Links in Hawkins IG**
Update quote buttons in Hawkins IG to include tracking:

```typescript
import { buildCrossDomainUrl } from '@/lib/tracking-config'
import { generateEventId } from '@/components/dual-tracking'

// When user clicks "Get Quote" 
const handleGetQuote = (insuranceType: string) => {
  const eventId = generateEventId()
  const quoteUrl = buildCrossDomainUrl(
    \`https://insurance-hawk.com/quotes/\${insuranceType}\`,
    eventId,
    'quote_request',
    {
      insurance_type: insuranceType,
      referrer: 'hawkins_ig_get_started'
    }
  )
  
  // Track the exit event
  trackViewContentDual('quote_referral', {}, {
    content_name: 'Quote Referral to Insurance Hawk',
    insurance_type: insuranceType,
    destination_url: quoteUrl
  })
  
  window.open(quoteUrl, '_blank')
}
```

### **Step 4: Handle Cross-Domain Entry in Insurance Hawk**
Add to your Insurance Hawk pages:

```typescript
import { useEffect } from 'react'
import { trackCrossDomainJourney, trackInsurancePageView } from '@/components/form-tracking'
import { isFromHawkinsIG } from '@/lib/tracking-config'

export default function QuotePage() {
  useEffect(() => {
    // Track page view
    trackInsurancePageView(window.location.pathname)
    
    // Track cross-domain journey if coming from Hawkins IG
    if (isFromHawkinsIG()) {
      const urlParams = new URLSearchParams(window.location.search)
      trackCrossDomainJourney({
        fromDomain: 'hawkinsig.com',
        toDomain: 'insurance-hawk.com',
        userAction: 'quote_request',
        eventId: urlParams.get('event_id') || undefined
      })
    }
  }, [])
  
  // Your component content...
}
```

---

## 🎯 **5. Event Strategy Summary**

### **User Journey Events:**
1. **Hawkins IG**: Newsletter → `CompleteRegistration`
2. **Hawkins IG**: Get Started → `SubmitApplication`  
3. **Hawkins IG**: Quote Referral → `ViewContent` (quote_referral)
4. **Insurance Hawk**: Quote Started → `InitiateCheckout`
5. **Insurance Hawk**: Quote Completed → `Purchase`
6. **Insurance Hawk**: Lead Generated → `Lead`

This creates a complete funnel from awareness to conversion across both domains!

---

## ✅ **Implementation Checklist**

- [ ] Copy core tracking files to Insurance Hawk
- [ ] Set up environment variables  
- [ ] Add Meta Pixel to layout
- [ ] Create quote-specific tracking functions
- [ ] Update Hawkins IG quote buttons with cross-domain tracking
- [ ] Add cross-domain detection to Insurance Hawk pages
- [ ] Test complete user journey
- [ ] Verify events in Facebook Events Manager

Would you like me to create any specific files or provide more detailed implementation for certain parts?