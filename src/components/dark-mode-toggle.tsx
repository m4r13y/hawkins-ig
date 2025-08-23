"use client"

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    
    const html = document.documentElement
    
    if (newValue) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    // Store preference
    try {
      localStorage.setItem('dark-mode', newValue.toString())
    } catch (error) {
      console.warn('Could not save dark mode preference:', error)
    }
  }

  // Load saved preference on mount
  useEffect(() => {
    try {
      const savedDarkMode = localStorage.getItem('dark-mode')
      
      if (savedDarkMode === null) {
        // If no preference saved, default to dark mode
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      } else {
        const isDark = savedDarkMode === 'true'
        setDarkMode(isDark)
        if (isDark) {
          document.documentElement.classList.add('dark')
        }
      }
    } catch (error) {
      console.warn('Could not load dark mode preference:', error)
    }
  }, [])

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-40 p-2 bg-slate-900/80 backdrop-blur-sm border border-border/50 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}

