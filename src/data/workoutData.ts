import { DayOfWeek, ExerciseDetail, WeekPlanData, TimeSlot, MealScheduleItem, ProteinFoodSource, DailyStretch } from '../types/workout';

export const DAILY_STRETCHES: DailyStretch[] = [
  {
    id: 'cobra-stretch',
    name: 'Cobra Stretch',
    durationSeconds: 30,
    setsOrReps: 'Hold 20–30 sec',
    purpose: 'Decompresses lower spine after hours of desk or sleep compression.',
    formInstruction: 'Lie face down, push chest up through hands, keep hips glued to the floor. Breathe deeply.',
    targetArea: 'Lumbar Spine & Abdominals'
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow Mobility',
    durationSeconds: 40,
    setsOrReps: '10 slow reps',
    purpose: 'Mobilizes full spinal column and relieves neck and mid-back tension.',
    formInstruction: 'On all fours, inhale as you arch back (cow), exhale as you round spine up to ceiling (cat).',
    targetArea: 'Thoracic & Lumbar Spine'
  },
  {
    id: 'dead-hang',
    name: 'Hanging (Dead Hang)',
    durationSeconds: 30,
    setsOrReps: '2–3 sets x 20–30 sec',
    purpose: 'Gentle spinal traction under gravity — reveals hidden compressed height and builds pull-up grip.',
    formInstruction: 'Grip doorway pull-up bar overhead with straight arms. Let bodyweight gently decompress your spine.',
    targetArea: 'Full Spine Traction & Forearm Grip'
  },
  {
    id: 'forward-fold',
    name: 'Standing Forward Fold',
    durationSeconds: 30,
    setsOrReps: 'Hold 20–30 sec',
    purpose: 'Decompresses lower back and stretches tight posterior chain.',
    formInstruction: 'Standing tall, hinge at the hips, let head, neck, and arms dangle toward the floor.',
    targetArea: 'Hamstrings & Posterior Chain'
  },
  {
    id: 'standing-side-reach',
    name: 'Standing Side Reach',
    durationSeconds: 30,
    setsOrReps: 'Hold 15 sec each side',
    purpose: 'Lengthens lateral torso muscles (lats, obliques, intercostals) for upright posture.',
    formInstruction: 'Reach one arm straight overhead and lean gently sideways. Switch sides.',
    targetArea: 'Lateral Torso & Obliques'
  }
];

