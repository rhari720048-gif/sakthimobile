import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Sakthi <span className="highlight">Mobiles</span></h3>
            <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '4px' }}>Made by Thunder ⚡</p>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong>Working Hours:</strong><br />
              9:30 AM - 9:30 PM (Everyday)
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-services">
            <h4>Top Services</h4>
            <span>Display Replacement</span>
            <span>Battery Change</span>
            <span>IC Level Repair</span>
            <span>Software Flash</span>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sakthi Mobiles. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
