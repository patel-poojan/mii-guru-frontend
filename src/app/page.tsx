'use client';
import React, { useRef } from 'react';
import Header from './Components/landing-page/Header';
import HeroSection from './Components/landing-page/HeroSection';
import MissionSection from './Components/landing-page/MissionSection';
import LearningHeightsSection from './Components/landing-page/LearningHeightsSection';
import ContactSection from './Components/landing-page/ContactSection';
import PricingSection from './Components/landing-page/PricingSection';
import Footer from './Components/landing-page/Footer';

const Page = () => {
  const priceRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const scrollToPrice = () => {
    if (priceRef.current) {
      const yPosition =
        priceRef.current.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset

      window.scrollTo({
        top: yPosition,
        behavior: 'smooth',
      });
    }
  };
  const scrollToMission = () => {
    if (missionRef.current) {
      const yPosition =
        missionRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        80; // 80px offset

      window.scrollTo({
        top: yPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      const yPosition =
        featuresRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        80; // 80px offset

      window.scrollTo({
        top: yPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <Header
        scrollToPrice={scrollToPrice}
        scrollToFeatures={scrollToFeatures}
        scrollToMission={scrollToMission}
      />
      <HeroSection scrollToPrice={scrollToPrice} />
      <div ref={missionRef}>
        <MissionSection />
      </div>
      <div ref={featuresRef}>
        <LearningHeightsSection />
      </div>
      <div ref={priceRef}>
        <PricingSection />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Page;
