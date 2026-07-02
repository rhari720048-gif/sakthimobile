import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingToolsBackground = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to y-axis translation for different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 800]); // Moves down fast
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]); // Moves up medium
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 400]); // Moves down slow

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
      
      {/* Cyan Orb - Top Left */}
      <motion.div
        style={{
          position: 'fixed',
          top: '-10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          filter: 'blur(100px)',
          opacity: 0.15,
          y: y1,
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Gold Orb - Bottom Right */}
      <motion.div
        style={{
          position: 'fixed',
          bottom: '-10%',
          right: '-10%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'var(--accent-gold)',
          filter: 'blur(120px)',
          opacity: 0.1,
          y: y2,
        }}
        animate={{ scale: [1, 1.3, 0.9, 1], x: [0, -100, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Purple Orb - Middle Left */}
      <motion.div
        style={{
          position: 'fixed',
          top: '40%',
          left: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: '#8b5cf6', // Violet
          filter: 'blur(90px)',
          opacity: 0.08,
          y: y3,
        }}
        animate={{ scale: [1, 1.1, 1], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

    </div>
  );
};

export default FloatingToolsBackground;
