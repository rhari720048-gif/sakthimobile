import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Wrench, ShieldCheck, Zap, MapPin } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Hero.css';

const Hero = () => {
  const subtitleText = "Display odanjiducha? Battery nikkalaya? Phone dead aagiducha? Kavalaiye vendam. Sakthi Mobiles la ellame ready pannidalam.";
  const subtitleWords = subtitleText.split(" ");
  return (
    <section id="home" className="hero-section">
      {/* Abstract Background Elements */}
      <div className="hero-bg-glow glow-1"></div>
      <div className="hero-bg-glow glow-2"></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="badge glass-panel"
          >
            <span className="badge-dot"></span> Srivilliputhur's Premium Mobile Service <MapPin size={16} color="var(--accent-color)" className="inline-icon" />
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Sakthi <br/>
            <span className="text-gradient">Mobiles</span> <Wrench size={40} color="var(--accent-color)" className="inline-icon-large" />
          </motion.h1>
          
          <motion.p
            style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1rem', marginTop: '-10px', marginBottom: '20px', letterSpacing: '1px' }}
          >
            Made by Thunder ⚡
          </motion.p>
          
          <motion.p className="hero-subtitle">
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                style={{ display: 'inline-block', marginRight: '6px' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="hero-actions"
          >
            <MagneticButton>
              <a href="https://wa.me/917373472735" target="_blank" rel="noreferrer" className="glass-button primary hero-btn">
                WhatsApp-la Pesunga <ChevronRight size={18} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#services" className="glass-button hero-btn">
                Services Parunga
              </a>
            </MagneticButton>
          </motion.div>
        </div>
        
        {/* Floating 3D Cards for Spatial UI Effect */}
        <div className="hero-visuals">
          <motion.div 
            className="floating-card card-1 glass-panel"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-icon"><Wrench size={24} color="var(--accent-color)" /></div>
            <div className="card-text">
              <h4>Quick Repair</h4>
              <p>Odaney ready aagum</p>
            </div>
          </motion.div>

          <motion.div 
            className="floating-card card-2 glass-panel"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="card-icon"><ShieldCheck size={24} color="#10b981" /></div>
            <div className="card-text">
              <h4>Trust & Quality</h4>
              <p>100% Pakka service</p>
            </div>
          </motion.div>

          <motion.div 
            className="floating-card card-3 glass-panel"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="card-icon"><Zap size={24} color="#3b82f6" /></div>
            <div className="card-text">
              <h4>IC Level Repair</h4>
              <p>Motherboard experts</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
