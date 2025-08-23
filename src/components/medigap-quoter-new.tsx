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
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Shield, DollarSign, CheckCircle, Activity } from "lucide-react"
import { getMedigapQuotes, type MedigapQuoteParams, type MedigapQuote } from "@/lib/actions/medigap-quotes"
import Link from "next/link"

// Medigap parameters from hawknest-admin
const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.string().min(1, "Age is required").refine((val) => {
    const age = parseInt(val)
    return age >= 65 && age <= 120
  }, "Age must be between 65 and 120"),
  gender: z.enum(["M", "F"], { required_error: "Gender is required" }),
  tobacco: z.enum(["0", "1"], { required_error: "Tobacco use status is required" }),
  plans: z.array(z.enum(["A", "B", "C", "D", "F", "G", "K", "L", "M", "N"])).min(1, "Please select at least one plan type"),
})

type FormData = z.infer<typeof formSchema>

const planDescriptions = {
  A: "Basic coverage including hospitalization and medical insurance",
  B: "Plan A plus skilled nursing facility care",
  C: "Comprehensive coverage (not available to new Medicare beneficiaries)",
  D: "Plan A plus skilled nursing facility care and foreign travel emergency",
  F: "Most comprehensive coverage (not available to new Medicare beneficiaries)",
  G: "Plan F minus Medicare Part B deductible",
  K: "Plan A plus 50% of other Medicare gaps",
  L: "Plan A plus 75% of other Medicare gaps",
  M: "Plan A plus 50% of Part B deductible and skilled nursing facility care",
  N: "Plan G minus Part B excess charges and copayments"
}

export default function MedigapQuoter() {
  const [quotes, setQuotes] = useState<MedigapQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: "65",
      gender: "F",
      tobacco: "0",
      plans: ["G"],
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: MedigapQuoteParams = {
        zipCode: data.zipCode,
        age: data.age,
        gender: data.gender,
        tobacco: data.tobacco,
        plans: data.plans,
      }

      const result = await getMedigapQuotes(params)

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

  const getCarrierName = (carrier: string | { name: string; full_name?: string } | null | undefined) => {
    if (!carrier) return 'Unknown Carrier'
    return typeof carrier === 'string' ? carrier : carrier.name || 'Unknown Carrier'
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Medicare Supplement (Medigap)</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get quotes for Medicare Supplement insurance plans to help cover costs that Original Medicare doesn't pay.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Get Your Medigap Quotes</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below to receive personalized Medicare Supplement quotes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <Input type="number" min="65" max="120" placeholder="65" {...field} />
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

              <FormField
                control={form.control}
                name="plans"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Plan Types</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Select one or more Medigap plan types you're interested in
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(Object.keys(planDescriptions) as Array<keyof typeof planDescriptions>).map((plan) => (
                        <FormField
                          key={plan}
                          control={form.control}
                          name="plans"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={plan}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(plan)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, plan])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== plan
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-semibold">
                                    Plan {plan}
                                  </FormLabel>
                                  <p className="text-xs text-muted-foreground">
                                    {planDescriptions[plan]}
                                  </p>
                                </div>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                    Get Medigap Quotes
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
                <span>Your Medigap Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} for Plans {form.watch("plans").join(', ')} in your area
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Quotes by Plan */}
          <div className="grid gap-6 lg:grid-cols-2">
            {form.getValues('plans').map((selectedPlan) => {
              const planQuotes = quotes.filter(quote => quote.plan === selectedPlan)
              if (planQuotes.length === 0) return null

              return (
                <Card key={selectedPlan}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>Plan {selectedPlan}</span>
                      <Badge variant="outline">{planQuotes.length} quote{planQuotes.length !== 1 ? 's' : ''}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {planDescriptions[selectedPlan as keyof typeof planDescriptions]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {planQuotes.map((quote, index) => (
                      <div key={quote.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-semibold text-lg">
                              {getCarrierName(quote.carrier)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {quote.plan_name || `Medicare Supplement Plan ${quote.plan}`}
                            </p>
                            {quote.naic && (
                              <p className="text-xs text-muted-foreground">
                                NAIC: {quote.naic}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {formatCurrency(quote.monthly_premium)}
                            </div>
                            <div className="text-xs text-muted-foreground">per month</div>
                            {index === 0 && (
                              <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">
                                Best Value
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">
                            {quote.effective_date && `Effective: ${new Date(quote.effective_date).toLocaleDateString()}`}
                          </div>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            <Button size="sm">
                              Select
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Call to Action */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to Secure Your Medicare Coverage?
              </h3>
              <p className="text-muted-foreground mb-4">
                Get comprehensive Medicare Supplement coverage to fill the gaps in Original Medicare.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Speak with an Agent
                  </Button>
                </Link>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Learn More About Medigap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


