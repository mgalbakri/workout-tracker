import React, { useState, useEffect } from 'react';

// BB Logo Component - SVG recreation of the original logo
const BBLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" stroke="#A9A590" strokeWidth="3" fill="none"/>
    <circle cx="100" cy="100" r="85" stroke="#A9A590" strokeWidth="2" fill="none"/>
    <rect x="94" y="55" width="12" height="95" fill="#A9A590"/>
    <path d="M100 50 L80 72 L90 65 L100 55 L110 65 L120 72 Z" fill="#A9A590"/>
    <path d="M100 42 L68 68 L80 72 L100 50 L120 72 L132 68 Z" fill="#A9A590"/>
    <path d="M100 35 L55 65 L68 68 L100 42 L132 68 L145 65 Z" fill="#A9A590"/>
    <path d="M28 65 L28 145 L58 145 Q75 145 75 128 Q75 118 63 113 Q75 108 75 95 Q75 78 58 78 L42 78 L42 65 Z" fill="#A9A590"/>
    <path d="M42 88 L52 88 Q58 88 58 96 Q58 104 52 104 L42 104 Z" fill="#0D0D0D"/>
    <path d="M42 114 L52 114 Q60 114 60 124 Q60 135 52 135 L42 135 Z" fill="#0D0D0D"/>
    <path d="M172 65 L172 145 L142 145 Q125 145 125 128 Q125 118 137 113 Q125 108 125 95 Q125 78 142 78 L158 78 L158 65 Z" fill="#A9A590"/>
    <path d="M158 88 L148 88 Q142 88 142 96 Q142 104 148 104 L158 104 Z" fill="#0D0D0D"/>
    <path d="M158 114 L148 114 Q140 114 140 124 Q140 135 148 135 L158 135 Z" fill="#0D0D0D"/>
    <path d="M70 148 Q70 168 100 172 Q130 168 130 148" stroke="#A9A590" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <path d="M58 158 L76 145" stroke="#A9A590" strokeWidth="6" strokeLinecap="round"/>
    <path d="M142 158 L124 145" stroke="#A9A590" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

// Utility functions
const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getMonday = (d) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

