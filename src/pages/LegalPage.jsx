import React from 'react';
import { motion } from 'framer-motion';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LegalPage = ({ title, lastUpdated }) => {
  return (
    <div className="app-container">
      <AnnouncementBanner />
      <Navbar />
      <div className="legal-header" style={{ paddingTop: '120px', paddingBottom: '40px', background: 'var(--bg-main)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '10px' }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Last Updated: {lastUpdated}</p>
      </div>
      
      <div className="container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '50vh' }}>
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p>
            This page contains the {title.toLowerCase()} for Sakthi Mobiles. 
            We are currently updating our legal documentation to ensure it complies with the latest regulations and standards.
          </p>
          <p style={{ marginTop: '20px' }}>
            If you have any questions regarding our policies, please feel free to contact us through our support channels or visit our store directly.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;
