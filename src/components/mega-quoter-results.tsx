"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Shield, 
  Heart, 
  DollarSign, 
  Phone,
  CheckCircle, 
  AlertCircle,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  type DiscoveryFormData, 
  type MedicareScenario,
  type ProductRecommendation 
} from "@/lib/discovery-engine"

interface MegaQuoterResultsProps {
  formData: DiscoveryFormData
  scenario: MedicareScenario
  recommendations: ProductRecommendation[]
  leadScore: number
  onRequestConsultation: () => void
  onGenerateReport: () => void
}

interface QuoteDisplayData {
  productType: string
  quotes: Array<{
    carrier: string
    planName: string
    premium: number
    deductible: number
    maxOutOfPocket: number
    rating: number
    features: string[]
    savings?: number
  }>
}

// Mock quote data - in production this would come from your Firebase functions
const getMockQuoteData = (recommendations: ProductRecommendation[]): QuoteDisplayData[] => {
  const quoteData: QuoteDisplayData[] = []
  
  recommendations.forEach(rec => {
    if (rec.productType === "Medicare Supplement") {
      quoteData.push({
        productType: "Medicare Supplement",
        quotes: [
          {
            carrier: "Blue Cross Blue Shield",
            planName: "Plan G",
            premium: 187,
            deductible: 240,
            maxOutOfPocket: 6000,
            rating: 4.8,
            features: ["Doctor choice freedom", "Travel coverage", "Guaranteed renewable"],
            savings: 15
          },
          {
            carrier: "Anthem",
            planName: "Plan F",
            premium: 212,
            deductible: 0,
            maxOutOfPocket: 5500,
            rating: 4.6,
            features: ["Zero deductible", "Comprehensive coverage", "Nationwide accepted"],
            savings: 8
          },
          {
            carrier: "Aetna",
            planName: "Plan N",
            premium: 156,
            deductible: 240,
            maxOutOfPocket: 6500,
            rating: 4.5,
            features: ["Lower premium", "Office visit copays", "Emergency coverage"],
            savings: 22
          }
        ]
      })
    }
    
    if (rec.productType === "Dental Insurance") {
      quoteData.push({
        productType: "Dental Insurance",
        quotes: [
          {
            carrier: "Delta Dental",
            planName: "PPO Plus",
            premium: 45,
            deductible: 50,
            maxOutOfPocket: 1500,
            rating: 4.7,
            features: ["Large network", "Preventive coverage", "Major services"],
            savings: 12
          },
          {
            carrier: "Cigna",
            planName: "Dental Choice",
            premium: 52,
            deductible: 75,
            maxOutOfPocket: 1200,
            rating: 4.4,
            features: ["Orthodontics included", "Quick claims", "Online tools"],
            savings: 5
          },
          {
            carrier: "MetLife",
            planName: "Preferred Dentist",
            premium: 38,
            deductible: 100,
            maxOutOfPocket: 1800,
            rating: 4.3,
            features: ["Budget friendly", "Basic coverage", "Easy enrollment"],
            savings: 18
          }
        ]
      })
    }
    
    if (rec.productType === "Final Expense Life Insurance") {
      quoteData.push({
        productType: "Final Expense Life Insurance",
        quotes: [
          {
            carrier: "Mutual of Omaha",
            planName: "Final Expense",
            premium: 67,
            deductible: 0,
            maxOutOfPocket: 0,
            rating: 4.6,
            features: ["$10,000 coverage", "Guaranteed acceptance", "Immediate coverage"],
            savings: 10
          },
          {
            carrier: "Globe Life",
            planName: "Senior Life",
            premium: 59,
            deductible: 0,
            maxOutOfPocket: 0,
            rating: 4.2,
            features: ["$8,000 coverage", "No medical exam", "Level premiums"],
            savings: 15
          },
          {
            carrier: "Colonial Penn",
            planName: "Guaranteed Life",
            premium: 72,
            deductible: 0,
            maxOutOfPocket: 0,
            rating: 4.0,
            features: ["$12,000 coverage", "Simple application", "Fixed rates"],
            savings: 8
          }
        ]
      })
    }
  })
  
  return quoteData
}

const scenarioDescriptions = {
  A: "Medicare Advantage focused - comprehensive plan with integrated benefits",
  B: "Medicare Supplement focused - flexibility with traditional Medicare plus supplements", 
  C: "First-time Medicare - turning 65 and need initial enrollment guidance",
  D: "Employer transition - moving from employer coverage to Medicare"
}

