import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const WriteReview = () => {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'reviews'), {
        name: form.name.trim(),
        text: form.text.trim(),
        rating: form.rating,
        createdAt: serverTimestamp()
      });
      
      toast.success("Thank you! Your feedback has been submitted successfully.", {
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

      setForm({ name: '', text: '', rating: 5 });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="write-review-section" style={{ padding: '40px 0 60px 0', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: 'var(--glass-bg)',
            border: 'var(--glass-border)',
            borderRadius: '24px',
            padding: '40px 30px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
              Loved Our Service? <span className="gradient-text-gold">Share Your Feedback!</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Your review helps us improve and guides other customers in Srivilliputhur.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Your Name</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Ramesh Kumar"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)'}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Rating</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= (hoverRating || form.rating);
                  return (
                    <Star 
                      key={star} 
                      size={28} 
                      fill={isFilled ? "var(--accent-gold)" : "transparent"} 
                      color={isFilled ? "var(--accent-gold)" : "rgba(255,255,255,0.2)"} 
                      onClick={() => setForm({ ...form, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                    />
                  );
                })}
                <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700, marginLeft: '8px' }}>
                  {form.rating} / 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Your Message</label>
              <textarea 
                required 
                rows="4" 
                placeholder="How was your experience with Sakthi Mobiles?"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(6, 182, 212, 0.2)'}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="glass-button primary"
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                padding: '14px', 
                fontSize: '1rem', 
                marginTop: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Feedback</>}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default WriteReview;
