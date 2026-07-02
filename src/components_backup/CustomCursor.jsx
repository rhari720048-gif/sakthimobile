import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for the cursor
  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .spotlight-card-style, .glass-button, .accordion-header, input, textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  // Don't render custom cursor on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.3 : 0.8,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
