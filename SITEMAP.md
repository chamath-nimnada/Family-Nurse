# My Family Nurse - Site Map & Architecture

## 🗺️ Application Site Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    MY FAMILY NURSE APPLICATION                  │
│                    (Home: index.html)                            │
└─────────────────────────────────────────────────────────────────┘
         │                          │                      │
         │                          │                      │
    ┌────▼─────┐          ┌─────────▼──────┐      ┌──────▼───┐
    │ Services │          │ How It Works    │      │   FAQs   │
    │ Catalog  │          │ (Contact →      │      │ (6 Q&A)  │
    │ (9 items)│          │  Confirm →      │      │          │
    └────┬─────┘          │  Visit)        │      └──────┬───┘
         │                └─────────┬──────┘             │
         │                          │                    │
         └──────────┬───────────────┴────────────────────┘
                    │
              ┌─────▼──────┐
              │ BOOKING    │
              │ FORM       │
              │ - Name     │
              │ - Phone    │
              │ - Service  │
              │ - Date     │
              │ - Time     │
              │ - Address  │
              │ - Notes    │
              └─────┬──────┘
                    │
          ┌─────────▼──────────┐
          │   AUTHENTICATION   │
          │   (Firebase Auth)  │
          └─────────┬──────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   ┌────▼──────┐         ┌──────▼────┐
   │  LOGIN    │         │ DASHBOARD │
   │  PAGE     │         │ SELECTION │
   │           │         └──────┬────┘
   └───────────┘                │
        ▲              ┌────────┴────────┐
        │              │                 │
        │         ┌────▼────┐       ┌───▼───┐
        │         │  ADMIN  │       │ NURSE │
        │         │DASHBOARD│       │DASH   │
        │         └─────────┘       └───────┘
        │
        └────── (Login Page)
```

## 📄 Page Structure Details

### 1. PUBLIC HOME PAGE (index.html)
```
┌─ Navigation Bar
│  ├─ Logo & Title
│  ├─ Menu Links (Home, Services, How It Works, FAQ)
│  ├─ Language Selector (English/Sinhalese)
│  └─ Login Button
│
├─ Hero Section
│  ├─ Main Heading
│  ├─ Subheading
│  └─ Call-to-Action Button
│
├─ Services Section
│  ├─ Grid of 9 Service Cards
│  │  ├─ Service Icon
│  │  ├─ Service Name
│  │  └─ Description
│  └─ "Learn More" Option
│
├─ How It Works Section
│  ├─ Step 1: Contact
│  ├─ Step 2: Confirm
│  ├─ Step 3: Visit
│  └─ Step 4: Follow Up
│
├─ Booking Section
│  ├─ Booking Form
│  │  ├─ Customer Name
│  │  ├─ Phone Number
│  │  ├─ Select Service
│  │  ├─ Preferred Date
│  │  ├─ Preferred Time
│  │  ├─ Address
│  │  └─ Medical Notes
│  └─ Submit Button
│
├─ FAQ Section
│  ├─ 6 Common Questions
│  │  ├─ Are nurses qualified?
│  │  ├─ Service coverage area?
│  │  ├─ Emergency services?
│  │  ├─ Patient privacy?
│  │  ├─ Visit duration?
│  │  └─ Cancellation policy?
│  └─ Expandable Answers
│
└─ Footer
   ├─ About Us
   ├─ Services Links
   ├─ Quick Links
   ├─ Contact Info
   └─ Copyright
