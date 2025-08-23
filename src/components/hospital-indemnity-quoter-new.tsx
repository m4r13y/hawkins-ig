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
import { Loader2, Shield, DollarSign, Building2, Heart, Activity } from "lucide-react"
import { getHospitalIndemnityQuotes, type HospitalIndemnityQuoteParams, type HospitalIndemnityQuote } from "@/lib/actions/hospital-indemnity-quotes"
import Link from "next/link"

// Hospital Indemnity parameters from hawknest-admin
const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age seems too high"),
  gender: z.enum(["M", "F"], { required_error: "Please select gender" }),
  tobacco: z.enum(["0", "1"], { required_error: "Please select tobacco status" }),
})

type FormData = z.infer<typeof formSchema>

export default function HospitalIndemnityQuoter() {
  const [quotes, setQuotes] = useState<HospitalIndemnityQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: 65,
      gender: "F",
      tobacco: "0",
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
        gender: data.gender,
        tobacco: data.tobacco,
      }

      const result = await getHospitalIndemnityQuotes(params)

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Building2 className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hospital Indemnity Insurance</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get cash benefits for hospital stays to help cover out-of-pocket medical expenses that your major medical plan may not cover.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span>Get Your Hospital Indemnity Quote</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below to receive personalized hospital indemnity insurance quotes
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
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
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
                    Get Hospital Indemnity Quotes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-500/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <Activity className="h-4 w-4" />
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
                <span>Your Hospital Indemnity Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} with daily hospital benefits
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card key={quote.id} className="border-2 hover:border-purple-300 transition-colors">
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
                      
                      {/* Base Benefits */}
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Daily Hospital Benefits</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {quote.baseBenefits.map((benefit, idx) => (
                            <div key={idx} className="border rounded-lg p-3">
                              <p className="text-sm text-gray-500">{benefit.quantifier}</p>
                              <p className="font-semibold text-purple-600">{formatCurrency(benefit.rate)}</p>
                              <p className="text-sm">{benefit.amount}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Riders */}
                      {quote.riders && quote.riders.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Riders</h4>
                          <div className="space-y-2">
                            {quote.riders.slice(0, 3).map((rider, idx) => (
                              <div key={idx} className="border rounded-lg p-3">
                                <p className="font-medium">{rider.name}</p>
                                {rider.note && <p className="text-sm text-gray-600">{rider.note}</p>}
                                <div className="flex items-center space-x-2 mt-1">
                                  {rider.benefits.slice(0, 2).map((benefit, benefitIdx) => (
                                    <span key={benefitIdx} className="text-sm text-purple-600">
                                      {formatCurrency(benefit.rate)} {benefit.quantifier}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
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
              <h3 className="text-xl font-semibold text-purple-900 mb-2">
                Ready to Protect Against Hospital Costs?
              </h3>
              <p className="text-purple-700 mb-4">
                Get cash benefits for hospital stays to help cover out-of-pocket expenses and lost income.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Speak with an Agent
                  </Button>
                </Link>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                  Learn More About Hospital Indemnity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


