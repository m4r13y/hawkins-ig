"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"
import { TrendingUp, Target, PiggyBank, Shield, Home, Briefcase, ArrowLeft, Check } from "lucide-react"

const financialGoals = [
  {
    id: "retirement",
    name: "Retirement Planning",
    description: "Build wealth for your golden years",
    icon: <PiggyBank className="w-6 h-6" />,
  },
  {
    id: "home",
    name: "Buy a Home",
    description: "Save for your dream house",
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    description: "Create a financial safety net",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "investment",
    name: "Investment Growth",
    description: "Grow wealth through investing",
    icon: <TrendingUp className="w-6 h-6" />,
  },
]

const timeHorizons = [
  {
    id: "short",
    name: "1-3 Years",
    description: "Short-term goals",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "medium",
    name: "3-10 Years",
    description: "Medium-term planning",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "long",
    name: "10+ Years",
    description: "Long-term wealth building",
    icon: <PiggyBank className="w-6 h-6" />,
  },
  {
    id: "ongoing",
    name: "Ongoing",
    description: "Continuous planning",
    icon: <Briefcase className="w-6 h-6" />,
  },
]

const riskLevels = [
  {
    id: "conservative",
    name: "Conservative",
    description: "Preserve capital, low risk",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "moderate",
    name: "Moderate",
    description: "Balanced risk and growth",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "aggressive",
    name: "Aggressive",
    description: "Maximum growth potential",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "custom",
    name: "Need Guidance",
    description: "Help me decide",
    icon: <Briefcase className="w-6 h-6" />,
  },
]

export default function FinancialPlanningTool() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedGoal, setSelectedGoal] = useState("")
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState("")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("")
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId)
    setCurrentStep(2)
  }

  const handleTimeHorizonSelect = (timeId: string) => {
    setSelectedTimeHorizon(timeId)
    setCurrentStep(3)
  }

  const handleRiskLevelSelect = (riskId: string) => {
    setSelectedRiskLevel(riskId)
    setCurrentStep(4)
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      if (currentStep === 2) {
        setSelectedGoal("")
      } else if (currentStep === 3) {
        setSelectedTimeHorizon("")
      } else if (currentStep === 4) {
        setSelectedRiskLevel("")
      }
    }
  }

  const handleCreatePlan = () => {
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 3000)
  }

  const isComplete = selectedGoal && selectedTimeHorizon && selectedRiskLevel

  const getSelectedItem = (items: any[], selectedId: string) => {
    return items.find(item => item.id === selectedId)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <TrendingUp className="inline-block w-10 h-10 mr-3 text-blue-400" />
            Financial Planning Tool
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Create a personalized financial plan to reach your goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              {/* Progress */}
              <div className="flex items-center mb-8">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step <= currentStep 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/20 text-white/60'
                      }`}>
                        {step < currentStep ? <Check className="w-4 h-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-8 h-0.5 ${
                          step < currentStep ? 'bg-blue-500' : 'bg-white/20'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <span className="ml-4 text-white/80">Step {currentStep} of 3</span>
              </div>

              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  onClick={goBack}
                  className="flex items-center text-blue-300 hover:text-blue-200 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}

              {/* Step Content */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    What's your primary financial goal?
                  </h3>
                  <p className="text-blue-100 mb-8">
                    Choose what you want to focus on first
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {financialGoals.map((goal) => (
                      <motion.button
                        key={goal.id}
                        onClick={() => handleGoalSelect(goal.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-left transition-all group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-blue-400 group-hover:text-blue-300">
                            {goal.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">
                              {goal.name}
                            </h4>
                            <p className="text-blue-100 text-sm">
                              {goal.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    What's your time horizon?
                  </h3>
                  <p className="text-blue-100 mb-8">
                    When do you want to achieve this goal?
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {timeHorizons.map((horizon) => (
                      <motion.button
                        key={horizon.id}
                        onClick={() => handleTimeHorizonSelect(horizon.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-left transition-all group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-green-400 group-hover:text-green-300">
                            {horizon.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">
                              {horizon.name}
                            </h4>
                            <p className="text-blue-100 text-sm">
                              {horizon.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    What's your risk tolerance?
                  </h3>
                  <p className="text-blue-100 mb-8">
                    How comfortable are you with investment risk?
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {riskLevels.map((level) => (
                      <motion.button
                        key={level.id}
                        onClick={() => handleRiskLevelSelect(level.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-left transition-all group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-purple-400 group-hover:text-purple-300">
                            {level.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">
                              {level.name}
                            </h4>
                            <p className="text-blue-100 text-sm">
                              {level.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sticky top-8">
              <h4 className="text-lg font-semibold text-white mb-6">Your Financial Profile</h4>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${selectedGoal ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'}`}>
                  <div className="text-sm text-blue-200 mb-1">Primary Goal</div>
                  <div className="text-white font-medium">
                    {selectedGoal ? getSelectedItem(financialGoals, selectedGoal)?.name : 'Not selected'}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${selectedTimeHorizon ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'}`}>
                  <div className="text-sm text-blue-200 mb-1">Time Horizon</div>
                  <div className="text-white font-medium">
                    {selectedTimeHorizon ? getSelectedItem(timeHorizons, selectedTimeHorizon)?.name : 'Not selected'}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${selectedRiskLevel ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'}`}>
                  <div className="text-sm text-blue-200 mb-1">Risk Tolerance</div>
                  <div className="text-white font-medium">
                    {selectedRiskLevel ? getSelectedItem(riskLevels, selectedRiskLevel)?.name : 'Not selected'}
                  </div>
                </div>
              </div>

              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <AnimatedButton
                    onClick={handleCreatePlan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold"
                  >
                    Create My Plan
                  </AnimatedButton>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Coming Soon Modal */}
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Our financial planning tool is currently in development. 
                Contact us for personalized financial planning consultation.
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
