'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, CheckCircle2, ChevronRight, ChevronLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayWorkoutData, ExerciseDetail } from '../types/workout';
import { EXERCISE_LIBRARY } from '../data/workoutData';
import { playBeep, playTimerFinishSound } from '../utils/audio';
import { HumanExerciseVisualizer } from './HumanExerciseVisualizer';

interface ActiveWorkoutModalProps {
  workout: DayWorkoutData;
  weekNumber: number;
  onClose: () => void;
  onFinishWorkout: (logs: { repsLogged: Record<string, number>; durationMinutes: number }) => void;
}

export function ActiveWorkoutModal({
  workout,
  weekNumber,
  onClose,
  onFinishWorkout
}: ActiveWorkoutModalProps) {
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [repsDoneInput, setRepsDoneInput] = useState<string>('');
  const [exerciseLogs, setExerciseLogs] = useState<Record<string, number>>({});

  // Rest Timer State
  const [restDuration, setRestDuration] = useState(75);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Session duration timer
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIdx];
  const exerciseDetail: ExerciseDetail | undefined = currentExercise?.exerciseId
    ? EXERCISE_LIBRARY[currentExercise.exerciseId]
    : undefined;

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining !== null && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev === null || prev <= 1) {
            setIsTimerRunning(false);
            if (soundEnabled) playTimerFinishSound();
            return 0;
          }
          if (prev <= 4 && prev > 1 && soundEnabled) {
            playBeep(700, 0.1);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining, soundEnabled]);

  const startRestTimer = (seconds: number) => {
    setRestDuration(seconds);
    setSecondsRemaining(seconds);
    setIsTimerRunning(true);
    if (soundEnabled) playBeep(520, 0.15);
  };

  const stopRestTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(null);
  };

  const handleCompleteSet = () => {
    const parsedReps = parseInt(repsDoneInput, 10) || 12;
    const logKey = `${currentExercise.name}-set-${currentSet}`;
    setExerciseLogs(prev => ({ ...prev, [logKey]: parsedReps }));
    setRepsDoneInput('');

    if (currentSet < currentExercise.sets) {
      setCurrentSet(prev => prev + 1);
      startRestTimer(restDuration);
    } else {
      if (currentExerciseIdx < workout.exercises.length - 1) {
        setCurrentExerciseIdx(prev => prev + 1);
        setCurrentSet(1);
        startRestTimer(restDuration);
      } else {
        setIsCompleted(true);
        if (soundEnabled) playTimerFinishSound();
        try {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        } catch {}
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-modal-backdrop">
      <div className="min-modal-sheet">
        <div className="min-handle" />

        {/* Modal Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="min-badge min-badge-red">LIVE</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                WEEK {weekNumber} • {workout.day.toUpperCase()}
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', marginTop: '2px', color: 'var(--text-primary)' }}>{workout.title}</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="timer-green" style={{ fontSize: '0.95rem' }}>
              {formatTime(sessionSeconds)}
            </span>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{ background: 'transparent', border: 'none', color: soundEnabled ? 'var(--text-primary)' : 'var(--text-tertiary)', cursor: 'pointer', padding: 4 }}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--bg-subcard)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {isCompleted ? (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={34} color="#FFFFFF" strokeWidth={2.5} />
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '6px', color: 'var(--text-primary)' }}>SESSION COMPLETE</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '18px' }}>
              Duration: <strong className="timer-green">{formatTime(sessionSeconds)}</strong>
            </p>

            <div style={{ textAlign: 'left', marginBottom: '20px', background: 'var(--bg-subcard)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.8rem', marginBottom: '4px' }}>
                <Sparkles size={15} /> RECOVERY PROTEIN WINDOW
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Consume <strong>2–3 eggs</strong> or a <strong>glass of milk/curd</strong> in the next 45 minutes to initiate muscle protein repair.
              </p>
            </div>

            <button
              type="button"
              className="min-btn min-btn-white"
              onClick={() => {
                onFinishWorkout({
                  repsLogged: exerciseLogs,
                  durationMinutes: Math.max(1, Math.round(sessionSeconds / 60))
                });
              }}
              style={{ width: '100%' }}
            >
              LOG & SAVE TO TRACKER
            </button>
          </div>
        ) : (
          <div>
            {/* Exercises Horizontal Slider */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', marginBottom: '14px' }}>
              {workout.exercises.map((ex, idx) => {
                const isActive = idx === currentExerciseIdx;
                const isPast = idx < currentExerciseIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentExerciseIdx(idx);
                      setCurrentSet(1);
                      stopRestTimer();
                    }}
                    style={{
                      background: isActive ? '#FFFFFF' : isPast ? 'var(--accent-green-dim)' : 'var(--bg-subcard)',
                      color: isActive ? '#000000' : isPast ? 'var(--accent-green)' : 'var(--text-secondary)',
                      border: isPast ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '6px 12px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isPast && '✓ '}{ex.name}
                  </button>
                );
              })}
            </div>

            {/* Exercise Card */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', padding: '16px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    EXERCISE {currentExerciseIdx + 1} OF {workout.exercises.length}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '2px' }}>{currentExercise.name}</h3>
                  <div style={{ color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.84rem', marginTop: '2px' }}>
                    TARGET: {currentExercise.target}
                  </div>
                </div>

                {exerciseDetail && (
                  <span className="min-badge min-badge-mono">
                    {exerciseDetail.category}
                  </span>
                )}
              </div>

              {/* Live Human Kinematic Animation & Muscle Stress Map */}
              <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                <HumanExerciseVisualizer
                  exerciseId={currentExercise.exerciseId || 'push-ups'}
                  exerciseName={currentExercise.name}
                  compact={false}
                />
              </div>

              {/* Set Bubbles */}
              <div style={{ display: 'flex', gap: '6px', margin: '12px 0' }}>
                {Array.from({ length: currentExercise.sets }).map((_, sIdx) => {
                  const setNum = sIdx + 1;
                  const isCurrent = setNum === currentSet;
                  const isDone = setNum < currentSet;
                  return (
                    <div
                      key={setNum}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        textAlign: 'center',
                        borderRadius: '12px',
                        background: isCurrent ? 'var(--bg-card)' : isDone ? 'var(--accent-green-dim)' : 'var(--bg-subcard)',
                        border: isCurrent ? '1.5px solid var(--text-primary)' : isDone ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                        boxShadow: isCurrent ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.62rem', color: isCurrent ? 'var(--text-primary)' : isDone ? 'var(--accent-green)' : 'var(--text-tertiary)', fontWeight: 800 }}>
                        SET {setNum}
                      </div>
                      <div style={{ fontSize: '0.76rem', fontWeight: 800, marginTop: '2px', color: isDone ? 'var(--accent-green)' : isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {isDone ? 'DONE' : isCurrent ? 'ACTIVE' : currentExercise.reps}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Strict Form Cues */}
              {exerciseDetail && (
                <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '12px', marginTop: '10px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '3px' }}>
                    FORM FOCUS:
                  </div>
                  <ul style={{ paddingLeft: '16px', color: 'var(--text-primary)', fontSize: '0.76rem', lineHeight: 1.4 }}>
                    {exerciseDetail.formTips.slice(0, 2).map((tip, tIdx) => (
                      <li key={tIdx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* REST INTERVAL TIMER: GREEN DISPLAY, RED FOR SKIP / STOP */}
            {secondsRemaining !== null && (
              <div style={{ textAlign: 'center', padding: '16px', marginBottom: '14px', borderRadius: '18px', border: '1px solid var(--accent-green)', background: 'rgba(48, 209, 88, 0.08)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  REST INTERVAL COUNTDOWN
                </div>

                <div className="timer-green" style={{ fontSize: '3.2rem', lineHeight: 1, margin: '6px 0' }}>
                  {formatTime(secondsRemaining)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    className="min-btn min-btn-dark"
                    onClick={() => setSecondsRemaining(prev => (prev || 0) + 15)}
                    style={{ padding: '6px 14px', fontSize: '0.76rem', minHeight: '34px' }}
                  >
                    +15s
                  </button>
                  <button
                    type="button"
                    className="min-btn min-btn-dark"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    style={{ padding: '6px 14px', fontSize: '0.76rem', minHeight: '34px' }}
                  >
                    {isTimerRunning ? <Pause size={13} /> : <Play size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={stopRestTimer}
                    className="indicator-red"
                    style={{ background: 'transparent', border: 'none', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer', padding: '6px 10px' }}
                  >
                    SKIP REST
                  </button>
                </div>
              </div>
            )}

            {/* Set Complete Action Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <input
                  type="text"
                  placeholder={`Reps done (${currentExercise.reps})`}
                  value={repsDoneInput}
                  onChange={(e) => setRepsDoneInput(e.target.value)}
                  style={{
                    background: 'var(--bg-subcard)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.86rem',
                    flex: 1,
                    outline: 'none'
                  }}
                />

                <div style={{ display: 'flex', gap: '6px' }}>
                  {[60, 90].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRestDuration(s)}
                      style={{
                        background: restDuration === s ? '#FFFFFF' : 'var(--bg-subcard)',
                        color: restDuration === s ? '#000000' : 'var(--text-secondary)',
                        border: restDuration === s ? '1px solid #FFFFFF' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-pill)',
                        padding: '6px 12px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {s}s REST
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  className="min-btn min-btn-white"
                  onClick={handleCompleteSet}
                  style={{ flex: 1, padding: '12px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>COMPLETE SET {currentSet} OF {currentExercise.sets}</span>
                </button>

                {currentExerciseIdx > 0 && (
                  <button
                    type="button"
                    className="min-btn min-btn-dark"
                    onClick={() => {
                      setCurrentExerciseIdx(prev => prev - 1);
                      setCurrentSet(1);
                      stopRestTimer();
                    }}
                    style={{ padding: '0 12px' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                {currentExerciseIdx < workout.exercises.length - 1 && (
                  <button
                    type="button"
                    className="min-btn min-btn-dark"
                    onClick={() => {
                      setCurrentExerciseIdx(prev => prev + 1);
                      setCurrentSet(1);
                      stopRestTimer();
                    }}
                    style={{ padding: '0 12px' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
