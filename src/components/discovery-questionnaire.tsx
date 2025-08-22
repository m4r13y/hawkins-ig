"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, User, Shield, Heart, DollarSign, Phone, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  discoveryFormSchema, 
  type DiscoveryFormData, 
  detectMedicareScenario,
  generateProductRecommendations,
  calculateLeadScore,
  type MedicareScenario
} from "@/lib/discovery-engine"
import { getMedigapQuotes, type MedigapQuoteParams } from "@/lib/actions/medigap-quotes"
import { getDentalQuotes, type DentalQuoteParams } from "@/lib/actions/dental-quotes"
import { getCancerQuotes, type CancerQuoteParams } from "@/lib/actions/cancer-quotes"
import { getHospitalIndemnityQuotes, type HospitalIndemnityQuoteParams } from "@/lib/actions/hospital-indemnity-quotes"
import { getFinalExpenseLifeQuotes, type FinalExpenseLifeQuoteParams } from "@/lib/actions/final-expense-life-quotes"

interface DiscoveryQuestionnaireProps {
  onComplete: (data: DiscoveryFormData, scenario: MedicareScenario, recommendations: any[], leadScore: number) => void
}

// Question Steps Configuration
const questionSteps = [
  {
    id: "quote-basics",
    title: "Let's Get Your Quote Started",
    description: "Essential information for pricing your plans",
    icon: User,
    fields: ["age", "zipCode", "gender", "tobaccoUse"]
  },
  {
    id: "coverage-needs", 
    title: "Coverage Discovery",
    description: "What type of Medicare coverage are you looking for?",
    icon: Shield,
    fields: ["medicareStatus", "currentCoverage", "coverageNeeds"]
  },
  {
    id: "health-priorities",
    title: "Health & Priorities", 
    description: "Help us understand what matters most to you",
    icon: Heart,
    fields: ["healthConcerns", "coveragePriorities"]
  },
  {
    id: "personal-preferences",
    title: "Personal Preferences",
    description: "Budget, timeline, and additional needs",
    icon: DollarSign,
    fields: ["budgetRange", "lifeInsuranceNeeds", "timeframe"]
  },
  {
    id: "personalized-plans",
    title: "Your Personalized Plans & Pricing",
    description: "Based on your responses, here are your exact plans and costs",
    icon: Sparkles,
    fields: []
  },
  {
    id: "enrollment",
    title: "Ready to Enroll?",
    description: "Complete your enrollment to secure your coverage",
    icon: Phone,
    fields: ["contactInfo"]
  }
]

