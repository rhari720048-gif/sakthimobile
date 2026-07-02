import React from 'react';
import { Phone, MapPin, MessageCircle, Clock, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import genzLogo from '../assets/genz-logo.png';
import './Footer.css';

const Footer = () => {
  const { settings, loading } = useSettings();

  if (loading) return null;

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Sakthi <span className="gradient-text-cyan">Mobiles</span></h3>
            <p style={{ color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Made by Thunder <img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }} /></p>
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
            <div className="powered-by">
              <span className="powered-text">Powered by</span>
              <img src={genzLogo} alt="GENZ NEURAL-X" className="genz-logo" />
              <strong className="genz-text">GENZ NEURAL-X</strong>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
