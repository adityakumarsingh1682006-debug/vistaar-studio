import React from 'react';
import { Layers, ShieldCheck, Zap, Smartphone, Sparkles, MessageSquare } from 'lucide-react';

interface Strength {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
}

const STRENGTHS: Strength[] = [
  {
    icon: Sparkles,
    title: 'Zero Pre-made Templates',
    subtitle: 'Bespoke Art Direction',
    description:
      'We never use bought themes or generic website builders. Every layout, typographic rhythm, and color harmony is drawn deliberately to mirror your brand’s real-world atmosphere.',
  },
  {
    icon: Layers,
    title: 'Industry-Native Architecture',
    subtitle: 'Tailored Mechanics',
    description:
      'A fine dining restaurant needs reservation flows and cellar menus; a luxury gym needs class schedules and membership matrices. We build features specific to your business model.',
  },
  {
    icon: Zap,
    title: 'Engineered for Real Speed',
    subtitle: 'Sub-Second Performance',
    description:
      'No clunky plugins or bloated third-party trackers. Clean, tree-shaken modern JavaScript and edge delivery ensure your site loads instantly on mobile networks.',
  },
  {
    icon: Smartphone,
    title: 'True Responsive Craft',
    subtitle: 'Adaptive Touch Experience',
    description:
      'Over 65% of your customers visit on mobile. We design mobile layouts with thumb-friendly controls, tactile interactions, and zero layout shifts.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean & Maintainable Code',
    subtitle: 'Modern Web Standards',
    description:
      'Built in TypeScript and modular components. Your project is maintainable, self-documenting, and free from fragile proprietary dependencies.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Senior Communication',
    subtitle: 'Zero Account Layers',
    description:
      'You talk directly with the designers and engineers building your website. No middlemen, no delayed telephone game, and rapid turnaround on iterations.',
  },
];

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-24 sm:py-32 border-b border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
              Our Principles
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase">
            Why work with us.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-body font-light leading-relaxed">
            We avoid vanity metrics and exaggerated claims. Instead, we compete on craftsmanship, engineering discipline, and digital experiences that elevate your brand.
          </p>
        </div>

        {/* 6-Core Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STRENGTHS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#0E1017] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-[11px] font-mono-code uppercase tracking-wider text-neutral-400 mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-400 font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