export const EXERCISE_LIBRARY: Record<string, ExerciseDetail> = {
  'push-ups': {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'Upper Push',
    musclesWorked: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    endResult: 'Builds chest width/thickness and arm definition — the #1 exercise for a "filled out" upper body look.',
    formTips: [
      'Hands slightly wider than shoulder-width.',
      'Body in a rigid straight line from head to heels.',
      'Lower chest towards the floor, elbows angled at ~45° from the torso.',
      'Push back up with full lock-out while engaging the core.'
    ],
    beginnerMod: 'Knees on the floor, or hands on an elevated surface (bed or desk) until strong enough for floor reps.',
    equipment: 'Bodyweight only',
    referenceUrl: 'https://www.healthline.com/health/fitness-exercise/calisthenics',
    referenceTitle: 'Healthline Calisthenics Guide',
    phaseIntroduced: 1
  },
  'squats': {
    id: 'squats',
    name: 'Bodyweight Squats',
    category: 'Lower Body',
    musclesWorked: ['Quads', 'Glutes', 'Hamstrings'],
    endResult: 'Builds leg mass and improves posture and athletic balance. Proportionate legs balance the upper body physique.',
    formTips: [
      'Feet shoulder-width apart, toes slightly flared.',
      'Hinge hips back like sitting onto an imaginary chair.',
      'Descend until thighs are at least parallel to the floor.',
      'Drive powerfully through your heels to return to standing; chest stays proud.'
    ],
    beginnerMod: 'Squat down to a chair or bench tap to master hip depth.',
    equipment: 'Bodyweight only',
    referenceUrl: 'https://www.boxrox.com/5-basic-calisthenics-exercises-for-beginners/',
    referenceTitle: 'BOXROX Basic Calisthenics',
    phaseIntroduced: 1
  },
  'wall-sit': {
    id: 'wall-sit',
    name: 'Wall Sit',
    category: 'Lower Body',
    musclesWorked: ['Quads (Isometric Endurance)', 'Glutes', 'Calves'],
    endResult: 'Builds leg endurance and quad definition without impact — ideal finisher right after squats.',
    formTips: [
      'Back flat against a sturdy wall.',
      'Slide down until thighs are parallel to the floor (knees at strict 90° angle).',
      'Keep heels pressed down firmly; do not rest hands on knees.'
    ],
    beginnerMod: 'Hold at a 45° angle instead of full 90° parallel.',
    equipment: 'Flat wall',
    phaseIntroduced: 1
  },
  'plank': {
    id: 'plank',
    name: 'Forearm Plank',
    category: 'Core',
    musclesWorked: ['Deep Core (Transverse Abdominis)', 'Obliques', 'Lower Back Stabilizers'],
    endResult: 'Flattens and tightens the midsection. A bulletproof core transfers force into push-ups and solidifies tall posture.',
    formTips: [
      'Forearms flat on floor under shoulders.',
      'Straight line head to heels: squeeze glutes, brace abs like taking a punch.',
      'Do not let hips sag down or pike upwards into an A-frame.',
      'Breathe steadily through your nose.'
    ],
    beginnerMod: 'Knee plank or incline plank against a bench for 20-30 seconds.',
    equipment: 'Floor / Mat',
    referenceUrl: 'https://row.gymshark.com/blog/article/calisthenic-workouts-for-beginners',
    referenceTitle: 'Gymshark Calisthenics Basics',
    phaseIntroduced: 1
  },
  'crunches': {
    id: 'crunches',
    name: 'Crunches',
    category: 'Core',
    musclesWorked: ['Upper Abdominals (Rectus Abdominis)'],
    endResult: 'Simpler, lower-demand ab isolation than plank — gives solid core hypertrophy volume without excessive fatigue.',
    formTips: [
      'Lie on back, knees bent, feet flat.',
      'Hands lightly supporting head without pulling on neck.',
      'Curl shoulder blades 2–3 inches off floor using abdominal contraction, then lower slowly.'
    ],
    beginnerMod: 'Cross hands across chest rather than behind head.',
    equipment: 'Floor / Mat',
    phaseIntroduced: 1
  },
  'mountain-climbers': {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'Cardio',
    musclesWorked: ['Core', 'Shoulders', 'Hip Flexors', 'Cardiovascular System'],
    endResult: 'Dynamic full-body move that spikes metabolic rate — serves as an athletic core and cardio burst.',
    formTips: [
      'Start in solid push-up plank position with hands under shoulders.',
      'Drive knees toward chest alternately at a brisk, controlled rhythm.',
      'Keep hips level; avoid bouncing up and down.'
    ],
    beginnerMod: 'Perform at a steady step pace rather than a sprint.',
    equipment: 'Floor / Mat',
    phaseIntroduced: 1
  },
  'pull-ups': {
    id: 'pull-ups',
    name: 'Pull-ups (or Negatives)',
    category: 'Upper Pull',
    musclesWorked: ['Lats (Latissimus Dorsi)', 'Biceps', 'Upper Back'],
    endResult: 'The ultimate driver of back width and the athletic V-taper look. Pairs with push-ups as your foundation.',
    formTips: [
      'Overhand grip slightly wider than shoulders.',
      'Pull elbows down and back until chin clears the bar.',
      'Lower down with full control (no uncontrolled swinging or kipping).'
    ],
    beginnerMod: 'Negative Pull-ups: Jump or step up so chin is over bar, then lower down as slowly as humanly possible (3–5 seconds) to build eccentric strength.',
    equipment: 'Doorway pull-up bar (removable / no-drill)',
    referenceUrl: 'https://www.healthline.com/health/fitness-exercise/calisthenics',
    referenceTitle: 'Healthline Pull Guide',
    phaseIntroduced: 1
  },
  'table-rows': {
    id: 'table-rows',
    name: 'Table / Doorway Rows',
    category: 'Posture',
    musclesWorked: ['Upper Back (Rhomboids, Mid-Traps)', 'Lats', 'Biceps'],
    endResult: 'Your primary POSTURE EXERCISE. Back muscles retract rounded shoulders, counteracting slouching from long desk or chair hours.',
    formTips: [
      'Lie under a sturdy table, grip the edge, feet flat on the floor.',
      'Pull your chest up to the table edge while keeping the body completely straight.',
      'Squeeze shoulder blades together at peak contraction, then lower slowly.'
    ],
    beginnerMod: 'Wrap a bedsheet/towel around a closed door handle or doorframe, lean back at 45°, and row inward.',
    equipment: 'Sturdy table or doorframe towel setup',
    phaseIntroduced: 1
  },
  'glute-bridges': {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    category: 'Lower Body',
    musclesWorked: ['Glutes', 'Lower Back', 'Hamstrings'],
    endResult: 'Supports lower back health and pelvis alignment. Balances out all front-body pushing and hip flexion.',
    formTips: [
      'Lie on your back, knees bent, feet flat hip-width on floor.',
      'Push through your heels until hips form a straight line from knees to shoulders.',
      'Hard 2-second squeeze on glutes at the top before slowly descending.'
    ],
    equipment: 'Floor / Mat',
    phaseIntroduced: 1
  },
  'superman-holds': {
    id: 'superman-holds',
    name: 'Superman Holds',
    category: 'Posture',
    musclesWorked: ['Erector Spinae (Lower Back)', 'Glutes', 'Upper Back'],
    endResult: 'Directly counters forward-slouch posture and strengthens spinal muscles, relieving neck and desk tension.',
    formTips: [
      'Lie face down on the floor with arms outstretched overhead.',
      'Simultaneously lift your chest, arms, and legs a few inches off the floor.',
      'Hold peak isometric hold for 2–3 seconds before controlled release.'
    ],
    equipment: 'Floor / Mat',
    phaseIntroduced: 1
  },
  'wall-angels': {
    id: 'wall-angels',
    name: 'Wall Angels',
    category: 'Posture',
    musclesWorked: ['Upper Back', 'Rotator Cuff', 'Thoracic Spine Mobility'],
    endResult: 'Crucial posture correction specifically for neck and shoulders. Daily high-payoff habit for height confidence.',
    formTips: [
      'Stand with lower back, head, and elbows flat against a wall in a "goalpost" 90° position.',
      'Slide arms upward along the wall without arching your lower back or losing contact.',
      'Slow, controlled tempo; feel the upper back and shoulders open up.'
    ],
    equipment: 'Any flat wall',
    phaseIntroduced: 1
  },
  'side-plank': {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'Core',
    musclesWorked: ['Obliques', 'Quadratus Lumborum', 'Shoulder Stabilizers'],
    endResult: 'Sculpts the waistline, strengthens lateral spinal stability, and prevents lower back asymmetries.',
    formTips: [
      'Forearm on floor directly below shoulder, feet stacked or staggered.',
      'Lift hips so body forms a straight diagonal line.',
      'Keep head neutral and avoid rolling chest forward.'
    ],
    beginnerMod: 'Keep bottom knee bent on the floor while holding the hips high.',
    equipment: 'Floor / Mat',
    phaseIntroduced: 1
  },
  'skipping': {
    id: 'skipping',
    name: 'Skipping (Jump Rope)',
    category: 'Cardio',
    musclesWorked: ['Calves', 'Shoulders & Forearms', 'Cardiovascular System'],
    endResult: 'Burns fat, keeps you lean, sharpens coordination, and boosts cardio stamina so strength sets feel easier.',
    formTips: [
      'Rotate rope from the wrists, not broad shoulder swings.',
      'Jump only 1 to 2 inches off the ground.',
      'Land softly on the balls of your feet with knees gently bent.'
    ],
    equipment: 'Jump rope',
    referenceUrl: 'https://www.healthline.com/health/fitness-exercise/calisthenics',
    referenceTitle: 'Healthline Jump Rope Guide',
    phaseIntroduced: 1
  },

  // Phase 2 Additions
  'decline-push-ups': {
    id: 'decline-push-ups',
    name: 'Decline Push-ups',
    category: 'Upper Push',
    musclesWorked: ['Upper Chest (Clavicular Head)', 'Front Deltoids', 'Triceps', 'Core'],
    endResult: 'Emphasizes upper chest thickness to give that full, armor-like upper chest development.',
    formTips: [
      'Place toes elevated on a sturdy chair, couch, or bed.',
      'Hands flat on floor slightly wider than shoulders.',
      'Lower chest towards floor, control descent, press up.'
    ],
    equipment: 'Chair or elevated surface',
    phaseIntroduced: 2
  },
  'reverse-grip-push-ups': {
    id: 'reverse-grip-push-ups',
    name: 'Reverse Grip Push-ups',
    category: 'Upper Push',
    musclesWorked: ['Triceps', 'Lower Chest', 'Anterior Shoulders'],
    endResult: 'Underhand/reverse hand placement shifts substantial mechanical load onto the triceps for upper arm thickness.',
    formTips: [
      'Hands on floor with palms facing forward (fingers pointing towards your feet).',
      'Keep elbows tucked tightly to your sides as you descend and push back up.'
    ],
    equipment: 'Floor / Mat',
    phaseIntroduced: 2
  },
  'jump-squats': {
    id: 'jump-squats',
    name: 'Jump Squats',
    category: 'Lower Body',
    musclesWorked: ['Quads', 'Glutes', 'Calves', 'Explosive Power'],
    endResult: 'Develops athletic explosive leg strength and muscle recruitment beyond regular bodyweight squats.',
    formTips: [
      'Descend into parallel squat, then explosively jump vertically.',
      'Land softly on toes rolling back to midfoot, immediately absorbing into next squat.'
    ],
    equipment: 'Bodyweight',
    phaseIntroduced: 2
  },
  'bulgarian-split-squats': {
    id: 'bulgarian-split-squats',
    name: 'Bulgarian Split Squats',
    category: 'Lower Body',
    musclesWorked: ['Quads', 'Glutes', 'Hamstrings', 'Hip Flexors'],
    endResult: 'The undisputed king of bodyweight leg builders. Isolates each leg unilaterally to fix strength imbalances.',
    formTips: [
      'Rest rear foot on a chair behind you, front foot about 2-3 feet ahead.',
      'Lower back knee straight towards floor until front thigh is parallel.',
      'Drive up through the front heel.'
    ],
    equipment: 'Chair or couch',
    phaseIntroduced: 2
  },
  'lunges': {
    id: 'lunges',
    name: 'Walking / Static Lunges',
    category: 'Lower Body',
    musclesWorked: ['Quads', 'Glutes', 'Hamstrings'],
    endResult: 'Builds single-leg stability, hip mobility, and leg symmetry to complement squats.',
    formTips: [
      'Step forward smoothly, lowering back knee toward floor.',
      'Keep front shin perpendicular to floor; push back cleanly through front heel.'
    ],
    equipment: 'Bodyweight',
    phaseIntroduced: 2
  },
  'pike-push-ups': {
    id: 'pike-push-ups',
    name: 'Pike Push-ups',
    category: 'Upper Push',
    musclesWorked: ['Anterior & Lateral Deltoids', 'Upper Traps', 'Triceps'],
    endResult: 'Targets shoulders directly — builds that wide, capped shoulder look that dramatically enhances upper body frame.',
    formTips: [
      'Inverted V downward dog position: hips high in the air, hands shoulder-width.',
      'Look between your feet or slightly forward, lower crown of head slightly forward of hands.',
      'Push through palms up and back to starting pike.'
    ],
    beginnerMod: 'Elevate hands on a low box or reduce hip elevation angle.',
    equipment: 'Floor / Mat',
    phaseIntroduced: 2
  },
  'bicycle-crunches': {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'Core',
    musclesWorked: ['Obliques', 'Rectus Abdominis', 'Hip Flexors'],
    endResult: 'Dynamic rotational movement that carves definition along the lateral borders of the midsection.',
    formTips: [
      'Lie on back with hands behind head, legs bent at 90° in air.',
      'Pedal legs while twisting torso to bring opposite elbow to opposite knee.',
      'Controlled cadence without pulling on the neck.'
    ],
    equipment: 'Floor / Mat',
    phaseIntroduced: 2
  },
  'russian-twists': {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'Core',
    musclesWorked: ['Obliques', 'Rotational Core', 'Deep Stabilizers'],
    endResult: 'Builds core rotational stability — directly supports guitar posture and sitting endurance.',
    formTips: [
      'Sit with knees bent, lean torso back at 45° angle.',
      'Clasp hands in front of chest and rotate ribcage from side to side touching floor.',
      'Keep feet flat on floor as beginner, or hover feet for extra burn.'
    ],
    equipment: 'Floor / Mat',
    phaseIntroduced: 2
  }
};

