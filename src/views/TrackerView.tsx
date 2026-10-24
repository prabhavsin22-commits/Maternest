import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  HelpCircle,
  Stethoscope,
  Heart,
  Plus
} from 'lucide-react';
import { Language, GestationalInfo, WeekData } from '../types';
import { translations } from '../i18n/translations';
import { WEEKS_DATA } from '../data/weeksData';

interface TrackerViewProps {
  language: Language;
  gestationalInfo: GestationalInfo;
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
  onOpenDueDatePicker: () => void;
  onAddDoctorQuestionToPlanner?: (question: string) => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({
  language,
  gestationalInfo,
  selectedWeek,
  onSelectWeek,
  onOpenDueDatePicker,
  onAddDoctorQuestionToPlanner
}) => {
  const [trimesterFilter, setTrimesterFilter] = useState<0 | 1 | 2 | 3>(0);
  const [addedQuestions, setAddedQuestions] = useState<Record<string, boolean>>({});

  const isHindi = language === 'hi';
  const t = translations[language].tracker;

  const currentWeekNum = gestationalInfo.isValid ? gestationalInfo.weeks || 20 : 20;

  const filteredWeeks = WEEKS_DATA.filter((w) => {
    if (trimesterFilter === 0) return true;
    return w.trimester === trimesterFilter;
  });

  const weekData: WeekData = WEEKS_DATA.find((w) => w.week === selectedWeek) || WEEKS_DATA[19];

  const handlePrevWeek = () => {
    if (selectedWeek > 1) {
      onSelectWeek(selectedWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (selectedWeek < 40) {
      onSelectWeek(selectedWeek + 1);
    }
  };

  const handleAddQuestion = (q: string) => {
    if (onAddDoctorQuestionToPlanner) {
      onAddDoctorQuestionToPlanner(q);
      setAddedQuestions(prev => ({ ...prev, [q]: true }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Title & Gestational Reminder */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E3D7C7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
            {isHindi ? '40 सप्ताह की विकास यात्रा' : 'Week-by-Week Guide'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4958] mt-1">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#55606E] max-w-2xl mt-1.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Current status pill */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E3D7C7] flex items-center gap-3 shrink-0 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#1B4958] text-white flex items-center justify-center font-bold text-sm">
            {gestationalInfo.isValid ? `W${gestationalInfo.weeks}` : 'W20'}
          </div>
          <div>
            <div className="text-xs font-bold text-[#1B4958]">
              {gestationalInfo.isValid
                ? `${gestationalInfo.weeks} ${isHindi ? 'सप्ताह' : 'weeks'}, ${gestationalInfo.days} ${isHindi ? 'दिन' : 'days'}`
                : isHindi ? 'सप्ताह 20 (नमूना)' : 'Week 20 (Sample)'}
            </div>
            <div className="text-[11px] text-[#718096]">
              {gestationalInfo.isValid
                ? `${gestationalInfo.daysRemaining} ${isHindi ? 'दिन शेष' : 'days left'} • EDD ${gestationalInfo.dueDateFormatted}`
                : isHindi ? 'अपनी तारीख सेट करें' : 'Set your LMP / Due Date'}
            </div>
          </div>
          <button
            onClick={onOpenDueDatePicker}
            className="text-xs font-semibold text-[#D97757] hover:underline ml-2"
          >
            {isHindi ? 'बदलें' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Trimester Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setTrimesterFilter(0)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              trimesterFilter === 0
                ? 'bg-[#1B4958] text-white shadow-xs'
                : 'bg-white border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1]'
            }`}
          >
            {t.allTrimesters}
          </button>
          <button
            onClick={() => setTrimesterFilter(1)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              trimesterFilter === 1
                ? 'bg-[#1B4958] text-white shadow-xs'
                : 'bg-white border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1]'
            }`}
          >
            {t.trimester1}
          </button>
          <button
            onClick={() => setTrimesterFilter(2)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              trimesterFilter === 2
                ? 'bg-[#1B4958] text-white shadow-xs'
                : 'bg-white border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1]'
            }`}
          >
            {t.trimester2}
          </button>
          <button
            onClick={() => setTrimesterFilter(3)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              trimesterFilter === 3
                ? 'bg-[#1B4958] text-white shadow-xs'
                : 'bg-white border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1]'
            }`}
          >
            {t.trimester3}
          </button>
        </div>

        {/* Jump to current week */}
        <button
          onClick={() => onSelectWeek(currentWeekNum)}
          className="text-xs font-semibold text-[#1B4958] bg-[#FAF2EB] hover:bg-[#F5E5D8] px-3 py-1.5 rounded-xl border border-[#DECDBB] transition flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D97757]" />
          <span>{isHindi ? `मेरे वर्तमान सप्ताह (${currentWeekNum}) पर जाएं` : `Jump to Current Week (${currentWeekNum})`}</span>
        </button>
      </div>

      {/* Horizontal Week Pill Bar */}
      <div className="bg-white p-3 rounded-2xl border border-[#E3D7C7] overflow-x-auto shadow-2xs">
        <div className="flex items-center gap-1.5 min-w-max">
          {filteredWeeks.map((w) => {
            const isSelected = w.week === selectedWeek;
            const isCurrent = w.week === currentWeekNum;
            return (
              <button
                key={w.week}
                onClick={() => onSelectWeek(w.week)}
                className={`relative px-3 py-2 rounded-xl text-xs font-semibold transition flex flex-col items-center justify-center min-w-[50px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B4958] text-white shadow-sm'
                    : isCurrent
                    ? 'bg-[#FAF2EB] text-[#D97757] border border-[#D97757]'
                    : 'bg-[#FAF7F2] text-[#4A5568] hover:bg-[#EFE8DC]'
                }`}
              >
                <span>W{w.week}</span>
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97757] mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Week Deep-Dive Hero */}
      <div className="bg-white rounded-3xl border border-[#E3D7C7] p-6 sm:p-10 shadow-lg space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0E6D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1B4958] text-white text-xs font-bold">
                {isHindi ? `सप्ताह ${weekData.week}` : `Week ${weekData.week}`}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FAF2EB] text-[#D97757] text-xs font-semibold">
                {isHindi ? `तिमाही ${weekData.trimester}` : `Trimester ${weekData.trimester}`}
              </span>
              {weekData.week === currentWeekNum && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                  {isHindi ? 'वर्तमान सप्ताह' : 'Your Current Stage'}
                </span>
              )}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4958]">
              {isHindi ? `गर्भावस्था सप्ताह ${weekData.week}: शिशु का विकास` : `Pregnancy Week ${weekData.week} Overview`}
            </h2>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevWeek}
              disabled={selectedWeek <= 1}
              className="p-2.5 rounded-xl border border-[#DACFBF] text-[#1B4958] hover:bg-[#F4EEE4] disabled:opacity-30 transition cursor-pointer"
              title="Previous Week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-[#718096]">
              {selectedWeek} / 40
            </span>
            <button
              onClick={handleNextWeek}
              disabled={selectedWeek >= 40}
              className="p-2.5 rounded-xl border border-[#DACFBF] text-[#1B4958] hover:bg-[#F4EEE4] disabled:opacity-30 transition cursor-pointer"
              title="Next Week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Baby Size Comparison Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-gradient-to-r from-[#FAF6F0] to-[#F5ECE1] border border-[#E4DACB]">
          <div className="md:col-span-8 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white border border-[#D7CABA] shadow-xs flex items-center justify-center text-4xl shrink-0">
              🌱
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97757]">
                {t.sizeTitle}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1B4958]">
                {isHindi ? weekData.babySizeFruit.hi : weekData.babySizeFruit.en}
              </h3>
              <p className="text-xs sm:text-sm text-[#55606E]">
                {isHindi ? weekData.babySizeComparison.hi : weekData.babySizeComparison.en}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-white border border-[#E4DACB] shadow-2xs">
              <span className="text-[11px] text-[#718096] font-medium block">{t.length}</span>
              <span className="font-serif text-lg font-bold text-[#1B4958]">
                ~{weekData.lengthCm} cm
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E4DACB] shadow-2xs">
              <span className="text-[11px] text-[#718096] font-medium block">{t.weight}</span>
              <span className="font-serif text-lg font-bold text-[#1B4958]">
                ~{weekData.weightGrams >= 1000
                  ? `${(weekData.weightGrams / 1000).toFixed(2)} kg`
                  : `${weekData.weightGrams} g`}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column: Fetal Development & Maternal Changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fetal Development */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E4DACB] space-y-3">
            <div className="flex items-center gap-2 text-[#1B4958]">
              <Heart className="w-5 h-5 text-[#D97757] fill-[#D97757]/20" />
              <h3 className="font-serif text-lg font-bold">
                {t.developmentTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {isHindi ? weekData.fetalDevelopment.hi : weekData.fetalDevelopment.en}
            </p>
          </div>

          {/* Maternal Changes */}
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E4DACB] space-y-3">
            <div className="flex items-center gap-2 text-[#1B4958]">
              <Stethoscope className="w-5 h-5 text-[#5E8271]" />
              <h3 className="font-serif text-lg font-bold">
                {t.maternalTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {isHindi ? weekData.maternalChanges.hi : weekData.maternalChanges.en}
            </p>
          </div>
        </div>

        {/* Clinical Scans & Guidance */}
        <div className="p-6 rounded-2xl bg-white border border-[#DECDBB] space-y-2">
          <div className="flex items-center gap-2 text-[#1B4958]">
            <Info className="w-5 h-5 text-[#1B4958]" />
            <h3 className="font-serif text-lg font-bold">
              {t.testsTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
            {isHindi ? weekData.testsAndScans.hi : weekData.testsAndScans.en}
          </p>
        </div>

        {/* Doctor Questions Checklist */}
        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E4DACB] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#1B4958]">
              <HelpCircle className="w-5 h-5 text-[#D97757]" />
              <h3 className="font-serif text-lg font-bold">
                {t.doctorQuestionsTitle}
              </h3>
            </div>
            <span className="text-[11px] text-[#718096]">
              {isHindi ? 'अपॉइंटमेंट में पूछने के लिए' : 'Ask at next visit'}
            </span>
          </div>

          <div className="space-y-2">
            {(isHindi ? weekData.doctorQuestions.hi : weekData.doctorQuestions.en).map((q, idx) => {
              const isAdded = Boolean(addedQuestions[q]);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E4DACB] flex items-center justify-between gap-3 text-xs text-[#272B35]"
                >
                  <span className="font-medium">• {q}</span>
                  {onAddDoctorQuestionToPlanner && (
                    <button
                      onClick={() => handleAddQuestion(q)}
                      disabled={isAdded}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition shrink-0 flex items-center gap-1 ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-[#1B4958] hover:bg-[#123844] text-white cursor-pointer'
                      }`}
                    >
                      {isAdded ? (
                        <span>{isHindi ? 'जोड़ा गया' : 'Added to Planner'}</span>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>{isHindi ? 'प्लानर में जोड़ें' : 'Save to Planner'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Red Flags / Warning Signs */}
        <div className="p-6 rounded-2xl bg-[#FFF6F4] border border-[#F2D0C6] space-y-3">
          <div className="flex items-center gap-2 text-[#9A3412]">
            <AlertTriangle className="w-5 h-5 text-[#D97757]" />
            <h3 className="font-serif text-lg font-bold">
              {t.warningSignsTitle}
            </h3>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7C2D12]">
            {(isHindi ? weekData.warningSigns.hi : weekData.warningSigns.en).map((sign, idx) => (
              <li key={idx}>{sign}</li>
            ))}
          </ul>
        </div>

        {/* Clinical Attribution Metadata */}
        <div className="pt-4 border-t border-[#F0E6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8C7A6B]">
          <div>
            <span className="font-semibold text-[#1B4958]">{t.reviewedBy}: </span>
            <span>{weekData.reviewedBy}</span>
          </div>
          <div>
            <span>Reviewed: {weekData.reviewDate} • Guidelines: MoHFW India & WHO</span>
          </div>
        </div>
      </div>
    </div>
  );
};
