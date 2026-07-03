import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Smartphone } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useSettings } from '../context/SettingsContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings, loading } = useSettings();
  const showBanner = !loading && settings?.bannerActive && settings?.bannerText;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  // Sync hover state with active location when not hovering
  useEffect(() => {
    setHoveredPath(location.pathname);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${showBanner ? 'has-banner' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Smartphone className="logo-icon" />
          <span className="logo-text">Sakthi <span className="gradient-text-cyan">Mobiles</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" onMouseLeave={() => setHoveredPath(location.pathname)}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onMouseEnter={() => setHoveredPath(link.path)}
              style={{ position: 'relative' }}
            >
              {hoveredPath === link.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="nav-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 2 }}>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu glass-panel"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
