import React from 'react';
import { Heart, Shield, Lock, ExternalLink, Phone } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onSelectTab: (tab: string) => void;
  onOpenProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectTab, onOpenProfile }) => {
  const isHindi = language === 'hi';

  return (
    <footer className="bg-[#183944] text-[#E5ECEE] pt-14 pb-12 border-t border-[#122A32] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D97757] flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                MaternaNest
              </span>
            </div>
            <p className="text-xs text-[#A8C2CA] leading-relaxed">
              {isHindi
                ? 'मातृत्व का यह सुंदर सफ़र, हर कदम पर आपके साथ। भारतीय स्वास्थ्य मंत्रालय (MoHFW) और WHO के वैज्ञानिक दिशानिर्देशों पर आधारित एक शांत, प्रामाणिक और निजी साथी।'
                : 'A calm, clinically grounded digital companion for pregnancy education, tracking, and postpartum preparation tailored for expectant parents.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E5B5A1]">
              <Lock className="w-3.5 h-3.5" />
              <span>{isHindi ? '100% निजी • शून्य डेटा शेयरिंग' : 'Private by Design • Zero Ad Trackers'}</span>
            </div>
          </div>

          {/* Quick Features */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FAD2C0] mb-4">
              {isHindi ? 'मुख्य सुविधाएं' : 'Core Features'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CAD9DD]">
              <li>
                <button onClick={() => onSelectTab('tracker')} className="hover:text-white transition">
                  {isHindi ? '40 सप्ताह का विकास ट्रैकर' : '40-Week Development Tracker'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('library')} className="hover:text-white transition">
                  {isHindi ? 'प्रमाणित शैक्षिक लेख' : 'Evidence-Based Library'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('planner')} className="hover:text-white transition">
                  {isHindi ? 'डॉक्टर अपॉइंटमेंट प्लानर' : 'Prenatal Appointment Planner'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('checklists')} className="hover:text-white transition">
                  {isHindi ? 'अस्पताल बैग चेकलिस्ट' : 'Hospital Bag & Birth Prep'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('tools')} className="hover:text-white transition">
                  {isHindi ? 'कॉन्ट्रैक्शन व किक काउंटर' : 'Contraction & Kick Tools'}
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Sources & Alliances */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FAD2C0] mb-4">
              {isHindi ? 'प्रमाणित स्रोत एवं दिशानिर्देश' : 'Clinical References'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CAD9DD]">
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#E59880]" />
                <a href="https://main.mohfw.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  MoHFW India (Maternal Health)
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#E59880]" />
                <a href="https://www.who.int" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  WHO Maternal & Perinatal Care
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#E59880]" />
                <a href="https://fogsi.org" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  FOGSI Clinical Guidelines
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-[#E59880]" />
                <a href="https://www.acog.org" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  ACOG Patient Education
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#FAD2C0] mb-4">
              {isHindi ? 'आपातकालीन सहायता' : 'Emergency & Helplines'}
            </h4>
            <div className="space-y-3 text-xs text-[#CAD9DD]">
              <div className="p-3 rounded-lg bg-[#214754] border border-[#2B5666]">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E59880]" />
                  {isHindi ? 'भारत आपातकालीन एम्बुलेंस: 108 / 102' : 'India Ambulance Services: 108 / 102'}
                </p>
                <p className="text-[11px] text-[#A6C0C8] mt-1">
                  {isHindi ? 'सार्वभौमिक आपातकालीन नंबर: 112' : 'Universal Emergency Number: 112'}
                </p>
              </div>

              <button
                onClick={onOpenProfile}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#214754]/60 hover:bg-[#214754] border border-[#2B5666] text-white text-xs transition"
              >
                {isHindi ? 'गोपनीयता सेटिंग्स एवं डेटा निर्यात' : 'Privacy Settings & Data Export'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-[#234552] text-[11px] text-[#8EAAB2] space-y-3">
          <p className="leading-relaxed">
            <strong className="text-[#FAD2C0]">
              {isHindi ? 'वैधानिक चिकित्सकीय अस्वीकरण:' : 'Medical Disclaimer:'}
            </strong>{' '}
            {isHindi
              ? 'MaternaNest केवल शैक्षिक और गर्भावस्था ट्रैकिंग के लिए विकसित किया गया है। यह किसी भी प्रकार की चिकित्सकीय सलाह, निदान या उपचार प्रदान नहीं करता है। अपनी गर्भावस्था, किसी भी असामान्य लक्षण या दवाओं के संबंध में हमेशा अपने योग्य प्रसूति रोग विशेषज्ञ (Obstetrician/Gynecologist) से परामर्श लें।'
              : 'The content provided by MaternaNest is for informational and educational purposes only and is not intended as medical advice, diagnosis, or treatment. Always seek the advice of your qualified obstetrician, gynecologist, or healthcare provider with any questions regarding a medical condition.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
            <p>© {new Date().getFullYear()} MaternaNest. All rights reserved. Nurturing Every Beginning.</p>
            <div className="flex items-center gap-4 text-[#A8C2CA]">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#D97757]" />
                {isHindi ? 'डीपीडीपी अधिनियम अनुरूप' : 'DPDP Act & GDPR Privacy Compliant'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
