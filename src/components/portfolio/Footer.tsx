import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { RoutePath } from '../../types';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const demos: { name: string; path: RoutePath }[] = [
    { name: 'Gym & Fitness (Forge)', path: '/gym' },
    { name: "Fine Dining (L'Atelier)", path: '/restaurant' },
    { name: 'Salon Atelier (Lumière)', path: '/salon' },
    { name: 'Fashion Boutique (Édition)', path: '/boutique' },
    { name: 'Real Estate (Monolith)', path: '/real-estate' },
  ];

  return (
    <footer className="pt-20 pb-12 bg-[#060709] border-t border-white/6 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/8">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display font-extrabold text-2xl text-white tracking-tighter block">
              VISTAAR
            </span>
            <p className="text-sm text-neutral-400 max-w-sm font-body leading-relaxed">
              Independent digital studio engineering modern websites and bespoke digital flagships for businesses ready to lead their industry.
            </p>
            <div className="pt-2 text-xs font-mono-code text-neutral-500">
              © {new Date().getFullYear()} Vistaar Studio. All rights reserved.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-white">
              Studio Index
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              <button
                onClick={() => navigateTo('#work')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Selected Work
              </button>
              <button
                onClick={() => navigateTo('#services')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Services & Deliverables
              </button>
              <button
                onClick={() => navigateTo('#process')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Our 5-Stage Process
              </button>
              <button
                onClick={() => navigateTo('#why-us')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Principles & Standards
              </button>
              <button
                onClick={() => navigateTo('#about')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Studio Story
              </button>
              <button
                onClick={() => navigateTo('#contact')}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                Start a Project
              </button>
            </div>
          </div>

          {/* Industry Demos Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-white">
              Industry Demos
            </div>
            <div className="flex flex-col space-y-2 text-sm">
              {demos.map((d) => (
                <button
                  key={d.path}
                  onClick={() => navigateTo(d.path)}
                  className="text-left text-neutral-400 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>{d.name}</span>
                  <span className="text-neutral-600 group-hover:text-white transition-colors">↗</span>
                </button>
              ))}
            </div>
          </div>

          {/* Studio Direct Contact */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono-code uppercase tracking-wider text-white">
              Direct Contact
            </div>
            <div className="text-sm space-y-1.5 font-mono-code text-neutral-400">
              <a href="mailto:adityakumarsingh1682006@gmail.com" className="text-white hover:underline block break-all">adityakumarsingh1682006@gmail.com</a>
              <a href="tel:+918910534042" className="text-neutral-300 hover:text-white block transition-colors">+91 8910534042</a>
              <div>Tokyo · London · New York</div>
              <div className="pt-2 text-xs text-neutral-500">Available for select client projects Q4 / Q1</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-neutral-500">
          <div>Hand-crafted with TypeScript & Tailwind CSS. Zero AI clichés.</div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors p-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
