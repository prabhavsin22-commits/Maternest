import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Play,
  Square,
  RotateCcw,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { ContractionRecord, KickSession, Language } from '../types';
import { translations } from '../i18n/translations';

interface ToolsViewProps {
  language: Language;
  contractions: ContractionRecord[];
  onSaveContractions: (records: ContractionRecord[]) => void;
  kickSessions: KickSession[];
  onSaveKickSessions: (sessions: KickSession[]) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  language,
  contractions,
  onSaveContractions,
  kickSessions,
  onSaveKickSessions
}) => {
  const [activeTab, setActiveTab] = useState<'contraction' | 'kicks'>('contraction');

  // Contraction State
  const [isTimingContraction, setIsTimingContraction] = useState(false);
  const [contractionStartTime, setContractionStartTime] = useState<number | null>(null);
  const [currentElapsedSec, setCurrentElapsedSec] = useState(0);

  // Kicks State
  const [isKickingActive, setIsKickingActive] = useState(false);
  const [kickSessionStart, setKickSessionStart] = useState<number | null>(null);
  const [kickCount, setKickCount] = useState(0);
  const [kickElapsedMin, setKickElapsedMin] = useState(0);

  const timerRef = useRef<any>(null);
  const kickTimerRef = useRef<any>(null);

  const isHindi = language === 'hi';
  const t = translations[language].tools;

  // Contraction timer interval
  useEffect(() => {
    if (isTimingContraction && contractionStartTime) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        setCurrentElapsedSec(Math.floor((now - contractionStartTime) / 1000));
      }, 500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimingContraction, contractionStartTime]);

  // Kick session timer
  useEffect(() => {
    if (isKickingActive && kickSessionStart) {
      kickTimerRef.current = setInterval(() => {
        const now = Date.now();
        setKickElapsedMin(Math.floor((now - kickSessionStart) / 60000));
      }, 2000);
    } else {
      clearInterval(kickTimerRef.current);
    }
    return () => clearInterval(kickTimerRef.current);
  }, [isKickingActive, kickSessionStart]);

  // Contraction Handlers
  const handleStartContraction = () => {
    setContractionStartTime(Date.now());
    setCurrentElapsedSec(0);
    setIsTimingContraction(true);
  };

  const handleStopContraction = () => {
    if (!contractionStartTime) return;
    const now = Date.now();
    const duration = Math.max(1, Math.floor((now - contractionStartTime) / 1000));

    let interval = 0;
    if (contractions.length > 0) {
      const lastStarted = contractions[0].startTime;
      interval = Math.floor((contractionStartTime - lastStarted) / 1000);
    }

    const newRecord: ContractionRecord = {
      id: `c-${Date.now()}`,
      startTime: contractionStartTime,
      endTime: now,
      durationSeconds: duration,
      intervalSeconds: interval
    };

    onSaveContractions([newRecord, ...contractions]);
    setIsTimingContraction(false);
    setContractionStartTime(null);
    setCurrentElapsedSec(0);
  };

  const handleClearContractions = () => {
    if (confirm(isHindi ? 'क्या आप संकुचन इतिहास साफ़ करना चाहते हैं?' : 'Reset contraction history?')) {
      onSaveContractions([]);
    }
  };

  // Kick Handlers
  const handleStartKickSession = () => {
    setIsKickingActive(true);
    setKickSessionStart(Date.now());
    setKickCount(0);
    setKickElapsedMin(0);
  };

  const handleAddKick = () => {
    if (!isKickingActive) {
      handleStartKickSession();
    }

    const nextCount = kickCount + 1;
    setKickCount(nextCount);

    if (nextCount >= 10 && kickSessionStart) {
      const now = Date.now();
      const minutesTaken = Math.max(1, Math.round((now - kickSessionStart) / 60000));

      const newSession: KickSession = {
        id: `k-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        startTime: kickSessionStart,
        endTime: now,
        totalMinutes: minutesTaken,
        kicksCount: 10
      };

      onSaveKickSessions([newSession, ...kickSessions]);
      setIsKickingActive(false);
      setKickSessionStart(null);
    }
  };

  const handleResetKicks = () => {
    setIsKickingActive(false);
    setKickSessionStart(null);
    setKickCount(0);
    setKickElapsedMin(0);
  };

  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 5-1-1 Rule Evaluation
  // Checks if last 3 contractions had interval <= 360s (approx 5-6 mins) and duration >= 50s
  const is511Active = contractions.length >= 3 && contractions.slice(0, 3).every(
    c => c.durationSeconds >= 45 && c.intervalSeconds > 0 && c.intervalSeconds <= 360
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="space-y-2 pb-6 border-b border-[#E3D7C7]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
          {isHindi ? 'क्लिनिकल उपयोगिता टूल्स' : 'Clinical Recordkeeping Tools'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B4958]">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#55606E] max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>

        {/* Disclaimer Card */}
        <div className="p-3.5 rounded-2xl bg-[#FFF6F4] border border-[#F2D0C6] text-xs text-[#7C2D12] flex items-start gap-2.5 mt-3">
          <ShieldAlert className="w-4 h-4 text-[#D97757] shrink-0 mt-0.5" />
          <span>{t.disclaimer}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E3D7C7] pb-2">
        <button
          onClick={() => setActiveTab('contraction')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'contraction'
              ? 'bg-[#1B4958] text-white shadow-xs'
              : 'text-[#4A5568] hover:bg-[#EFE8DC]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{t.contraction.title}</span>
        </button>

        <button
          onClick={() => setActiveTab('kicks')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'kicks'
              ? 'bg-[#1B4958] text-white shadow-xs'
              : 'text-[#4A5568] hover:bg-[#EFE8DC]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{t.kicks.title}</span>
        </button>
      </div>

      {/* TAB 1: CONTRACTION TIMER */}
      {activeTab === 'contraction' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Main Timer Display */}
          <div className="bg-white rounded-3xl border border-[#E3D7C7] p-8 sm:p-12 text-center space-y-6 shadow-md max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97757]">
              {isTimingContraction
                ? isHindi ? 'संकुचन जारी है...' : 'Timing Active Contraction...'
                : isHindi ? 'तैयार' : 'Ready to Time'}
            </span>

            {/* Huge Timer */}
            <div className="font-serif text-6xl sm:text-7xl font-bold text-[#1B4958] tracking-tight tabular-nums">
              {formatTime(currentElapsedSec)}
            </div>

            {/* Big Action Button */}
            <div className="flex justify-center">
              {!isTimingContraction ? (
                <button
                  onClick={handleStartContraction}
                  className="w-44 h-44 rounded-full bg-[#1B4958] hover:bg-[#123844] text-white font-serif text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
                >
                  <Play className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
                  <span>{t.contraction.start}</span>
                </button>
              ) : (
                <button
                  onClick={handleStopContraction}
                  className="w-44 h-44 rounded-full bg-[#D97757] hover:bg-[#C26244] text-white font-serif text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <Square className="w-8 h-8 fill-white" />
                  <span>{t.contraction.stop}</span>
                </button>
              )}
            </div>

            {/* 5-1-1 Rule Advice */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E4DACB] text-xs text-[#55606E] leading-relaxed text-left space-y-1">
              <strong className="text-[#1B4958] block font-semibold">
                {t.contraction.ruleTitle}
              </strong>
              <p>{t.contraction.ruleText}</p>
            </div>

            {is511Active && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{t.contraction.alert511}</span>
              </div>
            )}
          </div>

          {/* History Table */}
          <div className="bg-white rounded-3xl border border-[#E3D7C7] p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
              <h3 className="font-serif text-lg font-bold text-[#1B4958]">
                {t.contraction.historyTitle} ({contractions.length})
              </h3>
              {contractions.length > 0 && (
                <button
                  onClick={handleClearContractions}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.contraction.clear}</span>
                </button>
              )}
            </div>

            {contractions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E3D7C7] text-[#718096]">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">{isHindi ? 'समय' : 'Time'}</th>
                      <th className="py-2.5 px-3">{t.contraction.durationCol}</th>
                      <th className="py-2.5 px-3">{t.contraction.intervalCol}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0E6D8]">
                    {contractions.map((c, idx) => (
                      <tr key={c.id} className="hover:bg-[#FAF7F2]">
                        <td className="py-2.5 px-3 font-bold text-[#1B4958]">
                          {contractions.length - idx}
                        </td>
                        <td className="py-2.5 px-3 text-[#55606E]">
                          {new Date(c.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#D97757]">
                          {c.durationSeconds}s ({formatTime(c.durationSeconds)})
                        </td>
                        <td className="py-2.5 px-3 text-[#55606E]">
                          {c.intervalSeconds > 0
                            ? `${Math.floor(c.intervalSeconds / 60)}m ${c.intervalSeconds % 60}s`
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-[#718096] text-center py-6">
                {isHindi ? 'अभी कोई संकुचन दर्ज नहीं है।' : 'No contractions logged in this session.'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: KICK COUNTER */}
      {activeTab === 'kicks' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E3D7C7] p-8 sm:p-12 text-center space-y-6 shadow-md max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97757]">
              {isHindi ? '10 हलचल (किक) गणना विधि' : 'Clinical "Count-to-10" Method'}
            </span>

            {/* Kicks counter display */}
            <div className="font-serif text-6xl sm:text-7xl font-bold text-[#1B4958] tracking-tight">
              {kickCount} / 10
            </div>

            <p className="text-xs font-medium text-[#718096]">
              {t.kicks.kicksCounted.replace('{count}', kickCount.toString())}
              {isKickingActive && ` • ${kickElapsedMin} min elapsed`}
            </p>

            {/* Progress Bar */}
            <div className="h-3 w-full bg-[#EAE0D2] rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className="h-full bg-gradient-to-r from-[#5E8271] to-[#1B4958] rounded-full transition-all duration-300"
                style={{ width: `${(kickCount / 10) * 100}%` }}
              />
            </div>

            {/* Big Tap Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={handleAddKick}
                className="w-48 h-48 rounded-full bg-[#5E8271] hover:bg-[#4E6F60] text-white font-serif text-base font-bold shadow-xl hover:shadow-2xl transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group"
              >
                <Heart className="w-10 h-10 fill-white group-hover:scale-110 transition-transform" />
                <span className="text-center px-4 leading-tight">
                  {t.kicks.recordKick}
                </span>
              </button>
            </div>

            {isKickingActive && (
              <button
                onClick={handleResetKicks}
                className="text-xs text-[#718096] hover:text-[#272B35] underline cursor-pointer"
              >
                Cancel / Reset Session
              </button>
            )}

            {/* Guidelines & Safety Warning */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E4DACB] text-xs text-[#55606E] leading-relaxed text-left space-y-1">
              <p className="font-semibold text-[#1B4958]">{t.kicks.guideline}</p>
              <p className="text-[#8C3A27]">{t.kicks.warningText}</p>
            </div>
          </div>

          {/* Past Kick Sessions */}
          <div className="bg-white rounded-3xl border border-[#E3D7C7] p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#1B4958] pb-3 border-b border-[#F0E6D8]">
              {isHindi ? 'सम्पन्न किक सत्र' : 'Completed 10-Kick Sessions'} ({kickSessions.length})
            </h3>

            {kickSessions.length > 0 ? (
              <div className="space-y-2.5">
                {kickSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E4DACB] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-[#1B4958]">{session.date}</span>
                    </div>
                    <span className="font-semibold text-[#5E8271]">
                      10 kicks in {session.totalMinutes} minutes
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#718096] text-center py-6">
                {isHindi ? 'अभी कोई सत्र पूरा नहीं हुआ है।' : 'No completed kick sessions yet.'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
