import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ASSETS } from '../../assets/media';
import { RoutePath } from '../../types';
import { ArrowUpRight, Check, Compass, Monitor, Sparkles } from 'lucide-react';
import { VistaarExpansion } from './VistaarExpansion';

interface ShowcaseProject {
  number: string;
  name: string;
  brandName: string;
  category: string;
  route: RoutePath;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  designPalette: { name: string; hex: string }[];
  typography: string;
  architecture: string;
}

const SHOWCASE_DATA: ShowcaseProject[] = [
  {
    number: '01',
    name: 'FITNESS',
    brandName: 'Forge Athletics',
    category: 'Gym & Athletic Performance',
    route: '/gym',
    tagline: 'Bold, high-intensity athletic sanctuary with live schedules and membership conversion funnels.',
    description:
      'Engineered for premium health clubs and training facilities. Features class booking workflows, tiered membership matrix with monthly/annual billing, trainer credentials, and facility virtual showcases.',
    image: ASSETS.gym,
    features: ['Class Schedule Booking', 'Tiered Membership Matrix', 'Coach Profiles & Credentials', 'High-Contrast Athletic Typography'],
    designPalette: [
      { name: 'Onyx', hex: '#0B0D11' },
      { name: 'Safety Blaze', hex: '#F97316' },
      { name: 'Steel', hex: '#71717A' },
    ],
    typography: 'Syne & Plus Jakarta Sans',
    architecture: 'High-Conversion Fitness Hub',
  },
  {
    number: '02',
    name: 'DINING',
    brandName: "L'Atelier Aura",
    category: 'Fine Dining & Gastronomy',
    route: '/restaurant',
    tagline: 'Warm, editorial culinary storytelling paired with real-time reservation architecture.',
    description:
      'Tailored for Michelin-starred kitchens, boutique bistros, and hospitality groups. Showcases seasonal multi-course tasting menus, wine cellar pairings, private dining requests, and an integrated reservation engine.',
    image: ASSETS.restaurant,
    features: ['Interactive Course Menu & Wine Cellar', 'Real-Time Table Booking Flow', 'Chef Story & Farm Provenance', 'Intimate Candlelit Visuals'],
    designPalette: [
      { name: 'Midnight Truffle', hex: '#0A0908' },
      { name: 'Gold Leaf', hex: '#D4AF37' },
      { name: 'Warm Parchment', hex: '#F5F2EB' },
    ],
    typography: 'Cinzel & Italiana',
    architecture: 'Editorial Hospitality Experience',
  },
  {
    number: '03',
    name: 'BEAUTY',
    brandName: 'Atelier Lumière',
    category: 'Luxury Salon & Hair Atelier',
    route: '/salon',
    tagline: 'Refined, serene architectural aesthetics with multi-step appointment scheduling.',
    description:
      'Created for luxury hair salons, aesthetic clinics, and day spas. Includes transparent treatment pricing, master stylist portfolios, hair transformation gallery, and a frictionless appointment booking sequence.',
    image: ASSETS.salon,
    features: ['Service Duration & Pricing Menu', 'Master Stylist Portfolios', 'Transformation Lookbook', 'Client Appointment System'],
    designPalette: [
      { name: 'Travertine Cream', hex: '#F8F6F0' },
      { name: 'Smoked Oak', hex: '#2A2521' },
      { name: 'Soft Blush', hex: '#EAD9CF' },
    ],
    typography: 'Italiana & Plus Jakarta Sans',
    architecture: 'Calm Sanctuary & Booking Funnel',
  },
  {
    number: '04',
    name: 'FASHION',
    brandName: 'Édition Noire',
    category: 'High-Fashion Boutique',
    route: '/boutique',
    tagline: 'Avant-garde editorial magazine layouts with interactive shopping bag and capsule lookbook.',
    description:
      'Designed for designer clothing labels and luxury accessories. Features dynamic garment lookbooks, filterable seasonal collections, interactive product quick-views with fabric provenance, and a live slide-out shopping bag.',
    image: ASSETS.boutique,
    features: ['Capsule Lookbook Spreads', 'Product Quick-View Modal', 'Interactive Cart Slideout', 'Garment Fabric Storytelling'],
    designPalette: [
      { name: 'Pure Jet', hex: '#050505' },
      { name: 'Bone White', hex: '#FAFAFA' },
      { name: 'Muted Platinum', hex: '#A3A3A3' },
    ],
    typography: 'Syne & JetBrains Mono',
    architecture: 'Editorial E-Commerce Experience',
  },
  {
    number: '05',
    name: 'PROPERTY',
    brandName: 'Monolith Estates',
    category: 'Luxury Architectural Real Estate',
    route: '/real-estate',
    tagline: 'Monolithic modernist layouts with architectural specs, floor plans, and private tour booking.',
    description:
      'Built for ultra-prime property brokerages and private development houses. Incorporates categorized listing grids, filterable price and estate tags, high-res architectural specs, and direct agent inquiry scheduling.',
    image: ASSETS.realEstate,
    features: ['Architectural Property Dossiers', 'Listing Filter Engine', 'Private Viewing Scheduler', 'Senior Broker Profiles'],
    designPalette: [
      { name: 'Architectural Slate', hex: '#0F1216' },
      { name: 'Cool Limestone', hex: '#CBD5E1' },
      { name: 'Bronze Patina', hex: '#78716C' },
    ],
    typography: 'Cinzel & Plus Jakarta Sans',
    architecture: 'High-Value Property Portfolio',
  },
];

