import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { IndustryShowcase } from './IndustryShowcase';
import { ServicesSection } from './ServicesSection';
import { ProcessSection } from './ProcessSection';
import { WhyUsSection } from './WhyUsSection';
import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { SectionScrollIndicator } from './SectionScrollIndicator';

export const PortfolioHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090A0D] text-[#ECEEF2]">
      <Navbar />
      <SectionScrollIndicator />
      <main id="main-content">
        <HeroSection />
        <IndustryShowcase />
        <ServicesSection />
        <ProcessSection />
        <WhyUsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
