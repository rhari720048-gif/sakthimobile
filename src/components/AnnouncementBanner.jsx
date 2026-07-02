import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { AlertCircle } from 'lucide-react';
import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
  const { settings, loading } = useSettings();

  if (loading || !settings.bannerActive || !settings.bannerText) return null;

  return (
    <div className="announcement-banner">
      <div className="container">
        <div className="banner-content">
          <span className="banner-pulse"></span>
          <AlertCircle size={16} className="banner-icon" />
          <p>{settings.bannerText}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
