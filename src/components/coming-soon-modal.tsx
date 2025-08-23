"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock } from 'lucide-react'
import { useModal } from '@/contexts/modal-context'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  const { comingSoonData } = useModal()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-slate-900/90 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="bg-white dark:bg-slate-800 border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{comingSoonData.title}</h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                
                <p className="text-foreground/80 mb-6">
                  {comingSoonData.description}
                  {comingSoonData.feature && (
                    <>
                      <br />
                      <span className="font-medium">Feature: {comingSoonData.feature}</span>
                    </>
                  )}
                </p>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    We're working hard to bring you this feature. Stay tuned for updates!
                  </p>
                  
                  <button
                    onClick={onClose}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
