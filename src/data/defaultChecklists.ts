import { ChecklistItem } from '../types';

export const DEFAULT_CHECKLISTS: ChecklistItem[] = [
  // Hospital Bag: For Mother
  {
    id: 'mom-1',
    category: 'bag-mom',
    text: {
      en: 'Government Photo ID, Insurance Card, and Medical Records Folder (all scan reports & blood tests)',
      hi: 'आधार कार्ड / सरकारी पहचान पत्र, बीमा कार्ड और सभी मेडिकल व अल्ट्रासाउंड रिपोर्ट की फाइल'
    },
    isDone: false
  },
  {
    id: 'mom-2',
    category: 'bag-mom',
    text: {
      en: '2-3 front-opening or button-down comfortable cotton nightgowns or maxi dresses for easy nursing',
      hi: '2-3 आगे से बटन वाले आरामदायक सूती नाइटी या गाउन (दूध पिलाने में आसानी के लिए)'
    },
    isDone: false
  },
  {
    id: 'mom-3',
    category: 'bag-mom',
    text: {
      en: '3-4 comfortable nursing bras (non-wired) and disposable nursing breast pads',
      hi: '3-4 आरामदायक नर्सिंग ब्रा और ब्रेस्ट पैड्स'
    },
    isDone: false
  },
  {
    id: 'mom-4',
    category: 'bag-mom',
    text: {
      en: '2 packs of high-absorbency maternity sanitary pads / adult pull-up pants',
      hi: '2 पैकेट मैटरनिटी सेनेटरी पैड्स (प्रसवोपरांत लोचिया स्राव के लिए)'
    },
    isDone: false
  },
  {
    id: 'mom-5',
    category: 'bag-mom',
    text: {
      en: 'Toiletry kit: toothbrush, mild toothpaste, gentle face wash, lip balm, and hair ties',
      hi: 'टूथब्रश, पेस्ट, माइल्ड फेस वॉश, लिप बाम और बालों के रबर बैंड'
    },
    isDone: false
  },
  {
    id: 'mom-6',
    category: 'bag-mom',
    text: {
      en: 'Anti-slip rubber slippers or flip-flops for hospital bathroom walking and warm cotton socks',
      hi: 'फिसलन-रहित बाथरूम चप्पल और सूती मोजे'
    },
    isDone: false
  },
  {
    id: 'mom-7',
    category: 'bag-mom',
    text: {
      en: 'Loose-fitting, dignified going-home outfit (clothes that fit comfortably at 6 months pregnancy)',
      hi: 'अस्पताल से घर लौटने के लिए आरामदायक, ढीले-ढाले कपड़े'
    },
    isDone: false
  },

  // Hospital Bag: For Baby
  {
    id: 'baby-1',
    category: 'bag-baby',
    text: {
      en: '4-6 washed soft cotton newborn vests (jhablas) or onesies',
      hi: '4-6 धुले हुए मुलायम सूती नवजात के कपड़े (झबले)'
    },
    isDone: false
  },
  {
    id: 'baby-2',
    category: 'bag-baby',
    text: {
      en: '4-5 breathable cotton or muslin swaddle cloths (dhotis / wraps)',
      hi: '4-5 मुलायम मलमल या सूती लपेटने वाले कपड़े (मसलिन स्वैडल)'
    },
    isDone: false
  },
  {
    id: 'baby-3',
    category: 'bag-baby',
    text: {
      en: 'Newborn disposable diapers (size 0/NB) or clean cloth nappies (langots)',
      hi: 'नवजात शिशु के साइज वाले डायपर या सूती लंगोट'
    },
    isDone: false
  },
  {
    id: 'baby-4',
    category: 'bag-baby',
    text: {
      en: 'Fragrance-free water-based baby wipes and soft dry cotton balls',
      hi: 'बिना खुशबू वाले वॉटर वाइप्स या कॉटन'
    },
    isDone: false
  },
  {
    id: 'baby-5',
    category: 'bag-baby',
    text: {
      en: '2 soft newborn cotton caps (topis) and scratch mittens',
      hi: '2 सूती टोपियां और हाथों के दस्ताने (मिटेंस)'
    },
    isDone: false
  },
  {
    id: 'baby-6',
    category: 'bag-baby',
    text: {
      en: 'Warm receiving blanket for hospital discharge',
      hi: 'घर ले जाने के लिए मुलायम गर्म कंबल'
    },
    isDone: false
  },

  // Hospital Bag: For Partner
  {
    id: 'partner-1',
    category: 'bag-partner',
    text: {
      en: 'Phones, long charging cables, and high-capacity portable power bank',
      hi: 'फोन, चार्जर और चार्ज किया हुआ पावर बैंक'
    },
    isDone: false
  },
  {
    id: 'partner-2',
    category: 'bag-partner',
    text: {
      en: 'Hospital pre-admission slip, insurance TPA pre-authorization documents, and emergency cash',
      hi: 'अस्पताल प्रवेश दस्तावेज, टीपीए (TPA) इंश्योरेंस पेपर और आपातकालीन नकदी'
    },
    isDone: false
  },
  {
    id: 'partner-3',
    category: 'bag-partner',
    text: {
      en: 'Healthy energy snacks (dry fruits, nuts, makhana, energy bars) and reusable water bottle',
      hi: 'ड्राई फ्रूट्स, मखाने, बिस्कुट और पानी की बोतल'
    },
    isDone: false
  },
  {
    id: 'partner-4',
    category: 'bag-partner',
    text: {
      en: 'Change of clothes, light jacket (for air-conditioned labor rooms), and basic toiletries',
      hi: 'कपड़ों का एक अतिरिक्त सेट, जैकेट और बेसिक टॉयलेटरी किट'
    },
    isDone: false
  },

  // Birth Preparation Checklist
  {
    id: 'prep-1',
    category: 'birth-prep',
    text: {
      en: 'Confirm 24/7 maternity hospital emergency numbers and ambulance helpline (108/102 in India)',
      hi: 'अस्पताल के लेबर रूम का सीधा नंबर और 108/102 एम्बुलेंस सेवा नोट करके रखें'
    },
    isDone: false
  },
  {
    id: 'prep-2',
    category: 'birth-prep',
    text: {
      en: 'Discuss birth preferences with obstetrician (pain relief options, delayed cord clamping, skin-to-skin)',
      hi: 'डॉक्टर से डिलीवरी प्लान (एपिड्यूरल विकल्प, गर्भनाल देर से काटना, स्किन-टू-स्किन) पर चर्चा करें'
    },
    isDone: false
  },
  {
    id: 'prep-3',
    category: 'birth-prep',
    text: {
      en: 'Do a trial run of the drive to the hospital to estimate traffic and identify the emergency entrance',
      hi: 'अस्पताल तक गाड़ी से जाने का समय और इमरजेंसी गेट का रास्ता पहले से देख लें'
    },
    isDone: false
  },
  {
    id: 'prep-4',
    category: 'birth-prep',
    text: {
      en: 'Arrange reliable family support or postpartum help (japa maid / elder support) for the first 40 days',
      hi: 'प्रसव के बाद शुरुआती 40 दिनों की देखभाल के लिए परिवार या सहायिका की व्यवस्था सुनिश्चित करें'
    },
    isDone: false
  },

  // Baby Essentials at Home
  {
    id: 'ess-1',
    category: 'baby-essentials',
    text: {
      en: 'Safe sleep space: firm crib or bassinet with a fitted sheet (no loose pillows, bumpers, or heavy quilts per safe sleep guidelines)',
      hi: 'सुरक्षित पालना या बिस्तर (सख्त गद्दा, बिना किसी ढीले तकिए या भारी रजाई के)'
    },
    isDone: false
  },
  {
    id: 'ess-2',
    category: 'baby-essentials',
    text: {
      en: 'Digital infant body thermometer and saline nasal drops',
      hi: 'डिजिटल थर्मामीटर और डॉक्टर द्वारा सुझाए गए नेजल ड्रॉप्स'
    },
    isDone: false
  },
  {
    id: 'ess-3',
    category: 'baby-essentials',
    text: {
      en: 'Safe rear-facing infant car seat or secure travel arrangement',
      hi: 'वाहन में शिशु की सुरक्षित यात्रा की तैयारी'
    },
    isDone: false
  },
  {
    id: 'ess-4',
    category: 'baby-essentials',
    text: {
      en: 'Gentle, tear-free baby wash, natural virgin coconut oil for massage, and soft muslin washcloths',
      hi: 'माइल्ड बेबी वॉश, मालिश के लिए नारियल तेल और मुलायम सूती तौलिया'
    },
    isDone: false
  }
];
