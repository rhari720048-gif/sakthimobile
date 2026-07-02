import React from 'react';
import { Sparkles, Smartphone, Camera, Aperture, Zap, BatteryCharging, Rocket, Gamepad2, PhoneCall, ShieldCheck, Cpu, Hexagon } from 'lucide-react';
import './BrandCarousel.css';

const brands = [
  { name: "Apple", icon: <Smartphone size={16} color="var(--accent-cyan)" /> },
  { name: "Samsung", icon: <Camera size={16} color="var(--accent-gold)" /> },
  { name: "Vivo", icon: <Aperture size={16} color="var(--accent-cyan)" /> },
  { name: "Oppo", icon: <Camera size={16} color="var(--accent-gold)" /> },
  { name: "OnePlus", icon: <Zap size={16} color="var(--accent-cyan)" /> },
  { name: "Xiaomi", icon: <BatteryCharging size={16} color="var(--accent-gold)" /> },
  { name: "Realme", icon: <Rocket size={16} color="var(--accent-cyan)" /> },
  { name: "Poco", icon: <Gamepad2 size={16} color="var(--accent-gold)" /> },
  { name: "Moto", icon: <PhoneCall size={16} color="var(--accent-cyan)" /> },
  { name: "Nokia", icon: <ShieldCheck size={16} color="var(--accent-gold)" /> },
  { name: "iQOO", icon: <Cpu size={16} color="var(--accent-cyan)" /> },
  { name: "Nothing", icon: <Hexagon size={16} color="var(--accent-gold)" /> }
];

const BrandCarousel = () => {
  return (
    <div className="brand-carousel-section">
      <p className="carousel-title">
        <Sparkles size={18} color="var(--accent-gold)" style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} /> 
        All Brands Supported 
        <Sparkles size={18} color="var(--accent-gold)" style={{ verticalAlign: 'text-bottom', marginLeft: '8px' }} />
      </p>
      <div className="brand-slider">
        <div className="brand-track">
          {/* Double the array for infinite scrolling effect */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="brand-item glass-panel">
              <span className="brand-icon">{brand.icon}</span> {brand.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
