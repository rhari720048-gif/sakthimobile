import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Cpu, Code, ShoppingBag, Truck, Wrench, Terminal, Headphones, ArrowRight } from 'lucide-react';
import './Services.css';

const Services = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  const categories = [
    { id: 'hardware', icon: <Smartphone />, label: 'Hardware Service', subtitle: 'Display, Battery, etc.' },
    { id: 'motherboard', icon: <Cpu />, label: 'Motherboard', subtitle: 'IC, Phone Dead' },
    { id: 'software', icon: <Code />, label: 'Software', subtitle: 'OS, Lock Remove' },
    { id: 'accessories', icon: <ShoppingBag />, label: 'Accessories', subtitle: 'Sales & Exchange' }
  ];

  const servicesData = {
    hardware: [
      { name: "Display Replacement", price: "₹1200" },
      { name: "Touch Screen Replacement", price: "₹600" },
      { name: "LCD / OLED Display Change", price: "₹1500" },
      { name: "Back Glass Replacement", price: "₹400" },
      { name: "Battery Replacement", price: "₹600" },
      { name: "Charging Pin Replacement", price: "₹250" },
      { name: "Speaker Replacement", price: "₹250" },
      { name: "Earpiece Replacement", price: "₹250" },
      { name: "Microphone Replacement", price: "₹250" },
      { name: "Ringer / Buzzer Replacement", price: "₹250" },
      { name: "Camera Replacement", price: "₹450" },
      { name: "Camera Glass Replacement", price: "₹150" },
      { name: "Power / Volume Button Repair", price: "₹250" },
      { name: "Fingerprint Sensor Repair", price: "₹350" },
      { name: "Face ID Diagnosis", price: "Free" },
      { name: "SIM / Memory Card Slot Repair", price: "₹300" },
      { name: "Vibration Motor Replacement", price: "₹250" }
    ],
    motherboard: [
      { name: "IC Level Repair", price: "₹800" },
      { name: "Phone Dead Repair", price: "₹600" },
      { name: "Water Damage Service", price: "₹500" },
      { name: "Short Circuit Repair", price: "₹500" },
      { name: "No Display Issue", price: "₹600" },
      { name: "No Charging Issue", price: "₹450" },
      { name: "No Network Issue", price: "₹450" },
      { name: "Wi-Fi & Bluetooth Issue", price: "₹450" },
      { name: "Auto Restart / Boot Loop Fix", price: "₹450" },
      { name: "Hanging / Slow Performance Fix", price: "₹300" }
    ],
    software: [
      { name: "Software Flash", price: "₹300" },
      { name: "OS Update / Reinstallation", price: "₹250" },
      { name: "FRP Lock Remove", price: "₹350" },
      { name: "Pattern / PIN Lock Remove", price: "₹300" },
      { name: "Data Backup & Transfer", price: "₹200" },
      { name: "Data Recovery", price: "₹500" },
      { name: "Virus Removal", price: "₹200" },
      { name: "Google Account Setup", price: "Free" },
      { name: "iCloud / Apple ID Setup", price: "₹150" }
    ],
    accessories: [
      { name: "Tempered Glass & Covers", price: "₹99" },
      { name: "Chargers & USB Cables", price: "₹199" },
      { name: "Earphones / TWS", price: "₹299" },
      { name: "Smart Watch Sales", price: "₹800" },
      { name: "Mobile Cleaning & Health Check", price: "Free" },
      { name: "Mobile Exchange", price: "Best Price" },
      { name: "Used Mobile Buy & Sell", price: "Best Price" }
    ]
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Enga <span className="text-gradient">Services</span></h2>
          <p>Local market-la ye romba low starting price-la pakka-va ready pannidalam.</p>
        </div>

        {/* Standard Spatial UI Tabs */}
        {/* Modern Animated Tabs */}
        <div className="tabs-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn glass-panel ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {activeTab === cat.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="active-tab-bg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="tab-content-wrapper" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className="tab-icon">{cat.icon}</div>
                <div className="tab-text" style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{cat.label}</h3>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{cat.subtitle}</span>
                </div>
              </div>
            </button>
          ))}
        </div>



        {/* Horizontal Scroll with 3D Stagger Reveal */}
        <div className="horizontal-services-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.03 } },
                exit: { opacity: 0, transition: { staggerChildren: 0.01, staggerDirection: -1, duration: 0.1 } }
              }}
              className="horizontal-services-scroll spotlight-hover-group"
            >
              {servicesData[activeTab].map((service, index) => (
                <motion.div 
                  key={index} 
                  className="horizontal-card spotlight-card-style"
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { type: "tween", ease: "easeOut", duration: 0.2 } },
                    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.1 } }
                  }}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  <div className="h-card-bg-glow"></div>
                  
                  <div className="h-card-content-top">
                    <div className="s-card-icon-wrapper">
                      {activeTab === 'hardware' && <Wrench size={28} color="var(--accent-color)" />}
                      {activeTab === 'motherboard' && <Cpu size={28} color="var(--accent-color)" />}
                      {activeTab === 'software' && <Terminal size={28} color="var(--accent-color)" />}
                      {activeTab === 'accessories' && <Headphones size={28} color="var(--accent-color)" />}
                    </div>
                  </div>
                  
                  <div className="h-card-content-bottom">
                    <h4 className="s-card-title">{service.name}</h4>
                    <p className="s-card-subtitle">Expert Service</p>
                    
                    <div className="s-card-price-button">
                      <span className="text-gradient">
                        {service.price === 'Free' || service.price === 'Best Price' ? service.price : `Starting at ${service.price}`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Courier Service Banner */}
        <motion.div
          className="courier-banner glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="courier-icon"><Truck size={40} color="var(--accent-color)" /></div>
          <div className="courier-content">
            <h3>Courier Service Available 📦</h3>
            <p>Neenga vera oorla irukingala? Kavalai vendam. Unga mobile-a enga address-kku courier podunga, service panni safe-a thiruppi anuppuvom.</p>
          </div>
          <a href="#contact" className="glass-button primary">Address Parunga</a>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
