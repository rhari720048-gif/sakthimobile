import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Save, ShieldCheck } from 'lucide-react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [googleAdsId, setGoogleAdsId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isSuperAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/superadmin');
      return;
    }

    const unsubscribe = onSnapshot(doc(db, 'settings', 'superadmin'), (docSnap) => {
      if (docSnap.exists()) {
        setGoogleAdsId(docSnap.data().googleAdsId || '');
      }
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isSuperAdminLoggedIn');
    navigate('/superadmin');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'superadmin'), { googleAdsId }, { merge: true });
      toast.success("Google Ads ID saved successfully!");
    } catch (error) {
      console.error("Error saving superadmin settings:", error);
      toast.error("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (initialLoading) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex', flexDirection: 'column' }}>
      
      {/* Topbar */}
      <header style={{ padding: '20px 40px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', borderBottom: 'var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck color="#10b981" size={28} />
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Super Admin Portal</h1>
        </div>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', cursor: 'pointer', fontWeight: 600 }}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Content */}
      <main style={{ flex: 1, padding: '40px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Advanced Settings</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Configure global integrations and monetization tools.</p>
        </div>

        <div className="admin-form-card" style={{ width: '100%' }}>
          <form onSubmit={handleSave}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: 'var(--glass-border)', paddingBottom: '16px' }}>
              <Settings color="var(--accent-cyan)" size={24} />
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Google Ads Configuration</h3>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Google Ad Client ID</label>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Enter your Google AdSense Publisher ID (e.g. <code>ca-pub-1234567890123456</code>). Once saved, ads will start appearing across the website. Leave empty to show placeholders.
              </p>
              <input 
                type="text" 
                className="admin-input"
                value={googleAdsId}
                onChange={(e) => setGoogleAdsId(e.target.value)}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                style={{ margin: 0 }} 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSaving}
              style={{ 
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)', 
                color: '#fff', 
                border: 'none', 
                fontSize: '1rem', 
                fontWeight: 700, 
                fontFamily: "'Outfit', sans-serif",
                cursor: isSaving ? 'not-allowed' : 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                opacity: isSaving ? 0.7 : 1,
                boxShadow: '0 8px 25px rgba(6, 182, 212, 0.25)',
                transition: 'all 0.3s ease'
              }}
            >
              <Save size={20} /> {isSaving ? 'Saving...' : 'Save Configuration'}
            </button>
          </form>
        </div>
      </main>

    </div>
  );
};

export default SuperAdminDashboard;
