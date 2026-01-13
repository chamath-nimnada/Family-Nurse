import { Heart, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-xl">
                                <Heart className="text-white w-5 h-5 fill-current" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">NurseCare</span>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Providing professional, board-certified nursing services directly to your doorstep.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg mb-8">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
                            <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Book a Nurse</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg mb-8">Services</h4>
                        <ul className="space-y-4">
                            <li>Post-Surgery Recovery</li>
                            <li>Elderly Daily Care</li>
                            <li>Wound Care Management</li>
                            <li>IV Therapy Support</li>
                            <li>Maternal & Infant Care</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg mb-8">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary border border-slate-700">
                                    <Phone size={18} />
                                </div>
                                <span className="font-medium">1-800-NURSE-CARE</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary border border-slate-700">
                                    <Mail size={18} />
                                </div>
                                <span className="font-medium">hello@nursecare.com</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary border border-slate-700">
                                    <MapPin size={18} />
                                </div>
                                <span className="font-medium">Serving Islandwide</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                    <p>© 2026 NurseCare. Built for professional home healthcare.</p>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white transition-colors underline decoration-slate-700">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors underline decoration-slate-700">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;