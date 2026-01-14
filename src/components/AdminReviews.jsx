import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Star, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const deleteReview = async (id) => {
        if (window.confirm("Delete this review?")) {
            try { await deleteDoc(doc(db, "comments", id)); } catch (e) { console.error(e); }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
                <div key={r.id} className="bg-white p-6 rounded-[2rem] border-2 border-white shadow-xl relative group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-primary font-bold">{r.initial}</div>
                            <div>
                                <h4 className="font-bold text-slate-800">{r.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{r.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteReview(r.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                        ))}
                    </div>
                    <p className="text-sm text-slate-600 italic break-words leading-relaxed">"{r.text}"</p>
                </div>
            ))}
        </div>
    );
};

export default AdminReviews;