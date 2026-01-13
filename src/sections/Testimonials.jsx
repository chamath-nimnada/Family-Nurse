import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Plus, Quote, Send, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase/config';

const Testimonials = () => {
    const { t } = useTranslation();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ name: '', role: '', text: '', rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputClasses = "w-full p-4 bg-white border-2 border-slate-300 rounded-2xl shadow-sm outline-none focus:border-primary focus:ring-4 focus:ring-teal-50 transition-all font-medium text-slate-700 placeholder:text-slate-400";

    useEffect(() => {
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(data);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.name || !newComment.text) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "comments"), {
                ...newComment,
                initial: newComment.name.charAt(0).toUpperCase(),
                createdAt: new Date().toISOString()
            });
            setNewComment({ name: '', role: '', text: '', rating: 5 });
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
        setIsSubmitting(false);
    };

    return (
        <section className="py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Testimonials</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('testimonials_title')}</h2>
                    <p className="text-slate-500">{t('testimonials_sub')}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6 max-h-[700px] overflow-y-auto pr-4 no-scrollbar">
                        {comments.map((review) => (
                            <div key={review.id} className="bg-white p-8 rounded-[2rem] border-2 border-white shadow-lg shadow-teal-900/5 relative group hover:border-primary/30 transition-all">
                                <Quote className="absolute top-6 right-6 text-teal-50" size={40} />
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                    ))}
                                </div>
                                <p className="text-slate-600 italic mb-6 leading-relaxed break-words">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-primary font-bold border border-teal-100">
                                        {review.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {comments.length === 0 && (
                            <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-500 font-medium">{t('no_reviews')}</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border-2 border-white shadow-2xl shadow-teal-900/10 sticky top-28">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-teal-50 rounded-2xl text-primary"><Plus size={24} /></div>
                            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{t('post_review')}</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('full_name')}</label>
                                    <input type="text" placeholder={t('full_name')} required className={inputClasses} value={newComment.name} onChange={(e) => setNewComment({ ...newComment, name: e.target.value })} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('your_role')}</label>
                                    <input type="text" placeholder={t('your_role')} className={inputClasses} value={newComment.role} onChange={(e) => setNewComment({ ...newComment, role: e.target.value })} />
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border-2 border-slate-300 shadow-sm flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('select_rating')}</span>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} type="button" onClick={() => setNewComment({ ...newComment, rating: star })}>
                                            <Star size={20} className={star <= newComment.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('message')}</label>
                                <textarea placeholder={t('message')} required className={`${inputClasses} h-32 resize-none`} value={newComment.text} onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-slate-200">
                                {isSubmitting ? "..." : <><Send size={18} /> {t('submit_review')}</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;