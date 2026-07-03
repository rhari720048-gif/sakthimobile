import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';
import { MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      <AnnouncementBanner />
      <Navbar />
      
      <div style={{ paddingTop: '80px' }}>
        
        {/* Extra Store Details Section */}
        <section className="store-details" style={{ padding: '40px 0 0 0' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <TextReveal text={<>Visit <span className="gradient-text-gold">Our Store</span></>} />
              <p>We are conveniently located in Srivilliputhur. Drop by for a quick consultation.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              <TiltCard className="glass-panel" maxTilt={15} scaleOnHover={1.05}>
                <div style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ padding: '12px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '12px' }}>
                    <MapPin size={32} color="var(--accent-gold)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Store Address</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      Sakthi Mobiles<br />
                      Main Road, Near Bus Stand,<br />
                      Srivilliputhur, Tamil Nadu 626125
                    </p>
                  </div>
                </div>
              </TiltCard>

              <TiltCard className="glass-panel" maxTilt={15} scaleOnHover={1.05}>
                <div style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px' }}>
                    <Clock size={32} color="var(--accent-cyan)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Working Hours</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      9:30 AM to 9:30 PM (All Days)
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </section>

        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
