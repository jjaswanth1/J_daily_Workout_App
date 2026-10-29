'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar, TabKey } from '../components/Navbar';
import { DashboardView } from '../components/DashboardView';
import { StretchView } from '../components/StretchView';
import { TrackerView } from '../components/TrackerView';
import { ScheduleView } from '../components/ScheduleView';
import { DietView } from '../components/DietView';
import { LibraryView } from '../components/LibraryView';
import { ProgressView } from '../components/ProgressView';
import { ActiveWorkoutModal } from '../components/ActiveWorkoutModal';
import { DailyStretchModal } from '../components/DailyStretchModal';
import { AppStoredState, DayOfWeek, DayWorkoutData, MonthlyCheckInRecord } from '../types/workout';
import { DEFAULT_APP_STATE, loadStoredState, saveStoredState } from '../utils/storage';
import { TEN_WEEK_PROGRAM } from '../data/workoutData';
import { playTimerFinishSound } from '../utils/audio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [appState, setAppState] = useState<AppStoredState>(DEFAULT_APP_STATE);
  const [isClient, setIsClient] = useState(false);

  // Active Live Workout Companion Modal
  const [activeLiveWorkout, setActiveLiveWorkout] = useState<{
    workout: DayWorkoutData;
    weekNumber: number;
    day: DayOfWeek;
  } | null>(null);

  // Active Daily Stretch Routine Modal
  const [isStretchModalOpen, setIsStretchModalOpen] = useState(false);

  // Load state on client mount
  useEffect(() => {
    const loaded = loadStoredState();
    setAppState(loaded);
    setIsClient(true);
  }, []);

  // Save state on updates
  useEffect(() => {
    if (isClient) {
      saveStoredState(appState);
    }
  }, [appState, isClient]);

  // Today helper
  const getTodayDayOfWeek = (): DayOfWeek => {
    const dayNames: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[new Date().getDay()];
  };

  // Start today's session
  const handleStartTodayWorkout = () => {
    const todayDay = getTodayDayOfWeek();
    const currentWeekPlan = TEN_WEEK_PROGRAM.find(w => w.week === appState.currentWeek) || TEN_WEEK_PROGRAM[0];
    const todayWorkout = currentWeekPlan.days[todayDay];
    if (todayWorkout && !todayWorkout.isRest) {
      setActiveLiveWorkout({
        workout: todayWorkout,
        weekNumber: appState.currentWeek,
        day: todayDay
      });
    } else {
      setActiveTab('tracker');
    }
  };

  // Start specific workout
  const handleStartSpecificWorkout = (week: number, day: DayOfWeek) => {
    const weekPlan = TEN_WEEK_PROGRAM.find(w => w.week === week) || TEN_WEEK_PROGRAM[0];
    const workout = weekPlan.days[day];
    if (workout && !workout.isRest) {
      setActiveLiveWorkout({
        workout,
        weekNumber: week,
        day
      });
    }
  };

  // Toggle completion
  const handleToggleDayCompletion = (week: number, day: DayOfWeek) => {
    const key = `w${week}-${day}`;
    const nextCompleted = !appState.completedDays[key];

    setAppState(prev => {
      const updated = {
        ...prev,
        completedDays: {
          ...prev.completedDays,
          [key]: nextCompleted
        }
      };

      if (nextCompleted) {
        const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const allDone = daysOfWeek.every(d => d === day || !!updated.completedDays[`w${week}-${d}`]);
        if (allDone) {
          try {
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.5 }
            });
            playTimerFinishSound();
          } catch {}
        }
      }

      return updated;
    });
  };

  // Workout finished in companion modal
  const handleFinishLiveWorkout = (logs: { repsLogged: Record<string, number>; durationMinutes: number }) => {
    if (!activeLiveWorkout) return;
    const { weekNumber, day } = activeLiveWorkout;
    const key = `w${weekNumber}-${day}`;

    setAppState(prev => ({
      ...prev,
      completedDays: {
        ...prev.completedDays,
        [key]: true
      },
      workoutLogs: {
        ...prev.workoutLogs,
        [key]: {
          completedAt: new Date().toISOString(),
          durationMinutes: logs.durationMinutes,
          repsLogged: logs.repsLogged
        }
      }
    }));

    setActiveLiveWorkout(null);
  };

  // Water & Protein Handlers
  const handleAddWater = (amountMl: number) => {
    setAppState(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        waterMl: prev.nutrition.waterMl + amountMl
      }
    }));
  };

  const handleResetWater = () => {
    setAppState(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        waterMl: 0
      }
    }));
  };

  const handleAddProtein = (grams: number) => {
    setAppState(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        proteinGrams: prev.nutrition.proteinGrams + grams
      }
    }));
  };

  const handleResetProtein = () => {
    setAppState(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        proteinGrams: 0
      }
    }));
  };

  const handleToggleMeal = (mealId: string) => {
    setAppState(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        mealsChecked: {
          ...prev.nutrition.mealsChecked,
          [mealId]: !prev.nutrition.mealsChecked[mealId]
        }
      }
    }));
  };

  const handleSaveCheckIn = (record: MonthlyCheckInRecord) => {
    setAppState(prev => ({
      ...prev,
      checkIns: [...prev.checkIns, record]
    }));
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `titan-recomp-data-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="mobile-app-shell">
      {/* iOS Header & Bottom Tab Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onStartLiveWorkout={handleStartTodayWorkout}
        currentWeek={appState.currentWeek}
      />

      {/* Main View Port */}
      <main style={{ flex: 1, overflowX: 'hidden' }}>
        {activeTab === 'dashboard' && (
          <DashboardView
            appState={appState}
            onStartTodayWorkout={handleStartTodayWorkout}
            onStartStretchSession={() => setIsStretchModalOpen(true)}
            onToggleDayCompletion={handleToggleDayCompletion}
            onAddWater={handleAddWater}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'stretch' && (
          <StretchView
            onStartStretchSession={() => setIsStretchModalOpen(true)}
          />
        )}

        {activeTab === 'tracker' && (
          <TrackerView
            appState={appState}
            onToggleDayCompletion={handleToggleDayCompletion}
            onSelectCurrentWeek={(week) => setAppState(prev => ({ ...prev, currentWeek: week }))}
            onStartSpecificWorkout={handleStartSpecificWorkout}
          />
        )}

        {activeTab === 'diet' && (
          <DietView
            appState={appState}
            onAddProtein={handleAddProtein}
            onResetProtein={handleResetProtein}
            onAddWater={handleAddWater}
            onResetWater={handleResetWater}
            onToggleMeal={handleToggleMeal}
          />
        )}

        {activeTab === 'library' && (
          <LibraryView />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            appState={appState}
            onSaveCheckIn={handleSaveCheckIn}
            onExportData={handleExportData}
          />
        )}
      </main>

      {/* Daily 7-Min Spine Stretches Modal */}
      {isStretchModalOpen && (
        <DailyStretchModal
          onClose={() => setIsStretchModalOpen(false)}
          onCompleted={() => {
            // Give reward feedback
          }}
        />
      )}

      {/* Live Interactive Workout Companion Modal */}
      {activeLiveWorkout && (
        <ActiveWorkoutModal
          workout={activeLiveWorkout.workout}
          weekNumber={activeLiveWorkout.weekNumber}
          onClose={() => setActiveLiveWorkout(null)}
          onFinishWorkout={handleFinishLiveWorkout}
        />
      )}
    </div>
  );
}
