"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, DollarSign, Building2, Activity, Heart } from "lucide-react"
import { getHospitalIndemnityQuotes, type HospitalIndemnityQuoteParams, type HospitalIndemnityQuote } from "@/lib/actions/hospital-indemnity-quotes"
import Link from "next/link"

const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age cannot exceed 120"),
  gender: z.enum(["female", "male"], { required_error: "Please select gender" }),
  tobacco: z.enum(["false", "true"], { required_error: "Please select tobacco usage" }),
})

type FormData = z.infer<typeof formSchema>

export default function HospitalIndemnityQuoter() {
  const [quotes, setQuotes] = useState<HospitalIndemnityQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: 45,
      gender: "female",
      tobacco: "false",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: HospitalIndemnityQuoteParams = {
        zipCode: data.zipCode,
        age: data.age,
        gender: data.gender === "female" ? "F" : "M",
        tobacco: data.tobacco === "true" ? "1" : "0",
      }

      const result = await getHospitalIndemnityQuotes(params)
      
      if ('error' in result) {
        setError(result.error ?? null)
      } else {
        setQuotes(result.quotes ?? [])
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
          <Building2 className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Hospital Indemnity Insurance</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get hospital indemnity insurance quotes that provide daily cash benefits for hospital stays and help cover deductibles, copays, and other expenses.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              i <= step
                ? "bg-purple-600 text-white"
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
                          <Input type="number" min="18" max="120" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tobacco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tobacco Use</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tobacco status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="false">Non-Smoker</SelectItem>
                              <SelectItem value="true">Smoker</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
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

          {/* Step 2: Coverage Information */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Understanding Hospital Indemnity Coverage</CardTitle>
                <CardDescription>
                  Hospital indemnity insurance provides daily cash benefits for covered hospital stays
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span>What's Covered</span>
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Daily cash benefits for hospital confinement</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Coverage for admission and discharge benefits</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Additional riders for enhanced coverage</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Supplements your existing health insurance</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span>Typical Benefits</span>
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>$100 - $500+ daily hospital benefit</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Admission and discharge benefits</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>ICU and step-down unit benefits</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Optional riders for additional coverage</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Important Note</h4>
                  <p className="text-muted-foreground text-sm">
                    Hospital indemnity insurance pays benefits directly to you, not to the hospital or doctor. 
                    Use the money for any purpose - medical bills, household expenses, or other needs during your recovery.
                  </p>
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
                  Review your information and get your hospital indemnity insurance quotes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-white/10 dark:bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">ZIP Code</p>
                    <p className="font-medium">{form.watch("zipCode")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{form.watch("age")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{form.watch("gender") === "male" ? "Male" : "Female"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tobacco</p>
                    <p className="font-medium">{form.watch("tobacco") === "false" ? "Non-Smoker" : "Smoker"}</p>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-200 rounded-lg">
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
                      "Get Hospital Indemnity Quotes"
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
                <span>Your Hospital Indemnity Insurance Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} with various daily benefit options
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card key={quote.id} className="border-2 hover:border-purple-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{quote.carrier.name}</h3>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800">Featured Plan</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600">{quote.plan_name}</p>

                      {/* Base Benefits */}
                      {quote.baseBenefits && quote.baseBenefits.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-purple-900">Daily Hospital Benefits:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {quote.baseBenefits.slice(0, 3).map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="border border-purple-200 rounded-lg p-3 text-center">
                                <p className="text-2xl font-bold text-purple-600">
                                  ${benefit.amount}
                                </p>
                                <p className="text-sm text-gray-600">{benefit.quantifier}</p>
                                <p className="text-sm font-medium text-purple-800">
                                  {formatCurrency(benefit.rate)}/month
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Riders */}
                      {quote.riders && quote.riders.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">Available Riders:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {quote.riders.slice(0, 4).map((rider, riderIndex) => (
                              <div key={riderIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                                <Activity className="h-3 w-3 text-purple-600" />
                                <span>{rider.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 pt-4 border-t">
                        {quote.carrier.logo_url && (
                          <div className="flex items-center space-x-2">
                            <Image 
                              src={quote.carrier.logo_url} 
                              alt={quote.carrier.name}
                              width={64}
                              height={32}
                              className="h-8 w-auto"
                              quality={85}
                            />
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.carrier.full_name}</span>
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
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to Protect Yourself Against Hospital Costs?
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your HawkNest account to save quotes, compare plans, and apply for coverage.
              </p>
              <Link href="/get-started">
                <Button className="bg-purple-600 hover:bg-purple-700">
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




