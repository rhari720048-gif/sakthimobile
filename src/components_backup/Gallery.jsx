import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Service <span className="text-gradient">Gallery</span></h2>
          <p>Namma service pandra vidhatha neengale parunga.</p>
        </div>

        <div className="gallery-grid">
          {/* Display Replacement */}
          <motion.div 
            className="gallery-item glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="image-wrapper">
              <img src="/broken_screen.png" alt="Display Replacement" className="gallery-image" />
            </div>
            <div className="gallery-caption">
              <h4>Cracked Display to New Display</h4>
              <p><RefreshCw size={14} className="inline-icon"/> Original Part Replaced</p>
            </div>
          </motion.div>

          {/* Motherboard Repair */}
          <motion.div 
            className="gallery-item glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="image-wrapper">
              <img src="/motherboard.png" alt="Motherboard IC Repair" className="gallery-image" />
            </div>
            <div className="gallery-caption">
              <h4>Motherboard IC Level Repair</h4>
              <p><RefreshCw size={14} className="inline-icon"/> 100% Data Saved</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
