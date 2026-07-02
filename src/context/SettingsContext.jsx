import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    phone: '917373472735', // Default fallback
    phoneDisplay: '+91 73734 72735',
    email: 'info@sakthimobiles.com',
    address: 'Srivilliputhur, Tamil Nadu',
    hours: '9:30 AM to 9:30 PM (All Days)',
    bannerText: '10% Off on Display Replacements this week!',
    bannerActive: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settingsRef = doc(db, 'settings', 'general');

    // Create document if it doesn't exist initially
    const initializeSettings = async () => {
      const docSnap = await getDoc(settingsRef);
      if (!docSnap.exists()) {
        await setDoc(settingsRef, settings);
      }
    };
    
    initializeSettings();

    const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
