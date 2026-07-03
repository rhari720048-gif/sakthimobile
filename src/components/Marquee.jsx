import React from 'react';
import { Star, ShieldCheck, Zap, Wrench } from 'lucide-react';
import './Marquee.css';

const Marquee = () => {
  const items = [
    { text: "Premium Quality Repairs", icon: <Star size={20} className="marquee-icon" /> },
    { text: "Genuine Spare Parts", icon: <ShieldCheck size={20} className="marquee-icon" /> },
    { text: "Fast Turnaround Time", icon: <Zap size={20} className="marquee-icon" /> },
    { text: "Expert Technicians", icon: <Wrench size={20} className="marquee-icon" /> },
    { text: "Warranty Guaranteed", icon: <ShieldCheck size={20} className="marquee-icon" /> }
  ];

  // Duplicate items to ensure seamless infinite scroll
  const scrollItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {scrollItems.map((item, index) => (
          <div className="marquee-item" key={index}>
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
