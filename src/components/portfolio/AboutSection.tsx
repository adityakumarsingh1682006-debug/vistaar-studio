import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const AboutSection: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-white/6 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Title */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono-code uppercase tracking-widest text-neutral-400">
                Studio Narrative
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
              An independent studio with high standards.
            </h2>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 font-body text-base sm:text-lg leading-relaxed">
            <p className="font-medium text-white text-xl sm:text-2xl leading-snug">
              We are a focused design and engineering studio founded on a simple conviction:
              real businesses deserve websites that look and feel as serious as the services they provide.
            </p>

            <p className="text-neutral-400">
              Too many commercial websites are either bloated WordPress templates patched together with slow plugins, or generic landing pages that look like every other software startup on the internet.
            </p>

            <p className="text-neutral-400">
              We work with founders, restaurateurs, fitness directors, fashion curators, and boutique agencies who care deeply about physical quality and want their digital presence to match that same standard.
            </p>

            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="bg-[#0F1219] p-5 rounded-xl border border-white/8">
                <div className="font-mono-code text-xs text-neutral-400 uppercase tracking-wider mb-1">
                  Design Discipline
                </div>
                <div className="font-semibold text-white">Typography, Space & Purpose</div>
                <div className="text-neutral-400 text-xs mt-1">
                  Every typeface, margin, and interaction serves customer clarity, not aesthetic decoration.
                </div>
              </div>

              <div className="bg-[#0F1219] p-5 rounded-xl border border-white/8">
                <div className="font-mono-code text-xs text-neutral-400 uppercase tracking-wider mb-1">
                  Code Discipline
                </div>
                <div className="font-semibold text-white">Modern, Pure & Fast</div>
                <div className="text-neutral-400 text-xs mt-1">
                  Engineered using TypeScript and modern CSS standards with zero unnecessary libraries.
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('#contact')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-amber-200 transition-colors group"
              >
                <span>Let's talk about your business</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
