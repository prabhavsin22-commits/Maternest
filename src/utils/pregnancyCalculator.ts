import { GestationalInfo, CalculationMethod } from '../types';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const NORMAL_GESTATION_DAYS = 280; // 40 weeks

/**
 * Calculates due date and gestational age using Naegele's rule with cycle length adjustment
 */
export function calculateGestationalInfo(
  method: CalculationMethod,
  primaryDateStr: string,
  cycleLength: number = 28
): GestationalInfo {
  if (!primaryDateStr) {
    return createEmptyInfo();
  }

  const primaryDate = new Date(primaryDateStr + 'T00:00:00');
  if (isNaN(primaryDate.getTime())) {
    return { ...createEmptyInfo(), errorMessage: 'Invalid date provided' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let calculatedDueDate: Date;
  let calculatedLmpDate: Date;

  if (method === 'lmp') {
    calculatedLmpDate = primaryDate;
    // Naegele's Rule: LMP + 280 days + (cycleLength - 28)
    const adjustedDays = NORMAL_GESTATION_DAYS + (cycleLength - 28);
    calculatedDueDate = new Date(primaryDate.getTime() + adjustedDays * MS_PER_DAY);
  } else if (method === 'dueDate') {
    calculatedDueDate = primaryDate;
    // Estimated LMP is 280 days prior to due date
    calculatedLmpDate = new Date(primaryDate.getTime() - NORMAL_GESTATION_DAYS * MS_PER_DAY);
  } else {
    // Conception date: Conception + 266 days (38 weeks)
    calculatedDueDate = new Date(primaryDate.getTime() + 266 * MS_PER_DAY);
    calculatedLmpDate = new Date(primaryDate.getTime() - 14 * MS_PER_DAY);
  }

  // Calculate days elapsed from LMP
  const diffTime = today.getTime() - calculatedLmpDate.getTime();
  const totalDays = Math.floor(diffTime / MS_PER_DAY);

  // Validate range: from conception up to 43 weeks
  if (totalDays < 0) {
    return {
      ...createEmptyInfo(),
      dueDateFormatted: formatDate(calculatedDueDate),
      errorMessage: 'The selected date is in the future. Gestational age cannot be negative.'
    };
  }

  if (totalDays > 310) { // > 44 weeks
    return {
      ...createEmptyInfo(),
      dueDateFormatted: formatDate(calculatedDueDate),
      errorMessage: 'The estimated pregnancy duration exceeds 44 weeks. Please verify your dates.'
    };
  }

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  // Days remaining
  const remainingTime = calculatedDueDate.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(remainingTime / MS_PER_DAY));

  // Determine Trimester
  let trimester: 1 | 2 | 3 = 1;
  if (weeks >= 28) {
    trimester = 3;
  } else if (weeks >= 14) {
    trimester = 2;
  } else {
    trimester = 1;
  }

  // Percentage complete (capped between 0 and 100)
  const progressPercentage = Math.min(100, Math.max(0, Math.round((totalDays / NORMAL_GESTATION_DAYS) * 100)));
  const isFullTerm = weeks >= 37 && weeks <= 42;

  return {
    weeks,
    days,
    totalDays,
    daysRemaining,
    trimester,
    progressPercentage,
    dueDateFormatted: formatDate(calculatedDueDate),
    isFullTerm,
    isValid: true
  };
}

function createEmptyInfo(): GestationalInfo {
  return {
    weeks: 0,
    days: 0,
    totalDays: 0,
    daysRemaining: 280,
    trimester: 1,
    progressPercentage: 0,
    dueDateFormatted: '',
    isFullTerm: false,
    isValid: false
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Returns default sample pregnancy for demo/guest exploration
 * Defaulting to ~20 weeks (the midpoint / anatomy scan milestone)
 */
export function getDefaultSampleLmp(): string {
  const d = new Date();
  d.setDate(d.getDate() - 140); // 20 weeks ago
  return d.toISOString().split('T')[0];
}

export function getDefaultSampleDueDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 140); // 20 weeks ahead
  return d.toISOString().split('T')[0];
}
