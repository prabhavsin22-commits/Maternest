import React, { useState } from 'react';
import {
  X,
  User,
  Shield,
  Download,
  Trash2,
  Check,
  Calendar,
  Lock,
  Heart,
  Phone,
  Building
} from 'lucide-react';
import { PregnancyProfile, Language, CalculationMethod } from '../types';
import { translations } from '../i18n/translations';
import { exportAllDataAsJSON, clearAllLocalData } from '../utils/storage';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PregnancyProfile;
  onSaveProfile: (profile: PregnancyProfile) => void;
  language: Language;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  language
}) => {
  const [userName, setUserName] = useState(profile.userName || '');
  const [partnerName, setPartnerName] = useState(profile.partnerName || '');
  const [method, setMethod] = useState<CalculationMethod>(profile.calculationMethod || 'lmp');
  const [lmpDate, setLmpDate] = useState(profile.lmpDate || '');
  const [dueDate, setDueDate] = useState(profile.dueDate || '');
  const [cycleLength, setCycleLength] = useState(profile.cycleLength || 28);
  const [bloodGroup, setBloodGroup] = useState(profile.bloodGroup || '');
  const [doctorContact, setDoctorContact] = useState(profile.doctorContact || '');
  const [hospitalName, setHospitalName] = useState(profile.hospitalName || '');
  const [emergencyContact, setEmergencyContact] = useState(profile.emergencyContact || '');

  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const t = translations[language].profileModal;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PregnancyProfile = {
      ...profile,
      userName: userName.trim() || 'Parent',
      partnerName: partnerName.trim(),
      calculationMethod: method,
      lmpDate,
      dueDate,
      cycleLength,
      bloodGroup: bloodGroup.trim(),
      doctorContact: doctorContact.trim(),
      hospitalName: hospitalName.trim(),
      emergencyContact: emergencyContact.trim(),
      onboardingCompleted: true
    };
    onSaveProfile(updated);
    onClose();
  };

  const handleExport = () => {
    exportAllDataAsJSON();
  };

  const handleClear = () => {
    if (confirm(t.clearConfirm)) {
      clearAllLocalData();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FAF7F2] border border-[#E3D7C7] rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1B4958] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#FAD2C0]" />
            <h3 className="font-serif text-lg font-bold">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-[#272B35]">
          {/* Identity Info */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[#D97757] text-[11px]">
              {isHindi ? 'व्यक्तिगत जानकारी' : 'Parent Identity'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {t.partnerLabel}
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#4A5568] mb-1">
                {t.bloodLabel}
              </label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                placeholder="e.g. B Positive (Rh +) or O Negative"
                className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
              />
            </div>
          </div>

          {/* Dates & Timeline */}
          <div className="space-y-3 pt-3 border-t border-[#E3D7C7]">
            <h4 className="font-bold uppercase tracking-wider text-[#D97757] text-[11px]">
              {isHindi ? 'गर्भावस्था गणना' : 'Pregnancy Dating'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {t.lmpOption}
                </label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {t.eddOption}
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Emergency & Doctor Contact */}
          <div className="space-y-3 pt-3 border-t border-[#E3D7C7]">
            <h4 className="font-bold uppercase tracking-wider text-[#D97757] text-[11px]">
              {isHindi ? 'डॉक्टर एवं आपातकालीन संपर्क' : 'Healthcare & Emergency Contacts'}
            </h4>

            <div>
              <label className="block font-semibold text-[#4A5568] mb-1">
                {t.doctorLabel}
              </label>
              <input
                type="text"
                value={doctorContact}
                onChange={(e) => setDoctorContact(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#4A5568] mb-1">
                {t.hospitalLabel}
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#4A5568] mb-1">
                {t.emergencyLabel}
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
              />
            </div>
          </div>

          {/* Privacy Trust Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#E3D7C7] space-y-2">
            <div className="flex items-center gap-2 text-[#1B4958] font-bold">
              <Lock className="w-4 h-4 text-[#D97757]" />
              <span>{isHindi ? 'डेटा सुरक्षा एवं गोपनीयता' : 'Privacy & Data Protection'}</span>
            </div>
            <p className="text-[11px] text-[#55606E] leading-relaxed">
              {t.privacyNote}
            </p>
          </div>

          {/* Data Management Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="flex-1 py-2 px-3 rounded-xl border border-[#DACFBF] bg-white hover:bg-[#F2ECE1] text-[#1B4958] font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#D97757]" />
              <span>{t.exportDataBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearDataBtn}</span>
            </button>
          </div>

          {/* Footer Save */}
          <div className="pt-4 border-t border-[#E3D7C7] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1] transition"
            >
              {isHindi ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#1B4958] hover:bg-[#123844] text-white font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
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
