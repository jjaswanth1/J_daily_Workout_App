'use client';

import React, { useState } from 'react';
import { Check, Play, ChevronDown, ChevronUp, Layers, Award } from 'lucide-react';
import { AppStoredState, DayOfWeek, WeekPlanData } from '../types/workout';
import { TEN_WEEK_PROGRAM } from '../data/workoutData';

interface TrackerViewProps {
  appState: AppStoredState;
  onToggleDayCompletion: (week: number, day: DayOfWeek) => void;
  onSelectCurrentWeek: (week: number) => void;
  onStartSpecificWorkout: (week: number, day: DayOfWeek) => void;
}

export function TrackerView({
  appState,
  onToggleDayCompletion,
  onSelectCurrentWeek,
  onStartSpecificWorkout
}: TrackerViewProps) {
  const [selectedWeek, setSelectedWeek] = useState(appState.currentWeek);
  const [expandedDay, setExpandedDay] = useState<DayOfWeek | null>(null);
  const [showPhaseInfo, setShowPhaseInfo] = useState<boolean>(false);

  const currentProgramWeek: WeekPlanData = TEN_WEEK_PROGRAM.find(w => w.week === selectedWeek) || TEN_WEEK_PROGRAM[0];
  const daysOrder: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const weekDoneCount = daysOrder.filter(d => !!appState.completedDays[`w${selectedWeek}-${d}`]).length;
  const isWeekComplete = weekDoneCount === 7;

  const totalCompleted = Object.values(appState.completedDays).filter(Boolean).length;
  const totalPercent = Math.round((totalCompleted / 70) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Apple-style Large Title */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
          Periodized Curriculum
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            10-Week Plan
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-green)', fontWeight: 700 }}>
            {totalCompleted}/70 Done ({totalPercent}%)
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          Progressive overload calisthenics across 3 hypertrophy and posture phases.
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
            Overall Curriculum Progress
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 700 }}>
            {totalPercent}%
          </span>
        </div>
        <div style={{ width: '100%', height: '5px', background: 'var(--bg-subcard)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${totalPercent}%`, background: 'var(--accent-green)', transition: 'width 0.25s ease' }} />
        </div>
      </div>

      {/* Week Selector Carousel */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {TEN_WEEK_PROGRAM.map((wp) => {
          const isSelected = selectedWeek === wp.week;
          const doneInWeek = daysOrder.filter(d => !!appState.completedDays[`w${wp.week}-${d}`]).length;

          return (
            <button
              key={wp.week}
              type="button"
              onClick={() => {
                setSelectedWeek(wp.week);
                onSelectCurrentWeek(wp.week);
              }}
              style={{
                flex: '0 0 auto',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                background: isSelected ? '#FFFFFF' : 'var(--bg-card)',
                color: isSelected ? '#000000' : 'var(--text-secondary)',
                border: isSelected ? '1px solid #FFFFFF' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>W{wp.week}</div>
              <div style={{ fontSize: '0.64rem', opacity: isSelected ? 0.9 : 0.65 }}>{doneInWeek}/7</div>
            </button>
          );
        })}
      </div>

      {/* Phase Info Disclosure */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setShowPhaseInfo(!showPhaseInfo)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={15} color="var(--accent-red)" />
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {currentProgramWeek.phaseName}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginLeft: '6px' }}>
                (Week {selectedWeek})
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>{showPhaseInfo ? 'Hide' : 'Details'}</span>
            {showPhaseInfo ? <ChevronUp size={15} color="var(--text-tertiary)" /> : <ChevronDown size={15} color="var(--text-tertiary)" />}
          </div>
        </div>

        {showPhaseInfo && (
          <div style={{ padding: '0 16px 14px 16px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(255, 255, 255, 0.45)' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '10px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Phase Focus: </strong>{currentProgramWeek.phaseGoal}
            </p>
          </div>
        )}
      </div>

      {/* 7 Days of the Week: Apple Grouped Inset */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            WEEK {selectedWeek} SCHEDULE
          </span>
          {isWeekComplete ? (
            <span style={{ fontSize: '0.68rem', color: 'var(--accent-green)', fontWeight: 700, background: 'var(--accent-green-dim)', padding: '2px 8px', borderRadius: '9999px' }}>
              WEEK COMPLETED
            </span>
          ) : (
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
              {weekDoneCount}/7 Logged
            </span>
          )}
        </div>

        <div>
          {daysOrder.map((dayName, idx) => {
            const dayData = currentProgramWeek.days[dayName];
            const isDone = !!appState.completedDays[`w${selectedWeek}-${dayName}`];
            const isExpanded = expandedDay === dayName;

            return (
              <div key={dayName} style={{ borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                {/* Day Row Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '13px 16px',
                    background: isExpanded ? 'rgba(255,255,255,0.03)' : isDone ? 'rgba(48, 209, 88, 0.04)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      className={`min-checkbox ${isDone ? 'checked' : ''}`}
                      onClick={() => onToggleDayCompletion(selectedWeek, dayName)}
                    >
                      {isDone && <Check size={14} color="#000000" strokeWidth={3} />}
                    </div>

                    <div
                      onClick={() => setExpandedDay(isExpanded ? null : dayName)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isDone ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                          {dayName}
                        </span>
                        <span style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', background: 'var(--bg-subcard)', padding: '2px 7px', borderRadius: '9999px' }}>
                          {dayData.isRest ? 'Rest Day' : `${dayData.exercises.length} Exercises`}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                        {dayData.title}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {!dayData.isRest && (
                      <button
                        type="button"
                        onClick={() => onStartSpecificWorkout(selectedWeek, dayName)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          border: 'none',
                          color: '#000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'opacity 0.15s ease'
                        }}
                        title="Start Workout"
                      >
                        <Play size={13} fill="currentColor" />
                      </button>
                    )}

                    <div
                      onClick={() => setExpandedDay(isExpanded ? null : dayName)}
                      style={{ cursor: 'pointer', padding: '4px' }}
                    >
                      {isExpanded ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
                    </div>
                  </div>
                </div>

                {/* Day Expanded Breakdown */}
                {isExpanded && (
                  <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(255, 255, 255, 0.5)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35, marginTop: '10px' }}>
                      {dayData.summary}
                    </p>

                    {!dayData.isRest && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                        {dayData.exercises.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              background: 'var(--bg-subcard)'
                            }}
                          >
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {eIdx + 1}. {ex.name}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 600 }}>
                              {ex.sets} sets • {ex.reps}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
