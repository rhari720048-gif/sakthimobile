import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import './Reviews.css';
import TextReveal from './TextReveal';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';



const Reviews = () => {
  const [customReviews, setCustomReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', text: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reviews'), (querySnapshot) => {
      const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomReviews(fetchedReviews);
    }, (error) => {
      console.error("Error fetching reviews: ", error);
    });

    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return;
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'reviews'), {
        ...reviewForm,
        createdAt: serverTimestamp()
      });
      setShowForm(false);
      setReviewForm({ name: '', text: '', rating: 5 });
      toast.success("Thank you! Your review has been submitted.", {
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
    } catch (error) {
      console.error("Error adding review: ", error);
      toast.error("Failed to submit review. Please try again.", {
        style: {
          background: 'var(--glass-bg)',
          color: 'var(--text-primary)',
          border: 'var(--glass-border)',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allReviews = customReviews;
  const marqueeReviews = [...allReviews, ...allReviews, ...allReviews];

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header">
          <TextReveal text={<>Customer <span className="gradient-text-gold">Reviews</span></>} />
          <p>Makkal namma service pathi enna nenaikranga nu kelunga.</p>
          <button 
            onClick={() => setShowForm(true)} 
            className="glass-button primary"
            style={{ margin: '20px auto 0', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquarePlus size={18} /> Write a Review
          </button>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`}
              className="review-card glass-panel"
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <h4>{review.name}</h4>
                </div>
                <div className="review-rating shimmer-effect">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
              className="service-modal-content glass-panel"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '90%', maxWidth: '400px', padding: '30px', position: 'relative' }}
            >
              <button 
                onClick={() => setShowForm(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
              
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Leave a Review</h3>
              
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Your Name</label>
                  <input 
                    type="text" required placeholder="e.g. Ramesh"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Rating</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={24} 
                        fill={star <= reviewForm.rating ? "var(--accent-gold)" : "transparent"} 
                        color={star <= reviewForm.rating ? "var(--accent-gold)" : "#ccc"} 
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Your Feedback</label>
                  <textarea 
                    required rows="4" placeholder="How was the service?"
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                
                <button type="submit" disabled={isSubmitting} className="glass-button primary w-full justify-center" style={{ marginTop: '10px' }}>
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;
