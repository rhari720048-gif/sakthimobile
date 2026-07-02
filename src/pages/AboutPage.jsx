import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Timeline from '../components/Timeline';
import Footer from '../components/Footer';
import TextReveal from '../components/TextReveal';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      
      <div style={{ paddingTop: '100px' }}>
        
        {/* About Hero Section */}
        <section className="about-hero" style={{ padding: '60px 0', textAlign: 'center' }}>
          <div className="container">
            <TextReveal text={<>About <span className="gradient-text-cyan">Sakthi Mobiles</span></>} />
            <p style={{ maxWidth: '700px', margin: '20px auto', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              We are Srivilliputhur's most trusted mobile service center, dedicated to providing high-quality, transparent, and swift repair services since our inception.
            </p>
          </div>
        </section>

        {/* Mission & Vision Extra Section */}
        <section className="mission-vision-section" style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              
              <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
                  <Target size={40} color="var(--accent-cyan)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  To deliver exceptional mobile repair services with transparency, using only original parts, ensuring every customer walks out with a perfectly working device and a smile.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
                  <Eye size={40} color="var(--accent-gold)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Our Vision</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  To be the most trusted and advanced mobile service brand in Tamil Nadu, setting the benchmark for quality repairs and customer satisfaction.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(15, 23, 42, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
                  <ShieldCheck size={40} color="var(--text-primary)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Our Values</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Integrity, Quality, and Speed. We believe in honest pricing, using genuine components, and valuing our customers' time above all else.
                </p>
              </div>

            </div>
          </div>
        </section>

        <Features />
        <Timeline />
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
