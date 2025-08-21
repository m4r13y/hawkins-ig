"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X, ExternalLink } from 'lucide-react'

interface MedicareDisclaimerProps {
  variant?: 'full' | 'compact' | 'footer'
  className?: string
}

export default function MedicareDisclaimer({ variant = 'full', className = '' }: MedicareDisclaimerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (variant === 'footer') {
    return (
      <div className={`text-xs text-slate-500 space-y-2 ${className}`}>
        <p>
          We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. 
          Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.
        </p>
        <p>
          Not connected with or endorsed by the United States government or the federal Medicare program. 
          Medicare has neither reviewed nor endorsed this information.
        </p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 ${className}`}>
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-medium text-blue-300 hover:text-blue-200 text-left"
            >
              Important Medicare Information {isExpanded ? '▼' : '▶'}
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-xs text-slate-300 space-y-2 overflow-hidden"
                >
                  <p>
                    We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area.
                  </p>
                  <p>
                    Not connected with or endorsed by the United States government or the federal Medicare program.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.medicare.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      Visit Medicare.gov <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="bg-blue-500/20 p-3 rounded-lg flex-shrink-0">
          <Info className="h-6 w-6 text-blue-400" />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Important Medicare Disclosure</h3>
          
          <div className="space-y-3 text-sm text-slate-300">
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Plan Availability Notice</h4>
              <p>
                We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. 
                Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Government Endorsement</h4>
              <p>
                Not connected with or endorsed by the United States government or the federal Medicare program. 
                Medicare has neither reviewed nor endorsed this information.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Independent Agency</h4>
              <p>
                Hawkins Insurance Group is an independent insurance agency. We represent multiple insurance carriers 
                and are committed to helping you find the best Medicare coverage for your needs.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Additional Resources</h4>
              <div className="space-y-2">
                <p>For complete Medicare information and all available options:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a 
                      href="https://www.medicare.gov" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                    >
                      Medicare.gov <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </li>
                  <li>Call 1-800-MEDICARE (1-800-633-4227)</li>
                  <li>TTY users: 1-877-486-2048</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-700">
            <p>
              This information is current as of {new Date().getFullYear()} and is subject to change. 
              Please verify all information with Medicare.gov or your chosen insurance carrier.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
