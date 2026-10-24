import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  CheckCircle2,
  Circle,
  Download,
  Trash2,
  Edit2,
  X,
  Check,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Appointment, AppointmentType, Language } from '../types';
import { translations } from '../i18n/translations';
import { exportAppointmentsToIcs } from '../utils/calendarExport';

interface PlannerViewProps {
  language: Language;
  appointments: Appointment[];
  onSaveAppointments: (appointments: Appointment[]) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  language,
  appointments,
  onSaveAppointments
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<AppointmentType>('routine');
  const [doctor, setDoctor] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestionInput, setNewQuestionInput] = useState('');

  const isHindi = language === 'hi';
  const t = translations[language].planner;

  const nowIso = new Date().toISOString();

  const upcomingAppointments = appointments
    .filter(a => !a.isCompleted && a.dateTime >= nowIso.slice(0, 10))
    .sort((a, b) => a.dateTime.localeCompare(b.dateTime));

  const pastAppointments = appointments
    .filter(a => a.isCompleted || a.dateTime < nowIso.slice(0, 10))
    .sort((a, b) => b.dateTime.localeCompare(a.dateTime));

  const openNewModal = () => {
    setEditingId(null);
    setTitle('');
    setType('routine');
    setDoctor('');
    setLocation('');
    // Default to tomorrow 10:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    setDateTime(tomorrow.toISOString().slice(0, 16));
    setNotes('');
    setQuestions([]);
    setNewQuestionInput('');
    setModalOpen(true);
  };

  const openEditModal = (apt: Appointment) => {
    setEditingId(apt.id);
    setTitle(apt.title);
    setType(apt.type);
    setDoctor(apt.doctor);
    setLocation(apt.location);
    setDateTime(apt.dateTime);
    setNotes(apt.notes || '');
    setQuestions(apt.questions || []);
    setNewQuestionInput('');
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateTime) return;

    if (editingId) {
      const updated = appointments.map(a =>
        a.id === editingId
          ? {
              ...a,
              title: title.trim(),
              type,
              doctor: doctor.trim(),
              location: location.trim(),
              dateTime,
              notes: notes.trim(),
              questions
            }
          : a
      );
      onSaveAppointments(updated);
    } else {
      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        title: title.trim(),
        type,
        doctor: doctor.trim(),
        location: location.trim(),
        dateTime,
        notes: notes.trim(),
        questions,
        isCompleted: false
      };
      onSaveAppointments([...appointments, newApt]);
    }

    setModalOpen(false);
  };

  const handleToggleComplete = (id: string) => {
    const updated = appointments.map(a =>
      a.id === id ? { ...a, isCompleted: !a.isCompleted } : a
    );
    onSaveAppointments(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm(isHindi ? 'क्या आप इस अपॉइंटमेंट को हटाना चाहते हैं?' : 'Delete this appointment?')) {
      const updated = appointments.filter(a => a.id !== id);
      onSaveAppointments(updated);
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestionInput.trim()) return;
    setQuestions(prev => [...prev, newQuestionInput.trim()]);
    setNewQuestionInput('');
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleExportIcs = () => {
    exportAppointmentsToIcs(appointments);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E3D7C7]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
            {isHindi ? 'प्रसवपूर्व जांच योजना' : 'Prenatal Care Schedule'}
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
            onClick={handleExportIcs}
            className="px-4 py-2.5 rounded-xl border border-[#DACFBF] bg-white hover:bg-[#F2ECE1] text-[#1B4958] text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-2xs"
            title="Download .ics file"
          >
            <Download className="w-4 h-4 text-[#D97757]" />
            <span>{t.exportIcs}</span>
          </button>

          <button
            onClick={openNewModal}
            className="px-4 py-2.5 rounded-xl bg-[#1B4958] hover:bg-[#123844] text-white text-xs font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addBtn}</span>
          </button>
        </div>
      </div>

      {/* Tabs: Upcoming vs Past */}
      <div className="flex items-center gap-2 border-b border-[#E3D7C7] pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'bg-[#1B4958] text-white'
              : 'text-[#4A5568] hover:bg-[#EFE8DC]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t.upcomingTab}</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
            {upcomingAppointments.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'past'
              ? 'bg-[#1B4958] text-white'
              : 'text-[#4A5568] hover:bg-[#EFE8DC]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t.pastTab}</span>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
            {pastAppointments.length}
          </span>
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).length > 0 ? (
          (activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map((apt) => {
            const formattedDate = new Date(apt.dateTime).toLocaleDateString('en-IN', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={apt.id}
                className={`p-6 rounded-3xl border transition-all bg-white shadow-2xs ${
                  apt.isCompleted ? 'border-[#E4DACB] opacity-75' : 'border-[#DECDBB] hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF2EB] text-[#D97757] text-[10px] font-bold uppercase tracking-wider">
                        {apt.type}
                      </span>
                      <span className="text-xs font-semibold text-[#1B4958] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D97757]" />
                        {formattedDate}
                      </span>
                    </div>

                    <h3
                      className={`font-serif text-xl font-bold text-[#1B4958] ${
                        apt.isCompleted ? 'line-through text-[#8C7A6B]' : ''
                      }`}
                    >
                      {apt.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#55606E]">
                      {apt.doctor && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#8C7A6B]" />
                          {apt.doctor}
                        </span>
                      )}
                      {apt.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#8C7A6B]" />
                          {apt.location}
                        </span>
                      )}
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-[#4A5568] bg-[#FAF6F0] p-3 rounded-xl border border-[#EBE3D7] leading-relaxed">
                        {apt.notes}
                      </p>
                    )}

                    {/* Questions checklist attached */}
                    {apt.questions && apt.questions.length > 0 && (
                      <div className="pt-2 space-y-1">
                        <span className="text-[11px] font-bold text-[#1B4958] flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-[#D97757]" />
                          {t.questionsLabel}
                        </span>
                        <ul className="list-disc pl-5 text-xs text-[#55606E] space-y-0.5">
                          {apt.questions.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                    <button
                      onClick={() => handleToggleComplete(apt.id)}
                      className={`p-2 rounded-xl border transition cursor-pointer ${
                        apt.isCompleted
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'border-[#DACFBF] text-[#718096] hover:bg-[#F2ECE1]'
                      }`}
                      title={apt.isCompleted ? t.markPending : t.markDone}
                    >
                      {apt.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => openEditModal(apt)}
                      className="p-2 rounded-xl border border-[#DACFBF] text-[#4A5568] hover:bg-[#F2ECE1] transition cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#E3D7C7] space-y-3 max-w-md mx-auto">
            <Calendar className="w-10 h-10 text-[#8C7A6B] mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-[#1B4958]">
              {activeTab === 'upcoming' ? t.emptyUpcoming : t.emptyPast}
            </h3>
            {activeTab === 'upcoming' && (
              <button
                onClick={openNewModal}
                className="px-4 py-2 rounded-xl bg-[#1B4958] text-white text-xs font-semibold hover:bg-[#123844] transition mt-2 cursor-pointer"
              >
                {t.addBtn}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#E3D7C7] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 bg-[#1B4958] text-white flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {editingId ? (isHindi ? 'अपॉइंटमेंट संपादित करें' : 'Edit Appointment') : (isHindi ? 'नया अपॉइंटमेंट जोड़ें' : 'Schedule Appointment')}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs text-[#272B35]">
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'शीर्षक / जांच का नाम:' : 'Appointment Title:'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 20-Week Anomaly Scan or Routine ANC"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D7CABA] bg-white text-sm focus:ring-1 focus:ring-[#1B4958]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A5568] mb-1">
                    {isHindi ? 'प्रकार:' : 'Type:'}
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as AppointmentType)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  >
                    <option value="routine">{isHindi ? 'नियमित जांच' : 'Routine Checkup'}</option>
                    <option value="scan">{isHindi ? 'अल्ट्रासाउंड स्कैन' : 'Ultrasound Scan'}</option>
                    <option value="bloodwork">{isHindi ? 'ब्लड टेस्ट' : 'Blood Test'}</option>
                    <option value="glucose">{isHindi ? 'शुगर (OGTT)' : 'Glucose (OGTT)'}</option>
                    <option value="paediatric">{isHindi ? 'बाल रोग विशेषज्ञ' : 'Pediatrician'}</option>
                    <option value="other">{isHindi ? 'अन्य' : 'Other'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#4A5568] mb-1">
                    {isHindi ? 'दिनांक एवं समय:' : 'Date & Time:'}
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#4A5568] mb-1">
                    {isHindi ? 'डॉक्टर / विशेषज्ञ:' : 'Doctor / Specialist:'}
                  </label>
                  <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    placeholder="e.g. Dr. Anita Sen"
                    className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#4A5568] mb-1">
                    {isHindi ? 'अस्पताल / क्लिनिक:' : 'Hospital / Clinic:'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Apollo Cradle"
                    className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {isHindi ? 'नोट्स / निर्देश:' : 'Clinical Notes / Instructions:'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Fasting 8 hours before OGTT blood draw..."
                  className="w-full px-3 py-2 rounded-xl border border-[#D7CABA] bg-white text-xs"
                />
              </div>

              {/* Questions Checklist */}
              <div>
                <label className="block font-semibold text-[#4A5568] mb-1">
                  {t.questionsLabel}
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newQuestionInput}
                    onChange={(e) => setNewQuestionInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddQuestion();
                      }
                    }}
                    placeholder={t.addQuestionPlaceholder}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[#D7CABA] bg-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-1.5 rounded-xl bg-[#1B4958] text-white font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {questions.length > 0 && (
                  <ul className="space-y-1 max-h-28 overflow-y-auto">
                    {questions.map((q, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E3D7C7] text-[11px]"
                      >
                        <span>• {q}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
                  {isHindi ? 'सहेजें' : 'Save Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
