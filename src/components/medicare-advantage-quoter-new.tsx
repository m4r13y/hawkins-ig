"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, DollarSign, Star, MapPin, Activity } from "lucide-react"
import { getMedicareAdvantageQuotes, type MedicareAdvantageQuoteRequest, type MedicareAdvantageQuote } from "@/lib/actions/medicare-advantage-quotes"
import Link from "next/link"

// Medicare Advantage parameters from hawknest-admin
const formSchema = z
  .object({
    searchType: z.enum(["zip", "state_county"]),
    zip5: z.string().optional(),
    state: z.string().optional(),
    county: z.string().optional(),
    plan: z.enum(["original", "snp", "pdp"]),
    sort: z.enum(["price", "moop", "deductible", "star_rating"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
    effective_date: z.string().optional(),
  })
  .refine((data) => {
    if (data.searchType === "zip") return Boolean(data.zip5 && data.zip5.length === 5)
    return Boolean(data.state && data.county)
  }, { message: "Provide a 5-digit ZIP or both state and county", path: ["searchType"] })

type FormData = z.infer<typeof formSchema>

export default function MedicareAdvantageQuoter() {
  const [quotes, setQuotes] = useState<MedicareAdvantageQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchType: "zip",
      plan: "original",
      sort: "price",
      order: "asc",
    },
  })

  const searchType = form.watch("searchType")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const request: MedicareAdvantageQuoteRequest = {
        plan: data.plan,
        sort: data.sort,
        order: data.order,
      }

      if (data.searchType === "zip") {
        request.zip5 = data.zip5
      } else {
        request.state = data.state
        request.county = data.county
      }

      if (data.effective_date) {
        request.effective_date = data.effective_date
      }

      const results = await getMedicareAdvantageQuotes(request)
      setQuotes(results)
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
    }).format(amount / 100) // Convert from cents
  }

  const getPlanTypeDescription = (type: string) => {
    switch (type) {
      case "original": return "Original Medicare Plans"
      case "snp": return "Special Needs Plans"
      case "pdp": return "Prescription Drug Plans"
      default: return type
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Medicare Advantage</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find and compare Medicare Advantage plans in your area. Get detailed benefit information, costs, and ratings.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Get Your Medicare Advantage Quotes</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below to receive personalized Medicare Advantage quotes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="searchType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search Method</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select search method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="zip">ZIP Code</SelectItem>
                          <SelectItem value="state_county">State & County</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {searchType === "zip" ? (
                  <FormField
                    control={form.control}
                    name="zip5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 68154" maxLength={5} {...field} />
                        </FormControl>
                        <FormDescription>Enter your 5-digit ZIP code</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., NE" maxLength={2} {...field} />
                          </FormControl>
                          <FormDescription>Enter state abbreviation (e.g., NE)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="county"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>County</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., DOUGLAS" {...field} />
                          </FormControl>
                          <FormDescription>Enter county name in caps (e.g., DOUGLAS)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="plan"
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
                          <SelectItem value="original">Original Medicare Plans</SelectItem>
                          <SelectItem value="snp">Special Needs Plans</SelectItem>
                          <SelectItem value="pdp">Prescription Drug Plans</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort By</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sort order" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="price">Price</SelectItem>
                          <SelectItem value="moop">Max Out-of-Pocket</SelectItem>
                          <SelectItem value="deductible">Deductible</SelectItem>
                          <SelectItem value="star_rating">Star Rating</SelectItem>
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
                            <SelectValue placeholder="Select order" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asc">Ascending</SelectItem>
                          <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="effective_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Effective Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Specify the year of plans you seek</FormDescription>
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
                    Get Medicare Advantage Quotes
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
                <span>Your Medicare Advantage Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} for {getPlanTypeDescription(form.watch("plan"))}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card key={quote.key} className="border-2 hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{quote.organization_name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{quote.plan_name}</p>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Best Value
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Premium</p>
                          <p className="text-lg font-semibold text-blue-600">{formatCurrency(quote.month_rate)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Max Out-of-Pocket</p>
                          <p className="text-lg font-semibold">{quote.in_network_moop}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Drug Deductible</p>
                          <p className="text-lg font-semibold">{formatCurrency(quote.annual_drug_deductible * 100)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Star Rating</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <p className="text-lg font-semibold">{quote.overall_star_rating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.county}, {quote.state}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.plan_type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{quote.drug_benefit_type}</span>
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

          {/* Call to Action */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Ready to Enroll in Medicare Advantage?
              </h3>
              <p className="text-blue-700 mb-4">
                Get comprehensive healthcare coverage that goes beyond Original Medicare.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Speak with an Agent
                  </Button>
                </Link>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Learn More About Medicare Advantage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


