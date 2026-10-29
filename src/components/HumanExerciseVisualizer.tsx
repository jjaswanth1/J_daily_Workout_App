'use client';

import React, { useState } from 'react';
import { Play, Pause, Activity, Flame, ShieldAlert, Sparkles, Layers } from 'lucide-react';

interface HumanExerciseVisualizerProps {
  exerciseId: string;
  exerciseName: string;
  compact?: boolean;
  defaultView?: 'animation' | 'stress_map';
}

// Muscle groups mapping
interface MuscleStressData {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  stressDescription: string;
  peakPhase: string;
  frontHighlights: ('chest' | 'shoulders' | 'arms' | 'core' | 'quads')[];
  backHighlights: ('upper_back' | 'lats' | 'lower_back' | 'glutes' | 'hamstrings' | 'calves')[];
}

const MUSCLE_STRESS_MAP: Record<string, MuscleStressData> = {
  'push-ups': {
    primaryMuscles: ['Pectoralis Major (Chest)', 'Triceps Brachii'],
    secondaryMuscles: ['Anterior Deltoids (Front Shoulders)', 'Core Stabilizers'],
    stressDescription: 'Maximum mechanical stress occurs at the bottom 90° stretch where chest fibers are fully lengthened.',
    peakPhase: 'Bottom 90° chest stretch & final triceps lockout',
    frontHighlights: ['chest', 'shoulders', 'arms', 'core'],
    backHighlights: []
  },
  'incline-push-ups': {
    primaryMuscles: ['Lower Pectoralis Major', 'Triceps Brachii'],
    secondaryMuscles: ['Anterior Deltoids', 'Core'],
    stressDescription: 'Elevated hands angle reduces bodyweight percentage to ~45%, targeting lower chest and building push-up form.',
    peakPhase: 'Controlled bottom pause on elevated ledge',
    frontHighlights: ['chest', 'arms', 'core'],
    backHighlights: []
  },
  'decline-push-ups': {
    primaryMuscles: ['Upper Pectoralis (Clavicular Head)', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Core'],
    stressDescription: 'Elevated feet angle redirects the pressing line directly into upper chest fibers and front deltoids.',
    peakPhase: 'Bottom descent when nose approaches floor',
    frontHighlights: ['chest', 'shoulders', 'arms'],
    backHighlights: []
  },
  'reverse-grip-push-ups': {
    primaryMuscles: ['Triceps Brachii (All 3 Heads)', 'Lower Pectoralis'],
    secondaryMuscles: ['Forearms', 'Anterior Deltoids'],
    stressDescription: 'Fingers turned back toward feet shifts immense mechanical torque onto the triceps for arm thickness.',
    peakPhase: 'Mid-rep pressing drive through palm base',
    frontHighlights: ['arms', 'chest'],
    backHighlights: []
  },
  'pike-push-ups': {
    primaryMuscles: ['Anterior & Lateral Deltoids (Shoulders)', 'Upper Traps'],
    secondaryMuscles: ['Triceps Brachii', 'Core', 'Serratus'],
    stressDescription: 'Vertical pushing plane shifts bodyweight load directly onto the shoulder caps to build broad shoulder width.',
    peakPhase: 'Bottom descent as head touches triangle floor apex',
    frontHighlights: ['shoulders', 'arms'],
    backHighlights: ['upper_back']
  },
  'squats': {
    primaryMuscles: ['Quadriceps (Front Thighs)', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Calves'],
    stressDescription: 'Deep stretch at the parallel hole places high tension on the glutes and lower quad tendon.',
    peakPhase: 'Parallel 90° hole before ascending drive',
    frontHighlights: ['quads'],
    backHighlights: ['glutes', 'hamstrings']
  },
  'jump-squats': {
    primaryMuscles: ['Fast-Twitch Quadriceps', 'Gluteus Maximus', 'Calves'],
    secondaryMuscles: ['Hamstrings', 'Cardiovascular System'],
    stressDescription: 'High-velocity explosive extension through toes followed by eccentric absorption landing.',
    peakPhase: 'Explosive vertical takeoff & soft toe landing',
    frontHighlights: ['quads'],
    backHighlights: ['glutes', 'calves']
  },
  'bulgarian-split-squats': {
    primaryMuscles: ['Lead Leg Quadriceps', 'Lead Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Rear Hip Flexor Stretch', 'Core'],
    stressDescription: 'Unilateral loading isolates 90% of bodyweight on one leg with deep glute and quad stretch.',
    peakPhase: 'Bottom knee hover (1 inch off floor)',
    frontHighlights: ['quads'],
    backHighlights: ['glutes', 'hamstrings']
  },
  'lunges': {
    primaryMuscles: ['Lead Quadriceps', 'Gluteus Medius & Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core Balance'],
    stressDescription: 'Stepping forward under deceleration challenges quad eccentrics and hip stability.',
    peakPhase: 'Full step depth with 90° front and back knee bend',
    frontHighlights: ['quads'],
    backHighlights: ['glutes', 'hamstrings']
  },
  'wall-sit': {
    primaryMuscles: ['Quadriceps (Vastus Medialis & Lateralis)'],
    secondaryMuscles: ['Gluteus Medius', 'Calves'],
    stressDescription: 'Continuous isometric blood-occlusion stress builds metabolic burn and quad endurance.',
    peakPhase: 'Continuous sustained 90° knee angle hold',
    frontHighlights: ['quads'],
    backHighlights: ['glutes']
  },
  'pull-ups': {
    primaryMuscles: ['Latissimus Dorsi (Lats / Back Width)', 'Biceps Brachii'],
    secondaryMuscles: ['Rhomboids', 'Rear Delts', 'Forearms / Grip'],
    stressDescription: 'Peak contraction occurs at the top when elbows are driven down and chest touches bar.',
    peakPhase: 'Top chest-to-bar contraction & slow negative descent',
    frontHighlights: ['arms'],
    backHighlights: ['lats', 'upper_back']
  },
  'table-rows': {
    primaryMuscles: ['Rhomboids & Mid-Traps (Upper Back)', 'Lats'],
    secondaryMuscles: ['Biceps Brachii', 'Posterior Deltoids'],
    stressDescription: 'Scapular retraction pulls rounded shoulders backward, directly reversing desk slouching.',
    peakPhase: 'Full scapular squeeze at top edge of table',
    frontHighlights: ['arms'],
    backHighlights: ['upper_back', 'lats']
  },
  'plank': {
    primaryMuscles: ['Transverse Abdominis (Deep Core)', 'Rectus Abdominis'],
    secondaryMuscles: ['Obliques', 'Serratus Anterior', 'Glutes'],
    stressDescription: 'Anti-extension stress — the core fights gravity to prevent lumbar hyperextension.',
    peakPhase: 'Continuous pelvic tuck and ab brace',
    frontHighlights: ['core'],
    backHighlights: ['lower_back', 'glutes']
  },
  'side-plank': {
    primaryMuscles: ['Internal & External Obliques', 'Quadratus Lumborum'],
    secondaryMuscles: ['Shoulder Stabilizers', 'Gluteus Medius'],
    stressDescription: 'Anti-lateral flexion stress — locks pelvis and spine in a rigid diagonal plane against gravity.',
    peakPhase: 'Continuous high hip elevation hold',
    frontHighlights: ['core', 'shoulders'],
    backHighlights: ['lower_back']
  },
  'crunches': {
    primaryMuscles: ['Rectus Abdominis (Upper Abs)'],
    secondaryMuscles: ['Transverse Abdominis'],
    stressDescription: 'Spinal flexion curls ribcage toward pelvis, isolating the upper abdominal wall.',
    peakPhase: 'Top 3-inch shoulder blade lift with full exhale',
    frontHighlights: ['core'],
    backHighlights: []
  },
  'bicycle-crunches': {
    primaryMuscles: ['Rotational Obliques', 'Rectus Abdominis'],
    secondaryMuscles: ['Hip Flexors (Psoas)'],
    stressDescription: 'Rotational torque across the torso hits the lateral abdominal wall for waist tapering.',
    peakPhase: 'Opposite elbow touching bent knee with full torso twist',
    frontHighlights: ['core'],
    backHighlights: []
  },
  'russian-twists': {
    primaryMuscles: ['Internal & External Obliques', 'Transverse Abdominis'],
    secondaryMuscles: ['Rectus Abdominis', 'Hip Flexors'],
    stressDescription: 'Isometric 45° torso hold coupled with rotational dynamic ribcage twisting.',
    peakPhase: 'Terminal side rotation with hands touching floor',
    frontHighlights: ['core'],
    backHighlights: ['lower_back']
  },
  'mountain-climbers': {
    primaryMuscles: ['Hip Flexors (Psoas)', 'Rectus Abdominis'],
    secondaryMuscles: ['Anterior Deltoids', 'Calves'],
    stressDescription: 'Dynamic alternating hip flexion while maintaining core plank stability under fatigue.',
    peakPhase: 'Rapid knee drive to elbow while maintaining flat back',
    frontHighlights: ['core', 'shoulders', 'quads'],
    backHighlights: []
  },
  'glute-bridges': {
    primaryMuscles: ['Gluteus Maximus (Buttocks)', 'Hamstrings'],
    secondaryMuscles: ['Erector Spinae (Lower Back)'],
    stressDescription: 'Terminal hip extension creates hard peak contraction at the top 180° lockout.',
    peakPhase: 'Top 2-second glute squeeze with straight knee-to-shoulder line',
    frontHighlights: [],
    backHighlights: ['glutes', 'hamstrings', 'lower_back']
  },
  'superman-holds': {
    primaryMuscles: ['Erector Spinae (Spinal Extensors)', 'Gluteus Maximus'],
    secondaryMuscles: ['Upper Back / Rhomboids', 'Hamstrings'],
    stressDescription: 'Sustained isometric extension strengthens spinal erectors against forward curvature.',
    peakPhase: 'Peak arch lift of chest, thighs, and arms',
    frontHighlights: [],
    backHighlights: ['lower_back', 'glutes', 'upper_back']
  },
  'wall-angels': {
    primaryMuscles: ['Lower/Mid Trapezius', 'Infraspinatus (Rotator Cuff)'],
    secondaryMuscles: ['Posterior Deltoids', 'Thoracic Spine'],
    stressDescription: 'Active thoracic extension and scapular upward rotation relieves neck/shoulder compression.',
    peakPhase: 'Overhead Y-position while keeping elbows glued to wall',
    frontHighlights: ['shoulders'],
    backHighlights: ['upper_back']
  },
  'skipping': {
    primaryMuscles: ['Gastrocnemius & Soleus (Calves)'],
    secondaryMuscles: ['Forearms / Wrist Rotators', 'Cardiovascular System'],
    stressDescription: 'Elastic stretch-shortening cycle on Achilles tendon with continuous calf stress.',
    peakPhase: 'Rope clearing jump on balls of feet',
    frontHighlights: ['arms'],
    backHighlights: ['calves']
  },
  // Spine & Posture Stretches
  'cobra-stretch': {
    primaryMuscles: ['Lumbar Decompression', 'Abdominal Wall Lengthening'],
    secondaryMuscles: ['Anterior Deltoids', 'Chest Stretch'],
    stressDescription: 'Gentle backward extension reverses hours of hunched desk compression.',
    peakPhase: 'Deep belly breath at top gentle chest lift',
    frontHighlights: ['core', 'chest'],
    backHighlights: ['lower_back']
  },
  'cat-cow': {
    primaryMuscles: ['Full Spinal Column Mobilization', 'Thoracic Mobility'],
    secondaryMuscles: ['Neck & Scapula Extensors'],
    stressDescription: 'Alternating between extension (cow) and flexion (cat) lubricates spinal discs.',
    peakPhase: 'Full rounded cat hump & deep cow pelvic tilt',
    frontHighlights: ['core'],
    backHighlights: ['upper_back', 'lower_back']
  },
  'dead-hang': {
    primaryMuscles: ['Spinal Traction Decompression', 'Forearm Grip'],
    secondaryMuscles: ['Latissimus Dorsi Stretch', 'Pectoralis Stretch'],
    stressDescription: 'Gravity decompresses intervertebral discs, unlocking posture height and opening shoulders.',
    peakPhase: 'Complete relaxed dead hang under gravity',
    frontHighlights: ['arms'],
    backHighlights: ['lats', 'upper_back', 'lower_back']
  },
  'forward-fold': {
    primaryMuscles: ['Hamstrings & Posterior Chain', 'Lumbar Stretch'],
    secondaryMuscles: ['Calves', 'Glutes'],
    stressDescription: 'Gravity-assisted hamstring lengthening releases lower back pelvic pull.',
    peakPhase: 'Relaxed fold with dangling crown of head',
    frontHighlights: [],
    backHighlights: ['hamstrings', 'lower_back', 'glutes', 'calves']
  },
  'standing-side-reach': {
    primaryMuscles: ['Latissimus Dorsi Lateral Fibers', 'External Obliques'],
    secondaryMuscles: ['Intercostal Rib Muscles'],
    stressDescription: 'Lateral spine opening lengthens the torso for an elongated, upright posture.',
    peakPhase: 'Deep overhead side lean',
    frontHighlights: ['core'],
    backHighlights: ['lats']
  }
};

const DEFAULT_STRESS: MuscleStressData = {
  primaryMuscles: ['Primary Working Muscles'],
  secondaryMuscles: ['Stabilizer Group'],
  stressDescription: 'Perform movement with strict control and full range of motion.',
  peakPhase: 'Full muscular contraction point',
  frontHighlights: ['chest', 'core'],
  backHighlights: ['upper_back']
};

// Map each exercise to its real 3D Muscular Body Demonstration GIF
const EXERCISE_GIF_MAP: Record<string, string> = {
  'push-ups': '/exercises/push-ups.gif',
  'decline-push-ups': '/exercises/decline-push-ups.gif',
  'incline-push-ups': '/exercises/incline-push-ups.gif',
  'reverse-grip-push-ups': '/exercises/reverse-grip-push-ups.gif',
  'pike-push-ups': '/exercises/decline-push-ups.gif',
  'squats': '/exercises/squats.gif',
  'jump-squats': '/exercises/jump-squats.gif',
  'bulgarian-split-squats': '/exercises/bulgarian-split-squats.gif',
  'lunges': '/exercises/lunges.gif',
  'wall-sit': '/exercises/wall-sit.gif',
  'pull-ups': '/exercises/pull-ups.gif',
  'table-rows': '/exercises/table-rows.gif',
  'plank': '/exercises/plank.gif',
  'side-plank': '/exercises/side-plank.gif',
  'crunches': '/exercises/crunches.gif',
  'bicycle-crunches': '/exercises/bicycle-crunches.gif',
  'russian-twists': '/exercises/russian-twists.gif',
  'mountain-climbers': '/exercises/mountain-climbers.gif',
  'glute-bridges': '/exercises/glute-bridges.gif',
  'superman-holds': '/exercises/superman-holds.gif',
  'wall-angels': '/exercises/wall-angels.gif',
  'skipping': '/exercises/skipping.gif',
  'cobra-stretch': '/exercises/cobra-stretch.gif',
  'cat-cow': '/exercises/cobra-stretch.gif',
  'dead-hang': '/exercises/dead-hang.gif',
  'forward-fold': '/exercises/glute-bridges.gif',
  'standing-side-reach': '/exercises/wall-angels.gif'
};

export function HumanExerciseVisualizer({
  exerciseId,
  exerciseName,
  compact = false,
  defaultView = 'animation'
}: HumanExerciseVisualizerProps) {
  const [viewMode, setViewMode] = useState<'animation' | 'stress_map'>(defaultView === 'stress_map' ? 'stress_map' : 'animation');

  const stressData = MUSCLE_STRESS_MAP[exerciseId] || DEFAULT_STRESS;
  const gifSrc = EXERCISE_GIF_MAP[exerciseId] || '/exercises/push-ups.gif';

  // Anatomical Body Diagram (Front & Back Muscle Heatmap)
  const renderAnatomicalBodyMap = () => {
    const inactiveFill = '#E5E5EA';
    const inactiveStroke = '#D1D1D6';
    const activeFill = '#FF2D55';
    const activeStroke = '#E02449';

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '14px 0' }}>
        {/* Front Body Silhouette */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.64rem', color: 'var(--text-tertiary)', fontWeight: 800, marginBottom: '6px', letterSpacing: '0.06em' }}>
            ANTERIOR (FRONT)
          </div>
          <svg viewBox="0 0 90 145" style={{ width: '85px', height: '135px' }}>
            {/* Head */}
            <circle cx="45" cy="14" r="9" fill={inactiveFill} stroke={inactiveStroke} strokeWidth="1" />

            {/* Shoulders (Deltoids) */}
            <circle
              cx="28"
              cy="28"
              r="5.5"
              fill={stressData.frontHighlights.includes('shoulders') ? activeFill : inactiveFill}
              stroke={stressData.frontHighlights.includes('shoulders') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
            <circle
              cx="62"
              cy="28"
              r="5.5"
              fill={stressData.frontHighlights.includes('shoulders') ? activeFill : inactiveFill}
              stroke={stressData.frontHighlights.includes('shoulders') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Chest (Pectorals) */}
            <rect
              x="33"
              y="26"
              width="24"
              height="14"
              rx="3"
              fill={stressData.frontHighlights.includes('chest') ? activeFill : inactiveFill}
              stroke={stressData.frontHighlights.includes('chest') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Core / Abdominals */}
            <rect
              x="35"
              y="42"
              width="20"
              height="20"
              rx="2.5"
              fill={stressData.frontHighlights.includes('core') ? activeFill : inactiveFill}
              stroke={stressData.frontHighlights.includes('core') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Arms (Biceps/Triceps) */}
            <line
              x1="26"
              y1="34"
              x2="20"
              y2="64"
              stroke={stressData.frontHighlights.includes('arms') ? activeFill : inactiveFill}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <line
              x1="64"
              y1="34"
              x2="70"
              y2="64"
              stroke={stressData.frontHighlights.includes('arms') ? activeFill : inactiveFill}
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Quadriceps (Front Thighs) */}
            <rect
              x="31"
              y="68"
              width="12"
              height="30"
              rx="3"
              fill={stressData.frontHighlights.includes('quads') ? activeFill : inactiveFill}
              stroke={stressData.frontHighlights.includes('quads') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
            <rect
              x="47"
              y="68"
              width="12"
              height="30"
              rx="3"
              fill={stressData.frontHighlights.includes('quads') ? activeFill : inactiveFill}
              stroke={stressData.frontHighlights.includes('quads') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Shins / Calves */}
            <line x1="37" y1="102" x2="37" y2="135" stroke={inactiveFill} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="53" y1="102" x2="53" y2="135" stroke={inactiveFill} strokeWidth="4.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Back Body Silhouette */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.64rem', color: 'var(--text-tertiary)', fontWeight: 800, marginBottom: '6px', letterSpacing: '0.06em' }}>
            POSTERIOR (BACK)
          </div>
          <svg viewBox="0 0 90 145" style={{ width: '85px', height: '135px' }}>
            {/* Head */}
            <circle cx="45" cy="14" r="9" fill={inactiveFill} stroke={inactiveStroke} strokeWidth="1" />

            {/* Upper Back / Trapezius & Rhomboids */}
            <polygon
              points="45,24 30,36 60,36"
              fill={stressData.backHighlights.includes('upper_back') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('upper_back') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Latissimus Dorsi (Lats) */}
            <polygon
              points="34,36 24,56 42,56"
              fill={stressData.backHighlights.includes('lats') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('lats') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
            <polygon
              points="56,36 66,56 48,56"
              fill={stressData.backHighlights.includes('lats') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('lats') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Lower Back (Erector Spinae) */}
            <rect
              x="38"
              y="48"
              width="14"
              height="16"
              fill={stressData.backHighlights.includes('lower_back') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('lower_back') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Gluteus Maximus */}
            <circle
              cx="38"
              cy="70"
              r="8"
              fill={stressData.backHighlights.includes('glutes') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('glutes') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
            <circle
              cx="52"
              cy="70"
              r="8"
              fill={stressData.backHighlights.includes('glutes') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('glutes') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Hamstrings */}
            <rect
              x="31"
              y="79"
              width="12"
              height="24"
              rx="3"
              fill={stressData.backHighlights.includes('hamstrings') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('hamstrings') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
            <rect
              x="47"
              y="79"
              width="12"
              height="24"
              rx="3"
              fill={stressData.backHighlights.includes('hamstrings') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('hamstrings') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />

            {/* Calves */}
            <ellipse
              cx="37"
              cy="114"
              rx="5"
              ry="11"
              fill={stressData.backHighlights.includes('calves') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('calves') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
            <ellipse
              cx="53"
              cy="114"
              rx="5"
              ry="11"
              fill={stressData.backHighlights.includes('calves') ? activeFill : inactiveFill}
              stroke={stressData.backHighlights.includes('calves') ? activeStroke : inactiveStroke}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'var(--glass-blur)', border: '1px solid rgba(255, 255, 255, 0.95)', borderRadius: '18px', padding: compact ? '10px' : '14px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
      {/* Top Header & Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-red)', display: 'inline-block' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {viewMode === 'animation' ? 'Muscular 3D Demonstration' : 'Muscle Stress Tension Map'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'animation' ? 'stress_map' : 'animation')}
          style={{
            background: 'var(--bg-subcard)',
            border: '1px solid rgba(0,0,0,0.06)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-pill)',
            padding: '5px 12px',
            fontSize: '0.68rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Layers size={12} color="var(--accent-red)" />
          <span>{viewMode === 'animation' ? 'View Tension Heatmap' : 'View 3D Animation'}</span>
        </button>
      </div>

      {/* Main Visualizer Frame (Apple Clean Matte Card) */}
      <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        {viewMode === 'animation' ? (
          <div style={{ position: 'relative', width: '100%', minHeight: compact ? '140px' : '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 8px' }}>
            <img
              src={gifSrc}
              alt={exerciseName}
              loading="eager"
              style={{
                maxHeight: compact ? '140px' : '180px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            {/* Subtle Pill Badge */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(10px)',
              padding: '3px 9px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-red)' }} />
              <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                MUSCULAR LOOP
              </span>
            </div>
          </div>
        ) : (
          <div style={{ background: '#FFFFFF', padding: '8px 0' }}>
            {renderAnatomicalBodyMap()}
          </div>
        )}
      </div>

      {/* Muscle Stress Details */}
      <div style={{ marginTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            PRIMARY TENSION:
          </span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-primary)', fontWeight: 700 }}>
            {stressData.primaryMuscles.join(', ')}
          </span>
        </div>

        {stressData.secondaryMuscles.length > 0 && (
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Stabilizers:</strong> {stressData.secondaryMuscles.join(', ')}
          </div>
        )}

        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4, background: 'var(--bg-subcard)', padding: '10px 12px', borderRadius: '10px', borderLeft: '3px solid var(--accent-red)', marginTop: '8px' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Biomechanics: </strong>{stressData.stressDescription}
        </div>
      </div>
    </div>
  );
}
