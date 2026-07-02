import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Wrench, Smartphone } from 'lucide-react';
import './Stats.css';

const Counter = ({ from, to, duration, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
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
            viewport={{ once: true }}
          >
            <div className="stat-icon">
              <Wrench size={36} color="var(--accent-color)" />
            </div>
            <Counter from={0} to={5} duration={1500} suffix="+" />
            <p>Years Experience</p>
          </motion.div>

          <motion.div 
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon">
              <Smartphone size={36} color="var(--accent-color)" />
            </div>
            <Counter from={0} to={5000} duration={2000} suffix="+" />
            <p>Mobiles Serviced</p>
          </motion.div>

          <motion.div 
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-icon">
              <Users size={36} color="var(--accent-color)" />
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
