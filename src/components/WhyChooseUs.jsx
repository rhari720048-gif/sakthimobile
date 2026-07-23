import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, ThumbsUp } from 'lucide-react';
import TextReveal from './TextReveal';

const WhyChooseUs = () => {
  const features = [
    { icon: <Zap size={24} color="var(--accent-cyan)" />, text: "Fast Repair" },
    { icon: <ShieldCheck size={24} color="var(--accent-gold)" />, text: "100% Genuine" },
    { icon: <ThumbsUp size={24} color="var(--accent-cyan)" />, text: "Trusted Experts" }
  ];

  return (
    <section className="why-choose-us" style={{ padding: '30px 0', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <TextReveal text="Why Choose Us?" />
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, y: -5, boxShadow: '0 15px 30px rgba(6, 182, 212, 0.15)' }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 20 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', padding: '16px 32px', borderRadius: '30px', boxShadow: 'var(--glass-shadow)', border: 'var(--glass-border)', cursor: 'pointer' }}
            >
              {feature.icon}
              <span style={{ fontWeight: '700', fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)' }}>{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
