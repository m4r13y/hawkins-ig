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
import { Loader2, Shield, DollarSign, Users, Heart, Activity } from "lucide-react"
import { getCancerQuotes, type CancerQuoteParams, type CancerQuote } from "@/lib/actions/cancer-quotes"
import Link from "next/link"

const formSchema = z.object({
  state: z.enum(["TX", "GA"], { required_error: "Please select a state" }),
  age: z.coerce.number().min(18, "Age must be at least 18").max(85, "Age cannot exceed 85"),
  familyType: z.enum([
    "Applicant Only", 
    "Applicant and Spouse", 
    "Applicant and Child(ren)", 
    "Applicant and Spouse and Child(ren)"
  ], { required_error: "Please select family type" }),
  tobaccoStatus: z.enum(["Non-Tobacco", "Tobacco"], { required_error: "Please select tobacco status" }),
  premiumMode: z.enum([
    "Monthly Bank Draft", 
    "Monthly Credit Card", 
    "Monthly Direct Mail", 
    "Annual"
  ], { required_error: "Please select premium mode" }),
  carcinomaInSitu: z.enum(["25%", "100%"], { required_error: "Please select carcinoma in situ benefit" }),
  benefitAmount: z.coerce.number().min(5000, "Minimum benefit is $5,000").max(100000, "Maximum benefit is $100,000"),
})

type FormData = z.infer<typeof formSchema>

export default function CancerInsuranceQuoter() {
  const [quotes, setQuotes] = useState<CancerQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "TX",
      age: 45,
      familyType: "Applicant Only",
      tobaccoStatus: "Non-Tobacco",
      premiumMode: "Monthly Bank Draft",
      carcinomaInSitu: "100%",
      benefitAmount: 25000,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: CancerQuoteParams = {
        state: data.state,
        age: data.age,
        familyType: data.familyType,
        tobaccoStatus: data.tobaccoStatus,
        premiumMode: data.premiumMode,
        carcinomaInSitu: data.carcinomaInSitu,
        benefitAmount: data.benefitAmount,
      }

      const result = await getCancerQuotes(params)
      
      if (result.error) {
        setError(result.error)
      } else if (result.quotes) {
        setQuotes(result.quotes)
        setStep(4)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatBenefitAmount = (amount: number) => {
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="h-8 w-8 text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900">Cancer Insurance</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get specialized cancer insurance coverage that provides financial support during cancer treatment, 
          helping you focus on recovery instead of medical bills.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              i <= step
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {i}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Basic Information</CardTitle>
                <CardDescription>
                  Please provide your basic information to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Input type="number" min="18" max="85" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="familyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Family Coverage</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select family type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Applicant Only">Individual Only</SelectItem>
                            <SelectItem value="Applicant and Spouse">Applicant + Spouse</SelectItem>
                            <SelectItem value="Applicant and Child(ren)">Applicant + Children</SelectItem>
                            <SelectItem value="Applicant and Spouse and Child(ren)">Family (All)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tobaccoStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tobacco Use</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tobacco status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Non-Tobacco">Non-Smoker</SelectItem>
                            <SelectItem value="Tobacco">Smoker</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Coverage Options */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Coverage Options</CardTitle>
                <CardDescription>
                  Choose your benefit amount and payment preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="benefitAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefit Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="5000" 
                          max="100000" 
                          step="5000"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="carcinomaInSitu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carcinoma in Situ Benefit</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select carcinoma benefit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="25%">25% of Benefit Amount</SelectItem>
                          <SelectItem value="100%">100% of Benefit Amount</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="premiumMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Premium Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Monthly Bank Draft">Monthly Bank Draft</SelectItem>
                          <SelectItem value="Monthly Credit Card">Monthly Credit Card</SelectItem>
                          <SelectItem value="Monthly Direct Mail">Monthly Direct Mail</SelectItem>
                          <SelectItem value="Annual">Annual Payment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h4 className="font-semibold text-pink-900 mb-2">Cancer Coverage Benefits</h4>
                  <ul className="text-pink-800 text-sm space-y-1">
                    <li>• Lump sum payment upon cancer diagnosis</li>
                    <li>• Additional benefits for carcinoma in situ</li>
                    <li>• Covers treatment costs, travel, and living expenses</li>
                    <li>• Supplements your existing health insurance</li>
                  </ul>
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
                <CardTitle>Step 3: Review & Get Quotes</CardTitle>
                <CardDescription>
                  Review your information and get your cancer insurance quotes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-medium">{form.watch("state") === "TX" ? "Texas" : "Georgia"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{form.watch("age")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Family Type</p>
                    <p className="font-medium">{form.watch("familyType")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tobacco</p>
                    <p className="font-medium">{form.watch("tobaccoStatus")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Benefit Amount</p>
                    <p className="font-medium">{formatBenefitAmount(form.watch("benefitAmount"))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{form.watch("premiumMode")}</p>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Quotes...
                      </>
                    ) : (
                      "Get Cancer Insurance Quotes"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>

      {/* Step 4: Results */}
      {step === 4 && quotes.length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Your Cancer Insurance Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} for {formatBenefitAmount(form.watch("benefitAmount"))} coverage
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card key={index} className="border-2 hover:border-pink-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{quote.carrier}</h3>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800">Best Value</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600">{quote.plan_name}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Premium</p>
                          <p className="text-lg font-bold text-pink-600">{formatCurrency(quote.monthly_premium)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Benefit Amount</p>
                          <p className="text-lg font-semibold">{formatBenefitAmount(quote.benefit_amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">State</p>
                          <p className="text-lg font-semibold">{quote.state}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Carcinoma Benefit</p>
                          <p className="text-lg font-semibold">{quote.carcinoma_in_situ}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.family_type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.tobacco_status}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.premium_mode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm">Apply Now</Button>
                      <Button variant="outline" size="sm">Download Quote</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-pink-900 mb-2">
                Ready to Protect Yourself Against Cancer Costs?
              </h3>
              <p className="text-pink-700 mb-4">
                Create your HawkNest account to save quotes, compare plans, and apply for coverage.
              </p>
              <Link href="/get-started">
                <Button className="bg-pink-600 hover:bg-pink-700">
                  Create HawkNest Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
