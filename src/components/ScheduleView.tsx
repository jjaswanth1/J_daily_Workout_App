'use client';

import React from 'react';
import { Clock, Sun, Flame, Dumbbell, Sparkles, Utensils, Coffee, Briefcase, Apple, Moon, BedDouble, Heart } from 'lucide-react';
import { DAILY_TIME_SPLIT } from '../data/workoutData';

export function ScheduleView() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun size={16} color="var(--accent-red)" />;
      case 'Flame': return <Flame size={16} color="var(--accent-red)" />;
      case 'Dumbbell': return <Dumbbell size={16} color="#FFFFFF" />;
      case 'Sparkles': return <Sparkles size={16} color="var(--accent-green)" />;
      case 'Zap': return <Sparkles size={16} color="var(--accent-green)" />;
      case 'Utensils': return <Utensils size={16} color="#FFFFFF" />;
      case 'Coffee': return <Coffee size={16} color="var(--text-secondary)" />;
      case 'Briefcase': return <Briefcase size={16} color="var(--text-secondary)" />;
      case 'Apple': return <Apple size={16} color="var(--accent-green)" />;
      case 'Moon': return <Moon size={16} color="#A78BFA" />;
      case 'Heart': return <Heart size={16} color="var(--accent-red)" />;
      case 'BedDouble': return <BedDouble size={16} color="var(--text-secondary)" />;
      default: return <Clock size={16} color="var(--accent-red)" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Header */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
          Circadian Synchronization
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            Night-Shift Timeline
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            11:30 AM Wake
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          24-hour master clock designed specifically for evening/night work shifts without burnout.
        </p>
      </div>

      {/* Hourly Timeline Grouped List */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            24-HOUR BLOCKS
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
            {DAILY_TIME_SPLIT.length} Milestones
          </span>
        </div>

        <div>
          {DAILY_TIME_SPLIT.map((slot, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 16px',
                borderTop: idx > 0 ? '1px solid var(--border-subtle)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--bg-subcard)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getIcon(slot.icon)}
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {slot.activity}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                    {slot.details}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-red)', whiteSpace: 'nowrap' }}>
                {slot.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
