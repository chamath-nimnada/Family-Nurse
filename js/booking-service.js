// Booking Management Service
class BookingService {
    constructor() {
        this.bookingStates = ['new', 'confirmed', 'assigned', 'completed', 'cancelled'];
    }

    // Create a new booking
    async createBooking(bookingData) {
        try {
            // Check if patient exists, create if not
            let patientId = bookingData.patientId;
            if (!patientId) {
                const patientRef = await this.createOrUpdatePatient({
                    name: bookingData.customerName,
                    phone: bookingData.phone,
                    address: bookingData.address,
                    medicalNotes: bookingData.medicalNotes,
                    dob: bookingData.dob || ''
                });
                patientId = patientRef.id;
            }

            // Create booking document
            const bookingRef = await db.collection('bookings').add({
                patientId: patientId,
                customerName: bookingData.customerName,
                phone: bookingData.phone,
                address: bookingData.address,
                service: bookingData.service,
                preferredDate: new Date(bookingData.preferredDate),
                preferredTime: bookingData.preferredTime,
                medicalNotes: bookingData.medicalNotes,
                status: 'new',
                assignedNurseId: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                completedAt: null,
                cancelledAt: null,
                cancelReason: '',
                notes: ''
            });

            // Log activity
            await authService.logActivity(
                'booking_created',
                `New booking created for ${bookingData.customerName} - ${bookingData.service}`,
                authService.currentUser?.uid || 'anonymous'
            );

            return bookingRef;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    }

    // Get all bookings (admin only)
    async getAllBookings() {
        try {
            const snapshot = await db.collection('bookings')
                .orderBy('createdAt', 'desc')
                .get();

            const bookings = [];
            for (const doc of snapshot.docs) {
                const booking = doc.data();
                booking.id = doc.id;

                // Fetch patient name
                if (booking.patientId) {
                    const patientDoc = await db.collection('patients').doc(booking.patientId).get();
                    if (patientDoc.exists) {
                        booking.patientName = patientDoc.data().name;
                    }
                }

                bookings.push(booking);
            }

            return bookings;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    }

    // Get nurse's bookings
    async getNurseBookings(nurseId) {
        try {
            const snapshot = await db.collection('bookings')
                .where('assignedNurseId', '==', nurseId)
                .orderBy('preferredDate', 'asc')
                .get();

            const bookings = [];
            for (const doc of snapshot.docs) {
                const booking = doc.data();
                booking.id = doc.id;

                // Fetch patient details
                if (booking.patientId) {
                    const patientDoc = await db.collection('patients').doc(booking.patientId).get();
                    if (patientDoc.exists) {
                        booking.patient = { id: booking.patientId, ...patientDoc.data() };
                    }
                }

                bookings.push(booking);
            }

            return bookings;
        } catch (error) {
            console.error('Error fetching nurse bookings:', error);
            throw error;
        }
    }

    // Get booking by ID
    async getBooking(bookingId) {
        try {
            const doc = await db.collection('bookings').doc(bookingId).get();
            if (doc.exists) {
                const booking = doc.data();
                booking.id = bookingId;

                // Fetch patient details
                if (booking.patientId) {
                    const patientDoc = await db.collection('patients').doc(booking.patientId).get();
                    if (patientDoc.exists) {
                        booking.patient = { id: booking.patientId, ...patientDoc.data() };
                    }
                }

                // Fetch assigned nurse details
                if (booking.assignedNurseId) {
                    const nurseDoc = await db.collection('users').doc(booking.assignedNurseId).get();
                    if (nurseDoc.exists) {
                        booking.assignedNurse = { uid: booking.assignedNurseId, ...nurseDoc.data() };
                    }
                }

                return booking;
            }
            return null;
        } catch (error) {
            console.error('Error fetching booking:', error);
            throw error;
        }
    }

    // Assign nurse to booking
    async assignNurse(bookingId, nurseId) {
        try {
            const bookingRef = db.collection('bookings').doc(bookingId);
            await bookingRef.update({
                assignedNurseId: nurseId,
                status: 'assigned'
            });

            const bookingDoc = await bookingRef.get();
            const nurseDoc = await db.collection('users').doc(nurseId).get();

            await authService.logActivity(
                'booking_assigned',
                `Booking assigned to nurse ${nurseDoc.data().fullName}`,
                authService.currentUser.uid
            );
        } catch (error) {
            console.error('Error assigning nurse:', error);
            throw error;
        }
    }

    // Update booking status
    async updateBookingStatus(bookingId, newStatus) {
        try {
            const updateData = { status: newStatus };

            if (newStatus === 'completed') {
                updateData.completedAt = firebase.firestore.FieldValue.serverTimestamp();
            } else if (newStatus === 'cancelled') {
                updateData.cancelledAt = firebase.firestore.FieldValue.serverTimestamp();
            }

            await db.collection('bookings').doc(bookingId).update(updateData);

            await authService.logActivity(
                'booking_status_updated',
                `Booking status updated to ${newStatus}`,
                authService.currentUser.uid
            );
        } catch (error) {
            console.error('Error updating booking status:', error);
            throw error;
        }
    }

    // Create or update patient
    async createOrUpdatePatient(patientData) {
        try {
            // Check if patient exists by phone number
            const querySnapshot = await db.collection('patients')
                .where('phone', '==', patientData.phone)
                .get();

            if (!querySnapshot.empty) {
                // Update existing patient
                const existingDoc = querySnapshot.docs[0];
                await existingDoc.ref.update({
                    ...patientData,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                return existingDoc.ref;
            } else {
                // Create new patient
                const patientRef = await db.collection('patients').add({
                    ...patientData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                return patientRef;
            }
        } catch (error) {
            console.error('Error creating/updating patient:', error);
            throw error;
        }
    }

    // Get all patients
    async getAllPatients() {
        try {
            const snapshot = await db.collection('patients')
                .orderBy('createdAt', 'desc')
                .get();

            const patients = [];
            snapshot.forEach(doc => {
                patients.push({ id: doc.id, ...doc.data() });
            });

            return patients;
        } catch (error) {
            console.error('Error fetching patients:', error);
            throw error;
        }
    }

    // Add visit log/notes
    async addVisitLog(bookingId, nurseId, notes) {
        try {
            const visitLogRef = await db.collection('visit_logs').add({
                bookingId: bookingId,
                nurseId: nurseId,
                notes: notes,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            await authService.logActivity(
                'visit_log_created',
                `Visit log added for booking ${bookingId}`,
                nurseId
            );

            return visitLogRef;
        } catch (error) {
            console.error('Error adding visit log:', error);
            throw error;
        }
    }

    // Get visit logs for booking
    async getVisitLogs(bookingId) {
        try {
            const snapshot = await db.collection('visit_logs')
                .where('bookingId', '==', bookingId)
                .orderBy('createdAt', 'desc')
                .get();

            const logs = [];
            for (const doc of snapshot.docs) {
                const log = doc.data();
                log.id = doc.id;

                // Fetch nurse details
                if (log.nurseId) {
                    const nurseDoc = await db.collection('users').doc(log.nurseId).get();
                    if (nurseDoc.exists) {
                        log.nurse = { uid: log.nurseId, ...nurseDoc.data() };
                    }
                }

                logs.push(log);
            }

            return logs;
        } catch (error) {
            console.error('Error fetching visit logs:', error);
            throw error;
        }
    }

    // Get statistics
    async getStatistics() {
        try {
            // Total bookings
            const allBookingsSnapshot = await db.collection('bookings').get();
            const totalBookings = allBookingsSnapshot.size;

            // Pending bookings
            const pendingSnapshot = await db.collection('bookings')
                .where('status', 'in', ['new', 'confirmed'])
                .get();
            const pendingBookings = pendingSnapshot.size;

            // Completed bookings
            const completedSnapshot = await db.collection('bookings')
                .where('status', '==', 'completed')
                .get();
            const completedBookings = completedSnapshot.size;

            // Active nurses
            const nursesSnapshot = await db.collection('users')
                .where('role', '==', 'nurse')
                .where('isActive', '==', true)
                .get();
            const activeNurses = nursesSnapshot.size;

            // Today's bookings
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const todaySnapshot = await db.collection('bookings')
                .where('preferredDate', '>=', today)
                .where('preferredDate', '<', tomorrow)
                .get();
            const todayBookings = todaySnapshot.size;

            return {
                totalBookings,
                pendingBookings,
                completedBookings,
                activeNurses,
                todayBookings
            };
        } catch (error) {
            console.error('Error fetching statistics:', error);
            throw error;
        }
    }
}

// Initialize booking service
const bookingService = new BookingService();
