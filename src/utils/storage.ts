import {
  PregnancyProfile,
  Appointment,
  ChecklistItem,
  JournalEntry,
  ContractionRecord,
  KickSession,
  Language
} from '../types';
import { getDefaultSampleLmp, getDefaultSampleDueDate } from './pregnancyCalculator';
import { DEFAULT_CHECKLISTS } from '../data/defaultChecklists';

const PROFILE_KEY = 'maternanest_profile';
const APPOINTMENTS_KEY = 'maternanest_appointments';
const CHECKLISTS_KEY = 'maternanest_checklists';
const JOURNAL_KEY = 'maternanest_journal';
const BOOKMARKS_KEY = 'maternanest_bookmarks';
const CONTRACTIONS_KEY = 'maternanest_contractions';
const KICKS_KEY = 'maternanest_kicks';
const LANG_KEY = 'maternanest_lang';

export function getStoredLanguage(): Language {
  try {
    const val = localStorage.getItem(LANG_KEY);
    if (val === 'hi' || val === 'en') return val;
  } catch (e) {
    console.error(e);
  }
  return 'en';
}

export function setStoredLanguage(lang: Language) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.error(e);
  }
}

export function getStoredProfile(): PregnancyProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(e);
  }

  // Default guest/demo profile at ~20 weeks (halfway milestone)
  return {
    userName: 'Pooja Sharma',
    partnerName: 'Rohit Sharma',
    calculationMethod: 'lmp',
    lmpDate: getDefaultSampleLmp(),
    cycleLength: 28,
    dueDate: getDefaultSampleDueDate(),
    bloodGroup: 'B Positive (Rh +)',
    emergencyContact: '+91 98765 43210',
    doctorContact: 'Dr. Anita Sen (+91 98111 22334)',
    hospitalName: 'Apollo Cradle & Children’s Hospital, New Delhi',
    onboardingCompleted: true
  };
}

export function saveStoredProfile(profile: PregnancyProfile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }

  // Sample upcoming and past appointments for rich experience
  const sampleDate1 = new Date();
  sampleDate1.setDate(sampleDate1.getDate() + 5);
  sampleDate1.setHours(10, 30, 0, 0);

  const sampleDate2 = new Date();
  sampleDate2.setDate(sampleDate2.getDate() + 20);
  sampleDate2.setHours(11, 0, 0, 0);

  const sampleDatePast = new Date();
  sampleDatePast.setDate(sampleDatePast.getDate() - 30);
  sampleDatePast.setHours(14, 0, 0, 0);

  const initialAppointments: Appointment[] = [
    {
      id: 'apt-1',
      title: 'Routine 2nd Trimester Checkup & Blood Pressure',
      type: 'routine',
      doctor: 'Dr. Anita Sen',
      location: 'Apollo Cradle, Suite 302',
      dateTime: sampleDate1.toISOString().slice(0, 16),
      notes: 'Review hemoglobin results and check fetal Doppler heartbeat.',
      questions: ['Is my weight gain on track?', 'Can I start prenatal swimming?'],
      isCompleted: false
    },
    {
      id: 'apt-2',
      title: 'Oral Glucose Tolerance Screening (OGTT)',
      type: 'glucose',
      doctor: 'Metropolis Diagnostic Centre',
      location: 'Main Ring Road Branch',
      dateTime: sampleDate2.toISOString().slice(0, 16),
      notes: 'Fast for 8 hours prior. Will require 2 hours at the lab for 3 blood draws.',
      questions: ['Can I drink water during fasting?'],
      isCompleted: false
    },
    {
      id: 'apt-3',
      title: 'First Trimester NT Scan & Blood Tests',
      type: 'scan',
      doctor: 'Dr. Ramesh Sharma',
      location: 'City Imaging & Fetal Medicine',
      dateTime: sampleDatePast.toISOString().slice(0, 16),
      notes: 'NT measured 1.4 mm. Double marker screening verified low risk.',
      questions: ['Are nasal bone and heart rhythm normal?'],
      isCompleted: true
    }
  ];

  saveStoredAppointments(initialAppointments);
  return initialAppointments;
}

export function saveStoredAppointments(appointments: Appointment[]) {
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredChecklists(): ChecklistItem[] {
  try {
    const data = localStorage.getItem(CHECKLISTS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }

  saveStoredChecklists(DEFAULT_CHECKLISTS);
  return DEFAULT_CHECKLISTS;
}

export function saveStoredChecklists(items: ChecklistItem[]) {
  try {
    localStorage.setItem(CHECKLISTS_KEY, JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredJournal(): JournalEntry[] {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 14);
  const lastWeekStr = lastWeekDate.toISOString().split('T')[0];

  const initialJournal: JournalEntry[] = [
    {
      id: 'j-1',
      date: todayStr,
      week: 20,
      mood: 'joyful',
      symptoms: ['Mild backache', 'Food cravings (oranges & chana)'],
      bumpSizeCm: 86,
      notes: 'We reached week 20 today—halfway through this incredible journey! Baby was rolling actively this morning right after warm milk.',
      milestoneTitle: 'Reached the Halfway Milestone (20 Weeks)',
      createdAt: Date.now()
    },
    {
      id: 'j-2',
      date: lastWeekStr,
      week: 18,
      mood: 'peaceful',
      symptoms: ['Subtle flutter movements', 'Nasal congestion'],
      bumpSizeCm: 83,
      notes: 'Felt the distinct butterfly flutters for the first time while resting on the sofa. Rohit felt it too when putting a hand over my belly!',
      milestoneTitle: 'First Baby Kicks Felt ("Quickening")',
      createdAt: Date.now() - 14 * 86400000
    }
  ];

  saveStoredJournal(initialJournal);
  return initialJournal;
}

export function saveStoredJournal(entries: JournalEntry[]) {
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredBookmarks(): string[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return ['art-1', 'art-2'];
}

export function saveStoredBookmarks(bookmarks: string[]) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredContractions(): ContractionRecord[] {
  try {
    const data = localStorage.getItem(CONTRACTIONS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveStoredContractions(records: ContractionRecord[]) {
  try {
    localStorage.setItem(CONTRACTIONS_KEY, JSON.stringify(records));
  } catch (e) {
    console.error(e);
  }
}

export function getStoredKickSessions(): KickSession[] {
  try {
    const data = localStorage.getItem(KICKS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveStoredKickSessions(sessions: KickSession[]) {
  try {
    localStorage.setItem(KICKS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error(e);
  }
}

export function exportAllDataAsJSON() {
  const exportPayload = {
    appName: 'MaternaNest',
    exportDate: new Date().toISOString(),
    profile: getStoredProfile(),
    appointments: getStoredAppointments(),
    checklists: getStoredChecklists(),
    journal: getStoredJournal(),
    bookmarks: getStoredBookmarks(),
    contractions: getStoredContractions(),
    kickSessions: getStoredKickSessions()
  };

  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MaternaNest_Health_Backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function clearAllLocalData() {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(APPOINTMENTS_KEY);
  localStorage.removeItem(CHECKLISTS_KEY);
  localStorage.removeItem(JOURNAL_KEY);
  localStorage.removeItem(BOOKMARKS_KEY);
  localStorage.removeItem(CONTRACTIONS_KEY);
  localStorage.removeItem(KICKS_KEY);
}
