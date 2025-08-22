import { z } from "zod"

// Discovery Question Types
export type QuestionType = 
  | "single-choice"
  | "multiple-choice" 
  | "text-input"
  | "number-input"
  | "date-input"
  | "zip-input"

// Scenario Detection
export type MedicareScenario = "A" | "B" | "C" | "D"

// Discovery Form Schema
export const discoveryFormSchema = z.object({
  // Basic Demographics & Quote Info
  age: z.number().min(18).max(120),
  zipCode: z.string().length(5, "Please enter a valid ZIP code"),
  gender: z.enum(["male", "female"]),
  tobaccoUse: z.boolean(),
  
  // Medicare Status Assessment
  medicareStatus: z.enum([
    "already-on-medicare",
    "turning-65-soon", 
    "over-65-employer-coverage",
    "not-eligible-yet"
  ]),

  // Coverage Needs Assessment
  coverageNeeds: z.array(z.enum([
    "medigap",
    "advantage", 
    "dental",
    "vision",
    "life",
    "cancer",
    "hospital",
    "long-term-care"
  ])).optional(),
  
  // Current Coverage Details
  currentCoverage: z.array(z.enum([
    "medicare-advantage",
    "medicare-supplement",
    "employer-health-plan",
    "prescription-drug-plan",
    "dental-insurance",
    "none"
  ])).optional(),
  
  // Health & Risk Assessment
  healthConcerns: z.array(z.enum([
    "routine-care",
    "chronic-conditions",
    "frequent-hospitalizations",
    "prescription-medications",
    "cancer-family-history",
    "dental-issues",
    "none"
  ])).optional(),
  
  // Financial Priorities
  budgetRange: z.enum([
    "under-100",
    "100-200",
    "200-300", 
    "300-500",
    "over-500"
  ]),
  
  // Coverage Priorities
  coveragePriorities: z.array(z.enum([
    "low-monthly-premium",
    "low-deductible",
    "prescription-coverage",
    "dental-coverage",
    "cancer-protection",
    "hospitalization-coverage",
    "provider-choice",
    "nationwide-coverage"
  ])),
  
  // Life Insurance Needs
  lifeInsuranceNeeds: z.enum([
    "final-expenses",
    "debt-protection", 
    "legacy-planning",
    "not-interested"
  ]).optional(),
  
  // Urgency Assessment
  timeframe: z.enum([
    "immediate",
    "within-30-days",
    "within-3-months",
    "just-researching"
  ]),
  
  // Contact Information
  contactInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    preferredContact: z.enum(["email", "phone", "text"])
  })
})

export type DiscoveryFormData = z.infer<typeof discoveryFormSchema>

// Question Flow Configuration
export interface DiscoveryQuestion {
  id: string
  type: QuestionType
  title: string
  description?: string
  options?: { value: string; label: string; description?: string }[]
  required: boolean
  conditional?: {
    dependsOn: string
    showWhen: string | string[]
  }
  validation?: z.ZodSchema
}

// Scenario Detection Logic
export function detectMedicareScenario(data: Partial<DiscoveryFormData>): MedicareScenario {
  const { age, medicareStatus, currentCoverage } = data
  
  // Scenario C: Turning 65 Soon (First-Time Medicare)
  if (medicareStatus === "turning-65-soon" || (age && age >= 64 && age <= 66 && medicareStatus !== "already-on-medicare")) {
    return "C"
  }
  
  // Scenario D: Over 65 with Employer Coverage
  if (medicareStatus === "over-65-employer-coverage" || 
      (age && age > 65 && currentCoverage?.includes("employer-health-plan"))) {
    return "D"
  }
  
  // Scenario A vs B: Already on Medicare
  if (medicareStatus === "already-on-medicare" && currentCoverage) {
    // Scenario A: Medicare Advantage focused
    if (currentCoverage.includes("medicare-advantage")) {
      return "A"
    }
    // Scenario B: Medicare Supplement focused  
    if (currentCoverage.includes("medicare-supplement")) {
      return "B"
    }
  }
  
  // Default to Scenario B (most comprehensive)
  return "B"
}

// Product Recommendations Engine
export interface ProductRecommendation {
  productType: string
  priority: "primary" | "supplemental" | "optional"
  reasoning: string
  estimatedSavings?: number
  crossSellOpportunity?: boolean
}

