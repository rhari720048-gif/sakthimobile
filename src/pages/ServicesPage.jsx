import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Services from '../components/Services';
import Footer from '../components/Footer';
import GoogleAd from '../components/GoogleAd';
import LiveSupportCard from '../components/LiveSupportCard';
import TextReveal from '../components/TextReveal';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How long does a screen replacement take?",
    answer: "Most screen replacements are completed within 1 to 2 hours. We prioritize quick service so you get your device back on the same day."
  },
  {
    question: "Do you use original spare parts?",
    answer: "Yes! We strictly use 100% original and high-quality OEM spare parts for all our repairs to ensure longevity and performance."
  },
  {
    question: "Do you offer warranty on repairs?",
    answer: "Absolutely. We offer a standard warranty on our hardware repairs and replaced parts. Please ask our technician about the specific warranty period for your repair."
  },
  {
    question: "How does the courier service work?",
    answer: "You can send us your broken device via courier from anywhere in Tamil Nadu. We will inspect it, share a quote, fix it upon your approval, and safely courier it back to you."
  }
];

const ServicesPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      
      <div style={{ paddingTop: '80px' }}>
        <div className="pb-0">
          <Services />
        </div>
        
        <div className="container mt-0 mb-0"><GoogleAd slotId="services-page-slot" /></div>

        <LiveSupportCard />

        {/* Extra Well-Planned Section for Services Page */}
        <section className="faq-section pt-0" style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <TextReveal text={<>Frequently Asked <span className="gradient-text-cyan">Questions</span></>} />
              <p>Got questions? We've got answers about our services and repairs.</p>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {faqs.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <motion.div 
                    key={index} 
                    className="glass-panel" 
                    whileHover={{ scale: 1.01, y: -2, boxShadow: '0 12px 30px rgba(6, 182, 212, 0.08)' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    style={{ padding: '24px', borderRadius: '16px', border: 'var(--glass-border)', background: 'var(--glass-bg)', cursor: 'pointer' }}
                  >
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
                      <HelpCircle size={20} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                      <span style={{ flexGrow: 1 }}>{faq.question}</span>
                      <motion.span 
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent-cyan)' }}
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </h4>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{ color: 'var(--text-secondary)', marginLeft: '30px', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