```

### 2. LOGIN PAGE (pages/login.html)
```
┌─ Login Container
│  ├─ Logo
│  ├─ Application Title
│  ├─ Login Form
│  │  ├─ Email Input
│  │  ├─ Password Input
│  │  ├─ Remember Me Checkbox
│  │  ├─ Forgot Password Link
│  │  └─ Sign In Button
│  ├─ Demo Credentials Display
│  │  ├─ Admin Credentials
│  │  └─ Nurse Credentials
│  └─ Back to Home Link
└─ Error/Success Messages
```

### 3. ADMIN DASHBOARD (pages/admin-dashboard.html)
```
┌─ Sidebar Navigation
│  ├─ Logo
│  ├─ Dashboard (active)
│  ├─ Bookings
│  ├─ Nurses
│  ├─ Patients
│  ├─ Activity Log
│  ├─ Settings
│  └─ User Info + Logout
│
├─ Top Navigation
│  ├─ Page Title
│  ├─ Search Bar
│  └─ Notification Bell
│
└─ Main Content Area
   ├─ Dashboard Section (visible by default)
   │  ├─ Statistics Cards (5)
   │  │  ├─ Total Bookings
   │  │  ├─ Pending Requests
   │  │  ├─ Completed Visits
   │  │  ├─ Active Nurses
   │  │  └─ Today's Visits
   │  ├─ Recent Bookings Widget
   │  └─ Activity Feed Widget
   │
   ├─ Bookings Section
   │  ├─ Search/Filter
   │  └─ Bookings Table
   │     ├─ ID | Customer | Service | Date | Status | Nurse | Actions
   │     └─ View/Edit Modal
   │
   ├─ Nurses Section
   │  ├─ Add Nurse Button
   │  └─ Nurse Cards Grid
   │     ├─ Avatar
   │     ├─ Name & Email
   │     ├─ Phone
   │     ├─ Status Indicator
   │     └─ Activate/Deactivate Button
   │
   ├─ Patients Section
   │  ├─ Search Bar
   │  └─ Patients Table
   │     ├─ Name | Phone | Address | Registered | Actions
   │     └─ View Patient Modal
   │
   ├─ Activity Log Section
   │  └─ Activity Table
   │     ├─ Timestamp | User | Action | Description
   │     └─ Pagination
   │
   └─ Settings Section
      └─ Account Settings Form
         ├─ Full Name
         ├─ Email (read-only)
         ├─ Phone
         └─ Save Button
```

### 4. NURSE DASHBOARD (pages/nurse-dashboard.html)
```
┌─ Sidebar Navigation
│  ├─ Logo
│  ├─ My Schedule (active)
│  ├─ Completed Visits
│  ├─ Profile
│  └─ User Info + Logout
│
├─ Top Navigation
│  ├─ Page Title
│  └─ Welcome Greeting
│
└─ Main Content Area
   ├─ Schedule Section (visible by default)
   │  ├─ Filter Dropdown
   │  └─ Bookings Grid
   │     └─ Booking Cards
   │        ├─ Patient Name & Status Badge
   │        ├─ Service
   │        ├─ Date & Time
   │        ├─ Address
   │        ├─ Medical Notes
   │        └─ Action Buttons
   │           ├─ View Details
   │           └─ Complete Visit
   │
   ├─ Completed Visits Section
   │  └─ Completed Visits Grid
   │     └─ Visit Cards
   │        ├─ Patient Name
   │        ├─ Service
   │        ├─ Completion Date
   │        └─ View Notes Button
   │
   └─ Profile Section
      ├─ Personal Information Card
      │  ├─ Full Name Input
      │  ├─ Email Input
      │  ├─ Phone Input
      │  └─ Save Button
      │
      └─ Work Statistics Card
         ├─ Total Visits Completed
         ├─ Assigned Bookings
         └─ This Month
```

## 🔄 Data Flow Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                       USER INTERFACE                            │
│  (HTML Pages + DOM manipulation via JavaScript)                 │
└──────────────────────────┬───────────────────────────────────┘
                           │
                ┌──────────▼──────────┐
                │   SERVICE LAYER     │
                │  (JavaScript)       │
                ├─────────────────────┤
                │ auth-service.js     │
                │ booking-service.js  │
                │ utils.js            │
                └──────────────┬──────┘
                               │
                ┌──────────────▼──────────────┐
                │   FIREBASE SDK              │
                │ (Firebase Libraries)        │
                ├─────────────────────────────┤
                │ firebase-auth.js            │
                │ firebase-firestore.js       │
                │ firebase-app.js             │
                └──────────────┬──────────────┘
                               │
        ┌──────────────────────▼──────────────────────┐
        │         FIREBASE BACKEND                    │
        ├───────────────────────────────────────────┤
        │                                           │
        │  ┌─ Firebase Authentication                │
        │  │  └─ Email/Password Auth                 │
        │  │                                         │
        │  ├─ Firestore Database                     │
        │  │  ├─ users (collection)                  │
        │  │  ├─ bookings (collection)               │
        │  │  ├─ patients (collection)               │
        │  │  ├─ activity_logs (collection)          │
        │  │  └─ visit_logs (collection)             │
        │  │                                         │
        │  └─ Firebase Hosting (deployment)          │
        │                                           │
        └─────────────────────────────────────────┘
```

## 📊 Database Relationships

```
users (1)
  ├─ has many bookings (assignedNurseId)
  └─ has many activity_logs (userId)
       │
       ├─ Super Admin
       │  └─ Full Access
       ├─ Admin
       │  └─ Booking Management
       ├─ Nurse
       │  └─ Schedule Management
       └─ Customer
          └─ Booking Only

bookings (1)
  ├─ references patients (patientId)
  ├─ assigned to users/nurses (assignedNurseId)
  ├─ has many visit_logs (bookingId)
  └─ creates activity_logs

patients (1)
  ├─ has many bookings
  └─ has many visit_logs (through bookings)

visit_logs (many)
  ├─ belongs to bookings
  ├─ created by nurses
  └─ contains clinical notes

activity_logs (many)
  ├─ created by any user action
  ├─ belongs to users
  └─ tracks system audit trail
```

