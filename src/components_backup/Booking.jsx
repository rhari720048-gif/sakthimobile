import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import './Booking.css';

const Booking = () => {
  const [brand, setBrand] = useState('');
  const [issue, setIssue] = useState('');

  const handleBooking = (e) => {
    e.preventDefault();
    const message = `Hi Sakthi Mobiles! Ennoda phone (${brand}) la prachana irukku. Issue: ${issue}. Itha eppo kondu varalam?`;
    const whatsappUrl = `https://wa.me/917373472735?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="booking" className="booking-section">
      <div className="container">
        <motion.div 
          className="booking-container glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="booking-content">
            <h2>Quick <span className="text-gradient">Service Request</span></h2>
            <p>Unga mobile details-a select panni direct-a WhatsApp-la pesunga.</p>
          </div>

          <form className="booking-form" onSubmit={handleBooking}>
            <div className="form-group">
              <label>Mobile Brand & Model</label>
              <input 
                type="text" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
                className="glass-input" 
                placeholder="Ex: iPhone 13, Vivo V27..."
                required
              />
            </div>

            <div className="form-group">
              <label>Enna Prachana?</label>
              <input 
                type="text" 
                value={issue} 
                onChange={(e) => setIssue(e.target.value)} 
                className="glass-input" 
                placeholder="Ex: Display odanchiduchu, battery problem..."
                required
              />
            </div>

            <button type="submit" className="glass-button primary booking-btn">
              <MessageSquare size={18} /> Send to WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
