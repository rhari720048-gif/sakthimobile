import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminLogin from './pages/SuperAdminLogin';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import LegalPage from './pages/LegalPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import { SettingsProvider } from './context/SettingsContext';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
      <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
      <Route path="/service/:id" element={<PageTransition><ServiceDetailsPage /></PageTransition>} />
      <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      <Route path="/admin" element={<PageTransition><AdminLogin /></PageTransition>} />
      <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
      <Route path="/superadmin" element={<PageTransition><SuperAdminLogin /></PageTransition>} />
      <Route path="/superadmin/dashboard" element={<PageTransition><SuperAdminDashboard /></PageTransition>} />
      <Route path="/privacy" element={<PageTransition><LegalPage title="Privacy Policy" lastUpdated="January 2024" /></PageTransition>} />
      <Route path="/terms" element={<PageTransition><LegalPage title="Terms & Conditions" lastUpdated="January 2024" /></PageTransition>} />
      <Route path="/refund" element={<PageTransition><LegalPage title="Return & Refund Policy" lastUpdated="January 2024" /></PageTransition>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="floating-glow-1"></div>
        <div className="floating-glow-2"></div>
        <Toaster position="top-center" reverseOrder={false} />
        <AnimatedRoutes />
      </Router>
    </SettingsProvider>
  );
}

export default App;
