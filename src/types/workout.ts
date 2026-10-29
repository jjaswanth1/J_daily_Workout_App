export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface DailyStretch {
  id: string;
  name: string;
  durationSeconds: number;
  setsOrReps: string;
  purpose: string;
  formInstruction: string;
  targetArea: string;
}

export interface ExerciseDetail {
  id: string;
  name: string;
  category: 'Upper Push' | 'Upper Pull' | 'Lower Body' | 'Core' | 'Posture' | 'Cardio';
  musclesWorked: string[];
  endResult: string;
  formTips: string[];
  beginnerMod?: string;
  equipment?: string;
  referenceUrl?: string;
  referenceTitle?: string;
  phaseIntroduced: 1 | 2 | 3;
}

export interface DayWorkoutData {
  day: DayOfWeek;
  title: string;
  summary: string;
  isRest?: boolean;
  exercises: {
    name: string;
    target: string;
    sets: number;
    reps: string;
    exerciseId?: string;
    tip?: string;
  }[];
}

export interface WeekPlanData {
  week: number;
  phase: 1 | 2 | 3;
  phaseName: string;
  phaseGoal: string;
  days: Record<DayOfWeek, DayWorkoutData>;
}

export interface TimeSlot {
  time: string;
  startHour: number; // 0-23.99
  endHour: number;
  activity: string;
  details: string;
  type: 'wake' | 'warmup' | 'workout' | 'nutrition' | 'free' | 'office' | 'sleep';
  icon: string;
}

export interface MealScheduleItem {
  id: string;
  timeWindow: string;
  mealName: string;
  foodDescription: string;
  proteinEstimate: string;
  isImportant?: boolean;
}

export interface ProteinFoodSource {
  id: string;
  name: string;
  protein: number; // in grams
  unit: string;
  category: 'eggs' | 'dairy' | 'poultry' | 'fish' | 'plant';
}

export interface MonthlyCheckInRecord {
  month: number;
  date: string;
  weightKg: number;
  pushupsMax: number;
  plankSeconds: number;
  notes: string;
}

export interface AppStoredState {
  currentWeek: number;
  completedDays: Record<string, boolean>; // key format: `w${week}-${day}` e.g. "w1-Monday"
  dayNotes: Record<string, string>;
  workoutLogs: Record<string, { completedAt: string; durationMinutes?: number; repsLogged?: Record<string, number> }>;
  nutrition: {
    waterMl: number;
    proteinGrams: number;
    mealsChecked: Record<string, boolean>;
    lastDate: string;
  };
  checkIns: MonthlyCheckInRecord[];
  profile: {
    startWeight: number;
    currentWeight: number;
    height: string;
    age: number;
    shift: string;
    wakeTime: string;
  };
}
