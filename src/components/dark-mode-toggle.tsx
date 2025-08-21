"use client"

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

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
        // If no preference saved, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(prefersDark)
        if (prefersDark) {
          document.documentElement.classList.add('dark')
        }
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
      className="fixed top-4 right-4 z-40 p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
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
