/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Footer } from './components/Footer';
import { DueDatePickerModal } from './components/DueDatePickerModal';
import { MaternaNestGuideModal } from './components/MaternaNestGuideModal';
import { ArticleDetailModal } from './views/ArticleDetailModal';
import { HomeView } from './views/HomeView';
import { TrackerView } from './views/TrackerView';
import { LibraryView } from './views/LibraryView';
import { PlannerView } from './views/PlannerView';
import { ChecklistsView } from './views/ChecklistsView';
import { JournalView } from './views/JournalView';
import { ToolsView } from './views/ToolsView';
import { ProfileSettingsModal } from './views/ProfileSettingsModal';

import {
  Language,
  PregnancyProfile,
  Article,
  Appointment,
  ChecklistItem,
  JournalEntry,
  ContractionRecord,
  KickSession
} from './types';
import { calculateGestationalInfo } from './utils/pregnancyCalculator';
import {
  getStoredLanguage,
  setStoredLanguage,
  getStoredProfile,
  saveStoredProfile,
  getStoredAppointments,
  saveStoredAppointments,
  getStoredChecklists,
  saveStoredChecklists,
  getStoredJournal,
  saveStoredJournal,
  getStoredBookmarks,
  saveStoredBookmarks,
  getStoredContractions,
  saveStoredContractions,
  getStoredKickSessions,
  saveStoredKickSessions
} from './utils/storage';