// Program Data
const PROGRAM = {
  1: {
    name: "Strength",
    identity: "Force Production",
    color: "#C9A227",
    warmup: [
      "Cat-Camel × 10",
      "90/90 Hip Switches × 12/side",
      "Ankle Wall Mobilization × 12/side",
      "Glute Bridge × 12",
      "Hip CARs × 5/side",
      "Scapular Pull-Ups × 6-8",
      "3 nasal breaths"
    ],
    cardio: { name: "Treadmill Incline Walk", duration: "12-16 min", zone: "2-3" },
    exercises: [
      { name: "Belt Squat / Landmine Hack Squat", sets: 4, reps: "6-8", category: "primary" },
      { name: "Leg Extension Machine", sets: 3, reps: "10-12", category: "secondary" },
      { name: "Chest-Supported Row Machine", sets: 4, reps: "6-8", category: "upper" },
      { name: "Machine Chest Press", sets: 4, reps: "6-8", category: "upper" },
      { name: "Trap Bar Deadlift", sets: 3, reps: "6-8", category: "hinge" },
      { name: "Lat Pulldown", sets: 5, reps: "5", category: "addon", note: "RPE 7-7.5" },
    ],
    skill: "Footwork ladder simulation — 3-5 min",
    core: { name: "Cable Pallof Press", sets: "2-3", reps: "10/side" },
    finisher: "Bike intervals — 10s fast / 50s easy × 6",
    cooldown: ["Quad stretch 30s/side", "Glute stretch 30s/side", "Hamstring stretch 30s/side"]
  },
  2: {
    name: "Speed",
    identity: "Speed & Coordination",
    color: "#8B0000",
    warmup: [
      "Cat-Camel × 10",
      "90/90 Hip Switches × 12/side",
      "Ankle Wall Mobilization × 12/side",
      "Glute Bridge × 12",
      "Hip CARs × 5/side",
      "Scapular Pull-Ups × 6-8",
      "3 nasal breaths"
    ],
    cardio: { name: "Rowing (upright)", duration: "12-16 min", zone: "2" },
    exercises: [
      { name: "Med Ball Rotational Throw", sets: 4, reps: "5/side", category: "athletic" },
      { name: "Landmine Press / Machine Shoulder Press", sets: 4, reps: "6-8", category: "upper" },
      { name: "Lat Pulldown Machine", sets: 3, reps: "8-10", category: "pull" },
      { name: "Hip Abductor Machine", sets: "2-3", reps: "15-20", category: "stability" },
      { name: "Landmine Push-Press", sets: 2, reps: "5", category: "power", note: "light, clean form" },
    ],
    athletic: ["Skater step-overs 20s", "Fast feet 20s", "Lateral bounds 20s"],
    core: { name: "Dead Bug", sets: "2-3", reps: "6/side" },
    finisher: "Wall Ball Chest Pass — 20s on / 40s off × 5",
    cooldown: ["Quad stretch 30s/side", "Glute stretch 30s/side", "Hamstring stretch 30s/side"]
  },
  3: {
    name: "Hypertrophy",
    identity: "Structural Balance",
    color: "#4A5568",
    warmup: [
      "Cat-Camel × 10",
      "90/90 Hip Switches × 12/side",
      "Ankle Wall Mobilization × 12/side",
      "Glute Bridge × 12",
      "Hip CARs × 5/side",
      "Scapular Pull-Ups × 6-8",
      "3 nasal breaths"
    ],
    cardio: { name: "Spin Bike", duration: "12-16 min", zone: "2" },
    exercises: [
      { name: "Leg Press Machine", sets: 4, reps: "6-8", category: "primary", note: "alt: DB Step-Up" },
      { name: "Seated Hamstring Curl", sets: 3, reps: "10-12", category: "secondary" },
      { name: "Machine Shoulder Press", sets: 3, reps: "10-12", category: "upper" },
      { name: "Seated Cable Row", sets: 3, reps: "10-12", category: "upper" },
      { name: "Pec Deck Machine", sets: 2, reps: "12-15", category: "optional" },
      { name: "Cable Face Pulls", sets: 2, reps: "15-20", category: "longevity" },
      { name: "Cable Tricep Extensions", sets: 2, reps: "12-15", category: "longevity" },
    ],
    core: { name: "Farmer Carry", sets: "2-3", reps: "30-45 sec", note: "moderate load" },
    finisher: "Row Power 10s — every minute × 5-6",
    cooldown: ["Quad stretch 30s/side", "Glute stretch 30s/side", "Hamstring stretch 30s/side"]
  },
  4: {
    name: "Conditioning",
    identity: "Work Capacity",
    color: "#C9A227",
    warmup: [
      "Cat-Camel × 10",
      "90/90 Hip Switches × 12/side",
      "Ankle Wall Mobilization × 12/side",
      "Glute Bridge × 12",
      "Hip CARs × 5/side",
      "Scapular Pull-Ups × 6-8",
      "3 nasal breaths"
    ],
    cardio: { name: "Bike / Rower / Treadmill", duration: "12-16 min", zone: "2" },
    exercises: [
      { name: "Landmine Squat", sets: 4, reps: "6-8", category: "primary", note: "light-moderate" },
      { name: "Machine Chest Press / DB Incline", sets: 3, reps: "8-10", category: "upper" },
      { name: "Chest-Supported Row Machine", sets: 3, reps: "10-12", category: "pull" },
      { name: "Hip Adductor Machine", sets: 2, reps: "12-15", category: "stability" },
      { name: "Plate Pinches", sets: 2, reps: "30 sec", category: "grip" },
      { name: "Band External Rotations", sets: 2, reps: "12-15", category: "shoulder" },
      { name: "Neck Curls/Extensions", sets: 2, reps: "12-15", category: "neck" },
    ],
    athletic: ["Heavy Ball Carry 20-30m", "Lateral Band Walks 20 steps", "Step-Over + Reach 10/side"],
    core: { name: "Landmine Anti-Rotation Press", sets: "2-3", reps: "10/side" },
    finisher: "Skater Step-Overs — 20s work / 20s rest × 6",
    cooldown: ["Quad stretch 30s/side", "Glute stretch 30s/side", "Hamstring stretch 30s/side"]
  },
  5: {
    name: "Zone 2",
    identity: "Aerobic Base",
    color: "#8B0000",
    warmup: [
      "Cat-Camel × 10",
      "90/90 Hip Switches × 12/side",
      "Hip CARs × 5/side",
      "3 nasal breaths"
    ],
    cardio: { name: "Zone 2 Cardio (Row/Bike/Walk)", duration: "30-45 min", zone: "2", hr: "128-135 bpm" },
    exercises: [],
    core: { name: "Plank Hold", sets: "2", reps: "30-60 sec" },
    cooldown: ["Full body stretch routine 5-10 min"]
  }
};

const MUSCLE_GROUPS = ["Quads", "Hamstrings", "Glutes", "Lower Back", "Upper Back", "Chest", "Shoulders", "Arms"];

