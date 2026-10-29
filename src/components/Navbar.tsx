'use client';

import React from 'react';
import { Dumbbell, Sparkles, Calendar, Utensils, BookOpen, TrendingUp, Zap, Sun, Moon } from 'lucide-react';

export type TabKey = 'dashboard' | 'stretch' | 'tracker' | 'diet' | 'library' | 'progress';

interface NavbarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onStartLiveWorkout: () => void;
  currentWeek: number;
  theme: 'black' | 'white';
  onToggleTheme: () => void;
}

export function Navbar({ activeTab, onSelectTab, onStartLiveWorkout, currentWeek, theme, onToggleTheme }: NavbarProps) {
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Today', icon: <Zap size={18} /> },
    { key: 'stretch', label: 'Stretch', icon: <Sparkles size={18} /> },
    { key: 'tracker', label: 'Plan', icon: <Calendar size={18} /> },
    { key: 'diet', label: 'Fuel', icon: <Utensils size={18} /> },
    { key: 'library', label: 'Guide', icon: <BookOpen size={18} /> },
    { key: 'progress', label: 'Recomp', icon: <TrendingUp size={18} /> }
  ];

  return (
    <>
      {/* Apple Minimalist Glass Header */}
      <header className="minimal-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              RECOMP // 10 WEEKS
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
              TITAN
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} suppressHydrationWarning>
            {/* Black / White Theme Option Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              suppressHydrationWarning
              aria-label={`Switch to ${theme === 'black' ? 'White' : 'Black'} theme`}
              title={`Switch to ${theme === 'black' ? 'White' : 'Black'} theme`}
              style={{
                background: 'var(--bg-subcard)',
                padding: '5px 11px',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 700,
                transition: 'all 0.15s ease'
              }}
            >
              {theme === 'black' ? (
                <>
                  <Sun size={13} color="#FF9500" />
                  <span suppressHydrationWarning>White</span>
                </>
              ) : (
                <>
                  <Moon size={13} color="var(--text-primary)" />
                  <span suppressHydrationWarning>Black</span>
                </>
              )}
            </button>

            <div style={{ background: 'var(--bg-subcard)', padding: '5px 12px', borderRadius: 'var(--radius-pill)', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid var(--border-subtle)' }} suppressHydrationWarning>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-red)' }} />
              <span suppressHydrationWarning style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-primary)' }}>W{currentWeek}</span>
            </div>

            <button
              type="button"
              className="min-btn"
              onClick={onStartLiveWorkout}
              style={{ background: 'var(--accent-red)', color: '#FFFFFF', padding: '6px 14px', fontSize: '0.74rem', minHeight: '32px' }}
            >
              <Dumbbell size={13} />
              <span>Session</span>
            </button>
          </div>
        </div>
      </header>

      {/* Minimal Floating Bottom Bar */}
      <nav className="min-bottom-bar" aria-label="Mobile Navigation">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              type="button"
              className={`min-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.key)}
            >
              {tab.icon}
              <span className="min-tab-label">{tab.label}</span>
              {isActive && <div className="min-tab-indicator" />}
            </button>
          );
        })}
      </nav>
    </>
  );
}