export const DAILY_TIME_SPLIT: TimeSlot[] = [
  {
    time: '11:30 AM',
    startHour: 11.5,
    endHour: 11.58,
    activity: 'Wake Up & Pre-Workout',
    details: '1 ripe banana + a few soaked almonds (or boiled egg). Fast digestible fuel for the session.',
    type: 'wake',
    icon: 'Sun'
  },
  {
    time: '11:35 – 11:42 AM',
    startHour: 11.58,
    endHour: 11.75,
    activity: 'Daily Stretch Routine (No Exceptions)',
    details: 'Cobra stretch, Cat-Cow, Dead Hang (pull-up bar), Forward Fold, Side Reach. Decompresses spine, reveals up to ~1 inch of posture height.',
    type: 'warmup',
    icon: 'Sparkles'
  },
  {
    time: '11:45 – 11:55 AM',
    startHour: 11.75,
    endHour: 11.92,
    activity: 'Dynamic Warm-Up',
    details: 'Jumping jacks (2 min), arm circles, torso twists, bodyweight squats x10. Gets joints primed.',
    type: 'warmup',
    icon: 'Flame'
  },
  {
    time: '11:55 AM – 12:30 PM',
    startHour: 11.92,
    endHour: 12.5,
    activity: 'Main Training Session',
    details: 'Strength training (Mon/Wed/Fri) or Skipping & core finisher (Tue/Thu/Sat). 35 minutes focused effort.',
    type: 'workout',
    icon: 'Dumbbell'
  },
  {
    time: '12:30 – 12:45 PM',
    startHour: 12.5,
    endHour: 12.75,
    activity: 'Cool-Down & Shower',
    details: 'Light stretches, deep breathing, refresh and shower.',
    type: 'warmup',
    icon: 'Sparkles'
  },
  {
    time: '~12:45 PM',
    startHour: 12.75,
    endHour: 13.75,
    activity: 'Post-Workout Shake / Eggs',
    details: 'CRUCIAL RECOVERY WINDOW: 2-3 boiled eggs or protein shake / glass of milk/curd + fruit. Kickstarts muscle repair.',
    type: 'nutrition',
    icon: 'Zap'
  },
  {
    time: '1:45 – 2:00 PM',
    startHour: 13.75,
    endHour: 14.0,
    activity: 'Nutritious Lunch',
    details: 'Rice/roti + dal/lentils + vegetable sabzi + bowl of curd. Sustained complex carbs & protein.',
    type: 'nutrition',
    icon: 'Utensils'
  },
  {
    time: '2:00 – 5:15 PM',
    startHour: 14.0,
    endHour: 17.25,
    activity: 'Open Block (Free Time)',
    details: '~3 hrs 15 min free block: Guitar practice, studies, relaxation, personal creative work.',
    type: 'free',
    icon: 'Coffee'
  },
  {
    time: '5:15 – 5:30 PM',
    startHour: 17.25,
    endHour: 17.5,
    activity: 'Final Prep & Leave for Office',
    details: 'Pack office snack/meal, water bottle, transit to office for 5:30 PM shift start.',
    type: 'office',
    icon: 'Briefcase'
  },
  {
    time: '7:00 – 7:15 PM',
    startHour: 19.0,
    endHour: 19.25,
    activity: 'Office Evening Snack',
    details: 'Roasted chana, peanuts, fresh fruit, or boiled egg. Clean fuel during evening work block.',
    type: 'nutrition',
    icon: 'Apple'
  },
  {
    time: '8:30 – 9:00 PM',
    startHour: 20.5,
    endHour: 21.0,
    activity: 'Main Office Dinner',
    details: 'Roti or rice + paneer / chicken / fish / dal + vegetables. Main solid meal of the night.',
    type: 'nutrition',
    icon: 'Utensils'
  },
  {
    time: '11:30 PM – 12:00 AM',
    startHour: 23.5,
    endHour: 24.0,
    activity: 'Late Night Snack',
    details: 'Roasted chana, nuts, or curd cup to prevent energy drop before shift ends at 2:30 AM.',
    type: 'nutrition',
    icon: 'Moon'
  },
  {
    time: '3:30 – 4:00 AM',
    startHour: 3.5,
    endHour: 4.0,
    activity: 'Light Bedtime Snack',
    details: 'Glass of warm milk or light curd. Gentle casein protein for overnight recovery without heavy digestion.',
    type: 'nutrition',
    icon: 'Heart'
  },
  {
    time: '4:00 – 11:30 AM',
    startHour: 4.0,
    endHour: 11.5,
    activity: 'Deep Restorative Sleep',
    details: '7.5 hours uninterrupted sleep in a dark, quiet room. Essential for muscle growth and hormonal recovery.',
    type: 'sleep',
    icon: 'BedDouble'
  }
];

