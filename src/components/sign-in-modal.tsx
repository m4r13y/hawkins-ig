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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
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
              className="bg-card border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Sign In</h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <p className="text-foreground/80 text-center mb-8">
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
                    <div className="bg-background border border-border rounded-xl p-6 hover:border-primary transition-all duration-300 group-hover:bg-background/80">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/20 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Client Portal</h3>
                          <p className="text-muted-foreground text-sm">
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
                    <div className="bg-background border border-border rounded-xl p-6 hover:border-emerald-500 transition-all duration-300 group-hover:bg-background/80">
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-500/20 p-3 rounded-lg">
                          <Shield className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Agent Portal</h3>
                          <p className="text-muted-foreground text-sm">
                            Manage clients, quotes, and commission tracking
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground text-xs text-center">
                  Need help accessing your account? 
                  <a href="/contact" className="text-primary hover:text-primary/80 ml-1">
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
