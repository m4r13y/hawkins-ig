"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, Eye, EyeOff } from 'lucide-react'

const AdminPanel = () => {
  const [constructionMode, setConstructionMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Get current construction mode from localStorage or environment
    const stored = localStorage.getItem('hawkins_construction_mode')
    setConstructionMode(stored === 'true' || process.env.NEXT_PUBLIC_CONSTRUCTION_MODE === 'true')
  }, [])

  const toggleConstructionMode = () => {
    const newMode = !constructionMode
    setConstructionMode(newMode)
    
    // Store in localStorage for client-side persistence
    localStorage.setItem('hawkins_construction_mode', newMode.toString())
    
    // Show confirmation
    alert(`Construction mode ${newMode ? 'enabled' : 'disabled'}. Refresh the page to see changes.`)
  }

  const reloadPage = () => {
    window.location.reload()
  }

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Hawkins IG Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage site settings and construction mode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Construction Mode Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {constructionMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                Construction Mode
              </CardTitle>
              <CardDescription>
                Toggle the "Big Things Coming Soon" page overlay
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="construction-mode"
                  checked={constructionMode}
                  onCheckedChange={toggleConstructionMode}
                />
                <Label htmlFor="construction-mode">
                  {constructionMode ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Status:</strong> Construction mode is currently{' '}
                  <span className="font-semibold">
                    {constructionMode ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  {constructionMode 
                    ? 'Visitors will see the "Big Things Coming Soon" page'
                    : 'Visitors will see the normal site content'
                  }
                </p>
              </div>

              <Button onClick={reloadPage} className="w-full">
                Refresh Page to Apply Changes
              </Button>
            </CardContent>
          </Card>

          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Current site configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Domain:</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {process.env.NEXT_PUBLIC_DOMAIN || 'hawkinsig.com'}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Environment:</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {process.env.NODE_ENV || 'development'}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Build Time:</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" size="sm">
                  Clear Cache
                </Button>
                <Button variant="outline" size="sm">
                  View Analytics
                </Button>
                <Button variant="outline" size="sm">
                  Check Performance
                </Button>
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• <strong>Construction Mode:</strong> When enabled, all visitors see the "Big Things Coming Soon" page</p>
              <p>• <strong>Admin Access:</strong> Visit <code>/admin</code> to access this panel</p>
              <p>• <strong>Environment Variable:</strong> Set <code>NEXT_PUBLIC_CONSTRUCTION_MODE=false</code> in .env.local to disable globally</p>
              <p>• <strong>Local Storage:</strong> This setting is stored locally and overrides the environment variable</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPanel
