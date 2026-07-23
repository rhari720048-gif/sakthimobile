import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import MagneticButton from './MagneticButton';

const LiveSupportCard = () => {
  const { settings } = useSettings();

  return (
    <div className="container" style={{ margin: '20px auto 40px auto' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          padding: '30px',
          borderRadius: '20px',
          background: 'var(--bg-main)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <PhoneCall size={28} color="var(--accent-cyan)" />
            <span style={{ position: 'absolute', top: '0', right: '0', width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', border: '2px solid var(--bg-main)' }}></span>
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Need Immediate Help?</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Our technicians are available for live support.</p>
          </div>
        </div>
        <MagneticButton>
          <a 
            href={`tel:${settings.phone}`}
            className="btn-primary"
            style={{ 
              display: 'inline-block', 
              textDecoration: 'none', 
              padding: '14px 28px', 
              borderRadius: '30px',
              background: '#22c55e',
              color: '#ffffff',
              fontWeight: '700',
              fontFamily: "'Outfit', sans-serif",
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.25)',
              transition: 'all 0.3s ease'
            }}
          >
            Call Now
          </a>
        </MagneticButton>
      </motion.div>
    </div>
  );
};

export default LiveSupportCard;
