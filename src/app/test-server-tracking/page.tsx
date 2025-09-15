'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'

type TestResult = {
  name: string
  status?: number
  data?: any
  error?: string
  timestamp: string
}

export default function TestServerTracking() {
  // Enable for testing (remove production restriction temporarily)
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  const addResult = (result: Omit<TestResult, 'timestamp'>) => {
    setResults(prev => [...prev, { ...result, timestamp: new Date().toLocaleTimeString() }])
  }

  // Browser event testing functions
  const testBrowserEvent = (eventName: string, eventData: any, description: string) => {
    try {
      // Check if Meta Pixel is loaded
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', eventName, eventData)
        addResult({
          name: `Browser: ${description}`,
          status: 200,
          data: { eventName, eventData, method: 'Meta Pixel' },
        })
      } else {
        addResult({
          name: `Browser: ${description}`,
          status: 404,
          error: 'Meta Pixel not loaded'
        })
      }
    } catch (error) {
      addResult({
        name: `Browser: ${description}`,
        status: 500,
        error: error instanceof Error ? error.message : 'Unknown browser error'
      })
    }
  }

  // Server event testing function
  const testAPI = async (testName: string, payload: any) => {
    setLoading(testName)
    try {
      const response = await fetch('/api/conversions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      addResult({ 
        name: testName, 
        status: response.status, 
        data,
        error: response.ok ? undefined : `HTTP ${response.status}` 
      })
    } catch (error) {
      addResult({ 
        name: testName, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
    } finally {
      setLoading(null)
    }
  }

  const testGetStartedForm = () => testAPI('Get Started Form (Lead)', {
    eventName: 'Lead',
    userData: {
      email: 'test-getstartedform@hawkinsig.com',
      firstName: 'John',
      lastName: 'Smith',
      phone: '+15551234567',
      zipCode: '75201',
      state: 'TX'
    },
    customData: {
      content_type: 'product',
      content_ids: ['health', 'life', 'medicare']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  const testNewsletterSignup = () => testAPI('Newsletter Signup (CompleteRegistration)', {
    eventName: 'CompleteRegistration',
    userData: {
      email: 'test-newsletter@hawkinsig.com',
      firstName: 'Jane',
      lastName: 'Doe'
    },
    customData: {
      content_type: 'product',
      content_ids: ['newsletter_subscription']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  const testContactForm = () => testAPI('Contact Form (Lead)', {
    eventName: 'Lead',
    userData: {
      email: 'test-contact@hawkinsig.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '+15559876543'
    },
    customData: {
      content_type: 'product',
      content_ids: ['contact_form']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  const testQuoteRequest = () => testAPI('Quote Request (SubmitApplication)', {
    eventName: 'SubmitApplication',
    userData: {
      email: 'test-quote@hawkinsig.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      phone: '+15555551234',
      zipCode: '90210'
    },
    customData: {
      content_type: 'product',
      content_ids: ['medicare']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  const testLeadGeneration = () => testAPI('High-Value Lead (Lead)', {
    eventName: 'Lead',
    userData: {
      email: 'test-highvalue@hawkinsig.com',
      firstName: 'Robert',
      lastName: 'Davis',
      phone: '+15551111111',
      zipCode: '10001',
      state: 'NY'
    },
    customData: {
      content_type: 'product',
      content_ids: ['health', 'life']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  const testViewContent = () => testAPI('Page View (ViewContent)', {
    eventName: 'ViewContent',
    userData: {
      email: 'test-pageview@hawkinsig.com'
    },
    customData: {
      content_type: 'product',
      content_ids: ['medicare']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  const testCalendarScheduling = () => testAPI('Calendar Scheduling (Schedule)', {
    eventName: 'Schedule',
    userData: {
      email: 'test-calendar@hawkinsig.com',
      firstName: 'Calendar',
      lastName: 'User',
      phone: '+15558888888'
    },
    customData: {
      content_type: 'product',
      content_ids: ['consultation']
      // Note: Values configured in Meta Custom Conversions (no hardcoded values)
    }
  })

  // Browser Event Tests
  const testBrowserGetStarted = () => testBrowserEvent('Lead', {
    content_type: 'product',
    content_ids: ['health', 'life', 'medicare']
    // Note: Values configured in Meta Custom Conversions (no hardcoded values)
  }, 'Get Started Form (Lead)')

  const testBrowserQuoteRequest = () => testBrowserEvent('SubmitApplication', {
    content_type: 'product', 
    content_ids: ['medicare']
    // Note: Values configured in Meta Custom Conversions (no hardcoded values)
  }, 'Quote Request (SubmitApplication)')

  const testBrowserViewContent = () => testBrowserEvent('ViewContent', {
    content_type: 'product',
    content_ids: ['services']
    // Note: Values configured in Meta Custom Conversions (no hardcoded values)
  }, 'Page View (ViewContent)')

  const testBrowserNewsletter = () => testBrowserEvent('CompleteRegistration', {
    content_type: 'product',
    content_ids: ['newsletter']
    // Note: Values configured in Meta Custom Conversions (no hardcoded values)
  }, 'Newsletter Signup (CompleteRegistration)')

  const testBrowserSchedule = () => testBrowserEvent('Schedule', {
    content_type: 'product',
    content_ids: ['consultation']
    // Note: Values configured in Meta Custom Conversions (no hardcoded values)
  }, 'Calendar Scheduling (Schedule)')

  const runAllTests = async () => {
    const serverTests = [
      testGetStartedForm,
      testNewsletterSignup, 
      testContactForm,
      testQuoteRequest,
      testLeadGeneration,
      testViewContent,
      testCalendarScheduling
    ]

    const browserTests = [
      testBrowserGetStarted,
      testBrowserQuoteRequest,
      testBrowserViewContent,
      testBrowserNewsletter,
      testBrowserSchedule
    ]

    // Run server tests first
    for (let i = 0; i < serverTests.length; i++) {
      await serverTests[i]()
      // Small delay between tests
      if (i < serverTests.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    // Small delay before browser tests
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Run browser tests
    for (let i = 0; i < browserTests.length; i++) {
      browserTests[i]() // Browser tests are synchronous
      // Small delay between tests
      if (i < browserTests.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
  }

  const clearResults = () => setResults([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Meta Tracking Test Suite
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Server Tests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🖥️ Server Tests (Conversions API)</h2>
            <div className="space-y-3">
              <button
                onClick={testGetStartedForm}
                disabled={loading === 'Get Started Form (Lead)'}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading === 'Get Started Form (Lead)' ? 'Testing...' : '📋 Get Started Form'}
              </button>
              
              <button
                onClick={testNewsletterSignup}
                disabled={loading === 'Newsletter Signup (CompleteRegistration)'}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading === 'Newsletter Signup (CompleteRegistration)' ? 'Testing...' : '📧 Newsletter Signup'}
              </button>
              
              <button
                onClick={testContactForm}
                disabled={loading === 'Contact Form (Lead)'}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {loading === 'Contact Form (Lead)' ? 'Testing...' : '📞 Contact Form'}
              </button>
              
              <button
                onClick={testQuoteRequest}
                disabled={loading === 'Quote Request (SubmitApplication)'}
                className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
              >
                {loading === 'Quote Request (SubmitApplication)' ? 'Testing...' : '💰 Quote Request'}
              </button>
              
              <button
                onClick={testLeadGeneration}
                disabled={loading === 'High-Value Lead (Lead)'}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading === 'High-Value Lead (Lead)' ? 'Testing...' : '🎯 High-Value Lead'}
              </button>
              
              <button
                onClick={testViewContent}
                disabled={loading === 'Page View (ViewContent)'}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading === 'Page View (ViewContent)' ? 'Testing...' : '👀 Page View'}
              </button>
              
              <button
                onClick={testCalendarScheduling}
                disabled={loading === 'Calendar Scheduling (Schedule)'}
                className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
              >
                {loading === 'Calendar Scheduling (Schedule)' ? 'Testing...' : '📅 Calendar Scheduling'}
              </button>
            </div>
          </div>

          {/* Browser Tests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🌐 Browser Tests (Meta Pixel)</h2>
            <div className="space-y-3">
              <button
                onClick={testBrowserGetStarted}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border-2 border-blue-300"
              >
                🌐📋 Browser: Get Started
              </button>
              
              <button
                onClick={testBrowserQuoteRequest}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 border-2 border-orange-300"
              >
                🌐💰 Browser: Quote Request
              </button>
              
              <button
                onClick={testBrowserViewContent}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 border-2 border-indigo-300"
              >
                🌐👀 Browser: Page View
              </button>
              
              <button
                onClick={testBrowserNewsletter}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 border-2 border-green-300"
              >
                🌐📧 Browser: Newsletter
              </button>
              
              <button
                onClick={testBrowserSchedule}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 border-2 border-teal-300"
              >
                🌐📅 Browser: Schedule
              </button>
            </div>
          </div>

          {/* Batch Tests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🚀 Batch Tests</h2>
            <div className="space-y-4">
              <button
                onClick={runAllTests}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 font-semibold"
              >
                {loading ? `Testing: ${loading}` : '🚀 Run All Tests (Server + Browser)'}
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={async () => {
                    const serverTests = [testGetStartedForm, testNewsletterSignup, testContactForm, testQuoteRequest, testLeadGeneration, testViewContent, testCalendarScheduling]
                    for (let i = 0; i < serverTests.length; i++) {
                      await serverTests[i]()
                      if (i < serverTests.length - 1) await new Promise(resolve => setTimeout(resolve, 1000))
                    }
                  }}
                  disabled={loading !== null}
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  🖥️ Server Only
                </button>
                
                <button
                  onClick={() => {
                    const browserTests = [testBrowserGetStarted, testBrowserQuoteRequest, testBrowserViewContent, testBrowserNewsletter, testBrowserSchedule]
                    browserTests.forEach((test, i) => {
                      setTimeout(() => test(), i * 500)
                    })
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
                >
                  🌐 Browser Only
                </button>
              </div>
              
              <button
                onClick={clearResults}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                🗑️ Clear Results
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">🧪 Test Configuration</h4>
              <div className="text-yellow-700 text-sm space-y-1">
                <p><strong>Test Event Code:</strong> TEST88538 (for Meta Events Manager verification)</p>
                <p><strong>Data Format:</strong> Production-clean (no hardcoded values/currency)</p>
                <p><strong>Values:</strong> Configured in Meta Custom Conversions</p>
                <p><strong>Server:</strong> Conversions API with advanced matching</p>
                <p><strong>Browser:</strong> Meta Pixel events with deduplication</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Test Results ({results.length})</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded border ${
                    result.error 
                      ? 'bg-red-50 border-red-200' 
                      : result.status === 200 
                        ? 'bg-green-50 border-green-200'
                        : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{result.name}</h4>
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                  </div>
                  
                  {result.error ? (
                    <p className="text-red-700">❌ Error: {result.error}</p>
                  ) : result.status === 200 ? (
                    <p className="text-green-700">✅ Success: Event sent to Meta</p>
                  ) : (
                    <p className="text-yellow-700">⚠️ Status: {result.status}</p>
                  )}
                  
                  {result.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-600">View Response</summary>
                      <pre className="bg-gray-100 p-2 rounded text-xs mt-2 overflow-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">How to verify in Meta Events Manager:</h4>
          <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
            <li>Go to Meta Events Manager → Test Events</li>
            <li>Look for events with test code "TEST88538"</li>
            <li>Verify each event type appears with proper parameters</li>
            <li>Check that user data is properly hashed</li>
            <li>Confirm deduplication IDs are unique</li>
          </ol>
        </div>
      </div>
    </div>
  )
}