export const FIXED_WEEKLY_TEMPLATE: Record<DayOfWeek, { title: string; category: string; summary: string }> = {
  Monday: {
    title: 'Push + Legs + Core',
    category: 'Strength & Shape',
    summary: 'Push-ups, squats, wall sit finisher, plank, and wall angels.'
  },
  Tuesday: {
    title: 'Skipping + Core Finisher',
    category: 'Cardio & Agility',
    summary: 'Jump rope intervals + crunches & mountain climbers.'
  },
  Wednesday: {
    title: 'Pull + Posture + Core',
    category: 'Back & Posture',
    summary: 'Pull-up negatives, table rows, glute bridges, superman, and side plank.'
  },
  Thursday: {
    title: 'Skipping + Core Finisher',
    category: 'Cardio & Agility',
    summary: 'Jump rope intervals + crunches & mountain climbers.'
  },
  Friday: {
    title: 'Push + Legs + Core',
    category: 'Strength & Shape',
    summary: 'Push-ups, squats, wall sit finisher, plank, and wall angels.'
  },
  Saturday: {
    title: 'Skipping + Core Finisher',
    category: 'Cardio & Agility',
    summary: 'Jump rope intervals + crunches & mountain climbers.'
  },
  Sunday: {
    title: 'Rest Day',
    category: 'Recovery',
    summary: 'Full recovery to recharge central nervous system. Optional light posture.'
  }
};

