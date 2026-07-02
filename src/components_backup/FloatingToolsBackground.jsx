import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Syringe, FlaskConical, PenTool, Cpu, Battery, Settings } from 'lucide-react';
import './FloatingToolsBackground.css';

const FloatingToolsBackground = () => {
  // We use position: fixed so they stay in the background across all sections
  return (
    <div className="global-bg-tools-container">
      
      {/* Group 1: Detailed Tools */}
      <motion.div className="g-tool" style={{ top: '15%', left: '8%', opacity: 0.05 }}
        animate={{ y: [0, -40, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}>
        <Microscope size={120} strokeWidth={1} />
      </motion.div>

      <motion.div className="g-tool" style={{ top: '65%', left: '85%', opacity: 0.04 }}
        animate={{ y: [0, 50, 0], rotate: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}>
        <Syringe size={100} strokeWidth={1.5} />
      </motion.div>

      <motion.div className="g-tool" style={{ top: '35%', right: '10%', opacity: 0.05 }}
        animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}>
        <FlaskConical size={110} strokeWidth={1} />
      </motion.div>

      <motion.div className="g-tool" style={{ top: '80%', left: '35%', opacity: 0.03 }}
        animate={{ y: [0, -40, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        <PenTool size={130} strokeWidth={1} />
      </motion.div>

      {/* Group 2: Small hardware items (Screws, Rubber bands, chips) - High Quantity */}
      {/* Screw 1 */}
      <motion.div className="g-tool" style={{ top: '20%', left: '30%', opacity: 0.06 }}
        animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="8" x2="12" y2="16" />
        </svg>
      </motion.div>

      {/* Screw 2 */}
      <motion.div className="g-tool" style={{ top: '75%', left: '15%', opacity: 0.04 }}
        animate={{ y: [0, 20, 0], rotate: [0, -360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="9" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="8" x2="12" y2="16" />
        </svg>
      </motion.div>

      {/* Screw 3 */}
      <motion.div className="g-tool" style={{ top: '40%', right: '30%', opacity: 0.05 }}
        animate={{ y: [0, -15, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="8" x2="12" y2="16" />
        </svg>
      </motion.div>

      {/* Rubber Band 1 */}
      <motion.div className="g-tool" style={{ top: '10%', right: '20%', opacity: 0.04 }}
        animate={{ y: [0, 25, 0], scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
        </svg>
      </motion.div>

      {/* Rubber Band 2 */}
      <motion.div className="g-tool" style={{ top: '85%', right: '50%', opacity: 0.03 }}
        animate={{ y: [0, -20, 0], scale: [1, 1.2, 1], rotate: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-15 12 12)" />
        </svg>
      </motion.div>

      {/* Soldering Iron */}
      <motion.div className="g-tool" style={{ top: '25%', left: '50%', opacity: 0.04 }}
        animate={{ y: [0, 30, 0], rotate: [0, 25, 0], x: [0, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Tip */}
          <path d="M12 2l2 6h-4l2-6z" />
          {/* Handle */}
          <rect x="9" y="8" width="6" height="12" rx="1" />
          {/* Wire */}
          <path d="M12 20c0 4 4 4 4 4" />
        </svg>
      </motion.div>

      {/* Hot Air Blower (SMD Rework Gun) */}
      <motion.div className="g-tool" style={{ top: '75%', right: '25%', opacity: 0.05 }}
        animate={{ y: [0, -25, 0], rotate: [0, -15, 0], x: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Main Body */}
          <rect x="2" y="8" width="12" height="8" rx="2" />
          {/* Nozzle Base */}
          <path d="M14 10h4l2-1v6l-2-1h-4" />
          {/* Nozzle Tip */}
          <path d="M20 11h3v2h-3" />
          {/* Handle / Wire drop */}
          <path d="M6 16v6" />
          {/* Heat waves */}
          <path d="M23 9c1-1 1-3 0-4" opacity="0.5" />
          <path d="M23 15c1 1 1 3 0 4" opacity="0.5" />
        </svg>
      </motion.div>

      {/* Group 3: Generic electronics components */}
      <motion.div className="g-tool" style={{ top: '50%', left: '5%', opacity: 0.04 }}
        animate={{ y: [0, -30, 0], x: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}>
        <Cpu size={140} strokeWidth={1} />
      </motion.div>
      
      <motion.div className="g-tool" style={{ top: '90%', right: '15%', opacity: 0.03 }}
        animate={{ y: [0, -40, 0], x: [0, -30, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}>
        <Battery size={90} strokeWidth={1.5} />
      </motion.div>

      <motion.div className="g-tool" style={{ top: '5%', left: '50%', opacity: 0.03 }}
        animate={{ y: [0, 30, 0], rotate: [0, 360, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        <Settings size={150} strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default FloatingToolsBackground;