export default function MegaQuoterResults({
  formData,
  scenario,
  recommendations,
  leadScore,
  onRequestConsultation,
  onGenerateReport
}: MegaQuoterResultsProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [showLeadScore, setShowLeadScore] = useState(false)
  
  const quoteData = getMockQuoteData(recommendations)
  const totalMonthlySavings = quoteData.reduce((total, product) => {
    const bestQuote = product.quotes.reduce((best, quote) => 
      quote.premium < best.premium ? quote : best
    )
    return total + (bestQuote.savings || 0)
  }, 0)
  
  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }
  
  const getLeadScoreLabel = (score: number) => {
    if (score >= 80) return "High Quality Lead"
    if (score >= 60) return "Qualified Lead"
    return "Needs Nurturing"
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Your Personalized Medicare Recommendations
          </h1>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Scenario {scenario}: {scenarioDescriptions[scenario]}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">
                  ${totalMonthlySavings}/mo
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Potential Monthly Savings</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  {recommendations.length}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Product Recommendations</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">
                  {quoteData.reduce((total, product) => total + product.quotes.length, 0)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Quote Options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Score (Admin View) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Lead Intelligence
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLeadScore(!showLeadScore)}
              >
                {showLeadScore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {showLeadScore && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Lead Score:</span>
                  <div className="flex items-center gap-2">
                    <Progress value={leadScore} className="w-24" />
                    <span className={`font-bold ${getLeadScoreColor(leadScore)}`}>
                      {leadScore}/100
                    </span>
                    <Badge variant={leadScore >= 80 ? "default" : leadScore >= 60 ? "secondary" : "destructive"}>
                      {getLeadScoreLabel(leadScore)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Age:</span> {formData.age}
                  </div>
                  <div>
                    <span className="text-gray-600">Timeframe:</span> {formData.timeframe?.replace("-", " ") || "Not specified"}
                  </div>
                  <div>
                    <span className="text-gray-600">Budget:</span> {formData.budgetRange?.replace("-", " - $") || "Not specified"}
                  </div>
                  <div>
                    <span className="text-gray-600">Contact:</span> {formData.contactInfo?.preferredContact || "Not specified"}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Quote Results */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Star className="h-6 w-6 text-yellow-500" />
          Your Personalized Quotes
        </h2>
        
        {quoteData.map((productData, index) => (
          <Card key={productData.productType} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {productData.productType === "Medicare Supplement" && <Shield className="h-5 w-5 text-blue-600" />}
                  {productData.productType === "Dental Insurance" && <Heart className="h-5 w-5 text-pink-600" />}
                  {productData.productType === "Final Expense Life Insurance" && <DollarSign className="h-5 w-5 text-green-600" />}
                  {productData.productType}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedProduct(
                    expandedProduct === productData.productType ? null : productData.productType
                  )}
                >
                  {expandedProduct === productData.productType ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </Button>
              </div>
              <CardDescription>
                {recommendations.find(r => r.productType === productData.productType)?.reasoning}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="grid gap-4">
                {productData.quotes.map((quote, quoteIndex) => (
                  <motion.div
                    key={quote.carrier}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + quoteIndex * 0.05 }}
                    className={`p-4 border rounded-lg ${quoteIndex === 0 ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 hover:border-gray-300'} transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold text-lg">{quote.carrier}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{quote.planName}</p>
                        </div>
                        {quoteIndex === 0 && (
                          <Badge className="bg-blue-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ${quote.premium}/mo
                        </div>
                        {quote.savings && (
                          <div className="text-sm text-green-600">
                            Save ${quote.savings}/mo
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {(expandedProduct === productData.productType || quoteIndex === 0) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Deductible:</span>
                              <div className="font-medium">${quote.deductible}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Max Out-of-Pocket:</span>
                              <div className="font-medium">${quote.maxOutOfPocket}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Rating:</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-medium">{quote.rating}/5</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-gray-600 text-sm">Key Features:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {quote.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1">
                              Select This Plan
                            </Button>
                            <Button size="sm" variant="outline">
                              Compare
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cross-sell Opportunities */}
      {recommendations.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Smart Bundling Opportunities
            </CardTitle>
            <CardDescription>
              Based on your needs, we identified additional savings opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{rec.productType}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Priority: {rec.priority}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {rec.crossSellOpportunity ? "Bundle Available" : "Standalone"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button 
          onClick={onRequestConsultation}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          <Phone className="h-5 w-5 mr-2" />
          Schedule Free Consultation
        </Button>
        
        <Button 
          onClick={onGenerateReport}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Report
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          size="lg"
        >
          <Mail className="h-5 w-5 mr-2" />
          Email Results
        </Button>
      </div>
    </div>
  )
}