export const IndustryShowcase: React.FC = () => {
  const { navigateTo, setCursorText } = useNavigation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="py-24 sm:py-32 border-b border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-4 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/90 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
              Interactive Industry Builds
            </span>
          </div>
          <VistaarExpansion className="!my-2 !justify-start" width="w-24" />
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase mt-4">
            Built for your business.
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-body font-light leading-relaxed">
            Every industry has a distinct audience, personality, and visual language.
            We don’t deploy generic templates — we architect complete, tailor-made digital storefronts designed to convert visitors into loyal clients.
          </p>
        </div>

        {/* Cinematic Industry Stack */}
        <div className="space-y-24 sm:space-y-36">
          {SHOWCASE_DATA.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Preview Column */}
                <div
                  className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                    setCursorText('VIEW ' + project.name);
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setCursorText('');
                  }}
                >
                  <div
                    onClick={() => navigateTo(project.route)}
                    className="group cursor-pointer relative rounded-2xl overflow-hidden bg-[#10131B] border border-white/12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500 hover:border-indigo-400/30 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95),0_10px_35px_-10px_rgba(99,102,241,0.14)]"
                  >
                    {/* Browser-style Top Bar */}
                    <div className="bg-[#14161F] border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between text-xs relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
                      </div>
                      <div className="text-[11px] font-mono-code text-neutral-300 truncate max-w-[200px] sm:max-w-xs bg-[#090A0E] px-3 py-0.5 rounded border border-white/5 group-hover:border-indigo-400/20 transition-colors">
                        vistaar.studio{project.route}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-white/80 font-mono-code">
                        <span>Live Site</span>
                        <ArrowUpRight className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Image Viewport */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                      {/* Subtle diagonal glass sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-indigo-500/[0.02] pointer-events-none z-10 mix-blend-screen" />

                      <img
                        src={project.image}
                        alt={`${project.name} demo website preview`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Measured contrast scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent opacity-80" />

                      {/* Bottom Floating Bar */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-[#090A0D]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-400">
                            Client Demo Brand
                          </div>
                          <div className="font-display font-bold text-white text-base sm:text-lg">
                            {project.brandName}
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#090A0D] text-xs font-semibold uppercase tracking-wider shadow-md group-hover:bg-neutral-200 transition-colors">
                          <span>Enter Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Details Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Huge Editorial Number & Category */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-neutral-600 tracking-tighter">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase">
                    {project.name}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base font-medium text-neutral-300">
                    {project.tagline}
                  </p>

                  <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-body">
                    {project.description}
                  </p>

                  {/* Key Features List */}
                  <div className="mt-6 pt-6 border-t border-white/8 space-y-2.5">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Architecture & CTA Button */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => navigateTo(project.route)}
                      className="px-6 py-3 bg-white text-[#090A0D] font-display font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg shadow-black/40 group"
                    >
                      <span>Explore {project.name} Website</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
