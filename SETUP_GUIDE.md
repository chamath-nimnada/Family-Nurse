# Firebase Setup Guide for My Family Nurse

## Step-by-Step Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `My-Family-Nurse` (or your preferred name)
4. Optionally enable Google Analytics
5. Click **"Create project"**
6. Wait for project creation to complete

### 2. Add Web App to Firebase Project

1. In the Firebase Console, click the **Web icon** (</> symbol)
2. Enter App nickname: `My-Family-Nurse-Web`
3. Check the option to set up Firebase Hosting (optional)
4. Click **"Register app"**
5. Copy the Firebase configuration

### 3. Get Firebase Configuration

Your configuration should look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "my-family-nurse-xxxxx.firebaseapp.com",
  projectId: "my-family-nurse-xxxxx",
  storageBucket: "my-family-nurse-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

### 4. Update Configuration in Project

1. Open `js/firebase-config.js` in your text editor
2. Replace the placeholder config with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
```

### 5. Enable Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get Started"**
3. Select **"Email/Password"** from Sign-in providers
4. Toggle to enable it
5. Click **"Save"**

### 6. Setup Firestore Database

1. In Firebase Console, go to **Firestore Database** (left sidebar)
2. Click **"Create Database"**
3. Choose location closest to your users
4. Start in **"Test mode"** for development
   - ⚠️ In production, use Security Rules (see FIRESTORE_RULES.txt)
5. Click **"Create"**

### 7. Apply Security Rules (Optional but Recommended)

1. In Firestore Database, click the **"Rules"** tab
2. Copy content from `FIRESTORE_RULES.txt`
3. Paste into the Rules editor
4. Click **"Publish"**

### 8. Create Database Indexes (Automatic)

Firestore will suggest creating indexes as needed. When you first use the app, follow the links to create suggested indexes.

### 9. Test the Setup

1. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```

2. Open `http://localhost:8000` in your browser

3. Try the booking form on the homepage

4. If successful, you'll see a success notification

### 10. Create Default Users

The system will automatically create default users on first load:

- **Super Admin**
  - Email: `admin@myFamNurse.com`
  - Password: `admin@123`

- **Demo Nurse**
  - Email: `nurse@myFamNurse.com`
  - Password: `nurse@123`

You can verify these in Firebase Console → Authentication → Users.

## Firestore Collections Overview

The following collections will be automatically created:

### users
Stores user accounts and roles

### bookings
Stores service booking requests

### patients
Stores patient information

### activity_logs
Stores system activity for audit trail

### visit_logs
Stores clinical notes from nurse visits

## Important Configuration Notes

### Development vs Production

**Development (Test Mode)**
- Anyone can read/write to database
- Good for testing and development
- NOT secure for production

**Production (With Security Rules)**
- Implement security rules from `FIRESTORE_RULES.txt`
- Restrict access based on roles
- Enable authentication requirement
- Add rate limiting for API calls

### API Key Management

- Your Firebase config is public (it's OK!)
- The actual security comes from Firestore Rules
- Never expose Firebase Admin SDK credentials
- Use environment variables in production

### Billing

- Firebase has a free tier (Spark Plan)
- Free tier includes:
  - 25,000 reads/day
  - 25,000 writes/day
  - 50,000 deletes/day
  - 1 GB storage
- Upgrade to Blaze Plan for more usage

## Troubleshooting

### "Firebase is not defined"
- Ensure all Firebase script tags are loaded in HTML
- Check browser console for script loading errors
- Verify CDN URLs are accessible

### "Permission denied" errors
- Check Firestore Rules (apply FIRESTORE_RULES.txt)
- Verify user is authenticated
- Check user role in database

### Bookings not saving
- Open browser Developer Tools (F12)
- Go to Console tab
- Look for error messages
- Check Firebase quota usage in Console

### Database not accessible
- Verify Firestore Database is created
- Check if it's in "Test Mode"
- Ensure authentication is enabled
- Verify Firebase config is correct

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Enable Authentication
3. ✅ Create Firestore Database
4. ✅ Apply Security Rules
5. 🔄 Customize the application:
   - Update service names/descriptions
   - Modify color scheme
   - Add your contact information
   - Upload logo and images
6. 🚀 Deploy to production:
   - Set up proper security rules
   - Enable HTTPS
   - Configure domain
   - Set up backups
7. 📱 (Optional) Develop mobile app
8. 🔔 (Optional) Add notifications

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

## Support

If you encounter issues:
1. Check the README.md file
2. Review browser console for errors
3. Verify Firebase configuration
4. Check Firestore security rules
5. Ensure all services are enabled
6. Test with demo credentials

---

**Setup completed successfully!** 🎉

Your My Family Nurse application is ready to use.
