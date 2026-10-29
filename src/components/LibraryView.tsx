'use client';

import React, { useState } from 'react';
import { Search, ExternalLink, HelpCircle, ChevronDown, ChevronUp, PlayCircle, Tv } from 'lucide-react';
import { EXERCISE_LIBRARY, TRUSTED_CHANNELS } from '../data/workoutData';
import { HumanExerciseVisualizer } from './HumanExerciseVisualizer';

export function LibraryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showHowToRead, setShowHowToRead] = useState<boolean>(false);
  const [showChannels, setShowChannels] = useState<boolean>(false);

  const categories = ['All', 'Upper Push', 'Upper Pull', 'Lower Body', 'Core', 'Posture', 'Cardio'];

  const exercises = Object.values(EXERCISE_LIBRARY).filter(ex => {
    const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesQuery =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.musclesWorked.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ex.endResult.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Apple-style Large Title */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
          Exercise Directory • 24 Movements
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            Movement Guide
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            {exercises.length} Found
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          Real 3D muscular loops, biomechanics, and form execution cues for every curriculum exercise.
        </p>
      </div>

      {/* Apple Search Bar */}
      <div style={{ position: 'relative' }}>
        <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search exercise, muscle, or movement..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-pill)',
            padding: '12px 14px 12px 40px',
            color: 'var(--text-primary)',
            fontSize: '0.84rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Category Pills Strip */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                flex: '0 0 auto',
                background: isSelected ? 'var(--text-primary)' : 'var(--bg-card)',
                color: isSelected ? 'var(--bg-shell)' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--text-primary)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* "How to Read Sets & Reps" Disclosure */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setShowHowToRead(!showHowToRead)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={15} color="var(--accent-red)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              How to Read Sets & Reps
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>{showHowToRead ? 'Hide' : 'Explain'}</span>
            {showHowToRead ? <ChevronUp size={15} color="var(--text-tertiary)" /> : <ChevronDown size={15} color="var(--text-tertiary)" />}
          </div>
        </div>

        {showHowToRead && (
          <div style={{ padding: '0 16px 14px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Squats 3x15:</strong> 15 squats (Set 1) → Rest 60-90s → Repeat 15 (Set 2) → Rest → Repeat 15 (Set 3). Total 45 reps done in 3 rounds.
              </div>
              <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Push-ups 3 sets:</strong> Max good form reps → Rest → Set 2 → Rest → Set 3. Always maintain strict core tension; form over rep count.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exercise List: Apple Grouped Inset */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            MOVEMENTS (TAP TO EXPAND)
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
            3D Loops & Cues
          </span>
        </div>

        <div>
          {exercises.map((exercise, idx) => {
            const isExpanded = expandedId === exercise.id;

            return (
              <div key={exercise.id} style={{ borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                {/* Row Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exercise.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '13px 16px',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-secondary)', background: 'var(--bg-subcard)', padding: '2px 7px', borderRadius: '9999px', fontWeight: 600 }}>
                        {exercise.category}
                      </span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-tertiary)' }}>
                        Phase {exercise.phaseIntroduced}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {exercise.name}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      color: isExpanded ? 'var(--accent-red)' : 'var(--text-secondary)',
                      fontWeight: 700,
                      background: 'rgba(255,255,255,0.05)',
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
                        exerciseId={exercise.id}
                        exerciseName={exercise.name}
                        compact={false}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                        <div style={{ color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                          Physical Outcome
                        </div>
                        <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{exercise.endResult}</div>
                      </div>

                      <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                        <div style={{ color: 'var(--text-secondary)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Form Execution Steps
                        </div>
                        <ul style={{ paddingLeft: '16px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                          {exercise.formTips.map((tip, tIdx) => (
                            <li key={tIdx} style={{ marginBottom: '3px' }}>{tip}</li>
                          ))}
                        </ul>
                      </div>

                      {exercise.beginnerMod && (
                        <div style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                          <div style={{ color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px' }}>
                            Beginner Modification
                          </div>
                          <div style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{exercise.beginnerMod}</div>
                        </div>
                      )}

                      <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' form beginner calisthenics')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-btn min-btn-dark"
                        style={{ padding: '8px 14px', fontSize: '0.78rem', width: '100%', minHeight: '36px' }}
                      >
                        <PlayCircle size={15} color="var(--accent-red)" />
                        <span>Watch Video Form Demonstration</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trusted Channels Accordion */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setShowChannels(!showChannels)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tv size={15} color="var(--accent-red)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Recommended Form Channels
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>{showChannels ? 'Hide' : 'View'}</span>
            {showChannels ? <ChevronUp size={15} color="var(--text-tertiary)" /> : <ChevronDown size={15} color="var(--text-tertiary)" />}
          </div>
        </div>

        {showChannels && (
          <div style={{ padding: '0 16px 14px 16px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subcard)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {TRUSTED_CHANNELS.map(ch => (
                <a
                  key={ch.name}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'var(--bg-subcard)',
                    textDecoration: 'none'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--text-primary)' }}>{ch.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{ch.focus}</div>
                  </div>
                  <ExternalLink size={13} color="var(--text-secondary)" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
