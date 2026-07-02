import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Cpu, Smartphone } from 'lucide-react';
import './Features.css';
import TextReveal from './TextReveal';

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={32} color="var(--accent-cyan)" />,
      title: "Genuine & Transparent",
      desc: "Original parts venuma, illa budget-ketha maari quality parts venuma? Ungalukku theliva puriyavechu thaan service pannuvom."
    },
    {
      icon: <Cpu size={32} color="var(--accent-gold)" />,
      title: "Low Budget Motherboard Service",
      desc: "Phone dead aagiducha? Kavalaiye vendam! Srivilliputhur-laye romba low budget-la theliva IC level service panni tharuvom."
    },
    {
      icon: <Smartphone size={32} color="var(--accent-cyan)" />,
      title: "Exclusive Glass Replacement",
      desc: "Srivilliputhur-la naanga mattum thaan Normal display-kku mattum illama, Edge display-kkum pakka-va Glass Replacement pandrom."
    },
    {
      icon: <Clock size={32} color="var(--accent-gold)" />,
      title: "Quick Service",
      desc: "Maximum services 1 or 2 hours-la mudichu kaiyoda kuduthuduvom. Unga time romba mukkiyam."
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <TextReveal text={<>Engala Yen <span className="gradient-text-cyan">Choose Pannanum?</span></>} />
          <p>Sakthi Mobiles-a unga mobile repair-ku select panna idhuthaan kaaranam.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`feature-card bento-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="feature-icon-wrapper shimmer-effect">
                {feature.icon}
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
