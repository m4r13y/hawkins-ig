'use client'

import { useState } from 'react'

type TestResult = {
  name: string
  status?: number
  data?: any
  error?: string
  timestamp: string
}

export default function TestServerTracking() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  const addResult = (result: Omit<TestResult, 'timestamp'>) => {
    setResults(prev => [...prev, { ...result, timestamp: new Date().toLocaleTimeString() }])
  }

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

  const testGetStartedForm = () => testAPI('Get Started Form (Schedule + Lead)', {
    eventName: 'Schedule',
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
      content_ids: ['health', 'life', 'medicare'],
      value: 250,
      currency: 'USD'
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
      content_ids: ['newsletter_subscription'],
      value: 25,
      currency: 'USD'
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
      content_ids: ['contact_form'],
      value: 100,
      currency: 'USD'
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
      content_ids: ['medicare'],
      value: 300,
      currency: 'USD'
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
      content_ids: ['health', 'life'],
      value: 500,
      currency: 'USD'
    }
  })

  const testViewContent = () => testAPI('Page View (ViewContent)', {
    eventName: 'ViewContent',
    userData: {
      email: 'test-pageview@hawkinsig.com'
    },
    customData: {
      content_type: 'product',
      content_ids: ['medicare'],
      value: 50,
      currency: 'USD'
    }
  })

  const runAllTests = async () => {
    const tests = [
      testGetStartedForm,
      testNewsletterSignup, 
      testContactForm,
      testQuoteRequest,
      testLeadGeneration,
      testViewContent
    ]

    for (let i = 0; i < tests.length; i++) {
      await tests[i]()
      // Small delay between tests
      if (i < tests.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Individual Tests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Individual Tests</h2>
            <div className="space-y-3">
              <button
                onClick={testGetStartedForm}
                disabled={loading === 'Get Started Form (Schedule + Lead)'}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading === 'Get Started Form (Schedule + Lead)' ? 'Testing...' : '📋 Get Started Form'}
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
            </div>
          </div>

          {/* Batch Tests */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Batch Tests</h2>
            <div className="space-y-4">
              <button
                onClick={runAllTests}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 font-semibold"
              >
                {loading ? `Testing: ${loading}` : '🚀 Run All Tests'}
              </button>
              
              <button
                onClick={clearResults}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                🗑️ Clear Results
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">Test Event Code: TEST88538</h4>
              <p className="text-yellow-700 text-sm">
                All events use test code TEST88538 for verification in Meta Events Manager.
              </p>
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