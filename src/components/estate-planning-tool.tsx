"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"
import { FileText, Shield, Users, Home, Heart, Building, DollarSign, Scale, ArrowLeft, Check } from "lucide-react"

const familySituations = [
  {
    id: "single",
    name: "Single, No Children",
    description: "Simple estate planning needs",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "single-children",
    name: "Single with Children",
    description: "Guardianship and protection focus",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "married-no-children",
    name: "Married, No Children",
    description: "Spousal protection planning",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "married-children",
    name: "Married with Children",
    description: "Family legacy planning",
    icon: <Home className="w-6 h-6" />,
  },
]

const assetLevels = [
  {
    id: "basic",
    name: "Under $100K",
    description: "Basic will and documents",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: "moderate",
    name: "$100K - $500K",
    description: "Comprehensive planning",
    icon: <Home className="w-6 h-6" />,
  },
  {
    id: "substantial",
    name: "$500K - $1M",
    description: "Tax optimization strategies",
    icon: <Building className="w-6 h-6" />,
  },
  {
    id: "complex",
    name: "$1M+",
    description: "Advanced estate planning",
    icon: <Scale className="w-6 h-6" />,
  },
]

const planningPriorities = [
  {
    id: "protection",
    name: "Asset Protection",
    description: "Protect wealth from creditors",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "tax",
    name: "Tax Minimization",
    description: "Reduce estate tax burden",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: "family",
    name: "Family Security",
    description: "Provide for loved ones",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "charity",
    name: "Charitable Giving",
    description: "Leave a philanthropic legacy",
    icon: <Building className="w-6 h-6" />,
  },
]

export default function EstatePlanningTool() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFamily, setSelectedFamily] = useState("")
  const [selectedAssets, setSelectedAssets] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")
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

  const handleFamilySelect = (familyId: string) => {
    setSelectedFamily(familyId)
    setCurrentStep(2)
  }

  const handleAssetsSelect = (assetsId: string) => {
    setSelectedAssets(assetsId)
    setCurrentStep(3)
  }

  const handlePrioritySelect = (priorityId: string) => {
    setSelectedPriority(priorityId)
    setCurrentStep(4)
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      if (currentStep === 2) {
        setSelectedFamily("")
      } else if (currentStep === 3) {
        setSelectedAssets("")
      } else if (currentStep === 4) {
        setSelectedPriority("")
      }
    }
  }

  const handleCreatePlan = () => {
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 3000)
  }

  const isComplete = selectedFamily && selectedAssets && selectedPriority

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
            Estate Planning Tool
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protect your legacy and ensure your loved ones are taken care of
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
                          ? 'bg-blue-500 text-white' 
                          : darkMode 
                            ? 'bg-white/20 text-white/60'
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step < currentStep ? <Check className="w-4 h-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-8 h-0.5 ${
                          step < currentStep 
                            ? 'bg-blue-500' 
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
                    What's your family situation?
                  </h3>
                  <p className={`mb-8 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                    This helps us understand your estate planning needs
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {familySituations.map((situation) => (
                      <motion.button
                        key={situation.id}
                        onClick={() => handleFamilySelect(situation.id)}
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
                            {situation.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {situation.name}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                              {situation.description}
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
                    What's your total asset value?
                  </h3>
                  <p className={`mb-8 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                    This determines the complexity of planning you'll need
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assetLevels.map((level) => (
                      <motion.button
                        key={level.id}
                        onClick={() => handleAssetsSelect(level.id)}
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
                    What's your primary planning goal?
                  </h3>
                  <p className={`mb-8 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                    This helps us focus on what matters most to you
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {planningPriorities.map((priority) => (
                      <motion.button
                        key={priority.id}
                        onClick={() => handlePrioritySelect(priority.id)}
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
                            {priority.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {priority.name}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                              {priority.description}
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
              <h4 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Planning Profile</h4>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  selectedFamily 
                    ? darkMode 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/60 border-gray-300'
                    : darkMode 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/30 border-gray-200'
                }`}>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>Family Situation</div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedFamily ? getSelectedItem(familySituations, selectedFamily)?.name : 'Not selected'}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  selectedAssets 
                    ? darkMode 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/60 border-gray-300'
                    : darkMode 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/30 border-gray-200'
                }`}>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>Asset Level</div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAssets ? getSelectedItem(assetLevels, selectedAssets)?.name : 'Not selected'}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  selectedPriority 
                    ? darkMode 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/60 border-gray-300'
                    : darkMode 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/30 border-gray-200'
                }`}>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-blue-200' : 'text-gray-500'}`}>Planning Priority</div>
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedPriority ? getSelectedItem(planningPriorities, selectedPriority)?.name : 'Not selected'}
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
                    Get My Estate Plan
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
              <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Our comprehensive estate planning tool is currently in development. 
                Contact us for personalized estate planning consultation.
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
