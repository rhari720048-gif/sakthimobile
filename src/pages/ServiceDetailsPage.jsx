import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Info, CheckCircle, Smartphone, Wrench, ShieldCheck, Clock } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import Footer from '../components/Footer';
import { trackWhatsAppClick } from '../utils/analytics';
import { Link } from 'react-router-dom';
import { isVideoUrl } from '../utils/media';
import './ServiceDetailsPage.css';

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [service, setService] = useState(location.state?.service || null);
  const [loading, setLoading] = useState(!service);
  
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerIssue, setCustomerIssue] = useState('');
  
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      // We start with location.state if available, but ALWAYS fetch latest from Firebase
      // to ensure we have the most up-to-date fields (like newly added beforeImage).
      try {
        // Try fetching from 'services' collection first
        let docRef = doc(db, 'services', id);
        let docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() });
          setLoading(false);
          return;
        }
        
        // If not found, try 'accessories' collection
        docRef = doc(db, 'accessories', id);
        docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setService({ id: docSnap.id, ...docSnap.data() });
        } else {
          // If still not found, redirect to services page
          navigate('/services');
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };
    
    const fetchRelatedServices = async () => {
      try {
        const q = query(collection(db, 'services'), limit(6));
        const querySnapshot = await getDocs(q);
        const related = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== id) {
            related.push({ id: doc.id, ...doc.data() });
          }
        });
        // Shuffle and pick 3
        const shuffled = related.sort(() => 0.5 - Math.random());
        setRelatedServices(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching related services:", error);
      }
    };

    fetchService();
    fetchRelatedServices();
  }, [id, navigate]);

  const getEmbedVideoUrl = (url) => {
    if (!url) return null;
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtube.com/watch')) {
          videoId = new URL(url).searchParams.get("v");
        } else if (url.includes('youtube.com/shorts/')) {
          videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        }
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?mute=1&autoplay=1`;
        }
      }
    } catch (e) {
      console.error("Error parsing video URL", e);
    }
    return url;
  };

  const renderVideoPlayer = (url) => {
    const embedUrl = getEmbedVideoUrl(url);
    if (!embedUrl) return null;
    
    // If it's a YouTube link, use iframe
    if (embedUrl.includes('youtube.com/embed/')) {
      return (
        <iframe 
          className="service-details-video"
          src={embedUrl} 
          title="Service Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      );
    }
    
    // For all other links (like ImageKit), use native video tag
    return (
      <video 
        src={embedUrl}
        className="service-details-video" 
        controls 
        playsInline 
        autoPlay 
        muted 
        loop
      />
    );
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerCity) return;

    let message = `Hello, I'm interested in: *${service.name}*\n\n`;
    message += `Name: ${customerName}\nCity: ${customerCity}\n`;
    if (customerIssue) message += `Issue Details: ${customerIssue}\n`;
    
    trackWhatsAppClick('enquire_service_details');
    
    const whatsappUrl = `https://wa.me/917373472735?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="app-container">
      
      <main className="service-details-main">
        <div className="service-details-container">
          
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back
          </button>
          
          <motion.div 
            className="service-hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div 
              className="service-hero-image-wrapper"
              style={service.imageUrl ? { backgroundImage: `url(${service.imageUrl})` } : {}}
            >
              {service.imageUrl ? (
                <>
                  <div className="blur-overlay"></div>
                  <img src={service.imageUrl} alt={service.name} className="service-hero-image" />
                </>
              ) : (
                <div className="placeholder-wrapper">
                  <Smartphone size={80} color="rgba(255,255,255,0.2)" />
                </div>
              )}
            </div>
            
            <div className="service-hero-content">
              <h1>{service.name}</h1>
              <p className="service-short-desc">{service.desc}</p>
            </div>
          </motion.div>
          
          <div className="service-split-layout">
            <div className="service-main-content">
              <motion.div 
                className="service-info-column"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2><Info size={24} className="heading-icon" /> Service Details</h2>
                <div className="service-full-details">
                  <p>{service.details}</p>
                </div>
                
                <div className="service-benefits">
                  <h3>Why Choose Us?</h3>
                  <ul>
                    <li><CheckCircle size={18} color="var(--accent-cyan)" /> Fast Turnaround Time</li>
                    <li><CheckCircle size={18} color="var(--accent-cyan)" /> Genuine Spare Parts</li>
                    <li><CheckCircle size={18} color="var(--accent-cyan)" /> Expert Technicians</li>
                    <li><CheckCircle size={18} color="var(--accent-cyan)" /> Warranty Included</li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                className="service-guarantee-card glass-panel"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginTop: '25px',
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.6) 0%, rgba(240, 249, 255, 0.8) 100%)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  boxShadow: '0 15px 35px rgba(14, 165, 233, 0.08)'
                }}
              >
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', color: '#0f172a', margin: '0 0 16px 0', fontWeight: '800' }}>
                  <ShieldCheck size={22} color="var(--accent-cyan)" /> Sakthi Mobiles Service Assurance & Guarantee
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(14, 165, 233, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Wrench size={16} color="var(--accent-cyan)" />
                      <span style={{ fontWeight: '800', fontSize: '0.88rem', color: '#0f172a' }}>100% Original Parts</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      We use grade-A OEM screens, batteries, and IC components for maximum durability.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(14, 165, 233, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Clock size={16} color="var(--accent-gold)" />
                      <span style={{ fontWeight: '800', fontSize: '0.88rem', color: '#0f172a' }}>Express Same-Day Service</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Most screen, battery, and port repairs completed in 1 to 2 hours while you wait.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(14, 165, 233, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <CheckCircle size={16} color="var(--accent-cyan)" />
                      <span style={{ fontWeight: '800', fontSize: '0.88rem', color: '#0f172a' }}>25-Point Diagnostic Test</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Every device undergoes a 25-point hardware diagnostic test before handover.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid rgba(14, 165, 233, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Smartphone size={16} color="var(--accent-gold)" />
                      <span style={{ fontWeight: '800', fontSize: '0.88rem', color: '#0f172a' }}>Store Warranty Included</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      Full store support and testing warranty provided for complete peace of mind.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="service-sticky-sidebar">
              <motion.div 
                className="service-enquiry-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="enquiry-header">
                  <h2>Ready to get this fixed?</h2>
                  <p>Fill out this quick form and our experts will contact you on WhatsApp with a quote!</p>
                </div>
                
                <form className="service-enquiry-form" onSubmit={handleWhatsAppSubmit}>
                  <div className="input-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>City / Location *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Chennai"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Tell us about the issue (Optional)</label>
                    <textarea 
                      placeholder="e.g. My screen is completely broken and black."
                      value={customerIssue}
                      onChange={(e) => setCustomerIssue(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                  <button type="submit" className="whatsapp-submit-btn">
                    <MessageCircle size={22} /> Enquire on WhatsApp
                  </button>
                </form>
              </motion.div>
            </div>
          </div>

          {/* Related Services Section */}
          {relatedServices.length > 0 && (
            <motion.div 
              className="related-services-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="related-title">Other Services You Might Need</h2>
              <div className="related-services-grid">
                {relatedServices.map((relService) => (
                  <Link 
                    to={`/service/${relService.id}`} 
                    state={{ service: relService }} 
                    key={relService.id} 
                    className="related-service-card"
                  >
                    <div className="related-service-icon">
                      <Wrench size={24} color="var(--accent-cyan)" />
                    </div>
                    <div>
                      <h4>{relService.name}</h4>
                      <p>{relService.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage;
