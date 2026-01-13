import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(null); // All items closed by default

    const faqs = [
        {
            question: "Are your nurses qualified?",
            answer: "Yes, all our nurses are board-certified and undergo rigorous background checks and clinical assessments before joining our team."
        },
        {
            question: "Do you bring your own equipment?",
            answer: "We bring necessary medical consumables. Specialized equipment should be discussed beforehand to ensure compatibility with patient needs."
        },
        {
            question: "How do I make a payment?",
            answer: "We offer multiple secure payment options including credit/debit cards, online transfers, and insurance-integrated billing systems."
        },
        {
            question: "Is emergency service available?",
            answer: "While we provide 24/7 home care, for life-threatening emergencies, we always recommend calling emergency services (1990) immediately."
        }
    ];

    return (
        <section className="py-24 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center justify-center gap-3 mb-12 text-slate-800 animate-in fade-in duration-700">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-white">
                        <HelpCircle size={32} className="text-primary" />
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight">{t('faq_title')}</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white border-2 rounded-[1.5rem] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md 
                ${activeIndex === index ? 'border-primary shadow-xl shadow-teal-900/10' : 'border-white'}`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-all"
                            >
                                <span className={`text-xl font-bold transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-slate-700'}`}>
                                    {faq.question}
                                </span>
                                <div className={`p-1 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            {activeIndex === index && (
                                <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-500">
                                    <div className="h-px bg-slate-100 mb-6" />
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;