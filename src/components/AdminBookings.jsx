import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { Calendar, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        // Fetch Bookings
        const qB = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubB = onSnapshot(qB, (snap) => setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

        // Fetch Active Nurses for assignment
        const qN = query(collection(db, "users"));
        const unsubN = onSnapshot(qN, (snap) => {
            setNurses(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.role === 'nurse' && u.status === 'active'));
        });

        return () => { unsubB(); unsubN(); };
    }, []);

    const assignNurse = async (bookingId, nurseId) => {
        const selectedNurse = nurses.find(n => n.id === nurseId);
        await updateDoc(doc(db, "bookings", bookingId), {
            assignedNurseId: nurseId,
            assignedNurseName: selectedNurse.name,
            status: 'assigned'
        });
        alert("Nurse assigned successfully!");
    };

    return (
        <div className="bg-white rounded-[2rem] border-2 border-white shadow-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[10px] font-bold uppercase text-slate-400">
                        <th className="p-6">Patient / Service</th>
                        <th className="p-6">Schedule</th>
                        <th className="p-6">Assigned Nurse</th>
                        <th className="p-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-6">
                                <p className="font-bold text-slate-800">{b.patientName}</p>
                                <p className="text-xs text-primary font-bold">{b.service}</p>
                            </td>
                            <td className="p-6 text-xs text-slate-600 font-medium">
                                <div className="flex items-center gap-1.5"><Calendar size={14} /> {b.date}</div>
                                <div className="mt-1 text-slate-400">{b.time}</div>
                            </td>
                            <td className="p-6">
                                <select
                                    className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-primary w-full"
                                    value={b.assignedNurseId || ""}
                                    onChange={(e) => assignNurse(b.id, e.target.value)}
                                >
                                    <option value="">Unassigned</option>
                                    {nurses.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                                </select>
                            </td>
                            <td className="p-6 text-right space-x-2">
                                <button onClick={() => deleteDoc(doc(db, "bookings", b.id))} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBookings;