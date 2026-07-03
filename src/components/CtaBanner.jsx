import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import MagneticButton from './MagneticButton';

const CtaBanner = () => {
  const { settings } = useSettings();

  return (
    <section className="cta-banner pb-0" style={{ padding: '60px 0 0 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(212, 175, 55, 0.05))',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '24px',
            padding: '40px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '0' }}>Ready to bring your device back to life?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Our expert technicians are waiting to help you. Get a free quote today!
          </p>
          <MagneticButton>
            <a 
              href={`https://wa.me/${settings.phone}?text=Hi%20Sakthi%20Mobiles,%20I%20need%20help%20with%20my%20device.`} 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', background: 'var(--accent-cyan)', color: '#0f172a' }}
            >
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </MagneticButton>
        </motion.div>
      </div>
      <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', width: '200%', height: '200px', background: 'var(--bg-main)', borderRadius: '50%', filter: 'blur(50px)', zIndex: 1 }}></div>
    </section>
  );
};

export default CtaBanner;
