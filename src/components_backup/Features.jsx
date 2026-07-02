import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Cpu, Smartphone } from 'lucide-react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={32} color="#10b981" />,
      title: "Genuine & Transparent",
      desc: "Original parts venuma, illa budget-ketha maari quality parts venuma? Ungalukku theliva puriyavechu thaan service pannuvom."
    },
    {
      icon: <Cpu size={32} color="var(--accent-color)" />,
      title: "Low Budget Motherboard Service",
      desc: "Phone dead aagiducha? Kavalaiye vendam! Srivilliputhur-laye romba low budget-la theliva IC level service panni tharuvom."
    },
    {
      icon: <Smartphone size={32} color="#3b82f6" />,
      title: "Exclusive Glass Replacement",
      desc: "Srivilliputhur-la naanga mattum thaan Normal display-kku mattum illama, Edge display-kkum pakka-va Glass Replacement pandrom."
    },
    {
      icon: <Clock size={32} color="#ef4444" />,
      title: "Quick Service",
      desc: "Maximum services 1 or 2 hours-la mudichu kaiyoda kuduthuduvom. Unga time romba mukkiyam."
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Engala Yen <span className="text-gradient">Choose Pannanum?</span></h2>
          <p>Sakthi Mobiles-a unga mobile repair-ku select panna idhuthaan kaaranam.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
