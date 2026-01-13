import { Globe, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ onBookNow, onHome }) => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: t('home'), href: '#home', action: onHome },
        { name: t('services'), href: '#services', action: onHome },
        { name: t('how_it_works'), href: '#how-it-works', action: onHome },
    ];

    const handleNavClick = (link) => {
        link.action();
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-teal-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
                        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-teal-100">
                            <Heart className="text-white w-6 h-6 fill-current" />
                        </div>
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">NurseCare</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => handleNavClick(link)}
                                className="text-slate-600 font-semibold hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 border-l pl-10 border-slate-200">
                            <div className="relative group">
                                <button className="flex items-center gap-2 p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                                    <Globe size={18} className="text-slate-500" />
                                    <span className="uppercase text-sm font-bold text-slate-700">{i18n.language.split('-')[0]}</span>
                                </button>
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <button onClick={() => changeLanguage('en')} className="block w-full text-left px-5 py-3 hover:bg-teal-50 rounded-t-2xl text-sm font-medium">English</button>
                                    <button onClick={() => changeLanguage('si')} className="block w-full text-left px-5 py-3 hover:bg-teal-50 text-sm font-medium">සිංහල</button>
                                    <button onClick={() => changeLanguage('ta')} className="block w-full text-left px-5 py-3 hover:bg-teal-50 rounded-b-2xl text-sm font-medium">தமிழ்</button>
                                </div>
                            </div>
                            <button
                                onClick={onBookNow}
                                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary shadow-lg shadow-teal-200 transition-all active:scale-95"
                            >
                                {t('book_nurse')}
                            </button>
                        </div>
                    </div>

                    <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-teal-50 px-4 py-6 space-y-4 shadow-xl">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => handleNavClick(link)}
                            className="block text-lg font-semibold text-slate-700 p-2"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                        <div className="flex gap-4">
                            <button onClick={() => changeLanguage('en')} className="px-4 py-2 border rounded-lg flex-1 font-bold">EN</button>
                            <button onClick={() => changeLanguage('si')} className="px-4 py-2 border rounded-lg flex-1 font-bold">සිං</button>
                            <button onClick={() => changeLanguage('ta')} className="px-4 py-2 border rounded-lg flex-1 font-bold">த</button>
                        </div>
                        <button
                            onClick={onBookNow}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold"
                        >
                            {t('book_nurse')}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;