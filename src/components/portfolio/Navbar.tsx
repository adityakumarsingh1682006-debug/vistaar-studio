import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', target: 'work' },
    { label: 'Services', target: 'services' },
    { label: 'Process', target: 'process' },
    { label: 'Why Us', target: 'why-us' },
    { label: 'About', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    navigateTo('#' + target);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090A0D]/90 backdrop-blur-md border-b border-white/8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_1px_0_rgba(99,102,241,0.06)]'
          : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single text wordmark with signature micro-point */}
        <button
          onClick={() => navigateTo('/')}
          className="group font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-white hover:opacity-90 transition-opacity text-left flex items-center"
        >
          <span>VISTAAR</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/90 shadow-[0_0_8px_rgba(99,102,241,0.8)] ml-1.5 self-center group-hover:scale-125 transition-transform" />
        </button>

        {/* Zone 2: Clean 4-6 text navigation links with micro-state */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleLinkClick(link.target)}
              className="group hover:text-white transition-colors relative py-1 text-sm tracking-wide"
            >
              <span>{link.label}</span>
              <span className="block w-1 h-1 rounded-full bg-indigo-400/90 shadow-[0_0_6px_rgba(99,102,241,0.8)] mx-auto mt-0.5 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary action button & mobile trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold tracking-wider text-[#090A0D] bg-white rounded-full hover:bg-neutral-200 transition-colors uppercase whitespace-nowrap shadow-sm"
          >
            Start a Project
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0F14] border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleLinkClick(link.target)}
                className="text-left text-base font-medium text-neutral-300 hover:text-white py-1.5 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090A0D] bg-white rounded-full hover:bg-neutral-200 transition-colors"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
