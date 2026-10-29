'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, CheckCircle2, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAILY_STRETCHES } from '../data/workoutData';
import { playBeep, playTimerFinishSound } from '../utils/audio';
import { HumanExerciseVisualizer } from './HumanExerciseVisualizer';

interface DailyStretchModalProps {
  onClose: () => void;
  onCompleted: () => void;
}

export function DailyStretchModal({ onClose, onCompleted }: DailyStretchModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentStretch = DAILY_STRETCHES[currentIdx];

  const [secondsLeft, setSecondsLeft] = useState(currentStretch.durationSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setSecondsLeft(currentStretch.durationSeconds);
    setIsRunning(true);
  }, [currentIdx]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (soundEnabled) playTimerFinishSound();
            if (currentIdx < DAILY_STRETCHES.length - 1) {
              setCurrentIdx(idx => idx + 1);
            } else {
              setIsRunning(false);
              setIsFinished(true);
              try {
                confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
              } catch {}
            }
            return 0;
          }
          if (prev <= 4 && prev > 1 && soundEnabled) {
            playBeep(640, 0.1);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, secondsLeft, currentIdx, soundEnabled]);

  return (
    <div className="min-modal-backdrop">
      <div className="min-modal-sheet">
        <div className="min-handle" />

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="min-badge min-badge-red">SPINE DECOMPRESSION</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                11:35 AM DAILY
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', marginTop: '2px', color: '#ffffff' }}>7-Minute Stretch Routine</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

        {isFinished ? (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}>
              <CheckCircle2 size={32} color="#000" strokeWidth={2.5} />
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>SPINE DECOMPRESSED</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '18px' }}>
              Postural tension relieved. Spine restored to maximum natural upright height.
            </p>

            <button
              type="button"
              className="min-btn min-btn-white"
              onClick={() => {
                onCompleted();
                onClose();
              }}
              style={{ width: '100%' }}
            >
              DONE & LOGGED
            </button>
          </div>
        ) : (
          <div>
            {/* Step Indicators */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
              {DAILY_STRETCHES.map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    flex: 1,
                    height: '3px',
                    borderRadius: '2px',
                    background: idx === currentIdx ? '#ffffff' : idx < currentIdx ? 'var(--accent-green)' : '#222222'
                  }}
                />
              ))}
            </div>

            {/* Stretch Card */}
            <div className="min-card" style={{ textAlign: 'center', padding: '20px 14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', fontWeight: 800, textTransform: 'uppercase' }}>
                STRETCH {currentIdx + 1} OF {DAILY_STRETCHES.length} • {currentStretch.targetArea}
              </div>

              <h3 style={{ fontSize: '1.4rem', margin: '4px 0 6px 0', color: '#ffffff' }}>
                {currentStretch.name}
              </h3>

              <div style={{ fontSize: '0.82rem', color: 'var(--accent-red)', fontWeight: 800, marginBottom: '10px' }}>
                {currentStretch.setsOrReps}
              </div>

              {/* Stretch Visualizer & Target Stress Map */}
              <div style={{ margin: '10px 0' }}>
                <HumanExerciseVisualizer
                  exerciseId={currentStretch.id}
                  exerciseName={currentStretch.name}
                  compact={true}
                />
              </div>

              {/* Laser Green Timer */}
              <div className="timer-green" style={{ fontSize: '3.6rem', lineHeight: 1, margin: '8px 0' }}>
                {secondsLeft}s
              </div>

              {/* Instructions */}
              <div className="min-subcard" style={{ textAlign: 'left', marginTop: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 800, marginBottom: '3px' }}>
                  INSTRUCTION:
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                  {currentStretch.formInstruction}
                </p>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                  <strong>Benefit:</strong> {currentStretch.purpose}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="min-btn min-btn-dark"
                onClick={() => setIsRunning(!isRunning)}
                style={{ flex: 1 }}
              >
                {isRunning ? <Pause size={15} /> : <Play size={15} />}
                <span>{isRunning ? 'PAUSE' : 'RESUME'}</span>
              </button>

              <button
                type="button"
                className="min-btn min-btn-white"
                onClick={() => {
                  if (currentIdx < DAILY_STRETCHES.length - 1) {
                    setCurrentIdx(prev => prev + 1);
                  } else {
                    setIsFinished(true);
                  }
                }}
                style={{ flex: 1.4 }}
              >
                <span>NEXT STRETCH</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