export const TEN_WEEK_PROGRAM: WeekPlanData[] = [
  // WEEK 1
  {
    week: 1,
    phase: 1,
    phaseName: 'Phase 1: Foundation',
    phaseGoal: 'Focus on strict form. Push-ups, squats, wall sit quad burn, plank, and skipping with core finishers.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x15 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max good reps', sets: 3, reps: 'Max good form', exerciseId: 'push-ups', tip: 'Chest near floor, elbows 45°' },
          { name: 'Bodyweight Squats', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'squats', tip: 'Thighs parallel, drive through heels' },
          { name: 'Wall Sit', target: '3 sets x 20–30 sec hold', sets: 3, reps: '20–30s hold', exerciseId: 'wall-sit', tip: 'Finisher right after squats; 90° knee angle' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold (target 30-45s)', exerciseId: 'plank', tip: 'Squeeze glutes & core tightly' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels', tip: 'Back and elbows glued against wall' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping + Core Finisher',
        summary: 'Skipping 10 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '10 min interval (30s skip / 30s rest)', sets: 10, reps: '30s skip / 30s rest', exerciseId: 'skipping', tip: 'Rotate with wrists, soft landing' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches', tip: 'Curl shoulder blades using upper abs' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers', tip: 'Drive knees rhythmically' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Posture + Core',
        summary: 'Pull-ups/Negatives 3 sets + Table rows 3x10 + Glute bridges 3x15 + Superman 3x12 + Side plank 2x each side',
        exercises: [
          { name: 'Pull-ups (or Negatives)', target: '3 sets x max reps (or 3 slow negatives)', sets: 3, reps: '3-5 slow negatives or full', exerciseId: 'pull-ups', tip: '3-5 sec slow eccentric descent' },
          { name: 'Table / Doorway Rows', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'table-rows', tip: 'Squeeze upper back at peak' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges', tip: '2s glute squeeze at top' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds', tip: 'Hold 2-3 sec at top' },
          { name: 'Side Plank', target: '2 sets x max hold each side', sets: 2, reps: 'Max hold each side', exerciseId: 'side-plank', tip: 'Keep hips high in diagonal line' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping + Core Finisher',
        summary: 'Skipping 10 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '10 min', sets: 10, reps: 'Interval skip', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x15 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 20–30 sec hold', sets: 3, reps: '20–30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping + Core Finisher',
        summary: 'Skipping 10 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '10 min', sets: 10, reps: 'Interval skip', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest & Recovery',
        summary: 'Rest day — no workout. Don’t forget daily morning spine stretch!',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'No workout', sets: 1, reps: 'Rest', tip: 'Hydrate well and enjoy your free afternoon.' }
        ]
      }
    }
  },
  // WEEK 2
  {
    week: 2,
    phase: 1,
    phaseName: 'Phase 1: Foundation',
    phaseGoal: 'Build stability on wall sit and increase push-up and plank consistency.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x15 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max good form', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 20–30 sec hold', sets: 3, reps: '20–30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping + Core Finisher',
        summary: 'Skipping 10 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '10 min', sets: 10, reps: 'Interval skip', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Posture + Core',
        summary: 'Pull-ups/Negatives 3 sets + Table rows 3x10 + Glute bridges 3x15 + Superman 3x12 + Side plank 2x',
        exercises: [
          { name: 'Pull-ups (or Negatives)', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table / Doorway Rows', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'table-rows' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold each side', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping + Core Finisher',
        summary: 'Skipping 10 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '10 min', sets: 10, reps: 'Interval skip', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x15 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 20–30 sec hold', sets: 3, reps: '20–30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping + Core Finisher',
        summary: 'Skipping 10 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '10 min', sets: 10, reps: 'Interval skip', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest Day',
        summary: 'Full rest and recover.',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'No training', sets: 1, reps: 'Rest' }
        ]
      }
    }
  },
  // WEEK 3
  {
    week: 3,
    phase: 1,
    phaseName: 'Phase 1: Foundation',
    phaseGoal: 'Cardio bumped to 12 minutes. Wall sit stamina increasing to 30 seconds.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x15 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 12 min + Core Finisher',
        summary: 'Skipping 12 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '12 min', sets: 12, reps: '12 min skip', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Posture + Core',
        summary: 'Pull-ups/Negatives + Table rows 3x10 + Glute bridges 3x15 + Superman 3x12 + Side plank 2x',
        exercises: [
          { name: 'Pull-ups (or Negatives)', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table / Doorway Rows', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'table-rows' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold each side', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 12 min + Core Finisher',
        summary: 'Skipping 12 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '12 min', sets: 12, reps: '12 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x15 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 12 min + Core Finisher',
        summary: 'Skipping 12 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '12 min', sets: 12, reps: '12 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest Day',
        summary: 'Rest and recovery.',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'No training', sets: 1, reps: 'Rest' }
        ]
      }
    }
  },
  // WEEK 4
  {
    week: 4,
    phase: 1,
    phaseName: 'Phase 1: Foundation (Peak)',
    phaseGoal: 'Squats bumped to 3x18, Table rows to 3x12. End of Month 1.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Push + Legs + Core (Volume Up)',
        summary: 'Push-ups 3 sets (aim for PR) + Squats 3x18 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x aim for PR reps', sets: 3, reps: 'Aim for PR', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 18 reps', sets: 3, reps: '18 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 12 min + Core Finisher',
        summary: 'Skipping 12 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '12 min', sets: 12, reps: '12 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Posture + Core',
        summary: 'Pull-ups/Negatives + Table rows 3x12 + Glute bridges 3x15 + Superman 3x12 + Side plank 2x',
        exercises: [
          { name: 'Pull-ups (or Negatives)', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table / Doorway Rows', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'table-rows' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 12 min + Core Finisher',
        summary: 'Skipping 12 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '12 min', sets: 12, reps: '12 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Push + Legs + Core',
        summary: 'Push-ups 3 sets + Squats 3x18 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'push-ups' },
          { name: 'Bodyweight Squats', target: '3 sets x 18 reps', sets: 3, reps: '18 reps', exerciseId: 'squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 12 min + Core Finisher',
        summary: 'Skipping 12 min + Crunches 2x15 + Mountain climbers 2x20sec',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '12 min', sets: 12, reps: '12 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Month 1 Check-In & Rest',
        summary: 'Phase 1 Complete! Record push-up/plank numbers in Monthly Recomp tab.',
        isRest: true,
        exercises: [
          { name: 'Month 1 Progress Check-In', target: 'Photos + push-up/plank numbers test', sets: 1, reps: 'Check-in test' }
        ]
      }
    }
  },
  // WEEK 5 (PHASE 2 BEGINS)
  {
    week: 5,
    phase: 2,
    phaseName: 'Phase 2: Progression',
    phaseGoal: 'Decline push-ups (chair), Jump squats, Pike push-ups (capped deltoids), slow 3-sec table rows, Skipping 15 min + rotating core finishers.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Decline Push + Jump Squats + Core',
        summary: 'Decline push-ups (feet on chair) 3 sets + Jump squats 3x12 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps (feet on chair)', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups', tip: 'Elevate toes on chair, hit upper chest' },
          { name: 'Jump Squats', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'jump-squats', tip: 'Explosive jump, soft landing' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 15 min + Core Finisher',
        summary: 'Skipping 15 min + Core finisher (Bicycle crunches 2x20 + Russian twists 2x20)',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '15 min interval/continuous', sets: 15, reps: '15 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches', tip: 'Rotational core definition' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists', tip: 'Lean back 45°, rotate ribcage' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Pike Push-ups + Posture',
        summary: 'Pull-ups/negatives 3 sets + Table rows (slow 3-sec lower) 3x10 + Pike push-ups 3x8 + Glute bridges 3x15 + Superman 3x12 + Side plank 2x each side',
        exercises: [
          { name: 'Pull-ups (or Negatives)', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table Rows (Slow 3-sec lower)', target: '3 sets x 10 reps', sets: 3, reps: '10 reps (3s tempo)', exerciseId: 'table-rows', tip: '3 seconds down on every rep' },
          { name: 'Pike Push-ups', target: '3 sets x 8 reps', sets: 3, reps: '8 reps', exerciseId: 'pike-push-ups', tip: 'Inverted V, builds capped deltoids' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold each side', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 15 min + Core Finisher',
        summary: 'Skipping 15 min + Core finisher (Crunches 2x15 + Mountain climbers 2x20sec)',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '15 min', sets: 15, reps: '15 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Decline Push + Jump Squats + Core',
        summary: 'Decline push-ups 3 sets + Jump squats 3x12 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Jump Squats', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'jump-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 15 min + Core Finisher',
        summary: 'Skipping 15 min + Core finisher (Bicycle crunches 2x20 + Russian twists 2x20)',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '15 min', sets: 15, reps: '15 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest Day',
        summary: 'Rest and recovery.',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'Rest', sets: 1, reps: 'Rest' }
        ]
      }
    }
  },
  // WEEK 6
  {
    week: 6,
    phase: 2,
    phaseName: 'Phase 2: Progression',
    phaseGoal: 'Table rows slow tempo bumped to 3x12. Tricep & quad endurance focus.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Decline Push + Jump Squats',
        summary: 'Decline push-ups 3 sets + Jump squats 3x12 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Jump Squats', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'jump-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 15 min + Core Finisher',
        summary: 'Skipping 15 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '15 min', sets: 15, reps: '15 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Pike Push-ups + Posture',
        summary: 'Pull-ups 3 sets + Table rows (slow) 3x12 + Pike push-ups 3x8 + Glute bridges + Superman + Side plank',
        exercises: [
          { name: 'Pull-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table Rows (Slow)', target: '3 sets x 12 reps', sets: 3, reps: '12 reps (slow lower)', exerciseId: 'table-rows' },
          { name: 'Pike Push-ups', target: '3 sets x 8 reps', sets: 3, reps: '8 reps', exerciseId: 'pike-push-ups' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 15 min + Core Finisher',
        summary: 'Skipping 15 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '15 min', sets: 15, reps: '15 min', exerciseId: 'skipping' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Decline Push + Jump Squats',
        summary: 'Decline push-ups 3 sets + Jump squats 3x12 + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Jump Squats', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'jump-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 15 min + Core Finisher',
        summary: 'Skipping 15 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '15 min', sets: 15, reps: '15 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest Day',
        summary: 'Rest and recovery.',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'Rest', sets: 1, reps: 'Rest' }
        ]
      }
    }
  },
  // WEEK 7
  {
    week: 7,
    phase: 2,
    phaseName: 'Phase 2: Progression (Bulgarian Split Squats)',
    phaseGoal: 'Bulgarian split squats 3x10 each leg, Pike push-ups 3x10, Skipping 18 min.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Decline Push + Bulgarian Split Squats',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x10 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 10 reps each leg', sets: 3, reps: '10 each leg', exerciseId: 'bulgarian-split-squats', tip: 'Rear foot elevated on chair' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 18 min + Core Finisher',
        summary: 'Skipping 18 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '18 min', sets: 18, reps: '18 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Pike Push-ups 3x10',
        summary: 'Pull-ups 3 sets + Table rows (slow) 3x12 + Pike push-ups 3x10 + Glute bridges + Superman + Side plank',
        exercises: [
          { name: 'Pull-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table Rows (Slow)', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'table-rows' },
          { name: 'Pike Push-ups', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'pike-push-ups', tip: 'Bumped to 10 reps!' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 18 min + Core Finisher',
        summary: 'Skipping 18 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '18 min', sets: 18, reps: '18 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Decline Push + Bulgarian Split Squats',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x10 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 10 reps each leg', sets: 3, reps: '10 each leg', exerciseId: 'bulgarian-split-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 18 min + Core Finisher',
        summary: 'Skipping 18 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '18 min', sets: 18, reps: '18 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest Day',
        summary: 'Rest and recovery.',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'Rest', sets: 1, reps: 'Rest' }
        ]
      }
    }
  },
  // WEEK 8
  {
    week: 8,
    phase: 2,
    phaseName: 'Phase 2: Progression (Month 2 Check-in)',
    phaseGoal: 'Bulgarian split squats form mastery. Month 2 review.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Decline Push + Bulgarian Split Squats',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x10 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 10 reps each leg', sets: 3, reps: '10 each leg', exerciseId: 'bulgarian-split-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 18 min + Core Finisher',
        summary: 'Skipping 18 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '18 min', sets: 18, reps: '18 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Pike Push-ups',
        summary: 'Pull-ups 3 sets + Table rows (slow) 3x12 + Pike push-ups 3x10 + Glute bridges + Superman + Side plank',
        exercises: [
          { name: 'Pull-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table Rows (Slow)', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'table-rows' },
          { name: 'Pike Push-ups', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'pike-push-ups' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 18 min + Core Finisher',
        summary: 'Skipping 18 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '18 min', sets: 18, reps: '18 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Decline Push + Bulgarian Split Squats',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x10 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 10 reps each leg', sets: 3, reps: '10 each leg', exerciseId: 'bulgarian-split-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 18 min + Core Finisher',
        summary: 'Skipping 18 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '18 min', sets: 18, reps: '18 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Month 2 Check-In & Rest',
        summary: 'End of Month 2! Compare posture and record stats in Recomp log.',
        isRest: true,
        exercises: [
          { name: 'Month 2 Progress Check-In', target: 'Photos & stats check', sets: 1, reps: 'Check-in test' }
        ]
      }
    }
  },
  // WEEK 9
  {
    week: 9,
    phase: 2,
    phaseName: 'Phase 2: Progression (Peak Intensity)',
    phaseGoal: 'Pause at bottom on Decline push-ups, Bulgarian split squats to 3x12, Table rows to 3x14, Skipping to 20 min.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Paused Decline Push + Bulgarian Squats 3x12',
        summary: 'Decline push-ups (add pause at bottom) 3 sets + Bulgarian split squats 3x12 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups (Bottom Pause)', target: '3 sets x max reps with 1s pause', sets: 3, reps: 'Max reps (paused)', exerciseId: 'decline-push-ups', tip: '1 full second pause at bottom' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 12 reps each leg', sets: 3, reps: '12 each leg', exerciseId: 'bulgarian-split-squats', tip: 'Increased to 12 reps per leg!' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 20 min + Core Finisher',
        summary: 'Skipping 20 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '20 min', sets: 20, reps: '20 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Table Rows 3x14 + Pike',
        summary: 'Pull-ups 3 sets + Table rows (slow) 3x14 + Pike push-ups 3x10 + Glute bridges + Superman + Side plank',
        exercises: [
          { name: 'Pull-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table Rows (Slow)', target: '3 sets x 14 reps', sets: 3, reps: '14 reps', exerciseId: 'table-rows', tip: '14 clean reps with slow descent' },
          { name: 'Pike Push-ups', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'pike-push-ups' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 20 min + Core Finisher',
        summary: 'Skipping 20 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '20 min', sets: 20, reps: '20 min', exerciseId: 'skipping' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Paused Decline Push + Bulgarian Squats 3x12',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x12 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups (Bottom Pause)', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 12 reps each leg', sets: 3, reps: '12 each leg', exerciseId: 'bulgarian-split-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 20 min + Core Finisher',
        summary: 'Skipping 20 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '20 min', sets: 20, reps: '20 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Rest Day',
        summary: 'Rest and recovery.',
        isRest: true,
        exercises: [
          { name: 'Rest', target: 'Rest', sets: 1, reps: 'Rest' }
        ]
      }
    }
  },
  // WEEK 10
  {
    week: 10,
    phase: 2,
    phaseName: 'Phase 2: Progression (Graduation Week)',
    phaseGoal: 'Final week of bodyweight progression! Prepare to introduce adjustable dumbbells in Phase 3.',
    days: {
      Monday: {
        day: 'Monday',
        title: 'Decline Push + Bulgarian Squats 3x12',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x12 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups (Bottom Pause)', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 12 reps each leg', sets: 3, reps: '12 each leg', exerciseId: 'bulgarian-split-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Tuesday: {
        day: 'Tuesday',
        title: 'Skipping 20 min + Core Finisher',
        summary: 'Skipping 20 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '20 min', sets: 20, reps: '20 min', exerciseId: 'skipping' },
          { name: 'Crunches', target: '2 sets x 15 reps', sets: 2, reps: '15 reps', exerciseId: 'crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Wednesday: {
        day: 'Wednesday',
        title: 'Pull + Table Rows 3x14 + Pike',
        summary: 'Pull-ups 3 sets + Table rows (slow) 3x14 + Pike push-ups 3x10 + Glute bridges + Superman + Side plank',
        exercises: [
          { name: 'Pull-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'pull-ups' },
          { name: 'Table Rows (Slow)', target: '3 sets x 14 reps', sets: 3, reps: '14 reps', exerciseId: 'table-rows' },
          { name: 'Pike Push-ups', target: '3 sets x 10 reps', sets: 3, reps: '10 reps', exerciseId: 'pike-push-ups' },
          { name: 'Glute Bridges', target: '3 sets x 15 reps', sets: 3, reps: '15 reps', exerciseId: 'glute-bridges' },
          { name: 'Superman Holds', target: '3 sets x 12 reps', sets: 3, reps: '12 reps', exerciseId: 'superman-holds' },
          { name: 'Side Plank', target: '2 sets x max hold', sets: 2, reps: 'Max hold', exerciseId: 'side-plank' }
        ]
      },
      Thursday: {
        day: 'Thursday',
        title: 'Skipping 20 min + Core Finisher',
        summary: 'Skipping 20 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '20 min', sets: 20, reps: '20 min', exerciseId: 'skipping' },
          { name: 'Mountain Climbers', target: '2 sets x 20 sec', sets: 2, reps: '20s speed', exerciseId: 'mountain-climbers' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' }
        ]
      },
      Friday: {
        day: 'Friday',
        title: 'Decline Push + Bulgarian Squats 3x12',
        summary: 'Decline push-ups 3 sets + Bulgarian split squats 3x12 each leg + Plank 3x max hold + Wall sit 3x20-30sec + Wall angels 2x12',
        exercises: [
          { name: 'Decline Push-ups', target: '3 sets x max reps', sets: 3, reps: 'Max reps', exerciseId: 'decline-push-ups' },
          { name: 'Bulgarian Split Squats', target: '3 sets x 12 reps each leg', sets: 3, reps: '12 each leg', exerciseId: 'bulgarian-split-squats' },
          { name: 'Wall Sit', target: '3 sets x 30 sec hold', sets: 3, reps: '30s hold', exerciseId: 'wall-sit' },
          { name: 'Forearm Plank', target: '3 sets x max hold', sets: 3, reps: 'Max hold', exerciseId: 'plank' },
          { name: 'Wall Angels', target: '2 sets x 12 reps', sets: 2, reps: '12 reps', exerciseId: 'wall-angels' }
        ]
      },
      Saturday: {
        day: 'Saturday',
        title: 'Skipping 20 min + Core Finisher',
        summary: 'Skipping 20 min + Core finisher',
        exercises: [
          { name: 'Skipping (Jump Rope)', target: '20 min', sets: 20, reps: '20 min', exerciseId: 'skipping' },
          { name: 'Bicycle Crunches', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'bicycle-crunches' },
          { name: 'Russian Twists', target: '2 sets x 20 reps', sets: 2, reps: '20 reps', exerciseId: 'russian-twists' }
        ]
      },
      Sunday: {
        day: 'Sunday',
        title: 'Phase 2 Graduation & Transition to Phase 3!',
        summary: '10 WEEKS COMPLETE! Bodyweight recomp foundation locked in.',
        isRest: true,
        exercises: [
          { name: '10-Week Graduation Celebration', target: 'Final assessment & graduation photos', sets: 1, reps: 'Celebrate!', tip: 'Add adjustable dumbbells (5-20 kg) to start Phase 3 hypertrophy!' }
        ]
      }
    }
  }
];

export const MEAL_TIMELINE: MealScheduleItem[] = [
  {
    id: 'pre-workout',
    timeWindow: '11:30 AM (Upon Waking)',
    mealName: 'Pre-Workout Snack',
    foodDescription: '1 ripe banana + a few soaked almonds, OR a boiled egg.',
    proteinEstimate: '6-8g Protein',
    isImportant: false
  },
  {
    id: 'post-workout',
    timeWindow: '~12:45 PM (Within 1 hr of training)',
    mealName: 'Recovery Protein Window',
    foodDescription: '2-3 whole eggs (boiled/omelette) OR protein shake / glass of milk/curd + fruit.',
    proteinEstimate: '18-24g Protein',
    isImportant: true
  },
  {
    id: 'lunch',
    timeWindow: '~1:45 – 2:00 PM',
    mealName: 'Solid Fuel Lunch',
    foodDescription: 'Rice/roti + generous dal + vegetable sabzi + 1 cup fresh curd.',
    proteinEstimate: '15-20g Protein',
    isImportant: false
  },
  {
    id: 'office-snack-1',
    timeWindow: '~7:00 – 7:15 PM (Office Shift)',
    mealName: 'Office Snack #1',
    foodDescription: 'Roasted chana, peanuts, fresh fruit, or a boiled egg.',
    proteinEstimate: '8-12g Protein',
    isImportant: false
  },
  {
    id: 'dinner',
    timeWindow: '~8:30 – 9:00 PM (Office Shift)',
    mealName: 'Main Dinner Meal',
    foodDescription: 'Roti or rice + chicken / fish / paneer / thick dal + green vegetables.',
    proteinEstimate: '22-28g Protein',
    isImportant: true
  },
  {
    id: 'office-snack-2',
    timeWindow: '~11:30 PM – 12:00 AM',
    mealName: 'Late Shift Fuel',
    foodDescription: 'Handful of roasted chana, nuts, or a cup of curd.',
    proteinEstimate: '6-10g Protein',
    isImportant: false
  },
  {
    id: 'bedtime',
    timeWindow: '~3:30 – 4:00 AM (Before Bed)',
    mealName: 'Bedtime Sustained Protein',
    foodDescription: '1 glass warm milk or fresh curd (light, gentle digestion, casein protein).',
    proteinEstimate: '8-10g Protein',
    isImportant: false
  }
];

export const PROTEIN_FOOD_SOURCES: ProteinFoodSource[] = [
  { id: 'eggs-2', name: 'Whole Eggs (2 large)', protein: 12, unit: '2 eggs', category: 'eggs' },
  { id: 'eggs-3', name: 'Whole Eggs (3 large)', protein: 18, unit: '3 eggs', category: 'eggs' },
  { id: 'chicken-100', name: 'Chicken Breast (cooked)', protein: 30, unit: '100g', category: 'poultry' },
  { id: 'fish-100', name: 'Fish Fillet', protein: 24, unit: '100g', category: 'fish' },
  { id: 'paneer-100', name: 'Paneer (Cottage Cheese)', protein: 18, unit: '100g', category: 'dairy' },
  { id: 'curd-cup', name: 'Fresh Curd / Dahi', protein: 8, unit: '1 medium cup', category: 'dairy' },
  { id: 'milk-glass', name: 'Milk', protein: 8, unit: '1 glass (250ml)', category: 'dairy' },
  { id: 'dal-bowl', name: 'Cooked Dal / Lentils', protein: 9, unit: '1 thick bowl', category: 'plant' },
  { id: 'chana-roasted', name: 'Roasted Chana', protein: 10, unit: '1 small bowl (50g)', category: 'plant' },
  { id: 'rajma-chana-cooked', name: 'Soaked & Boiled Rajma / Chana', protein: 15, unit: '1 cup cooked', category: 'plant' },
  { id: 'whey-scoop', name: 'Whey Protein (optional)', protein: 24, unit: '1 scoop', category: 'dairy' }
];

export const TRUSTED_CHANNELS = [
  {
    name: 'ATHLEAN-X',
    focus: 'Detailed biomechanics, form corrections, and injury-prevention cues.',
    url: 'https://www.youtube.com/results?search_query=athlean+x+pushup+squat+form',
    avatarText: 'AX'
  },
  {
    name: 'Calisthenicmovement',
    focus: 'Strict calisthenics technique, beginner-to-advanced bodyweight progressions.',
    url: 'https://www.youtube.com/results?search_query=calisthenicmovement+beginner+pullups+pushups',
    avatarText: 'CM'
  },
  {
    name: 'FitnessBlender',
    focus: 'Simple, approachable no-equipment follow-along routines and warm-ups.',
    url: 'https://www.youtube.com/results?search_query=fitnessblender+bodyweight+beginner',
    avatarText: 'FB'
  }
];
