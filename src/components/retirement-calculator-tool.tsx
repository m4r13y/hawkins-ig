"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"
import { PiggyBank, Calculator, TrendingUp, Target, DollarSign, Clock, ArrowLeft, Check } from "lucide-react"

const ageRanges = [
  {
    id: "twenties",
    name: "20-29 years old",
    description: "Just starting your career",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "thirties",
    name: "30-39 years old",
    description: "Building your foundation",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "forties",
    name: "40-49 years old",
    description: "Peak earning years",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: "fifties",
    name: "50+ years old",
    description: "Pre-retirement planning",
    icon: <Clock className="w-6 h-6" />,
  },
]

const savingsLevels = [
  {
    id: "starting",
    name: "Just Starting",
    description: "Less than $10K saved",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "building",
    name: "Building Up",
    description: "$10K - $100K saved",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "progressing",
    name: "Good Progress",
    description: "$100K - $500K saved",
    icon: <PiggyBank className="w-6 h-6" />,
  },
  {
    id: "advanced",
    name: "Well Established",
    description: "$500K+ saved",
    icon: <DollarSign className="w-6 h-6" />,
  },
]

const retirementGoals = [
  {
    id: "comfortable",
    name: "Comfortable Retirement",
    description: "Maintain current lifestyle",
    icon: <Target className="w-6 h-6" />,
  },
  {
    id: "luxury",
    name: "Luxury Retirement",
    description: "Upgrade your lifestyle",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "early",
    name: "Early Retirement",
    description: "Retire before 65",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: "legacy",
    name: "Legacy Planning",
    description: "Leave money for heirs",
    icon: <PiggyBank className="w-6 h-6" />,
  },
]

export default function RetirementCalculatorTool() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedAge, setSelectedAge] = useState("")
  const [selectedSavings, setSelectedSavings] = useState("")
  const [selectedGoal, setSelectedGoal] = useState("")
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Check for dark mode preference
  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement
      setDarkMode(html.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const handleAgeSelect = (ageId: string) => {
    setSelectedAge(ageId)
    setCurrentStep(2)
  }

  const handleSavingsSelect = (savingsId: string) => {
    setSelectedSavings(savingsId)
    setCurrentStep(3)
  }

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId)
    setCurrentStep(4)
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      if (currentStep === 2) {
        setSelectedAge("")
      } else if (currentStep === 3) {
        setSelectedSavings("")
      } else if (currentStep === 4) {
        setSelectedGoal("")
      }
    }
  }

  const handleCreatePlan = () => {
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 3000)
  }

  const isComplete = selectedAge && selectedSavings && selectedGoal

  const getSelectedItem = (items: any[], selectedId: string) => {
    return items.find(item => item.id === selectedId)
  }

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Retirement Calculator
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plan your perfect retirement with our step-by-step calculator
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
              className={`backdrop-blur-md border rounded-2xl p-8 ${
                darkMode 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-white/80 border-gray-200 shadow-lg'
              }`}
            >
              {/* Progress */}
              <div className="flex items-center mb-8">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step <= currentStep 
                          ? 'bg-green-500 text-white' 
                          : darkMode 
                            ? 'bg-white/20 text-white/60'
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step < currentStep ? <Check className="w-4 h-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-8 h-0.5 ${
                          step < currentStep 
                            ? 'bg-green-500' 
                            : darkMode 
                              ? 'bg-white/20'
                              : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <span className={`ml-4 ${darkMode ? 'text-white/80' : 'text-gray-600'}`}>Step {currentStep} of 3</span>
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
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    What's your current age range?
                  </h3>
                  <p className={`mb-8 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                    This helps us determine your retirement timeline
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ageRanges.map((range) => (
                      <motion.button
                        key={range.id}
                        onClick={() => handleAgeSelect(range.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border rounded-xl p-6 text-left transition-all group ${
                          darkMode 
                            ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                            : 'bg-white/70 hover:bg-white/90 border-gray-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-green-400 group-hover:text-green-300">
                            {range.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {range.name}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                              {range.description}
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
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    How much have you saved so far?
                  </h3>
                  <p className={`mb-8 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                    Include all retirement accounts (401k, IRA, etc.)
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savingsLevels.map((level) => (
                      <motion.button
                        key={level.id}
                        onClick={() => handleSavingsSelect(level.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border rounded-xl p-6 text-left transition-all group ${
                          darkMode 
                            ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                            : 'bg-white/70 hover:bg-white/90 border-gray-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-blue-400 group-hover:text-blue-300">
                            {level.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {level.name}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                              {level.description}
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
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    What's your retirement goal?
                  </h3>
                  <p className={`mb-8 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                    Choose what type of retirement lifestyle you want
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {retirementGoals.map((goal) => (
                      <motion.button
                        key={goal.id}
                        onClick={() => handleGoalSelect(goal.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border rounded-xl p-6 text-left transition-all group ${
                          darkMode 
                            ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                            : 'bg-white/70 hover:bg-white/90 border-gray-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-purple-400 group-hover:text-purple-300">
                            {goal.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {goal.name}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                              {goal.description}
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
            <div className={`backdrop-blur-md border rounded-2xl p-6 sticky top-8 ${
              darkMode 
                ? 'bg-white/10 border-white/20' 
                : 'bg-white/80 border-gray-200 shadow-lg'
            }`}>
              <h4 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Retirement Profile</h4>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  selectedAge 
                    ? darkMode 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/60 border-gray-300'
                    : darkMode 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/30 border-gray-200'
                }`}>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>Age Range</div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAge ? getSelectedItem(ageRanges, selectedAge)?.name : 'Not selected'}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  selectedSavings 
                    ? darkMode 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/60 border-gray-300'
                    : darkMode 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/30 border-gray-200'
                }`}>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>Current Savings</div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedSavings ? getSelectedItem(savingsLevels, selectedSavings)?.name : 'Not selected'}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  selectedGoal 
                    ? darkMode 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/60 border-gray-300'
                    : darkMode 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/30 border-gray-200'
                }`}>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>Retirement Goal</div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedGoal ? getSelectedItem(retirementGoals, selectedGoal)?.name : 'Not selected'}
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold"
                  >
                    Calculate My Plan
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
              <Calculator className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Our retirement calculator is currently in development. 
                Contact us for personalized retirement planning consultation.
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
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
