# Quick Reference Guide - My Family Nurse

## 🚀 Quick Start (5 minutes)

### 1. Set Up Firebase (2 min)
```
1. Go to firebase.google.com/console
2. Create project "My-Family-Nurse"
3. Enable Email/Password auth
4. Create Firestore Database (test mode)
5. Copy credentials
```

### 2. Update Config (1 min)
```
Edit: js/firebase-config.js
Paste: Your Firebase config object
```

### 3. Run Locally (1 min)
```bash
python -m http.server 8000
# or
npx http-server
```

### 4. Access Application (1 min)
```
Home: http://localhost:8000
Login: Click "Login" button
Use: admin@myFamNurse.com / admin@123
```

---

## 📱 Page Reference

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/index.html` | Public portal |
| Login | `/pages/login.html` | User authentication |
| Admin Dashboard | `/pages/admin-dashboard.html` | System management |
| Nurse Dashboard | `/pages/nurse-dashboard.html` | Schedule management |
| Project Index | `/PROJECT_INDEX.html` | Navigation hub |

---

## 🔐 Default Credentials

```
Super Admin:
  Email: admin@myFamNurse.com
  Password: admin@123
  Access: Full system

Demo Nurse:
  Email: nurse@myFamNurse.com
  Password: nurse@123
  Access: Schedule only
