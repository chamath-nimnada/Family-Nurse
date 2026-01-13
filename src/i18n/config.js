import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    home: "Home",
                    services: "Services",
                    how_it_works: "How It Works",
                    book_nurse: "Book a Nurse",
                    hero_title: "Quality Nursing Care, Right at Home",
                    hero_sub: "Connect with certified, compassionate nurses for personalized home healthcare. From post-surgery recovery to elderly care, we're here for you.",
                    how_title: "Book a Nurse in 4 Simple Steps",
                    how_sub: "Getting quality healthcare at home has never been easier. Follow these steps to book your nurse.",
                    step1_t: "Submit Your Request",
                    step1_d: "Fill out a simple form with your care requirements, preferred date, and location.",
                    step2_t: "Get Matched",
                    step2_d: "We match you with a qualified nurse based on your specific needs and preferences.",
                    step3_t: "Confirm Booking",
                    step3_d: "Review the nurse's profile, confirm the schedule, and finalize your booking.",
                    step4_t: "Receive Care",
                    step4_d: "Your nurse arrives on time, ready to provide professional, compassionate care.",
                    faq_title: "Frequently Asked Questions"
                }
            },
            si: {
                translation: {
                    home: "ප්‍රධාන පිටුව",
                    services: "සේවාවන්",
                    how_it_works: "ක්‍රියාපටිපාටිය",
                    book_nurse: "ඇණවුම් කරන්න",
                    hero_title: "ගුණාත්මක සාත්තු සේවය, ඔබේ නිවසටම",
                    hero_sub: "පළපුරුදු හෙද සේවකයන් සමඟ සම්බන්ධ වන්න. ශල්‍යකර්මයකින් පසු යථා තත්ත්වයට පත්වීම හෝ වැඩිහිටි සත්කාර සඳහා අප සූදානම්.",
                    how_title: "පහසු පියවර 4 කින් හෙදියක් වෙන්කරවා ගන්න",
                    how_sub: "නිවසේදීම ගුණාත්මක සෞඛ්‍ය සේවාවක් ලබා ගැනීම දැන් ඉතා පහසුයි.",
                    step1_t: "ඉල්ලීම ඉදිරිපත් කරන්න",
                    step1_d: "ඔබේ අවශ්‍යතා ඇතුළත් සරල පෝරමයක් පුරවන්න.",
                    step2_t: "ගැලපෙන හෙදියක් තෝරාගැනීම",
                    step2_d: "ඔබේ අවශ්‍යතා අනුව අපි සුදුසුම හෙදිය තෝරා දෙන්නෙමු.",
                    step3_t: "වෙන්කිරීම තහවුරු කරන්න",
                    step3_d: "හෙදියගේ තොරතුරු පරීක්ෂා කර වෙන්කිරීම අවසන් කරන්න.",
                    step4_t: "සේවාව ලබාගන්න",
                    step4_d: "හෙදිය නියමිත වේලාවට පැමිණ ඔබට අවශ්‍ය සාත්තු සේවය ලබා දෙනු ඇත.",
                    faq_title: "නිතර අසන පැන"
                }
            },
            ta: {
                translation: {
                    home: "முகப்பு",
                    services: "சேவைகள்",
                    how_it_works: "எப்படி செயல்படுகிறது",
                    book_nurse: "பதிவு செய்யவும்",
                    hero_title: "தரமான செவிலியர் சேவை, உங்கள் வீட்டில்",
                    hero_sub: "சான்றிதழ் பெற்ற செவிலியர்களுடன் இணையுங்கள். அறுவை சிகிச்சைக்குப் பிந்தைய மீட்பு முதல் முதியோர் பராமரிப்பு வரை நாங்கள் உங்களுக்காக இருக்கிறோம்.",
                    how_title: "4 எளிய படிகளில் செவிலியரை பதிவு செய்யுங்கள்",
                    how_sub: "வீட்டிலேயே தரமான சுகாதார சேவையைப் பெறுவது இப்போது எளிதானது.",
                    step1_t: "உங்கள் கோரிக்கையை சமர்ப்பிக்கவும்",
                    step1_d: "உங்கள் தேவைகளுடன் எளிய படிவத்தை நிரப்பவும்.",
                    step2_t: "பொருத்தமான செவிலியரைத் தேர்வு செய்தல்",
                    step2_d: "உங்கள் தேவைகளின் அடிப்படையில் சிறந்த செவிலியரை நாங்கள் தேர்வு செய்வோம்.",
                    step3_t: "பதிவை உறுதிப்படுத்தவும்",
                    step3_d: "செவிலியரின் சுயவிவரத்தை மதிப்பாய்வு செய்து பதிவை முடிக்கவும்.",
                    step4_t: "சேவையைப் பெறுங்கள்",
                    step4_d: "செவிலியர் சரியான நேரத்தில் வந்து சிறந்த சேவையை வழங்குவார்.",
                    faq_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்"
                }
            }
        }
    });

export default i18n;