// Utility Functions

// Translations object for bilingual support
const translations = {
    en: {
        home: 'Home',
        services: 'Services',
        booking: 'Book Now',
        aboutUs: 'About Us',
        contact: 'Contact',
        faq: 'FAQ',
        login: 'Login',
        logout: 'Logout',
        dashboard: 'Dashboard',
        profile: 'Profile',
        language: 'Language',

        // Service names
        ivInfusion: 'IV Infusion',
        tracheostomyCare: 'Tracheostomy Care',
        bloodCollection: 'Blood Collection',
        ngTubeInsertion: 'NG Tube Insertion',
        vitalSignMonitoring: 'Vital Sign Monitoring',
        nebulization: 'Nebulization',
        woundCare: 'Wound Care',
        footCare: 'Foot Care',
        stomaCare: 'Stoma Care',

        // Booking form
        bookingForm: 'Booking Form',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        selectService: 'Select Service',
        preferredDate: 'Preferred Date',
        preferredTime: 'Preferred Time',
        address: 'Address',
        medicalNotes: 'Medical Notes',
        submit: 'Submit Booking',
        cancel: 'Cancel',

        // Login
        email: 'Email',
        password: 'Password',
        signIn: 'Sign In',
        rememberMe: 'Remember Me',
        forgotPassword: 'Forgot Password?',

        // Dashboard
        welcomeBack: 'Welcome Back',
        totalBookings: 'Total Bookings',
        pendingRequests: 'Pending Requests',
        completedVisits: 'Completed Visits',
        activeNurses: 'Active Nurses',
        todayScheduled: "Today's Scheduled Visits",

        // Activity log
        activityLog: 'Activity Log',
        recentActivities: 'Recent Activities',

        // Statuses
        new: 'New',
        confirmed: 'Confirmed',
        assigned: 'Assigned',
        completed: 'Completed',
        cancelled: 'Cancelled',

        // Messages
        success: 'Success',
        error: 'Error',
        loading: 'Loading...',
        pleaseWait: 'Please wait...',
        deleteConfirm: 'Are you sure you want to delete this?'
    },
    si: {
        home: 'ගෙ',
        services: 'සේවා',
        booking: 'දැන් පreserveය',
        aboutUs: 'ගැන්',
        contact: 'සම්බන්ධ කරන්න',
        faq: 'නිතර අසන ප්‍රශ්න',
        login: 'ඇතුල් වන්න',
        logout: 'ඉවත් වන්න',
        dashboard: 'තීරු පුවරුව',
        profile: 'පැතිකඩ',
        language: 'භාෂාව',

        // Service names
        ivInfusion: 'IV ઇનફ્યુזન',
        tracheostomyCare: 'ට්‍රැකිওස්ටોමි රැකවරණ',
        bloodCollection: 'රුධිර එකතුවීම',
        ngTubeInsertion: 'NG Tube ඇතුල් කිරීම',
        vitalSignMonitoring: 'महत्वपूर्ण संकेत निगरानी',
        nebulization: 'ඉනිබුලේසන්',
        woundCare: 'ඔරු රැකවරණ',
        footCare: 'පාද රැකවරණ',
        stomaCare: 'ස්ටોමා රැකවරණ',

        // Booking form
        bookingForm: 'Booking පෝරමය',
        fullName: 'සම්පූර්ණ නම',
        phoneNumber: 'දුරකතන අංකය',
        selectService: 'සේවාව තෝරන්න',
        preferredDate: 'කැමති දිනය',
        preferredTime: 'කැමති වේලාව',
        address: 'ලිපිනය',
        medicalNotes: 'වෛද්‍ය සටහන්',
        submit: 'බුකින් යොමු කරන්න',
        cancel: 'අවලංගු කරන්න',

        // Login
        email: 'ඊ-තැපෙල්',
        password: 'මුරපදය',
        signIn: 'ඇතුල් වන්න',
        rememberMe: 'මට මතක තබාගන්න',
        forgotPassword: 'මුරපදය අමතකයි?',

        // Dashboard
        welcomeBack: 'ආපසු සාදරයෙන් පිළිගනිමු',
        totalBookings: 'සම්පූර්ණ Booking',
        pendingRequests: 'ඉපදිය යෙදුම්',
        completedVisits: 'සම්පූර්ණ කරන ලද ගිණුම්',
        activeNurses: 'සක්‍රිය ගෝවිය',
        todayScheduled: 'අද කාලසටහන්',

        // Activity log
        activityLog: 'ක්‍රියා ලඩ්',
        recentActivities: 'මෑතකාලීන ක්‍රියාකාරකම්',

        // Statuses
        new: 'නව',
        confirmed: 'තහවුරු',
        assigned: 'පවරා ඇත',
        completed: 'සම්පූර්ණ',
        cancelled: 'අවලංගු',

        // Messages
        success: 'සාර්ථක',
        error: 'දෝෂ',
        loading: 'පැතිවයි...',
        pleaseWait: 'කරුණාකර බලා තබන්න...',
        deleteConfirm: 'ඔබ මෙය මැකීමට විශ්වාස කරන්නේ?'
    }
};

// Get current language from localStorage
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    window.location.reload();
}

// Translate text
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || key;
}

// Format date
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Format datetime
function formatDateTime(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Format time
function formatTime(time) {
    if (!time) return '';
    return time;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
                'bg-blue-500'
        }`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show loading spinner
function showLoading(message = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class="bg-white p-8 rounded-lg text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-gray-700">${message}</p>
        </div>
    `;
    document.body.appendChild(loader);
}

// Hide loading spinner
function hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Check if user is authorized
function checkAuthorization(requiredRoles = []) {
    if (!authService.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(authService.getUserRole())) {
        alert('You do not have permission to access this page.');
        window.location.href = 'index.html';
        return false;
    }

    return true;
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Initialize the system on first load
async function initializeSystem() {
    try {
        // Check if any users exist
        const usersSnapshot = await db.collection('users').limit(1).get();

        if (usersSnapshot.empty) {
            // Create default Super Admin
            try {
                await firebase.auth().createUserWithEmailAndPassword('admin@myFamNurse.com', 'admin@123');
                const adminUser = firebase.auth().currentUser;

                await db.collection('users').doc(adminUser.uid).set({
                    uid: adminUser.uid,
                    email: 'admin@myFamNurse.com',
                    fullName: 'Super Admin',
                    role: 'super_admin',
                    isActive: true,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    phone: '',
                    address: ''
                });

                // Create demo nurse
                await firebase.auth().createUserWithEmailAndPassword('nurse@myFamNurse.com', 'nurse@123');
                const nurseUser = firebase.auth().currentUser;

                await db.collection('users').doc(nurseUser.uid).set({
                    uid: nurseUser.uid,
                    email: 'nurse@myFamNurse.com',
                    fullName: 'Demo Nurse',
                    role: 'nurse',
                    isActive: true,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    phone: '',
                    address: ''
                });

                await firebase.auth().signOut();
                console.log('Default users created successfully');
            } catch (error) {
                console.error('Error creating default users:', error);
            }
        }
    } catch (error) {
        console.error('Error initializing system:', error);
    }
}

// Call initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeSystem();
});
