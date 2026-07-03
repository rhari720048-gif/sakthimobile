import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wrench, Cpu, Headphones, Truck, ArrowRight, Activity, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';
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
  const [customServices, setCustomServices] = useState([]);
  const [customAccessories, setCustomAccessories] = useState([]);

  useEffect(() => {
    const unsubscribeServices = onSnapshot(collection(db, 'services'), (querySnapshot) => {
      const custom = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomServices(custom);
    }, (error) => {
      console.error("Error fetching services:", error);
    });

    const unsubscribeAccessories = onSnapshot(collection(db, 'accessories'), (querySnapshot) => {
      const acc = querySnapshot.docs.map(doc => ({ id: doc.id, category: 'accessories', ...doc.data() }));
      setCustomAccessories(acc);
    }, (error) => {
      console.error("Error fetching accessories:", error);
    });

    return () => {
      unsubscribeServices();
      unsubscribeAccessories();
    };
  }, []);

  useEffect(() => {
    if (location.state?.openService && customServices.length > 0) {
      const serviceToOpen = customServices.find(s => s.name === location.state.openService);
      if (serviceToOpen) {
        navigate('/service/' + serviceToOpen.id, { state: { service: serviceToOpen } });
      }
    }
  }, [location.state?.openService, customServices, navigate]);

  const combinedServices = [
    ...customServices.filter(s => s.category !== 'accessories'), 
    ...customAccessories
  ];

  const currentTabServices = combinedServices.filter(s => s.category === activeTab);
  const displayedServices = limit ? currentTabServices.slice(0, limit) : currentTabServices;

  const { settings, loading } = useSettings();
  
  if (loading) return null;

  if (loading) return null;

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
                <TiltCard key={index} className="spotlight-card-style glass-panel" style={{ cursor: 'pointer' }}>
                  <div 
                    onClick={() => navigate('/service/' + service.id, { state: { service } })}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    {service.imageUrl ? (
                      <div className="s-card-image-wrapper">
                        <img src={service.imageUrl} alt={service.name} className="s-card-image" />
                        <div className="s-card-premium-badge">
                          <ShieldCheck size={14} /> Verified
                        </div>
                      </div>
                    ) : (
                      <div className="s-card-icon-header">
                        <div className="s-card-animated-bg"></div>
                        <div className="s-card-icon-wrapper">
                          {service.category === 'hardware' && <Wrench size={24} color="var(--accent-cyan)" />}
                          {service.category === 'software' && <Cpu size={24} color="var(--accent-cyan)" />}
                          {service.category === 'accessories' && <Headphones size={24} color="var(--accent-cyan)" />}
                        </div>
                        <div className="s-card-premium-badge">
                          <ShieldCheck size={14} /> Verified
                        </div>
                      </div>
                    )}
                    <div className="s-card-body">
                      <div className="s-card-content-top">
                        <h4 className="s-card-title">{service.name}</h4>
                        <p className="s-card-desc">{service.desc || "Professional service guaranteed with quick turnaround."}</p>
                      </div>
                      
                      {/* New Animated Pipeline Graphic to fill empty space */}
                      <div className="s-card-pipeline">
                        <div className="pipeline-step"><Activity size={14} /> Diagnose</div>
                        <div className="pipeline-line"></div>
                        <div className="pipeline-step"><Wrench size={14} /> Repair</div>
                        <div className="pipeline-line"></div>
                        <div className="pipeline-step"><CheckCircle size={14} /> Test</div>
                      </div>
                      
                      <div className="s-card-action">
                        <button className="s-card-quote-button">
                          Get Quote <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
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
          <MagneticButton>
            <a href="#contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: '30px', background: 'var(--text-primary)', color: 'var(--bg-main)', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Courier
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
