import { AppStoredState } from '../types/workout';

const STORAGE_KEY = 'home_body_workout_app_v1';

export const DEFAULT_APP_STATE: AppStoredState = {
  currentWeek: 1,
  completedDays: {},
  dayNotes: {},
  workoutLogs: {},
  nutrition: {
    waterMl: 1000,
    proteinGrams: 42,
    mealsChecked: {
      'pre-workout': true,
      'post-workout': false,
      'lunch': false,
      'office-snack-1': false,
      'dinner': false,
      'office-snack-2': false,
      'bedtime': false
    },
    lastDate: new Date().toISOString().split('T')[0]
  },
  checkIns: [
    {
      month: 1,
      date: 'Day 1 Baseline',
      weightKg: 53,
      pushupsMax: 12,
      plankSeconds: 35,
      notes: 'Initial starting point. Establishing posture habits and clean form.'
    }
  ],
  profile: {
    startWeight: 53,
    currentWeight: 53,
    height: "5'2\"",
    age: 24,
    shift: '5:30 PM – 2:30 AM',
    wakeTime: '11:30 AM'
  }
};

export function loadStoredState(): AppStoredState {
  if (typeof window === 'undefined') return DEFAULT_APP_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APP_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_APP_STATE,
      ...parsed,
      nutrition: {
        ...DEFAULT_APP_STATE.nutrition,
        ...(parsed.nutrition || {})
      },
      profile: {
        ...DEFAULT_APP_STATE.profile,
        ...(parsed.profile || {})
      }
    };
  } catch (e) {
    console.error('Failed to load storage', e);
    return DEFAULT_APP_STATE;
  }
}

export function saveStoredState(state: AppStoredState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to storage', e);
  }
}
