import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

interface ServiceDetail {
  number: string;
  title: string;
  category: string;
  summary: string;
  scope: string[];
  timeline: string;
}

const SERVICES: ServiceDetail[] = [
  {
    number: '01',
    title: 'Custom Web Design',
    category: 'Visual & Brand Systems',
    summary:
      'Distinctive visual identities tailored to your industry. We craft bespoke typography scales, art direction, photography styling, and layout grids that leave generic templates behind.',
    scope: ['Brand Art Direction', 'Responsive Desktop & Mobile Layouts', 'Custom Typography Systems', 'Interactive Design Prototypes'],
    timeline: '2 – 3 Weeks',
  },
  {
    number: '02',
    title: 'Full-Stack Web Development',
    category: 'Engineering & Performance',
    summary:
      'Rock-solid frontend and backend engineering. Zero bloated plugins, ultra-fast load times, semantic accessibility, and clean component architecture built on modern web standards.',
    scope: ['React & TypeScript Codebases', 'Serverless APIs & Edge Deployments', 'Sub-second Page Load Speeds', 'WCAG AA Accessibility Standard'],
    timeline: '3 – 5 Weeks',
  },
  {
    number: '03',
    title: 'UI/UX & Interactive Design',
    category: 'User Experience & Conversion',
    summary:
      'Frictionless customer journeys designed for conversion. From reservation systems to shopping bags and membership funnels, we remove friction at every touchpoint.',
    scope: ['Conversion Funnel Audits', 'Booking & Checkout Flows', 'Micro-Interactions & Motion', 'Mobile Touch Optimization'],
    timeline: '2 – 4 Weeks',
  },
  {
    number: '04',
    title: 'High-Impact Landing Pages',
    category: 'Product & Campaign Launches',
    summary:
      'Focused single-page destinations built to drive immediate action for new services, seasonal campaigns, product drops, or private client acquisitions.',
    scope: ['Hero Value Proposition Hierarchy', 'Interactive Feature Showcases', 'Integrated Lead Capture', 'Performance & Social Card SEO'],
    timeline: '1 – 2 Weeks',
  },
  {
    number: '05',
    title: 'Complete Business Websites',
    category: 'Multi-Page Flagships',
    summary:
      'Comprehensive digital hubs for established firms. Includes deep service catalogs, staff directories, interactive schedules, case studies, and transparent pricing structures.',
    scope: ['Full Information Architecture', 'Content Strategy & Editorial Tone', 'Multi-Page Routing', 'Customer Inquiry Management'],
    timeline: '4 – 6 Weeks',
  },
  {
    number: '06',
    title: 'Curated E-Commerce Experiences',
    category: 'Direct-to-Consumer',
    summary:
      'Editorial storefronts where aesthetics match the quality of your goods. We build brand-led retail journeys with lookbooks, quick-views, and streamlined bag interactions.',
    scope: ['Editorial Lookbook Grids', 'Interactive Product Modals', 'Custom Cart Drawers', 'Inventory & Currency Config'],
    timeline: '4 – 7 Weeks',
  },
  {
    number: '07',
    title: 'Complete Website Redesign',
    category: 'Modernization & Overhaul',
    summary:
      'Transform outdated, slow, or template-bound sites into modern digital flagship experiences that match the actual caliber of your company.',
    scope: ['Legacy Architecture Audit', 'Content Reorganization & Migration', 'Complete Visual Modernization', 'Zero-Downtime Migration'],
    timeline: '3 – 5 Weeks',
  },
];

export const ServicesSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <section id="services" className="py-24 sm:py-32 border-b border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
              Capabilities & Scope
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase">
            What we build.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-body font-light leading-relaxed">
            We don’t offer generic packages. We engineer bespoke digital assets for businesses where design quality, technical stability, and customer perception directly influence revenue.
          </p>
        </div>

        {/* Editorial Accordion & Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive List */}
          <div className="lg:col-span-7 divide-y divide-white/8">
            {SERVICES.map((service, idx) => {
              const isActive = activeService === idx;
              return (
                <div
                  key={service.number}
                  onClick={() => setActiveService(idx)}
                  className={`py-6 cursor-pointer transition-all duration-200 group ${
                    isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono-code text-sm text-neutral-500 font-medium">
                        {service.number}
                      </span>
                      <h3
                        className={`font-display text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-mono-code px-2.5 py-1 rounded-md transition-colors ${
                        isActive
                          ? 'bg-white text-[#090A0D] font-semibold'
                          : 'text-neutral-400 border border-white/10 group-hover:border-white/30'
                      }`}
                    >
                      {service.category}
                    </span>
                  </div>

                  {/* Expanded info on mobile or active state */}
                  {isActive && (
                    <div className="mt-4 pl-8 sm:pl-10 text-neutral-400 text-sm leading-relaxed animate-in fade-in duration-200 lg:hidden">
                      <p>{service.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.scope.map((s) => (
                          <span
                            key={s}
                            className="text-xs text-neutral-300 bg-white/5 px-2.5 py-1 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Detailed Dossier (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="bg-[#10131B] border border-white/12 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/8 text-xs font-mono-code text-neutral-400">
                <span>SPECIFICATION DOSSIER</span>
                <span className="text-white font-bold">{SERVICES[activeService].number} / 07</span>
              </div>

              <div className="mt-6">
                <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-400">
                  {SERVICES[activeService].category}
                </span>
                <h4 className="font-display text-2xl font-extrabold text-white mt-1">
                  {SERVICES[activeService].title}
                </h4>

                <p className="mt-4 text-sm text-neutral-300 leading-relaxed font-body">
                  {SERVICES[activeService].summary}
                </p>

                <div className="mt-6 pt-6 border-t border-white/8">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-neutral-400 mb-3">
                    Deliverables & Inclusions
                  </div>
                  <div className="space-y-2">
                    {SERVICES[activeService].scope.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs text-neutral-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase text-neutral-400">
                      Standard Build Window
                    </div>
                    <div className="text-sm font-semibold text-white font-mono-code">
                      {SERVICES[activeService].timeline}
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('#contact')}
                    className="px-4 py-2 bg-white text-[#090A0D] font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Request Spec</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
