import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ASSETS } from '../../assets/media';
import { ArrowUpRight, Lock, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { RoutePath } from '../../types';

interface DemoItem {
  id: string;
  name: string;
  category: string;
  route: RoutePath;
  url: string;
  image: string;
  brandName: string;
  tagline: string;
  subhead: string;
  badge: string;
  accent: string;
  fontClass: string;
}

const DEMOS: DemoItem[] = [
  {
    id: 'fitness',
    name: 'Gym & Fitness',
    brandName: 'FORGE ATHLETICS',
    category: 'Athletic Club',
    route: '/gym',
    url: 'vistaar.studio/gym',
    image: ASSETS.gym,
    badge: 'HEALTH & PERFORMANCE',
    accent: '#F97316',
    tagline: 'BUILT FOR THOSE WHO REFUSE MEDIOCRITY.',
    subhead: 'Progressive barbell strength, metabolic conditioning & contrast therapy suites.',
    fontClass: 'font-display',
  },
  {
    id: 'dining',
    name: 'Restaurant',
    brandName: "L'ATELIER AURA",
    category: 'Haute Gastronomie',
    route: '/restaurant',
    url: 'vistaar.studio/restaurant',
    image: ASSETS.restaurant,
    badge: 'MICHELIN DINING & CAVE',
    accent: '#D4AF37',
    tagline: 'WHERE FIRE, SOIL & SEASON HARMONIZE.',
    subhead: 'Twelve-course seasonal tasting journeys, Grand Cru cellar pairings & private salons.',
    fontClass: 'font-cinzel',
  },
  {
    id: 'beauty',
    name: 'Salon & Beauty',
    brandName: 'ATELIER LUMIÈRE',
    category: 'Beauty Atelier',
    route: '/salon',
    url: 'vistaar.studio/salon',
    image: ASSETS.salon,
    badge: 'HAUTE COIFFURE',
    accent: '#E5D0BA',
    tagline: 'QUIET LUXURY FOR HAIR & MIND.',
    subhead: 'Architectural scissor work, French dimensional balayage & Japanese head spa therapy.',
    fontClass: 'font-serif-luxury',
  },
  {
    id: 'fashion',
    name: 'Boutique',
    brandName: 'ÉDITION NOIRE',
    category: 'Fashion House',
    route: '/boutique',
    url: 'vistaar.studio/boutique',
    image: ASSETS.boutique,
    badge: 'CAPSULE RUNWAY',
    accent: '#ECEEF2',
    tagline: 'ARCHITECTURAL MONOCHROMES.',
    subhead: 'Double-faced virgin cashmere, bespoke tailored suiting & limited mill runs.',
    fontClass: 'font-display',
  },
  {
    id: 'property',
    name: 'Real Estate',
    brandName: 'MONOLITH ESTATES',
    category: 'Modernist Architecture',
    route: '/real-estate',
    url: 'vistaar.studio/real-estate',
    image: ASSETS.realEstate,
    badge: 'PRIME ARCHITECTURAL ADVISORY',
    accent: '#94A3B8',
    tagline: 'RARE ARCHITECTURAL SANCTUARIES.',
    subhead: 'Cantilevered cliffside villas, private coastal promontories & skyline triplexes.',
    fontClass: 'font-cinzel',
  },
];

export const Hero3DShowcase: React.FC = () => {
  const { navigateTo, setCursorText } = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Strictly bounded mouse tilt (Max ±1.5deg X, ±2deg Y) without translating position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Clamp strictly: rotateX between -1.5deg and +1.5deg; rotateY between -2deg and +2deg
    const targetX = Math.max(-1.5, Math.min(1.5, -normY * 3));
    const targetY = Math.max(-2, Math.min(2, normX * 4));

    setRotX(targetX);
    setRotY(targetY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setCursorText('');
  };

  // Subtle auto-advance when not interacting
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DEMOS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeDemo = DEMOS[activeIndex];
  const nextDemo = DEMOS[(activeIndex + 1) % DEMOS.length];
  const tertiaryDemo = DEMOS[(activeIndex + 2) % DEMOS.length];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto select-none pt-4 pb-8"
      style={{ perspective: '1400px' }}
    >
      {/* Category Navigation Pills - Functional Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto no-scrollbar px-2">
        {DEMOS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-[#090A0D] shadow-[0_2px_15px_rgba(99,102,241,0.22)] font-semibold border border-white'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.04]'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-transform"
                style={{ backgroundColor: item.accent }}
              />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Mockup Container - Anchored Firmly at Center, NO TRANSLATION */}
      <div
        className="relative mx-auto w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformOrigin: 'center center',
        }}
      >
        {/* Layer 3: Tertiary Background Window (Subtle Depth Hint) */}
        <div
          onClick={() => setActiveIndex((activeIndex + 2) % DEMOS.length)}
          className="hidden sm:block absolute inset-x-8 -top-8 h-20 rounded-2xl bg-[#0D0E13] border border-white/[0.06] shadow-xl opacity-40 cursor-pointer transition-all duration-300 hover:opacity-60"
          style={{ transform: 'translateZ(-60px)' }}
        >
          <div className="px-4 py-2 border-b border-white/[0.05] flex items-center justify-between">
            <span className="text-[11px] font-mono-code text-neutral-500">{tertiaryDemo.url}</span>
            <span className="text-[10px] font-mono-code text-neutral-600">{tertiaryDemo.name}</span>
          </div>
        </div>

        {/* Layer 2: Secondary Background Window */}
        <div
          onClick={() => setActiveIndex((activeIndex + 1) % DEMOS.length)}
          className="hidden sm:block absolute inset-x-4 -top-4 h-24 rounded-2xl bg-[#11131A] border border-white/[0.08] shadow-2xl opacity-65 cursor-pointer transition-all duration-300 hover:opacity-85"
          style={{ transform: 'translateZ(-30px)' }}
        >
          <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
              <span className="text-[11px] font-mono-code text-neutral-400">{nextDemo.url}</span>
            </div>
            <span className="text-[10px] font-mono-code text-neutral-500 uppercase tracking-wider">
              {nextDemo.name} · Next
            </span>
          </div>
        </div>

        {/* Layer 1: Primary Dominant macOS Browser Window */}
        <div
          onMouseEnter={() => setCursorText('VIEW DEMO')}
          onMouseLeave={() => setCursorText('')}
          className="relative z-10 rounded-2xl bg-[#111319] border border-white/[0.12] overflow-hidden transition-all duration-300 shadow-[0_35px_90px_-20px_rgba(0,0,0,0.95),0_15px_45px_-12px_rgba(99,102,241,0.14),0_0_0_1px_rgba(255,255,255,0.08)] group"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Top Hairline Specular Frame Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-30" />

          {/* Tiny Moving Specular Frame Highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] overflow-hidden pointer-events-none z-30">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent animate-frame-sheen" />
          </div>

          {/* Realistic macOS Chrome Bar */}
          <div className="bg-[#151720] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between gap-4 relative z-20">
            {/* Realistic Traffic Lights */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block" />

              {/* Minimal browser navigation chevrons */}
              <div className="hidden sm:flex items-center gap-1 ml-3 text-neutral-500">
                <ChevronLeft className="w-3.5 h-3.5" />
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </div>
            </div>

            {/* Address Bar with Subtle Indigo Focus Border */}
            <div className="flex-1 max-w-lg mx-auto bg-[#090A0E] border border-white/[0.08] group-hover:border-indigo-400/20 rounded-lg py-1 px-3.5 flex items-center justify-between text-xs text-neutral-300 font-mono-code shadow-inner transition-colors">
              <div className="flex items-center gap-2 truncate">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-white font-medium truncate">{activeDemo.url}</span>
              </div>
              <span className="text-neutral-500 text-[10px] hidden md:inline shrink-0">
                HTTPS · Verified Build
              </span>
            </div>

            {/* Direct Launch Action */}
            <button
              onClick={() => navigateTo(activeDemo.route)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white hover:text-black border border-white/15 px-3 py-1 rounded-md transition-colors shrink-0"
            >
              <span>Open Site</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* Browser Viewport Content - Matches the actual demo website aesthetics */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0A0C10]">
            {/* Subtle Realistic Glass Reflection Sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-indigo-400/[0.02] pointer-events-none z-20 mix-blend-screen" />

            <img
              key={activeDemo.id}
              src={activeDemo.image}
              alt={activeDemo.brandName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090A0D]/85 via-transparent to-transparent hidden sm:block" />

            {/* Viewport UI Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
              {/* Demo Navbar Mirror */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono-code tracking-widest uppercase text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10">
                    {activeDemo.badge}
                  </span>
                  <span className="text-xs text-neutral-300 font-mono-code hidden sm:inline">
                    Client Demo by Vistaar Studio
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 bg-black/60 px-3 py-1 rounded border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Ready</span>
                </div>
              </div>

              {/* Demo Hero Content Mirror */}
              <div className="max-w-2xl space-y-3">
                <div className="text-xs font-mono-code tracking-widest text-neutral-400 uppercase">
                  {activeDemo.brandName}
                </div>
                <h3
                  className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08] text-balance ${activeDemo.fontClass}`}
                >
                  {activeDemo.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-body max-w-lg leading-relaxed line-clamp-2">
                  {activeDemo.subhead}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => navigateTo(activeDemo.route)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#090A0D] font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all shadow-xl shadow-black/40"
                  >
                    <span>Explore Complete Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-xs text-neutral-400 font-mono-code hidden sm:inline">
                    Full routes & interactive flows included
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Status Bar */}
      <div className="mt-6 flex items-center justify-between text-xs text-neutral-400 px-3 font-mono-code">
        <div>
          <span>0{activeIndex + 1}</span>
          <span className="text-neutral-600"> / 05</span>
          <span className="ml-2 text-neutral-300 font-medium">{activeDemo.brandName}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {DEMOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Switch to demo ${i + 1}`}
              className={`h-1 transition-all rounded-full ${
                i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="hidden sm:block text-neutral-500">
          Anchored physical mockup · Click preview to launch
        </div>
      </div>
    </div>
  );
};
