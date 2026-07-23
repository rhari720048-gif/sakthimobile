import React from 'react';
import { Phone, MapPin, MessageCircle, Clock, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import genzLogo from '../assets/genz-logo.png';
import GoogleAd from './GoogleAd';
import './Footer.css';

const Footer = () => {
  const { settings, loading } = useSettings();

  if (loading) return null;

  return (
    <>
      <div className="container" style={{ marginBottom: '20px', position: 'relative', zIndex: 10 }}>
        <GoogleAd slotId="footer-ad-slot" />
      </div>
      <footer className="footer-section">
        <div className="container">
          {/* Premium Footer Header Grid */}
          <div className="footer-header-cta">
            <div className="cta-left">
              <h4>Ready to Restore Your Device?</h4>
              <p>Experience fast, reliable, and premium mobile repair services today.</p>
            </div>
            <div className="cta-right">
              <Link to="/contact" className="footer-cta-btn">Book a Repair</Link>
            </div>
          </div>

          <div className="footer-content">
            <div className="footer-brand">
              <h3>Sakthi <span className="gradient-text-cyan">Mobiles</span></h3>
              <p className="footer-brand-desc">Your trusted destination for expert mobile repairs, high-fidelity display replacements, and top-tier software flashing solutions.</p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/sakthi_mobiles_sss?igsh=bTV0NGxxOHhmeHJp" target="_blank" rel="noreferrer" className="social-icon-btn" title="Follow Sakthi Mobiles on Instagram">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/sakthi_mobiles_sss?igsh=bTV0NGxxOHhmeHJp" target="_blank" rel="noreferrer" className="social-icon-btn" title="Follow Sakthi Mobiles on Instagram">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href={`https://wa.me/${settings.phone}`} target="_blank" rel="noreferrer" className="social-icon-btn" onClick={trackWhatsAppClick}><MessageCircle size={16} /></a>
              </div>
              <p style={{ color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '0.85rem', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Made by Thunder <img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }} />
              </p>
            </div>
            
            <div className="footer-info-column">
              <h4>Contact Us</h4>
              <ul className="footer-contact">
                <li>
                  <MapPin size={18} className="footer-icon" />
                  <span>{settings.address}</span>
                </li>
                <li>
                  <Phone size={18} className="footer-icon" />
                  <span><a href={`tel:+${settings.phone}`}>{settings.phoneDisplay}</a></span>
                </li>
                <li>
                  <span className="footer-icon"><Smartphone size={16} /></span>
                  <span><a href={`https://wa.me/${settings.phone}`} target="_blank" rel="noreferrer" onClick={trackWhatsAppClick}>WhatsApp Chat</a></span>
                </li>
                <li>
                  <Clock size={18} className="footer-icon" />
                  <span>{settings.hours}</span>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-services">
              <h4>Top Services</h4>
              <Link to="/services" state={{ openService: 'Display Replacement' }}>Display Replacement</Link>
              <Link to="/services" state={{ openService: 'Display Glass Replacement' }}>Display Glass Replacement</Link>
              <Link to="/services" state={{ openService: 'Dead Mobile / Motherboard' }}>IC Level Repair</Link>
              <Link to="/services" state={{ openService: 'Software Flash' }}>Software Flash</Link>
            </div>

            <div className="footer-legal">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/refund">Return & Refund Policy</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; {new Date().getFullYear()} Sakthi Mobiles. All Rights Reserved.</p>
              <a href="https://genzneuralx.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div className="powered-by">
                  <span className="powered-text">Developed by</span>
                  <img src={genzLogo} alt="GENZ NEURAL-X" className="genz-logo" />
                  <strong className="genz-text">GENZ NEURAL-X</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
