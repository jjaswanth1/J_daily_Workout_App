'use client';

import React, { useState } from 'react';
import { Plus, Download, ChevronRight, CheckCircle2, TrendingUp, X } from 'lucide-react';
import { AppStoredState, MonthlyCheckInRecord } from '../types/workout';

interface ProgressViewProps {
  appState: AppStoredState;
  onSaveCheckIn: (record: MonthlyCheckInRecord) => void;
  onExportData: () => void;
}

export function ProgressView({ appState, onSaveCheckIn, onExportData }: ProgressViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [weightInput, setWeightInput] = useState<string>('53');
  const [pushupsInput, setPushupsInput] = useState<string>('15');
  const [plankInput, setPlankInput] = useState<string>('45');
  const [notesInput, setNotesInput] = useState<string>('');

  const nextMonthNum = appState.checkIns.length + 1;

  const handleCreateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MonthlyCheckInRecord = {
      month: nextMonthNum,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      weightKg: parseFloat(weightInput) || 53,
      pushupsMax: parseInt(pushupsInput, 10) || 15,
      plankSeconds: parseInt(plankInput, 10) || 45,
      notes: notesInput || `Month ${nextMonthNum} evaluation.`
    };
    onSaveCheckIn(newRecord);
    setShowAddModal(false);
    setNotesInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Apple-style Large Title */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Body Recomposition Log
          </div>
          <button
            type="button"
            onClick={onExportData}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '0.74rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Download size={13} />
            <span>Export</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '2px' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            Monthly Health
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            Month {nextMonthNum} Ready
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          In recomposition, the scale barely moves (fat drops while muscle builds). Measure by monthly progress photos and rep strength.
        </p>
      </div>

      {/* Main Action Button */}
      <button
        type="button"
        className="min-btn min-btn-white"
        onClick={() => setShowAddModal(true)}
        style={{ width: '100%', padding: '15px', fontSize: '0.92rem', borderRadius: '14px', boxShadow: '0 4px 20px rgba(255,255,255,0.08)' }}
      >
        <Plus size={16} />
        <span>LOG MONTH {nextMonthNum} CHECK-IN</span>
      </button>

      {/* Baseline Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '14px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
            Start Bodyweight
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: '6px 0 2px 0' }}>
            53 kg
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Lean Recomp Goal
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '14px' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
            Stature & Age
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, margin: '6px 0 2px 0' }}>
            5&apos;2&quot; • 24y
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            Spine & Posture Focus
          </div>
        </div>
      </div>

      {/* Check-In History: Apple Grouped Inset */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            CHECK-IN HISTORY ({appState.checkIns.length})
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
            Strength & Body
          </span>
        </div>

        <div>
          {appState.checkIns.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '14px 16px',
                borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-red)', background: 'var(--accent-red-dim)', padding: '2px 8px', borderRadius: '9999px' }}>
                  Month {item.month}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>{item.date}</span>
              </div>

              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {item.notes}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-subcard)', padding: '8px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontWeight: 600 }}>WEIGHT</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{item.weightKg}kg</div>
                </div>
                <div style={{ background: 'var(--bg-subcard)', padding: '8px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PUSH-UPS</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-red)', marginTop: '2px' }}>{item.pushupsMax}</div>
                </div>
                <div style={{ background: 'var(--bg-subcard)', padding: '8px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PLANK</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-green)', marginTop: '2px' }}>{item.plankSeconds}s</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Check In Modal */}
      {showAddModal && (
        <div className="min-modal-backdrop">
          <div className="min-modal-sheet">
            <div className="min-handle" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                Month {nextMonthNum} Check-In
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-subcard)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Record your monthly strength numbers, body metrics, and posture notes.
            </p>

            <form onSubmit={handleCreateCheckIn} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Current Bodyweight (kg):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-subcard)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Push-Ups Max Reps:
                </label>
                <input
                  type="number"
                  value={pushupsInput}
                  onChange={(e) => setPushupsInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-subcard)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Plank Max Hold (Seconds):
                </label>
                <input
                  type="number"
                  value={plankInput}
                  onChange={(e) => setPlankInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-subcard)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                  Observations & Photo Notes:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Shoulders wider, chest defined, posture upright."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-subcard)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '0.86rem',
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="min-btn min-btn-dark"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, minHeight: '44px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-btn min-btn-white"
                  style={{ flex: 1, minHeight: '44px' }}
                >
                  Save Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
