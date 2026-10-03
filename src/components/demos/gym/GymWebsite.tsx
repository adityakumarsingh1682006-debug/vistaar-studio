import React, { useState } from 'react';
import { ASSETS } from '../../../assets/media';
import { DemoHeaderBar } from '../../common/DemoHeaderBar';
import {
  Flame,
  Dumbbell,
  Check,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  Shield,
  ArrowRight,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface Program {
  id: string;
  name: string;
  category: string;
  tagline: string;
  intensity: 'High' | 'Elite' | 'Moderate';
  description: string;
  highlights: string[];
}

const PROGRAMS: Program[] = [
  {
    id: 'strength',
    name: 'Barbell & Absolute Strength',
    category: 'Strength Training',
    tagline: 'Progressive overload, powerlifting mechanics, and raw power development.',
    intensity: 'Elite',
    description:
      'Engineered for lifters seeking measurable neuromuscular adaptation. Master the squat, bench press, deadlift, and overhead press under certified strength and conditioning coaches.',
    highlights: ['Eleiko competition barbells and calibrated plates', 'Customized 12-week periodized cycles', 'Bar velocity tracking and form video feedback'],
  },
  {
    id: 'personal',
    name: '1-on-1 Performance Mentorship',
    category: 'Personal Training',
    tagline: 'Dedicated biometrics, custom programming, and granular nutritional guidance.',
    intensity: 'High',
    description:
      'Private coaching tailored to your anatomical profile, injury history, and athletic ambitions. Includes continuous body composition DEXA analysis and mobility screening.',
    highlights: ['Weekly biofeedback check-ins', 'Custom macronutrient and supplementation plans', 'Private reserved rack space'],
  },
  {
    id: 'functional',
    name: 'Forge Functional Conditioning',
    category: 'Functional Training',
    tagline: 'High-power metabolic conditioning, kettlebells, and cardiovascular stamina.',
    intensity: 'High',
    description:
      'Hybrid training combining sled pushes, assault bikes, kettlebell complexes, and plyometrics. Build a resilient gas tank and athletic work capacity that carries over into real life.',
    highlights: ['Heart-rate zone monitored workouts', 'Turf sled lanes and Rogue Echo bikes', 'Team and partner competitive protocols'],
  },
  {
    id: 'conditioning',
    name: 'Metabolic Weight Loss & Shred',
    category: 'Weight Loss',
    tagline: 'High-density resistance circuits designed to preserve lean mass while shedding fat.',
    intensity: 'Moderate',
    description:
      'Targeted hypertrophy intervals that elevate post-exercise oxygen consumption (EPOC) for continuous caloric expenditure. Structured for longevity and joint health.',
    highlights: ['Low-impact, joint-friendly variations', 'Targeted energy expenditure benchmarks', 'Progressive conditioning logs'],
  },
  {
    id: 'mobility',
    name: 'Athletic Recovery & Mobility',
    category: 'Conditioning',
    tagline: 'Active joint decompression, tissue regeneration, and cold-plunge contrast.',
    intensity: 'Moderate',
    description:
      'Restore connective tissue elasticity, open tight hip flexors and thoracic spines, and accelerate central nervous system recovery between heavy training days.',
    highlights: ['Infrared dry saunas and 4°C cold plunges', 'Percussive therapy and compression boots', 'Guided breathwork protocols'],
  },
];

interface ScheduleClass {
  id: string;
  time: string;
  title: string;
  coach: string;
  spotsLeft: number;
  category: string;
}

const SCHEDULE: Record<string, ScheduleClass[]> = {
  Monday: [
    { id: 'm1', time: '06:00 - 07:00', title: 'Barbell Strength Protocol', coach: 'Marcus Vance', spotsLeft: 3, category: 'Strength' },
    { id: 'm2', time: '08:30 - 09:30', title: 'Forge Functional MetCon', coach: 'Sarah Sterling', spotsLeft: 5, category: 'Functional' },
    { id: 'm3', time: '12:00 - 13:00', title: 'Express Kettlebell Conditioning', coach: 'Devon Cruz', spotsLeft: 2, category: 'Conditioning' },
    { id: 'm4', time: '18:00 - 19:15', title: 'Heavy Compound Deadlifts & Rows', coach: 'Marcus Vance', spotsLeft: 1, category: 'Strength' },
  ],
  Wednesday: [
    { id: 'w1', time: '06:00 - 07:00', title: 'Athletic Speed & Agility Turf', coach: 'Sarah Sterling', spotsLeft: 4, category: 'Functional' },
    { id: 'w2', time: '09:00 - 10:15', title: 'Squat Biomechanics Clinic', coach: 'Devon Cruz', spotsLeft: 6, category: 'Strength' },
    { id: 'w3', time: '17:30 - 18:30', title: 'High-Intensity Shred Circuit', coach: 'Elena Rostova', spotsLeft: 2, category: 'Weight Loss' },
    { id: 'w4', time: '19:00 - 20:00', title: 'CNS Decompression & Recovery', coach: 'Sarah Sterling', spotsLeft: 8, category: 'Mobility' },
  ],
  Friday: [
    { id: 'f1', time: '06:30 - 07:45', title: 'Full-Body Friday Finisher', coach: 'Marcus Vance', spotsLeft: 2, category: 'Strength' },
    { id: 'f2', time: '12:00 - 13:00', title: 'MetCon Endurance Challenge', coach: 'Devon Cruz', spotsLeft: 5, category: 'Functional' },
    { id: 'f3', time: '17:00 - 18:00', title: 'Powerlifting Open Platform', coach: 'Marcus Vance', spotsLeft: 4, category: 'Strength' },
  ],
  Saturday: [
    { id: 's1', time: '08:00 - 09:30', title: 'Forge Community Team Battle', coach: 'All Coaches', spotsLeft: 6, category: 'Functional' },
    { id: 's2', time: '10:30 - 11:30', title: 'Olympic Weightlifting Fundamentals', coach: 'Devon Cruz', spotsLeft: 3, category: 'Strength' },
    { id: 's3', time: '13:00 - 14:15', title: 'Cold Plunge & Breath Mastery', coach: 'Sarah Sterling', spotsLeft: 5, category: 'Mobility' },
  ],
};

const TRAINERS = [
  {
    name: 'Marcus Vance',
    role: 'Head of Strength & Conditioning',
    credentials: 'CSCS · USAW Level 2 · 12 yrs Coaching',
    specialty: 'Powerlifting, Barbell Biomechanics, Periodization',
    bio: 'Former collegiate strength coach specializing in building resilient lifters who break PRs safely.',
  },
  {
    name: 'Sarah Sterling',
    role: 'Director of Metabolic Conditioning',
    credentials: 'EXOS Performance Specialist · NASM CPT',
    specialty: 'HIIT Circuits, Sprint Mechanics, Recovery Systems',
    bio: 'Pioneered the Forge MetCon system balancing high cardiovascular output with CNS protection.',
  },
  {
    name: 'Devon Cruz',
    role: 'Olympic Lifting & Mobility Coach',
    credentials: 'USA Weightlifting Senior Coach · FMS Certified',
    specialty: 'Snatch & Clean & Jerk, Kinetic Mobility, Posture',
    bio: 'Dedicated to helping athletes move with technical precision, fluid mobility, and injury resilience.',
  },
];

export const GymWebsite: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [activeProgramTab, setActiveProgramTab] = useState<string>('all');
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [reservedClass, setReservedClass] = useState<ScheduleClass | null>(null);
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', goal: 'Strength Training' });

  const filteredPrograms =
    activeProgramTab === 'all'
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category.toLowerCase().includes(activeProgramTab.toLowerCase()));

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialSuccess(true);
    setTimeout(() => {
      setTrialSuccess(false);
      setTrialModalOpen(false);
      setReservedClass(null);
      setFormData({ name: '', email: '', phone: '', goal: 'Strength Training' });
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E8ECF2] font-sans selection:bg-[#F97316] selection:text-black">
      {/* Floating Demo Header */}
      <DemoHeaderBar currentIndustry="Forge Athletics (Gym Demo)" />

      {/* Gym Navigation */}
      <header className="pt-16 pb-4 px-6 max-w-7xl mx-auto flex items-center justify-between border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#F97316] flex items-center justify-center text-black font-extrabold font-display text-lg">
            F
          </div>
          <div>
            <span className="font-display font-black text-xl text-white tracking-wider uppercase">
              FORGE
            </span>
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#F97316] block -mt-1">
              Athletics Club
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-xs font-mono-code uppercase tracking-wider text-neutral-400">
          <a href="#programs" className="hover:text-white transition-colors">Programs</a>
          <a href="#membership" className="hover:text-white transition-colors">Membership</a>
          <a href="#trainers" className="hover:text-white transition-colors">Coaches</a>
          <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
          <a href="#facilities" className="hover:text-white transition-colors">Facilities</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        <button
          onClick={() => setTrialModalOpen(true)}
          className="px-4 py-2 bg-[#F97316] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded hover:bg-[#EA580C] transition-colors"
        >
          Book Free Trial
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono-code text-[#F97316]">
              <Flame className="w-3.5 h-3.5" />
              <span>ELITE STRENGTH & METABOLIC PERFORMANCE</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              Built for Those Who Refuse Mediocrity.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-body max-w-xl leading-relaxed">
              We stripped away the crowded machines, neon gimmicks, and passive culture. Forge Athletics is an uncompromising training facility engineered for progressive barbell strength, athletic conditioning, and recovery.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setTrialModalOpen(true)}
                className="px-6 py-3.5 bg-[#F97316] text-black font-display font-black text-xs uppercase tracking-wider rounded hover:bg-[#EA580C] transition-colors flex items-center gap-2 shadow-lg shadow-orange-950/40"
              >
                <span>Claim Free 3-Day Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#schedule"
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-mono-code uppercase tracking-wider rounded transition-colors"
              >
                View Class Schedule
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-8 border-t border-white/8 grid grid-cols-3 gap-4 font-mono-code text-xs">
              <div>
                <div className="text-white font-bold text-base sm:text-xl">14,000 sq ft</div>
                <div className="text-neutral-500 text-[11px]">Training Floor</div>
              </div>
              <div>
                <div className="text-white font-bold text-base sm:text-xl">Eleiko & Rogue</div>
                <div className="text-neutral-500 text-[11px]">Calibrated Gear</div>
              </div>
              <div>
                <div className="text-white font-bold text-base sm:text-xl">Contrast Spa</div>
                <div className="text-neutral-500 text-[11px]">Sauna & Cold Plunge</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 aspect-[4/5]">
              <img
                src={ASSETS.gym}
                alt="Forge Athletics Training Ground"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <div className="text-[10px] font-mono-code text-[#F97316] uppercase">Now Enrolling</div>
                <div className="font-display font-bold text-white text-base">Autumn Strength Cohort</div>
                <div className="text-neutral-400 text-xs mt-0.5">Strict capacity cap of 18 athletes per slot.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#F97316]">
              Training Disciplines
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mt-2">
              Programs & Protocols
            </h2>
          </div>

          {/* Program filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {['all', 'Strength', 'Personal', 'Functional', 'Conditioning'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProgramTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-mono-code uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
                  activeProgramTab === tab
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Programs' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-[#10131B] border border-white/10 rounded-xl p-7 flex flex-col justify-between hover:border-[#F97316]/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-4">
                  <span className="text-[#F97316]">{prog.category}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                    Intensity: {prog.intensity}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {prog.name}
                </h3>
                <p className="text-xs font-medium text-neutral-300 mb-4">
                  {prog.tagline}
                </p>
                <p className="text-sm text-neutral-400 font-body leading-relaxed mb-6">
                  {prog.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-white/8 space-y-2 mb-6">
                  {prog.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, goal: prog.name }));
                    setTrialModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-white/5 hover:bg-[#F97316] text-white hover:text-black font-display font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
                >
                  Consult on this program
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#F97316]">
            Transparent Investment
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mt-2">
            Membership Tiers
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            No initiation fees. No hidden cancellation charges. Month-to-month flexibility or annual savings.
          </p>

          {/* Billing Switch */}
          <div className="mt-6 inline-flex items-center bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-mono-code uppercase rounded transition-colors ${
                billingCycle === 'monthly' ? 'bg-white text-black font-bold' : 'text-neutral-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 text-xs font-mono-code uppercase rounded transition-colors flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-[#F97316] text-black font-bold' : 'text-neutral-400'
              }`}
            >
              <span>Annual Contract</span>
              <span className="text-[10px] bg-black text-[#F97316] px-1.5 py-0.5 rounded font-black">
                SAVE 15%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Starter */}
          <div className="bg-[#10131B] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-code text-neutral-400 uppercase tracking-widest">
                Starter Access
              </div>
              <h3 className="font-display text-2xl font-black text-white mt-1">Open Floor</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-white">
                  ${billingCycle === 'annual' ? '129' : '149'}
                </span>
                <span className="text-xs text-neutral-500 font-mono-code">/ month</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Ideal for self-directed athletes requiring world-class barbells, racks, and platforms.
              </p>

              <div className="mt-8 space-y-3 border-t border-white/8 pt-6">
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full access to strength and conditioning floor</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Locker rooms, towel service & showers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Forge Member Training App logging</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 line-through">
                  <span>Group MetCon & Mobility classes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 line-through">
                  <span>Recovery cold plunge & sauna</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTrialModalOpen(true)}
              className="mt-8 w-full py-3 bg-white/10 hover:bg-white text-white hover:text-black font-display font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Select Starter
            </button>
          </div>

          {/* Pro */}
          <div className="bg-[#141824] border-2 border-[#F97316] rounded-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-orange-950/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#F97316] text-black text-[10px] font-mono-code font-black uppercase tracking-wider rounded">
              Most Selected
            </div>

            <div>
              <div className="text-xs font-mono-code text-[#F97316] uppercase tracking-widest">
                Pro Athlete
              </div>
              <h3 className="font-display text-2xl font-black text-white mt-1">All-Access Club</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-white">
                  ${billingCycle === 'annual' ? '199' : '235'}
                </span>
                <span className="text-xs text-neutral-500 font-mono-code">/ month</span>
              </div>
              <p className="text-xs text-neutral-300 mt-2">
                Unrestricted access to all coach-led strength, functional, and conditioning sessions.
              </p>

              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-white">
                  <Check className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Unlimited group classes & strength clinics</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white">
                  <Check className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Infrared sauna & contrast cold-plunge</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white">
                  <Check className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Monthly InBody 570 body composition scan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white">
                  <Check className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>2 Guest passes per month</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTrialModalOpen(true)}
              className="mt-8 w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-black font-display font-black text-xs uppercase tracking-wider rounded transition-colors shadow-lg"
            >
              Start Pro Membership
            </button>
          </div>

          {/* Elite */}
          <div className="bg-[#10131B] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-code text-neutral-400 uppercase tracking-widest">
                Elite Mentorship
              </div>
              <h3 className="font-display text-2xl font-black text-white mt-1">Coached Tier</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-white">
                  ${billingCycle === 'annual' ? '399' : '460'}
                </span>
                <span className="text-xs text-neutral-500 font-mono-code">/ month</span>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                For athletes requiring direct 1-on-1 coaching, personalized macros, and VIP amenities.
              </p>

              <div className="mt-8 space-y-3 border-t border-white/8 pt-6">
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>All Pro All-Access privileges</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4 Private 1-on-1 coaching sessions per month</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bespoke nutrition planning & check-ins</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Permanent dedicated private locker & laundry</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTrialModalOpen(true)}
              className="mt-8 w-full py-3 bg-white/10 hover:bg-white text-white hover:text-black font-display font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Inquire for Elite
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Class Schedule */}
      <section id="schedule" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#F97316]">
              Real-Time Booking
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mt-2">
              Weekly Schedule
            </h2>
          </div>

          {/* Day Selector */}
          <div className="flex items-center gap-2">
            {Object.keys(SCHEDULE).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 text-xs font-mono-code uppercase rounded transition-colors ${
                  selectedDay === day
                    ? 'bg-[#F97316] text-black font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/8 border-y border-white/8">
          {SCHEDULE[selectedDay]?.map((item) => (
            <div
              key={item.id}
              className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] px-3 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-6">
                <div className="font-mono-code text-sm text-[#F97316] font-semibold min-w-[120px]">
                  {item.time}
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base sm:text-lg">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono-code mt-0.5">
                    <span>Coach: {item.coach}</span>
                    <span>·</span>
                    <span className="text-amber-400">{item.spotsLeft} spots remaining</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setReservedClass(item);
                  setTrialModalOpen(true);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-[#F97316] text-white hover:text-black font-display font-bold text-xs uppercase tracking-wider rounded transition-colors self-start sm:self-center"
              >
                Reserve Mat
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers Showcase */}
      <section id="trainers" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#F97316]">
            Credentials & Experience
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white mt-2">
            The Coaching Staff
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            Every Forge coach holds collegiate or international strength credentials. No weekend certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.name}
              className="bg-[#10131B] border border-white/10 rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4">
                  <UserCheck className="w-6 h-6 text-[#F97316]" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{trainer.name}</h3>
                <div className="text-xs font-mono-code text-[#F97316] mt-0.5">{trainer.role}</div>
                <div className="text-[11px] font-mono-code text-neutral-400 mt-2 bg-white/5 p-2 rounded">
                  {trainer.credentials}
                </div>
                <p className="mt-4 text-sm text-neutral-400 font-body leading-relaxed">
                  {trainer.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/8 text-xs text-neutral-300">
                <span className="text-neutral-500 font-mono-code block text-[10px] uppercase">Specialty</span>
                {trainer.specialty}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About & Ethos Section */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#F97316]">
              Facility Ethos
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
              Forged in Discipline, Rooted in Science.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed">
              Forge Athletics was established to eliminate the distractions of corporate mega-gyms. We created an environment where athletes, lifters, and dedicated individuals train with calibrated Eleiko barbells, certified coaching staff, and sports-science recovery modalities.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/8 font-mono-code text-xs">
              <div>
                <div className="text-[#F97316] font-bold text-lg">Zero Crowding</div>
                <div className="text-neutral-400 text-xs mt-1">Strict member caps prevent waiting for racks or equipment.</div>
              </div>
              <div>
                <div className="text-[#F97316] font-bold text-lg">Olympic Calibrated</div>
                <div className="text-neutral-400 text-xs mt-1">Steel discs weighed within 10 grams of certified competition standards.</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-neutral-900">
              <img
                src={ASSETS.gymFacility}
                alt="Forge Athletics Training Arena"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono-code text-neutral-300 bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                Heavy Iron Sector · 12 Competition Power Racks & Olympic Platforms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Location */}
      <section id="facilities" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#F97316]">
              Facility & Hours
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white">
              Forge District HQ
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Located in the central industrial arts district. 14,000 square feet of acoustically insulated rubber flooring, customized Olympic platforms, magnesium chalk stations, and filtered cold water taps.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/8 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">418 Ironworks Avenue, District 4</div>
                  <div className="text-neutral-400 text-xs">Complimentary secure parking available in rear lot.</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Monday – Friday: 05:00 – 23:00</div>
                  <div className="text-neutral-400 text-xs">Saturday – Sunday: 06:00 – 21:00</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">+1 (555) 392-8172</div>
                  <div className="text-neutral-400 text-xs">Direct concierge desk & member support.</div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="lg:col-span-6 bg-[#10131B] border border-white/12 rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Inquire or Schedule a Tour
            </h3>
            <p className="text-neutral-400 text-xs mb-6">
              Drop by during staffing hours or request a guided walkthrough with a coach.
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono-code uppercase text-neutral-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jake Mercer"
                  className="w-full bg-[#181C26] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-code uppercase text-neutral-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jake@example.com"
                    className="w-full bg-[#181C26] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label className="block font-mono-code uppercase text-neutral-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#181C26] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono-code uppercase text-neutral-300 mb-1">Primary Goal</label>
                <select className="w-full bg-[#181C26] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]">
                  <option>Powerlifting & Heavy Strength</option>
                  <option>Metabolic Conditioning & Fat Loss</option>
                  <option>Olympic Weightlifting</option>
                  <option>General Longevity & Mobility</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F97316] text-black font-display font-extrabold uppercase tracking-wider rounded hover:bg-[#EA580C] transition-colors mt-2"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Gym Footer */}
      <footer className="py-10 border-t border-white/8 text-center text-xs font-mono-code text-neutral-500">
        <div>FORGE ATHLETICS CLUB · CLIENT DEMO BY VISTAAR STUDIO</div>
        <div className="mt-1">All rights reserved · Powered by Vistaar Digital Engine</div>
      </footer>

      {/* Free Trial / Reserve Modal */}
      {trialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121520] border border-white/15 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setTrialModalOpen(false);
                setReservedClass(null);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {trialSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#F97316] mx-auto animate-bounce" />
                <h3 className="font-display text-2xl font-bold text-white">Spot Reserved!</h3>
                <p className="text-neutral-300 text-xs">
                  We have registered your pass for{' '}
                  <span className="text-[#F97316] font-semibold">
                    {reservedClass ? reservedClass.title : 'Free 3-Day Trial'}
                  </span>
                  . Bring gym apparel and clean lifting shoes.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xs font-mono-code uppercase text-[#F97316]">
                  {reservedClass ? 'Class Reservation' : 'Guest Pass Registration'}
                </div>
                <h3 className="font-display text-2xl font-black text-white mt-1">
                  {reservedClass ? reservedClass.title : 'Claim Your 3-Day Trial'}
                </h3>
                <p className="text-xs text-neutral-400 mt-2">
                  Experience our Eleiko platforms, coaching methodology, and contrast recovery spa with zero commitment.
                </p>

                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block font-mono-code uppercase text-neutral-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Kane"
                      className="w-full bg-[#181D2A] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code uppercase text-neutral-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full bg-[#181D2A] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-code uppercase text-neutral-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className="w-full bg-[#181D2A] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F97316]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F97316] text-black font-display font-extrabold uppercase tracking-wider rounded hover:bg-[#EA580C] transition-colors mt-2"
                  >
                    Confirm Pass & Access Code
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
