import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { auth, db } from '../firebase/config';

const AuthPage = ({ onBack, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    // Logic: Only Admins or Approved Nurses can enter
                    if (userData.role === 'nurse' && userData.status === 'pending') {
                        await signOut(auth);
                        alert("Nurse Account Pending: Please wait for admin approval.");
                    } else {
                        onLoginSuccess({ id: userCredential.user.uid, ...userData });
                    }
                }
            } else {
                // Registration always defaults to 'nurse' for security
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const newNurse = {
                    name: formData.name,
                    email: formData.email,
                    role: 'nurse',
                    status: 'pending',
                    createdAt: new Date().toISOString()
                };
                await setDoc(doc(db, "users", userCredential.user.uid), newNurse);
                alert("Registered as Nurse! Access is restricted until an Admin approves you.");
                setIsLogin(true);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e6f7f5] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border-2 border-white">
                <button onClick={onBack} className="mb-6 text-slate-400 hover:text-primary transition-colors flex items-center gap-2 font-bold">
                    <ArrowLeft size={20} /> Back to Site
                </button>

                <h2 className="text-3xl font-extrabold text-slate-800 mb-8">
                    {isLogin ? "Admin & Nurse Login" : "Nurse Registration"}
                </h2>

                <form onSubmit={handleAuth} className="space-y-5">
                    {!isLogin && (
                        <input
                            type="text" required placeholder="Full Name"
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-primary"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    )}
                    <input
                        type="email" required placeholder="Email Address"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-primary"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password" required placeholder="Password"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-primary"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="submit" disabled={loading}
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Sign In" : "Register as Nurse")}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full mt-6 text-sm font-bold text-primary"
                >
                    {isLogin ? "Need a nurse account? Register here" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;