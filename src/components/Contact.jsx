import React from 'react';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import './Contact.css';
import TextReveal from './TextReveal';

const Contact = () => {
  const { settings, loading } = useSettings();

  if (loading) return null;

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <TextReveal text={<>Contact <span className="gradient-text-gold">Us</span></>} />
            <Phone size={32} color="var(--accent-gold)" className="inline-icon-large" />
          </div>
          <p>Unga mobile-la entha prachanai naalum engalukku call pannunga. Naanga ready! <img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }} /></p>
        </div>

        <div className="contact-grid">
          {/* Contact Details */}
          <motion.div 
            className="contact-info glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3>Sakthi Mobiles</h3>
            
            <div className="info-item">
              <div className="info-icon shimmer-effect" style={{ color: 'var(--accent-cyan)' }}><MapPin size={20} color="currentColor" /></div>
              <div className="info-text">
                <strong>Address:</strong>
                <p>{settings.address}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', marginTop: '5px', display: 'inline-block' }}
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon shimmer-effect" style={{ color: 'var(--accent-gold)' }}><Phone size={20} color="currentColor" /></div>
              <div className="info-text">
                <strong>Phone & Email:</strong>
                <p><a href={`tel:+${settings.phone}`}>{settings.phoneDisplay}</a></p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{settings.email}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon shimmer-effect" style={{ color: 'var(--accent-cyan)' }}><Clock size={20} color="currentColor" /></div>
              <div className="info-text">
                <strong>Working Hours:</strong>
                <p>{settings.hours}</p>
              </div>
            </div>

            <div className="contact-actions">
              <a 
                href={`https://wa.me/${settings.phone}`} 
                target="_blank" 
                rel="noreferrer" 
                className="glass-button primary w-full justify-center"
                onClick={trackWhatsAppClick}
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a href={`tel:+${settings.phone}`} className="glass-button w-full justify-center">
                <Phone size={20} /> Call Now
              </a>
              <a 
                href="https://www.instagram.com/sakthi_mobiles_sss?igsh=bTV0NGxxOHhmeHJp" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-button w-full justify-center"
                style={{
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  color: '#ffffff',
                  fontWeight: '700',
                  marginTop: '10px'
                }}
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg> Follow on Instagram
              </a>
            </div>
          </motion.div>

          {/* Map Area Placeholder */}
          <motion.div 
            className="contact-map glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="map-overlay">
              <div className="map-pin-glow"></div>
              <MapPin size={40} color="var(--accent-gold)" />
              <h4>Srivilliputhur Location</h4>
              <p>Oru thadava shop ku vanthu parunga, service pakka va irukkum!</p>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`} 
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
