import { CalendarCheck, ClipboardList, HeartHandshake, UserSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
    const { t } = useTranslation();

    const steps = [
        { id: "01", title: t('step1_t'), desc: t('step1_d'), icon: <ClipboardList size={24} /> },
        { id: "02", title: t('step2_t'), desc: t('step2_d'), icon: <UserSearch size={24} /> },
        { id: "03", title: t('step3_t'), desc: t('step3_d'), icon: <CalendarCheck size={24} /> },
        { id: "04", title: t('step4_t'), desc: t('step4_d'), icon: <HeartHandshake size={24} /> }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white overflow-hidden scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">{t('how_it_works')}</p>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('how_title')}</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{t('how_sub')}</p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step) => (
                            <div key={step.id} className="text-center group">
                                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-sm border border-slate-200 bg-white group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-teal-100 group-hover:text-white text-primary">
                                    {step.icon}
                                </div>
                                <p className="text-primary font-bold text-sm mb-2 group-hover:scale-110 transition-transform">{step.id}</p>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed px-4 group-hover:text-gray-700 transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;