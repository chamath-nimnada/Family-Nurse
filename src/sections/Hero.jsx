import { ArrowRight, Clock, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// Assuming your hero image is in the assets folder as previously discussed
import heroImg from '../assets/7967198_3804031.jpg';

const Hero = ({ onBookNow }) => {
    const { t } = useTranslation();

    const handleExplore = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-teal-100 text-teal-800 border border-teal-200">
                            <ShieldCheck size={16} className="mr-2" /> Trusted by 10,000+ families
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                            {t('hero_title').split(',')[0]}, <br />
                            <span className="text-primary">{t('hero_title').split(',')[1]}</span>
                        </h1>

                        <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
                            {t('hero_sub')}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={onBookNow}
                                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary shadow-xl shadow-teal-200 transition-all active:scale-95"
                            >
                                {t('book_nurse')} <ArrowRight size={20} />
                            </button>

                            <button
                                onClick={handleExplore}
                                className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
                            >
                                Explore Services
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Clock size={20} /> <span>24/7</span>
                                </div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Available</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <Star size={20} className="fill-current" /> <span>4.9/5</span>
                                </div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Rating</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary font-bold">
                                    <ShieldCheck size={20} /> <span>Verified</span>
                                </div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Nurses</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl" />
                        <img
                            src={heroImg}
                            alt="Professional Nursing Care"
                            className="relative w-full h-auto rounded-[2.5rem] shadow-2xl border-4 border-white"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;