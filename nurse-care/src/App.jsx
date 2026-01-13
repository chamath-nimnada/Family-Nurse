import { ArrowUpRight, Heart, Phone } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import BookingWizard from './components/BookingWizard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './i18n/config';
import FAQ from './sections/FAQ';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import ServicesGrid from './sections/ServicesGrid';
import Testimonials from './sections/Testimonials';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#e6f7f5] z-[100] flex flex-col items-center justify-center">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-teal-100 border-t-primary rounded-full animate-spin" />
      <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary fill-current animate-pulse" size={32} />
    </div>
    <h2 className="mt-6 text-2xl font-bold text-slate-800 tracking-tight">NurseCare</h2>
  </div>
);

function App() {
  const [view, setView] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const changeView = (newView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* Global greeny-mint background */}
      <div className="min-h-screen bg-[#e6f7f5] selection:bg-teal-100 selection:text-primary">
        <Navbar
          onBookNow={() => changeView('booking')}
          onHome={() => changeView('home')}
        />

        {view === 'home' ? (
          <main className="animate-in fade-in duration-1000">
            {/* Hero on the main background */}
            <div id="home"><Hero onBookNow={() => changeView('booking')} /></div>

            {/* Services on the background - cards inside will be white */}
            <div id="services" className="py-12"><ServicesGrid /></div>

            {/* How It Works on the background */}
            <HowItWorks />

            {/* FAQ on the background */}
            <FAQ />

            {/* Testimonials on the background */}
            <Testimonials />

            {/* CTA Section */}
            <section className="py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-teal-900/20 border-4 border-white">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 relative z-10 leading-tight">
                    Professional Nursing <br /> At Your Doorstep
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <button
                      onClick={() => changeView('booking')}
                      className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl"
                    >
                      Book Your Nurse <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-md text-white border border-white/40 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/30 transition-all flex items-center justify-center gap-3">
                      <Phone size={24} /> 1-800-NURSE
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          <div className="animate-in slide-in-from-right duration-500">
            <BookingWizard onBack={() => changeView('home')} />
          </div>
        )}

        <Footer />
      </div>
    </Suspense>
  );
}

export default App;