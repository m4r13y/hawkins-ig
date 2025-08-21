"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Shield } from 'lucide-react'
import AnimatedButton from './animated-button'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Sign In</h2>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-slate-300 text-center mb-8">
                  Choose your login portal
                </p>

                {/* Client Portal */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <a
                    href="https://hawknest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 group-hover:bg-slate-750">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">Client Portal</h3>
                          <p className="text-slate-400 text-sm">
                            Access your insurance dashboard and documents
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>

                {/* Agent Portal */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <a
                    href="https://admin.hawknest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300 group-hover:bg-slate-750">
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-500/20 p-3 rounded-lg">
                          <Shield className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">Agent Portal</h3>
                          <p className="text-slate-400 text-sm">
                            Manage clients, quotes, and commission tracking
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <p className="text-slate-500 text-xs text-center">
                  Need help accessing your account? 
                  <a href="/contact" className="text-blue-400 hover:text-blue-300 ml-1">
                    Contact support
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
