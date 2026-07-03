import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', () => setIsDragging(false));
      window.addEventListener('touchcancel', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
      window.removeEventListener('touchcancel', () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <motion.div 
      className="ba-slider-wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <h3 className="ba-slider-title">Before & After Repair</h3>
      <div 
        className="ba-slider-container"
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* AFTER IMAGE (Bottom Layer) */}
        <div className="ba-image ba-image-after">
          <img src={afterImage} alt="After Repair" draggable="false" />
          <span className="ba-label ba-label-after">After</span>
        </div>

        {/* BEFORE IMAGE (Top Layer, Clipped) */}
        <div 
          className="ba-image ba-image-before"
          style={{ 
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
          }}
        >
          <img src={beforeImage} alt="Before Repair" draggable="false" />
          <span className="ba-label ba-label-before">Before</span>
        </div>

        {/* SLIDER HANDLE */}
        <div 
          className="ba-slider-handle"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="ba-slider-line"></div>
          <div className="ba-slider-button">
            <ChevronsLeftRight size={16} color="#fff" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BeforeAfterSlider;
