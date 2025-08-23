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
import { Loader2, Shield, DollarSign, Calendar, Building, Heart } from "lucide-react"
import { getFinalExpenseLifeQuotes, type FinalExpenseLifeQuoteParams, type FinalExpenseLifeQuote } from "@/lib/actions/final-expense-life-quotes"
import Link from "next/link"

// Final Expense Life parameters from hawknest-admin
const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age seems too high"),
  gender: z.enum(["M", "F"], { required_error: "Please select gender" }),
  tobacco: z.enum(["0", "1"], { required_error: "Please select tobacco status" }),
  quotingType: z.enum(["monthly_rate", "face_value"], { required_error: "Please select quoting type" }),
  desiredRate: z.string().optional(),
  desiredFaceValue: z.string().optional(),
  benefitName: z.enum(["any", "Graded Benefit", "Level Benefit", "Large Pay", "Return Of Premium", "Small Pay", "Single Pay"]).optional(),
  underwritingType: z.enum(["any", "Full", "Simplified", "Guaranteed"]).optional(),
})

type FormData = z.infer<typeof formSchema>

export default function FinalExpenseQuoter() {
  const [quotes, setQuotes] = useState<FinalExpenseLifeQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: 65,
      gender: "F",
      tobacco: "0",
      quotingType: "face_value",
      desiredRate: "",
      desiredFaceValue: "10000",
      benefitName: "any",
      underwritingType: "any",
    },
  })

  const quotingType = form.watch("quotingType")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: FinalExpenseLifeQuoteParams = {
        zipCode: data.zipCode,
        age: data.age.toString(),
        gender: data.gender,
        tobacco: data.tobacco,
        quotingType: data.quotingType,
        ...(data.desiredRate ? { desiredRate: data.desiredRate } : {}),
        ...(data.desiredFaceValue ? { desiredFaceValue: data.desiredFaceValue } : {}),
        ...(data.benefitName ? { benefitName: data.benefitName } : {}),
        ...(data.underwritingType ? { underwritingType: data.underwritingType } : {}),
      }

      const result = await getFinalExpenseLifeQuotes(params)

      if (result.error) {
        setError(result.error)
      } else if (result.quotes) {
        setQuotes(result.quotes)
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Final Expense Life Insurance</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get affordable final expense life insurance quotes to help your family cover burial costs and end-of-life expenses.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Get Your Final Expense Quote</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below to receive personalized final expense life insurance quotes
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
                        <Input placeholder="12345" maxLength={5} {...field} />
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tobacco status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Non-Tobacco</SelectItem>
                          <SelectItem value="1">Tobacco</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quotingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quote Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select quote type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="face_value">By Coverage Amount</SelectItem>
                          <SelectItem value="monthly_rate">By Monthly Premium</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {quotingType === "face_value" && (
                  <FormField
                    control={form.control}
                    name="desiredFaceValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Coverage Amount</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1000" 
                            max="100000" 
                            step="1000"
                            placeholder="10000"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {quotingType === "monthly_rate" && (
                  <FormField
                    control={form.control}
                    name="desiredRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Monthly Premium</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="10" 
                            max="500" 
                            step="5"
                            placeholder="50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="benefitName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefit Type (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="Graded Benefit">Graded Benefit</SelectItem>
                          <SelectItem value="Level Benefit">Level Benefit</SelectItem>
                          <SelectItem value="Large Pay">Large Pay</SelectItem>
                          <SelectItem value="Return Of Premium">Return Of Premium</SelectItem>
                          <SelectItem value="Small Pay">Small Pay</SelectItem>
                          <SelectItem value="Single Pay">Single Pay</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="underwritingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Underwriting Type (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="Full">Full</SelectItem>
                          <SelectItem value="Simplified">Simplified</SelectItem>
                          <SelectItem value="Guaranteed">Guaranteed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting quotes...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Get Final Expense Quotes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <Heart className="h-4 w-4" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Quotes Display */}
      {quotes.length > 0 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Your Final Expense Life Insurance Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} based on your criteria
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
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Best Value
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{quote.plan_name}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Premium</p>
                          <p className="text-lg font-semibold text-blue-600">{formatCurrency(quote.monthly_rate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coverage Amount</p>
                          <p className="text-lg font-semibold">{formatBenefitAmount(quote.face_value)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Annual Premium</p>
                          <p className="text-lg font-semibold">{formatCurrency(quote.annual_rate)}</p>
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
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Ready to Secure Your Family's Financial Future?
              </h3>
              <p className="text-blue-700 mb-4">
                Get affordable final expense life insurance to help your loved ones cover burial and end-of-life costs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Speak with an Agent
                  </Button>
                </Link>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Learn More About Final Expense Insurance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

