import { addDoc, collection } from 'firebase/firestore';
import {
    AlertCircle,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
    ClipboardCheck,
    Clock,
    MapPin,
    Stethoscope,
    User
} from 'lucide-react';
import { useState } from 'react';
import { db } from '../firebase/config';

const BookingWizard = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        service: '',
        date: '',
        time: '',
        patientName: '',
        patientAge: '',
        patientPhone: '',
        patientEmail: '',
        address: '',
        city: '',
        zip: '',
        notes: ''
    });

    // Common input style for distinct look
    const inputClasses = "w-full p-4 bg-white border-2 border-slate-300 rounded-2xl shadow-sm outline-none focus:border-primary focus:ring-4 focus:ring-teal-50 transition-all font-medium text-slate-700 placeholder:text-slate-400";

    const steps = [
        { id: 1, name: 'Service', icon: <Stethoscope size={20} /> },
        { id: 2, name: 'Schedule', icon: <Calendar size={20} /> },
        { id: 3, name: 'Patient Info', icon: <User size={20} /> },
        { id: 4, name: 'Location', icon: <MapPin size={20} /> },
        { id: 5, name: 'Review', icon: <ClipboardCheck size={20} /> },
    ];

    const services = [
        'Post-Surgery Care', 'Elderly Care', 'Medication Management',
        'IV Therapy', 'Newborn & Maternal Care', 'Chronic Disease Care',
        'Wound Management', 'Physical Therapy Assistance'
    ];

    const timeSlots = [
        '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    const handleNext = () => setStep(step + 1);
    const handleBack = () => step > 1 ? setStep(step - 1) : onBack();

    const submitBooking = async () => {
        setIsSubmitting(true);
        try {
            const bookingData = {
                ...formData,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, "bookings"), bookingData);
            console.log("Document written with ID: ", docRef.id);
            alert("Booking successfully submitted! Our team will contact you shortly.");
            onBack();
        } catch (e) {
            console.error("FIREBASE ERROR:", e);
            alert(`Submission failed: ${e.message}. Please check your Firebase rules.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1: return formData.service !== '';
            case 2: return formData.date !== '' && formData.time !== '';
            case 3: return formData.patientName !== '' && formData.patientPhone !== '';
            case 4: return formData.address !== '' && formData.city !== '';
            default: return true;
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-16 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Progress Stepper */}
                <div className="relative flex justify-between items-center mb-16 px-4 max-w-2xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-300 -z-10 -translate-y-1/2" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500 ease-out"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    />
                    {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 shadow-sm transition-all duration-300 
                ${step >= s.id ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-teal-100' : 'bg-white border-slate-300 text-slate-400'}`}>
                                {step > s.id ? <Check size={24} /> : s.icon}
                            </div>
                            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-primary' : 'text-slate-400'}`}>{s.name}</span>
                        </div>
                    ))}
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-[2rem] border-2 border-white shadow-xl shadow-teal-900/5 p-6 md:p-12 min-h-[550px] flex flex-col">

                    <div className="flex-1">
                        {/* STEP 1: SERVICE */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Select Your Service</h2>
                                <p className="text-slate-500 mb-10">What type of nursing care do you need?</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {services.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setFormData({ ...formData, service: s })}
                                            className={`p-5 text-left border-2 rounded-2xl font-bold transition-all shadow-sm ${formData.service === s ? 'border-primary bg-teal-50 text-primary ring-4 ring-teal-50' : 'border-slate-300 bg-white hover:border-primary hover:shadow-md text-slate-700'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: SCHEDULE */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Choose Date & Time</h2>
                                <p className="text-slate-500 mb-10">When would you like the nurse to visit?</p>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 uppercase flex items-center gap-2">
                                            <Calendar size={16} /> Select Date *
                                        </label>
                                        <input
                                            type="date"
                                            className={inputClasses}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            value={formData.date}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-700 uppercase flex items-center gap-2">
                                            <Clock size={16} /> Select Time Slot *
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {timeSlots.map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => setFormData({ ...formData, time: t })}
                                                    className={`p-3 text-sm border-2 rounded-xl font-bold transition-all shadow-sm ${formData.time === t ? 'bg-primary text-white border-primary shadow-md ring-2 ring-teal-100' : 'bg-white border-slate-300 hover:border-primary text-slate-700'}`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: PATIENT INFO */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Patient Information</h2>
                                <p className="text-slate-500 mb-10">Tell us about the person receiving care</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Patient Name *</label>
                                        <input type="text" placeholder="Full Name" className={inputClasses} value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Age</label>
                                        <input type="number" placeholder="Years" className={inputClasses} value={formData.patientAge} onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number *</label>
                                        <input type="tel" placeholder="+94 XX XXX XXXX" className={inputClasses} value={formData.patientPhone} onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Email (Optional)</label>
                                        <input type="email" placeholder="example@mail.com" className={inputClasses} value={formData.patientEmail} onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: LOCATION */}
                        {step === 4 && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Service Location</h2>
                                <p className="text-slate-500 mb-10">Where should the nurse provide the service?</p>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Street Address *</label>
                                        <input type="text" placeholder="123/A, Main St..." className={inputClasses} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">City *</label>
                                            <input type="text" placeholder="Colombo" className={inputClasses} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">ZIP Code</label>
                                            <input type="text" placeholder="XXXXX" className={inputClasses} value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Special Notes</label>
                                        <textarea className={`${inputClasses} h-28 resize-none`} placeholder="Any special medical conditions or entry instructions?" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: REVIEW */}
                        {step === 5 && (
                            <div className="animate-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Review & Submit</h2>
                                <p className="text-slate-500 mb-8">Please review your booking details before final submission</p>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-teal-50/50 p-6 rounded-2xl border-2 border-teal-100">
                                            <p className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1"><Stethoscope size={14} /> Service</p>
                                            <p className="text-xl font-bold text-slate-800">{formData.service || 'N/A'}</p>
                                        </div>
                                        <div className="bg-teal-50/50 p-6 rounded-2xl border-2 border-teal-100">
                                            <p className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1"><Calendar size={14} /> Schedule</p>
                                            <p className="text-xl font-bold text-slate-800">{formData.date} at {formData.time}</p>
                                        </div>
                                    </div>
                                    <div className="bg-teal-50/50 p-6 rounded-2xl border-2 border-teal-100">
                                        <p className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1"><User size={14} /> Patient Information</p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xl font-bold text-slate-800">{formData.patientName}</p>
                                            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold border border-teal-200 text-teal-700">{formData.patientAge} Years Old</span>
                                        </div>
                                        <p className="text-slate-600 font-medium mt-1">{formData.patientPhone}</p>
                                    </div>
                                    <div className="bg-teal-50/50 p-6 rounded-2xl border-2 border-teal-100">
                                        <p className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1"><MapPin size={14} /> Location Details</p>
                                        <p className="text-lg font-bold text-slate-800 leading-tight">{formData.address}</p>
                                        <p className="text-slate-600 font-medium">{formData.city} {formData.zip}</p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-800 text-sm font-medium">
                                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                    <p>By submitting, you agree to our Terms of Service. A coordinator will call you within 30 minutes to confirm your nurse assignment.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-12 pt-8 border-t-2 border-slate-100 flex justify-between gap-4">
                        <button
                            onClick={handleBack}
                            className="px-6 md:px-10 py-4 rounded-2xl border-2 border-slate-300 bg-white font-bold text-slate-700 flex items-center gap-2 hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
                        >
                            <ChevronLeft size={20} /> Back
                        </button>

                        {step < 5 ? (
                            <button
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                className={`px-10 md:px-14 py-4 rounded-2xl font-bold text-white flex items-center gap-2 transition-all shadow-lg active:scale-95
                  ${isStepValid() ? 'bg-primary hover:bg-secondary shadow-teal-200' : 'bg-slate-300 cursor-not-allowed'}`}
                            >
                                Next Step <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={submitBooking}
                                disabled={isSubmitting}
                                className="px-10 md:px-14 py-4 rounded-2xl bg-slate-900 text-white font-bold flex items-center gap-2 hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? "Processing..." : <><Check size={20} /> Submit Booking</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingWizard;