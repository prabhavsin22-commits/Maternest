import { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-1',
    slug: 'indian-pregnancy-diet-essentials',
    category: 'nutrition',
    title: {
      en: 'Balanced Indian Nutrition in Pregnancy: Iron, Protein, and Cultural Myths vs Science',
      hi: 'गर्भावस्था में संतुलित भारतीय आहार: आयरन, प्रोटीन और खान-पान से जुड़े भ्रम बनाम वैज्ञानिक सच'
    },
    excerpt: {
      en: 'A practical, evidence-based guide to nourishing mother and baby with traditional Indian foods, managing anemia, and separating myths like papaya and desi ghee from clinical reality.',
      hi: 'पारंपरिक भारतीय भोजन से पोषण, एनीमिया से बचाव और पपीता व घी से जुड़े मिथकों की वैज्ञानिक पड़ताल।'
    },
    content: {
      en: `### The Foundations of Maternal Nutrition

During pregnancy, nutrient needs increase to support rapid fetal cell growth, the developing placenta, and maternal blood volume expansion (up to 50%). Rather than "eating for two" in quantity, focus on nutrient density.

#### 1. Preventing Anemia: The Iron Imperative
Maternal anemia affects over 50% of pregnant women in India. The Ministry of Health and Family Welfare (MoHFW) under the **Anemia Mukt Bharat** initiative mandates:
- **Daily Iron and Folic Acid (IFA) Tablets:** 100 mg elemental iron and 500 mcg folic acid starting after the first trimester (from week 14 onward), continued for at least 180 days during pregnancy and 180 days postpartum.
- **Dietary Iron Sources:** Green leafy vegetables (methi, palak, chaulai), soaked figs (anjeer), dates (khajoor), pomegranate, roasted chana, and lentils.
- **The Vitamin C Absorption Secret:** Non-heme (plant) iron is best absorbed in an acidic environment. Always squeeze fresh lemon (nimbu) over your dal or salads, and avoid drinking tea or coffee within 1 hour of meals, as tannins inhibit iron absorption by up to 60%.

#### 2. Quality Vegetarian Protein
For vegetarian mothers, protein is vital for fetal brain and organ development:
- Pair cereals with pulses (such as khichdi or dal-chawal) to create complete amino acid profiles.
- Incorporate paneer (cottage cheese), fresh homemade curd (dahi), sattu, sprouted moong, and roasted makhana (fox nuts).
- Aim for 60 to 75 grams of protein daily throughout the second and third trimesters.

#### 3. De-bunking Common Indian Dietary Myths
- **Myth 1: "Eating papaya causes immediate miscarriage."**
  *The Science:* Ripe yellow/orange papaya is rich in vitamins A, C, and fiber and is safe in moderation. However, **unripe (raw green) or semi-ripe papaya** contains high concentrations of latex and papain, which can trigger uterine contractions and should be avoided during pregnancy.
- **Myth 2: "Drinking glasses of desi ghee lubricates the birth canal for normal delivery."**
  *The Science:* Desi ghee is digested in the stomach and intestines; it does not travel to or "lubricate" the vagina or uterus. While 1-2 teaspoons of ghee provides healthy fats and fat-soluble vitamins, drinking excessive bowls of ghee leads to unhealthy maternal weight gain and severe heartburn.
- **Myth 3: "Saffron (kesar) milk guarantees a fair-complexioned baby."**
  *The Science:* Fetal skin pigmentation is determined strictly by parental genetics and melanin production, not by foods consumed. A strand or two of saffron adds warmth and aroma, but has zero effect on baby's complexion.

#### 4. The Calcium & Spacing Rule
Fetal bones demand high calcium, especially in the 3rd trimester (1,000 mg/day). If taking both Calcium and Iron supplements, take them **at least 2-3 hours apart** (e.g., Calcium after breakfast, Iron after lunch/dinner). Calcium directly blocks iron absorption if swallowed together.`,
      hi: `### गर्भावस्था में पोषण के वैज्ञानिक आधार

गर्भावस्था के दौरान शरीर में लगभग 50% अधिक रक्त बनता है। इसलिए केवल ज्यादा खाने की जगह पौष्टिक और संतुलित भोजन लेना अत्यंत आवश्यक है।

#### 1. एनीमिया (खून की कमी) से बचाव
भारत सरकार के स्वास्थ्य और परिवार कल्याण मंत्रालय (MoHFW) के 'एनीमिया मुक्त भारत' अभियान के अनुसार:
- 14वें सप्ताह के बाद प्रतिदिन एक आयरन और फोलिक एसिड (IFA) की गोली कम से कम 180 दिनों तक लेना अनिवार्य है।
- **आहार:** पालक, मेथी, अनार, खजूर, भुना चना और दालें।
- **विटामिन सी का महत्व:** दाल या सलाद पर नींबू निचोड़ें; इससे पौधों से मिलने वाला आयरन शरीर में तेजी से सोखता है। चाय और कॉफी खाने के तुरंत बाद न पिएं।

#### 2. शाकाहारी माताओं के लिए प्रोटीन
- दाल-चावल या खिचड़ी का संयोजन पूर्ण प्रोटीन देता है।
- पनीर, ताजा दही, स्प्राउट्स और भुने मखाने का नियमित सेवन करें।

#### 3. भारतीय खान-पान के प्रचलित भ्रम और वैज्ञानिक सच
- **भ्रम 1: पपीता खाने से गर्भपात हो जाता है?**
  *सच्चाई:* पूरी तरह पका हुआ पीला पपीता सीमित मात्रा में खाना सुरक्षित है। लेकिन **कच्चा या अधपका हरा पपीता** बिल्कुल न खाएं, क्योंकि इसके लेटेक्स से गर्भाशय में संकुचन हो सकता है।
- **भ्रम 2: ज्यादा देसी घी पीने से डिलीवरी आसानी से होती है?**
  *सच्चाई:* घी पेट में पचता है, यह बच्चेदानी में नहीं जाता। 1-2 चम्मच घी सेहत के लिए ठीक है, लेकिन ज्यादा घी पीने से केवल वजन बढ़ता है और सीने में जलन होती है।
- **भ्रम 3: केसर दूध से बच्चा गोरा होता है?**
  *सच्चाई:* बच्चे का रंग केवल माता-पिता के जीन्स पर निर्भर करता है, किसी भी खाद्य पदार्थ से बच्चे का रंग नहीं बदलता।`
    },
    readingTime: '5',
    author: 'Dr. Anita Sen, Senior Obstetrician',
    sources: [
      'Ministry of Health and Family Welfare (MoHFW), Govt. of India - Anemia Mukt Bharat Guidelines',
      'World Health Organization (WHO) - Nutritional Interventions for Antenatal Care',
      'National Institute of Nutrition (ICMR-NIN) - Dietary Guidelines for Indians'
    ],
    lastReviewed: 'October 2026',
    tags: ['Nutrition', 'Iron', 'Indian Diet', 'MythBusting'],
    isFeatured: true
  },
  {
    id: 'art-2',
    slug: 'essential-ultrasounds-and-antenatal-scans',
    category: 'prenatal',
    title: {
      en: 'The Essential Pregnancy Scans: Dating, NT Scan, and the 20-Week Anomaly Scan',
      hi: 'गर्भावस्था के जरूरी अल्ट्रासाउंड: डेटिंग, एनटी स्कैन और 20वें सप्ताह का अनोमली स्कैन'
    },
    excerpt: {
      en: 'Understand what each ultrasound checks for, from verifying the heartbeat at 7 weeks to detailed structural examinations of baby’s brain, heart, and spine.',
      hi: 'जानिए हर अल्ट्रासाउंड का सही समय, उद्देश्य और बच्चे के अंगों की जांच से जुड़ी महत्वपूर्ण बातें।'
    },
    content: {
      en: `### Why Prenatal Ultrasound is Safe and Vital

Ultrasound uses high-frequency sound waves (not radiation) to visualize the developing fetus, placenta, and amniotic fluid. In clinical practice, 3-4 structured scans are recommended for a routine low-risk pregnancy.

#### 1. Dating / Viability Scan (Weeks 6 to 9)
- **Primary Goal:** Confirms that the pregnancy is safely located inside the uterus (ruling out an ectopic pregnancy in the fallopian tubes).
- **Key Observation:** Visualizes the embryonic pole, fetal heartbeat (normal 110-160 bpm), and calculates gestational age through Crown-Rump Length (CRL).
- **Accuracy:** The CRL measured in this early window is the most accurate baseline for your Estimated Due Date (EDD).

#### 2. Nuchal Translucency (NT) Scan & Combined Screening (Weeks 11 to 13+6 days)
- **Primary Goal:** Measures the tiny fluid-filled space at the back of the baby’s neck (nuchal translucency).
- **Associated Blood Test:** Combined with a maternal blood test measuring Free beta-hCG and PAPP-A (Dual Marker).
- **Clinical Role:** Screens for chromosomal conditions (including Down syndrome, Trisomy 18, and Trisomy 13) and early structural heart anomalies.
- **Normal Range:** Generally under 3.0 mm (dependent on exact gestational age).

#### 3. The Level-II Anomaly Scan / TIFFA (Weeks 18 to 20)
This is the most comprehensive anatomical checkup of your pregnancy:
- **Brain & Spine:** Evaluates brain ventricles, cerebellum, and full spinal column integrity.
- **Heart:** Detailed examination of the four cardiac chambers, outflow tracts, and rhythm.
- **Kidneys & Bladder:** Confirms presence and drainage of both kidneys and bladder filling.
- **Limbs & Face:** Confirms upper and lower extremities, fingers, and intact upper lip (ruling out cleft lip).
- **Placenta & Cervix:** Notes placental position (anterior, posterior, fundal, or low-lying placenta previa) and measures cervical length.

#### 4. Growth & Well-being Doppler Scan (Weeks 30 to 36)
- Measures estimated fetal weight (EFW), growth velocity percentiles, amniotic fluid index (AFI), and placental blood flow via umbilical artery Doppler.`,
      hi: `### अल्ट्रासाउंड क्यों सुरक्षित और जरूरी है

अल्ट्रासाउंड में किसी भी हानिकारक रेडिएशन का प्रयोग नहीं होता; यह केवल ध्वनि तरंगों (Sound Waves) पर आधारित होता है।

#### 1. पहला डेटिंग स्कैन (सप्ताह 6 से 9)
- गर्भ में भ्रूण की धड़कन और सही स्थान की पुष्टि करता है।
- एक्टोपिक प्रेग्नेंसी (ट्यूब में गर्भ) के खतरे को खारिज करता है।
- बच्चे की लंबाई (CRL) से प्रसव की सटीक तारीख तय की जाती है।

#### 2. एनटी (NT) स्कैन (सप्ताह 11 से 13+6 दिन)
- बच्चे की गर्दन के पीछे तरल (Nuchal Translucency) की माप की जाती है।
- ड्यूल मार्कर ब्लड टेस्ट के साथ मिलकर यह डाउन सिंड्रोम जैसी आनुवंशिक स्थितियों की संभावना का आकलन करता है।

#### 3. लेवल-2 अनोमली (TIFFA) स्कैन (सप्ताह 18 से 20)
यह सबसे महत्वपूर्ण स्कैन है जिसमें बच्चे के प्रत्येक अंग की बारीकी से जांच होती है:
- **मस्तिष्क और रीढ़:** संरचना की पूर्ण जांच।
- **हृदय:** चार चैंबर और रक्त प्रवाह का परीक्षण।
- **गुर्दे और मूत्राशय:** दोनों गुर्दों की कार्यप्रणाली।
- **प्लेसेंटा की स्थिति:** प्लेसेंटा ऊपर है या नीचे (Placenta Previa)।

#### 4. तीसरी तिमाही का ग्रोथ स्कैन (सप्ताह 30 से 36)
- बच्चे के वजन, बढ़ने की रफ्तार और एमनियोटिक पानी (AFI) की जांच।`
    },
    readingTime: '6',
    author: 'Dr. Ramesh Sharma, MD Radiodiagnosis',
    sources: [
      'The International Society of Ultrasound in Obstetrics and Gynecology (ISUOG)',
      'Federation of Obstetric and Gynaecological Societies of India (FOGSI) Imaging Guidelines',
      'Ministry of Health and Family Welfare (MoHFW) Operational Guidelines on Antenatal Care'
    ],
    lastReviewed: 'October 2026',
    tags: ['Scans', 'Ultrasound', 'NT Scan', 'Anomaly Scan'],
    isFeatured: true
  },
  {
    id: 'art-3',
    slug: 'safe-physical-activity-and-prenatal-yoga',
    category: 'activity',
    title: {
      en: 'Safe Movement in Pregnancy: Prenatal Walking, Pelvic Floor Care, and Gentle Asanas',
      hi: 'गर्भावस्था में सुरक्षित व्यायाम: टहलना, पेल्विक फ्लोर की मजबूती और सरल योगासन'
    },
    excerpt: {
      en: 'Staying active reduces gestational diabetes risk, eases backache, and prepares stamina for labor. Learn which movements are beneficial and what postures to strictly avoid.',
      hi: 'नियमित सुरक्षित व्यायाम से कमर दर्द में राहत मिलती है और नॉर्मल डिलीवरी के लिए सहनशक्ति बढ़ती है।'
    },
    content: {
      en: `### Movement is Medicine for Two

Unless you have medical contraindications (such as placenta previa, incompetent cervix, or persistent bleeding), moderate physical activity is strongly encouraged by the American College of Obstetricians and Gynecologists (ACOG) and the Indian Ministry of Health.

#### Safe, Beneficial Activities
1. **Brisk Walking:** The simplest, safest exercise. Aim for 25-30 minutes, 5 days a week. Wear comfortable, supportive walking shoes and carry a water bottle.
2. **Kegel / Pelvic Floor Exercises:** Strengthens the sling of muscles supporting your bladder, uterus, and bowels.
   - Squeeze as if stopping the flow of urine midstream.
   - Hold for 5 seconds, relax for 5 seconds. Repeat 10-15 repetitions, 3 times daily.
3. **Cat-Cow Stretch (Marjaryasana-Bitilasana):** On all fours, gently arch and round the back to relieve pelvic and lumbar pressure.
4. **Butterfly Pose (Baddha Konasana):** Sitting with soles of feet together, knees dropping outward gently to open inner thighs and hips.

#### Exercises to Strictly Avoid
- High-impact sports with collision risk (basketball, cycling on open roads, horseback riding).
- Exercises flat on your back after week 16 (compresses the inferior vena cava and reduces cardiac output).
- Deep twists or intense abdominal crunches.
- "Hot yoga" or exercising in high humidity/heat, which raises core body temperature.`,
      hi: `### गर्भावस्था में सुरक्षित व्यायाम के नियम

यदि डॉक्टर ने कोई जटिलता (जैसे ब्लीडिंग या नीचे प्लेसेंटा) न बताई हो, तो हल्का व्यायाम माँ और शिशु दोनों के लिए बहुत फायदेमंद है।

#### सुरक्षित व्यायाम
1. **रोजाना टहलना (Walking):** सबसे आसान और सुरक्षित। रोज 25-30 मिनट आरामदायक जूते पहनकर टहलें।
2. **कीगल एक्सरसाइज (पेल्विक फ्लोर):** प्रसव के समय मांसपेशियों को लचीला बनाने और डिलीवरी के बाद पेशाब नियंत्रण के लिए जरूरी।
3. **मार्जरी आसन (Cat-Cow):** पीठ और कमर के दर्द में तुरंत राहत देता है।
4. **तितली आसन (बटरफ्लाई पोज):** पेल्विक क्षेत्र को खोलने और सामान्य प्रसव की तैयारी में मददगार।

#### क्या न करें:
- भारी वजन उठाना या झटके से मुड़ना।
- 16वें सप्ताह के बाद पीठ के बल बिल्कुल सपाट लेटना।
- पेट पर दबाव डालने वाले व्यायाम या क्रंचेस।`
    },
    readingTime: '4',
    author: 'Priya Kulkarni, Certified Prenatal Yoga Specialist',
    sources: [
      'ACOG Committee Opinion No. 804: Physical Activity and Exercise During Pregnancy',
      'Ministry of AYUSH, Govt. of India - Guidelines for Yoga in Pregnancy',
      'Royal College of Obstetricians and Gynaecologists (RCOG)'
    ],
    lastReviewed: 'October 2026',
    tags: ['Exercise', 'Yoga', 'Walking', 'PelvicFloor']
  },
  {
    id: 'art-4',
    slug: 'stages-of-labour-and-the-511-rule',
    category: 'labour',
    title: {
      en: 'Understanding Labour: The Three Stages, When to Leave for the Hospital, and the 5-1-1 Rule',
      hi: 'प्रसव के तीन चरण, अस्पताल जाने का सही समय और 5-1-1 का नियम'
    },
    excerpt: {
      en: 'Demystify labor pains, learn the difference between true labor and false alarms, and understand the timing guidelines doctors recommend.',
      hi: 'प्रसव पीड़ा को समझें, सच्चे और झूठे दर्द में फर्क पहचानें और जानिए कब तुरंत अस्पताल पहुंचना चाहिए।'
    },
    content: {
      en: `### The Physiological Stages of Childbirth

Labor is a natural, progressive sequence of uterine contractions that dilates and thins the cervix to allow baby to be born.

#### Stage 1: Cervical Dilation (0 to 10 cm)
- **Early Labor (0-6 cm):** Contractions are mild to moderate, occurring every 5 to 20 minutes and lasting 30-45 seconds. Often managed at home with rest, hydration, and gentle breathing.
- **Active Labor (6-8 cm):** Contractions become stronger, closer (every 3-4 minutes), and last 60 seconds. Conversation during contractions becomes difficult.
- **Transition (8-10 cm):** The most intense, rapid phase before pushing.

#### The 5-1-1 Clinical Guideline for Leaving Home
If you are full term (37+ weeks), your obstetrician typically recommends heading to the hospital when contractions:
- Occur **every 5 minutes** (from the start of one to the start of the next).
- Last for **1 full minute** (60 seconds).
- Have maintained this consistent pattern for **at least 1 hour**.

#### True Labor vs. Braxton Hicks
- **True Labor Contractions:** Grow progressively closer together, steadily longer, and intensify with walking or position changes.
- **Braxton Hicks:** Irregular, do not intensify over time, and frequently fade away with rest, a warm bath, or drinking two large glasses of water.

#### When to Bypass Timing and Go to the Hospital IMMEDIATELY:
1. **Rupture of Membranes (Water Breaking):** Especially if the fluid is green, brown, or bloody.
2. **Bright Red Vaginal Bleeding.**
3. **Severe constant abdominal pain without relaxation between tightenings.**
4. **Noticeable drop or cessation in fetal movement.**`,
      hi: `### प्रसव के तीन मुख्य चरण

प्रसव एक प्राकृतिक प्रक्रिया है जिसमें गर्भाशय के संकुचन बच्चेदानी के मुंह (सर्विक्स) को 10 सेमी तक खोलते हैं।

#### पहला चरण: सर्विक्स का खुलना (0 से 10 सेमी)
- **शुरुआती लेबर (0 से 6 सेमी):** हल्के दर्द जो 10-15 मिनट के अंतराल पर आते हैं। इसे घर पर शांत रहकर संभाला जा सकता है।
- **सक्रिय लेबर (6 से 8 सेमी):** संकुचन तेज हो जाते हैं और हर 3-4 मिनट में आते हैं।
- **ट्रांजिशन (8 से 10 सेमी):** सबसे तीव्र चरण जिसके बाद बच्चे को बाहर धकेलने (पुश) का समय आता है।

#### 5-1-1 नियम: अस्पताल कब जाएं?
जब संकुचन:
- **हर 5 मिनट** के अंतराल पर आ रहे हों,
- कम से कम **1 मिनट (60 सेकंड)** तक खिंचते हों,
- और यह क्रम लगातार **1 घंटे** तक बना रहे।

#### इन लक्षणों में बिना देरी तुरंत अस्पताल पहुंचे:
1. पानी की थैली का फटना (Water Break)।
2. ताजा लाल खून का स्राव होना।
3. शिशु की हलचल बंद या बहुत कम लगना।`
    },
    readingTime: '6',
    author: 'Dr. Anita Sen, Senior Obstetrician',
    sources: [
      'World Health Organization (WHO) Intrapartum Care for a Positive Childbirth Experience',
      'American College of Obstetricians and Gynecologists (ACOG)',
      'National Health Mission (NHM) LaQshya Guidelines'
    ],
    lastReviewed: 'October 2026',
    tags: ['Labour', 'Birth', 'Contractions', '511Rule'],
    isFeatured: true
  },
  {
    id: 'art-5',
    slug: 'breastfeeding-the-golden-hour-and-colostrum',
    category: 'breastfeeding',
    title: {
      en: 'The Golden Hour of Breastfeeding: Colostrum, Skin-to-Skin, and First Latch',
      hi: 'स्तनपान का पहला सुनहरा घंटा (Golden Hour): कोलोस्ट्रम, त्वचा से संपर्क और पहला लैच'
    },
    excerpt: {
      en: 'Why early initiation of breastfeeding within 1 hour of birth provides your newborn with their first immunization, and how proper latching prevents sore nipples.',
      hi: 'जन्म के 1 घंटे के भीतर पहला पीला गाढ़ा दूध (कोलोस्ट्रम) बच्चे के लिए पहला प्राकृतिक टीका है।'
    },
    content: {
      en: `### The Magic of the First 60 Minutes

The first hour after birth—often termed the "Golden Hour"—is a precious window when the newborn is wide awake, alert, and primed by instinct to search for the breast.

#### Why Colostrum is Liquid Gold
During the first 2-4 days after birth, your breasts produce **colostrum**, a concentrated, thick, yellowish fluid:
- **Immune Powerhouse:** Packed with Secretory Immunoglobulin A (sIgA), lactoferrin, and white blood cells that coat baby\'s sterile intestines, shielding them from pathogens.
- **Natural Laxative:** Helps baby pass meconium (the dark first stool), which clears excess bilirubin and prevents newborn jaundice.
- **Small Volumes are Normal:** A newborn\'s stomach on day 1 is only the size of a marble (5-7 mL). Do not worry if only teaspoons of colostrum are expressed; it is the exact biological quantity baby needs!

#### Achieving a Pain-Free Latch
Nipple pain is common when baby latches only onto the sensitive tip of the nipple.
- Align baby "tummy to mummy" with their nose opposite your nipple.
- Wait for baby to open their mouth wide (like a yawn).
- Bring baby swiftly to the breast, taking a large mouthful of the lower areola, not just the nipple.
- Baby\'s chin should press into the breast and lips should be flanged outward like a fish.`,
      hi: `### जन्म का पहला सुनहरा घंटा

जन्म के तुरंत बाद शिशु को माँ की छाती पर रखना (Skin-to-Skin) दोनों के लिए चमत्कारी होता है। इससे बच्चे की धड़कन, सांस और तापमान स्थिर होता है।

#### कोलोस्ट्रम (पहला गाढ़ा पीला दूध) क्यों अमृत है?
- यह शिशु का पहला प्राकृतिक टीका है, जो उसे संक्रमण और पीलिया से बचाता है।
- **मात्रा कम होना स्वाभाविक है:** पहले दिन बच्चे का पेट एक छोटे कंचे जितना (5-7 मिली) होता है। इसलिए कुछ चम्मच गाढ़ा दूध ही उसके लिए भरपूर होता है। बाहरी घुट्टी या शहद बिल्कुल न दें।

#### सही लैचिंग (दूध पिलाने का तरीका)
- बच्चे का मुंह पूरा खुला होना चाहिए।
- केवल निपल नहीं, बल्कि उसके चारों ओर का काला हिस्सा (एरिओला) बच्चे के मुंह में जाना चाहिए। इससे माँ को दर्द नहीं होता।`
    },
    readingTime: '5',
    author: 'Sunita Rao, IBCLC Certified Lactation Consultant',
    sources: [
      'MoHFW MAA (Mothers’ Absolute Affection) Programme Guidelines',
      'WHO and UNICEF Baby-Friendly Hospital Initiative (BFHI)',
      'Indian Academy of Pediatrics (IAP) Infant and Young Child Feeding Guidelines'
    ],
    lastReviewed: 'October 2026',
    tags: ['Breastfeeding', 'Colostrum', 'Newborn', 'GoldenHour']
  },
  {
    id: 'art-6',
    slug: 'postpartum-recovery-and-maternal-mental-health',
    category: 'postpartum',
    title: {
      en: 'The Fourth Trimester: Physical Healing and Maternal Mental Health',
      hi: 'चौथी तिमाही: प्रसव के बाद शारीरिक स्वास्थ्य और मानसिक देखभाल'
    },
    excerpt: {
      en: 'The first 12 weeks after childbirth bring profound hormonal shifts. Learn what normal physical recovery entails and how to recognize postpartum depression.',
      hi: 'प्रसव के बाद शरीर को ठीक होने में समय लगता है। जानिए सामान्य रिकवरी और पोस्टपार्टम डिप्रेशन के संकेतों के बारे में।'
    },
    content: {
      en: `### Honoring the Fourth Trimester

Childbirth is not the finish line; it is the beginning of the fourth trimester. While all attention naturally shifts to the new baby, maternal healing is equally vital.

#### Physical Recovery Essentials
- **Lochia (Postpartum Bleeding):** Bleeding continues for 2 to 6 weeks as the placental site heals. It starts red, transitions to pinkish-brown, and ends as yellowish-white.
- **Perineal Care or C-Section Healing:** Keep incisions clean and dry. Use warm sitz baths for vaginal tears or ice packs during the first 48 hours.
- **Uterine Involution (Afterpains):** Mild cramping while breastfeeding is completely normal; oxytocin release helps shrink the uterus back to its pre-pregnancy size.

#### Baby Blues vs. Postpartum Depression (PPD)
- **The "Baby Blues" (80% of mothers):** Mood swings, weeping without clear reason, fatigue, and feeling overwhelmed occurring in the first 2 weeks. Caused by a massive drop in estrogen and progesterone. Usually resolves on its own with rest and family support.
- **Postpartum Depression (PPD):** Persistent sadness, severe anxiety, inability to bond with baby, feeling like an inadequate parent, or feelings of hopelessness lasting beyond 2-3 weeks.
- **Medical Message:** PPD is a medical complication of childbirth, not a personal flaw. It responds well to professional support, counseling, and safe medications compatible with breastfeeding. Never suffer in silence.`,
      hi: `### प्रसवोपरांत स्वास्थ्य और देखभाल

डिलीवरी के बाद माँ के शरीर और मन में बड़े हार्मोनल बदलाव आते हैं।

#### शारीरिक रिकवरी
- **लोचिया (ब्लीडिंग):** प्रसव के बाद 2 से 6 सप्ताह तक हल्का स्राव होना सामान्य है।
- **टांकों की देखभाल:** टांकों को साफ और सूखा रखें। गर्म पानी की सिट्ज़ बाथ से आराम मिलता है।
- **आफ्टरपेन्स:** दूध पिलाते समय गर्भाशय सिकुड़ने से हल्का पेट दर्द हो सकता है जो सामान्य है।

#### 'बेबी ब्लूज' और डिप्रेशन में अंतर
- **बेबी ब्लूज:** पहले 10-14 दिनों में रोना आना, चिड़चिड़ापन और थकान होना बहुत सामान्य है।
- **पोस्टपार्टम डिप्रेशन (PPD):** यदि उदासी, घबराहट, खुद को अक्षम महसूस करना या बच्चे से लगाव न महसूस होना 2 सप्ताह से ज्यादा चले, तो यह डिप्रेशन हो सकता है। यह किसी की कमजोरी नहीं बल्कि एक चिकित्सकीय स्थिति है जिसका इलाज पूरी तरह संभव है।`
    },
    readingTime: '5',
    author: 'Dr. Neha Varma, Consultant Psychiatrist & Perinatal Health',
    sources: [
      'Postpartum Support International (PSI)',
      'National Health Mission (NHM) Maternal Health Guidelines',
      'ACOG Clinical Guidance: Screening for Perinatal Depression'
    ],
    lastReviewed: 'October 2026',
    tags: ['Postpartum', 'MentalHealth', 'FourthTrimester', 'PPD']
  },
  {
    id: 'art-7',
    slug: 'garbh-sanskar-tradition-and-modern-science',
    category: 'traditions',
    title: {
      en: 'Garbh Sanskar: Blending Traditional Indian Prenatal Wisdom with Modern Neuroscience',
      hi: 'गर्भ संस्कार: पारंपरिक भारतीय ज्ञान और आधुनिक न्यूरोसाइंस का सुंदर संगम'
    },
    excerpt: {
      en: 'How auditory stimulation, maternal emotional equilibrium, calm music, and mindful connection positively influence fetal neurodevelopment.',
      hi: 'गर्भ में शिशु का मानसिक जुड़ाव, शांत संगीत, सकारात्मक विचार और वैज्ञानिक शोध का विश्लेषण।'
    },
    content: {
      en: `### Ancient Insights Meet Contemporary Fetal Science

The concept of **Garbh Sanskar** (educating the child in the womb) originates from ancient Indian texts, suggesting that a fetus is capable of sensing, learning, and absorbing impressions from maternal emotions and environmental stimuli.

#### What Modern Neuroscience Confirms:
1. **Auditory Learning in the Womb:** By week 24-26, the fetal auditory system is functional. Studies show that newborns recognize stories, songs, and melodic mantras heard repeatedly in the third trimester and show calmer heart rates when exposed to familiar maternal voices.
2. **The Stress Hormone Axis:** When a mother experiences prolonged chronic stress, elevated levels of cortisol cross the placenta. Conversely, calming activities—such as chanting, classical raga listening, and gentle breathing—release endorphins and serotonin, creating a serene intrauterine environment.
3. **The Maternal-Fetal Bond:** Spending 15 minutes each evening talking, stroking the belly, and visualizing health creates deep neural and psychological bonding that fosters maternal confidence after birth.`,
      hi: `### गर्भ संस्कार और आधुनिक विज्ञान

प्राचीन भारतीय ज्ञान के अनुसार गर्भस्थ शिशु माँ की भावनाओं, संगीत और वातावरण से सीखता है। आधुनिक विज्ञान भी इसकी पुष्टि करता है:

1. **शिशु की सुनने की क्षमता:** 24वें सप्ताह के बाद शिशु माँ की आवाज और संगीत को पहचानता है। जन्म के बाद वह जानी-पहचानी धुनों को सुनकर शांत होता है।
2. **सकारात्मक सोच का असर:** जब माँ खुश और शांत रहती है, तो शरीर में अच्छे हार्मोन्स (एंडोर्फिन) बनते हैं जो बच्चे के मस्तिष्क के विकास में सहायक होते हैं।
3. **गर्भ संवाद:** रोजाना कुछ समय शांत बैठकर बच्चे से बातें करना, पेट पर हाथ फेरना और सकारात्मक विचार रखना माँ और बच्चे के रिश्ते को मजबूत बनाता है।`
    },
    readingTime: '4',
    author: 'Dr. Anita Sen, Senior Obstetrician',
    sources: [
      'DeCasper & Fifer - Human Newborns Recognize Their Mother’s Voice, Science',
      'Ministry of AYUSH - Concept of Garbhini Paricharya and Prenatal Wellbeing',
      'Fetal Neurodevelopment and Maternal Stress Studies, Lancet Psychiatry'
    ],
    lastReviewed: 'October 2026',
    tags: ['GarbhSanskar', 'Traditions', 'BrainDevelopment', 'Wellness']
  },
  {
    id: 'art-8',
    slug: 'pregnancy-medical-terminology-glossary',
    category: 'glossary',
    title: {
      en: 'Pregnancy Terminology A to Z: Decoded for Parents',
      hi: 'गर्भावस्था चिकित्सा शब्दावली: आम भाषा में आसान समझ'
    },
    excerpt: {
      en: 'Demystify medical jargon used in your ultrasound reports and clinical visits—AFI, Placenta Previa, Cephalic, Effacement, and more.',
      hi: 'अल्ट्रासाउंड रिपोर्ट और डॉक्टर के पर्चे में लिखे कठिन शब्दों (AFI, Cephalic आदि) का सरल हिंदी और अंग्रेजी में अर्थ।'
    },
    content: {
      en: `### Key Ultrasound & Clinical Terms Explained Simply

- **AFI (Amniotic Fluid Index):** An ultrasound score measuring the volume of fluid around the baby. Normal AFI is usually between 8 and 24 cm. Low fluid is termed *oligohydramnios*; high fluid is *polyhydramnios*.
- **Cephalic / Vertex Presentation:** Baby is head-down, the optimal position for vaginal birth.
- **Breech Presentation:** Baby's buttocks or feet are pointed downward toward the birth canal.
- **Crown-Rump Length (CRL):** The measurement from the top of the baby's head to the bottom of the buttocks, used in first-trimester ultrasounds for exact gestational age dating.
- **Effacement:** The gradual thinning and shortening of the cervix during labor, measured in percentages (0% to 100%).
- **Dilation:** The opening of the cervix, measured from 0 centimeters (closed) to 10 centimeters (fully dilated).
- **EDD (Estimated Due Date):** The calculated 40-week delivery projection. Remember: full term encompasses 37 to 42 weeks!
- **Lochia:** The normal vaginal discharge and bleeding that occurs for several weeks following delivery as the uterus heals.
- **Meconium:** Baby's first dark green or black sticky bowel movement, made of ingested cells, mucus, and bile.
- **Placenta Previa:** A condition where the placenta implants low in the uterus, partially or fully covering the cervix.`,
      hi: `### मेडिकल रिपोर्ट के मुख्य शब्दों का सरल अर्थ

- **AFI (एमनियोटिक फ्लूइड इंडेक्स):** बच्चे के चारों ओर पानी की मात्रा। सामान्यतः यह 8 से 24 सेमी के बीच होता है।
- **Cephalic (सिफैलिक):** बच्चे का सिर नीचे की तरफ होना, जो नॉर्मल डिलीवरी के लिए सबसे सही स्थिति है।
- **Breech (ब्रीच):** बच्चे के पैर या नितंब नीचे की तरफ होना।
- **CRL (क्राउन रम्प लेंथ):** पहली तिमाही में बच्चे के सिर से कूल्हे तक की लंबाई।
- **Dilation (डायलेशन):** प्रसव के समय बच्चेदानी के मुंह का 0 से 10 सेमी तक खुलना।
- **Placenta Previa (प्लेसेंटा प्रीविया):** आंवल (प्लेसेंटा) का बच्चेदानी के मुंह के ऊपर नीचे स्थित होना।`
    },
    readingTime: '4',
    author: 'MaternaNest Clinical Editorial Board',
    sources: [
      'American College of Obstetricians and Gynecologists (ACOG) Medical Dictionary',
      'Oxford Handbook of Obstetrics and Gynaecology'
    ],
    lastReviewed: 'October 2026',
    tags: ['Glossary', 'MedicalTerms', 'UltrasoundReport']
  }
];
