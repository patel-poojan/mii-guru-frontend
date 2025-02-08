import React from 'react';
import Header from './Components/landing-page/Header';
import HeroSection from './Components/landing-page/HeroSection';
import MissionSection from './Components/landing-page/MissionSection';
import LearningHeightsSection from './Components/landing-page/LearningHeightsSection';
import ContactSection from './Components/landing-page/ContactSection';
import PricingSection from './Components/landing-page/PricingSection';
import Footer from './Components/landing-page/Footer';
const page = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <MissionSection />
      <LearningHeightsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default page;
