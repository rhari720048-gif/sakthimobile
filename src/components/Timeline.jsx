import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Search, Wrench, CheckCircle } from 'lucide-react';
import './Timeline.css';
import TextReveal from './TextReveal';

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      title: "Drop Off or Pickup",
      desc: "Visit our shop in Srivilliputhur or request a pickup. We handle your device with care.",
      icon: <MapPin size={24} color="#fff" />
    },
    {
      title: "Free Diagnosis",
      desc: "Our experts thoroughly check your device to find the exact issue without any hidden charges.",
      icon: <Search size={24} color="#fff" />
    },
    {
      title: "Expert Repair",
      desc: "We fix your phone using genuine parts and professional tools, usually within 1-2 hours.",
      icon: <Wrench size={24} color="#fff" />
    },
    {
      title: "Quality Check & Delivery",
      desc: "After a strict quality check, your perfectly working phone is ready for you!",
      icon: <CheckCircle size={24} color="#fff" />
    }
  ];

  return (
    <section id="process" className="timeline-section" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <TextReveal text={<>Namma <span className="gradient-text-cyan">Work Process</span></>} />
          <p>How we get your phone back to life, step by step.</p>
        </div>

        <div className="timeline-container">
          {/* Background Track */}
          <div className="timeline-track"></div>
          
          {/* Animated Fill Track */}
          <motion.div 
            className="timeline-track-fill" 
            style={{ height: lineHeight }}
          />

          {steps.map((step, index) => (
            <div key={index} className={`timeline-step ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content-wrapper">
                <motion.div 
                  className="timeline-content glass-panel"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                >
                  <div className="step-number">Step {index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </motion.div>
              </div>

              {/* Center Node */}
              <div className="timeline-node-wrapper">
                <motion.div 
                  className="timeline-node"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {step.icon}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
