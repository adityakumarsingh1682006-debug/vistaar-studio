import React from 'react';
import { ArrowRight, Compass, Layout, Code2, Sliders, Rocket } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  duration: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Discover',
    duration: 'Week 1',
    tagline: 'Deep dive into your business model, customer psychology, and competitors.',
    description:
      'We audit your current brand presence, customer objections, and industry landscape. We define clear functional requirements, page architecture, and high-value conversion targets before drawing a single pixel.',
    deliverables: ['Information Architecture', 'Competitor Landscape Audit', 'Content Outline & Copy Framework'],
  },
  {
    num: '02',
    title: 'Design',
    duration: 'Week 2',
    tagline: 'Bespoke art direction, typography systems, and high-fidelity interaction prototypes.',
    description:
      'We establish a custom visual design system — unique typography pairings, tactile dark/light color balances, responsive layout grids, and interactive states for desktop, tablet, and mobile.',
    deliverables: ['Full Interactive Desktop Prototypes', 'Mobile Responsive Layouts', 'Design System & Typography Hierarchy'],
  },
  {
    num: '03',
    title: 'Build',
    duration: 'Weeks 3 – 4',
    tagline: 'Clean, modern code engineered for speed, responsiveness, and zero bloated dependencies.',
    description:
      'We build the entire site using React, TypeScript, and modern CSS. Every interaction is hand-coded: custom forms, reservation pickers, filters, subtle 3D transforms, and fluid transitions without slow third-party scripts.',
    deliverables: ['Modular TypeScript Codebase', 'Sub-Second Page Performance', 'Custom Interactive Functional Modules'],
  },
  {
    num: '04',
    title: 'Refine',
    duration: 'Week 5',
    tagline: 'Rigorous cross-device testing, accessibility validation, and performance tuning.',
    description:
      'We stress-test across iOS Safari, Android Chrome, MacOS, Windows, and high-resolution displays. We calibrate animation easing curves, ensure keyboard accessibility, test form edge cases, and lock down SEO tags.',
    deliverables: ['Cross-Browser QA Matrix', 'Accessibility Compliance (WCAG AA)', 'SEO & Social Card Metadata'],
  },
  {
    num: '05',
    title: 'Launch',
    duration: 'Week 6',
    tagline: 'Seamless deployment, DNS migration, and handover with full documentation.',
    description:
      'We coordinate domain routing, SSL certificate provisioning, CDN edge caching, and post-launch monitoring. We hand over a clean codebase and provide a walkthrough of all systems.',
    deliverables: ['Zero-Downtime Deployment', 'Automated Edge CDN Caching', 'Handover Session & Technical Docs'],
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 sm:py-32 border-b border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
              Methodology
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase">
            From idea to launch.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-body font-light leading-relaxed">
            A transparent, five-stage engineering process designed to keep your project on schedule, eliminate guesswork, and deliver an uncompromising digital flagship.
          </p>
        </div>

        {/* 5-Step Editorial Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              className={`bg-[#0F121A] border border-white/10 rounded-2xl p-7 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between pb-6 border-b border-white/8 text-xs font-mono-code">
                  <span className="text-2xl font-display font-extrabold text-white">
                    {step.num}
                  </span>
                  <span className="text-neutral-400 px-2.5 py-1 rounded bg-white/5 border border-white/8">
                    {step.duration}
                  </span>
                </div>

                {/* Step Title & Content */}
                <div className="mt-6">
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-neutral-300 uppercase tracking-wide">
                    {step.tagline}
                  </p>
                  <p className="mt-4 text-sm text-neutral-400 font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Deliverables Footer */}
              <div className="mt-8 pt-6 border-t border-white/8 space-y-1.5">
                <div className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-400 mb-2">
                  Key Deliverables
                </div>
                {step.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
