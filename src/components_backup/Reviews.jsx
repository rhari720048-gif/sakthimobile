import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Reviews.css';

const dummyReviews = [
  { id: 'd1', name: 'Karthik', text: 'Display change pannen. Original part use pannanga. Romba neat and clean work!', rating: 5 },
  { id: 'd2', name: 'Rajesh', text: 'Motherboard dead nu sonna phone a romba kammi selavula ready panni kuduthutanga. Best service in Srivilliputhur.', rating: 5 },
  { id: 'd3', name: 'Priya', text: 'Quick and fast service. Just 1 hour la ennoda iPhone display mathi kuduthutanga. Trustworthy.', rating: 5 },
  { id: 'd4', name: 'Muthu', text: 'Budget ketha maari first copy option-um sonnanga. Transparent service. Thanks!', rating: 4 },
  { id: 'd5', name: 'Saravanan', text: 'Edge display glass change pakka-va pannanga. Yaarum ivalo clear a panna maattanga.', rating: 5 },
  { id: 'd6', name: 'Dinesh', text: 'Water damage aan phone data full-a save panni eduthu thandhutanga. Life saver!', rating: 5 },
];

const Reviews = () => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2>Customer <span className="text-gradient">Reviews</span></h2>
          <p>Makkal namma service pathi enna nenaikranga nu kelunga.</p>
        </div>

        <div className="reviews-grid">
          {dummyReviews.map((review, index) => (
            <motion.div 
              key={review.id}
              className="review-card glass-panel"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <h4>{review.name}</h4>
                </div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                  ))}
                </div>
              </div>
              <p className="review-text">"{review.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
