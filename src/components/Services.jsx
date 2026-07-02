import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wrench, Cpu, Headphones, Truck, ArrowRight, X, MessageCircle, Info } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextReveal from './TextReveal';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import './Services.css';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const categories = [
  { id: 'hardware', label: 'Hardware Repair', subtitle: 'Display, Battery, ICs', icon: <Wrench size={20} /> },
  { id: 'software', label: 'Software Solutions', subtitle: 'OS, Flashing, Unlocks', icon: <Cpu size={20} /> },
  { id: 'accessories', label: 'Accessories & Sales', subtitle: 'Cases, Chargers, TWS', icon: <Headphones size={20} /> }
];

const Services = ({ limit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hardware');
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerIssue, setCustomerIssue] = useState('');
  const [customServices, setCustomServices] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (querySnapshot) => {
      const custom = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomServices(custom);
    }, (error) => {
      console.error("Error fetching custom services:", error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (location.state?.openService && customServices.length > 0) {
      const serviceToOpen = customServices.find(s => s.name === location.state.openService);
      if (serviceToOpen) {
        handleOpenModal(serviceToOpen);
        setActiveTab(serviceToOpen.category);
        
        // Reset the state safely using React Router
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state?.openService, customServices]);

  const currentTabServices = customServices.filter(s => s.category === activeTab);
  const displayedServices = limit ? currentTabServices.slice(0, limit) : currentTabServices;

  const { settings, loading } = useSettings();
  
  if (loading) return null;

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setShowForm(false);
    setCustomerName('');
    setCustomerCity('');
    setCustomerIssue('');
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerCity) return;

    const message = `Hi Sakthi Mobiles,\n\nI need a quote for a service.\n\n*--- Service Details ---*\n*Service:* ${selectedService.name}\n*Description:* ${selectedService.desc}\n\n*--- My Details ---*\n*Name:* ${customerName}\n*City:* ${customerCity}${customerIssue ? `\n*Issue:* ${customerIssue}` : ''}\n\nPlease let me know the quote and further details.`;
    const whatsappUrl = `https://wa.me/${settings.phone}?text=${encodeURIComponent(message)}`;
    
    trackWhatsAppClick();
    window.open(whatsappUrl, '_blank');
    handleCloseModal();
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <TextReveal text={<>Premium <span className="gradient-text-gold">Services</span></>} />
          <p>Professional, reliable, and swift solutions for all your mobile needs.</p>
        </div>

        {/* Modern Animated Tabs */}
        <div className="tabs-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn glass-panel ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {activeTab === cat.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="active-tab-bg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="tab-content-wrapper">
                <div className="tab-icon">{cat.icon}</div>
                <div className="tab-text">
                  <h3>{cat.label}</h3>
                  <span>{cat.subtitle}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Services Group */}
        <div className="vertical-services-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="vertical-services-grid"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {displayedServices.map((service, index) => (
                <div 
                  key={index} 
                  className="spotlight-card-style glass-panel"
                  onClick={() => handleOpenModal(service)}
                >
                  <div className="s-card-content-top">
                    <div className="s-card-icon-wrapper">
                      <Smartphone size={24} color="var(--accent-cyan)" />
                    </div>
                    <h4 className="s-card-title">{service.name}</h4>
                    <p className="s-card-desc">{service.desc}</p>
                  </div>
                  
                  <div className="s-card-action">
                    <button className="s-card-quote-button">
                      Get Quote <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              {limit && (
                <Link to="/services" style={{ textDecoration: 'none' }}>
                  <div 
                    className="spotlight-card-style glass-panel view-all-card"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(6, 182, 212, 0.05)', border: '2px dashed rgba(6, 182, 212, 0.3)' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', color: 'var(--accent-cyan)', textAlign: 'center' }}>
                      <div style={{ padding: '20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%' }}>
                        <ArrowRight size={40} />
                      </div>
                      <h3 style={{ fontSize: '1.4rem' }}>View All Services</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>Explore full range</p>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Courier Banner */}
        <motion.div 
          className="courier-banner glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="courier-icon">
            <Truck size={40} color="var(--accent-cyan)" />
          </div>
          <div className="courier-content">
            <h3>Courier Service Available!</h3>
            <p>You can courier your broken mobile to us from anywhere in Tamil Nadu. We will fix it and courier it back to you safely!</p>
          </div>
          <a href="#contact" className="btn-primary" style={{ padding: '12px 24px', borderRadius: '30px', background: 'var(--text-primary)', color: 'var(--bg-main)', textDecoration: 'none', fontWeight: 'bold' }}>
            Book Courier
          </a>
        </motion.div>
      </div>

      {/* Service Details & WhatsApp Form Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="service-modal-content glass-panel"
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <div className="modal-icon-wrapper">
                  <Smartphone size={32} color="var(--accent-cyan)" />
                </div>
                <h2>{selectedService.name}</h2>
              </div>

              {!showForm ? (
                <motion.div 
                  className="modal-details-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="modal-info-box">
                    <Info size={20} color="var(--accent-gold)" className="info-icon" />
                    <p className="modal-detailed-desc">{selectedService.details}</p>
                  </div>
                  
                  <button 
                    className="whatsapp-enroll-btn mt-4"
                    onClick={() => setShowForm(true)}
                  >
                    <MessageCircle size={20} />
                    Enquire on WhatsApp
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  className="whatsapp-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleWhatsAppSubmit}
                >
                  <p className="form-helper-text">Please provide your details so our technicians can prepare your quote.</p>
                  
                  <div className="input-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Your City *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Srivilliputhur"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Any Specific Issue? (Optional)</label>
                    <textarea 
                      placeholder="e.g. Screen is completely blank but phone rings"
                      value={customerIssue}
                      onChange={(e) => setCustomerIssue(e.target.value)}
                      rows={2}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        borderRadius: '12px', 
                        background: 'rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <button type="submit" className="whatsapp-submit-btn">
                    Submit to WhatsApp <ArrowRight size={18} />
                  </button>
                  <button type="button" className="back-btn" onClick={() => setShowForm(false)}>
                    Back to Details
                  </button>
                </motion.form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
