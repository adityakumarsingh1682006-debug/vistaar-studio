import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { RoutePath } from '../../types';
import { ArrowLeft, ChevronDown, Sparkles, Send } from 'lucide-react';

interface DemoHeaderBarProps {
  currentIndustry: string;
}

const DEMOS: { name: string; path: RoutePath; category: string }[] = [
  { name: 'Forge Athletics', path: '/gym', category: 'Gym & Fitness' },
  { name: "L'Atelier Aura", path: '/restaurant', category: 'Fine Dining' },
  { name: 'Atelier Lumière', path: '/salon', category: 'Luxury Salon' },
  { name: 'Édition Noire', path: '/boutique', category: 'Fashion Boutique' },
  { name: 'Monolith Estates', path: '/real-estate', category: 'Architecture & Property' },
];

export const DemoHeaderBar: React.FC<DemoHeaderBarProps> = ({ currentIndustry }) => {
  const { navigateTo } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <aside aria-label="Demo site switcher" className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="bg-[#090A0D]/90 backdrop-blur-md border border-white/12 text-white px-3.5 py-2 rounded-full shadow-2xl flex items-center justify-between gap-3 text-xs">
        {/* Left: Back to Portfolio */}
        <button
          onClick={() => navigateTo('/')}
          className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-1 px-2.5 rounded-full hover:bg-white/5 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium hidden sm:inline">Vistaar Studio</span>
          <span className="font-medium sm:hidden">Exit</span>
        </button>

        {/* Center: Current Demo Indicator with Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-neutral-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white tracking-wide truncate max-w-[120px] sm:max-w-none">
              {currentIndustry}
            </span>
            <span className="text-neutral-500 hidden md:inline">· Live Demo</span>
            <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-[#0E1015] border border-white/15 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-mono-code uppercase tracking-wider text-neutral-400 border-b border-white/8 mb-1">
                Explore Industry Demos
              </div>
              {DEMOS.map((demo) => (
                <button
                  key={demo.path}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigateTo(demo.path);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/10 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="font-medium text-white group-hover:text-amber-200 transition-colors">{demo.name}</div>
                    <div className="text-[10px] text-neutral-400">{demo.category}</div>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white transition-colors">↗</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Inquire button */}
        <button
          onClick={() => navigateTo('/', 'contact')}
          className="flex items-center gap-1.5 bg-white text-[#090A0D] font-semibold px-3 py-1.5 rounded-full hover:bg-neutral-200 transition-colors shrink-0 shadow-sm"
        >
          <Send className="w-3 h-3" />
          <span className="hidden sm:inline">Build Like This</span>
          <span className="sm:hidden">Inquire</span>
        </button>
      </div>
    </aside>
  );
};
