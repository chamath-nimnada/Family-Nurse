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
                    // Navbar & Hero
                    home: "Home",
                    services: "Services",
                    how_it_works: "How It Works",
                    book_nurse: "Book a Nurse",
                    hero_title: "Quality Nursing Care, Right at Home",
                    hero_sub: "Connect with certified, compassionate nurses for personalized home healthcare. From post-surgery recovery to elderly care, we're here for you.",
                    explore_services: "Explore Services",
                    available: "Available",
                    rating: "Rating",
                    nurses: "Nurses",
                    trusted_by: "Trusted by 10,000+ families",

                    // Services Section
                    services_title: "Comprehensive Home Healthcare",
                    services_sub: "From routine check-ups to specialized care, our nurses are trained to handle all your healthcare needs at home.",
                    s1_t: "Post-Surgery Care", s1_d: "Expert nursing support during your recovery at home. Wound care and monitoring.",
                    s2_t: "Elderly Care", s2_d: "Compassionate daily assistance for seniors. Personal care and health monitoring.",
                    s3_t: "Medication Management", s3_d: "Professional administration and monitoring of medications for proper dosage.",
                    s4_t: "IV Therapy", s4_d: "Safe and sterile intravenous treatments administered by certified nurses.",
                    s5_t: "Newborn & Maternal Care", s5_d: "Specialized support for new mothers and infants. Breastfeeding guidance.",
                    s6_t: "Chronic Disease Care", s6_d: "Ongoing management for diabetes, heart conditions, and other illnesses.",

                    // How It Works
                    how_title: "Book a Nurse in 4 Simple Steps",
                    how_sub: "Getting quality healthcare at home has never been easier.",
                    step1_t: "Submit Your Request", step1_d: "Fill out a simple form with your care requirements and location.",
                    step2_t: "Get Matched", step2_d: "We match you with a qualified nurse based on your specific needs.",
                    step3_t: "Confirm Booking", step3_d: "Review the nurse's profile and finalize your booking.",
                    step4_t: "Receive Care", step4_d: "Your nurse arrives on time, ready to provide professional care.",

                    // FAQ
                    faq_title: "Frequently Asked Questions",
                    q1: "Are your nurses qualified?", a1: "Yes, all our nurses are board-certified and undergo rigorous background checks.",
                    q2: "Do you bring your own equipment?", a2: "We bring medical consumables. Specialized equipment should be discussed beforehand.",
                    q3: "How do I make a payment?", a3: "We offer secure options including cards, online transfers, and insurance.",
                    q4: "Is emergency service available?", a4: "For life-threatening emergencies, we recommend calling 1990 immediately.",

                    // Testimonials
                    testimonials_title: "What Our Families Say",
                    testimonials_sub: "Real stories from real families who trusted us.",
                    post_review: "Post a Review",
                    full_name: "Full Name",
                    your_role: "Your Role",
                    select_rating: "Select Rating",
                    message: "Message",
                    submit_review: "Submit Review",
                    no_reviews: "No reviews yet. Be the first to share your story!",

                    // Booking Wizard
                    wizard_intro: "Complete the form below to request a qualified nurse. We'll match you with the best professional.",
                    service: "Service", schedule: "Schedule", patient_info: "Patient Info", location: "Location", review: "Review",
                    next: "Next Step", back: "Back", submit_booking: "Submit Booking",
                    patient_name: "Patient Name", age: "Age", phone: "Phone Number", email: "Email",
                    street: "Street Address", city: "City", zip: "ZIP Code", special_notes: "Special Notes",

                    // Footer
                    footer_desc: "Providing professional, board-certified nursing services directly to your doorstep.",
                    quick_links: "Quick Links",
                    contact_us: "Contact Us",
                    serving: "Serving Islandwide"
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
                    explore_services: "සේවාවන් පරීක්ෂා කරන්න",
                    available: "පවතින",
                    rating: "ශ්‍රේණිගත කිරීම",
                    nurses: "හෙදියන්",
                    trusted_by: "පවුල් 10,000+ ක විශ්වාසය",

                    services_title: "සම්පූර්ණ නිවාස සෞඛ්‍ය සේවය",
                    services_sub: "සාමාන්‍ය පරීක්ෂාවල සිට විශේෂිත සත්කාර දක්වා සියලු අවශ්‍යතා සඳහා අපේ හෙදියන් පුහුණු කර ඇත.",
                    s1_t: "ශල්‍යකර්මයෙන් පසු සත්කාර", s1_d: "නිවසේදී සුවය ලබන කාලය තුළ විශේෂඥ හෙද සහාය.",
                    s2_t: "වැඩිහිටි සත්කාර", s2_d: "වැඩිහිටියන් සඳහා දෛනික සහාය සහ සෞඛ්‍ය නිරීක්ෂණය.",
                    s3_t: "ඖෂධ කළමනාකරණය", s3_d: "ඖෂධ නියමිත මාත්‍රාවෙන් ලබාදීම සහ නිරීක්ෂණය කිරීම.",
                    s4_t: "IV ප්‍රතිකාර", s4_d: "සුදුසුකම් ලත් හෙදියන් විසින් ලබාදෙන විෂබීජහරණය කළ එන්නත් ප්‍රතිකාර.",
                    s5_t: "මව් හා බිළිඳු සත්කාර", s5_d: "නව මව්වරුන් සහ බිළිඳුන් සඳහා විශේෂ සහාය.",
                    s6_t: "නිදන්ගත රෝග සත්කාර", s6_d: "දියවැඩියාව, හෘද රෝග වැනි නිදන්ගත රෝග කළමනාකරණය.",

                    how_title: "පියවර 4 කින් හෙදියක් ඇණවුම් කරන්න",
                    how_sub: "නිවසේදීම සෞඛ්‍ය සේවාව ලබාගැනීම දැන් ඉතා පහසුයි.",
                    step1_t: "ඉල්ලීම ඉදිරිපත් කරන්න", step1_d: "ඔබේ අවශ්‍යතා ඇතුළත් සරල පෝරමයක් පුරවන්න.",
                    step2_t: "ගැලපෙන හෙදියක් තේරීම", step2_d: "ඔබේ අවශ්‍යතා අනුව සුදුසුම හෙදිය අපි තෝරා දෙන්නෙමු.",
                    step3_t: "තහවුරු කරන්න", step3_d: "හෙදියගේ තොරතුරු පරීක්ෂා කර ඇණවුම තහවුරු කරන්න.",
                    step4_t: "සේවාව ලබාගන්න", step4_d: "හෙදිය නියමිත වේලාවට පැමිණ සාත්තු සේවය ලබා දෙනු ඇත.",

                    faq_title: "නිතර අසන පැන",
                    q1: "ඔබේ හෙදියන් සුදුසුකම් ලත් අයද?", a1: "ඔව්, අපේ සියලුම හෙදියන් මණ්ඩලයේ සහතික ලත් සහ පසුබිම් පරීක්ෂාවට ලක් වූ අයයි.",
                    q2: "උපකරණ ඔබ රැගෙන එනවාද?", a2: "අපි මූලික වෛද්‍ය ද්‍රව්‍ය රැගෙන එන්නෙමු. විශේෂිත උපකරණ කලින් සාකච්ඡා කළ යුතුය.",
                    q3: "ගෙවීම් කරන්නේ කෙසේද?", a3: "කාඩ්පත්, මාර්ගගත හුවමාරු සහ රක්ෂණ මගින් ගෙවිය හැකිය.",
                    q4: "හදිසි සේවා තිබේද?", a4: "ජීවිත අවදානම් සහිත හදිසි අවස්ථාවකදී වහාම 1990 අමතන්න.",

                    testimonials_title: "අපේ පාරිභෝගික අදහස්",
                    testimonials_sub: "අප කෙරෙහි විශ්වාසය තැබූ පවුල්වල සැබෑ අත්දැකීම්.",
                    post_review: "අදහස් දක්වන්න",
                    full_name: "සම්පූර්ණ නම",
                    your_role: "ඔබේ භූමිකාව",
                    select_rating: "ශ්‍රේණිගත කිරීම",
                    message: "පණිවිඩය",
                    submit_review: "ඉදිරිපත් කරන්න",
                    no_reviews: "තවමත් අදහස් නැත. ඔබ පළමු අදහස දක්වන්න!",

                    wizard_intro: "හෙදියක් ලබාගැනීමට පහත පෝරමය පුරවන්න. අපි ඔබට ගැලපෙනම හෙදිය තෝරා දෙන්නෙමු.",
                    service: "සේවාව", schedule: "කාලසටහන", patient_info: "රෝගියාගේ තොරතුරු", location: "ස්ථානය", review: "සමාලෝචනය",
                    next: "මීළඟ පියවර", back: "පසුපසට", submit_booking: "ඇණවුම් කරන්න",
                    patient_name: "රෝගියාගේ නම", age: "වයස", phone: "දුරකථන අංකය", email: "විද්‍යුත් තැපෑල",
                    street: "ලිපිනය", city: "නගරය", zip: "තැපැල් කේතය", special_notes: "විශේෂ සටහන්"
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
                    explore_services: "சேவைகளை ஆராயுங்கள்",
                    available: "கிடைக்கக்கூடிய",
                    rating: "மதிப்பீடு",
                    nurses: "செவிலியர்கள்",
                    trusted_by: "10,000+ குடும்பங்களின் நம்பிக்கை",

                    services_title: "முழுமையான வீட்டு சுகாதார சேவை",
                    services_sub: "வழக்கமான பரிசோதனைகள் முதல் சிறப்பு சிகிச்சை வரை அனைத்தும் உங்கள் வீட்டிலேயே.",
                    s1_t: "அறுவை சிகிச்சைக்குப் பின் பராமரிப்பு", s1_d: "வீட்டில் குணமடையும் காலத்தில் நிபுணத்துவ செவிலியர் ஆதரவு.",
                    s2_t: "முதியோர் பராமரிப்பு", s2_d: "முதியோருக்கான தினசரி உதவி மற்றும் சுகாதார கண்காணிப்பு.",
                    s3_t: "மருந்து மேலாண்மை", s3_d: "மருந்துகளை சரியான அளவில் வழங்குதல் மற்றும் கண்காணித்தல்.",
                    s4_t: "IV சிகிச்சை", s4_d: "சான்றிதழ் பெற்ற செவிலியர்களால் வழங்கப்படும் ஊசி சிகிச்சைகள்.",
                    s5_t: "தாய் மற்றும் சேய் பராமரிப்பு", s5_d: "புதிய தாய்மார்கள் மற்றும் குழந்தைகளுக்கு சிறப்பு ஆதரவு.",
                    s6_t: "தீராத நோய் பராமரிப்பு", s6_d: "சர்க்கரை நோய், இதய நோய் போன்றவற்றை நிர்வகித்தல்.",

                    how_title: "4 எளிய படிகளில் பதிவு செய்யுங்கள்",
                    how_sub: "வீட்டிலேயே சுகாதார சேவையைப் பெறுவது இப்போது எளிதானது.",
                    step1_t: "கோரிக்கையை சமர்ப்பிக்கவும்", step1_d: "உங்கள் தேவைகளுடன் எளிய படிவத்தை நிரப்பவும்.",
                    step2_t: "பொருத்தமான செவிலியரைத் தேர்வு செய்தல்", step2_d: "உங்கள் தேவைகளின் அடிப்படையில் சிறந்த செவிலியரைத் தேர்வு செய்வோம்.",
                    step3_t: "பதிவை உறுதிப்படுத்தவும்", step3_d: "விவரங்களை மதிப்பாய்வு செய்து பதிவை முடிக்கவும்.",
                    step4_t: "சேவையைப் பெறுங்கள்", step4_d: "செவிலியர் சரியான நேரத்தில் வந்து சிறந்த சேவையை வழங்குவார்.",

                    faq_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
                    q1: "உங்கள் செவிலியர்கள் தகுதியுள்ளவர்களா?", a1: "ஆம், எமது செவிலியர்கள் அனைவரும் சான்றிதழ் பெற்றவர்கள்.",
                    q2: "உபகரணங்களை நீங்கள் கொண்டு வருவீர்களா?", a2: "அடிப்படை மருத்துவப் பொருட்களைக் கொண்டு வருவோம். சிறப்பு உபகரணங்கள் பற்றி முன்னரே பேச வேண்டும்.",
                    q3: "பணம் செலுத்துவது எப்படி?", a3: "அட்டை, ஆன்லைன் பரிமாற்றம் மூலம் பணம் செலுத்தலாம்.",
                    q4: "அவசர சேவை கிடைக்குமா?", a4: "உயிர் ஆபத்து காலங்களில் உடனடியாக 1990 ஐ அழைக்கவும்.",

                    testimonials_title: "எங்கள் குடும்பங்கள் கூறுவது",
                    testimonials_sub: "எங்களை நம்பிய குடும்பங்களின் உண்மைக் கதைகள்.",
                    post_review: "மதிப்பாய்வைப் பகிரவும்",
                    full_name: "முழு பெயர்",
                    your_role: "உங்கள் பங்கு",
                    select_rating: "மதிப்பீடு",
                    message: "செய்தி",
                    submit_review: "சமர்ப்பிக்கவும்",
                    no_reviews: "இன்னும் மதிப்புரைகள் இல்லை. நீங்களே முதலில் பகிருங்கள்!",

                    wizard_intro: "பதிவு செய்ய படிவத்தை நிரப்பவும். பொருத்தமான செவிலியரை நாங்கள் தேர்வு செய்வோம்.",
                    service: "சேவை", schedule: "கால அட்டவணை", patient_info: "நோயாளி விவரம்", location: "இடம்", review: "மதிப்பாய்வு",
                    next: "அடுத்த படி", back: "பின்னால்", submit_booking: "பதிவு செய்க",
                    patient_name: "நோயாளி பெயர்", age: "வயது", phone: "தொலைபேசி", email: "மின்னஞ்சல்",
                    street: "முகவரி", city: "நகரம்", zip: "அஞ்சல் குறியீடு", special_notes: "குறிப்புகள்"
                }
            }
        }
    });

export default i18n;