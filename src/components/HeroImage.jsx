import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, Zap, CheckCircle } from 'lucide-react';

const HeroImage = () => {
  return (
    <div className="hero-image-wrapper">
      <div className="hero-grid-bg"></div>
      
      <motion.div 
        className="hero-image-container"
        initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
        transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.4 }}
      >
        {/* 3D Phone Mockup Representation */}
        <div className="phone-mockup">
          <div className="phone-bezel">
            <div className="phone-screen">
              
              {/* Standard UI Layer */}
              <div className="phone-notch"></div>
              <div className="phone-content shop-profile-ui">
                <div className="app-header">
                  <div className="app-title">Shop Profile</div>
                  <div className="app-menu">
                    <span></span><span></span><span></span>
                  </div>
                </div>

                <div className="shop-logo-circle">
                  <Smartphone size={32} color="var(--accent-cyan)" />
                </div>

                <h3 className="phone-title">Sakthi Mobiles</h3>
                <p className="shop-location">Srivilliputhur</p>

                <div className="shop-tags">
                  <span className="shop-tag">10 AM - 9 PM</span>
                  <span className="shop-tag active"><span className="pulse-dot"></span>Open Now</span>
                </div>

                <div className="app-stats shop-stats">
                  <div className="stat-row">
                    <span>Customer Rating</span>
                    <div className="mini-progress"><div className="mini-progress-fill" style={{width: '98%', background: 'var(--accent-gold)'}}></div></div>
                  </div>
                  <div className="stat-row">
                    <span>Service Speed</span>
                    <div className="mini-progress"><div className="mini-progress-fill" style={{width: '90%', background: 'var(--accent-cyan)'}}></div></div>
                  </div>
                  <div className="stat-row">
                    <span>Success Rate</span>
                    <div className="mini-progress"><div className="mini-progress-fill" style={{width: '95%', background: '#10b981'}}></div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="floating-card c-1 glass-panel">
          <div className="floating-icon-wrapper cyan-bg">
            <ShieldCheck size={24} color="#fff" />
          </div>
          <div>
            <h4>Verified</h4>
            <p>Technicians</p>
          </div>
        </div>
        <div className="floating-card c-2 glass-panel">
          <div className="floating-icon-wrapper gold-bg">
            <Zap size={24} color="#fff" />
          </div>
          <div>
            <h4>Fast</h4>
            <p>Turnaround</p>
          </div>
        </div>
        <div className="floating-card c-3 glass-panel">
          <div className="floating-icon-wrapper" style={{ background: '#10b981', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
            <CheckCircle size={24} color="#fff" />
          </div>
          <div>
            <h4>100%</h4>
            <p>Genuine Parts</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroImage;
