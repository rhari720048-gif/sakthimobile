import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Home, Phone, Star, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', icon: <Home size={18} color="var(--accent-color)" />, href: '#home' },
    { name: 'Services', icon: <Smartphone size={18} color="var(--accent-color)" />, href: '#services' },
    { name: 'Contact', icon: <Phone size={18} color="var(--accent-color)" />, href: '#contact' }
  ];

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#home" className="logo">
          <Smartphone className="logo-icon" size={28} color="var(--accent-color)" />
          <span>Sakthi <span className="highlight">Mobiles</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              <span className="nav-icon-wrapper" style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>{link.icon}</span>
              {link.name}
            </a>
          ))}
          <a href="#contact" className="glass-button nav-cta">
            <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
              <MessageCircle size={18} color="var(--accent-color)" />
            </span>
            WhatsApp
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="mobile-nav glass-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
           <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}><span className="nav-icon-wrapper" style={{ marginRight: '8px' }}><Smartphone size={16} color="var(--accent-color)" /></span> Services</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)}><span className="nav-icon-wrapper" style={{ marginRight: '8px' }}><Star size={16} color="var(--accent-color)" /></span> Why Us?</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)}><span className="nav-icon-wrapper" style={{ marginRight: '8px' }}><MessageCircle size={16} color="var(--accent-color)" /></span> Reviews</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}><span className="nav-icon-wrapper" style={{ marginRight: '8px' }}><Phone size={16} color="var(--accent-color)" /></span> Contact</a>
          <a href="#booking" className="glass-button primary small" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setMobileMenuOpen(false)}>
            <MessageCircle size={16} color="#000" /> Book Service
          </a>
        </div>  </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
