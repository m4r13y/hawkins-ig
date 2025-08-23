"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, DollarSign, Calendar, Building, Heart } from "lucide-react"
import { getFinalExpenseLifeQuotes, type FinalExpenseLifeQuoteParams, type FinalExpenseLifeQuote } from "@/lib/actions/final-expense-life-quotes"
import Link from "next/link"

const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.coerce.number().min(40, "Age must be at least 40").max(85, "Age cannot exceed 85"),
  gender: z.enum(["M", "F"], { required_error: "Please select gender" }),
  tobacco: z.enum(["0", "1"], { required_error: "Please select tobacco usage" }),
  quotingType: z.enum(["by_face_value"], { required_error: "Please select quoting type" }),
  desiredFaceValue: z.coerce.number().min(2500, "Minimum coverage is $2,500").max(50000, "Maximum coverage is $50,000"),
  benefitName: z.enum(["Graded Benefit", "Level Benefit", "Large Pay", "Return Of Premium", "Small Pay", "Single Pay"]).optional(),
  underwritingType: z.enum(["Full", "Simplified", "Guaranteed"]).optional(),
})

type FormData = z.infer<typeof formSchema>

export default function FinalExpenseQuoter() {
  const [quotes, setQuotes] = useState<FinalExpenseLifeQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: 65,
      gender: "F",
      tobacco: "0",
      quotingType: "by_face_value",
      desiredFaceValue: 10000,
      benefitName: "Level Benefit",
      underwritingType: "Simplified",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: FinalExpenseLifeQuoteParams = {
        zipCode: data.zipCode,
        age: data.age,
        gender: data.gender,
        tobacco: data.tobacco,
        quotingType: data.quotingType,
        desiredFaceValue: data.desiredFaceValue,
        benefitName: data.benefitName,
        underwritingType: data.underwritingType,
      }

      const result = await getFinalExpenseLifeQuotes(params)
      
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
    <section className="py-32 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Final Expense Life Insurance</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get affordable final expense life insurance quotes to help your family cover burial costs and end-of-life expenses.
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
                          <Input type="number" min="40" max="85" {...field} />
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
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select gender</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                          </select>
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
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select tobacco status</option>
                            <option value="0">Non-Smoker</option>
                            <option value="1">Smoker</option>
                          </select>
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

          {/* Step 2: Coverage Options */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Coverage Options</CardTitle>
                <CardDescription>
                  Choose your desired coverage amount and benefit type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="desiredFaceValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Coverage Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="2500" 
                          max="50000" 
                          step="500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefitName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefit Type</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select benefit type</option>
                          <option value="Level Benefit">Level Benefit</option>
                          <option value="Graded Benefit">Graded Benefit</option>
                          <option value="Large Pay">Large Pay</option>
                          <option value="Return Of Premium">Return Of Premium</option>
                          <option value="Small Pay">Small Pay</option>
                          <option value="Single Pay">Single Pay</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="underwritingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Underwriting Type</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select underwriting type</option>
                          <option value="Simplified">Simplified Issue</option>
                          <option value="Guaranteed">Guaranteed Issue</option>
                          <option value="Full">Full Underwriting</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  Review your information and get your final expense life insurance quotes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-card rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">ZIP Code</p>
                    <p className="font-medium">{form.watch("zipCode")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">{form.watch("age")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{form.watch("gender") === "M" ? "Male" : "Female"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tobacco</p>
                    <p className="font-medium">{form.watch("tobacco") === "0" ? "Non-Smoker" : "Smoker"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Coverage Amount</p>
                    <p className="font-medium">{formatBenefitAmount(form.watch("desiredFaceValue"))}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Benefit Type</p>
                    <p className="font-medium">{form.watch("benefitName")}</p>
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
                      "Get Final Expense Quotes"
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
                <span>Your Final Expense Life Insurance Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} for {formatBenefitAmount(form.watch("desiredFaceValue"))} coverage
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card key={quote.id} className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{quote.carrier.name}</h3>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800">Best Value</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600">{quote.plan_name}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Premium</p>
                          <p className="text-lg font-bold text-blue-600">{formatCurrency(quote.monthly_rate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Annual Premium</p>
                          <p className="text-lg font-semibold">{formatCurrency(quote.annual_rate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coverage Amount</p>
                          <p className="text-lg font-semibold">{formatBenefitAmount(quote.face_value)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Benefit Type</p>
                          <p className="text-lg font-semibold">{quote.benefit_name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Coverage Range: {formatBenefitAmount(quote.face_amount_min)} - {formatBenefitAmount(quote.face_amount_max)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">NAIC: {quote.naic}</span>
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
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Ready to Secure Your Family's Future?
              </h3>
              <p className="text-blue-700 mb-4">
                Create your HawkNest account to save quotes, compare plans, and apply for coverage.
              </p>
              <Link href="/get-started">
                <Button className="bg-blue-600 hover:bg-blue-700">
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
