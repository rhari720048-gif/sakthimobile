import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, PlusCircle, Trash2, Star, LayoutDashboard, MessageSquarePlus, Smartphone, Wrench, Headphones, PieChart, Activity, User, Sliders, Save, CheckCircle, ShoppingBag, Battery, Cable, MessageCircle, Menu, X } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [whatsappClicks, setWhatsappClicks] = useState(0);
  const [shopSettings, setShopSettings] = useState({ phone: '', phoneDisplay: '', email: '', address: '', hours: '', bannerText: '', bannerActive: true });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editServiceForm, setEditServiceForm] = useState(null);

  const [editingAccessoryId, setEditingAccessoryId] = useState(null);
  const [editAccessoryForm, setEditAccessoryForm] = useState(null);
  
  const [serviceForm, setServiceForm] = useState({
    name: '', desc: '', details: '', category: 'hardware', imageUrl: '', videoUrl: ''
  });
  const [accessoryForm, setAccessoryForm] = useState({
    name: '', desc: '', icon: 'Headphones', imageUrl: ''
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    const unsubscribeReviews = onSnapshot(collection(db, 'reviews'), (querySnapshot) => {
      const reviewsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsList.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching reviews:", error);
    });

    const unsubscribeServices = onSnapshot(collection(db, 'services'), (querySnapshot) => {
      const servicesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesList.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching services:", error);
    });

    const unsubscribeAccessories = onSnapshot(collection(db, 'accessories'), (querySnapshot) => {
      const accessoriesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAccessories(accessoriesList.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching accessories:", error);
    });

    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setShopSettings(docSnap.data());
      }
    });

    const unsubscribeAnalytics = onSnapshot(doc(db, 'analytics', 'whatsapp'), (docSnap) => {
      if (docSnap.exists()) {
        setWhatsappClicks(docSnap.data().clickCount || 0);
      }
    });

    return () => {
      unsubscribeReviews();
      unsubscribeServices();
      unsubscribeAccessories();
      unsubscribeSettings();
      unsubscribeAnalytics();
    };
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'services'), {
        ...serviceForm,
        createdAt: serverTimestamp()
      });
      toast.success("Service added successfully!");
      setServiceForm({ name: '', desc: '', details: '', category: 'hardware', imageUrl: '', videoUrl: '' });
    } catch (error) {
      console.error("Error adding service: ", error);
      toast.error("Failed to add service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccessorySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'accessories'), {
        ...accessoryForm,
        createdAt: serverTimestamp()
      });
      toast.success("Accessory added successfully!");
      setAccessoryForm({ name: '', desc: '', icon: 'Headphones', imageUrl: '' });
    } catch (error) {
      console.error("Error adding accessory: ", error);
      toast.error("Failed to add accessory.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteDoc(doc(db, 'reviews', reviewId));
        toast.success("Review deleted.");
      } catch (error) {
        console.error("Error deleting review: ", error);
        toast.error("Failed to delete review.");
      }
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service? It will be removed from the customer page immediately.")) {
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        toast.success("Service deleted.");
      } catch (error) {
        console.error("Error deleting service: ", error);
        toast.error("Failed to delete service.");
      }
    }
  };

  const handleDeleteAccessory = async (accId) => {
    if (window.confirm("Are you sure you want to delete this accessory?")) {
      try {
        await deleteDoc(doc(db, 'accessories', accId));
        toast.success("Accessory deleted.");
      } catch (error) {
        console.error("Error deleting accessory: ", error);
        toast.error("Failed to delete accessory.");
      }
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), shopSettings);
      toast.success("Shop settings updated globally!");
    } catch (error) {
      console.error("Error saving settings: ", error);
      toast.error("Failed to save settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleResetWhatsAppCount = async () => {
    if (window.confirm("Are you sure you want to reset the WhatsApp inquiries count to 0?")) {
      try {
        await setDoc(doc(db, 'analytics', 'whatsapp'), { clickCount: 0 });
        toast.success("WhatsApp count reset to 0.");
      } catch (error) {
        console.error("Error resetting WhatsApp count: ", error);
        toast.error("Failed to reset count.");
      }
    }
  };

  const handleSaveServiceEdit = async (e, id) => {
    e.preventDefault();
    if (editServiceForm.imageUrl && editServiceForm.imageUrl.toLowerCase().includes('.pdf')) {
      toast.error("Invalid Image URL: You have entered a PDF link. Please provide a direct link to an image (.jpg, .png).");
      return;
    }
    try {
      await updateDoc(doc(db, 'services', id), editServiceForm);
      toast.success("Service updated successfully!");
      setEditingServiceId(null);
    } catch (error) {
      toast.error("Failed to update service.");
    }
  };

  const handleSaveAccessoryEdit = async (e, id) => {
    e.preventDefault();
    if (editAccessoryForm.imageUrl && editAccessoryForm.imageUrl.toLowerCase().includes('.pdf')) {
      toast.error("Invalid Image URL: You have entered a PDF link. Please provide a direct link to an image (.jpg, .png).");
      return;
    }
    try {
      await updateDoc(doc(db, 'accessories', id), editAccessoryForm);
      toast.success("Accessory updated successfully!");
      setEditingAccessoryId(null);
    } catch (error) {
      toast.error("Failed to update accessory.");
    }
  };

  const getCategoryIcon = (cat) => {
    if (cat === 'hardware') return <Wrench size={18} />;
    if (cat === 'software') return <Smartphone size={18} />;
    return <Headphones size={18} />;
  };

  // Stats Calculations
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Stagger Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header-mobile">
          <div className="admin-brand" style={{ marginBottom: 0 }}>
            <Settings color="#4f46e5" size={28} />
            <h1>Admin Pro</h1>
          </div>
          <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="admin-brand desktop-brand">
          <Settings color="#4f46e5" size={28} />
          <h1>Admin Pro</h1>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
          >
            <PieChart size={20} />
            Dashboard Overview
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => { setActiveTab('services'); setIsMobileMenuOpen(false); }}
          >
            <LayoutDashboard size={20} />
            Manage Services
          </button>

          <button 
            className={`admin-nav-item ${activeTab === 'accessories' ? 'active' : ''}`}
            onClick={() => { setActiveTab('accessories'); setIsMobileMenuOpen(false); }}
          >
            <ShoppingBag size={20} />
            Manage Accessories
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => { setActiveTab('reviews'); setIsMobileMenuOpen(false); }}
          >
            <MessageSquarePlus size={20} />
            Customer Reviews
          </button>
          
          <button 
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
          >
            <Sliders size={20} />
            Shop Settings
          </button>
        </nav>
        
        <button className="admin-logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout securely
        </button>
      </aside>

      {/* Main Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="admin-profile">
            <span className="profile-name">Welcome, Admin</span>
            <div className="admin-avatar">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Overlay for mobile sidebar */}
        {isMobileMenuOpen && (
          <div className="admin-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        {/* Content Container */}
        <div className="admin-content">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Dashboard Overview</h2>
                  <p>Here's what's happening with Sakthi Mobiles today.</p>
                </motion.header>

                <motion.div className="admin-stats-grid" variants={containerVariants}>
                  <motion.div className="admin-stat-card" variants={itemVariants}>
                    <div className="admin-stat-icon purple">
                      <MessageSquarePlus size={28} />
                    </div>
                    <div className="admin-stat-info">
                      <h4>Total Reviews</h4>
                      <p>{reviews.length}</p>
                    </div>
                  </motion.div>

                  <motion.div className="admin-stat-card" variants={itemVariants}>
                    <div className="admin-stat-icon amber">
                      <Star size={28} />
                    </div>
                    <div className="admin-stat-info">
                      <h4>Average Rating</h4>
                      <p>{avgRating} / 5</p>
                    </div>
                  </motion.div>

                  <motion.div className="admin-stat-card" variants={itemVariants}>
                    <div className="admin-stat-icon green">
                      <MessageCircle size={28} />
                    </div>
                    <div className="admin-stat-info">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>WhatsApp Inquiries</h4>
                        <button onClick={handleResetWhatsAppCount} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }} title="Reset Count">Reset</button>
                      </div>
                      <p>{whatsappClicks}</p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ marginTop: '40px' }}>
                  <h3 className="admin-section-title">Recent Activity</h3>
                  <div className="admin-activity-feed">
                    {reviews.slice(0, 3).map((review, idx) => (
                      <div key={idx} className="activity-item">
                        <div className="activity-icon" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }}>
                          <Activity size={20} />
                        </div>
                        <div className="activity-content">
                          <h4>New 5-star review from {review.name}</h4>
                          <p>"{review.text.substring(0, 50)}..."</p>
                        </div>
                        <div className="activity-time">
                          Just now
                        </div>
                      </div>
                    ))}
                    {reviews.length === 0 && <p style={{ color: '#64748b' }}>No recent activity.</p>}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <motion.div
                key="services-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Service Management</h2>
                  <p>Add new repair services or remove existing ones from the customer portal.</p>
                </motion.header>

                <motion.div className="admin-form-card" variants={itemVariants}>
                  <h3 className="admin-section-title" style={{ marginTop: 0 }}>Add New Service</h3>
                  <form onSubmit={handleServiceSubmit}>
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select 
                        className="admin-input"
                        value={serviceForm.category}
                        onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                      >
                        <option value="hardware">Hardware Repair</option>
                        <option value="software">Software Solutions</option>
                      </select>
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Service Name</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                        placeholder="e.g. Display Replacement"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Short Description</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={serviceForm.desc}
                        onChange={(e) => setServiceForm({...serviceForm, desc: e.target.value})}
                        placeholder="Appears on the service card"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Detailed Description</label>
                      <textarea 
                        required rows="3"
                        className="admin-input"
                        value={serviceForm.details}
                        onChange={(e) => setServiceForm({...serviceForm, details: e.target.value})}
                        placeholder="Full details shown in the popup"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Image URL (Optional)</label>
                      <input 
                        type="url"
                        className="admin-input"
                        value={serviceForm.imageUrl}
                        onChange={(e) => setServiceForm({...serviceForm, imageUrl: e.target.value})}
                        placeholder="e.g. https://ik.imagekit.io/.../image.jpg"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Video URL (Optional)</label>
                      <input 
                        type="url"
                        className="admin-input"
                        value={serviceForm.videoUrl || ''}
                        onChange={(e) => setServiceForm({...serviceForm, videoUrl: e.target.value})}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                      />
                    </div>
                    

                    <button type="submit" disabled={isSubmitting} className="admin-btn-primary" style={{ width: '100%' }}>
                      {isSubmitting ? 'Adding...' : <><PlusCircle size={20} /> Publish Service</>}
                    </button>
                  </form>
                </motion.div>

                <motion.div style={{ marginTop: '60px' }} variants={containerVariants}>
                  <motion.h2 className="admin-header" variants={itemVariants}>
                    <h2 style={{fontSize: '1.8rem'}}>Existing Services</h2>
                  </motion.h2>
                  
                  {['hardware', 'software'].map(category => {
                    const categoryServices = services.filter(s => s.category === category);
                    
                    return (
                      <motion.div key={category} style={{ marginBottom: '40px' }} variants={itemVariants}>
                        <h3 className="admin-category-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {getCategoryIcon(category)} {category}
                        </h3>
                        
                        <div className="admin-grid">
                          {categoryServices.length === 0 ? (
                            <div className="admin-empty-state">No {category} services found.</div>
                          ) : (
                            categoryServices.map(service => (
                              <div key={service.id} className="admin-card">
                                {editingServiceId === service.id ? (
                                  <form onSubmit={(e) => handleSaveServiceEdit(e, service.id)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input type="text" className="admin-input" value={editServiceForm.name} onChange={(e) => setEditServiceForm({...editServiceForm, name: e.target.value})} required placeholder="Service Name" />
                                    <input type="text" className="admin-input" value={editServiceForm.desc} onChange={(e) => setEditServiceForm({...editServiceForm, desc: e.target.value})} required placeholder="Short Description" />
                                    <input type="url" className="admin-input" placeholder="Image URL (Optional)" value={editServiceForm.imageUrl || ''} onChange={(e) => setEditServiceForm({...editServiceForm, imageUrl: e.target.value})} />
                                    <input type="url" className="admin-input" placeholder="Video URL (Optional)" value={editServiceForm.videoUrl || ''} onChange={(e) => setEditServiceForm({...editServiceForm, videoUrl: e.target.value})} />

                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                      <button type="submit" className="admin-btn-primary" style={{ flex: 1, padding: '8px' }}>Save</button>
                                      <button type="button" onClick={() => setEditingServiceId(null)} className="admin-btn-secondary" style={{ flex: 1, padding: '8px', background: '#f1f5f9', color: '#0f172a' }}>Cancel</button>
                                    </div>
                                  </form>
                                ) : (
                                  <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '10px' }}>
                                      <button onClick={() => { setEditingServiceId(service.id); setEditServiceForm(service); }} className="admin-btn-secondary" style={{ padding: '5px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Service">
                                        <Settings size={16} />
                                      </button>
                                      <button onClick={() => handleDeleteService(service.id)} className="admin-delete-btn" style={{ position: 'relative', top: 0, right: 0 }} title="Delete Service">
                                        <Trash2 size={18} />
                                      </button>
                                    </div>
                                    <h4 className="admin-card-title">{service.name}</h4>
                                    <p className="admin-card-desc">{service.desc}</p>
                                    {service.imageUrl && <p className="admin-card-details" style={{ fontSize: '0.8rem', color: '#64748b' }}>Has Image</p>}
                                  </>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* ACCESSORIES TAB */}
            {activeTab === 'accessories' && (
              <motion.div
                key="accessories-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Manage Accessories</h2>
                  <p>Add products to your mini-store frontend.</p>
                </motion.header>

                <motion.div className="admin-form-card" variants={itemVariants} style={{ marginBottom: '40px' }}>
                  <form onSubmit={handleAccessorySubmit}>
                    <div className="admin-form-group">
                      <label>Product Name</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={accessoryForm.name}
                        onChange={(e) => setAccessoryForm({...accessoryForm, name: e.target.value})}
                        placeholder="e.g. 20W Fast Charger"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Short Description</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={accessoryForm.desc}
                        onChange={(e) => setAccessoryForm({...accessoryForm, desc: e.target.value})}
                        placeholder="e.g. Original apple fast charger with warranty."
                      />
                    </div>



                    <div className="admin-form-group">
                      <label>Image URL (Optional)</label>
                      <input 
                        type="url"
                        className="admin-input"
                        value={accessoryForm.imageUrl}
                        onChange={(e) => setAccessoryForm({...accessoryForm, imageUrl: e.target.value})}
                        placeholder="e.g. https://ik.imagekit.io/.../image.jpg"
                      />
                    </div>


                    <div className="admin-form-group">
                      <label>Icon / Category</label>
                      <select 
                        className="admin-input"
                        value={accessoryForm.icon}
                        onChange={(e) => setAccessoryForm({...accessoryForm, icon: e.target.value})}
                      >
                        <option value="Headphones">Audio / Headphones</option>
                        <option value="Battery">Batteries / Power Banks</option>
                        <option value="Smartphone">Cases / Tempered Glass</option>
                        <option value="Cable">Cables / Adapters</option>
                        <option value="ShoppingBag">Other / General</option>
                      </select>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="admin-btn-primary">
                      {isSubmitting ? 'Adding...' : <><PlusCircle size={20} /> Add Accessory</>}
                    </button>
                  </form>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="admin-section-title">Current Accessories ({accessories.length})</h3>
                  <motion.div className="admin-grid">
                    {accessories.length === 0 && <div className="admin-empty-state">No accessories added yet.</div>}
                    {accessories.map(acc => (
                      <motion.div key={acc.id} className="admin-card" variants={itemVariants}>
                        {editingAccessoryId === acc.id ? (
                          <form onSubmit={(e) => handleSaveAccessoryEdit(e, acc.id)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input type="text" className="admin-input" value={editAccessoryForm.name} onChange={(e) => setEditAccessoryForm({...editAccessoryForm, name: e.target.value})} required placeholder="Accessory Name" />
                            <input type="text" className="admin-input" value={editAccessoryForm.desc} onChange={(e) => setEditAccessoryForm({...editAccessoryForm, desc: e.target.value})} required placeholder="Short Description" />
                            <input type="url" className="admin-input" placeholder="Image URL (Optional)" value={editAccessoryForm.imageUrl || ''} onChange={(e) => setEditAccessoryForm({...editAccessoryForm, imageUrl: e.target.value})} />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                              <button type="submit" className="admin-btn-primary" style={{ flex: 1, padding: '8px' }}>Save</button>
                              <button type="button" onClick={() => setEditingAccessoryId(null)} className="admin-btn-secondary" style={{ flex: 1, padding: '8px', background: '#f1f5f9', color: '#0f172a' }}>Cancel</button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '10px' }}>
                              <button onClick={() => { setEditingAccessoryId(acc.id); setEditAccessoryForm(acc); }} className="admin-btn-secondary" style={{ padding: '5px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Accessory">
                                <Settings size={16} />
                              </button>
                              <button onClick={() => handleDeleteAccessory(acc.id)} className="admin-delete-btn" style={{ position: 'relative', top: 0, right: 0 }} title="Delete Accessory">
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <h4 className="admin-card-title">{acc.name}</h4>
                            <p className="admin-card-desc">{acc.desc}</p>
                            {acc.imageUrl && <p className="admin-card-details" style={{ fontSize: '0.8rem', color: '#64748b' }}>Has Image</p>}
                          </>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <motion.div
                key="reviews-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Customer Reviews</h2>
                  <p>Manage reviews submitted by customers. Deleted reviews are removed instantly.</p>
                </motion.header>

                <motion.div className="admin-grid" variants={containerVariants}>
                  {reviews.length === 0 ? (
                    <motion.div className="admin-empty-state" variants={itemVariants}>No customer reviews found.</motion.div>
                  ) : (
                    reviews.map(review => (
                      <motion.div key={review.id} className="admin-card" variants={itemVariants}>
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="admin-delete-btn"
                          title="Delete Review"
                        >
                          <Trash2 size={18} />
                        </button>
                        
                        <h4 className="admin-card-title">{review.name}</h4>
                        
                        <div className="admin-review-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < review.rating ? "#f59e0b" : "transparent"} 
                              color={i < review.rating ? "#f59e0b" : "#cbd5e1"} 
                            />
                          ))}
                        </div>
                        
                        <p className="admin-review-text">"{review.text}"</p>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Shop Settings</h2>
                  <p>Update your contact details globally across the entire website.</p>
                </motion.header>

                <motion.div className="admin-form-card" variants={itemVariants}>
                  <form onSubmit={handleSaveSettings}>
                    <h3 className="admin-section-title" style={{marginTop: 0}}>Announcement Banner</h3>
                    
                    <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="checkbox"
                        id="bannerActive"
                        checked={shopSettings.bannerActive || false}
                        onChange={(e) => setShopSettings({...shopSettings, bannerActive: e.target.checked})}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                      />
                      <label htmlFor="bannerActive" style={{ margin: 0, cursor: 'pointer' }}>Show Banner on Customer Page</label>
                    </div>

                    <div className="admin-form-group">
                      <label>Banner Text</label>
                      <input 
                        type="text"
                        className="admin-input"
                        value={shopSettings.bannerText || ''}
                        onChange={(e) => setShopSettings({...shopSettings, bannerText: e.target.value})}
                        placeholder="e.g. 10% Off on Display Replacements!"
                        disabled={!shopSettings.bannerActive}
                      />
                    </div>

                    <h3 className="admin-section-title">Shop Details</h3>

                    <div className="admin-form-group">
                      <label>WhatsApp / Internal Phone Number (Digits only for links)</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={shopSettings.phone}
                        onChange={(e) => setShopSettings({...shopSettings, phone: e.target.value})}
                        placeholder="e.g. 917373472735"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Display Phone Number (For users to see)</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={shopSettings.phoneDisplay}
                        onChange={(e) => setShopSettings({...shopSettings, phoneDisplay: e.target.value})}
                        placeholder="e.g. +91 73734 72735"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" required
                        className="admin-input"
                        value={shopSettings.email}
                        onChange={(e) => setShopSettings({...shopSettings, email: e.target.value})}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Working Hours</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={shopSettings.hours}
                        onChange={(e) => setShopSettings({...shopSettings, hours: e.target.value})}
                        placeholder="e.g. 9:30 AM - 9:30 PM (Everyday)"
                      />
                    </div>
                    
                    <div className="admin-form-group">
                      <label>Shop Full Address</label>
                      <textarea 
                        required rows="3"
                        className="admin-input"
                        value={shopSettings.address}
                        onChange={(e) => setShopSettings({...shopSettings, address: e.target.value})}
                      />
                    </div>
                    
                    <button type="submit" disabled={isSavingSettings} className="admin-btn-primary" style={{ width: '100%' }}>
                      {isSavingSettings ? 'Saving...' : <><Save size={20} /> Save Global Settings</>}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
