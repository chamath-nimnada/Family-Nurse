# My Family Nurse - Configuration Template

## Firebase Configuration

This file serves as a template for environment-specific configurations.

### Development Environment

```javascript
// js/firebase-config.js

const firebaseConfig = {
    apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "my-family-nurse-dev.firebaseapp.com",
    projectId: "my-family-nurse-dev",
    storageBucket: "my-family-nurse-dev.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

firebase.initializeApp(firebaseConfig);
```

### Production Environment

```javascript
// js/firebase-config.js (Production)

const firebaseConfig = {
    apiKey: "AIzaSyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    authDomain: "my-family-nurse-prod.firebaseapp.com",
    projectId: "my-family-nurse-prod",
    storageBucket: "my-family-nurse-prod.appspot.com",
    messagingSenderId: "987654321098",
    appId: "1:987654321098:web:1234567890abcdef"
};

firebase.initializeApp(firebaseConfig);
```

## Application Configuration

### System Settings

```javascript
// Recommended system configuration values

// Session timeout (milliseconds)
const SESSION_TIMEOUT = 12 * 60 * 60 * 1000; // 12 hours

// Maximum concurrent sessions
const MAX_CONCURRENT_SESSIONS = 1;

// Minimum password length
const MIN_PASSWORD_LENGTH = 8;

// API rate limits
const API_RATE_LIMITS = {
    bookings_per_day: 1000,
    users_per_minute: 60,
    queries_per_second: 10
};

// Default timezone
const DEFAULT_TIMEZONE = 'UTC';

// Service availability hours
const SERVICE_HOURS = {
    start: '06:00',
    end: '22:00'
};
```

### Service Configuration

```javascript
// Service types and categories
const SERVICES = [
    {
        id: 'blood_collection',
        name: 'Blood Collection',
        icon: '🩸',
        description: 'Professional blood sample collection',
        price: 500,
        duration: 30
    },
    {
        id: 'iv_infusion',
        name: 'IV Infusion',
        icon: '🏥',
        description: 'Safe IV medication administration',
        price: 1200,
        duration: 45
    },
    // ... more services
];
```

### Notification Settings

```javascript
// Email notification configuration
const NOTIFICATION_CONFIG = {
    booking_confirmation: true,
    visit_reminder: true,
    completion_notification: true,
    support_contact: 'info@myFamNurse.com',
    support_phone: '+1 (555) 123-4567'
};

// SMS notification configuration
const SMS_CONFIG = {
    enabled: false,
    provider: 'twilio', // or other provider
    account_sid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    auth_token: 'your_auth_token_here'
};
```

### Database Configuration

```javascript
// Firestore database settings
const FIRESTORE_CONFIG = {
    // Collection names
    collections: {
        users: 'users',
        bookings: 'bookings',
        patients: 'patients',
        activity_logs: 'activity_logs',
        visit_logs: 'visit_logs'
    },
    
    // Query limits
    limits: {
        bookings_per_page: 10,
        activity_logs_per_load: 20,
        max_results: 100
    },
    
    // Retention policies
    retention: {
        activity_logs_days: 365,
        soft_delete_days: 30,
        archive_months: 12
    }
};
```

### Security Configuration

```javascript
// Security settings
const SECURITY_CONFIG = {
    // Password policy
    password_policy: {
        min_length: 8,
        require_uppercase: true,
        require_lowercase: true,
        require_numbers: true,
        require_special: true
    },
    
    // Session security
    session: {
        timeout_minutes: 30,
        max_inactive_minutes: 15,
        secure_cookies: true,
        httpOnly: true,
        sameSite: 'Strict'
    },
    
    // Two-factor authentication
    mfa: {
        enabled: false,
        require_for_admins: false,
        provider: 'firebase' // or 'totp', 'sms'
    },
    
    // Rate limiting
    rate_limits: {
        login_attempts: 5,
        login_window_minutes: 15,
        api_calls_per_minute: 60
    }
};
```

### Logging Configuration

```javascript
// Logging settings
const LOGGING_CONFIG = {
    level: 'INFO', // DEBUG, INFO, WARN, ERROR
    
    // Log destinations
    destinations: [
        'console',      // Browser console
        'firestore',    // Firestore database
        'external'      // External service (optional)
    ],
    
    // What to log
    log_user_actions: true,
    log_api_calls: true,
    log_errors: true,
    log_security_events: true,
    
    // External logging service
    external_logging: {
        enabled: false,
        provider: 'sentry', // or 'loggly', 'papertrail'
        dsn: 'https://your-dsn-here'
    }
};
```

### Deployment Configuration

```javascript
// Environment-specific settings
const ENVIRONMENT = {
    development: {
        api_endpoint: 'http://localhost:8000',
        debug: true,
        log_level: 'DEBUG',
        firestore_emulator: true,
        auth_emulator: false
    },
    
    staging: {
        api_endpoint: 'https://staging.myFamNurse.com',
        debug: false,
        log_level: 'INFO',
        firestore_emulator: false,
        auth_emulator: false
    },
    
    production: {
        api_endpoint: 'https://myFamNurse.com',
        debug: false,
        log_level: 'WARN',
        firestore_emulator: false,
        auth_emulator: false,
        security_headers: true,
        https_only: true
    }
};
```

### Feature Flags

```javascript
// Feature flags for A/B testing and gradual rollouts
const FEATURE_FLAGS = {
    new_booking_flow: false,
    sms_notifications: false,
    video_consultation: false,
    payment_integration: false,
    advanced_analytics: false,
    nurse_tracking: false,
    insurance_integration: false
};
```

## Environment Variables

Create a `.env` file (git-ignored) for sensitive data:

```
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...

# API Keys
REACT_APP_STRIPE_PUBLIC_KEY=pk_...
REACT_APP_TWILIO_ACCOUNT_SID=AC...
REACT_APP_TWILIO_AUTH_TOKEN=...

# Environment
NODE_ENV=development
REACT_APP_ENVIRONMENT=development
```

## Configuration Management Best Practices

1. **Never commit sensitive data** - Use .env files
2. **Use different configs per environment** - Dev, Staging, Production
3. **Rotate API keys regularly** - Especially in production
4. **Monitor API usage** - Set up billing alerts
5. **Document all configuration** - Keep this file updated
6. **Test configuration changes** - In staging before production
7. **Use secrets management** - For production deployments
8. **Audit access to configuration** - Track who changes what
9. **Version control** - Keep history of configuration changes
10. **Backup configurations** - Safely store backups

## Troubleshooting Configuration Issues

### Issue: "Firebase is not initialized"
- Verify firebase-config.js is loaded first
- Check browser console for loading errors
- Ensure all Firebase libraries are loaded

### Issue: "Missing Firebase credentials"
- Check SETUP_GUIDE.md for configuration instructions
- Verify all required fields in firebaseConfig
- Ensure config matches Firebase Console

### Issue: "Firestore connection fails"
- Check internet connection
- Verify Firestore database is created
- Check browser console for CORS errors
- Ensure security rules allow access

### Issue: "Authentication not working"
- Verify auth domain in config
- Check that Email/Password auth is enabled
- Clear browser cookies and localStorage
- Check user exists in Firebase Console

---

**Last Updated:** January 2026
**Version:** 1.0.0
