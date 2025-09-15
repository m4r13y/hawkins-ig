import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Types for the Conversions API
interface UserData {
  em?: string[] // Email (hashed)
  ph?: string[] // Phone (hashed)
  fn?: string[] // First name (hashed)
  ln?: string[] // Last name (hashed)
  ct?: string[] // City (hashed)
  st?: string[] // State (hashed)
  zp?: string[] // Zip code (hashed)
  country?: string[] // Country (hashed)
  db?: string[] // Date of birth (hashed, YYYYMMDD format)
  client_ip_address?: string
  client_user_agent?: string
  fbc?: string // Facebook click ID
  fbp?: string // Facebook browser ID
}

interface ConversionsAPIEvent {
  event_name: string
  event_time: number
  event_id?: string
  user_data: UserData
  custom_data?: Record<string, any>
  event_source_url?: string
  action_source: 'website'
  data_processing_options?: string[]
  data_processing_options_country?: number
  data_processing_options_state?: number
}

interface ConversionsAPIPayload {
  data: ConversionsAPIEvent[]
}

// Hash function for PII data
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

// Process user data and hash PII
function processUserData(rawUserData: any, req: NextRequest): UserData {
  const userData: UserData = {
    client_ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
    client_user_agent: req.headers.get('user-agent') || undefined
  }

  // Hash email if provided
  if (rawUserData.email) {
    userData.em = [hashData(rawUserData.email)]
  }

  // Hash phone if provided - ensure includes country code (1 for US)
  if (rawUserData.phone) {
    let cleanPhone = rawUserData.phone.replace(/\D/g, '') // Remove non-digits
    
    // Add US country code if not present (assuming US market)
    if (cleanPhone.length === 10 && !cleanPhone.startsWith('1')) {
      cleanPhone = '1' + cleanPhone
    }
    
    userData.ph = [hashData(cleanPhone)]
  }

  // Hash first name if provided - ensure lowercase letters only
  if (rawUserData.firstName) {
    const cleanFirstName = rawUserData.firstName.toLowerCase().replace(/[^a-z]/g, '')
    if (cleanFirstName) {
      userData.fn = [hashData(cleanFirstName)]
    }
  }

  // Hash last name if provided - ensure lowercase letters only
  if (rawUserData.lastName) {
    const cleanLastName = rawUserData.lastName.toLowerCase().replace(/[^a-z]/g, '')
    if (cleanLastName) {
      userData.ln = [hashData(cleanLastName)]
    }
  }

  // Hash city if provided - ensure lowercase, spaces removed
  if (rawUserData.city) {
    const cleanCity = rawUserData.city.toLowerCase().replace(/\s+/g, '')
    if (cleanCity) {
      userData.ct = [hashData(cleanCity)]
    }
  }

  // Hash state if provided - ensure lowercase two-letter code
  if (rawUserData.state) {
    const cleanState = rawUserData.state.toLowerCase().replace(/[^a-z]/g, '').substring(0, 2)
    if (cleanState.length === 2) {
      userData.st = [hashData(cleanState)]
    }
  }

  // Hash zip code if provided
  if (rawUserData.zipCode) {
    userData.zp = [hashData(rawUserData.zipCode)]
  }

  // Hash country if provided (default to US for insurance)
  if (rawUserData.country) {
    userData.country = [hashData(rawUserData.country)]
  } else {
    userData.country = [hashData('us')] // Default to US for insurance business
  }

  // Hash date of birth if provided (format: YYYYMMDD)
  if (rawUserData.dateOfBirth) {
    // Ensure proper format for DOB (remove any separators, keep YYYYMMDD)
    const cleanDob = rawUserData.dateOfBirth.replace(/\D/g, '') // Remove non-digits
    if (cleanDob.length === 8) {
      userData.db = [hashData(cleanDob)]
    }
  }

  // Facebook click ID (from URL parameter)
  if (rawUserData.fbc) {
    userData.fbc = rawUserData.fbc
  }

  // Facebook browser ID (from _fbp cookie)
  if (rawUserData.fbp) {
    userData.fbp = rawUserData.fbp
  }

  return userData
}

export async function POST(req: NextRequest) {
  try {
    const { eventName, eventData, userData: rawUserData, eventId, customData } = await req.json()

    // Validate required environment variables
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
    const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN
    
    if (!pixelId || !accessToken) {
      const missingVars = []
      if (!pixelId) missingVars.push('NEXT_PUBLIC_META_PIXEL_ID')
      if (!accessToken) missingVars.push('META_CONVERSIONS_API_ACCESS_TOKEN')
      
      console.error('Missing environment variables:', missingVars)
      return NextResponse.json(
        { 
          error: 'Missing required configuration', 
          missing: missingVars,
          hasPixelId: !!pixelId,
          hasAccessToken: !!accessToken
        },
        { status: 500 }
      )
    }

    // Process user data and hash PII
    const userData = processUserData(rawUserData || {}, req)

    // Create the event
    const event: ConversionsAPIEvent = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000), // Unix timestamp
      event_id: eventId || crypto.randomUUID(), // For deduplication
      user_data: userData,
      action_source: 'website',
      event_source_url: eventData?.sourceUrl || req.headers.get('referer') || undefined,
      custom_data: customData || {}
    }

    // Prepare the payload
    const payload: ConversionsAPIPayload = {
      data: [event]
    }

    // Build the production URL
    const url = new URL(`https://graph.facebook.com/v18.0/${pixelId}/events`)
    url.searchParams.append('access_token', accessToken)

    // Log event details for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Sending Conversions API event:', {
        eventName,
        eventId: event.event_id,
        pixelId: pixelId.slice(0, 4) + '...' + pixelId.slice(-4),
        url: url.origin + url.pathname, // Don't log the access token
        customData
      });
    }

    // Send to Facebook Conversions API
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Conversions API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: result,
        eventName,
        eventId: event.event_id,
        timestamp: new Date().toISOString()
      })
      return NextResponse.json(
        { 
          error: 'Failed to send event', 
          details: result,
          status: response.status,
          eventId: event.event_id
        },
        { status: response.status }
      )
    }

    // Log success for debugging
    console.log('Conversions API Success:', {
      eventName,
      eventId: event.event_id,
      status: response.status,
      result,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true, 
      eventId: event.event_id,
      message: 'Event sent successfully',
      result 
    })

  } catch (error) {
    console.error('Conversions API Unhandled Error:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      env: {
        hasPixelId: !!process.env.NEXT_PUBLIC_META_PIXEL_ID,
        hasAccessToken: !!process.env.META_CONVERSIONS_API_ACCESS_TOKEN,
        nodeEnv: process.env.NODE_ENV
      }
    })
    return NextResponse.json(
      { 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}