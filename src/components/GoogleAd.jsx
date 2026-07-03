import React, { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';

const GoogleAd = ({ className = '', style = {}, slotId = '' }) => {
  const { settings } = useSettings();
  const adRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only push if we have an ID and we haven't already initialized this slot
    if (settings.googleAdsId && adRef.current && !isInitialized.current) {
      try {
        // Dynamically inject the adsense script if not already present
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
          const script = document.createElement('script');
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.googleAdsId}`;
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isInitialized.current = true;
      } catch (e) {
        console.error('Google Ads error:', e);
      }
    }
  }, [settings.googleAdsId, slotId]);

  // If no Google Ads ID is set in the Super Admin panel, show a placeholder
  if (!settings.googleAdsId) {
    return (
      <div 
        className={`ad-placeholder ${className}`} 
        style={{ 
          background: 'var(--glass-bg)', 
          border: 'var(--glass-border)', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          minHeight: '90px',
          margin: '0 auto',
          maxWidth: '1000px',
          width: '100%',
          ...style 
        }}
      >
        Advertisement Space
      </div>
    );
  }

  // Actual Google Ad implementation
  return (
    <div className={`ad-container ${className}`} style={{ margin: '0 auto', textAlign: 'center', overflow: 'hidden', position: 'relative', minHeight: '90px', background: 'var(--glass-bg)', border: 'var(--glass-border)', borderRadius: '12px', ...style }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', zIndex: 0 }}>
        Advertisement
      </div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', position: 'relative', zIndex: 1, ...style }}
        data-ad-client={settings.googleAdsId}
        data-ad-slot={slotId || "auto"} // Use auto if slotId is not provided, though slotId is normally required by adsense
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAd;