export function generateProductRecommendations(
  scenario: MedicareScenario,
  data: DiscoveryFormData
): ProductRecommendation[] {
  const recommendations: ProductRecommendation[] = []
  
  switch (scenario) {
    case "A": // Medicare Advantage focused
      recommendations.push(
        {
          productType: "medicare-advantage",
          priority: "primary",
          reasoning: "Primary coverage with built-in benefits",
          crossSellOpportunity: true
        },
        {
          productType: "hospital-indemnity",
          priority: "supplemental", 
          reasoning: "Fills coverage gaps in your Advantage plan",
          crossSellOpportunity: true
        },
        {
          productType: "cancer-insurance",
          priority: "supplemental",
          reasoning: "Critical protection for cancer-related costs",
          crossSellOpportunity: false
        }
      )
      break
      
    case "B": // Medicare Supplement focused
      recommendations.push(
        {
          productType: "Medicare Supplement",
          priority: "primary",
          reasoning: "Comprehensive coverage with provider choice",
          crossSellOpportunity: true
        },
        {
          productType: "prescription-drug-plan",
          priority: "primary",
          reasoning: "Required for prescription coverage",
          crossSellOpportunity: false
        },
        {
          productType: "Dental Insurance",
          priority: "supplemental",
          reasoning: "Medicare doesn't cover dental care",
          crossSellOpportunity: true
        },
        {
          productType: "Final Expense Life Insurance", 
          priority: "supplemental",
          reasoning: "Protects loved ones from burial costs",
          crossSellOpportunity: true
        }
      )
      break
      
    case "C": // Turning 65 Soon
      recommendations.push(
        {
          productType: "medicare-education",
          priority: "primary",
          reasoning: "Learn about Medicare options before enrollment",
          crossSellOpportunity: false
        },
        {
          productType: "Medicare Supplement",
          priority: "primary", 
          reasoning: "Best option for comprehensive coverage",
          crossSellOpportunity: true
        },
        {
          productType: "cancer-insurance",
          priority: "supplemental",
          reasoning: "Age-appropriate protection",
          crossSellOpportunity: false
        }
      )
      break
      
    case "D": // Employer Transition
      recommendations.push(
        {
          productType: "coverage-comparison",
          priority: "primary",
          reasoning: "Compare employer plan vs Medicare options",
          crossSellOpportunity: false
        },
        {
          productType: "Medicare Supplement",
          priority: "primary",
          reasoning: "Maintain comprehensive coverage",
          crossSellOpportunity: true
        },
        {
          productType: "cancer-insurance",
          priority: "supplemental", 
          reasoning: "Ensure continuous cancer protection",
          crossSellOpportunity: false
        }
      )
      break
  }
  
  // Add Final Expense Life based on age and interests
  if (data.age >= 50 && data.lifeInsuranceNeeds !== "not-interested") {
    recommendations.push({
      productType: "Final Expense Life Insurance",
      priority: "optional",
      reasoning: "Age-appropriate life insurance for final expenses",
      crossSellOpportunity: true
    })
  }
  
  return recommendations
}

// Lead Scoring Algorithm
export function calculateLeadScore(data: DiscoveryFormData, scenario: MedicareScenario): number {
  let score = 0
  
  // Age scoring (Medicare eligibility)
  if (data.age >= 65) score += 30
  else if (data.age >= 60) score += 20
  else if (data.age >= 50) score += 10
  
  // Urgency scoring
  switch (data.timeframe) {
    case "immediate": score += 40; break
    case "within-30-days": score += 30; break
    case "within-3-months": score += 20; break
    case "just-researching": score += 5; break
  }
  
  // Scenario complexity scoring
  switch (scenario) {
    case "C": score += 25; break // First-time Medicare (high value)
    case "D": score += 20; break // Employer transition (complex)
    case "B": score += 15; break // Supplement focused (profitable)
    case "A": score += 10; break // Advantage focused
  }
  
  // Health concerns (indicates need)
  if (data.healthConcerns?.length && data.healthConcerns.length > 0) {
    score += data.healthConcerns.length * 5
  }
  
  // Budget capacity
  switch (data.budgetRange) {
    case "over-500": score += 20; break
    case "300-500": score += 15; break
    case "200-300": score += 10; break
    case "100-200": score += 5; break
  }
  
  // Multiple coverage interests
  if (data.coveragePriorities.length > 3) score += 15
  
  return Math.min(score, 100) // Cap at 100
}
