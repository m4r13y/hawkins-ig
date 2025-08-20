# Firebase Functions for Hawkins IG Website

This directory contains Firebase Cloud Functions for handling secure server-side lead management for the Hawkins IG insurance website.

## Setup

1. Make sure you have Firebase CLI installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Make sure you're connected to your existing HawkNest project:
   ```bash
   firebase use medicareally
   ```

## Development

### Install Dependencies
```bash
cd functions
npm install
```

### Build Functions
```bash
npm run build
```

### Run Functions Locally
```bash
npm run serve
```

This will start the Firebase emulator for testing functions locally.

### Deploy Functions
```bash
npm run deploy
```

## Available Lead Functions

### `submitInsuranceLead`
Handles insurance lead submissions from the get-started flow.

**Parameters:**
- `clientType`: string (individual, family, business, agent)
- `age`: string (optional)
- `familySize`: string (optional for family leads)
- `employeeCount`: string (optional for business leads)
- `agentType`: string (optional for agent leads)
- `insuranceTypes`: string[] (Medicare, Dental, Life, etc.)
- `urgency`: string (immediate, within-30-days, within-3-months, just-browsing)
- `name`: string (required)
- `email`: string (required)
- `phone`: string (required)
- `company`: string (optional for business leads)
- `zipCode`: string (required)
- `source`: string

**Response:**
- `success`: boolean
- `leadId`: string
- `leadScore`: number (0-100)
- `message`: string

**Lead Scoring:**
- Urgency: immediate (30), within-30-days (20), within-3-months (10)
- Insurance types: +5 per type
- Client type: business (25), family (15), individual (10)
- Age 65+ (20), Age 60+ (10) for Medicare products
- Company provided (15)

### `submitContactLead`
Handles general contact form lead submissions.

**Parameters:**
- `name`: string (required)
- `email`: string (required)
- `phone`: string (optional)
- `message`: string (required)
- `source`: string

**Response:**
- `success`: boolean
- `leadId`: string
- `message`: string

### `updateLeadStatus`
Updates lead status for CRM integration.

**Parameters:**
- `leadId`: string (required)
- `status`: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
- `notes`: string (optional)

### `getLeadAnalytics`
Retrieves lead analytics for dashboard (authenticated users only).

**Response:**
- `totalLeads`: number
- `newLeads`: number
- `contactedLeads`: number
- `qualifiedLeads`: number
- `convertedLeads`: number
- `averageLeadScore`: number
- `leadsBySource`: object
- `leadsByClientType`: object

### `onNewLeadCreated` (Firestore Trigger)
Automatically triggered when a new lead is created. Logs lead information and can be extended for notifications.

## Security Features

- Server-side validation of all form data
- Automatic timestamping with server time
- IP address and user agent logging
- Input sanitization and validation
- Structured error handling
- Lead scoring algorithm
- Authentication required for analytics

## Database Collections

### `leads`
Stores all lead submissions with the following fields:
- All form data fields
- `leadStatus`: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
- `leadScore`: number (0-100)
- `submittedAt`: Server timestamp
- `ipAddress`: Client IP address
- `userAgent`: Client user agent
- `followUpRequired`: boolean
- `source`: 'hawkins-ig-website'

## Integration with Existing Functions

These lead functions are completely separate from your existing user/agent functions:

- **Existing functions**: Handle user accounts, agent management, quotes, calendar integration
- **New lead functions**: Handle website form submissions and lead management
- **Database separation**: Leads stored in `leads` collection, separate from `users` and `agents`
- **No conflicts**: All function names are unique and won't interfere with existing functions

## Firestore Security Rules

Make sure your `firestore.rules` file includes rules for the leads collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users (agents/admins) to read leads
    match /leads/{leadId} {
      allow read: if request.auth != null;
      allow write: if false; // Only functions can write
    }
  }
}
```

This ensures all lead submissions go through the secured Firebase Functions while allowing authenticated users to read lead data for CRM purposes.
