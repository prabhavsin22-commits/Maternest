import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  Sparkles,
  Plus,
  Trash2,
  Printer,
  Smile,
  X,
  Award,
  Tag
} from 'lucide-react';
import { JournalEntry, MoodType, Language, GestationalInfo } from '../types';
import { translations } from '../i18n/translations';

interface JournalViewProps {
  language: Language;
  journalEntries: JournalEntry[];
  gestationalInfo: GestationalInfo;
  onSaveEntries: (entries: JournalEntry[]) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  language,
  journalEntries,
  gestationalInfo,
  onSaveEntries
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Form
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [entryWeek, setEntryWeek] = useState(gestationalInfo.weeks || 20);
  const [mood, setMood] = useState<MoodType>('joyful');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [bumpSizeCm, setBumpSizeCm] = useState<string>('');
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [notes, setNotes] = useState('');

  const isHindi = language === 'hi';
  const t = translations[language].journal;

  const commonSymptoms = isHindi
    ? ['हल्की मतली', 'कमर दर्द', 'पैरों में सूजन', 'थकान', 'खट्टी डकारें/एसिडिटी', 'शिशु की हलचल', 'अनिद्रा', 'भूख बढ़ना']
    : ['Mild Nausea', 'Backache', 'Foot Swelling', 'Fatigue', 'Heartburn / Acidity', 'Fetal Kicks', 'Insomnia', 'Increased Appetite'];

  const commonMilestones = isHindi
    ? [
        'पहली बार दिल की धड़कन सुनी',
        'पहली नन्हीं हलचल महसूस हुई ("क्विकनिंग")',
        'लेवल-2 अनोमली स्कैन पूरा हुआ',
        '20 सप्ताह का आधा पड़ाव संपन्न',
        'गोद भराई (Baby Shower) उत्सव',
        'शिशु का नाम तय किया',
        'अस्पताल का बैग तैयार किया'
      ]
    : [
        'Heard Fetal Heartbeat for First Time',
        'Felt First Baby Kicks ("Quickening")',
        'Completed Level-2 Anomaly Scan',
        'Reached Halfway Milestone (20 Weeks)',
        'Godh Bharai / Baby Shower Celebrated',
        'Finalized Baby Name Ideas',
        'Hospital Bag Packed & Ready'
      ];

  const handleOpenModal = () => {
    setEntryDate(new Date().toISOString().split('T')[0]);
    setEntryWeek(gestationalInfo.weeks || 20);
    setMood('joyful');
    setSymptoms([]);
    setBumpSizeCm('');
    setMilestoneTitle('');
    setNotes('');
    setModalOpen(true);
  };

