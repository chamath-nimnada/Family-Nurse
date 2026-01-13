import { ArrowRight, Clock, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section id="home" className="pt-32 pb-16 bg-gradient-to-b from-accent to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800 border border-teal-200">
                            <ShieldCheck size={16} className="mr-2" /> Trusted by 10,000+ families
                        </span>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                            {t('hero_title').split(',')[0]}, <span className="text-primary">{t('hero_title').split(',')[1]}</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                            {t('hero_sub')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary shadow-lg shadow-teal-200 transition-all">
                                Book a Nurse <ArrowRight size={20} />
                            </button>
                            <button className="bg-white border-2 border-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                                Explore Services
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="p-2 bg-teal-50 rounded-lg text-primary"><Clock size={20} /></div>
                                <span>24/7 Available</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="p-2 bg-teal-50 rounded-lg text-primary"><Star size={20} /></div>
                                <span>4.9/5 Rating</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="p-2 bg-teal-50 rounded-lg text-primary"><ShieldCheck size={20} /></div>
                                <span>Verified Nurses</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl"></div>
                        <img
                            src="https://img.freepik.com/free-vector/health-professional-collection_23-2148533764.jpg?semt=ais_hybrid&w=740&q=80"
                            alt="Nurse Illustration"
                            className="relative w-full h-auto rounded-3xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;