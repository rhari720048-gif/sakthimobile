import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LogOut, Settings, PlusCircle, Trash2, Star, LayoutDashboard, MessageSquarePlus, Smartphone, Wrench, Headphones, PieChart, Activity, User, Sliders, Save, CheckCircle, ShoppingBag, Battery, Cable, MessageCircle, Menu, X, ChevronDown, ChevronRight, ShieldCheck, Zap, Upload, Image as ImageIcon } from 'lucide-react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, onSnapshot, deleteDoc, doc, serverTimestamp, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const deleteMediaFromStorage = async (url) => {
  if (!url || typeof url !== 'string') return;
  if (url.includes('firebasestorage.googleapis.com')) {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    } catch (error) {
      console.warn("Storage cleanup note:", error);
    }
  }
};
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { isVideoUrl } from '../utils/media';
import './AdminDashboard.css';

const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: 'image/webp',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

const FileUploadField = ({ label, value, onChange, placeholder, accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = async (e) => {
    const rawFile = e.target.files[0];
    if (!rawFile) return;

    if (!rawFile.type.startsWith('image/')) {
      toast.error("Please select an image file (.jpg, .png, .webp).");
      return;
    }

    if (rawFile.size > 25 * 1024 * 1024) {
      toast.error("Image file size is too large (max 25MB).");
      return;
    }

    setUploading(true);
    setUploadProgress("Compressing...");

    try {
      const file = await compressImage(rawFile);
      setUploadProgress("Attaching...");

      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
        toast.success("⚡ Photo attached!");
        setUploading(false);
        setUploadProgress("");
      };
      reader.onerror = () => {
        toast.error("Failed to read image.");
        setUploading(false);
        setUploadProgress("");
      };
      reader.readAsDataURL(file);

      try {
        const fileName = `uploads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, file).then(snap => getDownloadURL(snap.ref)).then(url => {
          if (url) onChange(url);
        }).catch(() => {});
      } catch (cloudErr) {}

    } catch (err) {
      console.error("Error processing image:", err);
      toast.error("Failed to process image.");
      setUploading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="admin-form-group">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label style={{ margin: 0 }}>{label}</label>
        {!value && (
          <button 
            type="button" 
            onClick={() => setShowUrlInput(!showUrlInput)}
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
          >
            {showUrlInput ? "📁 Use System Photo" : "🔗 Paste Image URL"}
          </button>
        )}
      </div>

      {!value ? (
        showUrlInput ? (
          <input 
            type="text"
            className="admin-input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Paste direct image URL..."}
          />
        ) : (
          <label 
            className="admin-file-upload-zone"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '2px dashed rgba(14, 165, 233, 0.4)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              color: 'var(--accent-cyan)',
              fontWeight: '700',
              fontSize: '0.95rem',
              textAlign: 'center'
            }}
          >
            <Upload size={20} />
            <span>{uploading ? (uploadProgress || "Uploading...") : "📁 Choose Photo from Device"}</span>
            <input 
              type="file" 
              accept={accept} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              disabled={uploading}
            />
          </label>
        )
      ) : (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: '#ffffff',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '16px',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={value} alt="Attached File" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid var(--accent-cyan)' }} />
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0f172a' }}>Photo Attached ✅</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ready for publish</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label 
              style={{
                background: 'rgba(14, 165, 233, 0.1)',
                color: 'var(--accent-cyan)',
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Change
              <input 
                type="file" 
                accept={accept} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                disabled={uploading}
              />
            </label>
            <button 
              type="button" 
              onClick={() => { onChange(''); setShowUrlInput(false); }} 
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                border: 'none', 
                color: '#ef4444', 
                padding: '6px 12px',
                borderRadius: '10px',
                fontSize: '0.8rem', 
                cursor: 'pointer', 
                fontWeight: '700' 
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  const setActiveTab = (tab) => setSearchParams({ tab });
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

  const [editingSecondMobileId, setEditingSecondMobileId] = useState(null);
  const [editSecondMobileForm, setEditSecondMobileForm] = useState(null);
  
  const [serviceForm, setServiceForm] = useState({
    name: '', desc: '', details: '', category: 'hardware', imageUrl: '', videoUrl: ''
  });
  const [accessoryForm, setAccessoryForm] = useState({
    name: '', desc: '', icon: 'Headphones', imageUrl: ''
  });
  
  // Live Activity Log States
  const [activityForm, setActivityForm] = useState({ model: '', serviceType: '', category: 'hardware' });
  const [activityLogs, setActivityLogs] = useState([]);
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [logCategoryFilter, setLogCategoryFilter] = useState('all');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // Seconds Mobiles States
  const [secondMobileForm, setSecondMobileForm] = useState({ brand: '', model: '', storage: '', condition: '', price: '', imageUrl: '', backImage: '', leftImage: '', rightImage: '' });
  const [secondsMobilesList, setSecondsMobilesList] = useState([]);
  const [isSubmittingSecondMobile, setIsSubmittingSecondMobile] = useState(false);

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

    const unsubscribeActivities = onSnapshot(collection(db, 'activity_logs'), (querySnapshot) => {
      const activitiesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivityLogs(activitiesList.sort((a, b) => (b.completedAt?.toMillis() || 0) - (a.completedAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching activity logs:", error);
    });

    const unsubscribeSecondsMobiles = onSnapshot(collection(db, 'seconds_mobiles'), (querySnapshot) => {
      const secondsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSecondsMobilesList(secondsList.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching seconds mobiles:", error);
    });

    return () => {
      unsubscribeReviews();
      unsubscribeServices();
      unsubscribeAccessories();
      unsubscribeSettings();
      unsubscribeAnalytics();
      unsubscribeActivities();
      unsubscribeSecondsMobiles();
    };
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const category = activeTab === 'software' ? 'software' : 'hardware';
    try {
      await addDoc(collection(db, 'services'), {
        ...serviceForm,
        category,
        createdAt: serverTimestamp()
      });
      toast.success(`${category === 'hardware' ? 'Hardware' : 'Software'} service added successfully!`);
      setServiceForm({ name: '', desc: '', details: '', category: 'hardware', imageUrl: '' });
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
    if (window.confirm("Are you sure you want to delete this service? All media files will be permanently deleted to free up storage.")) {
      try {
        const item = services.find(s => s.id === serviceId);
        if (item) {
          await deleteMediaFromStorage(item.imageUrl);
          await deleteMediaFromStorage(item.videoUrl);
        }
        await deleteDoc(doc(db, 'services', serviceId));
        toast.success("Service and media permanently deleted!");
      } catch (error) {
        console.error("Error deleting service: ", error);
        toast.error("Failed to delete service.");
      }
    }
  };

  const handleDeleteAccessory = async (accId) => {
    if (window.confirm("Are you sure you want to delete this accessory? Media files will be deleted to free up storage.")) {
      try {
        const item = accessories.find(a => a.id === accId);
        if (item) {
          await deleteMediaFromStorage(item.imageUrl);
        }
        await deleteDoc(doc(db, 'accessories', accId));
        toast.success("Accessory and media permanently deleted!");
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
      toast.error("Invalid Image URL: Please provide a direct image link.");
      return;
    }
    if (editServiceForm.videoUrl && editServiceForm.videoUrl.length > 800000) {
      toast.error("Attached video data is too large for database storage. Please use '🔗 Paste URL Link' to paste a YouTube or ImageKit link!");
      return;
    }
    if (editServiceForm.imageUrl && editServiceForm.imageUrl.length > 800000) {
      toast.error("Attached image data is too large. Please select a smaller photo or paste an image link.");
      return;
    }
    try {
      await updateDoc(doc(db, 'services', id), editServiceForm);
      toast.success("Service updated successfully!");
      setEditingServiceId(null);
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service. Document size exceeds limit.");
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

  const handleSaveSecondMobileEdit = async (e, id) => {
    e.preventDefault();
    if (!editSecondMobileForm.model?.trim() || !editSecondMobileForm.price?.trim()) {
      toast.error("Please provide at least model and price.");
      return;
    }
    try {
      await updateDoc(doc(db, 'seconds_mobiles', id), editSecondMobileForm);
      toast.success("Seconds mobile details updated successfully!");
      setEditingSecondMobileId(null);
      setEditSecondMobileForm(null);
    } catch (error) {
      console.error("Error updating seconds mobile:", error);
      toast.error("Failed to update entry.");
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    if (!activityForm.model.trim() || !activityForm.serviceType.trim()) {
      toast.error("Please fill in both device model and service type.");
      return;
    }
    setIsSubmittingLog(true);
    try {
      await addDoc(collection(db, 'activity_logs'), {
        ...activityForm,
        completedAt: serverTimestamp()
      });
      toast.success("Live activity logged successfully!");
      setActivityForm({ model: '', serviceType: '', category: 'hardware' });
    } catch (error) {
      console.error("Error logging activity:", error);
      toast.error("Failed to log activity.");
    } finally {
      setIsSubmittingLog(false);
    }
  };

  const handleDeleteActivity = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity log?")) {
      try {
        await deleteDoc(doc(db, 'activity_logs', id));
        toast.success("Activity log deleted.");
      } catch (error) {
        console.error("Error deleting activity:", error);
        toast.error("Failed to delete log.");
      }
    }
  };

  const handleSecondMobileSubmit = async (e) => {
    e.preventDefault();
    if (!secondMobileForm.model.trim() || !secondMobileForm.price.trim()) {
      toast.error("Please provide at least the device model and price.");
      return;
    }
    if (secondMobileForm.imageUrl && secondMobileForm.imageUrl.toLowerCase().includes('.pdf')) {
      toast.error("Invalid Image URL: You have entered a PDF link. Please provide a direct image link.");
      return;
    }
    setIsSubmittingSecondMobile(true);
    try {
      await addDoc(collection(db, 'seconds_mobiles'), {
        ...secondMobileForm,
        createdAt: serverTimestamp()
      });
      toast.success("Seconds mobile added successfully!");
      setSecondMobileForm({ brand: '', model: '', storage: '', condition: '', price: '', imageUrl: '', backImage: '', leftImage: '', rightImage: '' });
    } catch (error) {
      console.error("Error adding seconds mobile:", error);
      toast.error("Failed to add seconds mobile.");
    } finally {
      setIsSubmittingSecondMobile(false);
    }
  };

  const handleDeleteSecondMobile = async (id) => {
    if (window.confirm("Are you sure you want to delete this second-hand mobile entry? All 4 angle photos/videos and data will be permanently deleted from database & storage.")) {
      try {
        const phoneToDelete = secondsMobilesList.find(m => m.id === id);
        if (phoneToDelete) {
          // Delete all 4 angle photos/videos from Firebase Storage
          await deleteMediaFromStorage(phoneToDelete.imageUrl);
          await deleteMediaFromStorage(phoneToDelete.backImage);
          await deleteMediaFromStorage(phoneToDelete.leftImage);
          await deleteMediaFromStorage(phoneToDelete.rightImage);
        }

        await deleteDoc(doc(db, 'seconds_mobiles', id));
        toast.success("Seconds mobile & photos permanently deleted! Storage freed.");
      } catch (error) {
        console.error("Error deleting seconds mobile:", error);
        toast.error("Failed to delete entry.");
      }
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(
    activeTab === 'hardware' || activeTab === 'software' || activeTab === 'accessories'
  );

  return (
    <div className="admin-layout">
      {/* Decorative Glow Blobs */}
      <div className="admin-glow-1"></div>
      <div className="admin-glow-2"></div>

      {/* Topbar / Header with the 3 bars menu icon */}
      <header className="admin-dashboard-header">
        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(true)} title="Open Menu">
          <Menu size={24} />
        </button>
        <div className="admin-dashboard-title-area">
          <Settings color="var(--accent-cyan)" size={24} />
          <h2>Sakthi Mobiles - Admin Dashboard</h2>
        </div>
        <div className="admin-profile">
          <span className="profile-name">Welcome, Admin</span>
          <div className="admin-avatar">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Collapsible Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              className="admin-sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Slide-out Sidebar Panel */}
            <motion.aside 
              className="admin-sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="admin-sidebar-header">
                <div className="admin-brand">
                  <Settings color="#4f46e5" size={28} />
                  <h1>Admin Pro</h1>
                </div>
                <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} title="Close Menu">
                  <X size={24} />
                </button>
              </div>

              <nav className="admin-nav">
                <button 
                  className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
                >
                  <PieChart size={20} />
                  Dashboard Overview
                </button>

                <button 
                  className={`admin-nav-item dropdown-trigger ${(activeTab === 'hardware' || activeTab === 'software' || activeTab === 'accessories' || activeTab === 'seconds') ? 'active' : ''}`}
                  onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                >
                  <Wrench size={20} />
                  Services
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    {isServicesMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </span>
                </button>

                <AnimatePresence>
                  {isServicesMenuOpen && (
                    <motion.div 
                      className="admin-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <button 
                        className={`admin-nav-item sub-item ${activeTab === 'hardware' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('hardware'); setIsSidebarOpen(false); }}
                      >
                        <Wrench size={16} />
                        Hardware Solution
                      </button>

                      <button 
                        className={`admin-nav-item sub-item ${activeTab === 'software' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('software'); setIsSidebarOpen(false); }}
                      >
                        <Sliders size={16} />
                        Software Solution
                      </button>

                      <button 
                        className={`admin-nav-item sub-item ${activeTab === 'accessories' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('accessories'); setIsSidebarOpen(false); }}
                      >
                        <ShoppingBag size={16} />
                        Accessories
                      </button>

                      <button 
                        className={`admin-nav-item sub-item ${activeTab === 'seconds' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('seconds'); setIsSidebarOpen(false); }}
                      >
                        <Smartphone size={16} />
                        Seconds Mobiles
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button 
                  className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('reviews'); setIsSidebarOpen(false); }}
                >
                  <MessageSquarePlus size={20} />
                  Customer Reviews
                </button>
                
                <button 
                  className={`admin-nav-item ${activeTab === 'activity' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('activity'); setIsSidebarOpen(false); }}
                >
                  <Activity size={20} />
                  Live Activity Log
                </button>
                
                <button 
                  className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
                >
                  <Sliders size={20} />
                  Shop Settings
                </button>
              </nav>

              <button className="admin-logout-btn" onClick={() => { handleLogout(); setIsSidebarOpen(false); }}>
                <LogOut size={18} /> Logout securely
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <main className="admin-main">
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

            {/* SERVICES TABS (HARDWARE / SOFTWARE) */}
            {(activeTab === 'hardware' || activeTab === 'software') && (() => {
              const category = activeTab; // 'hardware' or 'software'
              const categoryServices = services.filter(s => s.category === category);
              
              return (
                <motion.div
                  key={`${category}-tab`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <motion.header className="admin-header" variants={itemVariants}>
                    <h2>{category === 'hardware' ? 'Hardware Repair Management' : 'Software Solutions Management'}</h2>
                    <p>Add new {category === 'hardware' ? 'hardware repair services' : 'software solutions'} or remove existing ones from the customer portal.</p>
                  </motion.header>

                  <motion.div className="admin-form-card" variants={itemVariants}>
                    <h3 className="admin-section-title" style={{ marginTop: 0 }}>Add New {category === 'hardware' ? 'Hardware Service' : 'Software Service'}</h3>
                    <form onSubmit={handleServiceSubmit}>
                      <div className="admin-form-group">
                        <label>Service Name</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          value={serviceForm.name}
                          onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                          placeholder={category === 'hardware' ? 'e.g. Display Replacement' : 'e.g. OS Flash / Installation'}
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
                      
                      <FileUploadField 
                        label="Image / Photo (Optional)"
                        value={serviceForm.imageUrl}
                        onChange={(val) => setServiceForm({...serviceForm, imageUrl: val})}
                        placeholder="Paste link or pick from system ->"
                        accept="image/*"
                      />

                      <button type="submit" disabled={isSubmitting} className="admin-btn-primary" style={{ width: '100%' }}>
                        {isSubmitting ? 'Adding...' : <><PlusCircle size={20} /> Publish Service</>}
                      </button>
                    </form>
                  </motion.div>

                  <motion.div style={{ marginTop: '60px' }} variants={containerVariants}>
                    <motion.h2 className="admin-header" variants={itemVariants}>
                      <h2 style={{fontSize: '1.8rem'}}>Existing {category === 'hardware' ? 'Hardware Services' : 'Software Services'}</h2>
                    </motion.h2>

                    {categoryServices.length === 0 ? (
                      <div className="admin-empty-state">No {category === 'hardware' ? 'hardware repair' : 'software solutions'} services found.</div>
                    ) : (
                      <div className="admin-table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th style={{ width: '80px' }}>Image</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryServices.map(service => (
                              <tr key={service.id}>
                                <td data-label="Image">
                                  {service.imageUrl ? (
                                    isVideoUrl(service.imageUrl) ? (
                                      <video src={service.imageUrl} autoPlay loop muted playsInline className="admin-table-thumb" />
                                    ) : (
                                      <img src={service.imageUrl} className="admin-table-thumb" alt={service.name} />
                                    )
                                  ) : (
                                    <div className="admin-table-thumb-placeholder">
                                      <Smartphone size={20} />
                                    </div>
                                  )}
                                </td>
                                <td data-label="Name" style={{ fontWeight: '700' }}>{service.name}</td>
                                <td data-label="Description" style={{ color: 'var(--text-secondary)' }}>{service.desc}</td>
                                <td data-label="Actions">
                                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button onClick={() => { setEditingServiceId(service.id); setEditServiceForm(service); }} className="admin-btn-secondary" style={{ padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Service">
                                      <Settings size={16} />
                                    </button>
                                    <button onClick={() => handleDeleteService(service.id)} className="admin-delete-btn" style={{ width: '32px', height: '32px' }} title="Delete Service">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })()}

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



                    <FileUploadField 
                      label="Image / Photo (Optional)"
                      value={accessoryForm.imageUrl}
                      onChange={(val) => setAccessoryForm({...accessoryForm, imageUrl: val})}
                      placeholder="Paste link or pick from system ->"
                      accept="image/*"
                    />


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
                  {accessories.length === 0 ? (
                    <div className="admin-empty-state">No accessories added yet.</div>
                  ) : (
                    <div className="admin-table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th style={{ width: '80px' }}>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accessories.map(acc => (
                            <tr key={acc.id}>
                              <td data-label="Image">
                                {acc.imageUrl ? (
                                  isVideoUrl(acc.imageUrl) ? (
                                    <video src={acc.imageUrl} autoPlay loop muted playsInline className="admin-table-thumb" />
                                  ) : (
                                    <img src={acc.imageUrl} className="admin-table-thumb" alt={acc.name} />
                                  )
                                ) : (
                                  <div className="admin-table-thumb-placeholder">
                                    <ShoppingBag size={20} />
                                  </div>
                                )}
                              </td>
                              <td data-label="Name" style={{ fontWeight: '700' }}>{acc.name}</td>
                              <td data-label="Description" style={{ color: 'var(--text-secondary)' }}>{acc.desc}</td>
                              <td data-label="Actions">
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                  <button onClick={() => { setEditingAccessoryId(acc.id); setEditAccessoryForm(acc); }} className="admin-btn-secondary" style={{ padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit Accessory">
                                    <Settings size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteAccessory(acc.id)} className="admin-delete-btn" style={{ width: '32px', height: '32px' }} title="Delete Accessory">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* SECONDS MOBILES TAB */}
            {activeTab === 'seconds' && (
              <motion.div
                key="seconds-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Seconds Mobiles Management</h2>
                  <p>Manage second-hand used mobile inventory available for sale.</p>
                </motion.header>

                <motion.div className="admin-form-card" variants={itemVariants} style={{ marginBottom: '40px' }}>
                  <form onSubmit={handleSecondMobileSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="admin-form-group">
                        <label>Brand</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          value={secondMobileForm.brand}
                          onChange={(e) => setSecondMobileForm({...secondMobileForm, brand: e.target.value})}
                          placeholder="e.g. Apple / Samsung"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Model Name</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          value={secondMobileForm.model}
                          onChange={(e) => setSecondMobileForm({...secondMobileForm, model: e.target.value})}
                          placeholder="e.g. iPhone 12 Pro"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="admin-form-group">
                        <label>Storage / Specs</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          value={secondMobileForm.storage}
                          onChange={(e) => setSecondMobileForm({...secondMobileForm, storage: e.target.value})}
                          placeholder="e.g. 128 GB"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Price</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          value={secondMobileForm.price}
                          onChange={(e) => setSecondMobileForm({...secondMobileForm, price: e.target.value})}
                          placeholder="e.g. ₹24,999"
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Condition / Details</label>
                      <input 
                        type="text" required
                        className="admin-input"
                        value={secondMobileForm.condition}
                        onChange={(e) => setSecondMobileForm({...secondMobileForm, condition: e.target.value})}
                        placeholder="e.g. Superb Condition (92% Battery Health, Minor Scratches)"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px' }}>
                      <FileUploadField 
                        label="1. Front Photo / Video (Main)"
                        value={secondMobileForm.imageUrl}
                        onChange={(val) => setSecondMobileForm({...secondMobileForm, imageUrl: val})}
                        placeholder="Paste link or pick from system ->"
                      />

                      <FileUploadField 
                        label="2. Back Photo / Video"
                        value={secondMobileForm.backImage}
                        onChange={(val) => setSecondMobileForm({...secondMobileForm, backImage: val})}
                        placeholder="Paste link or pick from system ->"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <FileUploadField 
                        label="3. Left Side Photo / Video"
                        value={secondMobileForm.leftImage}
                        onChange={(val) => setSecondMobileForm({...secondMobileForm, leftImage: val})}
                        placeholder="Paste link or pick from system ->"
                      />

                      <FileUploadField 
                        label="4. Right Side Photo / Video"
                        value={secondMobileForm.rightImage}
                        onChange={(val) => setSecondMobileForm({...secondMobileForm, rightImage: val})}
                        placeholder="Paste link or pick from system ->"
                      />
                    </div>

                    <button type="submit" disabled={isSubmittingSecondMobile} className="admin-btn-primary">
                      {isSubmittingSecondMobile ? 'Adding...' : <><PlusCircle size={20} /> Add Seconds Mobile</>}
                    </button>
                  </form>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="admin-section-title">Current Seconds Mobiles ({secondsMobilesList.length})</h3>
                  {secondsMobilesList.length === 0 ? (
                    <div className="admin-empty-state">No second-hand mobiles added yet.</div>
                  ) : (
                    <div className="admin-table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th style={{ width: '80px' }}>Photo</th>
                            <th>Brand & Model</th>
                            <th>Storage</th>
                            <th>Condition</th>
                            <th>Price</th>
                            <th style={{ width: '100px', textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {secondsMobilesList.map(phone => (
                            <tr key={phone.id}>
                              <td data-label="Photo">
                                {phone.imageUrl ? (
                                  isVideoUrl(phone.imageUrl) ? (
                                    <video src={phone.imageUrl} autoPlay loop muted playsInline className="admin-table-thumb" />
                                  ) : (
                                    <img src={phone.imageUrl} className="admin-table-thumb" alt={phone.model} />
                                  )
                                ) : (
                                  <div className="admin-table-thumb-placeholder">
                                    <Smartphone size={20} />
                                  </div>
                                )}
                              </td>
                              <td data-label="Brand & Model" style={{ fontWeight: '700' }}>
                                {phone.brand} {phone.model}
                              </td>
                              <td data-label="Storage">{phone.storage}</td>
                              <td data-label="Condition" style={{ color: 'var(--text-secondary)' }}>{phone.condition}</td>
                              <td data-label="Price" style={{ fontWeight: '700', color: 'var(--accent-cyan)' }}>{phone.price}</td>
                              <td data-label="Actions">
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                  <button 
                                    onClick={() => { setEditingSecondMobileId(phone.id); setEditSecondMobileForm(phone); }} 
                                    className="admin-btn-secondary" 
                                    style={{ padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                                    title="Edit Entry"
                                  >
                                    <Settings size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteSecondMobile(phone.id)} className="admin-delete-btn" style={{ width: '32px', height: '32px' }} title="Delete Entry">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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

            {/* LIVE ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <motion.div
                key="activity-tab"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.header className="admin-header" variants={itemVariants}>
                  <h2>Live Shop Activity Log</h2>
                  <p>Broadcast daily completed services and repairs instantly to the customer portal.</p>
                </motion.header>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '30px', alignItems: 'start' }}>
                  
                  {/* Log Form Card */}
                  <motion.div className="admin-form-card" variants={itemVariants} style={{ margin: 0, width: '100%' }}>
                    <h3 className="admin-section-title" style={{ marginTop: 0 }}>Add Live Update</h3>
                    
                    {/* Quick Preset Buttons */}
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        Quick Presets
                      </label>
                      <div className="activity-presets-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button 
                          type="button" 
                          className="admin-preset-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => setActivityForm({ category: 'hardware', model: 'iPhone 13', serviceType: 'Display Replacement' })}
                        >
                          <Smartphone size={13} color="var(--accent-cyan)" /> iPhone Display
                        </button>
                        <button 
                          type="button" 
                          className="admin-preset-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => setActivityForm({ category: 'hardware', model: 'OnePlus 9R', serviceType: 'Display Glass Replacement' })}
                        >
                          <ShieldCheck size={13} color="var(--accent-cyan)" /> Glass Fix
                        </button>
                        <button 
                          type="button" 
                          className="admin-preset-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => setActivityForm({ category: 'hardware', model: 'Redmi Note 11', serviceType: 'Battery Replacement' })}
                        >
                          <Battery size={13} color="var(--accent-gold)" /> Battery Change
                        </button>
                        <button 
                          type="button" 
                          className="admin-preset-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => setActivityForm({ category: 'hardware', model: 'Samsung M31', serviceType: 'IC Level Motherboard Repair' })}
                        >
                          <Zap size={13} color="var(--accent-gold)" /> IC Board Repair
                        </button>
                        <button 
                          type="button" 
                          className="admin-preset-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => setActivityForm({ category: 'software', model: 'Poco X3 Pro', serviceType: 'Software Flash & Unlocking' })}
                        >
                          <Sliders size={13} color="var(--accent-cyan)" /> Software Flash
                        </button>
                        <button 
                          type="button" 
                          className="admin-preset-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => setActivityForm({ category: 'accessories', model: 'Realme Buds TWS', serviceType: 'Accessory Sales / Delivery' })}
                        >
                          <ShoppingBag size={13} color="var(--accent-cyan)" /> Accessory Sale
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleActivitySubmit}>
                      <div className="admin-form-group">
                        <label>Category</label>
                        <select 
                          className="admin-input"
                          value={activityForm.category}
                          onChange={(e) => setActivityForm({...activityForm, category: e.target.value})}
                        >
                          <option value="hardware">Hardware Repair</option>
                          <option value="software">Software Solutions</option>
                          <option value="accessories">Accessories / Sales</option>
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label>Device Model / Product Name</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          placeholder="e.g. iPhone 13 Pro"
                          value={activityForm.model}
                          onChange={(e) => setActivityForm({...activityForm, model: e.target.value})}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Service Completed</label>
                        <input 
                          type="text" required
                          className="admin-input"
                          placeholder="e.g. Screen Replacement"
                          value={activityForm.serviceType}
                          onChange={(e) => setActivityForm({...activityForm, serviceType: e.target.value})}
                        />
                      </div>

                      <button type="submit" disabled={isSubmittingLog} className="admin-btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                        {isSubmittingLog ? 'Logging...' : 'Add Live Update'}
                      </button>
                    </form>
                  </motion.div>

                  {/* History Logs Table Card */}
                  <motion.div className="admin-form-card" variants={itemVariants} style={{ margin: 0, width: '100%', maxWidth: 'none' }}>
                    <h3 className="admin-section-title" style={{ marginTop: 0 }}>Activity Log History</h3>
                    
                    {/* Search & Filter Bar */}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                      <input 
                        type="text"
                        className="admin-input"
                        placeholder="Search by device model..."
                        value={logSearchQuery}
                        onChange={(e) => setLogSearchQuery(e.target.value)}
                        style={{ flex: 1, minWidth: '200px' }}
                      />
                      <select 
                        className="admin-input"
                        value={logCategoryFilter}
                        onChange={(e) => setLogCategoryFilter(e.target.value)}
                        style={{ width: '180px' }}
                      >
                        <option value="all">All Categories</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="accessories">Accessories</option>
                      </select>
                    </div>

                    <div className="admin-table-container" style={{ margin: 0 }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Device</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activityLogs
                            .filter(log => {
                              const matchesSearch = log.model.toLowerCase().includes(logSearchQuery.toLowerCase());
                              const matchesCategory = logCategoryFilter === 'all' ? true : log.category === logCategoryFilter;
                              return matchesSearch && matchesCategory;
                            })
                            .map((log) => (
                              <tr key={log.id}>
                                <td><strong>{log.model}</strong></td>
                                <td>{log.serviceType}</td>
                                <td>
                                  <span className={`category-badge ${log.category}`} style={{ textTransform: 'capitalize' }}>
                                    {log.category}
                                  </span>
                                </td>
                                <td>{log.completedAt ? log.completedAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</td>
                                <td>
                                  <button 
                                    className="admin-action-btn delete"
                                    onClick={() => handleDeleteActivity(log.id)}
                                    title="Delete Activity"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Edit Service Modal */}
      {editingServiceId && editServiceForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <button className="admin-modal-close" onClick={() => setEditingServiceId(null)}>
              <X size={20} />
            </button>
            <h3 className="admin-modal-title">Edit Service Details</h3>
            <form onSubmit={(e) => handleSaveServiceEdit(e, editingServiceId)}>
              <div className="admin-form-group">
                <label>Category</label>
                <select 
                  className="admin-input" 
                  value={editServiceForm.category} 
                  onChange={(e) => setEditServiceForm({...editServiceForm, category: e.target.value})}
                >
                  <option value="hardware">Hardware Repair</option>
                  <option value="software">Software Solutions</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Service Name</label>
                <input 
                  type="text" className="admin-input" required 
                  value={editServiceForm.name} 
                  onChange={(e) => setEditServiceForm({...editServiceForm, name: e.target.value})} 
                />
              </div>

              <div className="admin-form-group">
                <label>Short Description (For listings)</label>
                <input 
                  type="text" className="admin-input" required 
                  value={editServiceForm.desc} 
                  onChange={(e) => setEditServiceForm({...editServiceForm, desc: e.target.value})} 
                />
              </div>

              <div className="admin-form-group">
                <label>Detailed Description / Steps (Markdown supported)</label>
                <textarea 
                  rows="4" className="admin-input" 
                  value={editServiceForm.details || ''} 
                  onChange={(e) => setEditServiceForm({...editServiceForm, details: e.target.value})} 
                />
              </div>

              <FileUploadField 
                label="Image / Photo (Optional)"
                value={editServiceForm.imageUrl}
                onChange={(val) => setEditServiceForm({...editServiceForm, imageUrl: val})}
                placeholder="Paste link or pick from system ->"
                accept="image/*"
              />

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1 }}>Save Changes</button>
                <button type="button" onClick={() => setEditingServiceId(null)} className="admin-btn-secondary" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Accessory Modal */}
      {editingAccessoryId && editAccessoryForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <button className="admin-modal-close" onClick={() => setEditingAccessoryId(null)}>
              <X size={20} />
            </button>
            <h3 className="admin-modal-title">Edit Accessory Details</h3>
            <form onSubmit={(e) => handleSaveAccessoryEdit(e, editingAccessoryId)}>
              <div className="admin-form-group">
                <label>Accessory Name</label>
                <input 
                  type="text" className="admin-input" required 
                  value={editAccessoryForm.name} 
                  onChange={(e) => setEditAccessoryForm({...editAccessoryForm, name: e.target.value})} 
                />
              </div>

              <div className="admin-form-group">
                <label>Description</label>
                <input 
                  type="text" className="admin-input" required 
                  value={editAccessoryForm.desc} 
                  onChange={(e) => setEditAccessoryForm({...editAccessoryForm, desc: e.target.value})} 
                />
              </div>

              <FileUploadField 
                label="Image / Photo (Optional)"
                value={editAccessoryForm.imageUrl}
                onChange={(val) => setEditAccessoryForm({...editAccessoryForm, imageUrl: val})}
                placeholder="Paste link or pick from system ->"
                accept="image/*"
              />

              <div className="admin-form-group">
                <label>Icon / Category</label>
                <select 
                  className="admin-input" 
                  value={editAccessoryForm.icon} 
                  onChange={(e) => setEditAccessoryForm({...editAccessoryForm, icon: e.target.value})}
                >
                  <option value="Headphones">Audio / Headphones</option>
                  <option value="Battery">Batteries / Power Banks</option>
                  <option value="Smartphone">Cases / Tempered Glass</option>
                  <option value="Cable">Cables / Adapters</option>
                  <option value="ShoppingBag">Other / General</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1 }}>Save Changes</button>
                <button type="button" onClick={() => setEditingAccessoryId(null)} className="admin-btn-secondary" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Seconds Mobile Modal */}
      {editingSecondMobileId && editSecondMobileForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            <button className="admin-modal-close" onClick={() => setEditingSecondMobileId(null)}>
              <X size={20} />
            </button>
            <h3 className="admin-modal-title">Edit Seconds Mobile Details</h3>
            <form onSubmit={(e) => handleSaveSecondMobileEdit(e, editingSecondMobileId)}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="admin-form-group">
                  <label>Brand</label>
                  <input 
                    type="text" className="admin-input" required 
                    value={editSecondMobileForm.brand || ''} 
                    onChange={(e) => setEditSecondMobileForm({...editSecondMobileForm, brand: e.target.value})} 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Model Name</label>
                  <input 
                    type="text" className="admin-input" required 
                    value={editSecondMobileForm.model || ''} 
                    onChange={(e) => setEditSecondMobileForm({...editSecondMobileForm, model: e.target.value})} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="admin-form-group">
                  <label>Storage / Specs</label>
                  <input 
                    type="text" className="admin-input" required 
                    value={editSecondMobileForm.storage || ''} 
                    onChange={(e) => setEditSecondMobileForm({...editSecondMobileForm, storage: e.target.value})} 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Price</label>
                  <input 
                    type="text" className="admin-input" required 
                    value={editSecondMobileForm.price || ''} 
                    onChange={(e) => setEditSecondMobileForm({...editSecondMobileForm, price: e.target.value})} 
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Condition / Details</label>
                <input 
                  type="text" className="admin-input" required 
                  value={editSecondMobileForm.condition || ''} 
                  onChange={(e) => setEditSecondMobileForm({...editSecondMobileForm, condition: e.target.value})} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
                <FileUploadField 
                  label="1. Front Photo / Video"
                  value={editSecondMobileForm.imageUrl}
                  onChange={(val) => setEditSecondMobileForm({...editSecondMobileForm, imageUrl: val})}
                  placeholder="Paste link or pick from system ->"
                />
                <FileUploadField 
                  label="2. Back Photo / Video"
                  value={editSecondMobileForm.backImage}
                  onChange={(val) => setEditSecondMobileForm({...editSecondMobileForm, backImage: val})}
                  placeholder="Paste link or pick from system ->"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <FileUploadField 
                  label="3. Left Side Photo / Video"
                  value={editSecondMobileForm.leftImage}
                  onChange={(val) => setEditSecondMobileForm({...editSecondMobileForm, leftImage: val})}
                  placeholder="Paste link or pick from system ->"
                />
                <FileUploadField 
                  label="4. Right Side Photo / Video"
                  value={editSecondMobileForm.rightImage}
                  onChange={(val) => setEditSecondMobileForm({...editSecondMobileForm, rightImage: val})}
                  placeholder="Paste link or pick from system ->"
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1 }}>Save Changes</button>
                <button type="button" onClick={() => setEditingSecondMobileId(null)} className="admin-btn-secondary" style={{ flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
