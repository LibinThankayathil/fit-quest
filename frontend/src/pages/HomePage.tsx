import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { UnifiedSystem } from '../components/landing/UnifiedSystem';
import { LeaderboardSection } from '../components/landing/LeaderboardSection';
import { Footer } from '../components/landing/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <UnifiedSystem />
      <LeaderboardSection />
      <Footer />
    </div>
  );
};

export default HomePage;
