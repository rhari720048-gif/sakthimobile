import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phoneNumber = "+919876543210"; // Replace with actual shop number later
  const message = "Hi Sakthi Mobiles, ennaku oru service query irukku...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-floating-btn" aria-label="Chat on WhatsApp">
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppButton;
