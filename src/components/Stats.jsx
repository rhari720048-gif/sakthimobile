import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Users, Wrench, Smartphone } from 'lucide-react';
import './Stats.css';
const Counter = ({ from, to, duration, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration / 1000,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          
          <motion.div 
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -10, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" }}
          >
            <div className="stat-icon shimmer-effect">
              <Wrench size={36} color="var(--accent-gold)" />
            </div>
            <Counter from={0} to={5} duration={1500} suffix="+" />
            <p>Years Experience</p>
          </motion.div>

          <motion.div 
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -10, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" }}
          >
            <div className="stat-icon shimmer-effect">
              <Smartphone size={36} color="var(--accent-cyan)" />
            </div>
            <Counter from={0} to={5000} duration={2000} suffix="+" />
            <p>Mobiles Serviced</p>
          </motion.div>

          <motion.div 
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -10, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" }}
          >
            <div className="stat-icon">
              <Users size={36} color="var(--accent-gold)" />
            </div>
            <Counter from={0} to={10000} duration={2000} suffix="+" />
            <p>Happy Customers</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Stats;
