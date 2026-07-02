import React from 'react';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Contact <span className="text-gradient">Us</span> <Phone size={32} color="var(--accent-color)" className="inline-icon-large" style={{ marginLeft: '10px' }} /></h2>
          <p>Unga mobile-la entha prachanai naalum engalukku call pannunga. Naanga ready! 💪</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details */}
          <motion.div 
            className="contact-info glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Sakthi Mobiles</h3>
            
            <div className="info-item">
              <div className="info-icon"><MapPin size={20} color="var(--accent-color)" /></div>
              <div className="info-text">
                <strong>Address:</strong>
                <p>Near by Puliyamarathu Palkova Shop,</p>
                <p>Srivilliputhur, Virudhunagar District,</p>
                <p>Tamil Nadu - 626125</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Phone size={20} color="var(--accent-color)" /></div>
              <div className="info-text">
                <strong>Phone:</strong>
                <p><a href="tel:+917373472735">+91 73734 72735</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Clock size={20} color="var(--accent-color)" /></div>
              <div className="info-text">
                <strong>Working Hours:</strong>
                <p>9:30 AM - 9:30 PM (Everyday)</p>
              </div>
            </div>

            <div className="contact-actions">
              <a href="https://wa.me/917373472735" target="_blank" rel="noreferrer" className="glass-button primary w-full justify-center">
                <MessageCircle size={20} /> WhatsApp la Message Pannunga
              </a>
              <a href="tel:+917373472735" className="glass-button w-full justify-center">
                <Phone size={20} /> Call Pannunga
              </a>
            </div>
          </motion.div>

          {/* Map Area Placeholder (Spatial Depth Effect) */}
          <motion.div 
            className="contact-map glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="map-overlay">
              <div className="map-pin-glow"></div>
              <MapPin size={40} color="var(--accent-color)" />
              <h4>Srivilliputhur Location</h4>
              <p>Oru thadava shop ku vanthu parunga, service pakka va irukkum!</p>
              <a 
                href="https://maps.google.com/?q=Srivilliputhur+Virudhunagar+District+Tamil+Nadu+626125" 
                target="_blank" 
                rel="noreferrer"
                className="glass-button map-btn"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
