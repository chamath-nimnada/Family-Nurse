import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import {
    Award,
    Bell,
    CalendarCheck,
    Check,
    LogOut,
    MessageSquare,
    Search,
    ShieldCheck,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import AdminBookings from './AdminBookings';
import AdminReviews from './AdminReviews';

const AdminDashboard = ({ user, onLogout }) => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const handleApproveNurse = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { status: 'active' });
            alert("Nurse account has been approved.");
        } catch (e) {
            console.error("Approval error:", e);
        }
    };

    const handlePromoteToAdmin = async (userId) => {
        if (window.confirm("Promote this user to Admin? They will have full system access.")) {
            try {
                await updateDoc(doc(db, "users", userId), { role: 'admin', status: 'active' });
            } catch (e) {
                console.error("Promotion error:", e);
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-white fixed h-full z-20 shadow-2xl">
                <div className="p-8 border-b border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary p-2 rounded-xl">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">AdminPanel</span>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administrator</p>
                        <p className="text-sm font-bold text-slate-200 truncate">{user.name}</p>
                    </div>
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'bookings' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <CalendarCheck size={20} /> Manage Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'users' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <Users size={20} /> Nurse & User Mgmt
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === 'reviews' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                        <MessageSquare size={20} /> Reviews
                    </button>
                </nav>

                <div className="absolute bottom-8 w-full px-6">
                    <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all font-bold">
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-10">
                <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-[2rem] shadow-sm border border-white">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 capitalize">{activeTab}</h1>
                        <p className="text-slate-500 font-medium">System performance and data overview.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-primary w-72 text-sm font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-all relative">
                            <Bell size={22} />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'bookings' && <AdminBookings />}
                    {activeTab === 'reviews' && <AdminReviews />}

                    {activeTab === 'users' && (
                        <div className="bg-white rounded-[2.5rem] border-2 border-white shadow-xl shadow-teal-900/5 overflow-hidden">
                            <div className="p-8 border-b border-slate-50">
                                <h3 className="text-xl font-bold text-slate-800">System Users</h3>
                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        <th className="px-8 py-5">User Information</th>
                                        <th className="px-8 py-5">Role</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-slate-50/30 transition-colors">
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-slate-800">{u.name}</p>
                                                <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                                                {/* Displaying Nurse Profile Data */}
                                                {u.role === 'nurse' && u.specialization && (
                                                    <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                                                        <Award size={12} /> {u.specialization} • {u.experience} Years Exp
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right space-x-2">
                                                {u.role === 'nurse' && u.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleApproveNurse(u.id)}
                                                        className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                )}
                                                {u.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handlePromoteToAdmin(u.id)}
                                                        className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <ShieldCheck size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;