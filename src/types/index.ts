export type Language = 'en' | 'hi';

export type CalculationMethod = 'lmp' | 'dueDate' | 'conception';

export interface PregnancyProfile {
  userName: string;
  partnerName?: string;
  calculationMethod: CalculationMethod;
  lmpDate: string; // YYYY-MM-DD
  cycleLength: number; // default 28
  dueDate: string; // YYYY-MM-DD
  bloodGroup?: string;
  emergencyContact?: string;
  doctorContact?: string;
  hospitalName?: string;
  onboardingCompleted: boolean;
}

export interface GestationalInfo {
  weeks: number;
  days: number;
  totalDays: number;
  daysRemaining: number;
  trimester: 1 | 2 | 3;
  progressPercentage: number;
  dueDateFormatted: string;
  isFullTerm: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export interface WeekData {
  week: number;
  trimester: 1 | 2 | 3;
  babySizeFruit: {
    en: string;
    hi: string;
  };
  babySizeComparison: {
    en: string;
    hi: string;
  };
  lengthCm: number;
  weightGrams: number;
  fetalDevelopment: {
    en: string;
    hi: string;
  };
  maternalChanges: {
    en: string;
    hi: string;
  };
  testsAndScans: {
    en: string;
    hi: string;
  };
  doctorQuestions: {
    en: string[];
    hi: string[];
  };
  wellnessTip: {
    en: string;
    hi: string;
  };
  warningSigns: {
    en: string[];
    hi: string[];
  };
  reviewedBy: string;
  reviewDate: string;
}

export type ArticleCategory =
  | 'development'
  | 'nutrition'
  | 'prenatal'
  | 'activity'
  | 'labour'
  | 'breastfeeding'
  | 'newborn'
  | 'postpartum'
  | 'traditions'
  | 'glossary';

export interface Article {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: {
    en: string;
    hi: string;
  };
  excerpt: {
    en: string;
    hi: string;
  };
  content: {
    en: string;
    hi: string;
  };
  readingTime: string;
  author: string;
  sources: string[];
  lastReviewed: string;
  tags: string[];
  isFeatured?: boolean;
}

export type AppointmentType =
  | 'routine'
  | 'scan'
  | 'bloodwork'
  | 'glucose'
  | 'paediatric'
  | 'other';

export interface Appointment {
  id: string;
  title: string;
  type: AppointmentType;
  doctor: string;
  location: string;
  dateTime: string; // ISO string or YYYY-MM-DDTHH:mm
  notes: string;
  questions: string[];
  isCompleted: boolean;
}

export type ChecklistCategory =
  | 'bag-mom'
  | 'bag-baby'
  | 'bag-partner'
  | 'birth-prep'
  | 'baby-essentials'
  | 'custom';

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  text: {
    en: string;
    hi: string;
  };
  isDone: boolean;
  isCustom?: boolean;
  notes?: string;
}

export type MoodType =
  | 'peaceful'
  | 'joyful'
  | 'tired'
  | 'anxious'
  | 'excited'
  | 'nauseous';

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  week: number;
  mood: MoodType;
  symptoms: string[];
  bumpSizeCm?: number;
  notes: string;
  milestoneTitle?: string;
  createdAt: number;
}

export interface ContractionRecord {
  id: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  intervalSeconds: number; // Interval since previous contraction started
}

export interface KickSession {
  id: string;
  date: string;
  startTime: number;
  endTime: number;
  totalMinutes: number;
  kicksCount: number;
}
