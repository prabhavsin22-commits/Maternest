import { Language } from '../types';

export const translations = {
  en: {
    nav: {
      brand: 'MaternaNest',
      tagline: 'Nurturing Every Beginning',
      tracker: 'Tracker & Timeline',
      library: 'Education Library',
      planner: 'Appointments',
      checklists: 'Checklists',
      journal: 'My Journal',
      tools: 'Clinical Tools',
      guide: 'MaternaNest Guide',
      profile: 'My Profile',
      guest: 'Guest Mode',
      switchLanguage: 'हिंदी में देखें'
    },
    hero: {
      badge: 'Clinically Grounded • MoHFW & WHO Aligned',
      title: 'Your pregnancy journey, supported at every step.',
      subtitle: 'Explore baby development week by week, access evidence-based education, manage doctor appointments, and prepare for birth in one calm, private space.',
      calculateBtn: 'Calculate My Due Date',
      exploreBtn: 'Explore 40 Weeks',
      guestNotice: 'No registration required to browse verified education and tracking.',
      weekBadge: 'Week {week}',
      dayBadge: 'Day {day}',
      trimesterBadge: 'Trimester {trimester}',
      daysLeft: '{days} days until estimated due date'
    },
    disclaimer: {
      barTitle: 'Clinical Educational Notice:',
      barText: 'MaternaNest is designed for pregnancy education and tracking. It does not provide medical diagnosis or replace personalized care from a qualified obstetrician.',
      emergencyHelpline: 'Emergency Services: 108 / 102 (India) | Always call your maternity hospital for urgent symptoms.'
    },
    tracker: {
      title: 'Pregnancy Week-by-Week Timeline',
      subtitle: 'From microscopic cell division to holding your baby: understand key anatomical milestones, recommended prenatal tests, and daily body changes.',
      sizeTitle: 'Baby Size Comparison',
      length: 'Est. Length',
      weight: 'Est. Weight',
      developmentTitle: 'Fetal Development This Week',
      maternalTitle: 'Changes in Your Body',
      testsTitle: 'Clinical Scans & MoHFW Guidance',
      doctorQuestionsTitle: 'Questions for Your Next Doctor Visit',
      warningSignsTitle: 'Red Flags: When to Contact Doctor Immediately',
      reviewedBy: 'Clinically Reviewed By',
      selectWeek: 'Select Week',
      allTrimesters: 'All Weeks (1-40)',
      trimester1: '1st Trimester (Wks 1-13)',
      trimester2: '2nd Trimester (Wks 14-27)',
      trimester3: '3rd Trimester (Wks 28-40+)'
    },
    library: {
      title: 'Evidence-Based Educational Library',
      subtitle: 'Carefully curated, peer-reviewed medical and wellness articles respecting international standards and Indian maternal health guidelines.',
      searchPlaceholder: 'Search topics, symptoms, diet, tests (e.g., IFA, ultrasound, iron)...',
      categories: {
        all: 'All Topics',
        development: 'Fetal Development',
        nutrition: 'Nutrition & Diet',
        prenatal: 'Prenatal Care & Scans',
        activity: 'Safe Activity & Yoga',
        labour: 'Labour & Delivery',
        breastfeeding: 'Breastfeeding & Lactation',
        newborn: 'Newborn Care',
        postpartum: 'Postpartum & Mental Health',
        traditions: 'Indian Wellness Traditions',
        glossary: 'Medical Glossary'
      },
      readTime: '{min} min read',
      sourcesLabel: 'Authoritative Medical Sources:',
      reviewedOn: 'Last Reviewed:',
      readMore: 'Read Full Article',
      bookmark: 'Bookmark',
      bookmarked: 'Saved'
    },
    planner: {
      title: 'Prenatal Appointment Planner',
      subtitle: 'Never miss an ultrasound scan, glucose screening, or doctor consultation. Sync directly with your calendar.',
      addBtn: 'Schedule New Appointment',
      upcomingTab: 'Upcoming Visits',
      pastTab: 'Past Checkups',
      exportIcs: 'Download Calendar (.ics)',
      emptyUpcoming: 'No upcoming appointments scheduled yet.',
      emptyPast: 'No completed appointments recorded.',
      questionsLabel: 'Questions to Ask Doctor:',
      addQuestionPlaceholder: 'Type a question and press Enter...',
      markDone: 'Mark as Completed',
      markPending: 'Mark as Pending',
      delete: 'Delete'
    },
    checklists: {
      title: 'Pregnancy & Birth Checklists',
      subtitle: 'Comprehensive, interactive packing and preparation guides for you, your baby, and your birth partner.',
      tabs: {
        mom: 'Hospital Bag: Mother',
        baby: 'Hospital Bag: Baby',
        partner: 'Hospital Bag: Partner',
        birthPrep: 'Birth Preparation',
        essentials: 'Newborn Essentials'
      },
      progress: '{completed} of {total} items ready ({percent}%)',
      addItemPlaceholder: 'Add custom item...',
      addBtn: 'Add Item',
      resetBtn: 'Reset Checklist'
    },
    journal: {
      title: 'My Pregnancy Journal & Milestones',
      subtitle: 'A private space to chronicle your emotions, physical symptoms, baby kicks, and cherished memories.',
      newEntryBtn: 'Write New Entry',
      moods: {
        peaceful: 'Peaceful & Calm',
        joyful: 'Happy & Joyful',
        tired: 'Tired & Resting',
        anxious: 'Need Reassurance',
        excited: 'Excited & Eager',
        nauseous: 'Experiencing Nausea'
      },
      empty: 'No journal entries recorded yet. Begin documenting your thoughts today.',
      symptomsRecorded: 'Symptoms:',
      bumpSize: 'Belly circumference: {cm} cm',
      milestone: 'Milestone Celebrated:',
      deleteBtn: 'Delete Entry',
      printJournal: 'Print / Export Journal'
    },
    tools: {
      title: 'Educational Clinical Tools',
      subtitle: 'Simple, responsive measurement tools designed for mobile and desktop tracking.',
      disclaimer: 'Notice: These tools are strictly for personal observation and recordkeeping. They do not diagnose labor, fetal compromise, or replace medical care.',
      contraction: {
        title: 'Contraction Timer',
        desc: 'Track contraction frequency and duration to help know when labor is progressing.',
        start: 'Start Contraction',
        stop: 'Stop Contraction',
        ruleTitle: 'The 5-1-1 Clinical Guideline:',
        ruleText: 'If your contractions occur every 5 minutes, last for 1 minute, for at least 1 hour, it is typically time to call your maternity hospital.',
        alert511: 'Notice: Your recent pattern matches active labor indicators. Call your doctor or hospital labor ward.',
        historyTitle: 'Contraction History',
        clear: 'Reset Session',
        durationCol: 'Duration',
        intervalCol: 'Interval (Frequency)'
      },
      kicks: {
        title: 'Fetal Movement (Kick) Counter',
        desc: 'Clinically recommended "Count to 10" tool to monitor your baby\'s vitality in the third trimester.',
        recordKick: 'Tap for Each Movement / Kick',
        kicksCounted: '{count} of 10 movements felt',
        guideline: 'Standard Guideline: Healthy fetuses typically achieve 10 distinct movements within 2 hours during active periods.',
        startBtn: 'Start New 10-Kick Session',
        sessionDone: '10 movements completed in {min} minutes! Baby is actively moving.',
        warningText: 'If you notice significantly decreased movements or fewer than 10 kicks within 2 hours, drink water, lie on your left side, and if movements still don\'t resume, contact your maternity unit immediately.'
      }
    },
    guide: {
      title: 'MaternaNest Guide',
      subtitle: 'Evidence-Based Pregnancy AI Assistant',
      disclaimer: 'Grounded in MoHFW India, WHO & ACOG standards. Always consult your obstetrician for personal medical care.',
      placeholder: 'Ask an educational question (e.g. Can I eat papaya? Safe sleep positions? What is NT scan?)...',
      send: 'Ask Guide',
      sources: 'Referenced Medical Sources',
      suggestedQuestions: [
        'Is it safe to eat ripe papaya during pregnancy in India?',
        'What should I expect during the 20-week anomaly scan?',
        'How can I naturally manage morning sickness and nausea?',
        'What are the warning signs that need immediate doctor care?'
      ]
    },
    profileModal: {
      title: 'Pregnancy Profile & Privacy Settings',
      nameLabel: 'Your Name',
      calcMethodLabel: 'Calculation Method',
      lmpOption: 'First Day of Last Menstrual Period (LMP)',
      eddOption: 'Known Estimated Due Date (EDD)',
      cycleLabel: 'Average Menstrual Cycle Length (Days)',
      partnerLabel: 'Partner / Support Person Name',
      bloodLabel: 'Maternal Blood Group & Rh Factor',
      doctorLabel: 'Doctor / Gynecologist Name & Phone',
      hospitalLabel: 'Preferred Maternity Hospital / Clinic',
      emergencyLabel: 'Emergency Contact Phone Number',
      saveBtn: 'Save Pregnancy Profile',
      privacyNote: 'Privacy Assurance: All your entries, notes, and records are stored securely in your browser. We never sell health data or display third-party advertisements.',
      exportDataBtn: 'Export All My Data (JSON)',
      clearDataBtn: 'Delete All Local Data & Reset',
      clearConfirm: 'Are you sure you want to permanently erase all local journal entries, appointments, and checklists?'
    }
  },
  hi: {
    nav: {
      brand: 'MaternaNest',
      tagline: 'मातृत्व का सुरक्षित और सुंदर सफर',
      tracker: 'ट्रैकर और समयरेखा',
      library: 'ज्ञान केंद्र (लेख)',
      planner: 'डॉक्टर अपॉइंटमेंट',
      checklists: 'तैयारी सूचियाँ',
      journal: 'मेरी डायरी',
      tools: 'क्लीनिकल टूल्स',
      guide: 'MaternaNest गाइड',
      profile: 'मेरी प्रोफ़ाइल',
      guest: 'गेस्ट मोड',
      switchLanguage: 'View in English'
    },
    hero: {
      badge: 'चिकित्सकीय मार्गदर्शन • MoHFW और WHO मानकों पर आधारित',
      title: 'मातृत्व का यह सुंदर सफ़र, हर कदम पर आपके साथ।',
      subtitle: 'सप्ताह दर सप्ताह शिशु का विकास देखें, प्रामाणिक स्वास्थ्य शिक्षा पाएं, डॉक्टर की जांच का समय व्यवस्थित करें और शांत मन से प्रसव की तैयारी करें।',
      calculateBtn: 'प्रसव की अनुमानित तिथि जानें',
      exploreBtn: '40 सप्ताह की यात्रा देखें',
      guestNotice: 'बिना किसी पंजीकरण के सभी प्रमाणित शैक्षिक लेख व ट्रैकर उपलब्ध हैं।',
      weekBadge: 'सप्ताह {week}',
      dayBadge: 'दिन {day}',
      trimesterBadge: 'तिमाही {trimester}',
      daysLeft: 'अनुमानित प्रसव तक {days} दिन शेष'
    },
    disclaimer: {
      barTitle: 'चिकित्सकीय सूचना:',
      barText: 'MaternaNest केवल गर्भावस्था शिक्षा और रिकॉर्ड रखने के लिए है। यह किसी डॉक्टर के व्यक्तिगत परामर्श या उपचार का विकल्प नहीं है।',
      emergencyHelpline: 'आपातकालीन सहायता: 108 / 102 (भारत) | किसी भी गंभीर लक्षण पर तुरंत अपने अस्पताल से संपर्क करें।'
    },
    tracker: {
      title: 'सप्ताह-दर-सप्ताह गर्भावस्था यात्रा',
      subtitle: 'सूक्ष्म कोशिका से नन्हे शिशु तक: जानिए बच्चे के अंगों का विकास, आवश्यक सरकारी टीके व जांच और शरीर में होने वाले स्वाभाविक बदलाव।',
      sizeTitle: 'शिशु का आकार (फल/सब्जी तुलना)',
      length: 'अनुमानित लंबाई',
      weight: 'अनुमानित वजन',
      developmentTitle: 'इस सप्ताह शिशु में विकास',
      maternalTitle: 'माँ के शरीर में बदलाव',
      testsTitle: 'जरूरी जांच और सरकारी दिशानिर्देश',
      doctorQuestionsTitle: 'डॉक्टर से पूछने योग्य जरूरी सवाल',
      warningSignsTitle: 'खतरे के लक्षण: तुरंत डॉक्टर से मिलें',
      reviewedBy: 'चिकित्सकीय समीक्षा कर्ता',
      selectWeek: 'सप्ताह चुनें',
      allTrimesters: 'सभी सप्ताह (1-40)',
      trimester1: 'पहली तिमाही (सप्ताह 1-13)',
      trimester2: 'दूसरी तिमाही (सप्ताह 14-27)',
      trimester3: 'तीसरी तिमाही (सप्ताह 28-40+)'
    },
    library: {
      title: 'प्रमाणित गर्भावस्था एवं शिशु ज्ञान केंद्र',
      subtitle: 'भारतीय स्वास्थ्य मंत्रालय (MoHFW), FOGSI और WHO के वैज्ञानिक मानकों पर आधारित विश्वसनीय लेख।',
      searchPlaceholder: 'विषय खोजें (जैसे: फोलिक एसिड, खान-पान, अल्ट्रासाउंड, आयरन)...',
      categories: {
        all: 'सभी विषय',
        development: 'शिशु विकास',
        nutrition: 'आहार एवं पोषण',
        prenatal: 'गर्भावस्था जांच व टीके',
        activity: 'सुरक्षित व्यायाम व योग',
        labour: 'प्रसव और डिलीवरी',
        breastfeeding: 'स्तनपान और पोषण',
        newborn: 'नवजात शिशु की देखभाल',
        postpartum: 'प्रसवोपरांत देखभाल व मानसिक स्वास्थ्य',
        traditions: 'गर्भ संस्कार एवं भारतीय परंपरा',
        glossary: 'चिकित्सा शब्दावली'
      },
      readTime: '{min} मिनट का पठन',
      sourcesLabel: 'प्रमाणित स्रोत:',
      reviewedOn: 'अंतिम समीक्षा:',
      readMore: 'पूरा लेख पढ़ें',
      bookmark: 'सुरक्षित रखें',
      bookmarked: 'सहेजा गया'
    },
    planner: {
      title: 'डॉक्टर विज़िट और चेकअप प्लानर',
      subtitle: 'अल्ट्रासाउंड स्कैन, ब्लड टेस्ट और डॉक्टर की मुलाक़ात का पूरा हिसाब रखें। अपने फोन कैलेंडर में डाउनलोड करें।',
      addBtn: 'नया अपॉइंटमेंट जोड़ें',
      upcomingTab: 'आगामी मुलाकातें',
      pastTab: 'पिछली जांचें',
      exportIcs: 'कैलेंडर डाउनलोड करें (.ics)',
      emptyUpcoming: 'कोई आगामी अपॉइंटमेंट निर्धारित नहीं है।',
      emptyPast: 'कोई पुरानी मुलाकात दर्ज नहीं है।',
      questionsLabel: 'डॉक्टर से पूछने के लिए सवाल:',
      addQuestionPlaceholder: 'सवाल लिखें और एंटर दबाएं...',
      markDone: 'संपन्न चिह्नित करें',
      markPending: 'लंबित रखें',
      delete: 'हटाएं'
    },
    checklists: {
      title: 'प्रसव व अस्पताल तैयारी चेकलिस्ट',
      subtitle: 'माँ, नवजात शिशु और पिता/साथी के लिए अस्पताल ले जाने वाले जरूरी सामान की सम्पूर्ण सूची।',
      tabs: {
        mom: 'अस्पताल बैग: माँ के लिए',
        baby: 'अस्पताल बैग: शिशु के लिए',
        partner: 'अस्पताल बैग: साथी के लिए',
        birthPrep: 'प्रसव की पूर्व तैयारी',
        essentials: 'नवजात की आवश्यक वस्तुएं'
      },
      progress: '{total} में से {completed} वस्तुएं तैयार ({percent}%)',
      addItemPlaceholder: 'अपनी पसंद का सामान जोड़ें...',
      addBtn: 'जोड़ें',
      resetBtn: 'रीसेट करें'
    },
    journal: {
      title: 'मेरी मातृत्व डायरी और यादगार पल',
      subtitle: 'अपनी भावनाओं, शारीरिक लक्षणों, पहली हलचल और सुंदर पलों को सुरक्षित रूप से संजोएं।',
      newEntryBtn: 'नई प्रविष्टि लिखें',
      moods: {
        peaceful: 'शांत एवं प्रसन्न',
        joyful: 'अत्यंत खुश',
        tired: 'थकान व विश्राम',
        anxious: 'चिंता या बेचैनी',
        excited: 'उत्साहित',
        nauseous: 'उल्टी/मतली का अहसास'
      },
      empty: 'अभी कोई डायरी प्रविष्टि नहीं है। आज ही अपने विचार लिखना शुरू करें।',
      symptomsRecorded: 'लक्षण:',
      bumpSize: 'पेट का घेराव: {cm} सेमी',
      milestone: 'सुंदर याद/मील का पत्थर:',
      deleteBtn: 'हटाएं',
      printJournal: 'प्रिंट / डायरी एक्सपोर्ट करें'
    },
    tools: {
      title: 'क्लीनिकल टूल्स (दैनिक उपयोग)',
      subtitle: 'मोबाइल और कंप्यूटर दोनों के लिए आसान व उपयोगी ट्रैकिंग टूल्स।',
      disclaimer: 'सूचना: ये उपकरण व्यक्तिगत अवलोकन के लिए हैं। ये किसी बीमारी का निदान नहीं करते और न ही डॉक्टर की जांच का स्थान लेते हैं।',
      contraction: {
        title: 'संकुचन (कॉन्ट्रैक्शन) टाइमर',
        desc: 'प्रसव दर्द की अवधि और बारंबारता मापें ताकि अस्पताल जाने का सही समय समझ सकें।',
        start: 'संकुचन शुरू',
        stop: 'संकुचन समाप्त',
        ruleTitle: '5-1-1 नियम (सक्रिय प्रसव का संकेत):',
        ruleText: 'यदि संकुचन हर 5 मिनट में आते हैं, 1 मिनट तक चलते हैं और यह क्रम 1 घंटे तक जारी रहता है, तो अस्पताल जाने का समय हो चुका है।',
        alert511: 'सावधानी: आपका पैटर्न सक्रिय प्रसव का संकेत दे रहा है। तुरंत अपने अस्पताल या डॉक्टर से संपर्क करें।',
        historyTitle: 'संकुचन इतिहास',
        clear: 'इतिहास साफ़ करें',
        durationCol: 'अवधि',
        intervalCol: 'अंतराल (बारंबारता)'
      },
      kicks: {
        title: 'शिशु हलचल (किक) काउंटर',
        desc: 'तीसरी तिमाही में शिशु के स्वास्थ्य की निगरानी के लिए डॉक्टर द्वारा अनुशंसित 10 किक काउंटर।',
        recordKick: 'प्रत्येक हलचल / लात पर टैप करें',
        kicksCounted: '10 में से {count} हलचलें महसूस हुईं',
        guideline: 'मानक निर्देश: सक्रिय समय में शिशु आमतौर पर 2 घंटे के भीतर 10 बार हलचल करता है।',
        startBtn: 'नया 10-किक सत्र शुरू करें',
        sessionDone: '10 हलचलें {min} मिनट में पूरी हुईं! शिशु सक्रिय और स्वस्थ है।',
        warningText: 'यदि हलचल सामान्य से बहुत कम लगे या 2 घंटे में 10 बार न हो, तो थोड़ा ठंडा पानी पिएं, बाईं करवट लेटें और यदि फिर भी हलचल न बढ़े तो तुरंत अपने डॉक्टर या मैटरनिटी यूनिट से संपर्क करें।'
      }
    },
    guide: {
      title: 'MaternaNest गाइड',
      subtitle: 'प्रमाणित गर्भावस्था AI सहायक',
      disclaimer: 'MoHFW भारत, WHO एवं FOGSI मानकों पर आधारित। व्यक्तिगत चिकित्सकीय सलाह के लिए सदैव अपने डॉक्टर से संपर्क करें।',
      placeholder: 'गर्भावस्था से जुड़ा सवाल पूछें (उदा. पपीता खाना सुरक्षित है? सोने की सही स्थिति? अल्ट्रासाउंड कब होता है?)...',
      send: 'सवाल पूछें',
      sources: 'संदर्भित प्रामाणिक स्रोत',
      suggestedQuestions: [
        'क्या गर्भावस्था में पपीता खाना सुरक्षित है?',
        '20वें सप्ताह के अनोमली (लेवल-2) स्कैन में क्या देखा जाता है?',
        'मॉर्निंग सिकनेस और उल्टी से कैसे राहत पाएं?',
        'किन लक्षणों के दिखने पर तुरंत इमरजेंसी में जाना चाहिए?'
      ]
    },
    profileModal: {
      title: 'गर्भावस्था प्रोफ़ाइल एवं गोपनीयता सेटिंग्स',
      nameLabel: 'आपका नाम',
      calcMethodLabel: 'गणना का तरीका',
      lmpOption: 'अंतिम माहवारी का पहला दिन (LMP)',
      eddOption: 'डॉक्टर द्वारा दी गई अनुमानित तिथि (EDD)',
      cycleLabel: 'माहवारी चक्र की औसत अवधि (दिन)',
      partnerLabel: 'पति / साथी का नाम',
      bloodLabel: 'माँ का ब्लड ग्रुप और आरएच फैक्टर (Rh Factor)',
      doctorLabel: 'डॉक्टर का नाम और फोन नंबर',
      hospitalLabel: 'अस्पताल / मैटरनिटी सेंटर का नाम',
      emergencyLabel: 'आपातकालीन संपर्क नंबर',
      saveBtn: 'प्रोफ़ाइल सहेजें',
      privacyNote: 'गोपनीयता की गारंटी: आपका पूरा डेटा आपके अपने ब्राउज़र में सुरक्षित रहता है। हम कभी भी स्वास्थ्य डेटा नहीं बेचते और न ही विज्ञापन दिखाते हैं।',
      exportDataBtn: 'मेरा सारा डेटा डाउनलोड करें (JSON)',
      clearDataBtn: 'सारा डेटा मिटाएं व रीसेट करें',
      clearConfirm: 'क्या आप सचमुच अपनी डायरी, मुलाक़ातें और सूचियाँ हमेशा के लिए मिटाना चाहते हैं?'
    }
  }
};
