# Lead Document Structure in hawknest-database

## ✅ Deployment Successful!

Your lead functions are now deployed and will create documents in the following structure:

---

## Database Location
```
hawknest-database (Firebase Project: medicareally)
└── leads/ (collection)
    └── [auto-generated-document-id] (document)
```

---

## Document Structure

### Insurance Lead (from Get Started Flow)
```json
{
  "lead-name": "John Smith",
  "date-time": "2025-08-20T18:45:30.123Z",
  "source": "https://hawkins-ig.com/get-started/individual",
  "submission": {
    // Core submission details
    "clientType": "individual",
    "age": "45",
    "familySize": null,
    "employeeCount": null,
    "agentType": null,
    "insuranceTypes": ["Medicare", "Dental"],
    "urgency": "within-30-days",
    "email": "john.smith@email.com",
    "phone": "555-123-4567",
    "company": null,
    "zipCode": "12345",
    
    // Lead management data
    "formSource": "get-started-flow",
    "leadScore": 65,
    "leadStatus": "new",
    "followUpRequired": true,
    "leadQuality": "medium",
    
    // Security and audit data
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "submittedVia": "hawkins-ig-website",
    
    // CRM integration fields
    "assignedAgent": null,
    "lastContactDate": null,
    "nextFollowUpDate": null,
    "notes": [],
    "conversionValue": null
  }
}
```

### Contact Lead (from Contact Form)
```json
{
  "lead-name": "Jane Doe",
  "date-time": "2025-08-20T18:45:30.123Z",
  "source": "https://hawkins-ig.com/contact",
  "submission": {
    // Core contact submission details
    "contactType": "general-inquiry",
    "email": "jane.doe@email.com",
    "phone": "555-987-6543",
    "message": "I need help choosing the right Medicare plan...",
    
    // Lead management data
    "leadScore": 25,
    "leadStatus": "new",
    "followUpRequired": true,
    "leadQuality": "low",
    
    // Security and audit data
    "ipAddress": "192.168.1.101",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
    "submittedVia": "hawkins-ig-website",
    "formSource": "contact-form",
    
    // CRM integration fields
    "assignedAgent": null,
    "lastContactDate": null,
    "nextFollowUpDate": null,
    "notes": [],
    "conversionValue": null
  }
}
```

---

## Available Functions

### ✅ Deployed Functions:
1. **`submitInsuranceLead`** - Captures insurance leads from get-started flow
2. **`submitContactLead`** - Captures contact form leads
3. **`updateLeadStatus`** - Updates lead status for CRM
4. **`getLeadAnalytics`** - Provides lead analytics (requires authentication)
5. **`onNewLeadCreated`** - Firestore trigger for new lead notifications

---

## Security Features Deployed

### ✅ Firestore Security Rules:
- **Leads collection**: Only Functions can write, only authenticated agents/admins can read
- **All form submissions**: Routed through secure Firebase Functions
- **No direct client access**: All sensitive data protected

### ✅ Function Security:
- **Rate limiting**: 10 requests/minute per IP
- **Input sanitization**: XSS and injection protection
- **Data validation**: Comprehensive validation with error handling
- **Suspicious activity detection**: Automatic blocking of potential spam
- **Audit logging**: IP addresses, user agents, timestamps tracked

---

## Testing Your Deployment

You can now test the lead capture by:

1. **Submitting the get-started form** on your website
2. **Submitting the contact form** on your website
3. **Checking the Firebase Console** at: https://console.firebase.google.com/project/medicareally/firestore

Your leads will appear in the `leads` collection with the exact structure shown above! 🎯

---

## Next Steps

1. **Test form submissions** on your website
2. **Monitor the Firebase Console** for incoming leads
3. **Set up CRM integration** using the `updateLeadStatus` function
4. **Create a dashboard** using the `getLeadAnalytics` function

Your secure lead management system is now live! 🚀
