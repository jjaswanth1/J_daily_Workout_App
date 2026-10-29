'use client';

import React, { useState } from 'react';
import { Play, Sparkles, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { DAILY_STRETCHES } from '../data/workoutData';
import { HumanExerciseVisualizer } from './HumanExerciseVisualizer';

interface StretchViewProps {
  onStartStretchSession: () => void;
}

export function StretchView({ onStartStretchSession }: StretchViewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showScienceNote, setShowScienceNote] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Apple-style Large Title & Overview */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
          Daily Protocol • 11:35 AM
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            Spine Stretches
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            7 Minutes Daily
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          Decompresses spinal discs compressed by sitting and gravity. Restores up to ~1 inch of posture height.
        </p>
      </div>

      {/* Main Start Button */}
      <button
        type="button"
        className="min-btn min-btn-white"
        onClick={onStartStretchSession}
        style={{ width: '100%', padding: '15px', fontSize: '0.92rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(255,255,255,0.08)' }}
      >
        <Play size={16} fill="currentColor" />
        <span>START 7-MIN STRETCH ROUTINE</span>
      </button>

      {/* Science Disclosure (Tucked away cleanly) */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setShowScienceNote(!showScienceNote)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={15} color="var(--accent-red)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Spine Decompression Science
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>{showScienceNote ? 'Hide' : 'Details'}</span>
            {showScienceNote ? <ChevronUp size={15} color="var(--text-tertiary)" /> : <ChevronDown size={15} color="var(--text-tertiary)" />}
          </div>
        </div>

        {showScienceNote && (
          <div style={{ padding: '0 16px 14px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '10px' }}>
              At age 24, growth plates are closed. These stretches do not grow bone, but decompressing spinal discs reveals real hidden height, decompresses vertebrae, and bulletproofs posture against desk hunching.
            </p>
          </div>
        )}
      </div>

      {/* 5 Daily Essentials: Apple Grouped Inset */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            5 DAILY MOVEMENTS (TAP TO EXPAND)
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
            3D Loops & Cues
          </span>
        </div>

        <div>
          {DAILY_STRETCHES.map((s, idx) => {
            const isExpanded = expandedId === s.id;

            return (
              <div key={s.id} style={{ borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                {/* Minimal Row Header (Clean, zero clutter at first glance) */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : s.id)}
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
                        {s.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                        {s.setsOrReps} • {s.targetArea}
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

                {/* Dropdown Content */}
                {isExpanded && (
                  <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
                    <div style={{ marginTop: '12px' }}>
                      <HumanExerciseVisualizer
                        exerciseId={s.id}
                        exerciseName={s.name}
                        compact={false}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                        <div style={{ color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                          Form Instruction
                        </div>
                        <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{s.formInstruction}</div>
                      </div>

                      <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                        <div style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                          Target Area & Decompression Purpose
                        </div>
                        <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Target:</strong> {s.targetArea} — {s.purpose}
                        </div>
                      </div>
                    </div>
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
