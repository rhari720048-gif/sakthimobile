import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = '', style = {}, maxTilt = 15, scaleOnHover = 1.02 }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, -100]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.2, 0, 0.2]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ perspective: 1000 }}
      whileHover={{ scale: scaleOnHover, zIndex: 10 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: 'relative',
        ...style
      }}
      className={className}
    >
      <motion.div 
        className="tilt-card-glare"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)',
          x: glareX,
          y: glareY,
          opacity: glareOpacity,
          pointerEvents: 'none',
          zIndex: 5,
          borderRadius: 'inherit'
        }}
      />
      {/* Push children to front in 3D space */}
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", height: '100%', borderRadius: 'inherit' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
