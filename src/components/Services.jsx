import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wrench, Cpu, Headphones, Truck, ArrowRight, Activity, CheckCircle, ShieldCheck, Clock, HardDrive } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import './Services.css';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { isVideoUrl } from '../utils/media';

const categories = [
  { id: 'hardware', label: 'Hardware Repair', subtitle: 'Display, Battery, ICs', icon: <Wrench size={20} /> },
  { id: 'software', label: 'Software Solutions', subtitle: 'OS, Flashing, Unlocks', icon: <Cpu size={20} /> },
  { id: 'accessories', label: 'Accessories & Sales', subtitle: 'Cases, Chargers, TWS', icon: <Headphones size={20} /> },
  { id: 'seconds', label: 'Seconds Mobiles', subtitle: 'Certified Used Phones', icon: <Smartphone size={20} /> }
];

const Services = ({ limit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hardware');
  const [customServices, setCustomServices] = useState([]);
  const [customAccessories, setCustomAccessories] = useState([]);
  const [secondsMobiles, setSecondsMobiles] = useState([]);

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

    const unsubscribeSeconds = onSnapshot(collection(db, 'seconds_mobiles'), (querySnapshot) => {
      const mob = querySnapshot.docs.map(doc => ({ id: doc.id, category: 'seconds', ...doc.data() }));
      setSecondsMobiles(mob);
    }, (error) => {
      console.error("Error fetching seconds mobiles:", error);
    });

    return () => {
      unsubscribeServices();
      unsubscribeAccessories();
      unsubscribeSeconds();
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
    ...customAccessories,
    ...secondsMobiles
  ];

  const currentTabServices = combinedServices.filter(s => s.category === activeTab);
  const displayedServices = limit ? currentTabServices.slice(0, limit) : currentTabServices;

  const handleCourierClick = (e) => {
    e.preventDefault();
    const phoneNumber = settings?.phone || "917373472735";
    const message = `Hello Sakthi Mobiles! 📦\n\nI want to send my mobile phone via *Courier Service* for repair from my city.\n\nPlease share your shop courier address and service instructions!`;
    trackWhatsAppClick('book_courier');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
            Our Mobile <span className="gradient-text-gold">Repair Services</span>
          </h2>
          <p>Display Replacement, Glass Replacement, IC Level Repair, Software Flashing & Quality Second-Hand Mobiles in Srivilliputhur.</p>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'seconds' ? (
                <div className="services-table-wrapper glass-panel">
                  <table className="services-table">
                    <thead>
                      <tr>
                        <th>Phone Model</th>
                        <th>Specs / Storage</th>
                        <th>Condition</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedServices.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <Smartphone size={20} color="var(--accent-cyan)" />
                              <span>No second-hand mobiles currently available for sale. Please check back soon or contact us!</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        displayedServices.map((phone) => (
                          <tr 
                            key={phone.id} 
                            className="premium-table-row"
                            onClick={() => navigate(`/seconds-mobile/${phone.id}`, { state: { phone } })}
                            style={{ cursor: 'pointer' }}
                          >
                            <td className="service-cell">
                              <div className="table-img-container">
                                {phone.imageUrl ? (
                                  isVideoUrl(phone.imageUrl) ? (
                                    <video src={phone.imageUrl} autoPlay loop muted playsInline className="table-service-img" />
                                  ) : (
                                    <img src={phone.imageUrl} alt={phone.model || phone.name} className="table-service-img" />
                                  )
                                ) : (
                                  <div className="table-service-icon">
                                    <Smartphone size={20} color="var(--accent-cyan)" />
                                  </div>
                                )}
                              </div>
                              <div className="name-container">
                                <span className="table-service-name">
                                  {phone.brand ? `${phone.brand} ${phone.model || phone.name}` : (phone.model || phone.name)}
                                </span>
                                <span className="category-badge" style={{ backgroundColor: 'rgba(212, 175, 55, 0.12)', color: 'var(--accent-gold)' }}>
                                  Certified Used
                                </span>
                              </div>
                            </td>
                            <td className="desc-cell">
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                <HardDrive size={14} color="var(--accent-cyan)" /> Storage: {phone.storage || 'N/A'}
                              </span>
                            </td>
                            <td className="desc-cell">
                              <p className="table-service-desc">{phone.condition || "Tested & verified working condition."}</p>
                            </td>
                            <td className="status-cell">
                              <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                                {phone.price ? (phone.price.startsWith('₹') ? phone.price : `₹${phone.price}`) : 'Ask Price'}
                              </span>
                            </td>
                            <td className="action-cell">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/seconds-mobile/${phone.id}`, { state: { phone } });
                                }}
                                className="table-quote-btn-premium"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                              >
                                <span>View Details</span>
                                <ArrowRight size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="services-table-wrapper glass-panel">
                  <table className="services-table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Process</th>
                        <th>Quality</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedServices.map((service) => {
                        let categoryTagColor = 'rgba(6, 182, 212, 0.08)';
                        let categoryTagText = 'Hardware';
                        let estTime = '1-2 Hours';
                        
                        if (service.category === 'software') {
                          categoryTagColor = 'rgba(212, 175, 55, 0.08)';
                          categoryTagText = 'Software';
                          estTime = '30 Mins';
                        } else if (service.category === 'accessories') {
                          categoryTagColor = 'rgba(16, 185, 129, 0.08)';
                          categoryTagText = 'Accessory';
                          estTime = 'Instant';
                        }

                        return (
                          <tr 
                            key={service.id} 
                            onClick={() => navigate('/service/' + service.id, { state: { service } })}
                            className="premium-table-row"
                          >
                            <td className="service-cell">
                              <div className="table-img-container">
                                {service.imageUrl ? (
                                  <img src={service.imageUrl} alt={`${service.name} in Srivilliputhur - Display Replacement & IC Level Mobile Repair Shop`} className="table-service-img" />
                                ) : (
                                  <div className="table-service-icon">
                                    {service.category === 'hardware' && <Wrench size={20} color="var(--accent-cyan)" />}
                                    {service.category === 'software' && <Cpu size={20} color="var(--accent-cyan)" />}
                                    {service.category === 'accessories' && <Headphones size={20} color="var(--accent-cyan)" />}
                                  </div>
                                )}
                              </div>
                              <div className="name-container">
                                <span className="table-service-name">{service.name}</span>
                                <span className="category-badge" style={{ backgroundColor: categoryTagColor }}>
                                  {categoryTagText}
                                </span>
                              </div>
                            </td>
                            <td className="desc-cell">
                              <p className="table-service-desc">{service.desc || "Professional service guaranteed with quick turnaround."}</p>
                              <span className="est-time-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={12} color="var(--accent-cyan)" /> Est. Time: {estTime}
                              </span>
                            </td>
                            <td className="process-cell">
                              <div className="table-pipeline-v2">
                                <div className="pipeline-node active">
                                  <span className="node-dot"></span>
                                  <span className="node-label">Diagnose</span>
                                </div>
                                <div className="pipeline-connector"></div>
                                <div className="pipeline-node active">
                                  <span className="node-dot"></span>
                                  <span className="node-label">Repair</span>
                                </div>
                                <div className="pipeline-connector"></div>
                                <div className="pipeline-node active">
                                  <span className="node-dot"></span>
                                  <span className="node-label">Test</span>
                                </div>
                              </div>
                            </td>
                            <td className="status-cell">
                              <span className="table-badge verified"><ShieldCheck size={12} /> Verified</span>
                            </td>
                            <td className="action-cell">
                              <button className="table-quote-btn-premium">
                                <span>Get Quote</span>
                                <ArrowRight size={14} className="arrow-icon" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {limit && (
                <div className="view-all-table-container">
                  <Link to="/services" className="view-all-table-btn">
                    View All Services <ArrowRight size={18} style={{ marginLeft: '6px' }} />
                  </Link>
                </div>
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
            <a 
              href="#courier" 
              onClick={handleCourierClick}
              style={{ 
                display: 'inline-block', 
                padding: '14px 28px', 
                borderRadius: '30px', 
                background: 'linear-gradient(135deg, var(--accent-cyan) 0%, #0891b2 50%, var(--accent-gold) 100%)', 
                color: '#ffffff', 
                textDecoration: 'none', 
                fontWeight: '700',
                fontFamily: "'Outfit', sans-serif",
                boxShadow: '0 8px 20px rgba(6, 182, 212, 0.25)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              📦 Book Courier Service
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
