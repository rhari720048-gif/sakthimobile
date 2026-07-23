import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'genzdevoff@gmail.com' && password === '17112006') {
      sessionStorage.setItem('isSuperAdminLoggedIn', 'true');
      toast.success('Super Admin Login Successful!');
      navigate('/superadmin/dashboard');
    } else {
      toast.error('Invalid Credentials!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
      <div className="login-box" style={{ width: '100%', maxWidth: '400px', margin: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Settings size={40} color="var(--accent-cyan)" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: '1.8rem' }}>Super Admin</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>Restricted Access Portal</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ margin: 0 }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ margin: 0 }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              width: '100%',
              marginTop: '10px', 
              padding: '16px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)', 
              color: '#fff', 
              border: 'none', 
              fontSize: '1rem', 
              fontWeight: 700, 
              fontFamily: "'Outfit', sans-serif",
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              boxShadow: '0 8px 25px rgba(6, 182, 212, 0.25)',
              transition: 'all 0.3s ease'
            }}
          >
            <LogIn size={20} /> Login as Super Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