const BENCHMARKS = [
  { id: "5k_row", name: "5K Row", unit: "time", target: "35:00", description: "All-out effort" },
  { id: "2k_row", name: "2K Row", unit: "time", description: "Max effort" },
  { id: "10min_row", name: "10-Min Row", unit: "meters", description: "Max distance" },
  { id: "dead_hang", name: "Dead Hang", unit: "seconds", description: "Max time" },
  { id: "farmer_carry", name: "Farmer Carry (60s)", unit: "meters", description: "Fixed weight, max distance" },
  { id: "trap_bar_dl", name: "Trap Bar Deadlift", unit: "kg", description: "5RM @ RPE 8" },
  { id: "pull_ups", name: "Pull-Ups", unit: "reps", description: "Max reps" },
  { id: "plank", name: "Plank Hold", unit: "seconds", description: "Max time, good form" },
];

// Art Deco Checkbox
const Checkbox = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`w-6 h-6 border-2 flex items-center justify-center transition-all duration-200 ${
      checked 
        ? 'bg-gold border-gold' 
        : 'border-gold/50 hover:border-gold'
    }`}
    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
  >
    {checked && (
      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )}
  </button>
);

// Art Deco Divider
const DecoDivider = () => (
  <div className="flex items-center gap-3 my-4">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    <div className="w-2 h-2 rotate-45 border border-gold/50" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
  </div>
);

