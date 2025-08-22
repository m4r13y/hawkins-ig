"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Shield, Calculator } from "lucide-react"
import DiscoveryQuestionnaire from "./discovery-questionnaire"
import MegaQuoterResults from "./mega-quoter-results"
import { 
  type DiscoveryFormData, 
  type MedicareScenario,
  type ProductRecommendation 
} from "@/lib/discovery-engine"

interface MegaQuoterState {
  step: "discovery" | "results"
  formData?: DiscoveryFormData
  scenario?: MedicareScenario
  recommendations?: ProductRecommendation[]
  leadScore?: number
}

export default function RevolutionaryMegaQuoter() {
  const [state, setState] = useState<MegaQuoterState>({ step: "discovery" })

  const handleDiscoveryComplete = (
    formData: DiscoveryFormData,
    scenario: MedicareScenario,
    recommendations: ProductRecommendation[],
    leadScore: number
  ) => {
    setState({
      step: "results",
      formData,
      scenario,
      recommendations,
      leadScore
    })
  }

  const handleRequestConsultation = () => {
    // Here you would integrate with your CRM/lead management system
    console.log("Consultation requested for lead:", state.formData?.contactInfo)
    
    // Example: Send to Firebase, CRM, or trigger calendar booking
    // await scheduleConsultation(state.formData, state.leadScore)
    
    alert("Thank you! We'll contact you within 24 hours to schedule your free consultation.")
  }

  const handleGenerateReport = () => {
    // Here you would generate a PDF report or trigger email with detailed analysis
    console.log("Generating report for:", state.formData?.contactInfo?.email)
    
    // Example: Generate PDF with all quotes and recommendations
    // await generatePDFReport(state.formData, state.recommendations)
    
    alert("Your personalized Medicare report is being generated and will be sent to your email.")
  }

  const handleRestart = () => {
    setState({ step: "discovery" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary via-background to-secondary shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Medicare Mega Quoter
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Revolutionary all-in-one Medicare intelligence platform
                </p>
              </div>
            </div>
            
            {state.step === "results" && (
              <button
                onClick={handleRestart}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Start New Quote
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gradient-to-br from-secondary via-background to-secondary border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center gap-2 ${state.step === "discovery" ? "text-blue-600" : "text-green-600"}`}>
              <div className={`p-2 rounded-full ${state.step === "discovery" ? "bg-blue-100 dark:bg-blue-900" : "bg-green-100 dark:bg-green-900"}`}>
                <Calculator className="h-4 w-4" />
              </div>
              <span className="font-medium">Discovery</span>
              {state.step === "results" && <span className="text-green-600">✓</span>}
            </div>
            
            <div className={`h-0.5 w-12 ${state.step === "results" ? "bg-green-400" : "bg-gray-300"}`} />
            
            <div className={`flex items-center gap-2 ${state.step === "results" ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`p-2 rounded-full ${state.step === "results" ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-700"}`}>
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-medium">Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <AnimatePresence mode="wait">
          {state.step === "discovery" && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DiscoveryQuestionnaire onComplete={handleDiscoveryComplete} />
            </motion.div>
          )}

          {state.step === "results" && state.formData && state.scenario && state.recommendations && state.leadScore !== undefined && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <MegaQuoterResults
                formData={state.formData}
                scenario={state.scenario}
                recommendations={state.recommendations}
                leadScore={state.leadScore}
                onRequestConsultation={handleRequestConsultation}
                onGenerateReport={handleGenerateReport}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-secondary via-background to-secondary border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Revolutionary Quote Engine
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                First-of-its-kind Medicare intelligence platform with real-time quotes, 
                scenario detection, and automated cross-sell recommendations.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Supported Products
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Medicare Supplement (Medigap)</li>
                <li>• Medicare Advantage Plans</li>
                <li>• Dental Insurance</li>
                <li>• Hospital Indemnity</li>
                <li>• Cancer Insurance</li>
                <li>• Final Expense Life Insurance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Smart Features
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• AI-powered scenario detection</li>
                <li>• Cross-sell optimization</li>
                <li>• Lead scoring algorithm</li>
                <li>• Real-time quote generation</li>
                <li>• Automated bundling recommendations</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 Medicare Mega Quoter. Revolutionary Medicare intelligence platform.
              <span className="block mt-1">
                Powered by advanced scenario detection and cross-sell optimization.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
