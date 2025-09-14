// Example implementation for adding cross-domain tracking to quote buttons in Hawkins IG
// Add this to your quote components where users can click to go to Insurance Hawk

import { buildCrossDomainUrl } from '@/lib/cross-domain-tracking'
import { trackQuoteReferral } from '@/components/cross-domain-tracker'
import { generateEventId } from '@/components/dual-tracking'

// Example: Update your quote buttons with cross-domain tracking
export const enhanceQuoteButtonsWithTracking = () => {
  
  // Example for Medicare quote button
  const handleMedicareQuoteClick = async (userEmail?: string, userZipCode?: string) => {
    const eventId = generateEventId()
    const quoteUrl = buildCrossDomainUrl(
      'https://insurance-hawk.com/quotes/medicare',
      eventId,
      'medicare_quote_request',
      {
        insurance_type: 'medicare',
        referrer: 'hawkins_ig_quotes',
        source: 'quote_button'
      }
    )
    
    // Track the referral event
    await trackQuoteReferral('medicare', quoteUrl, {
      email: userEmail,
      zipCode: userZipCode
    })
    
    // Open the quote page in new tab/window
    window.open(quoteUrl, '_blank')
  }

  // Example for Life Insurance quote button
  const handleLifeInsuranceQuoteClick = async (userEmail?: string, userZipCode?: string) => {
    const eventId = generateEventId()
    const quoteUrl = buildCrossDomainUrl(
      'https://insurance-hawk.com/quotes/life-insurance',
      eventId,
      'life_insurance_quote_request',
      {
        insurance_type: 'life_insurance',
        referrer: 'hawkins_ig_quotes',
        source: 'quote_button'
      }
    )
    
    await trackQuoteReferral('life_insurance', quoteUrl, {
      email: userEmail,
      zipCode: userZipCode
    })
    
    window.open(quoteUrl, '_blank')
  }

  // Example for Health Insurance quote button
  const handleHealthInsuranceQuoteClick = async (userEmail?: string, userZipCode?: string) => {
    const eventId = generateEventId()
    const quoteUrl = buildCrossDomainUrl(
      'https://insurance-hawk.com/quotes/health-insurance',
      eventId,
      'health_insurance_quote_request',
      {
        insurance_type: 'health_insurance',
        referrer: 'hawkins_ig_quotes',
        source: 'quote_button'
      }
    )
    
    await trackQuoteReferral('health_insurance', quoteUrl, {
      email: userEmail,
      zipCode: userZipCode
    })
    
    window.open(quoteUrl, '_blank')
  }

  return {
    handleMedicareQuoteClick,
    handleLifeInsuranceQuoteClick,
    handleHealthInsuranceQuoteClick
  }
}

// Example JSX usage in your quote components:
/*

import { enhanceQuoteButtonsWithTracking } from './quote-tracking-helpers'

export default function QuoteButtonsSection({ userEmail, userZipCode }) {
  const { 
    handleMedicareQuoteClick,
    handleLifeInsuranceQuoteClick,
    handleHealthInsuranceQuoteClick 
  } = enhanceQuoteButtonsWithTracking()

  return (
    <div className="quote-buttons">
      <button 
        onClick={() => handleMedicareQuoteClick(userEmail, userZipCode)}
        className="quote-btn medicare"
      >
        Get Medicare Quote
      </button>
      
      <button 
        onClick={() => handleLifeInsuranceQuoteClick(userEmail, userZipCode)}
        className="quote-btn life"
      >
        Get Life Insurance Quote
      </button>
      
      <button 
        onClick={() => handleHealthInsuranceQuoteClick(userEmail, userZipCode)}
        className="quote-btn health"
      >
        Get Health Insurance Quote
      </button>
    </div>
  )
}

*/

// For existing quote links, you can enhance them like this:
export const enhanceExistingQuoteLinks = () => {
  // Find all quote links and enhance them
  if (typeof window !== 'undefined') {
    const quoteLinks = document.querySelectorAll('a[href*="insurance-hawk.com"]')
    
    quoteLinks.forEach((link) => {
      const originalHref = (link as HTMLAnchorElement).href
      const insuranceType = extractInsuranceTypeFromUrl(originalHref)
      
      link.addEventListener('click', async (e) => {
        e.preventDefault()
        
        const eventId = generateEventId()
        const enhancedUrl = buildCrossDomainUrl(
          originalHref,
          eventId,
          `${insuranceType}_quote_request`,
          {
            insurance_type: insuranceType,
            referrer: 'hawkins_ig_link',
            source: 'enhanced_link'
          }
        )
        
        await trackQuoteReferral(insuranceType, enhancedUrl)
        window.open(enhancedUrl, '_blank')
      })
    })
  }
}

// Helper to extract insurance type from URL
const extractInsuranceTypeFromUrl = (url: string): string => {
  const urlParts = url.split('/')
  const quotesIndex = urlParts.findIndex(part => part === 'quotes')
  
  if (quotesIndex !== -1 && urlParts[quotesIndex + 1]) {
    return urlParts[quotesIndex + 1].replace(/-/g, '_')
  }
  
  return 'general_insurance'
}

// Call this function when the page loads to enhance existing links
if (typeof window !== 'undefined') {
  window.addEventListener('load', enhanceExistingQuoteLinks)
}