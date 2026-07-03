import React from 'react';
import Hero from '../components/Hero';
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

      <Hero />
      <Marquee />
      <Stats />
      
      <div className="pb-0">
        <Services limit={4} />
      </div>
      
      <div className="container mt-0 mb-0">
        <GoogleAd slotId="landing-mid-slot" />
      </div>
      
      <WhyChooseUs />
      
      <div className="pt-0">
        <BrandCarousel />
      </div>
      
      <div className="pb-0">
        <Reviews />
      </div>
      
      <CtaBanner />
      
      <Footer />
    </div>
  );
};

export default LandingPage;
