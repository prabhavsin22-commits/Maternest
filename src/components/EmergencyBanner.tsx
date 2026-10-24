import React, { useState } from 'react';
import { AlertCircle, PhoneCall, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface EmergencyBannerProps {
  language: Language;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isHindi = language === 'hi';

  return (
    <aside aria-label="Clinical safety advisory" className="bg-[#FFF8F5] border-b border-[#F2D7CE] text-xs text-[#5D2B20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D97757] shrink-0" />
          <span className="font-semibold text-[#8C3A27]">
            {isHindi ? 'चिकित्सकीय सूचना एवं आपातकालीन मार्गदर्शिका:' : 'Clinical Educational Notice:'}
          </span>
          <span className="hidden sm:inline text-[#6B4E47]">
            {isHindi
              ? 'MaternaNest केवल शैक्षिक उद्देश्यों के लिए है। किसी भी आपात लक्षण पर तुरंत डॉक्टर से संपर्क करें।'
              : 'MaternaNest provides evidence-based education and does not replace personalized obstetric diagnosis.'}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <a
            href="tel:108"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#D97757] text-white font-medium hover:bg-[#C26244] transition text-[11px]"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{isHindi ? 'आपातकालीन नंबर: 108 / 102 (भारत)' : 'Emergency: 108 / 102 (India)'}</span>
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-medium text-[#8C3A27] underline flex items-center gap-0.5 hover:text-[#5D2B20]"
          >
            {isHindi ? (isExpanded ? 'कम देखें' : 'खतरे के लक्षण') : (isExpanded ? 'Hide Red Flags' : 'View Red Flags')}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-[#FCF1EC] border-t border-[#F2D7CE] px-4 sm:px-6 lg:px-8 py-3 text-xs animate-in slide-in-from-top-1">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 text-[#5A2C21]">
            <div>
              <p className="font-bold flex items-center gap-1 text-[#8C3A27]">
                <AlertCircle className="w-3.5 h-3.5" />
                {isHindi ? 'तत्काल मेडिकल सहायता कब लें (Red Flags):' : 'Immediate Emergency Symptoms (Contact Caregiver Promptly):'}
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>{isHindi ? 'योनि से किसी भी प्रकार का ताजा लाल खून बहना' : 'Bright red vaginal bleeding or passage of clots'}</li>
                <li>{isHindi ? 'अचानक तेज पानी जैसा स्राव (पानी की थैली टूटना)' : 'Sudden continuous trickle or gush of fluid (water breaking)'}</li>
                <li>{isHindi ? 'पेट के निचले हिस्से में असहनीय लगातार दर्द' : 'Severe persistent abdominal pain or rigid stomach'}</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                <li>{isHindi ? 'शिशु की हलचल में साफ कमी (तीसरी तिमाही में 2 घंटे में 10 से कम किक)' : 'Noticeable drop in fetal movements (<10 kicks in 2 hours in 3rd trimester)'}</li>
                <li>{isHindi ? 'तेज सिरदर्द, धुंधला दिखाई देना या चेहरे/हाथों में अचानक तेज सूजन' : 'Severe persistent headache, visual disturbances/flashes, or sudden facial edema'}</li>
                <li>{isHindi ? '100.4°F से अधिक तेज बुखार या कंपकंपी' : 'High fever above 38°C (100.4°F) or persistent chills'}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