```

⚠️ **Change these after first login!**

---

## 📁 File Quick Reference

### Core JavaScript Files
- **firebase-config.js** - Firebase setup (UPDATE THIS!)
- **auth-service.js** - Login/logout/user management
- **booking-service.js** - Booking CRUD operations
- **utils.js** - Helper functions & translations

### HTML Pages
- **index.html** - Home page (public)
- **pages/login.html** - Login page
- **pages/admin-dashboard.html** - Admin controls
- **pages/nurse-dashboard.html** - Nurse schedule

### Styling
- **css/styles.css** - All styles (TailwindCSS based)

### Documentation
- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Firebase setup guide
- **CONFIG.md** - Configuration options
- **FIRESTORE_RULES.txt** - Security rules

---

## 🔧 Common Tasks

### Change Admin Password
```
1. Log in as admin
2. Go to Settings
3. Enter new password
4. Click Save
```

### Add a New Service
```
Edit: index.html (lines ~200-250)
Add: New service card with details
```

### Change Company Colors
```
Edit: css/styles.css
Update: --primary, --success, --danger variables
```

### Update Contact Info
```
Edit: index.html footer section
Update: Phone, email, hours
```

### Add Nurse to System
```
As Admin:
1. Go to Nurses section
2. Click "Add Nurse"
3. Enter email
4. System sends invite
```

### Assign Booking to Nurse
```
As Admin:
1. Click on booking
2. Select nurse from dropdown
3. Click Save
4. Nurse sees in their schedule
```

### Mark Visit as Complete
```
As Nurse:
1. Click on booking
2. Click "Complete Visit"
3. Enter clinical notes
4. Click Save
```

---

## 🌐 Language Support

### Current Languages
- English (en)
- Sinhalese (si)

### Switch Language
- Click language selector (top right)
- Select new language
- Page reloads

### Add New Language
```
Edit: js/utils.js
Find: translations object
Add: new language block
```

---

## 📊 Database Collections

### users
```
uid: string
email: string
fullName: string
role: 'super_admin' | 'admin' | 'nurse' | 'customer'
isActive: boolean
phone: string
address: string
createdAt: timestamp
```

### bookings
```
id: string
patientId: string
customerName: string
phone: string
service: string
preferredDate: date
preferredTime: string
address: string
medicalNotes: string
status: 'new' | 'confirmed' | 'assigned' | 'completed' | 'cancelled'
assignedNurseId: string (optional)
createdAt: timestamp
completedAt: timestamp (optional)
```

### patients
```
id: string
name: string
phone: string (unique)
address: string
dob: string
medicalNotes: string
createdAt: timestamp
updatedAt: timestamp
```

### activity_logs
```
id: string
action: string
description: string
userId: string
email: string
timestamp: timestamp
```

### visit_logs
```
id: string
bookingId: string
nurseId: string
notes: string
createdAt: timestamp
```

---

## 🎯 User Workflows

### Admin Workflow
```
1. Login → Admin Dashboard
2. View → Statistics & Recent Activity
3. Click → Manage Bookings
4. Action → Assign nurse to booking
5. Click → Manage Nurses
6. Action → Activate/Deactivate
7. Check → Activity Log for audit trail
```

### Nurse Workflow
```
1. Login → Nurse Dashboard
2. View → My Schedule (assigned bookings)
3. Click → Booking Details
4. Action → Complete Visit
5. Enter → Clinical Notes
6. View → Completed Visits History
```

### Customer Workflow
```
1. Visit → Homepage
2. Scroll → Browse Services
3. Click → Book Now
4. Fill → Booking Form
5. Submit → Request
6. Wait → Admin Confirmation
```

---

## 🔒 Security Checklist

### Before Going Live
- [ ] Update Firebase config with your credentials
- [ ] Change default admin password
- [ ] Change default nurse password
- [ ] Apply Firestore security rules
- [ ] Enable HTTPS (use Firebase Hosting)
- [ ] Set up email notifications
- [ ] Configure backups
- [ ] Review privacy policy
- [ ] Set up monitoring
- [ ] Test all user roles

### Regular Maintenance
- [ ] Review activity logs weekly
- [ ] Update passwords monthly
- [ ] Check backup status
- [ ] Monitor error logs
- [ ] Review user access
- [ ] Update Firebase libraries
- [ ] Test disaster recovery

---

## 🐛 Debugging Tips

### Browser Console (F12)
- Look for JavaScript errors
- Check network tab for failed requests
- Monitor Firebase connections

### Common Errors & Solutions

**"Firebase is not defined"**
- Solution: Check firebase-config.js is loaded first

**"Permission denied" in Firestore**
- Solution: Update security rules or check user role

**Bookings not saving**
- Solution: Check Firestore database quota
- Check browser console for errors

**Login not working**
- Solution: Verify credentials in Firebase Console
- Clear browser cookies and try again

**Styles not loading**
- Solution: Check CSS file path in HTML
- Verify TailwindCSS CDN is accessible

---

## 📈 Performance Tips

1. **Optimize Images** - Compress images before uploading
2. **Limit Queries** - Use pagination for large lists
3. **Cache Data** - Use localStorage for frequently accessed data
4. **Minimize API Calls** - Batch operations when possible
5. **Monitor Usage** - Check Firebase Console for quota usage

---

## 🚀 Deployment

### Firebase Hosting (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Other Options
- Netlify (drag & drop deployment)
- Vercel (Git integration)
- GitHub Pages (static hosting)
- Traditional hosting (FTP upload)

---

## 📞 Help Resources

| Issue | Resource |
|-------|----------|
| Firebase Setup | SETUP_GUIDE.md |
| Configuration | CONFIG.md |
| Features | README.md |
| Security Rules | FIRESTORE_RULES.txt |
| Firebase Help | firebase.google.com/docs |
| Bug Report | Check browser console |

---

## 🔄 API Reference Quick Guide

### Authentication Service
```javascript
authService.login(email, password)
authService.logout()
authService.register(email, password, name, role)
authService.getCurrentUser()
authService.getUserRole()
authService.isAuthenticated()
```

### Booking Service
```javascript
bookingService.createBooking(data)
bookingService.getAllBookings()
bookingService.getNurseBookings(nurseId)
bookingService.updateBookingStatus(id, status)
bookingService.assignNurse(bookingId, nurseId)
bookingService.addVisitLog(bookingId, nurseId, notes)
```

### Utility Functions
```javascript
t(key)                          // Translate
showNotification(msg, type)     // Show message
showLoading(msg)                // Show loader
hideLoading()                   // Hide loader
formatDate(date)                // Format date
formatDateTime(date)            // Format date & time
isValidEmail(email)             // Validate email
isValidPhone(phone)             // Validate phone
```

---

## 📋 Service List

1. Blood Collection
2. IV Infusion
3. Vital Sign Monitoring
4. Nebulization
5. Wound Care
6. Foot Care
7. Tracheostomy Care
8. NG Tube Insertion
9. Stoma Care

---

## ✅ Quality Checklist

Before deploying:
- [ ] All pages load without errors
- [ ] Forms validate correctly
- [ ] All buttons work
- [ ] Links navigate properly
- [ ] Mobile layout is responsive
- [ ] Database operations work
- [ ] User roles restrict access
- [ ] No console errors
- [ ] Notifications appear
- [ ] Styles display correctly

---

## 🎓 Learning Path

1. **Understanding Project** - Read README.md
2. **Set Up Firebase** - Follow SETUP_GUIDE.md
3. **Customize** - Edit index.html and config
4. **Test** - Run locally and test all features
5. **Deploy** - Deploy to production
6. **Monitor** - Track usage and errors

---

## 📞 Support Contact

**For questions:**
- 📧 Email: info@myFamNurse.com
- 📞 Phone: +1 (555) 123-4567
- 🕐 Available: 24/7

---

**Version:** 1.0.0  
**Last Updated:** January 12, 2026

**Happy Building! ❤️**
