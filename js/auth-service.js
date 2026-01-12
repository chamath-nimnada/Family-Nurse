// Authentication Service
class AuthService {
    constructor() {
        this.currentUser = null;
        this.userRole = null;
    }

    // Initialize auth state listener
    initAuthListener() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                await this.loadUserRole();
                this.handleAuthChange(true);
            } else {
                this.currentUser = null;
                this.userRole = null;
                this.handleAuthChange(false);
            }
        });
    }

    // Load user role from Firestore
    async loadUserRole() {
        try {
            const doc = await db.collection('users').doc(this.currentUser.uid).get();
            if (doc.exists) {
                const userData = doc.data();
                this.userRole = userData.role;
                this.userActive = userData.isActive;

                // Check if account is active
                if (!this.userActive) {
                    await this.logout();
                    alert('Your account has been deactivated. Please contact support.');
                }
            }
        } catch (error) {
            console.error('Error loading user role:', error);
        }
    }

    // Register new user
    async register(email, password, fullName, role = 'customer') {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: email,
                fullName: fullName,
                role: role,
                isActive: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                phone: '',
                address: ''
            });

            // Log activity
            await this.logActivity('user_created', `User ${fullName} registered`, user.uid);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Login user
    async login(email, password) {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Verify account is active
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists && !doc.data().isActive) {
                await firebase.auth().signOut();
                throw new Error('Your account has been deactivated.');
            }

            // Log activity
            await this.logActivity('user_login', `User ${email} logged in`, user.uid);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Logout user
    async logout() {
        try {
            if (this.currentUser) {
                await this.logActivity('user_logout', `User logged out`, this.currentUser.uid);
            }
            await firebase.auth().signOut();
            this.currentUser = null;
            this.userRole = null;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get current user role
    getUserRole() {
        return this.userRole;
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Check if user has specific role
    hasRole(role) {
        return this.userRole === role;
    }

    // Log activity to Firestore
    async logActivity(action, description, userId) {
        try {
            await db.collection('activity_logs').add({
                action: action,
                description: description,
                userId: userId,
                email: this.currentUser?.email || 'anonymous',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }

    // Handle authentication state change
    handleAuthChange(isLoggedIn) {
        // Dispatch custom event for auth change
        window.dispatchEvent(new CustomEvent('authStateChanged', {
            detail: { isLoggedIn, user: this.currentUser, role: this.userRole }
        }));

        // Redirect based on role
        if (isLoggedIn && this.userRole) {
            const currentPage = window.location.pathname;

            if (this.userRole === 'admin' || this.userRole === 'super_admin') {
                if (!currentPage.includes('admin-dashboard')) {
                    window.location.href = 'pages/admin-dashboard.html';
                }
            } else if (this.userRole === 'nurse') {
                if (!currentPage.includes('nurse-dashboard')) {
                    window.location.href = 'pages/nurse-dashboard.html';
                }
            } else if (this.userRole === 'customer') {
                if (currentPage.includes('admin') || currentPage.includes('nurse')) {
                    window.location.href = 'index.html';
                }
            }
        }
    }
}

// Initialize auth service
const authService = new AuthService();
authService.initAuthListener();