  const toggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) {
      setSymptoms(symptoms.filter(s => s !== sym));
    } else {
      setSymptoms([...symptoms, sym]);
    }
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim() && !milestoneTitle.trim()) return;

    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: entryDate,
      week: Number(entryWeek),
      mood,
      symptoms,
      bumpSizeCm: bumpSizeCm ? parseFloat(bumpSizeCm) : undefined,
      milestoneTitle: milestoneTitle.trim() || undefined,
      notes: notes.trim(),
      createdAt: Date.now()
    };

    onSaveEntries([newEntry, ...journalEntries]);
    setModalOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm(isHindi ? 'क्या आप इस प्रविष्टि को हटाना चाहते हैं?' : 'Delete this journal entry?')) {
      onSaveEntries(journalEntries.filter(e => e.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E3D7C7] no-print">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
            {isHindi ? 'यादगार पल एवं डायरी' : 'Private Reflections'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4958] mt-1">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#55606E] max-w-2xl mt-1.5 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-[#DACFBF] bg-white hover:bg-[#F2ECE1] text-[#1B4958] text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Printer className="w-4 h-4 text-[#D97757]" />
            <span>{t.printJournal}</span>
          </button>

          <button
            onClick={handleOpenModal}
            className="px-4 py-2.5 rounded-xl bg-[#1B4958] hover:bg-[#123844] text-white text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t.newEntryBtn}</span>
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-6">
        {journalEntries.length > 0 ? (
          journalEntries.map((entry) => {
            const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString(
              isHindi ? 'hi-IN' : 'en-IN',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            );

            return (
              <div
                key={entry.id}
                className="bg-white rounded-3xl border border-[#E3D7C7] p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0E6D8]">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-[#1B4958] text-white text-xs font-bold">
                      {isHindi ? `सप्ताह ${entry.week}` : `Week ${entry.week}`}
                    </span>
                    <span className="text-xs font-bold text-[#8C7A6B] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formattedDate}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#D97757] text-xs font-medium">
                      {t.moods[entry.mood]}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="self-end sm:self-auto text-red-400 hover:text-red-600 p-1.5 rounded-lg transition no-print"
                    title={t.deleteBtn}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Milestone Banner if achieved */}
                {entry.milestoneTitle && (
                  <div className="p-3.5 rounded-2xl bg-[#FAF2EB] border border-[#EAD5C3] flex items-center gap-2.5 text-[#8C3A27]">
                    <Award className="w-5 h-5 text-[#D97757] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#A26D55] block">
                        {t.milestone}
                      </span>
                      <span className="font-serif text-base font-bold text-[#1B4958]">
                        {entry.milestoneTitle}
                      </span>
                    </div>
                  </div>
                )}

                {/* Body Text */}
                <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap font-sans">
                  {entry.notes}
                </p>

                {/* Tags: Symptoms & Bump Size */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {entry.bumpSizeCm && (
                    <span className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#E4DACB] text-[11px] font-semibold text-[#1B4958]">
                      📏 {t.bumpSize.replace('{cm}', entry.bumpSizeCm.toString())}
                    </span>
                  )}

                  {entry.symptoms &&
                    entry.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#E4DACB] text-[11px] text-[#55606E]"
                      >
                        • {s}
                      </span>
                    ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#E3D7C7] space-y-3 max-w-md mx-auto">
            <Heart className="w-10 h-10 text-[#8C7A6B] mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {t.empty}
            </h3>
            <button
              onClick={handleOpenModal}
              className="px-5 py-2.5 rounded-xl bg-[#1B4958] text-white text-xs font-semibold hover:bg-[#123844] transition mt-2 cursor-pointer"
            >
              {t.newEntryBtn}
            </button>
          </div>
        )}
      </div>

      {/* New Journal Entry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-[#FAF7F2] border border-[#E3D7C7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#1B4958] text-white flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {t.newEntryBtn}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEntry} className="p-6 space-y-4 text-xs text-[#272B35]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A5568] mb-1">
                    {isHindi ? 'दिनांक:' : 'Date:'}
                  </label>
                  <input
                    type="date"
                    required
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A5568] mb-1">
                    {isHindi ? 'सप्ताह (1-40):' : 'Pregnancy Week:'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="42"
                    required
                    value={entryWeek}
                    onChange={(e) => setEntryWeek(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  />
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'आज का मूड / भावना:' : 'Today\'s Mood:'}
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value as MoodType)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                >
                  <option value="joyful">{t.moods.joyful}</option>
                  <option value="peaceful">{t.moods.peaceful}</option>
                  <option value="excited">{t.moods.excited}</option>
                  <option value="tired">{t.moods.tired}</option>
                  <option value="nauseous">{t.moods.nauseous}</option>
                  <option value="anxious">{t.moods.anxious}</option>
                </select>
              </div>

              {/* Milestone Achieved (Optional) */}
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'मील का पत्थर / खास अवसर (वैकल्पिक):' : 'Milestone Celebrated (Optional):'}
                </label>
                <input
                  type="text"
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  placeholder="e.g. Felt first kick, or choose from below..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {commonMilestones.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMilestoneTitle(m)}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#D7CABA] hover:bg-[#F2ECE1] text-[#1B4958]"
                    >
                      + {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms Selector */}
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'आज महसूस हुए लक्षण:' : 'Symptoms Felt Today:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {commonSymptoms.map((sym, idx) => {
                    const isSelected = symptoms.includes(sym);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`text-[11px] px-2.5 py-1 rounded-xl border transition ${
                          isSelected
                            ? 'bg-[#1B4958] text-white border-[#1B4958]'
                            : 'bg-white border-[#D7CABA] text-[#4A5568] hover:bg-[#F2ECE1]'
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bump Measurement */}
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'पेट का घेराव (सेमी में, वैकल्पिक):' : 'Belly Circumference (cm, Optional):'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={bumpSizeCm}
                  onChange={(e) => setBumpSizeCm(e.target.value)}
                  placeholder="e.g. 86"
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                />
              </div>

              {/* Reflection Notes */}
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'अपनी भावनाएं और विचार लिखें:' : 'Reflections & Memories:'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How was today? What movements did you notice? Any sweet moments with partner..."
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D7CABA] bg-white text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E3D7C7]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#D7CABA] text-[#4A5568] hover:bg-[#F2ECE1] transition cursor-pointer"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B4958] hover:bg-[#123844] text-white font-semibold transition cursor-pointer"
                >
                  {isHindi ? 'सहेजें' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