export default function DiscoveryQuestionnaire({ onComplete }: DiscoveryQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [scenario, setScenario] = useState<MedicareScenario>("B")
  const [currentRecommendations, setCurrentRecommendations] = useState<any[]>([])
  const [currentLeadScore, setCurrentLeadScore] = useState(0)
  const [quotesLoading, setQuotesLoading] = useState(false)
  const [backgroundQuotes, setBackgroundQuotes] = useState<any>(null)
  
  const form = useForm<DiscoveryFormData>({
    resolver: zodResolver(discoveryFormSchema),
    defaultValues: {
      age: 0,
      zipCode: "",
      gender: undefined,
      tobaccoUse: undefined,
      medicareStatus: undefined,
      coverageNeeds: [],
      coveragePriorities: [],
      healthConcerns: [],
      currentCoverage: [],
      budgetRange: undefined,
      lifeInsuranceNeeds: undefined,
      timeframe: undefined,
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      }
    }
  })
  
  const currentStepData = questionSteps[currentStep]
  const progress = ((currentStep + 1) / questionSteps.length) * 100
  
  // Watch for changes to detect scenario
  const watchedValues = form.watch()
  
  // Update scenario when relevant fields change
  const updateScenario = () => {
    const detectedScenario = detectMedicareScenario(watchedValues)
    setScenario(detectedScenario)
  }

  // Start background quote generation
  const startBackgroundQuotes = async (formData: Partial<DiscoveryFormData>) => {
    if (!formData.age || !formData.zipCode || !formData.gender || formData.tobaccoUse === undefined) {
      return
    }

    setQuotesLoading(true)
    
    try {
      // Convert form data to API format
      const gender = formData.gender === "male" ? "M" : "F"
      const tobacco = formData.tobaccoUse ? "1" : "0"
      const age = formData.age

      // Start multiple quote requests in parallel using server actions
      const quotePromises = [
        // Medigap quotes
        getMedigapQuotes({
          zipCode: formData.zipCode,
          age: age.toString(),
          gender: gender,
          tobacco: tobacco,
          plans: ["F", "G", "N"] // Most popular plans
        }).then(result => ({
          type: 'medigap',
          data: result.quotes ? { plans: result.quotes.map(q => ({
            planName: `Plan ${q.plan_letter} - ${q.carrier.name}`,
            monthlyPremium: q.monthly_premium,
            planType: `Plan ${q.plan_letter}`,
            carrier: q.carrier.name,
            deductible: 0
          }))} : null,
          error: result.error
        })),

        // Dental quotes
        getDentalQuotes({
          zipCode: formData.zipCode,
          age: age,
          gender: gender,
          tobacco: tobacco,
          covered_members: "I"
        }).then(result => ({
          type: 'dental',
          data: result.quotes ? { plans: result.quotes.map(q => ({
            planName: q.plan_name,
            monthlyPremium: q.monthly_premium,
            planType: "Dental",
            carrier: q.carrier.name,
            deductible: 0
          }))} : null,
          error: result.error
        })),

        // Cancer quotes (only for TX and GA)
        getCancerQuotes({
          state: "TX", // Default to TX, could be enhanced with ZIP to state mapping
          age: age,
          familyType: "Applicant Only",
          tobaccoStatus: formData.tobaccoUse ? "Tobacco" : "Non-Tobacco",
          premiumMode: "Monthly Bank Draft",
          carcinomaInSitu: "100%",
          benefitAmount: 10000
        }).then(result => ({
          type: 'cancer',
          data: result.quotes ? { plans: result.quotes.map(q => ({
            planName: q.plan_name,
            monthlyPremium: q.monthly_premium,
            planType: "Cancer Insurance",
            carrier: q.carrier,
            deductible: 0
          }))} : null,
          error: result.error
        })),

        // Hospital Indemnity quotes
        getHospitalIndemnityQuotes({
          zipCode: formData.zipCode,
          age: age,
          gender: gender,
          tobacco: tobacco
        }).then(result => ({
          type: 'hospital-indemnity',
          data: result.quotes ? { plans: result.quotes.map(q => ({
            planName: q.plan_name,
            monthlyPremium: q.monthly_premium || 0,
            planType: "Hospital Indemnity",
            carrier: q.carrier.name,
            deductible: 0
          }))} : null,
          error: result.error
        })),

        // Final Expense Life Insurance quotes
        getFinalExpenseLifeQuotes({
          zipCode: formData.zipCode,
          age: age,
          gender: gender,
          tobacco: tobacco,
          quotingType: "by_face_value",
          desiredFaceValue: 25000
        }).then(result => ({
          type: 'life-insurance',
          data: result.quotes ? { plans: result.quotes.map(q => ({
            planName: q.plan_name,
            monthlyPremium: q.monthly_rate,
            planType: "Final Expense Life",
            carrier: q.carrier.name,
            deductible: 0
          }))} : null,
          error: result.error
        }))
      ]

      const results = await Promise.allSettled(quotePromises)
      const quotes = results.map((result, index) => {
        if (result.status === 'fulfilled' && result.value.data && !result.value.error) {
          return result.value
        }
        console.error(`Quote error for ${['medigap', 'dental', 'cancer', 'hospital-indemnity', 'life-insurance'][index]}:`, 
          result.status === 'fulfilled' ? result.value.error : result.reason)
        return null
      }).filter(Boolean)

      setBackgroundQuotes(quotes)
    } catch (error) {
      console.error('Error generating background quotes:', error)
    } finally {
      setQuotesLoading(false)
    }
  }
  
  const nextStep = async () => {
    const fieldsToValidate = currentStepData.fields
    const isValid = await form.trigger(fieldsToValidate as any)
    
    if (isValid) {
      updateScenario()
      
      // Start background quote generation after step 1 (quote basics)
      if (currentStep === 0) {
        const formData = form.getValues()
        startBackgroundQuotes(formData)
      }
      
      // Generate final recommendations when moving to step 5 (personalized plans)
      if (currentStep === 3) {
        const formData = form.getValues()
        const detectedScenario = detectMedicareScenario(formData)
        const recommendations = generateProductRecommendations(detectedScenario, formData)
        const leadScore = calculateLeadScore(formData, detectedScenario)
        
        setCurrentRecommendations(recommendations)
        setCurrentLeadScore(leadScore)
        setScenario(detectedScenario)
      }
      
      if (currentStep < questionSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const onSubmit = (data: DiscoveryFormData) => {
    const finalScenario = detectMedicareScenario(data)
    const recommendations = generateProductRecommendations(finalScenario, data)
    const leadScore = calculateLeadScore(data, finalScenario)
    
    onComplete(data, finalScenario, recommendations, leadScore)
  }
  
  const StepIcon = currentStepData.icon
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <StepIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {currentStepData.description}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {questionSteps.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StepIcon className="h-5 w-5" />
                    {currentStepData.title}
                  </CardTitle>
                  <CardDescription>
                    {currentStepData.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step Content */}
                  {currentStep === 0 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>What's your age?</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="65"
                                  {...field}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormDescription>
                                We'll use this to find plans available in your area
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value || ""}
                                  className="flex gap-6"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">Male</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="female" id="female" />
                                    <Label htmlFor="female">Female</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tobaccoUse"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Do you use tobacco?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => field.onChange(value === "true")}
                                  value={field.value === undefined ? "" : field.value.toString()}
                                  className="flex gap-6"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="no-tobacco" />
                                    <Label htmlFor="no-tobacco">No</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="yes-tobacco" />
                                    <Label htmlFor="yes-tobacco">Yes</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormDescription>
                                This affects pricing for life and some health insurance products
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {quotesLoading && (
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            <span className="text-blue-800 dark:text-blue-200 font-medium">
                              Generating your personalized quotes in the background...
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {currentStep === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="medicareStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Which best describes your Medicare situation?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                className="grid grid-cols-1 gap-4"
                              >
                                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <RadioGroupItem value="already-on-medicare" id="already-on-medicare" />
                                  <Label htmlFor="already-on-medicare" className="flex-1 cursor-pointer">
                                    <div className="font-medium">I'm already on Medicare</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      I have Medicare coverage and want to review my options
                                    </div>
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <RadioGroupItem value="turning-65-soon" id="turning-65-soon" />
                                  <Label htmlFor="turning-65-soon" className="flex-1 cursor-pointer">
                                    <div className="font-medium">I'm turning 65 soon</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      I need to enroll in Medicare for the first time
                                    </div>
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <RadioGroupItem value="over-65-employer-coverage" id="over-65-employer-coverage" />
                                  <Label htmlFor="over-65-employer-coverage" className="flex-1 cursor-pointer">
                                    <div className="font-medium">I'm over 65 with employer coverage</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      I have employer health insurance but considering Medicare
                                    </div>
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <RadioGroupItem value="not-eligible-yet" id="not-eligible-yet" />
                                  <Label htmlFor="not-eligible-yet" className="flex-1 cursor-pointer">
                                    <div className="font-medium">I'm not eligible yet</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      I'm under 65 and planning ahead
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coverageNeeds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What type of coverage are you most interested in?</FormLabel>
                            <FormDescription>
                              Select all that apply - we'll show you relevant options
                            </FormDescription>
                            <FormControl>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  { value: "medigap", label: "Medicare Supplement (Medigap)", desc: "Fill gaps in Original Medicare" },
                                  { value: "advantage", label: "Medicare Advantage", desc: "Alternative to Original Medicare" },
                                  { value: "dental", label: "Dental Coverage", desc: "Dental insurance plans" },
                                  { value: "vision", label: "Vision Coverage", desc: "Eye care and glasses" },
                                  { value: "life", label: "Life Insurance", desc: "Term or whole life coverage" },
                                  { value: "cancer", label: "Cancer Insurance", desc: "Specialized cancer coverage" },
                                  { value: "hospital", label: "Hospital Indemnity", desc: "Cash for hospital stays" },
                                  { value: "long-term-care", label: "Long-term Care", desc: "Nursing home and home care" }
                                ].map((option) => (
                                  <div key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg">
                                    <Checkbox
                                      id={option.value}
                                      checked={field.value?.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = checked
                                          ? [...(field.value || []), option.value]
                                          : (field.value || []).filter((value: string) => value !== option.value)
                                        field.onChange(updatedValue)
                                      }}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                      <Label htmlFor={option.value} className="font-medium">
                                        {option.label}
                                      </Label>
                                      <p className="text-xs text-muted-foreground">
                                        {option.desc}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {watchedValues.medicareStatus === "already-on-medicare" && (
                        <FormField
                          control={form.control}
                          name="currentCoverage"
                          render={() => (
                            <FormItem>
                              <FormLabel>What coverage do you currently have? (Select all that apply)</FormLabel>
                              <div className="grid grid-cols-2 gap-4">
                                {[
                                  { id: "medicare-advantage", label: "Medicare Advantage Plan" },
                                  { id: "medicare-supplement", label: "Medicare Supplement (Medigap)" },
                                  { id: "prescription-drug-plan", label: "Prescription Drug Plan" },
                                  { id: "dental-insurance", label: "Dental Insurance" },
                                  { id: "employer-health-plan", label: "Employer Health Plan" },
                                  { id: "none", label: "None of the above" },
                                ].map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="currentCoverage"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id as any)}
                                            onCheckedChange={(checked: boolean) => {
                                              const value = field.value || []
                                              if (checked) {
                                                field.onChange([...value, item.id])
                                              } else {
                                                field.onChange(value.filter((v: string) => v !== item.id))
                                              }
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  )}
                  
                  {currentStep === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="healthConcerns"
                        render={() => (
                          <FormItem>
                            <FormLabel>What are your main health concerns? (Select all that apply)</FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { id: "routine-care", label: "Routine preventive care" },
                                { id: "chronic-conditions", label: "Managing chronic conditions" },
                                { id: "frequent-hospitalizations", label: "Frequent hospital visits" },
                                { id: "prescription-medications", label: "Prescription medications" },
                                { id: "cancer-family-history", label: "Cancer family history" },
                                { id: "dental-issues", label: "Dental care needs" },
                                { id: "none", label: "No specific concerns" },
                              ].map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="healthConcerns"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id as any)}
                                          onCheckedChange={(checked: boolean) => {
                                            const value = field.value || []
                                            if (checked) {
                                              field.onChange([...value, item.id])
                                            } else {
                                              field.onChange(value.filter((v: string) => v !== item.id))
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="coveragePriorities"
                        render={() => (
                          <FormItem>
                            <FormLabel>What's most important to you in health coverage? (Select your top priorities)</FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { id: "low-monthly-premium", label: "Low monthly premiums" },
                                { id: "low-deductible", label: "Low deductibles" },
                                { id: "prescription-coverage", label: "Good prescription coverage" },
                                { id: "dental-coverage", label: "Dental coverage" },
                                { id: "cancer-protection", label: "Cancer protection" },
                                { id: "hospitalization-coverage", label: "Hospital coverage" },
                                { id: "provider-choice", label: "Freedom to choose doctors" },
                                { id: "nationwide-coverage", label: "Nationwide coverage" },
                              ].map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="coveragePriorities"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id as any)}
                                          onCheckedChange={(checked: boolean) => {
                                            const value = field.value || []
                                            if (checked) {
                                              field.onChange([...value, item.id])
                                            } else {
                                              field.onChange(value.filter((v: string) => v !== item.id))
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal cursor-pointer">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {currentStep === 3 && (
                    <>
                      <FormField
                        control={form.control}
                        name="budgetRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What's your monthly budget for health insurance?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value || ""}
                                className="grid grid-cols-1 gap-3"
                              >
                                {[
                                  { value: "under-100", label: "Under $100/month" },
                                  { value: "100-200", label: "$100 - $200/month" },
                                  { value: "200-300", label: "$200 - $300/month" },
                                  { value: "300-500", label: "$300 - $500/month" },
                                  { value: "over-500", label: "Over $500/month" },
                                ].map((item) => (
                                  <div key={item.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <RadioGroupItem value={item.value} id={item.value} />
                                    <Label htmlFor={item.value} className="flex-1 cursor-pointer font-medium">
                                      {item.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lifeInsuranceNeeds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Are you interested in life insurance for final expenses?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-1 gap-3"
                              >
                                {[
                                  { value: "final-expenses", label: "Yes, for final expenses and burial costs" },
                                  { value: "debt-protection", label: "Yes, to protect family from debt" },
                                  { value: "legacy-planning", label: "Yes, for legacy planning" },
                                  { value: "not-interested", label: "Not interested at this time" },
                                ].map((item) => (
                                  <div key={item.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <RadioGroupItem value={item.value} id={item.value} />
                                    <Label htmlFor={item.value} className="flex-1 cursor-pointer font-medium">
                                      {item.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="timeframe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>When are you looking to make a decision?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-1 gap-3"
                              >
                                {[
                                  { value: "immediate", label: "Immediately - I need coverage now" },
                                  { value: "within-30-days", label: "Within 30 days" },
                                  { value: "within-3-months", label: "Within 3 months" },
                                  { value: "just-researching", label: "Just researching for now" },
                                ].map((item) => (
                                  <div key={item.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <RadioGroupItem value={item.value} id={item.value} />
                                    <Label htmlFor={item.value} className="flex-1 cursor-pointer font-medium">
                                      {item.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      {/* Header with Background Quote Status */}
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="h-6 w-6 text-blue-600" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Your Personalized Plans & Pricing
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Based on your age ({form.watch("age")}), location ({form.watch("zipCode")}), and preferences
                            </p>
                          </div>
                        </div>
                        
                        {quotesLoading ? (
                          <div className="flex items-center gap-3 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            <span className="text-blue-800 dark:text-blue-200">
                              Finalizing your quotes and pricing...
                            </span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {backgroundQuotes?.length || 0}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Quote Types Available</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                {currentLeadScore}/100
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Match Score</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                {backgroundQuotes?.find(q => q.type === 'medigap')?.data?.plans?.[0]?.monthlyPremium ? 
                                  `$${backgroundQuotes.find(q => q.type === 'medigap').data.plans[0].monthlyPremium}` : 
                                  "Custom"
                                }
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Starting From</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quote Results */}
                      {backgroundQuotes && backgroundQuotes.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Available Plans & Pricing:
                          </h4>
                          
                          {backgroundQuotes.map((quote, index) => (
                            <div key={index} className="p-6 border rounded-lg hover:border-blue-300 transition-colors bg-white dark:bg-gray-800">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h5 className="font-bold text-lg text-gray-900 dark:text-white capitalize">
                                    {quote.type.replace('-', ' ')} Plans
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {quote.type === 'medigap' && "Supplement plans to fill Medicare gaps"}
                                    {quote.type === 'cancer' && "Specialized cancer insurance coverage"}
                                    {quote.type === 'dental' && "Comprehensive dental coverage"}
                                    {quote.type === 'hospital-indemnity' && "Cash benefits for hospital stays"}
                                    {quote.type === 'life-insurance' && "Life insurance protection"}
                                  </p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                  Available
                                </span>
                              </div>
                              
                              {/* Show top 3 plans for each type */}
                              {quote.data?.plans?.slice(0, 3).map((plan: any, planIndex: number) => (
                                <div key={planIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                                  <div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {plan.planName || plan.carrier || `Plan ${planIndex + 1}`}
                                    </span>
                                    {plan.planType && (
                                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        ({plan.planType})
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold text-lg text-green-600">
                                      ${plan.monthlyPremium || plan.premium || 'Custom'}
                                      {(plan.monthlyPremium || plan.premium) && <span className="text-sm font-normal">/month</span>}
                                    </div>
                                    {plan.deductible && (
                                      <div className="text-xs text-gray-500">
                                        ${plan.deductible} deductible
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              
                              {/* Show plan count if more available */}
                              {quote.data?.plans?.length > 3 && (
                                <p className="text-sm text-blue-600 mt-2">
                                  +{quote.data.plans.length - 3} more plans available
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Scenario-based Recommendations */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Why These Plans Are Perfect For You:
                        </h4>
                        {currentRecommendations.map((rec, index) => (
                          <div key={index} className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-yellow-900">{index + 1}</span>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                  {rec.productType}
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {rec.reasoning}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Ready to Enroll CTA */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                          Ready to Secure Your Coverage?
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          These prices are locked in and ready for enrollment. Click next to complete your application.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                          <span>✓ Instant approval</span>
                          <span>✓ No medical exam</span>
                          <span>✓ Coverage starts immediately</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      {/* Action Choice */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          How would you like to proceed?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Choose the option that works best for your timeline
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Enrollment Path */}
                        <div className="p-6 border-2 border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <div className="text-center mb-4">
                            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              Ready to Enroll
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Get instant quotes and speak with a specialist
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="contactInfo.firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="contactInfo.lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Smith" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="contactInfo.email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john@example.com" type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="contactInfo.phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(555) 123-4567" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                                )}
                              />
                            
                            <FormField
                              control={form.control}
                              name="contactInfo.preferredContact"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Contact Method</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      className="grid grid-cols-1 gap-2"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="contact-email" />
                                        <Label htmlFor="contact-email">Email</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="contact-phone" />
                                        <Label htmlFor="contact-phone">Phone Call</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="text" id="contact-text" />
                                        <Label htmlFor="contact-text">Text Message</Label>
                                      </div>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Save for Later Path */}
                        <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <div className="text-center mb-4">
                            <User className="h-12 w-12 text-green-600 mx-auto mb-3" />
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              Save for Later
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Create a Hawknest account to save your recommendations
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Save your personalized recommendations</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Access quotes anytime in your portal</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Track enrollment deadlines</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Get updates on plan changes</span>
                              </div>
                            </div>
                            
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => {
                                // Handle Hawknest account creation
                                const formData = form.getValues()
                                const finalScenario = detectMedicareScenario(formData)
                                const recommendations = generateProductRecommendations(finalScenario, formData)
                                const leadScore = calculateLeadScore(formData, finalScenario)
                                
                                // Redirect to Hawknest signup with data
                                alert("Redirecting to Hawknest portal to create your account...")
                                // window.location.href = `/hawknest/signup?data=${encodeURIComponent(JSON.stringify({formData, scenario: finalScenario, recommendations, leadScore}))}`
                              }}
                            >
                              Create Hawknest Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            {currentStep === 4 ? (
              // Plans & Pricing step - continue to enrollment
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                Proceed to Enrollment
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : currentStep === 5 ? (
              // Enrollment step - submit with contact info
              <Button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                disabled={!form.watch("contactInfo.firstName")}
              >
                Complete Enrollment
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : currentStep < questionSteps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                {currentStep === 0 ? "Start Quote Generation" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                Get My Plans & Pricing
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>
      
      {/* Scenario Preview (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Detected Scenario:</strong> {scenario} 
            {scenario === "A" && " (Medicare Advantage focused)"}
            {scenario === "B" && " (Medicare Supplement focused)"}
            {scenario === "C" && " (Turning 65 soon)"}
            {scenario === "D" && " (Employer transition)"}
          </div>
        </div>
      )}
    </div>
  )
}
