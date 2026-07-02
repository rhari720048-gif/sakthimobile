import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';
import { MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
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
              <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
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

              <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px' }}>
                  <Clock size={32} color="var(--accent-cyan)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Working Hours</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Monday - Saturday: 9:00 AM - 9:00 PM<br />
                    Sunday: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
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
