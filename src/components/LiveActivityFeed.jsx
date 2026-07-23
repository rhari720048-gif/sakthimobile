import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { Smartphone, CheckCircle, Clock, Activity } from 'lucide-react';
import './LiveActivityFeed.css';

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  
  const date = timestamp.toDate();
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Tick to refresh timestamps every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'activity_logs'),
      orderBy('completedAt', 'desc'),
      limit(15)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivities(logs);
    }, (error) => {
      console.error("Error fetching activity logs:", error);
    });

    return () => unsubscribe();
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (activeFilter === 'all') return true;
    return activity.category === activeFilter;
  });

  return (
    <section className="live-feed-section">
      <div className="container">
        <div className="live-feed-header-panel glass-panel">
          <div className="live-header-title">
            <div className="live-pulse-container">
              <span className="live-pulse-dot"></span>
              <span className="live-pulse-ring"></span>
            </div>
            <h2>Live Shop <span className="gradient-text-cyan">Activity Stream</span></h2>
          </div>
          <p>Real-time updates of repairs completed at our shop right now.</p>
          
          {/* Filter Tabs */}
          <div className="feed-filters">
            <button 
              className={`feed-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Completed
            </button>
            <button 
              className={`feed-filter-btn ${activeFilter === 'hardware' ? 'active' : ''}`}
              onClick={() => setActiveFilter('hardware')}
            >
              Hardware Repairs
            </button>
            <button 
              className={`feed-filter-btn ${activeFilter === 'software' ? 'active' : ''}`}
              onClick={() => setActiveFilter('software')}
            >
              Software Solutions
            </button>
            <button 
              className={`feed-filter-btn ${activeFilter === 'accessories' ? 'active' : ''}`}
              onClick={() => setActiveFilter('accessories')}
            >
              Accessories Fitted
            </button>
          </div>
        </div>

        <div className="live-feed-list-container">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredActivities.length === 0 ? (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="feed-empty-state glass-panel"
              >
                <Activity size={32} color="var(--text-secondary)" style={{ opacity: 0.5, marginBottom: '10px' }} />
                <p>No recent activity logged for this category today.</p>
              </motion.div>
            ) : (
              filteredActivities.map((activity) => (
                <motion.div 
                  key={activity.id}
                  className="feed-item-card glass-panel"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  whileHover={{ scale: 1.015, y: -2, boxShadow: '0 12px 30px rgba(6, 182, 212, 0.08)' }}
                >
                  <div className="feed-item-icon-wrapper">
                    <div className="feed-check-icon">
                      <CheckCircle size={18} color="#fff" />
                    </div>
                    <div className="feed-device-icon">
                      <Smartphone size={22} color="var(--accent-cyan)" />
                    </div>
                  </div>
                  
                  <div className="feed-item-details">
                    <div className="feed-item-header">
                      <h3>{activity.model}</h3>
                      <span className="feed-badge-time">
                        <Clock size={12} style={{ marginRight: '4px' }} />
                        {formatRelativeTime(activity.completedAt)}
                      </span>
                    </div>
                    <p>{activity.serviceType}</p>
                  </div>

                  <span className={`feed-category-tag ${activity.category}`}>
                    {activity.category === 'hardware' && 'Hardware'}
                    {activity.category === 'software' && 'Software'}
                    {activity.category === 'accessories' && 'Accessory'}
                  </span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;
