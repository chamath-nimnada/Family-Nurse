import { Activity, Baby, Heart, Pill, Stethoscope, Syringe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServicesGrid = () => {
    const { t } = useTranslation();

    const services = [
        { title: t('s1_t'), desc: t('s1_d'), icon: <Stethoscope size={28} /> },
        { title: t('s2_t'), desc: t('s2_d'), icon: <Heart size={28} /> },
        { title: t('s3_t'), desc: t('s3_d'), icon: <Pill size={28} /> },
        { title: t('s4_t'), desc: t('s4_d'), icon: <Syringe size={28} /> },
        { title: t('s5_t'), desc: t('s5_d'), icon: <Baby size={28} /> },
        { title: t('s6_t'), desc: t('s6_d'), icon: <Activity size={28} /> }
    ];

    return (
        <section id="services" className="py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">{t('services')}</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('services_title')}</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">{t('services_sub')}</p>
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
                            <p className="text-slate-500 leading-relaxed font-medium">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;