// Main App Component
export default function LongevityTracker() {
  const [activeTab, setActiveTab] = useState('log');
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [workouts, setWorkouts] = useState({});
  const [biometrics, setBiometrics] = useState({});
  const [benchmarks, setBenchmarks] = useState({});
  const [todayBiometrics, setTodayBiometrics] = useState({
    weight: '',
    sleepQuality: 3,
    energy: 3,
    stress: 3,
    soreness: {}
  });
  const [exerciseData, setExerciseData] = useState({});
  const [completedSections, setCompletedSections] = useState({
    warmup: false,
    cardio: false,
    core: false,
    finisher: false,
    cooldown: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [workoutData, bioData, benchData] = await Promise.all([
        safeStorageGet('workouts'),
        safeStorageGet('biometrics'),
        safeStorageGet('benchmarks')
      ]);
      if (workoutData) setWorkouts(JSON.parse(workoutData.value));
      if (bioData) setBiometrics(JSON.parse(bioData.value));
      if (benchData) setBenchmarks(JSON.parse(benchData.value));
    } catch (e) {
      console.log('Loading fresh state');
    }
    setIsLoading(false);
  };

  const safeStorageGet = async (key) => {
    try { return await window.storage.get(key); } 
    catch { return null; }
  };

  const saveWorkouts = async (data) => {
    try { await window.storage.set('workouts', JSON.stringify(data)); } 
    catch (e) { console.error('Save failed:', e); }
  };

  const saveBiometrics = async (data) => {
    try { await window.storage.set('biometrics', JSON.stringify(data)); } 
    catch (e) { console.error('Save failed:', e); }
  };

  const saveBenchmarks = async (data) => {
    try { await window.storage.set('benchmarks', JSON.stringify(data)); } 
    catch (e) { console.error('Save failed:', e); }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const calculateReadiness = (bio) => {
    if (!bio || (!bio.sleepQuality && !bio.energy && !bio.stress)) return null;
    const sleep = (bio.sleepQuality || 3) * 20;
    const energy = (bio.energy || 3) * 20;
    const stress = ((6 - (bio.stress || 3))) * 20;
    const sorenessValues = Object.values(bio.soreness || {});
    const avgSoreness = sorenessValues.length > 0 
      ? sorenessValues.reduce((a, b) => a + b, 0) / sorenessValues.length : 3;
    const sorenessScore = ((6 - avgSoreness)) * 20;
    const score = Math.round((sleep * 0.35) + (sorenessScore * 0.25) + (energy * 0.20) + (stress * 0.20));
    return Math.min(100, Math.max(0, score));
  };

  const getReadinessGuidance = (score) => {
    if (score >= 80) return { text: "FULL SEND", color: "#C9A227" };
    if (score >= 60) return { text: "STAY CONSERVATIVE", color: "#C9A227" };
    if (score >= 40) return { text: "REDUCE 15-20%", color: "#8B0000" };
    return { text: "CONSIDER REST", color: "#8B0000" };
  };

  const isDeloadWeek = () => getWeekNumber(new Date()) % 5 === 0;

  const handleSaveWorkout = async () => {
    const workoutKey = selectedDate;
    const newWorkout = {
      day: selectedDay,
      date: selectedDate,
      exercises: exerciseData,
      sections: completedSections,
      readiness: calculateReadiness(todayBiometrics)
    };
    const updated = { ...workouts, [workoutKey]: newWorkout };
    setWorkouts(updated);
    await saveWorkouts(updated);
    setExerciseData({});
    setCompletedSections({ warmup: false, cardio: false, core: false, finisher: false, cooldown: false });
    showToast("WORKOUT LOGGED");
  };

  const handleSaveBiometrics = async () => {
    const bioKey = selectedDate;
    const updated = { ...biometrics, [bioKey]: { ...todayBiometrics, date: selectedDate } };
    setBiometrics(updated);
    await saveBiometrics(updated);
    showToast("BIOMETRICS SAVED");
  };

  const handleSaveBenchmark = async (benchmarkId, value) => {
    const entry = { value, date: selectedDate };
    const existingBenchmark = benchmarks[benchmarkId] || [];
    const updated = { ...benchmarks, [benchmarkId]: [...existingBenchmark, entry] };
    setBenchmarks(updated);
    await saveBenchmarks(updated);
    showToast("BENCHMARK RECORDED");
  };

  const getWeeklyCompletion = () => {
    const weeks = [];
    const today = new Date();
    for (let w = 5; w >= 0; w--) {
      const weekStart = getMonday(new Date(today.getTime() - w * 7 * 24 * 60 * 60 * 1000));
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(weekStart.getTime() + d * 24 * 60 * 60 * 1000);
        const dateKey = date.toISOString().split('T')[0];
        const workout = workouts[dateKey];
        weekDays.push({ date: dateKey, completed: !!workout, day: workout?.day });
      }
      weeks.push({ weekStart: formatDate(weekStart), days: weekDays, completedCount: weekDays.filter(d => d.completed).length });
    }
    return weeks;
  };

  const getWeeklySummary = () => {
    const weekStart = getMonday(new Date());
    const summary = { totalWorkouts: 0, daysCompleted: [], volume: {} };
    for (let d = 0; d < 7; d++) {
      const date = new Date(weekStart.getTime() + d * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split('T')[0];
      const workout = workouts[dateKey];
      if (workout) {
        summary.totalWorkouts++;
        summary.daysCompleted.push(workout.day);
      }
    }
    return summary;
  };

  const program = PROGRAM[selectedDay];
  const readinessScore = calculateReadiness(todayBiometrics);
  const readinessGuidance = readinessScore ? getReadinessGuidance(readinessScore) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center">
        <BBLogo size={60} className="text-gold animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir text-cream font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Crimson+Pro:wght@400;500;600&display=swap');
        
        :root {
          --noir: #0D0D0D;
          --noir-light: #1A1A1A;
          --noir-lighter: #252525;
          --gold: #C9A227;
          --gold-dim: #8B7355;
          --crimson: #8B0000;
          --cream: #E8E4D9;
          --cream-dim: #A9A590;
        }
        
        .bg-noir { background-color: var(--noir); }
        .bg-noir-light { background-color: var(--noir-light); }
        .bg-noir-lighter { background-color: var(--noir-lighter); }
        .bg-gold { background-color: var(--gold); }
        .bg-crimson { background-color: var(--crimson); }
        .text-gold { color: var(--gold); }
        .text-gold-dim { color: var(--gold-dim); }
        .text-cream { color: var(--cream); }
        .text-cream-dim { color: var(--cream-dim); }
        .text-crimson { color: var(--crimson); }
        .border-gold { border-color: var(--gold); }
        .border-noir-lighter { border-color: var(--noir-lighter); }
        
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body { font-family: 'Crimson Pro', serif; }
        
        .deco-card {
          background: linear-gradient(135deg, var(--noir-light) 0%, var(--noir) 100%);
          border: 1px solid var(--noir-lighter);
          position: relative;
        }
        
        .deco-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        
        .deco-input {
          background: var(--noir);
          border: 1px solid var(--noir-lighter);
          color: var(--cream);
          transition: all 0.2s ease;
        }
        
        .deco-input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 1px var(--gold);
        }
        
        .deco-input::placeholder {
          color: var(--cream-dim);
          opacity: 0.5;
        }
        
        .deco-btn {
          background: linear-gradient(135deg, var(--gold) 0%, #A8861F 100%);
          color: var(--noir);
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.1em;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .deco-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .deco-btn:hover::before {
          left: 100%;
        }
        
        .deco-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(201, 162, 39, 0.3);
        }
        
        .tab-active {
          color: var(--gold);
          position: relative;
        }
        
        .tab-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--gold);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
          width: 100%;
        }
        
        input[type="range"]::-webkit-slider-track {
          background: var(--noir-lighter);
          height: 4px;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: var(--gold);
          margin-top: -6px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        input[type="range"]::-moz-range-track {
          background: var(--noir-lighter);
          height: 4px;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: var(--gold);
          border: none;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .geometric-border {
          clip-path: polygon(
            0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px,
            100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px)
          );
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .toast-animate {
          animation: fadeIn 0.3s ease;
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 toast-animate">
          <div className="bg-gold text-noir px-6 py-3 font-display text-lg tracking-wider">
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-noir-lighter">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BBLogo size={48} className="text-gold" />
              <div>
                <h1 className="font-display text-2xl tracking-wider text-gold">LONGEVITY</h1>
                <p className="text-xs text-cream-dim tracking-widest">TRAINING PROTOCOL</p>
              </div>
            </div>
            {isDeloadWeek() && (
              <div className="border border-crimson px-3 py-1">
                <span className="font-display text-crimson tracking-wider">DELOAD</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-noir-lighter bg-noir-light sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 flex justify-center gap-8">
          {[
            { id: 'log', label: 'LOG' },
            { id: 'dashboard', label: 'DASHBOARD' },
            { id: 'biometrics', label: 'BIOMETRICS' },
            { id: 'benchmarks', label: 'BENCHMARKS' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 font-display text-sm tracking-widest transition-colors ${
                activeTab === tab.id ? 'tab-active' : 'text-cream-dim hover:text-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-4 pb-20">
        
        {/* LOG TAB */}
        {activeTab === 'log' && (
          <div className="space-y-6">
            {/* Date & Day Selection */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div>
                <label className="font-display text-xs tracking-widest text-cream-dim block mb-2">DATE</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="deco-input px-4 py-2 font-body"
                />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`w-14 h-14 font-display text-lg tracking-wider transition-all geometric-border ${
                      selectedDay === d 
                        ? 'bg-gold text-noir' 
                        : 'bg-noir-light text-cream-dim hover:text-cream hover:border-gold border border-noir-lighter'
                    }`}
                  >
                    {d === 5 ? 'Z2' : `D${d}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Header */}
            <div className="deco-card p-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 flex items-center justify-center geometric-border"
                  style={{ backgroundColor: program.color }}
                >
                  <span className="font-display text-2xl text-noir">{selectedDay}</span>
                </div>
                <div>
                  <h2 className="font-display text-3xl tracking-wider text-cream">{program.name.toUpperCase()}</h2>
                  <p className="text-cream-dim tracking-widest text-sm">{program.identity}</p>
                </div>
              </div>
            </div>

            {/* Readiness Score */}
            {readinessScore && (
              <div className="deco-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs tracking-widest text-cream-dim mb-1">READINESS</p>
                    <p className="font-display text-5xl" style={{ color: readinessGuidance.color }}>
                      {readinessScore}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display tracking-widest" style={{ color: readinessGuidance.color }}>
                      {readinessGuidance.text}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <DecoDivider />

            {/* Sections */}
            <div className="space-y-4">
              {/* Warm-up */}
              <div className="deco-card p-4">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={completedSections.warmup} 
                    onChange={(v) => setCompletedSections({...completedSections, warmup: v})}
                  />
                  <div className="flex-1">
                    <span className="font-display text-lg tracking-wider text-cream">WARM-UP</span>
                    <span className="text-cream-dim text-sm ml-2">7 movements</span>
                  </div>
                </div>
                {!completedSections.warmup && (
                  <ul className="mt-4 ml-10 space-y-1">
                    {program.warmup.map((item, i) => (
                      <li key={i} className="text-cream-dim text-sm">› {item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cardio */}
              <div className="deco-card p-4">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={completedSections.cardio} 
                    onChange={(v) => setCompletedSections({...completedSections, cardio: v})}
                  />
                  <div className="flex-1">
                    <span className="font-display text-lg tracking-wider text-cream">{program.cardio.name.toUpperCase()}</span>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 border border-noir-lighter text-cream-dim">
                        {program.cardio.duration}
                      </span>
                      <span className="text-xs px-2 py-0.5 border border-noir-lighter text-cream-dim">
                        Z{program.cardio.zone}
                      </span>
                      {program.cardio.hr && (
                        <span className="text-xs px-2 py-0.5 border border-crimson text-crimson">
                          {program.cardio.hr}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercises */}
              {program.exercises.length > 0 && (
                <div className="deco-card p-4">
                  <h3 className="font-display text-sm tracking-widest text-gold mb-4">WORKING SETS</h3>
                  <div className="space-y-4">
                    {program.exercises.map((ex, i) => (
                      <div key={i} className="border-b border-noir-lighter pb-4 last:border-0 last:pb-0">
                        <div className="mb-3">
                          <p className="text-cream font-medium">{ex.name}</p>
                          <p className="text-cream-dim text-sm">
                            {ex.sets} × {ex.reps}
                            {ex.note && <span className="text-gold ml-2">• {ex.note}</span>}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div>
                            <label className="font-display text-xs tracking-wider text-cream-dim block mb-1">WT</label>
                            <input
                              type="number"
                              placeholder="kg"
                              value={exerciseData[ex.name]?.weight || ''}
                              onChange={(e) => setExerciseData({
                                ...exerciseData,
                                [ex.name]: { ...exerciseData[ex.name], weight: e.target.value }
                              })}
                              className="deco-input w-20 px-3 py-2 text-sm font-body"
                            />
                          </div>
                          <div>
                            <label className="font-display text-xs tracking-wider text-cream-dim block mb-1">REPS</label>
                            <input
                              type="number"
                              placeholder="#"
                              value={exerciseData[ex.name]?.reps || ''}
                              onChange={(e) => setExerciseData({
                                ...exerciseData,
                                [ex.name]: { ...exerciseData[ex.name], reps: e.target.value }
                              })}
                              className="deco-input w-20 px-3 py-2 text-sm font-body"
                            />
                          </div>
                          <div>
                            <label className="font-display text-xs tracking-wider text-cream-dim block mb-1">RPE</label>
                            <select
                              value={exerciseData[ex.name]?.rpe || ''}
                              onChange={(e) => setExerciseData({
                                ...exerciseData,
                                [ex.name]: { ...exerciseData[ex.name], rpe: e.target.value }
                              })}
                              className="deco-input w-16 px-2 py-2 text-sm"
                            >
                              <option value="">-</option>
                              {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(v => (
                                <option key={v} value={v}>{v}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Athletic Block */}
              {program.athletic && (
                <div className="deco-card p-4">
                  <h3 className="font-display text-sm tracking-widest text-gold mb-3">ATHLETIC BLOCK</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.athletic.map((item, i) => (
                      <span key={i} className="text-sm px-3 py-1.5 border border-noir-lighter text-cream-dim">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Core */}
              {program.core && (
                <div className="deco-card p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      checked={completedSections.core} 
                      onChange={(v) => setCompletedSections({...completedSections, core: v})}
                    />
                    <div>
                      <span className="font-display text-lg tracking-wider text-cream">{program.core.name.toUpperCase()}</span>
                      <span className="text-cream-dim text-sm ml-2">
                        {program.core.sets} × {program.core.reps}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Finisher */}
              {program.finisher && (
                <div className="deco-card p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox 
                      checked={completedSections.finisher} 
                      onChange={(v) => setCompletedSections({...completedSections, finisher: v})}
                    />
                    <div>
                      <span className="font-display text-lg tracking-wider text-cream">FINISHER</span>
                      <p className="text-cream-dim text-sm mt-0.5">{program.finisher}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cooldown */}
              <div className="deco-card p-4">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={completedSections.cooldown} 
                    onChange={(v) => setCompletedSections({...completedSections, cooldown: v})}
                  />
                  <div className="flex-1">
                    <span className="font-display text-lg tracking-wider text-cream">COOLDOWN</span>
                    <span className="text-cream-dim text-sm ml-2">{program.cooldown.length} stretches</span>
                  </div>
                </div>
                {!completedSections.cooldown && (
                  <ul className="mt-4 ml-10 space-y-1">
                    {program.cooldown.map((item, i) => (
                      <li key={i} className="text-cream-dim text-sm">› {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <DecoDivider />

            {/* Save Button */}
            <button onClick={handleSaveWorkout} className="deco-btn w-full py-4 text-xl tracking-widest">
              SAVE WORKOUT
            </button>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div className="deco-card p-6">
              <h3 className="font-display text-sm tracking-widest text-gold mb-4">THIS WEEK</h3>
              {(() => {
                const summary = getWeeklySummary();
                return (
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gold flex items-center justify-center geometric-border">
                      <span className="font-display text-4xl text-noir">{summary.totalWorkouts}</span>
                    </div>
                    <div>
                      <p className="text-cream-dim">sessions completed</p>
                      {summary.daysCompleted.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {summary.daysCompleted.map((d, i) => (
                            <span 
                              key={i}
                              className="w-8 h-8 flex items-center justify-center font-display text-sm geometric-border"
                              style={{ backgroundColor: PROGRAM[d]?.color, color: '#0D0D0D' }}
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 6 Week History */}
            <div className="deco-card p-6">
              <h3 className="font-display text-sm tracking-widest text-gold mb-4">LAST 6 WEEKS</h3>
              <div className="space-y-3">
                {getWeeklyCompletion().map((week, wi) => (
                  <div key={wi} className="flex items-center gap-3">
                    <span className="font-display text-xs text-cream-dim w-14">{week.weekStart}</span>
                    <div className="flex gap-1 flex-1">
                      {week.days.map((day, di) => (
                        <div
                          key={di}
                          className={`w-8 h-8 flex items-center justify-center font-display text-xs ${
                            day.completed ? 'text-noir' : 'bg-noir-lighter text-cream-dim'
                          }`}
                          style={day.completed ? { backgroundColor: PROGRAM[day.day]?.color } : {}}
                        >
                          {day.completed ? day.day : '·'}
                        </div>
                      ))}
                    </div>
                    <span className={`font-display text-sm w-6 text-right ${
                      week.completedCount >= 4 ? 'text-gold' : 'text-cream-dim'
                    }`}>
                      {week.completedCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Workouts */}
            <div className="deco-card p-6">
              <h3 className="font-display text-sm tracking-widest text-gold mb-4">RECENT</h3>
              <div className="space-y-2">
                {Object.entries(workouts)
                  .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                  .slice(0, 8)
                  .map(([date, workout]) => (
                    <div key={date} className="flex items-center justify-between py-2 border-b border-noir-lighter last:border-0">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-8 h-8 flex items-center justify-center font-display text-sm"
                          style={{ backgroundColor: PROGRAM[workout.day]?.color, color: '#0D0D0D' }}
                        >
                          {workout.day}
                        </span>
                        <span className="text-cream">{PROGRAM[workout.day]?.name}</span>
                      </div>
                      <span className="text-cream-dim text-sm font-display">{formatDate(date)}</span>
                    </div>
                  ))}
                {Object.keys(workouts).length === 0 && (
                  <p className="text-cream-dim text-center py-4">No workouts logged</p>
                )}
              </div>
            </div>

            {/* Exercise Progress */}
            <div className="deco-card p-6">
              <h3 className="font-display text-sm tracking-widest text-gold mb-4">PROGRESS</h3>
              <div className="space-y-3">
                {["Belt Squat / Landmine Hack Squat", "Chest-Supported Row Machine", "Machine Chest Press", "Trap Bar Deadlift", "Lat Pulldown"].map(exercise => {
                  const history = Object.entries(workouts)
                    .filter(([_, w]) => w.exercises?.[exercise]?.weight)
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                    .slice(-5);
                  if (history.length === 0) return null;
                  const latest = history[history.length - 1];
                  const first = history[0];
                  const change = parseFloat(latest[1].exercises[exercise].weight) - parseFloat(first[1].exercises[exercise].weight);
                  return (
                    <div key={exercise} className="flex justify-between items-center py-2 border-b border-noir-lighter last:border-0">
                      <span className="text-cream-dim text-sm">{exercise.split('/')[0].trim()}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-cream">{latest[1].exercises[exercise].weight} kg</span>
                        {change !== 0 && (
                          <span className={`font-display text-xs px-1.5 py-0.5 ${
                            change > 0 ? 'bg-gold/20 text-gold' : 'bg-crimson/20 text-crimson'
                          }`}>
                            {change > 0 ? '+' : ''}{change}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* BIOMETRICS TAB */}
        {activeTab === 'biometrics' && (
          <div className="space-y-6">
            <div className="deco-card p-6 space-y-6">
              <h3 className="font-display text-sm tracking-widest text-gold">LOG BIOMETRICS</h3>
              
              {/* Weight */}
              <div>
                <label className="font-display text-xs tracking-widest text-cream-dim block mb-2">BODY WEIGHT</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={todayBiometrics.weight}
                    onChange={(e) => setTodayBiometrics({...todayBiometrics, weight: e.target.value})}
                    className="deco-input w-28 px-4 py-3 text-xl font-display"
                    placeholder="82"
                  />
                  <span className="text-cream-dim font-display">KG</span>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-display text-xs tracking-widest text-cream-dim">SLEEP QUALITY</label>
                    <span className="font-display text-gold">{todayBiometrics.sleepQuality}</span>
                  </div>
                  <input
                    type="range" min="1" max="5"
                    value={todayBiometrics.sleepQuality}
                    onChange={(e) => setTodayBiometrics({...todayBiometrics, sleepQuality: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-display text-xs tracking-widest text-cream-dim">ENERGY</label>
                    <span className="font-display text-gold">{todayBiometrics.energy}</span>
                  </div>
                  <input
                    type="range" min="1" max="5"
                    value={todayBiometrics.energy}
                    onChange={(e) => setTodayBiometrics({...todayBiometrics, energy: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-display text-xs tracking-widest text-cream-dim">STRESS</label>
                    <span className="font-display text-gold">{todayBiometrics.stress}</span>
                  </div>
                  <input
                    type="range" min="1" max="5"
                    value={todayBiometrics.stress}
                    onChange={(e) => setTodayBiometrics({...todayBiometrics, stress: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              {/* Soreness */}
              <div>
                <label className="font-display text-xs tracking-widest text-cream-dim block mb-3">SORENESS</label>
                <div className="grid grid-cols-4 gap-2">
                  {MUSCLE_GROUPS.map(muscle => (
                    <div key={muscle} className="text-center">
                      <label className="text-xs text-cream-dim block mb-1">{muscle}</label>
                      <select
                        value={todayBiometrics.soreness[muscle] || ''}
                        onChange={(e) => setTodayBiometrics({
                          ...todayBiometrics,
                          soreness: { ...todayBiometrics.soreness, [muscle]: parseInt(e.target.value) || '' }
                        })}
                        className="deco-input w-full px-2 py-2 text-sm text-center"
                      >
                        <option value="">-</option>
                        {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleSaveBiometrics} className="deco-btn w-full py-3 tracking-widest">
                SAVE
              </button>
            </div>

            {/* Readiness Display */}
            {readinessScore && (
              <div className="deco-card p-8 text-center">
                <p className="font-display text-xs tracking-widest text-cream-dim mb-2">READINESS SCORE</p>
                <p className="font-display text-7xl" style={{ color: readinessGuidance.color }}>
                  {readinessScore}
                </p>
                <p className="font-display tracking-widest mt-2" style={{ color: readinessGuidance.color }}>
                  {readinessGuidance.text}
                </p>
              </div>
            )}

            {/* Weight History */}
            <div className="deco-card p-6">
              <h3 className="font-display text-sm tracking-widest text-gold mb-4">WEIGHT HISTORY</h3>
              <div className="space-y-2">
                {Object.entries(biometrics)
                  .filter(([_, b]) => b.weight)
                  .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                  .slice(0, 8)
                  .map(([date, bio]) => (
                    <div key={date} className="flex justify-between py-2 border-b border-noir-lighter last:border-0">
                      <span className="text-cream-dim font-display text-sm">{formatDate(date)}</span>
                      <span className="font-display text-cream">{bio.weight} kg</span>
                    </div>
                  ))}
                {Object.entries(biometrics).filter(([_, b]) => b.weight).length === 0 && (
                  <p className="text-cream-dim text-center py-4">No data logged</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BENCHMARKS TAB */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <div className="deco-card p-4 flex items-center gap-3">
              <div className="w-6 h-6 border border-gold flex items-center justify-center">
                <span className="text-gold font-display">!</span>
              </div>
              <p className="text-cream-dim text-sm">
                Run benchmarks <span className="text-gold">last week of each month</span> (before deload)
              </p>
            </div>

            {BENCHMARKS.map(bench => {
              const history = benchmarks[bench.id] || [];
              const latest = history[history.length - 1];
              const [inputValue, setInputValue] = useState('');
              
              return (
                <div key={bench.id} className="deco-card p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-display text-lg tracking-wider text-cream">{bench.name.toUpperCase()}</h4>
                      <p className="text-cream-dim text-sm">{bench.description}</p>
                      {bench.target && (
                        <p className="text-gold text-sm font-display mt-1">TARGET: {bench.target}</p>
                      )}
                    </div>
                    {latest && (
                      <div className="text-right">
                        <p className="font-display text-3xl text-cream">{latest.value}</p>
                        <p className="text-cream-dim text-xs font-display">{formatDate(latest.date)}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={bench.unit}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="deco-input flex-1 px-4 py-2 font-display"
                    />
                    <button
                      onClick={() => {
                        if (inputValue) {
                          handleSaveBenchmark(bench.id, inputValue);
                          setInputValue('');
                        }
                      }}
                      className="deco-btn px-6 py-2 tracking-widest"
                    >
                      LOG
                    </button>
                  </div>
                  
                  {history.length > 1 && (
                    <div className="mt-4 pt-4 border-t border-noir-lighter">
                      <p className="font-display text-xs tracking-widest text-cream-dim mb-2">HISTORY</p>
                      <div className="flex gap-4 overflow-x-auto">
                        {history.slice(-6).map((entry, i) => (
                          <div key={i} className="text-center min-w-fit">
                            <p className="font-display text-cream">{entry.value}</p>
                            <p className="text-cream-dim text-xs">{formatDate(entry.date)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-noir-lighter py-6">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
          <BBLogo size={24} className="text-gold-dim" />
          <p className="font-display text-xs tracking-widest text-cream-dim">
            Z2: 128-135 BPM • DELOAD: WEEK 5 • AGE: 43
          </p>
        </div>
      </footer>
    </div>
  );
}
