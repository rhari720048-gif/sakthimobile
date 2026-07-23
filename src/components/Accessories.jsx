import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { ShoppingBag, Headphones, Battery, Smartphone, Cable } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import { isVideoUrl } from '../utils/media';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';
import './Accessories.css';

const getIcon = (iconName) => {
  switch(iconName) {
    case 'Headphones': return <Headphones size={24} />;
    case 'Battery': return <Battery size={24} />;
    case 'Smartphone': return <Smartphone size={24} />;
    case 'Cable': return <Cable size={24} />;
    default: return <ShoppingBag size={24} />;
  }
};

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const { settings } = useSettings();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'accessories'), (snapshot) => {
      const accList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAccessories(accList.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    });
    return () => unsubscribe();
  }, []);

  if (accessories.length === 0) return null;

  return (
    <section id="accessories" className="accessories-section">
      <div className="container">
        <div className="section-header">
          <h2>Premium <span className="gradient-text-cyan">Accessories</span></h2>
          <p>We stock high-quality accessories to keep your devices running smoothly and looking great.</p>
        </div>

        <div className="accessories-grid">
          {accessories.map((item) => (
            <TiltCard key={item.id} className="accessory-card glass-panel" maxTilt={12}>
              <div>
                {item.imageUrl ? (
                  <div className="acc-image-wrapper">
                    {isVideoUrl(item.imageUrl) ? (
                      <video src={item.imageUrl} autoPlay loop muted playsInline className="acc-image" />
                    ) : (
                      <img src={item.imageUrl} alt={item.name} className="acc-image" />
                    )}
                  </div>
                ) : (
                  <div className="acc-icon-wrapper">
                    {getIcon(item.icon)}
                  </div>
                )}
                <div className="acc-body">
                  <h3 className="acc-name">{item.name}</h3>
                  <p className="acc-desc">{item.desc}</p>
                  
                  <div className="acc-footer">
                    {item.price && <span className="acc-price">₹{item.price}</span>}
                    <MagneticButton>
                      <a 
                        href={`https://wa.me/${settings.phone}?text=${encodeURIComponent(`Hi, I'm interested in buying ${item.name} from your store.`)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="buy-btn"
                        onClick={trackWhatsAppClick}
                        style={{ display: 'inline-block' }}
                      >
                        Buy Now
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accessories;