export default function App() {
  // App State
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const [profile, setProfile] = useState<PregnancyProfile>(getStoredProfile);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedWeek, setSelectedWeek] = useState<number>(20);

  // Data Collections
  const [appointments, setAppointments] = useState<Appointment[]>(getStoredAppointments);
  const [checklists, setChecklists] = useState<ChecklistItem[]>(getStoredChecklists);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(getStoredJournal);
  const [bookmarks, setBookmarks] = useState<string[]>(getStoredBookmarks);
  const [contractions, setContractions] = useState<ContractionRecord[]>(getStoredContractions);
  const [kickSessions, setKickSessions] = useState<KickSession[]>(getStoredKickSessions);

  // Modals
  const [dueDatePickerOpen, setDueDatePickerOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Compute gestational information dynamically
  const gestationalInfo = useMemo(() => {
    const primaryDate =
      profile.calculationMethod === 'lmp' ? profile.lmpDate : profile.dueDate;
    return calculateGestationalInfo(
      profile.calculationMethod,
      primaryDate,
      profile.cycleLength
    );
  }, [profile]);

  // Sync selected week when profile date updates
  useEffect(() => {
    if (gestationalInfo.isValid && gestationalInfo.weeks >= 1 && gestationalInfo.weeks <= 40) {
      setSelectedWeek(gestationalInfo.weeks);
    }
  }, [gestationalInfo.weeks, gestationalInfo.isValid]);

  // Language toggle
  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    setStoredLanguage(nextLang);
  };

  // Profile save
  const handleSaveProfile = (updatedProfile: PregnancyProfile) => {
    setProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
  };

  // Appointments save
  const handleSaveAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    saveStoredAppointments(updated);
  };

  // Checklists save
  const handleSaveChecklists = (updated: ChecklistItem[]) => {
    setChecklists(updated);
    saveStoredChecklists(updated);
  };

  // Journal save
  const handleSaveJournal = (updated: JournalEntry[]) => {
    setJournalEntries(updated);
    saveStoredJournal(updated);
  };

  // Bookmark toggle
  const handleToggleBookmark = (articleId: string) => {
    let nextBookmarks: string[];
    if (bookmarks.includes(articleId)) {
      nextBookmarks = bookmarks.filter(id => id !== articleId);
    } else {
      nextBookmarks = [...bookmarks, articleId];
    }
    setBookmarks(nextBookmarks);
    saveStoredBookmarks(nextBookmarks);
  };

  // Contractions save
  const handleSaveContractions = (updated: ContractionRecord[]) => {
    setContractions(updated);
    saveStoredContractions(updated);
  };

  // Kick sessions save
  const handleSaveKickSessions = (updated: KickSession[]) => {
    setKickSessions(updated);
    saveStoredKickSessions(updated);
  };

  // Helper: Append doctor question to next upcoming appointment or create draft
  const handleAddDoctorQuestionToPlanner = (questionText: string) => {
    const nowIso = new Date().toISOString();
    const upcoming = appointments.find(a => !a.isCompleted && a.dateTime >= nowIso.slice(0, 10));

    if (upcoming) {
      const updated = appointments.map(a =>
        a.id === upcoming.id
          ? { ...a, questions: [...(a.questions || []), questionText] }
          : a
      );
      handleSaveAppointments(updated);
    } else {
      // Create new draft appointment for next checkup
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 7);
      nextDate.setHours(10, 0, 0, 0);

      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        title: language === 'hi' ? 'आगामी डॉक्टर विज़िट' : 'Upcoming Prenatal Visit',
        type: 'routine',
        doctor: profile.doctorContact || 'Obstetrician',
        location: profile.hospitalName || 'Clinic',
        dateTime: nextDate.toISOString().slice(0, 16),
        notes: '',
        questions: [questionText],
        isCompleted: false
      };
      handleSaveAppointments([...appointments, newApt]);
    }
  };

  // Scroll to top on tab change
  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col text-[#272B35] font-sans selection:bg-[#FAD2C0] selection:text-[#1B4958]">
      {/* Top Clinical Safety Banner */}
      <EmergencyBanner language={language} />

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        gestationalInfo={gestationalInfo}
        profile={profile}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            gestationalInfo={gestationalInfo}
            profile={profile}
            onSelectTab={handleSelectTab}
            onOpenDueDatePicker={() => setDueDatePickerOpen(true)}
            onOpenGuide={() => setGuideModalOpen(true)}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onSelectWeek={(wk) => setSelectedWeek(wk)}
          />
        )}

        {currentTab === 'tracker' && (
          <TrackerView
            language={language}
            gestationalInfo={gestationalInfo}
            selectedWeek={selectedWeek}
            onSelectWeek={(wk) => setSelectedWeek(wk)}
            onOpenDueDatePicker={() => setDueDatePickerOpen(true)}
            onAddDoctorQuestionToPlanner={handleAddDoctorQuestionToPlanner}
          />
        )}

        {currentTab === 'library' && (
          <LibraryView
            language={language}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onOpenArticle={(art) => setSelectedArticle(art)}
            onOpenGuide={() => setGuideModalOpen(true)}
          />
        )}

        {currentTab === 'planner' && (
          <PlannerView
            language={language}
            appointments={appointments}
            onSaveAppointments={handleSaveAppointments}
          />
        )}

        {currentTab === 'checklists' && (
          <ChecklistsView
            language={language}
            checklists={checklists}
            onSaveChecklists={handleSaveChecklists}
          />
        )}

        {currentTab === 'journal' && (
          <JournalView
            language={language}
            journalEntries={journalEntries}
            gestationalInfo={gestationalInfo}
            onSaveEntries={handleSaveJournal}
          />
        )}

        {currentTab === 'tools' && (
          <ToolsView
            language={language}
            contractions={contractions}
            onSaveContractions={handleSaveContractions}
            kickSessions={kickSessions}
            onSaveKickSessions={handleSaveKickSessions}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onSelectTab={handleSelectTab}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Due Date & Profile Calculation Modal */}
      <DueDatePickerModal
        isOpen={dueDatePickerOpen}
        onClose={() => setDueDatePickerOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        language={language}
      />

      {/* MaternaNest Guide AI Modal */}
      <MaternaNestGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        language={language}
        currentWeek={gestationalInfo.isValid ? gestationalInfo.weeks : selectedWeek}
      />

      {/* Profile & Privacy Settings Modal */}
      <ProfileSettingsModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        language={language}
      />

      {/* Article Detail Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        language={language}
        isBookmarked={selectedArticle ? bookmarks.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
