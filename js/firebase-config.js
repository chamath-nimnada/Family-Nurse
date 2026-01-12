// Firebase Configuration
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
    //Test
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence().catch((err) => {
    if (err.code == 'failed-precondition') {
        console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code == 'unimplemented') {
        console.log('The current browser does not support all of the features required to enable persistence');
    }
});

// Export for use in other modules
window.firebaseApp = { auth, db };
