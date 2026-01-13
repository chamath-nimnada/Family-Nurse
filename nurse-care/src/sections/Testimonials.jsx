import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { ChevronLeft, ChevronRight, Plus, Quote, Send, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';

const Testimonials = () => {
    const [comments, setComments] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [newComment, setNewComment] = useState({ name: '', role: '', text: '', rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const scrollRef = useRef(null);

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

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === 'left') {
            current.scrollBy({ left: -300, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Logic: Show 4 comments by default, show all if showAll is true
    const displayedComments = showAll ? comments : comments.slice(0, 4);

    return (
        <section className="py-24 bg-slate-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="animate-in fade-in slide-in-from-left duration-700">
                        <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Testimonials</p>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Families Say</h2>
                        <p className="text-slate-500">Real stories from real families who trusted us.</p>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-200 bg-white hover:bg-primary hover:text-white transition-all shadow-sm">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-200 bg-white hover:bg-primary hover:text-white transition-all shadow-sm">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {displayedComments.map((review) => (
                        <div
                            key={review.id}
                            className="min-w-[300px] md:min-w-[400px] snap-start bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm relative hover:border-primary/30 transition-all group"
                        >
                            <Quote className="absolute top-6 right-6 text-slate-50 group-hover:text-teal-50 transition-colors" size={60} />
                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                ))}
                            </div>
                            <p className="text-slate-600 italic mb-8 leading-relaxed relative z-10">"{review.text}"</p>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-primary font-bold text-xl border border-teal-100">
                                    {review.initial}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                                    <p className="text-xs text-slate-500 font-bold uppercase">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                {comments.length > 4 && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all active:scale-95"
                        >
                            {showAll ? "Show Less" : "See More Reviews"}
                        </button>
                    </div>
                )}

                {/* Add Comment Form Section */}
                <div className="mt-24 max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 text-slate-50 -mr-4 -mt-4">
                        <Plus size={80} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-2 relative z-10">Share Your Experience</h3>
                    <p className="text-slate-500 mb-10 relative z-10">Your feedback helps other families find the care they need.</p>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text" placeholder="Your Name" required
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary outline-none transition-all"
                                value={newComment.name} onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            />
                            <input
                                type="text" placeholder="Your Role (e.g. Daughter)"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary outline-none"
                                value={newComment.role} onChange={(e) => setNewComment({ ...newComment, role: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Rating</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setNewComment({ ...newComment, rating: star })}>
                                        <Star size={24} className={star <= newComment.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            placeholder="Tell us about the care you received..." required
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl h-32 focus:border-primary outline-none resize-none"
                            value={newComment.text} onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                        ></textarea>

                        <button
                            type="submit" disabled={isSubmitting}
                            className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary shadow-lg shadow-teal-200 transition-all disabled:opacity-50 active:scale-95"
                        >
                            {isSubmitting ? "Posting..." : <><Send size={18} /> Submit Review</>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;