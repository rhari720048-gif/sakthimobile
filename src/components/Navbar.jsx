import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Smartphone, Home, Wrench, Info, Phone, LayoutDashboard, ShoppingBag, Star, Settings, LogOut, HardDrive, MonitorSmartphone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import MagneticButton from './MagneticButton';
import { useSettings } from '../context/SettingsContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, loading } = useSettings();
  const showBanner = !loading && settings?.bannerActive && settings?.bannerText;
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav-dropdown-container')) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const getNavLinks = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard') {
      return [
        { name: 'Overview', path: '/admin/dashboard?tab=overview', icon: <LayoutDashboard size={16} /> },
        { 
          name: 'Services', 
          path: '/admin/dashboard?tab=hardware',
          icon: <Wrench size={16} />,
          dropdown: [
            { name: 'Hardware Repair', path: '/admin/dashboard?tab=hardware', icon: <HardDrive size={15} /> },
            { name: 'Software Solutions', path: '/admin/dashboard?tab=software', icon: <MonitorSmartphone size={15} /> }
          ]
        },
        { name: 'Accessories', path: '/admin/dashboard?tab=accessories', icon: <ShoppingBag size={16} /> },
        { name: 'Reviews', path: '/admin/dashboard?tab=reviews', icon: <Star size={16} /> },
        { name: 'Settings', path: '/admin/dashboard?tab=settings', icon: <Settings size={16} /> },
        { name: 'Logout', path: '/logout', icon: <LogOut size={16} /> }
      ];
    }
    if (path === '/superadmin/dashboard') {
      return [
        { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={16} /> },
        { name: 'Return to Site', path: '/', icon: <Home size={16} /> }
      ];
    }
    if (path === '/admin' || path === '/superadmin') {
      return [
        { name: 'Return to Main Website', path: '/', icon: <Home size={16} /> }
      ];
    }
    return [
      { name: 'Home', path: '/', icon: <Home size={16} /> },
      { name: 'Services', path: '/services', icon: <Wrench size={16} /> },
      { name: 'About Us', path: '/about', icon: <Info size={16} /> },
      { name: 'Contact', path: '/contact', icon: <Phone size={16} /> }
    ];
  };

  const navLinks = getNavLinks();

  const isLinkActive = (link) => {
    if (link.dropdown) {
      return link.dropdown.some(sub => isLinkActive(sub));
    }
    const currentPath = location.pathname + location.search;
    if (link.path === '/admin/dashboard?tab=overview' && location.pathname === '/admin/dashboard' && !location.search) {
      return true;
    }
    return currentPath === link.path;
  };

  const handleLinkClick = (e, path) => {
    if (path === '/logout') {
      e.preventDefault();
      sessionStorage.removeItem('isAdminLoggedIn');
      sessionStorage.removeItem('isSuperAdminLoggedIn');
      toast.success('Logged out successfully!', {
        style: {
          background: 'var(--glass-bg)',
          color: 'var(--text-primary)',
          border: 'var(--glass-border)',
        }
      });
      navigate('/admin');
      setMobileMenuOpen(false);
    } else if (path === '#') {
      e.preventDefault();
    } else {
      setMobileMenuOpen(false);
    }
  };

  const [hoveredPath, setHoveredPath] = useState(location.pathname + location.search);

  // Sync hover state with active location when not hovering
  useEffect(() => {
    setHoveredPath(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${showBanner ? 'has-banner' : ''}`}>
      <div className="navbar-container">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        <Link to="/" className="logo">
          <Smartphone className="logo-icon" />
          <span className="logo-text">Sakthi <span className="gradient-text-cyan">Mobiles</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" onMouseLeave={() => setHoveredPath(location.pathname + location.search)}>
          {navLinks.map((link) => {
            const isActive = isLinkActive(link);
            if (link.dropdown) {
              return (
                <div key={link.name} className="nav-dropdown-container">
                  <button 
                    className={`nav-link dropdown-trigger ${isActive ? 'active' : ''}`}
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', outline: 'none' }}
                  >
                    <span className="nav-link-icon">{link.icon}</span>
                    {link.name} <span className="dropdown-arrow" style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                  </button>
                  <div className={`nav-dropdown-menu ${servicesDropdownOpen ? 'show' : ''}`}>
                    {link.dropdown.map((sublink) => (
                      <Link 
                        key={sublink.name} 
                        to={sublink.path} 
                        className={`dropdown-item ${isLinkActive(sublink) ? 'active' : ''}`}
                        onClick={(e) => { setServicesDropdownOpen(false); handleLinkClick(e, sublink.path); }}
                      >
                        <span className="dropdown-icon">{sublink.icon}</span> {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setHoveredPath(link.path)}
                onClick={(e) => handleLinkClick(e, link.path)}
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
                <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {link.icon && <span className="nav-link-icon">{link.icon}</span>}
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>

    {/* Mobile Menu Backdrop and Sidebar Drawer */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Side Drawer */}
          <motion.div 
            className="mobile-sidebar glass-panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close Button Header */}
            <div className="sidebar-header">
              <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
                <Smartphone className="logo-icon" />
                <span className="logo-text">Sakthi <span className="gradient-text-cyan">Mobiles</span></span>
              </Link>
              <button 
                className="sidebar-close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="sidebar-menu">
              {navLinks.map((link, idx) => {
                const isActive = isLinkActive(link);
                if (link.dropdown) {
                  return (
                    <div key={link.name} className="sidebar-dropdown-container">
                      <button 
                        className={`sidebar-nav-link dropdown-trigger ${isActive ? 'active' : ''}`}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        style={{ background: 'none', border: 'none', font: 'inherit', width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', outline: 'none' }}
                      >
                        <span>{link.name}</span>
                        <span style={{ fontSize: '0.8rem', transition: 'transform 0.2s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)', color: 'var(--accent-cyan)' }}>▼</span>
                      </button>
                      
                      <div 
                        className="sidebar-dropdown-menu"
                        style={{ 
                          height: mobileServicesOpen ? 'auto' : 0, 
                          opacity: mobileServicesOpen ? 1 : 0, 
                          overflow: 'hidden', 
                          paddingLeft: '15px',
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        {link.dropdown.map((sublink) => (
                          <Link 
                            key={sublink.name} 
                            to={sublink.path} 
                            className={`sidebar-nav-link sub-link ${isLinkActive(sublink) ? 'active' : ''}`}
                            onClick={(e) => { setMobileMenuOpen(false); setMobileServicesOpen(false); handleLinkClick(e, sublink.path); }}
                          >
                            <span style={{ marginRight: '8px' }}>{sublink.icon}</span>
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.path)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Details */}
            {!loading && settings && (
              <div className="sidebar-footer">
                <a 
                  href="https://www.instagram.com/sakthi_mobiles_sss?igsh=bTV0NGxxOHhmeHJp" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    marginBottom: '12px',
                    boxShadow: '0 4px 15px rgba(220, 39, 67, 0.3)'
                  }}
                >
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg> Follow on Instagram
                </a>
                <p className="footer-copyright">Crafted by Sakthi Mobiles</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
