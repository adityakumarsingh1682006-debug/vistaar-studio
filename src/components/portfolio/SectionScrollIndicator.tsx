import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: '01' },
  { id: 'work', label: '02' },
  { id: 'services', label: '03' },
  { id: 'process', label: '04' },
  { id: 'why-us', label: '05' },
  { id: 'contact', label: '06' },
];

export const SectionScrollIndicator: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine pointers
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);

      const sectionElements = SECTIONS.map((sec) =>
        sec.id === 'hero' ? document.body : document.getElementById(sec.id)
      );

      const viewportOffset = window.innerHeight * 0.35;
      let currentIdx = 0;

      sectionElements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportOffset) {
          currentIdx = index;
        }
      });

      setActiveIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 select-none pointer-events-none transition-opacity duration-500 opacity-75 hover:opacity-100"
      aria-label="Section coordinates"
    >
      {/* Active coordinate index */}
      <span className="text-[9px] font-mono-code text-neutral-400 tracking-wider">
        {SECTIONS[activeIndex]?.label || '01'}
      </span>

      {/* Thin architectural track with gliding indicator */}
      <div className="relative w-[1px] h-24 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute w-full bg-gradient-to-b from-indigo-400 via-indigo-300 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all duration-500 ease-out"
          style={{
            height: '24%',
            top: `${(activeIndex / (SECTIONS.length - 1)) * 76}%`,
          }}
        />
      </div>

      <span className="text-[8px] font-mono-code text-neutral-600">
        06
      </span>
    </aside>
  );
};
