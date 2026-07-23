import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, Smartphone, HardDrive, CheckCircle, ShieldCheck, Tag, Cpu, RefreshCw, Camera, Sliders } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';
import { trackWhatsAppClick } from '../utils/analytics';
import { isVideoUrl } from '../utils/media';
import './SecondMobileDetailsPage.css';

const SecondMobileDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [phone, setPhone] = useState(location.state?.phone || null);
  const [loading, setLoading] = useState(!phone);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPhone = async () => {
      try {
        const docRef = doc(db, 'seconds_mobiles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPhone({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/services');
        }
      } catch (error) {
        console.error("Error fetching phone details:", error);
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    fetchPhone();
  }, [id, navigate]);

  useEffect(() => {
    if (phone) {
      document.title = `Buy ${phone.brand || ''} ${phone.model || phone.name || 'Used Mobile'} in Srivilliputhur | Sakthi Mobiles`;
    }
  }, [phone]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!phone) return null;

  // Build array of available photo/video angles
  const gallery = [];
  if (phone.imageUrl) gallery.push({ key: 'front', label: 'Front View', url: phone.imageUrl, badge: 'FRONT VIEW' });
  if (phone.backImage) gallery.push({ key: 'back', label: 'Back View', url: phone.backImage, badge: 'BACK VIEW' });
  if (phone.leftImage) gallery.push({ key: 'left', label: 'Left Side', url: phone.leftImage, badge: 'LEFT SIDE' });
  if (phone.rightImage) gallery.push({ key: 'right', label: 'Right Side', url: phone.rightImage, badge: 'RIGHT SIDE' });

  // Fallback if no image uploaded
  const activeMedia = gallery[activeImageIndex] || null;

  const handleWhatsAppEnquiry = () => {
    const phoneNumber = settings?.phone || "917373472735";
    const brandName = phone.brand || '';
    const modelName = phone.model || phone.name || 'Mobile Phone';
    const fullModel = `${brandName} ${modelName}`.trim();
    
    let message = `Hello Sakthi Mobiles!\n\n`;
    message += `I am interested in buying this certified second-hand mobile:\n\n`;
    message += `*Device:* ${fullModel}\n`;
    message += `*Storage:* ${phone.storage || 'N/A'}\n`;
    message += `*Price:* ${phone.price || 'Ask Price'}\n`;
    message += `*Condition:* ${phone.condition || 'Good Condition'}\n\n`;
    message += `Is this device currently available in shop for purchase?`;

    trackWhatsAppClick('enquire_second_mobile');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="app-container">
      <main className="second-details-main">
        <div className="second-details-container">
          
          {/* Back Navigation */}
          <button className="second-back-btn" onClick={() => navigate('/services')}>
            <ArrowLeft size={18} /> Back to Used Mobiles
          </button>

          <div className="second-product-grid">
            
            {/* LEFT COLUMN: 4-Angle Interactive Gallery */}
            <div className="second-gallery-section">
              <div className="second-main-stage glass-panel">
                {activeMedia ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="stage-media-wrapper"
                    >
                      <img 
                        src={activeMedia.url} 
                        alt={`${phone.model} - ${activeMedia.label}`} 
                        className="stage-media"
                      />
                      <span className="media-angle-badge">{activeMedia.badge}</span>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="stage-placeholder">
                    <Smartphone size={80} color="var(--accent-cyan)" />
                    <p>No photos available for this device</p>
                  </div>
                )}
              </div>

              {/* Angle Selector Thumbnails */}
              {gallery.length > 0 && (
                <div className="second-thumbnails-grid">
                  {gallery.map((item, idx) => (
                    <button
                      key={item.key}
                      className={`thumbnail-btn glass-panel ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={item.url} alt={item.label} className="thumb-img" />
                      <span className="thumb-label">{item.badge}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Phone Specs & E-Commerce Purchase Card */}
            <div className="second-info-section glass-panel">
              <div className="product-badge-bar">
                <span className="gold-certified-badge">
                  <ShieldCheck size={14} /> Certified Used
                </span>
                <span className="stock-status-badge">
                  <CheckCircle size={14} /> Available in Shop
                </span>
              </div>

              <h1 className="product-title">
                {phone.brand ? `${phone.brand} ${phone.model}` : (phone.model || phone.name)}
              </h1>

              <div className="product-price-box">
                <span className="price-label">Store Selling Price</span>
                <span className="price-value">
                  {phone.price ? (phone.price.startsWith('₹') ? phone.price : `₹${phone.price}`) : 'Ask Price'}
                </span>
              </div>

              {/* Specifications Card */}
              <div className="specs-card">
                <h3><Tag size={18} color="var(--accent-cyan)" /> Specs & Health Summary</h3>
                <div className="specs-list">
                  <div className="spec-item">
                    <HardDrive size={16} color="var(--accent-cyan)" />
                    <div>
                      <span className="spec-title">Storage / RAM</span>
                      <span className="spec-val">{phone.storage || '128 GB'}</span>
                    </div>
                  </div>

                  <div className="spec-item">
                    <Smartphone size={16} color="var(--accent-gold)" />
                    <div>
                      <span className="spec-title">Cosmetic Condition</span>
                      <span className="spec-val">{phone.condition || 'Superb Working Condition'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Checklist */}
              <div className="quality-checklist">
                <h4>Why Buy Certified Used Mobiles from Sakthi Mobiles?</h4>
                <ul>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /> 100% Functionality & Display Quality Tested</li>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /> Clean IMEI Record & Original Motherboard</li>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /> Store Purchase Bill & Testing Warranty</li>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /> Fast WhatsApp Enquiry & In-Store Inspection</li>
                </ul>
              </div>

              {/* E-Commerce WhatsApp Action Button */}
              <div className="buy-action-container">
                <button className="whatsapp-buy-btn" onClick={handleWhatsAppEnquiry}>
                  <MessageCircle size={22} />
                  <span>Chat & Buy on WhatsApp</span>
                </button>
                <p className="buy-note">
                  <img src="/favicon.svg" alt="icon" style={{ width: '1.1em', height: '1.1em', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} /> Click to connect with our Srivilliputhur shop team instantly on WhatsApp.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SecondMobileDetailsPage;
