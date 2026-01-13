import { Activity, Baby, Heart, Pill, Stethoscope, Syringe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServicesGrid = () => {
    const { t } = useTranslation();

    const services = [
        { title: "Post-Surgery Care", desc: "Expert nursing support during your recovery at home. Wound care, medication management, and monitoring.", icon: <Stethoscope size={28} /> },
        { title: "Elderly Care", desc: "Compassionate daily assistance for seniors. Personal care, companionship, and health monitoring.", icon: <Heart size={28} /> },
        { title: "Medication Management", desc: "Professional administration and monitoring of medications to ensure proper dosage and timing.", icon: <Pill size={28} /> },
        { title: "IV Therapy", desc: "Safe and sterile intravenous treatments administered by certified nurses in your home.", icon: <Syringe size={28} /> },
        { title: "Newborn & Maternal Care", desc: "Specialized support for new mothers and infants. Breastfeeding guidance and newborn care.", icon: <Baby size={28} /> },
        { title: "Chronic Disease Care", desc: "Ongoing management for diabetes, heart conditions, and other chronic illnesses.", icon: <Activity size={28} /> }
    ];

    return (
        <section id="services" className="py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">{t('services')}</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Home Healthcare</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        From routine check-ups to specialized care, our nurses are trained to handle all your healthcare needs at home.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white p-10 rounded-[2.5rem] border-2 border-white shadow-xl shadow-teal-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-teal-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                {s.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;