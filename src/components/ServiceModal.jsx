import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight, User, MapPin, HelpCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import './ServiceModal.css';

const ServiceModal = ({ service, category, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', city: '', issue: '' });
  const [error, setError] = useState('');
  const { settings } = useSettings();

  if (!service) return null;

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.city.trim()) {
      setError('Name and City are required!');
      return;
    }
    setError('');

    // Construct WhatsApp Message
    const phoneNumber = settings?.phone || "917373472735";
    const message = `Hello Sakthi Mobiles!\n\nI need more details about:\n*Service:* ${service.name}\n*Category:* ${category}\n\n*My Details:*\nName: ${formData.name}\nCity: ${formData.city}\n${formData.issue ? `Issue Details: ${formData.issue}\n` : ''}\nCould you please provide more information?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>

          {step === 1 ? (
            <motion.div 
              className="modal-step"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <div className="modal-header">
                <span className="category-badge">{category}</span>
                <h2>{service.name}</h2>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                  Have questions about this service? Get an exact quote and details instantly from our experts.
                </p>
                <ul className="service-benefits">
                  <li><img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }} /> Free Diagnosis & Consultation</li>
                  <li><img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }} /> Ask about Parts Availability</li>
                  <li><img src="/favicon.svg" alt="icon" style={{ width: '1em', height: '1em', display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }} /> Get Exact Pricing</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="glass-button primary w-full justify-center" onClick={handleNext}>
                  Ask for Details <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="modal-step"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="modal-header">
                <h2>Your Details</h2>
                <p>Provide a few details so our expert can assist you better.</p>
              </div>
              <div className="modal-body">
                <form id="inquiry-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      autoFocus
                    />
                  </div>
                  <div className="input-group">
                    <MapPin size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Your City / Area *" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="input-group">
                    <HelpCircle size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Any specific issue? (Optional)" 
                      value={formData.issue}
                      onChange={(e) => setFormData({...formData, issue: e.target.value})}
                    />
                  </div>
                  {error && <div className="error-text">{error}</div>}
                </form>
              </div>
              <div className="modal-footer" style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="glass-button" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" form="inquiry-form" className="glass-button primary w-full justify-center">
                  <MessageCircle size={18} /> Chat with Expert
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceModal;
