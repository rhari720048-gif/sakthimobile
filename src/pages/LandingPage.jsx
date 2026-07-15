import React from 'react';
import Hero from '../components/Hero';
import HeroImage from '../components/HeroImage';
import Marquee from '../components/Marquee';
import Stats from '../components/Stats';
import Services from '../components/Services';
import BrandCarousel from '../components/BrandCarousel';
import Reviews from '../components/Reviews';
import WhyChooseUs from '../components/WhyChooseUs';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import GoogleAd from '../components/GoogleAd';
import { motion, useScroll } from 'framer-motion';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="app-container">
      {/* Premium Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-gold), #fff)',
          transformOrigin: '0%',
          zIndex: 999999,
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
        }}
      />

      <div className="landing-page-content">
        <div className="section-hero">
          <Hero />
        </div>
        
        <div className="section-services pb-0">
          <Services limit={4} />
        </div>
        
        {/* Mobile-only Hero Mockup Graphics placed below Premium Services */}
        <div className="mobile-only-hero-image">
          <HeroImage />
        </div>
        
        <div className="section-ad container mt-0 mb-0">
          <GoogleAd slotId="landing-mid-slot" />
        </div>
        
        <div className="section-why-choose-us">
          <WhyChooseUs />
        </div>
        
        <div className="section-stats">
          <Stats />
        </div>
        
        <div className="section-brand-carousel pt-0">
          <BrandCarousel />
        </div>
        
        <div className="section-reviews pb-0">
          <Reviews />
        </div>
        
        <div className="section-marquee">
          <Marquee />
        </div>
        
        <div className="section-cta">
          <CtaBanner />
        </div>
        
        <div className="section-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
