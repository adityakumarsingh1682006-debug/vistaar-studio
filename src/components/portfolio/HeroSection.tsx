import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Hero3DShowcase } from './Hero3DShowcase';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { VistaarExpansion } from './VistaarExpansion';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const sectionRef = useRef<HTMLElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 35 });
  const targetPos = useRef({ x: 50, y: 35 });
  const currentPos = useRef({ x: 50, y: 35 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable cursor-reactive lighting on devices with fine pointer
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true);
    }
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let animId: number;
    const animate = () => {
      // Soft lerp interpolation for silky studio lighting response
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.06;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.06;

      setLightPos({
        x: Math.round(currentPos.current.x * 10) / 10,
        y: Math.round(currentPos.current.y * 10) / 10,
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isDesktop]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isDesktop || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    targetPos.current = { x, y };
  };

  const handlePointerLeave = () => {
    targetPos.current = { x: 50, y: 35 };
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden border-b border-white/6"
    >
      {/* Subtle Studio Ambient Light Layer (Cursor Reactive on Desktop, Soft Fixed on Mobile) */}
      {isDesktop ? (
        <div
          className="absolute w-[640px] h-[480px] rounded-full blur-[130px] pointer-events-none -z-10 transition-opacity duration-700"
          style={{
            left: `${lightPos.x}%`,
            top: `${lightPos.y}%`,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(79, 70, 229, 0.04) 45%, transparent 70%)',
          }}
        />
      ) : (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-indigo-950/20 via-neutral-900/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />
      )}

      {/* Secondary Neutral Base Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-neutral-900/15 blur-3xl rounded-full pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Editorial Subtitle / Domain Label with Vistaar Expansion Signature */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-400/90 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
              Independent Web Design & Engineering Studio
            </span>
          </div>
          <div className="hidden sm:block">
            <VistaarExpansion width="w-28" className="!my-0 !py-0" />
          </div>
        </div>

        {/* Large Typographic Headline with Restrained Micro-Interaction */}
        <div className="max-w-5xl">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black tracking-[-0.04em] leading-[0.98] text-white uppercase text-balance select-none">
            We build{' '}
            <span className="inline-block transition-colors duration-300 hover:text-[#F3F4FF] hover:drop-shadow-[0_0_24px_rgba(129,140,248,0.3)]">
              digital experiences
            </span>{' '}
            that make businesses look{' '}
            <span className="inline-block transition-colors duration-300 hover:text-indigo-100 hover:drop-shadow-[0_0_24px_rgba(129,140,248,0.4)]">
              impossible to ignore
            </span>
            .
          </h1>
        </div>

        {/* Supporting Narrative & Primary Action Row */}
        <div className="mt-8 sm:mt-10 pt-8 border-t border-white/8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="font-body text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              We design and build modern websites for businesses ready to make a stronger impression online.
              Every build is crafted from scratch with custom interactions, responsive architecture, and production-grade performance.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-wrap items-center gap-4 md:justify-end">
            <button
              onClick={() => navigateTo('#work')}
              className="px-6 py-3.5 bg-white text-[#090A0D] font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all shadow-xl shadow-black/30 flex items-center gap-2 group"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={() => navigateTo('#contact')}
              className="px-6 py-3.5 bg-white/6 hover:bg-white/12 text-white border border-white/15 hover:border-indigo-400/30 font-display font-semibold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Hero 3D Interactive Stage */}
        <div className="mt-12 sm:mt-16">
          <Hero3DShowcase />
        </div>
      </div>
    </section>
  );
};
