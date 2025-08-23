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
import { Loader2, Shield, DollarSign, Star, Building, Heart, Stethoscope } from "lucide-react"
import { getMedicareAdvantageQuotes, type MedicareAdvantageQuoteParams, type MedicareAdvantageQuote } from "@/lib/actions/medicare-advantage-quotes"
import Link from "next/link"

const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  planType: z.enum(["original", "snp", "pdp"], { required_error: "Please select plan type" }),
  sort: z.enum(["price", "rating", "name"], { required_error: "Please select sort option" }),
  order: z.enum(["asc", "desc"], { required_error: "Please select sort order" }),
})

type FormData = z.infer<typeof formSchema>

export default function MedicareAdvantageQuoter() {
  const [quotes, setQuotes] = useState<MedicareAdvantageQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      planType: "original",
      sort: "price",
      order: "asc",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: MedicareAdvantageQuoteParams = {
        zipCode: data.zipCode,
        plan: data.planType,
        sort: data.sort,
        order: data.order,
      }

      const result = await getMedicareAdvantageQuotes(params)
      
      if (result.error) {
        setError(result.error)
      } else {
        setQuotes(result.quotes || [])
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
          <Stethoscope className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Medicare Advantage Plans</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compare Medicare Advantage plans in your area. Find comprehensive coverage that includes 
          medical, prescription drugs, and often dental and vision benefits.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              i <= step
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {i}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Location */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Your Location</CardTitle>
                <CardDescription>
                  Medicare Advantage plans are specific to your location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Why Location Matters</h4>
                  <p className="text-blue-800 text-sm">
                    Medicare Advantage plans have specific service areas and provider networks. 
                    Your ZIP code helps us find plans available in your area with the doctors and hospitals you prefer.
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
                  Choose your plan type and how you'd like to view results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                          <SelectItem value="original">Medicare Advantage</SelectItem>
                          <SelectItem value="snp">Special Needs Plans (SNP)</SelectItem>
                          <SelectItem value="pdp">Prescription Drug Plans (PDP)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sort"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort By</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="price">Monthly Premium</SelectItem>
                            <SelectItem value="rating">Star Rating</SelectItem>
                            <SelectItem value="name">Plan Name</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sort order" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="asc">Low to High</SelectItem>
                            <SelectItem value="desc">High to Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Medicare Advantage Benefits</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• All Original Medicare benefits (Parts A & B)</li>
                    <li>• Often includes prescription drug coverage (Part D)</li>
                    <li>• May include dental, vision, and hearing benefits</li>
                    <li>• Coordinated care through plan networks</li>
                    <li>• Annual out-of-pocket maximums for protection</li>
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
                  Review your preferences and find Medicare Advantage plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">ZIP Code</p>
                    <p className="font-medium">{form.watch("zipCode")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Plan Type</p>
                    <p className="font-medium">
                      {form.watch("planType") === "original" ? "Medicare Advantage" : 
                       form.watch("planType") === "snp" ? "Special Needs Plans" : 
                       "Prescription Drug Plans"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sort By</p>
                    <p className="font-medium">
                      {form.watch("sort") === "price" ? "Monthly Premium" : 
                       form.watch("sort") === "rating" ? "Star Rating" : 
                       "Plan Name"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sort Order</p>
                    <p className="font-medium">{form.watch("order") === "asc" ? "Low to High" : "High to Low"}</p>
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
                        Finding Plans...
                      </>
                    ) : (
                      "Find Medicare Advantage Plans"
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
                <span>Medicare Advantage Plans in Your Area</span>
              </CardTitle>
              <CardDescription>
                {quotes.length > 0 ? (
                  <>Found {quotes.length} plan{quotes.length !== 1 ? 's' : ''} in ZIP code {form.watch("zipCode")}</>
                ) : (
                  "No plans found for your search criteria"
                )}
              </CardDescription>
            </CardHeader>
          </Card>

          {quotes.length > 0 ? (
            <div className="grid gap-4">
              {quotes.map((quote, index) => (
                <Card key={quote.key || index} className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold">{quote.plan_name}</h3>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800">Top Result</Badge>
                          )}
                          {quote.star_rating && (
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span>{quote.star_rating}</span>
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600">{quote.carrier.name}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          {quote.monthly_premium !== undefined && (
                            <div>
                              <p className="text-sm text-gray-500">Monthly Premium</p>
                              <p className="text-lg font-bold text-blue-600">
                                {quote.monthly_premium === 0 ? "Free" : formatCurrency(quote.monthly_premium)}
                              </p>
                            </div>
                          )}
                          {quote.deductible !== undefined && (
                            <div>
                              <p className="text-sm text-gray-500">Deductible</p>
                              <p className="text-lg font-semibold">
                                {quote.deductible === 0 ? "No Deductible" : formatCurrency(quote.deductible)}
                              </p>
                            </div>
                          )}
                          {quote.out_of_pocket_max !== undefined && (
                            <div>
                              <p className="text-sm text-gray-500">Max Out-of-Pocket</p>
                              <p className="text-lg font-semibold">{formatCurrency(quote.out_of_pocket_max)}</p>
                            </div>
                          )}
                          {quote.star_rating !== undefined && quote.star_rating > 0 && (
                            <div>
                              <p className="text-sm text-gray-500">Star Rating</p>
                              <p className="text-lg font-semibold flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                {quote.star_rating}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Benefits */}
                        {quote.benefits && (quote.benefits.medical.length > 0 || quote.benefits.supplemental.length > 0) && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {[...quote.benefits.medical.slice(0, 3), ...quote.benefits.supplemental.slice(0, 3)].map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                                  <Heart className="h-3 w-3 text-blue-600" />
                                  <span>{benefit.name || benefit.benefit_name || "Benefit Available"}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{quote.plan_type}</span>
                          </div>
                          {quote.key && (
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-600">Plan Key: {quote.key}</span>
                            </div>
                          )}
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
                <p className="text-gray-600 mb-4">
                  No Medicare Advantage plans were found for your search criteria. This could be because:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 mb-4">
                  <li>• No plans are available in your specific ZIP code</li>
                  <li>• The API service is temporarily unavailable</li>
                  <li>• Your search criteria were too specific</li>
                </ul>
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                >
                  Try Another Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Ready to Enroll in Medicare Advantage?
              </h3>
              <p className="text-blue-700 mb-4">
                Create your HawkNest account to save plans, compare benefits, and get help with enrollment.
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
  )
}
