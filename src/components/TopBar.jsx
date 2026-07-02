import React from 'react';
import { Clock, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import './TopBar.css';

const TopBar = () => {
  const { settings, loading } = useSettings();

  if (loading) return null;

  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <div className="top-bar-left">
          <div className="top-bar-item">
            <Clock size={14} className="icon-gold" />
            {settings.hours}
          </div>
          <span className="top-bar-item hide-mobile">
            <MapPin size={14} color="var(--accent-cyan)" />
            Srivilliputhur
          </span>
        </div>
        <div className="top-bar-right">
          <a href={`tel:+${settings.phone}`} className="top-bar-item hover-text">
            <Phone size={14} className="icon-cyan" />
            {settings.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
