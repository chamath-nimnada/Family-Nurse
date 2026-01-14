import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { CheckCircle, Clipboard, Clock, LogOut, MapPin, Phone, Save, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const NurseDashboard = ({ user, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('tasks');
    const [profile, setProfile] = useState({
        specialization: user.specialization || '',
        experience: user.experience || '',
        bio: user.bio || ''
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Sync tasks assigned to this nurse
        const q = query(collection(db, "bookings"), where("assignedNurseId", "==", user.id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, [user.id]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "users", user.id), profile);
            alert("Profile updated successfully!");
        } catch (e) {
            console.error(e);
        }
        setIsSaving(false);
    };

    const markCompleted = async (taskId) => {
        await updateDoc(doc(db, "bookings", taskId), { status: 'completed' });
    };

    return (
        <div className="min-h-screen bg-[#f0fdfa]">
            <nav className="bg-white border-b border-teal-100 p-6 sticky top-0 z-10 shadow-sm">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-100">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="font-extrabold text-slate-800 tracking-tight">{user.name}</h1>
                            <div className="flex gap-4 mt-1">
                                <button
                                    onClick={() => setActiveTab('tasks')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'tasks' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    My Tasks
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    My Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <button onClick={onLogout} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto p-6 md:p-10">
                {activeTab === 'tasks' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                            <Clipboard className="text-primary" /> Your Assigned Tasks ({tasks.length})
                        </h2>
                        <div className="grid gap-6">
                            {tasks.map((task) => (
                                <div key={task.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-white shadow-xl shadow-teal-900/5">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <span className="px-3 py-1 bg-teal-50 text-primary text-[10px] font-bold uppercase rounded-lg border border-teal-100">{task.service}</span>
                                                <h3 className="text-2xl font-extrabold text-slate-800 mt-2">{task.patientName}</h3>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-500 font-medium">
                                                <div className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {task.date} at {task.time}</div>
                                                <div className="flex items-center gap-2"><Phone size={16} className="text-primary" /> {task.patientPhone}</div>
                                                <div className="flex items-start gap-2 sm:col-span-2"><MapPin size={16} className="text-primary mt-1" /> {task.address}, {task.city}</div>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            {task.status === 'completed' ? (
                                                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
                                                    <CheckCircle size={20} /> Completed
                                                </div>
                                            ) : (
                                                <button onClick={() => markCompleted(task.id)} className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 shadow-xl active:scale-95">Mark as Finished</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white p-10 rounded-[3rem] border-2 border-white shadow-xl shadow-teal-900/5 max-w-2xl mx-auto">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-teal-50 rounded-2xl text-primary"><UserCircle size={24} /></div>
                                <h2 className="text-2xl font-bold text-slate-800">Professional Qualifications</h2>
                            </div>
                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Specialization</label>
                                    <input
                                        type="text" placeholder="e.g. ICU, Pediatrics, Geriatrics"
                                        className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-primary outline-none font-medium"
                                        value={profile.specialization} onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Years of Experience</label>
                                    <input
                                        type="number" placeholder="5"
                                        className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-primary outline-none font-medium"
                                        value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Short Bio & Experience</label>
                                    <textarea
                                        placeholder="Tell the admin about your nursing background..."
                                        className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl h-32 focus:border-primary outline-none resize-none font-medium"
                                        value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    disabled={isSaving}
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : <><Save size={18} /> Save Profile</>}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NurseDashboard;