## 🔐 Access Control Matrix

```
                    Public  Admin  Nurse  Customer
├─ Home Page          ✓      ✓      ✓      ✓
├─ Login Page         ✓      ✓      ✓      ✓
├─ Booking Form       ✓      ✓      ✓      ✓
├─ Admin Dashboard    ✗      ✓      ✗      ✗
├─ Nurse Dashboard    ✗      ✗      ✓      ✗
├─ View All Bookings  ✗      ✓      ✗      ✗
├─ View Own Bookings  ✗      ✗      ✓      ✗
├─ Assign Nurses      ✗      ✓      ✗      ✗
├─ Mark Complete      ✗      ✗      ✓      ✗
├─ Manage Staff       ✗      ✓      ✗      ✗
├─ View Audit Log     ✗      ✓      ✗      ✗
└─ System Settings    ✗      ✓      ✗      ✗
```

## 🔄 User Journey Maps

### Customer Journey
```
1. Land on Home Page
   └─ Browse Services
      └─ Read FAQ
         └─ Fill Booking Form
            └─ Submit Booking
               └─ Confirmation Message
                  └─ Wait for Admin Contact
```

### Admin Journey
```
1. Login
   └─ View Dashboard Stats
      ├─ Check Pending Bookings
      │  └─ Assign Nurse
      │
      ├─ Manage Nurses
      │  └─ Activate/Deactivate
      │
      ├─ View Patients
      │  └─ Check History
      │
      ├─ Review Activity Log
      │  └─ Audit Trail
      │
      └─ Update Settings
         └─ Save Changes
```

### Nurse Journey
```
1. Login
   └─ View My Schedule
      └─ Click Booking
         ├─ Review Details
         │
         └─ After Visit:
            └─ Click "Complete Visit"
               └─ Add Clinical Notes
                  └─ Submit
                     └─ View in Completed Visits
```

## 📡 API/Function Calls Flow

```
User Action
    │
    ▼
Event Handler (onClick, onSubmit)
    │
    ▼
Validation Check (isValidEmail, isValidPhone)
    │
    ▼
Authorization Check (checkAuthorization)
    │
    ▼
Service Layer Call
│
├─ authService.login()
├─ authService.logout()
├─ authService.register()
│
├─ bookingService.createBooking()
├─ bookingService.getAllBookings()
├─ bookingService.updateBookingStatus()
├─ bookingService.assignNurse()
├─ bookingService.addVisitLog()
│
└─ Firebase Operations
    │
    ├─ auth.signIn()
    ├─ auth.createUser()
    ├─ db.collection().add()
    ├─ db.collection().update()
    ├─ db.collection().where().get()
    │
    ▼
Firestore Database
    │
    ▼
Return Data to UI
    │
    ▼
Update DOM / Show Notification
```

## 🎯 Component Hierarchy

```
Application Root
│
├─ Navigation Component
│  ├─ Logo
│  ├─ Menu Links
│  ├─ Language Selector
│  └─ Login/User Menu
│
├─ Hero Component (Home)
│  └─ Call-to-Action
│
├─ Services Component
│  └─ Service Cards (x9)
│
├─ Forms Component
│  ├─ Login Form
│  └─ Booking Form
│
├─ Dashboard Component
│  ├─ Sidebar Navigation
│  ├─ Top Navigation
│  └─ Content Area
│     ├─ Statistics Cards
│     ├─ Tables
│     ├─ Grids
│     └─ Modals
│
├─ Modal Components
│  ├─ Booking Details Modal
│  └─ Visit Notes Modal
│
└─ Footer Component
   ├─ Links
   ├─ Social
   └─ Copyright
```

---

## 📈 Scalability Considerations

```
Current Setup
└─ Single Firebase Project
   ├─ Firestore Database
   ├─ Firebase Authentication
   ├─ Firebase Hosting
   └─ Cloud Functions (future)

Scaling Path
├─ Add Cloud Functions for notifications
├─ Implement Cloud Storage for documents
├─ Add Firebase Real-time Database for live updates
├─ Implement Google Cloud Tasks for job queuing
└─ Add Pub/Sub for event streaming
```

---

This site map provides a complete overview of the application's structure, page layouts, data flow, and access control.

**Version:** 1.0.0  
**Created:** January 2026
