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
  test_event_code?: string
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

  // Hash phone if provided
  if (rawUserData.phone) {
    const cleanPhone = rawUserData.phone.replace(/\D/g, '') // Remove non-digits
    userData.ph = [hashData(cleanPhone)]
  }

  // Hash first name if provided
  if (rawUserData.firstName) {
    userData.fn = [hashData(rawUserData.firstName)]
  }

  // Hash last name if provided
  if (rawUserData.lastName) {
    userData.ln = [hashData(rawUserData.lastName)]
  }

  // Hash city if provided
  if (rawUserData.city) {
    userData.ct = [hashData(rawUserData.city)]
  }

  // Hash state if provided
  if (rawUserData.state) {
    userData.st = [hashData(rawUserData.state)]
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
      return NextResponse.json(
        { error: 'Missing required configuration' },
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

    // Add test event code if in development
    if (process.env.NODE_ENV === 'development' && process.env.META_TEST_EVENT_CODE) {
      payload.test_event_code = process.env.META_TEST_EVENT_CODE
    }

    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Conversions API Error:', result)
      return NextResponse.json(
        { error: 'Failed to send event', details: result },
        { status: response.status }
      )
    }

    return NextResponse.json({ 
      success: true, 
      eventId: event.event_id,
      message: 'Event sent successfully' 
    })

  } catch (error) {
    console.error('Conversions API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}