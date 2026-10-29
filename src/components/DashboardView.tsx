'use client';

import React, { useState, useEffect } from 'react';
import { Play, Check, Droplets, Clock, Zap, Sparkles, ChevronDown, ChevronUp, Layers, Info } from 'lucide-react';
import { AppStoredState, DayOfWeek } from '../types/workout';
import { TEN_WEEK_PROGRAM, DAILY_TIME_SPLIT, DAILY_STRETCHES, EXERCISE_LIBRARY } from '../data/workoutData';
import { HumanExerciseVisualizer } from './HumanExerciseVisualizer';

interface DashboardViewProps {
  appState: AppStoredState;
  onStartTodayWorkout: () => void;
  onStartStretchSession: () => void;
  onToggleDayCompletion: (week: number, day: DayOfWeek) => void;
  onAddWater: (amountMl: number) => void;
  onSelectTab: (tab: any) => void;
}

export function DashboardView({
  appState,
  onStartTodayWorkout,
  onStartStretchSession,
  onToggleDayCompletion,
  onAddWater,
  onSelectTab
}: DashboardViewProps) {
  const [todayDayName, setTodayDayName] = useState<DayOfWeek>('Monday');
  const [currentHourDecimal, setCurrentHourDecimal] = useState<number>(12);
  const [expandedExerciseIdx, setExpandedExerciseIdx] = useState<number | null>(null);
  const [isNutritionExpanded, setIsNutritionExpanded] = useState<boolean>(false);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState<boolean>(false);

  useEffect(() => {
    const d = new Date();
    const dayNames: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setTodayDayName(dayNames[d.getDay()]);
    setCurrentHourDecimal(d.getHours() + d.getMinutes() / 60);
  }, []);

  const currentWeekNum = appState.currentWeek;
  const currentWeekPlan = TEN_WEEK_PROGRAM.find(w => w.week === currentWeekNum) || TEN_WEEK_PROGRAM[0];
  const todayWorkout = currentWeekPlan.days[todayDayName];
  const todayKey = `w${currentWeekNum}-${todayDayName}`;
  const isTodayCompleted = !!appState.completedDays[todayKey];

  // Active time slot in night-shift schedule
  const activeSlot = DAILY_TIME_SPLIT.find(slot => {
    if (slot.startHour < slot.endHour) {
      return currentHourDecimal >= slot.startHour && currentHourDecimal < slot.endHour;
    } else {
      return currentHourDecimal >= slot.startHour || currentHourDecimal < slot.endHour;
    }
  }) || DAILY_TIME_SPLIT[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Apple-style Clean Today Header */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
          {todayDayName} • Week {currentWeekNum}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            {todayWorkout.title}
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            {todayWorkout.exercises.length} Movements
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          {todayWorkout.summary}
        </p>
      </div>

      {/* Main Start Workout Button */}
      {!todayWorkout.isRest ? (
        <button
          type="button"
          className="min-btn min-btn-white"
          onClick={onStartTodayWorkout}
          style={{ width: '100%', padding: '15px', fontSize: '0.92rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(255,255,255,0.08)' }}
        >
          <Play size={16} fill="currentColor" />
          <span>START WORKOUT SESSION</span>
        </button>
      ) : (
        <div style={{ padding: '14px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Rest & Central Nervous Recovery Day</div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Focus on hydration, protein intake, and daily posture stretches.</div>
        </div>
      )}

      {/* Apple Grouped Inset: Today's Exercises (Minimal at glance, rich dropdowns on tap) */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            EXERCISE LINEUP (TAP TO EXPAND)
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
            3D Muscular Loops & Cues
          </span>
        </div>

        <div>
          {todayWorkout.exercises.map((ex, idx) => {
            const isExpanded = expandedExerciseIdx === idx;
            const exDetail = ex.exerciseId ? EXERCISE_LIBRARY[ex.exerciseId] : undefined;

            return (
              <div key={idx} style={{ borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                {/* Minimal Row Header (Clean, zero clutter at first glance) */}
                <div
                  onClick={() => setExpandedExerciseIdx(isExpanded ? null : idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '13px 16px',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(0,0,0,0.02)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isExpanded ? 'var(--accent-red)' : 'rgba(0, 0, 0, 0.06)',
                      color: isExpanded ? '#FFFFFF' : 'var(--text-primary)',
                      border: isExpanded ? 'none' : '1px solid rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {ex.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                        {ex.sets} sets • {ex.reps}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      color: isExpanded ? 'var(--accent-red)' : 'var(--text-secondary)',
                      fontWeight: 700,
                      background: isExpanded ? 'var(--accent-red-dim)' : 'rgba(0, 0, 0, 0.05)',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}>
                      {isExpanded ? 'Hide' : '3D Form'}
                    </span>
                    {isExpanded ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
                  </div>
                </div>

                {/* Dropdown Content: Revealed on Demand */}
                {isExpanded && (
                  <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
                    {/* Real 3D Muscular Body Animation & Stress Heatmap */}
                    <div style={{ marginTop: '12px' }}>
                      <HumanExerciseVisualizer
                        exerciseId={ex.exerciseId || 'push-ups'}
                        exerciseName={ex.name}
                        compact={false}
                      />
                    </div>

                    {/* Detailed Exercise Metadata (All Information Preserved) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                        <div style={{ color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                          Target Prescription
                        </div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ex.target}</div>
                      </div>

                      {ex.tip && (
                        <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                          <div style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                            Coach Tip
                          </div>
                          <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{ex.tip}</div>
                        </div>
                      )}

                      {exDetail && (
                        <>
                          <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                            <div style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Form Execution Steps
                            </div>
                            <ul style={{ paddingLeft: '16px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                              {exDetail.formTips.map((tip, tIdx) => (
                                <li key={tIdx} style={{ marginBottom: '3px' }}>{tip}</li>
                              ))}
                            </ul>
                          </div>

                          {exDetail.beginnerMod && (
                            <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                              <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                                Beginner Modification
                              </div>
                              <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{exDetail.beginnerMod}</div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily 7-Min Spine Decompression (Apple Inset Card) */}
      <div
        onClick={onStartStretchSession}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--bg-subcard)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Daily 7-Min Spine Decompression
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Cobra • Cat-Cow • Dead Hang • Forward Fold
            </div>
          </div>
        </div>

        <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 700, background: 'var(--accent-red-dim)', padding: '4px 10px', borderRadius: '8px' }}>
          Start
        </span>
      </div>

      {/* Nutrition & Fuel Summary (Apple Grouped Dropdown) */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setIsNutritionExpanded(!isNutritionExpanded)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Droplets size={16} color="var(--accent-blue)" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Hydration & Daily Fuel
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                {(appState.nutrition.waterMl / 1000).toFixed(2)}L of 2.8L • {appState.nutrition.proteinGrams}g of 80g Protein
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {isNutritionExpanded ? 'Hide' : 'Quick Log'}
            </span>
            {isNutritionExpanded ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
          </div>
        </div>

        {/* Nutrition Dropdown */}
        {isNutritionExpanded && (
          <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '12px' }}>
              <button
                type="button"
                className="min-btn min-btn-dark"
                onClick={() => onAddWater(250)}
                style={{ padding: '10px', fontSize: '0.78rem', borderRadius: '10px', minHeight: '36px' }}
              >
                +250ml Water
              </button>
              <button
                type="button"
                className="min-btn min-btn-dark"
                onClick={() => onAddWater(500)}
                style={{ padding: '10px', fontSize: '0.78rem', borderRadius: '10px', minHeight: '36px' }}
              >
                +500ml Water
              </button>
            </div>

            <button
              type="button"
              className="min-btn min-btn-dark"
              onClick={() => onSelectTab('diet')}
              style={{ width: '100%', padding: '10px', fontSize: '0.78rem', borderRadius: '10px', marginTop: '8px', minHeight: '36px' }}
            >
              Open Full Diet & Protein Planner →
            </button>
          </div>
        )}
      </div>

      {/* Routine Radar (Apple Grouped Dropdown) */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={16} color="var(--accent-red)" />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Night-Shift Timeline
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                Active: {activeSlot.time} • {activeSlot.activity}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {isScheduleExpanded ? 'Hide' : 'Schedule'}
            </span>
            {isScheduleExpanded ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
          </div>
        </div>

        {/* Schedule Dropdown (All night-shift slots preserved) */}
        {isScheduleExpanded && (
          <div style={{ padding: '0 16px 14px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
              {DAILY_TIME_SPLIT.map((slot, sIdx) => {
                const isCurrent = slot.time === activeSlot.time;
                return (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: isCurrent ? 'rgba(255, 45, 85, 0.08)' : 'transparent',
                      border: isCurrent ? '1px solid rgba(255, 45, 85, 0.2)' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                        {slot.activity}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: isCurrent ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
                        {slot.details}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isCurrent ? 'var(--accent-red)' : 'var(--text-secondary)', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '10px' }}>
                      {slot.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Completion Toggle */}
      <button
        type="button"
        onClick={() => onToggleDayCompletion(currentWeekNum, todayDayName)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: 'var(--radius-pill)',
          background: isTodayCompleted ? 'var(--accent-green-dim)' : 'transparent',
          border: isTodayCompleted ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
          color: isTodayCompleted ? 'var(--accent-green)' : 'var(--text-secondary)',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          minHeight: '44px'
        }}
      >
        <Check size={15} />
        <span>{isTodayCompleted ? 'Day Logged as Completed' : 'Mark Day as Completed'}</span>
      </button>
    </div>
  );
}
