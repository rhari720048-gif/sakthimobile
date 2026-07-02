import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded credentials as requested by shop owner
    if (email === 'e.balamurugan4496@gmail.com' && password === 'Airtel@123') {
      // Typically we'd use a token or context, but for now just navigate
      // You can store a flag in sessionStorage for basic protection if needed
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      toast.success('Welcome back, Admin!', {
        style: {
          background: 'var(--glass-bg)',
          color: 'var(--text-primary)',
          border: 'var(--glass-border)',
        },
        iconTheme: {
          primary: 'var(--accent-gold)',
          secondary: '#fff',
        },
      });
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <motion.div 
        className="login-box glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="login-header">
          <div className="shield-icon">
            <Lock size={32} color="var(--accent-gold)" />
          </div>
          <h2>Admin Portal</h2>
          <p>Secure login for Sakthi Mobiles management</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <motion.div 
              className="login-error"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ShieldAlert size={18} />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="input-group">
            <User size={18} className="input-icon" />
            <input 
              type="email" 
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="glass-button primary w-full justify-center mt-4">
            Login <ArrowRight size={18} />
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/" className="back-link">Return to Main Website</a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
