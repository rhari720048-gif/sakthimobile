import React from 'react';
import { Sparkles, Smartphone, Camera, Aperture, Zap, BatteryCharging, Rocket, Gamepad2, PhoneCall, ShieldCheck, Cpu, Hexagon } from 'lucide-react';
import './BrandCarousel.css';

const brands = [
  { name: "Apple", icon: <Smartphone size={16} color="var(--accent-color)" /> },
  { name: "Samsung", icon: <Camera size={16} color="var(--accent-color)" /> },
  { name: "Vivo", icon: <Aperture size={16} color="var(--accent-color)" /> },
  { name: "Oppo", icon: <Camera size={16} color="var(--accent-color)" /> },
  { name: "OnePlus", icon: <Zap size={16} color="var(--accent-color)" /> },
  { name: "Xiaomi", icon: <BatteryCharging size={16} color="var(--accent-color)" /> },
  { name: "Realme", icon: <Rocket size={16} color="var(--accent-color)" /> },
  { name: "Poco", icon: <Gamepad2 size={16} color="var(--accent-color)" /> },
  { name: "Moto", icon: <PhoneCall size={16} color="var(--accent-color)" /> },
  { name: "Nokia", icon: <ShieldCheck size={16} color="var(--accent-color)" /> },
  { name: "iQOO", icon: <Cpu size={16} color="var(--accent-color)" /> },
  { name: "Nothing", icon: <Hexagon size={16} color="var(--accent-color)" /> }
];

const BrandCarousel = () => {
  return (
    <div className="brand-carousel-section">
      <p className="carousel-title"><Sparkles size={18} color="var(--accent-color)" style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} /> All Brands Supported <Sparkles size={18} color="var(--accent-color)" style={{ verticalAlign: 'text-bottom', marginLeft: '8px' }} /></p>
      <div className="brand-slider">
        <div className="brand-track">
          {/* Double the array for infinite scrolling effect */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="brand-item">
              <span style={{ marginRight: '8px', display: 'flex' }}>{brand.icon}</span> {brand.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
