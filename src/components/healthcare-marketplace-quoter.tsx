"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, DollarSign, Star, Building, Heart, Stethoscope, Info } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.coerce.number().min(18, "Age must be at least 18").max(64, "Age cannot exceed 64 for marketplace plans"),
  householdSize: z.coerce.number().min(1, "Household size must be at least 1").max(8, "Maximum household size is 8"),
  income: z.coerce.number().min(1, "Income must be greater than 0"),
  metalLevel: z.enum(["Bronze", "Silver", "Gold", "Platinum", "Catastrophic"], { required_error: "Please select metal level" }),
  planType: z.enum(["HMO", "PPO", "EPO", "POS"], { required_error: "Please select plan type" }),
})

type FormData = z.infer<typeof formSchema>

interface MarketplacePlan {
  id: string
  name: string
  carrier: string
  metalLevel: string
  planType: string
  monthlyPremium: number
  deductible: number
  outOfPocketMax: number
  copayPrimarycare: number
  copaySpecialist: number
  coinsuranceRate: number
  prescriptionCoverage: boolean
  networkSize: string
  starRating: number
  subsidyEligible: boolean
  subsidyAmount?: number
}

export default function HealthcareMarketplaceQuoter() {
  const [plans, setPlans] = useState<MarketplacePlan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: 35,
      householdSize: 1,
      income: 50000,
      metalLevel: "Silver",
      planType: "HMO",
    },
  })

  // Mock data for demonstration
  const mockPlans: MarketplacePlan[] = [
    {
      id: "hc_001",
      name: "HealthFirst Silver 2000",
      carrier: "HealthFirst Insurance",
      metalLevel: "Silver",
      planType: "HMO",
      monthlyPremium: 450,
      deductible: 2000,
      outOfPocketMax: 8000,
      copayPrimarycare: 25,
      copaySpecialist: 50,
      coinsuranceRate: 20,
      prescriptionCoverage: true,
      networkSize: "Large",
      starRating: 4.2,
      subsidyEligible: true,
      subsidyAmount: 150,
    },
    {
      id: "hc_002",
      name: "BlueChoice Silver Plus",
      carrier: "Blue Cross Blue Shield",
      metalLevel: "Silver",
      planType: "PPO",
      monthlyPremium: 520,
      deductible: 1500,
      outOfPocketMax: 7500,
      copayPrimarycare: 20,
      copaySpecialist: 40,
      coinsuranceRate: 15,
      prescriptionCoverage: true,
      networkSize: "Extra Large",
      starRating: 4.5,
      subsidyEligible: true,
      subsidyAmount: 150,
    },
    {
      id: "hc_003",
      name: "Kaiser Bronze Essential",
      carrier: "Kaiser Permanente",
      metalLevel: "Bronze",
      planType: "HMO",
      monthlyPremium: 320,
      deductible: 6500,
      outOfPocketMax: 8500,
      copayPrimarycare: 50,
      copaySpecialist: 80,
      coinsuranceRate: 40,
      prescriptionCoverage: true,
      networkSize: "Large",
      starRating: 4.0,
      subsidyEligible: true,
      subsidyAmount: 150,
    },
  ]

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setPlans([])

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Filter mock plans based on selections
      const filteredPlans = mockPlans.filter(plan => 
        plan.metalLevel === data.metalLevel && plan.planType === data.planType
      )
      
      // Calculate subsidies based on income and household size
      const enhancedPlans = filteredPlans.map(plan => ({
        ...plan,
        subsidyAmount: calculateSubsidy(data.income, data.householdSize, plan.monthlyPremium),
      }))
      
      setPlans(enhancedPlans)
      setStep(4)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateSubsidy = (income: number, householdSize: number, premium: number) => {
    // Simplified subsidy calculation
    const federalPovertyLevel = 12880 + (4540 * (householdSize - 1))
    const incomeAsPercentOfFPL = (income / federalPovertyLevel) * 100
    
    if (incomeAsPercentOfFPL <= 400) {
      // Eligible for premium subsidies
      const maxPercentOfIncome = incomeAsPercentOfFPL <= 150 ? 4 : 
                                 incomeAsPercentOfFPL <= 200 ? 6.5 : 
                                 incomeAsPercentOfFPL <= 250 ? 8.5 : 
                                 incomeAsPercentOfFPL <= 300 ? 9.5 : 11.5
      
      const maxMonthlyPayment = (income * (maxPercentOfIncome / 100)) / 12
      return Math.max(0, premium - maxMonthlyPayment)
    }
    
    return 0
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <section className="py-32 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Healthcare.gov Marketplace Plans</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find affordable health insurance through the Health Insurance Marketplace. 
            Compare plans and see if you qualify for premium subsidies to lower your costs.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Location & Personal Info */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Location & Personal Information</CardTitle>
                <CardDescription>
                  Provide your basic information for accurate plan availability and pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" min="18" max="64" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="householdSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Household Size</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="income"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Household Income</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
                    <Info className="h-4 w-4" />
                    <span>Income Information</span>
                  </h4>
                  <p className="text-blue-800 text-sm">
                    Your income helps determine if you qualify for premium subsidies and cost-sharing reductions. 
                    This information is kept private and secure.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Plan Preferences */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Plan Preferences</CardTitle>
                <CardDescription>
                  Choose your preferred plan type and coverage level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="metalLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metal Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select metal level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bronze">Bronze (60% coverage)</SelectItem>
                          <SelectItem value="Silver">Silver (70% coverage)</SelectItem>
                          <SelectItem value="Gold">Gold (80% coverage)</SelectItem>
                          <SelectItem value="Platinum">Platinum (90% coverage)</SelectItem>
                          <SelectItem value="Catastrophic">Catastrophic (Under 30 only)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="planType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plan type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HMO">HMO (Health Maintenance Organization)</SelectItem>
                          <SelectItem value="PPO">PPO (Preferred Provider Organization)</SelectItem>
                          <SelectItem value="EPO">EPO (Exclusive Provider Organization)</SelectItem>
                          <SelectItem value="POS">POS (Point of Service)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-green-600">Metal Level Guide</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><strong>Bronze:</strong> Lower premiums, higher deductibles</li>
                      <li><strong>Silver:</strong> Moderate premiums and deductibles</li>
                      <li><strong>Gold:</strong> Higher premiums, lower deductibles</li>
                      <li><strong>Platinum:</strong> Highest premiums, lowest deductibles</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-blue-600">Plan Type Guide</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><strong>HMO:</strong> Lower costs, primary care coordination</li>
                      <li><strong>PPO:</strong> More flexibility, higher costs</li>
                      <li><strong>EPO:</strong> No referrals needed, network restrictions</li>
                      <li><strong>POS:</strong> Primary care focus with some flexibility</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Review & Find Plans</CardTitle>
                <CardDescription>
                  Review your information and find available marketplace plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">ZIP Code</p>
                    <p className="font-medium">{form.watch("zipCode")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{form.watch("age")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Household Size</p>
                    <p className="font-medium">{form.watch("householdSize")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Income</p>
                    <p className="font-medium">{formatCurrency(form.watch("income"))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Metal Level</p>
                    <p className="font-medium">{form.watch("metalLevel")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Plan Type</p>
                    <p className="font-medium">{form.watch("planType")}</p>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Demo Mode</h4>
                  <p className="text-yellow-800 text-sm">
                    This is a demonstration of marketplace plan search. In production, this would connect to 
                    Healthcare.gov APIs to show real plans and pricing.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Finding Plans...
                      </>
                    ) : (
                      "Find Marketplace Plans"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Available Marketplace Plans</span>
              </CardTitle>
              <CardDescription>
                Found {plans.length} plan{plans.length !== 1 ? 's' : ''} matching your criteria
              </CardDescription>
            </CardHeader>
          </Card>

          {plans.length > 0 ? (
            <div className="grid gap-4">
              {plans.map((plan, index) => (
                <Card key={plan.id} className="border-2 hover:border-green-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold">{plan.name}</h3>
                          <Badge className={`${
                            plan.metalLevel === 'Bronze' ? 'bg-orange-100 text-orange-800' :
                            plan.metalLevel === 'Silver' ? 'bg-card text-foreground border' :
                            plan.metalLevel === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {plan.metalLevel}
                          </Badge>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800">Best Value</Badge>
                          )}
                          <Badge variant="outline" className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{plan.starRating}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600">{plan.carrier}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Monthly Premium</p>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(plan.monthlyPremium)}</p>
                            {plan.subsidyAmount && plan.subsidyAmount > 0 && (
                              <p className="text-sm text-green-600">
                                After subsidy: {formatCurrency(plan.monthlyPremium - plan.subsidyAmount)}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Deductible</p>
                            <p className="text-lg font-semibold">{formatCurrency(plan.deductible)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Max Out-of-Pocket</p>
                            <p className="text-lg font-semibold">{formatCurrency(plan.outOfPocketMax)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Primary Care</p>
                            <p className="text-lg font-semibold">{formatCurrency(plan.copayPrimarycare)} copay</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-gray-500">Specialist</p>
                            <p className="text-lg font-semibold">{formatCurrency(plan.copaySpecialist)} copay</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Coinsurance</p>
                            <p className="text-lg font-semibold">{plan.coinsuranceRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Network Size</p>
                            <p className="text-lg font-semibold">{plan.networkSize}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Rx Coverage</p>
                            <p className="text-lg font-semibold">{plan.prescriptionCoverage ? "Yes" : "No"}</p>
                          </div>
                        </div>

                        {plan.subsidyEligible && plan.subsidyAmount && plan.subsidyAmount > 0 && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-sm font-medium">
                              🎉 You may qualify for a {formatCurrency(plan.subsidyAmount)}/month premium subsidy!
                            </p>
                          </div>
                        )}

                        <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{plan.planType}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{plan.metalLevel} Level</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm">Apply Now</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600">No plans found matching your criteria.</p>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Ready to Enroll in Health Insurance?
              </h3>
              <p className="text-green-700 mb-4">
                Create your HawkNest account to save plans, get enrollment help, and access additional resources.
              </p>
              <Link href="/get-started">
                <Button className="bg-green-600 hover:bg-green-700">
                  Create HawkNest Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </section>
  )
}
