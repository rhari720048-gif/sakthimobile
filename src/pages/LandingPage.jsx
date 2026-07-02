import React from 'react';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import BrandCarousel from '../components/BrandCarousel';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
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

      <AnnouncementBanner />
      <Navbar />
      <Hero />
      <Stats />
      <Services limit={3} />
      <BrandCarousel />
      <Reviews />
      <Footer />
    </div>
  );
};

export default LandingPage;
