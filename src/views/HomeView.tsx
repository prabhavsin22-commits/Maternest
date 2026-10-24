import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Clock,
  ClipboardList,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { Language, GestationalInfo, PregnancyProfile, Article } from '../types';
import { translations } from '../i18n/translations';
import { WEEKS_DATA } from '../data/weeksData';
import { ARTICLES_DATA } from '../data/articlesData';

interface HomeViewProps {
  language: Language;
  gestationalInfo: GestationalInfo;
  profile: PregnancyProfile;
  onSelectTab: (tab: string) => void;
  onOpenDueDatePicker: () => void;
  onOpenGuide: () => void;
  onOpenArticle: (article: Article) => void;
  onSelectWeek: (week: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  gestationalInfo,
  profile,
  onSelectTab,
  onOpenDueDatePicker,
  onOpenGuide,
  onOpenArticle,
  onSelectWeek
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const isHindi = language === 'hi';
  const t = translations[language].hero;

  const currentWeekNum = gestationalInfo.isValid ? Math.min(40, Math.max(1, gestationalInfo.weeks || 20)) : 20;
  const currentWeekData = WEEKS_DATA.find(w => w.week === currentWeekNum) || WEEKS_DATA[19];

  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  const faqs = isHindi
    ? [
        {
          q: 'प्रसव की अनुमानित तिथि (Due Date) की गणना कैसे की जाती है?',
          a: 'हम अंतरराष्ट्रीय प्रसूति मानक नेगल के नियम (Naegele’s Rule) का उपयोग करते हैं: आपकी अंतिम माहवारी के पहले दिन (LMP) में 280 दिन (40 सप्ताह) जोड़े जाते हैं। चक्र की अवधि (Cycle Length) के अनुसार इसमें उपयुक्त समायोजन किया जाता है। ध्यान रखें कि केवल 4-5% बच्चे नियत तारीख पर ही जन्म लेते हैं; 37 से 42 सप्ताह के बीच प्रसव पूर्णतः सामान्य माना जाता है।'
        },
        {
          q: 'क्या गर्भावस्था में अल्ट्रासाउंड स्कैन सुरक्षित हैं?',
          a: 'हाँ, प्रसूति संबंधी अल्ट्रासाउंड पूरी तरह सुरक्षित हैं। इनमें कोई हानिकारक एक्स-रे या रेडिएशन नहीं होता, बल्कि ध्वनि तरंगों (Sound Waves) का उपयोग किया जाता है। स्वास्थ्य मंत्रालय (MoHFW) और WHO के दिशानिर्देशों के अनुसार गर्भावस्था में कम से कम 3-4 महत्वपूर्ण स्कैन (डेटिंग, एनटी स्कैन, लेवल-2 अनोमली स्कैन और ग्रोथ स्कैन) अवश्य कराए जाने चाहिए।'
        },
        {
          q: 'क्या MaternaNest का उपयोग करने के लिए पंजीकरण या अकाउंट बनाना अनिवार्य है?',
          a: 'नहीं! आप बिना किसी अकाउंट या लॉगिन के सभी 40 सप्ताह के विकास विवरण, शैक्षिक पुस्तकालय और क्लिनिकल टूल्स का उपयोग कर सकते हैं। जब आप अपनी तारीखें, डायरी या अपॉइंटमेंट दर्ज करते हैं, तो वे आपके अपने ब्राउज़र में सुरक्षित रूप से सहेजे जाते हैं।'
        },
        {
          q: 'प्रसव दर्द में 5-1-1 नियम क्या है?',
          a: 'यह अस्पताल जाने का एक स्वीकृत चिकित्सकीय मानक है: जब संकुचन हर 5 मिनट में आ रहे हों, कम से कम 1 मिनट (60 सेकंड) तक खिंचते हों, और यह सिलसिला लगातार 1 घंटे तक बना रहे, तो यह सक्रिय प्रसव का संकेत है और तुरंत अस्पताल जाना चाहिए।'
        }
      ]
    : [
        {
          q: 'How is the Estimated Due Date (EDD) calculated?',
          a: 'We use the clinically verified Naegele’s Rule: 280 days (40 weeks) from the first day of your last menstrual period (LMP), adjusted for your personal cycle length. Remember, an EDD is an estimation—only ~4-5% of babies deliver on the exact date; delivery between 37 and 42 weeks is completely normal.'
        },
        {
          q: 'Are prenatal ultrasounds safe for my developing baby?',
          a: 'Yes, prenatal ultrasounds utilize high-frequency sound waves, not ionizing radiation. Major international bodies including ISUOG, WHO, and FOGSI consider diagnostic ultrasound safe. Standard care includes dating scans, the 11-13 week NT scan, and the comprehensive 18-20 week anomaly scan.'
        },
        {
          q: 'Do I need to create an account or provide an email to use MaternaNest?',
          a: 'No! MaternaNest is built with strict privacy and guest-first architecture. You can explore all 40 weeks of fetal development, browse peer-reviewed articles, and utilize our contraction & kick tools immediately without handing over personal contact details.'
        },
        {
          q: 'What is the 5-1-1 guideline for knowing when to go to the hospital?',
          a: 'The 5-1-1 rule advises heading to the maternity hospital when contractions consistently occur every 5 minutes (from start to start), last for 1 full minute (60 seconds), for at least 1 hour. Always bypass this and go immediately if your water breaks or if bleeding occurs.'
        }
      ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F6F0E6] via-[#FAF6F0] to-[#FAF6F0] pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#E8DFD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4958]/10 text-[#1B4958] text-xs font-semibold tracking-wide border border-[#1B4958]/20">
                <ShieldCheck className="w-4 h-4 text-[#D97757]" />
                <span>{t.badge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-[#1B4958] leading-[1.18]">
                {t.title}
              </h1>

              <p className="text-base sm:text-lg text-[#55606E] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={onOpenDueDatePicker}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1B4958] hover:bg-[#123844] text-white font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-[#FAD2C0]" />
                  <span>{t.calculateBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTab('tracker')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F4EEE4] text-[#1B4958] border border-[#D5C6B5] font-medium text-sm transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#D97757]" />
                  <span>{t.exploreBtn}</span>
                </button>
              </div>

              <p className="text-xs text-[#8A7969] flex items-center justify-center lg:justify-start gap-1.5 pt-1">
                <span>{t.guestNotice}</span>
              </p>
            </div>

            {/* Right Card: Gestational Milestone & Baby Size Spotlight */}
            <div className="lg:col-span-5">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#E3D7C7] p-6 sm:p-7 shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97757]/10 rounded-full blur-2xl -mr-10 -mt-10" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#1B4958] text-white text-xs font-bold">
                      {isHindi ? `सप्ताह ${currentWeekNum}` : `Week ${currentWeekNum}`}
                    </span>
                    <span className="text-xs font-semibold text-[#8C7A6B]">
                      {isHindi ? `तिमाही ${currentWeekData.trimester}` : `Trimester ${currentWeekData.trimester}`}
                    </span>
                  </div>
                  <button
                    onClick={onOpenDueDatePicker}
                    className="text-xs font-semibold text-[#D97757] hover:underline"
                  >
                    {isHindi ? 'बदलाव करें' : 'Change Date'}
                  </button>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#718096] mb-1.5">
                    <span>{isHindi ? 'गर्भावस्था यात्रा' : 'Journey Progress'}</span>
                    <span className="font-bold text-[#1B4958]">
                      {gestationalInfo.isValid ? `${gestationalInfo.progressPercentage}%` : '50%'}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-[#EAE0D2] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D97757] to-[#1B4958] rounded-full transition-all duration-500"
                      style={{ width: `${gestationalInfo.isValid ? gestationalInfo.progressPercentage : 50}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8C7A6B] mt-1.5">
                    <span>{isHindi ? 'गर्भाधान' : 'Conception'}</span>
                    <span>
                      {gestationalInfo.isValid ? `${gestationalInfo.daysRemaining} days to EDD` : '40 Weeks'}
                    </span>
                    <span>{isHindi ? 'प्रसव (40W)' : 'Due Date'}</span>
                  </div>
                </div>

                {/* Baby Size Visual Card */}
                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E8DFC2] flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1B4958]/10 border border-[#1B4958]/20 flex items-center justify-center text-3xl shrink-0">
                    👶
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97757]">
                      {isHindi ? 'शिशु का अनुमानित आकार' : 'Baby Size This Week'}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1B4958] leading-tight">
                      {isHindi ? currentWeekData.babySizeFruit.hi : currentWeekData.babySizeFruit.en}
                    </h3>
                    <p className="text-xs text-[#55606E]">
                      {isHindi ? currentWeekData.babySizeComparison.hi : currentWeekData.babySizeComparison.en}
                    </p>
                  </div>
                </div>

                {/* Vital stats row */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E4DACB]">
                    <span className="text-[11px] text-[#718096] block">{isHindi ? 'लंबाई' : 'Length'}</span>
                    <span className="font-serif text-base font-bold text-[#1B4958]">
                      ~{currentWeekData.lengthCm} cm
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E4DACB]">
                    <span className="text-[11px] text-[#718096] block">{isHindi ? 'वजन' : 'Weight'}</span>
                    <span className="font-serif text-base font-bold text-[#1B4958]">
                      ~{currentWeekData.weightGrams >= 1000
                        ? `${(currentWeekData.weightGrams / 1000).toFixed(2)} kg`
                        : `${currentWeekData.weightGrams} g`}
                    </span>
                  </div>
                </div>

                {/* Explore Week CTA */}
                <button
                  onClick={() => {
                    onSelectWeek(currentWeekNum);
                    onSelectTab('tracker');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1B4958] hover:bg-[#123844] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isHindi ? `सप्ताह ${currentWeekNum} का पूरा विवरण देखें` : `View Full Week ${currentWeekNum} Guide`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of MaternaNest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
            {isHindi ? 'हमारा दृष्टिकोण' : 'Why Expectant Families Trust Us'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4958]">
            {isHindi ? 'चिकित्सकीय प्रामाणिकता, सांस्कृतिक अपनापन' : 'Clinical Integrity Meets Cultural Empathy'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E4DACB] space-y-3 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4958]/10 text-[#1B4958] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#1B4958]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'MoHFW व WHO मानक' : 'Public Health Standards'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? 'राष्ट्रीय स्वास्थ्य मिशन, FOGSI और WHO के वैज्ञानिक दिशानिर्देशों पर आधारित। कोई भ्रामक दावे नहीं।'
                : 'Aligned with India’s MoHFW antenatal protocols, Anemia Mukt Bharat IFA guidelines, and WHO maternal standards.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E4DACB] space-y-3 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-[#D97757]/10 text-[#D97757] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-[#D97757]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'भारतीय आहार व परंपरा' : 'Cultural Nutrition & Care'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? 'शाकाहारी प्रोटीन, गर्भावस्था के देसी मिथक बनाम सच, और गर्भ संस्कार के वैज्ञानिक पहलुओं का समावेश।'
                : 'Nuanced Indian dietary guidance, vegetarian iron & protein pairing, and separation of myths (papaya, ghee) from facts.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E4DACB] space-y-3 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-[#5E8271]/10 text-[#5E8271] flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#5E8271]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'व्यावहारिक क्लिनिकल टूल्स' : 'Functional Clinical Tools'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? '5-1-1 नियम वाला कॉन्ट्रैक्शन टाइमर, 10-किक काउंटर और कैलेंडर में डाउनलोड होने वाला अपॉइंटमेंट प्लानर।'
                : 'Mobile-friendly contraction timer with 5-1-1 analysis, count-to-10 kick monitor, and downloadable .ics calendar exports.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E4DACB] space-y-3 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4958]/10 text-[#1B4958] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D97757]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'सुरक्षित MaternaNest AI' : 'MaternaNest AI Guide'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? 'सर्वर-साइड सुरक्षित Gemini AI जो क्लिनिकल मानकों पर प्रश्नों का उत्तर देता है और खतरे के लक्षणों पर सचेत करता है।'
                : 'Server-side Gemini AI assistant with clinical safety rules, emergency triage detection, and source citations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase: 40-Week Timeline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1B4958] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#D97757]/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FAD2C0]">
              {isHindi ? 'सप्ताह दर सप्ताह विकास' : 'Comprehensive 40 Weeks'}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              {isHindi
                ? 'शिशु के अंगों के निर्माण से लेकर पहली सांस तक का पूरा सफ़र'
                : 'From the first heartbeat to holding your baby in your arms.'}
            </h2>
            <p className="text-sm text-[#CAD9DD] leading-relaxed">
              {isHindi
                ? 'प्रत्येक सप्ताह की लंबाई-वजन, फल-तुलना, जरूरी सरकारी टीके व स्कैन, और डॉक्टर से पूछने वाले प्रश्नों की सूची।'
                : 'Explore detailed fetal anatomy, maternal changes, recommended NHS/MoHFW tests, and questions for your doctor for each week.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectTab('tracker')}
                className="px-6 py-3 rounded-xl bg-[#D97757] hover:bg-[#C26244] text-white font-medium text-xs sm:text-sm transition shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>{isHindi ? '40 सप्ताह की समयरेखा देखें' : 'Explore All 40 Weeks'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenGuide}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FAD2C0]" />
                <span>{isHindi ? 'AI गाइड से पूछें' : 'Ask MaternaNest Guide'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Library Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              {isHindi ? 'प्रमाणित ज्ञान केंद्र' : 'Evidence-Based Articles'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4958]">
              {isHindi ? 'डॉक्टरों द्वारा समीक्षित लेख' : 'Clinically Reviewed Guidance'}
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('library')}
            className="text-xs font-bold text-[#1B4958] hover:text-[#D97757] flex items-center gap-1.5 transition"
          >
            <span>{isHindi ? 'सभी लेख देखें' : 'View All Library Topics'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className="bg-white rounded-3xl border border-[#E4DACB] p-6 space-y-4 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#D97757] text-[11px] font-bold uppercase tracking-wider">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-[#718096]">
                    {art.readingTime} min read
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#1B4958] group-hover:text-[#D97757] transition leading-snug">
                  {isHindi ? art.title.hi : art.title.en}
                </h3>

                <p className="text-xs text-[#55606E] line-clamp-3 leading-relaxed">
                  {isHindi ? art.excerpt.hi : art.excerpt.en}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs text-[#8C7A6B]">
                <span className="truncate max-w-[180px]">{art.author}</span>
                <span className="font-semibold text-[#1B4958] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {isHindi ? 'पढ़ें' : 'Read'} &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Practical Features Grid: Planner, Checklists, Contraction Timer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onSelectTab('planner')}
            className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E3D7C7] hover:border-[#1B4958] transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B4958] text-white flex items-center justify-center group-hover:bg-[#D97757] transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'अपॉइंटमेंट और डॉक्टर प्रश्न' : 'Appointment Planner'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? 'स्कैन व ब्लड टेस्ट का शेड्यूल रखें और फोन के कैलेंडर में .ics फाइल डाउनलोड करें।'
                : 'Track upcoming scans and blood tests, attach questions for your doctor, and export .ics files to your calendar.'}
            </p>
            <span className="text-xs font-semibold text-[#1B4958] flex items-center gap-1">
              {isHindi ? 'योजना बनाएं' : 'Open Planner'} &rarr;
            </span>
          </div>

          <div
            onClick={() => onSelectTab('checklists')}
            className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E3D7C7] hover:border-[#1B4958] transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D97757] text-white flex items-center justify-center group-hover:bg-[#1B4958] transition-colors">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'अस्पताल बैग चेकलिस्ट' : 'Hospital Bag Checklist'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? 'माँ, नवजात और साथी के लिए जरूरी सामान की संवादात्मक सूची। नए सामान जोड़ें।'
                : 'Interactive checklists for mother, baby, and partner. Mark items ready and add custom essentials.'}
            </p>
            <span className="text-xs font-semibold text-[#D97757] flex items-center gap-1">
              {isHindi ? 'सूची देखें' : 'View Checklists'} &rarr;
            </span>
          </div>

          <div
            onClick={() => onSelectTab('tools')}
            className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E3D7C7] hover:border-[#1B4958] transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5E8271] text-white flex items-center justify-center group-hover:bg-[#1B4958] transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {isHindi ? 'कॉन्ट्रैक्शन व किक काउंटर' : 'Clinical Mobile Tools'}
            </h3>
            <p className="text-xs text-[#55606E] leading-relaxed">
              {isHindi
                ? '5-1-1 नियम के साथ प्रसव दर्द का समय मापें और 10 किक काउंटर से हलचल ट्रैक करें।'
                : 'Measure contraction frequency with 5-1-1 active labor indicators and count fetal movements with the 10-kick session tool.'}
            </p>
            <span className="text-xs font-semibold text-[#5E8271] flex items-center gap-1">
              {isHindi ? 'टूल्स शुरू करें' : 'Open Tools'} &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
            {isHindi ? 'सामान्य प्रश्न' : 'Clear Answers'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4958]">
            {isHindi ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E4DACB] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-serif text-base font-bold text-[#1B4958] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C7A6B] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#55606E] leading-relaxed border-t border-[#F0E6D8] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
