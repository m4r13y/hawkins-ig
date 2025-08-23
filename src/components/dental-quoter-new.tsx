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
import { Loader2, Shield, DollarSign, Smile, Heart, Activity } from "lucide-react"
import { getDentalQuotes, type DentalQuoteParams, type DentalQuote } from "@/lib/actions/dental-quotes"
import Link from "next/link"

// Dental insurance parameters from hawknest-admin
const formSchema = z.object({
  zipCode: z.string().min(5, "ZIP code must be 5 digits").max(5, "ZIP code must be 5 digits"),
  age: z.coerce.number().min(18, "Age must be at least 18").max(120, "Age seems too high"),
  gender: z.enum(["M", "F"], { required_error: "Please select gender" }),
  tobacco: z.enum(["0", "1"], { required_error: "Please select tobacco status" }),
  covered_members: z.enum(["I", "S", "C", "F"], { required_error: "Please select coverage type" }),
})

type FormData = z.infer<typeof formSchema>

export default function DentalQuoter() {
  const [quotes, setQuotes] = useState<DentalQuote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
      age: 65,
      gender: "F",
      tobacco: "0",
      covered_members: "I",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)
    setQuotes([])

    try {
      const params: DentalQuoteParams = {
        zip5: data.zipCode,
        age: data.age,
        gender: data.gender,
        tobacco: parseInt(data.tobacco),
        covered_members: data.covered_members,
      }

      const result = await getDentalQuotes(params)

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

  const getCoverageDescription = (type: string) => {
    switch (type) {
      case "I": return "Individual Only"
      case "S": return "Spouse Only"
      case "C": return "Children Only"
      case "F": return "Family (All)"
      default: return type
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Smile className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dental Insurance</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Protect your smile with comprehensive dental insurance. Get personalized quotes from top-rated dental insurance carriers.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Get Your Dental Insurance Quote</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below to receive personalized dental insurance quotes
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
                  name="covered_members"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Coverage Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select coverage type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="I">Individual Only</SelectItem>
                          <SelectItem value="S">Spouse Only</SelectItem>
                          <SelectItem value="C">Children Only</SelectItem>
                          <SelectItem value="F">Family (All)</SelectItem>
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
                    Get Dental Insurance Quotes
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
                <span>Your Dental Insurance Quotes</span>
              </CardTitle>
              <CardDescription>
                Found {quotes.length} quote{quotes.length !== 1 ? 's' : ''} for {getCoverageDescription(form.watch("covered_members"))} coverage
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
                        {quote.carrier.logo_url && (
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                            <Image 
                              src={quote.carrier.logo_url} 
                              alt={quote.carrier.name}
                              width={48}
                              height={48}
                              className="h-8 w-auto"
                              quality={85}
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{quote.carrier.name}</h3>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              Best Value
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{quote.plan_name}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Premium</p>
                          <p className="text-lg font-semibold text-blue-600">{formatCurrency(quote.monthly_premium)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Benefit Amount</p>
                          <p className="text-lg font-semibold">{quote.benefit_amount} {quote.benefit_quantifier}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">AM Best Rating</p>
                          <p className="text-lg font-semibold">{quote.am_best_rating}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Coverage Type</p>
                          <p className="text-lg font-semibold">{getCoverageDescription(form.watch("covered_members"))}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-1">
                          <Smile className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Cleanings & Preventive Care</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Basic & Major Services</span>
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
                Ready to Protect Your Smile?
              </h3>
              <p className="text-blue-700 mb-4">
                Get comprehensive dental insurance coverage for cleanings, fillings, crowns, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Speak with an Agent
                  </Button>
                </Link>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Learn More About Dental Insurance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

