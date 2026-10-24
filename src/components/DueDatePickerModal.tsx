import React, { useState } from 'react';
import { X, Calendar, Sparkles, Check, Info } from 'lucide-react';
import { PregnancyProfile, Language, CalculationMethod } from '../types';
import { calculateGestationalInfo } from '../utils/pregnancyCalculator';
import { translations } from '../i18n/translations';

interface DueDatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PregnancyProfile;
  onSave: (updatedProfile: PregnancyProfile) => void;
  language: Language;
}

export const DueDatePickerModal: React.FC<DueDatePickerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  language
}) => {
  const [method, setMethod] = useState<CalculationMethod>(profile.calculationMethod || 'lmp');
  const [lmpDate, setLmpDate] = useState(profile.lmpDate || '');
  const [dueDate, setDueDate] = useState(profile.dueDate || '');
  const [cycleLength, setCycleLength] = useState(profile.cycleLength || 28);
  const [userName, setUserName] = useState(profile.userName || '');
  const [partnerName, setPartnerName] = useState(profile.partnerName || '');
  const [doctorContact, setDoctorContact] = useState(profile.doctorContact || '');
  const [hospitalName, setHospitalName] = useState(profile.hospitalName || '');

  if (!isOpen) return null;

  const t = translations[language].profileModal;

  const previewInfo = calculateGestationalInfo(
    method,
    method === 'lmp' ? lmpDate : dueDate,
    cycleLength
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    let calculatedDue = dueDate;
    if (method === 'lmp' && lmpDate) {
      const calculated = calculateGestationalInfo('lmp', lmpDate, cycleLength);
      // Derive ISO due date from calculated preview
      const d = new Date(lmpDate + 'T00:00:00');
      d.setDate(d.getDate() + 280 + (cycleLength - 28));
      calculatedDue = d.toISOString().split('T')[0];
    }

    const updated: PregnancyProfile = {
      ...profile,
      userName: userName.trim() || 'Parent',
      partnerName: partnerName.trim(),
      calculationMethod: method,
      lmpDate,
      cycleLength,
      dueDate: calculatedDue,
      doctorContact,
      hospitalName,
      onboardingCompleted: true
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border border-[#E3D7C7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 bg-[#1B4958] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#FAD2C0]" />
            <h3 className="font-serif text-lg font-bold">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5 text-sm text-[#272B35]">
          {/* Method Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
              {t.calcMethodLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMethod('lmp')}
                className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition ${
                  method === 'lmp'
                    ? 'bg-[#1B4958] text-white border-[#1B4958] shadow-xs'
                    : 'bg-white text-[#4A5568] border-[#D7CABA] hover:bg-[#F2ECE1]'
                }`}
              >
                {t.lmpOption}
              </button>
              <button
                type="button"
                onClick={() => setMethod('dueDate')}
                className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition ${
                  method === 'dueDate'
                    ? 'bg-[#1B4958] text-white border-[#1B4958] shadow-xs'
                    : 'bg-white text-[#4A5568] border-[#D7CABA] hover:bg-[#F2ECE1]'
                }`}
              >
                {t.eddOption}
              </button>
            </div>
          </div>

          {/* Date Picker Input */}
          {method === 'lmp' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                  {language === 'hi' ? 'अंतिम माहवारी का पहला दिन (LMP)' : 'First Day of Last Menstrual Period:'}
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D7CABA] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4958]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#4A5568]">
                    {t.cycleLabel}
                  </label>
                  <span className="text-xs font-bold text-[#1B4958]">{cycleLength} days</span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value))}
                  className="w-full accent-[#1B4958]"
                />
                <div className="flex justify-between text-[10px] text-[#718096]">
                  <span>21 d (Shorter)</span>
                  <span>28 d (Standard)</span>
                  <span>35 d (Longer)</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                {language === 'hi' ? 'डॉक्टर द्वारा दी गई अनुमानित प्रसव तिथि (EDD):' : 'Estimated Due Date (EDD):'}
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D7CABA] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4958]"
              />
            </div>
          )}

          {/* Real-time Calculation Preview Card */}
          {previewInfo.isValid && (
            <div className="p-4 rounded-2xl bg-[#F0EBE1] border border-[#DECDBB] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B4958] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97757]" />
                  {language === 'hi' ? 'वर्तमान स्थिति' : 'Estimated Gestational Age'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1B4958] text-white font-semibold">
                  {language === 'hi' ? `तिमाही ${previewInfo.trimester}` : `Trimester ${previewInfo.trimester}`}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-2xl font-serif font-bold text-[#1B4958]">
                  {language === 'hi'
                    ? `${previewInfo.weeks} सप्ताह, ${previewInfo.days} दिन`
                    : `Week ${previewInfo.weeks}, Day ${previewInfo.days}`}
                </span>
                <span className="text-xs text-[#D97757] font-semibold">
                  {previewInfo.daysRemaining} {language === 'hi' ? 'दिन शेष' : 'days left'}
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                {language === 'hi' ? 'अनुमानित प्रसव तिथि:' : 'Estimated Due Date:'}{' '}
                <strong className="text-[#272B35]">{previewInfo.dueDateFormatted}</strong>
              </p>
            </div>
          )}

          {previewInfo.errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{previewInfo.errorMessage}</span>
            </div>
          )}

          {/* Optional Personal Details */}
          <div className="pt-2 border-t border-[#E3D7C7] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              {language === 'hi' ? 'व्यक्तिगत विवरण (वैकल्पिक)' : 'Personal Details (Stored Locally)'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Pooja"
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs focus:ring-1 focus:ring-[#1B4958]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                  {t.partnerLabel}
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Rohit"
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs focus:ring-1 focus:ring-[#1B4958]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                {t.doctorLabel}
              </label>
              <input
                type="text"
                value={doctorContact}
                onChange={(e) => setDoctorContact(e.target.value)}
                placeholder="e.g. Dr. Anita Sen (+91 98111 22334)"
                className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs focus:ring-1 focus:ring-[#1B4958]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A5568] mb-1">
                {t.hospitalLabel}
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g. Apollo Cradle Hospital"
                className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs focus:ring-1 focus:ring-[#1B4958]"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="text-[11px] text-[#718096] bg-white p-3 rounded-xl border border-[#E3D7C7]">
            {t.privacyNote}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#D7CABA] text-xs font-medium text-[#4A5568] hover:bg-[#F2ECE1] transition"
            >
              {language === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={!previewInfo.isValid}
              className="px-5 py-2 rounded-xl bg-[#1B4958] hover:bg-[#123844] disabled:opacity-50 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{t.saveBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
