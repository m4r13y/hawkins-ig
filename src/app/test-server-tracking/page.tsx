'use client'

import { useState } from 'react'

export default function TestServerTracking() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testServerSideAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/conversions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: 'Lead',
          userData: {
            email: 'test@hawkinsig.com',
            firstName: 'Test',
            lastName: 'User',
            phone: '+1234567890'
          },
          customData: {
            content_type: 'product',
            content_ids: ['health', 'life'],
            value: 500,
            currency: 'USD'
          }
        })
      })
      
      const data = await response.json()
      setResult({ status: response.status, data })
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Server-Side Meta Tracking Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Conversions API</h2>
          <p className="text-gray-600 mb-4">
            This will send a test Lead event to Meta's Conversions API with test event code TEST88538.
            Check Meta Events Manager → Test Events to see if it appears.
          </p>
          
          <button
            onClick={testServerSideAPI}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending Test Event...' : 'Send Test Event'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">API Response:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
            
            {result.status === 200 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800">
                  ✅ Success! Check Meta Events Manager → Test Events for event with code TEST88538
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">How to verify:</h4>
          <ol className="list-decimal list-inside text-yellow-700 space-y-1">
            <li>Go to Meta Events Manager</li>
            <li>Click "Test Events" in the left sidebar</li>
            <li>Look for events with test code "TEST88538"</li>
            <li>Verify the event shows proper deduplication and user data</li>
          </ol>
        </div>
      </div>
    </div>
  )
}