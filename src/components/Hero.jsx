import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, ShieldCheck, Zap, MapPin, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import MagneticButton from './MagneticButton';
import HeroImage from './HeroImage';
import './Hero.css';

const Hero = () => {
  const { settings } = useSettings();
  // Live Typing State
  const words = ["iPhones", "Samsung", "Broken Screens", "Water Damage", "Motherboards"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Abstract Background Elements with Particles */}
      <div className="hero-bg-glow glow-gold"></div>
      <div className="hero-bg-glow glow-cyan"></div>
      
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--x': `${Math.random() * 100}vw`,
            '--y': `${Math.random() * 100}vh`,
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${10 + Math.random() * 10}s`,
            '--size': `${2 + Math.random() * 6}px`,
            '--color': Math.random() > 0.5 ? 'var(--accent-cyan)' : 'var(--accent-gold)'
          }}></div>
        ))}
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="badge glass-panel"
          >
            <span className="badge-dot"></span> Srivilliputhur's Premium Mobile Service <MapPin size={16} color="var(--accent-cyan)" className="inline-icon" style={{ marginLeft: '4px' }} />
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Sakthi <br/>
            <span className="hero-gradient-text">Mobiles</span> 
          </motion.h1>

          {/* Live Typing Subtitle */}
          <motion.h2 
            className="hero-typing-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We expertly fix{' '}
            <div className="typing-container">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  className="typing-word"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {words[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h2>
          
          <motion.div
            className="thunder-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="thunder-icon"><img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle' }} /></span> Crafted by Thunder
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="hero-cta-group"
          >
            <MagneticButton>
              <a href={`https://wa.me/${settings.phone}`} target="_blank" rel="noreferrer" className="hero-btn-primary" onClick={trackWhatsAppClick}>
                <span className="btn-glow"></span>
                Chat on WhatsApp <ArrowRight size={20} style={{ marginLeft: '10px' }} />
              </a>
            </MagneticButton>
          </motion.div>
          
          <motion.div 
            className="hero-features"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="hero-feature-item">
              <div className="feature-icon-circle"><ShieldCheck size={18} color="var(--accent-cyan)" /></div>
              <span>Original Parts</span>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon-circle"><Zap size={18} color="var(--accent-gold)" /></div>
              <span>Quick Service</span>
            </div>
          </motion.div>
        </div>
        
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;
