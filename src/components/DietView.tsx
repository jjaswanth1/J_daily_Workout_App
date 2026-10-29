'use client';

import React, { useState } from 'react';
import { Droplets, Zap, Check, ChevronDown, ChevronUp, ShoppingBag, Moon, Utensils, RotateCcw } from 'lucide-react';
import { AppStoredState } from '../types/workout';
import { MEAL_TIMELINE, PROTEIN_FOOD_SOURCES } from '../data/workoutData';

interface DietViewProps {
  appState: AppStoredState;
  onAddProtein: (amountGrams: number) => void;
  onResetProtein: () => void;
  onAddWater: (amountMl: number) => void;
  onResetWater: () => void;
  onToggleMeal: (mealId: string) => void;
}

export function DietView({
  appState,
  onAddProtein,
  onResetProtein,
  onAddWater,
  onResetWater,
  onToggleMeal
}: DietViewProps) {
  const [expandedSection, setExpandedSection] = useState<'meals' | 'swaps' | 'grocery' | 'shift' | null>('meals');

  const currentProtein = appState.nutrition.proteinGrams;
  const targetProtein = 80;
  const proteinPercent = Math.min(100, Math.round((currentProtein / targetProtein) * 100));

  const currentWater = appState.nutrition.waterMl;
  const targetWater = 2800;
  const waterPercent = Math.min(100, Math.round((currentWater / targetWater) * 100));

  const groceryItems = [
    { name: 'Eggs (Whole)', note: '2-3 eggs daily for high leucine protein & choline' },
    { name: 'Milk & Fresh Curd (Dahi)', note: 'Digestive probiotics + sustained casein protein' },
    { name: 'Paneer (Cottage Cheese)', note: '100g = 18g high quality vegetarian protein' },
    { name: 'Chicken Breast or Fish Fillets', note: 'Lean muscle recovery (100g = 25-30g protein)' },
    { name: 'Roasted Chana / Peanuts', note: 'Non-perishable office snack (10g protein/bowl)' },
    { name: 'Bananas & Soaked Almonds', note: 'Pre-workout fast glycogen fuel' },
    { name: 'Dal & Rajma / Chickpeas', note: 'Complex carbs and micronutrients' },
    { name: 'Rolled Oats / Whole Wheat Atta', note: 'Slow-release energy for night work shifts' }
  ];

  const shiftRules = [
    { title: 'Strict 10:00 PM Caffeine Cutoff', desc: 'No tea, coffee, or energy drinks after 10:00 PM. Caffeine has a 5-6 hour half-life and prevents deep REM sleep when shifting to bed at 4:30 AM.' },
    { title: 'Avoid 2:00 AM Heavy Office Cafeteria Food', desc: 'Metabolism slows overnight. Heavy biryani or fried snacks at 2:00 AM cause severe insulin spikes, sleepiness, and fat storage.' },
    { title: '12:45 PM Post-Workout Anabolic Window', desc: 'Eat within 60 mins of finishing your workout (eggs, milk, or paneer) to kickstart muscle protein synthesis immediately.' },
    { title: '4:00 AM Gentle Pre-Bed Casein', desc: 'A warm glass of milk or small bowl of curd digests slowly across 6-7 hours of daytime sleep, feeding muscles without bloating.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      {/* Apple-style Large Title */}
      <div style={{ padding: '4px 4px 0 4px' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>
          Nutrition & Hydration
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.035em' }}>
            Daily Fuel
          </h1>
          <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', fontWeight: 700 }}>
            75–85g Target
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
          No crash dieting or carb cutting. Prioritize 75–85g clean daily protein and 2.8L hydration.
        </p>
      </div>

      {/* Side-by-Side Apple Metric Gauges (Protein & Water) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {/* Protein Card */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
              Protein
            </span>
            <button
              type="button"
              onClick={onResetProtein}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 2 }}
              title="Reset"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          <div style={{ margin: '8px 0 6px 0' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {currentProtein}g
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-red)', fontWeight: 600, marginTop: '2px' }}>
              of {targetProtein}g ({proteinPercent}%)
            </div>
          </div>

          <div style={{ width: '100%', height: '4px', background: 'var(--bg-subcard)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${proteinPercent}%`, background: 'var(--accent-red)', transition: 'width 0.2s ease' }} />
          </div>
        </div>

        {/* Water Card */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
              Hydration
            </span>
            <button
              type="button"
              onClick={onResetWater}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 2 }}
              title="Reset"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          <div style={{ margin: '8px 0 6px 0' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {(currentWater / 1000).toFixed(2)}L
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 600, marginTop: '2px' }}>
              of {(targetWater / 1000).toFixed(1)}L ({waterPercent}%)
            </div>
          </div>

          <div style={{ width: '100%', height: '4px', background: 'var(--bg-subcard)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${waterPercent}%`, background: 'var(--accent-blue)', transition: 'width 0.2s ease' }} />
          </div>
        </div>
      </div>

      {/* Quick Log Strip (Apple Pill Buttons) */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', padding: '12px 14px' }}>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
          Quick 1-Tap Logging
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button type="button" className="min-btn min-btn-dark" onClick={() => onAddWater(250)} style={{ padding: '6px 12px', fontSize: '0.74rem', minHeight: '32px' }}>
            +250ml Water
          </button>
          <button type="button" className="min-btn min-btn-dark" onClick={() => onAddWater(500)} style={{ padding: '6px 12px', fontSize: '0.74rem', minHeight: '32px' }}>
            +500ml Water
          </button>
          <button type="button" className="min-btn min-btn-dark" onClick={() => onAddProtein(12)} style={{ padding: '6px 12px', fontSize: '0.74rem', minHeight: '32px' }}>
            +12g (2 Eggs)
          </button>
          <button type="button" className="min-btn min-btn-dark" onClick={() => onAddProtein(18)} style={{ padding: '6px 12px', fontSize: '0.74rem', minHeight: '32px' }}>
            +18g (Paneer)
          </button>
          <button type="button" className="min-btn min-btn-dark" onClick={() => onAddProtein(25)} style={{ padding: '6px 12px', fontSize: '0.74rem', minHeight: '32px' }}>
            +25g (Chicken)
          </button>
          <button type="button" className="min-btn min-btn-dark" onClick={() => onAddProtein(8)} style={{ padding: '6px 12px', fontSize: '0.74rem', minHeight: '32px' }}>
            +8g (Milk)
          </button>
        </div>
      </div>

      {/* Accordion 1: Night-Shift Meal Schedule (Preserves all 7 timeline items) */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setExpandedSection(expandedSection === 'meals' ? null : 'meals')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Utensils size={16} color="var(--accent-red)" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Night-Shift Meal Timeline
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                11:30 AM to 4:00 AM Schedule ({MEAL_TIMELINE.length} meals)
              </div>
            </div>
          </div>
          {expandedSection === 'meals' ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
        </div>

        {expandedSection === 'meals' && (
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {MEAL_TIMELINE.map((meal, mIdx) => {
              const isChecked = !!appState.nutrition.mealsChecked[meal.id];
              return (
                <div
                  key={meal.id}
                  style={{
                    padding: '12px 16px',
                    borderTop: mIdx > 0 ? '1px solid var(--border-subtle)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: isChecked ? 'rgba(48, 209, 88, 0.04)' : 'transparent'
                  }}
                >
                  <div
                    className={`min-checkbox ${isChecked ? 'checked' : ''}`}
                    onClick={() => onToggleMeal(meal.id)}
                    style={{ marginTop: '2px' }}
                  >
                    {isChecked && <Check size={14} color="#000000" strokeWidth={3} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: isChecked ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                        {meal.mealName}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', background: 'var(--bg-subcard)', padding: '2px 8px', borderRadius: '9999px' }}>
                        {meal.proteinEstimate}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontWeight: 600, marginTop: '1px' }}>
                      {meal.timeWindow}
                    </div>

                    <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.35, marginTop: '3px' }}>
                      {meal.foodDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion 2: Protein Food Sources & Swaps */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setExpandedSection(expandedSection === 'swaps' ? null : 'swaps')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={16} color="var(--accent-green)" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Protein Food Sources & Swaps
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Quick reference guide & 1-tap add
              </div>
            </div>
          </div>
          {expandedSection === 'swaps' ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
        </div>

        {expandedSection === 'swaps' && (
          <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
            {PROTEIN_FOOD_SOURCES.map((food, fIdx) => (
              <div
                key={food.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderTop: fIdx > 0 ? '1px solid var(--border-subtle)' : 'none'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {food.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {food.unit} • <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>+{food.protein}g protein</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="min-btn min-btn-dark"
                  onClick={() => onAddProtein(food.protein)}
                  style={{ padding: '4px 10px', fontSize: '0.7rem', minHeight: '28px' }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 3: Weekly Grocery Staples */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setExpandedSection(expandedSection === 'grocery' ? null : 'grocery')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={16} color="var(--accent-blue)" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Weekly Grocery Staples
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Everything needed for hassle-free prep
              </div>
            </div>
          </div>
          {expandedSection === 'grocery' ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
        </div>

        {expandedSection === 'grocery' && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '12px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {groceryItems.map((item, gIdx) => (
                <div key={gIdx} style={{ background: 'var(--bg-subcard)', padding: '8px 12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    • {item.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accordion 4: Night-Shift Digestion & Caffeine Rules */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '18px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
        <div
          onClick={() => setExpandedSection(expandedSection === 'shift' ? null : 'shift')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Moon size={16} color="#A78BFA" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Night-Shift Digestion Rules
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Caffeine cutoffs & metabolic circadian cues
              </div>
            </div>
          </div>
          {expandedSection === 'shift' ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-tertiary)" />}
        </div>

        {expandedSection === 'shift' && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '12px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {shiftRules.map((rule, rIdx) => (
                <div key={rIdx} style={{ background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {rule.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
                    {rule.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
