import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Display maatha evlo neram aagum?",
      answer: "Maximum 1 hour la original display pottu thodachutu poyite irukkalam! Sila models ku konjam extra time edukalam."
    },
    {
      question: "Service panna warranty unda?",
      answer: "Kandipa! Naanga pandra service ku and maathura parts ku strict warranty undu. Nambi kudukalam."
    },
    {
      name: "Water damage aana phone a ready panna mudiyuma?",
      answer: "Thannila vizhuntha phone-a udane kondu vantha 90% save pannidalam. Dead aana phone-a kooda IC level repair panni ready panniduvom."
    },
    {
      question: "Courier la anuppi service panna mudiyuma?",
      answer: "Yes, neenga enga Srivilliputhur address-ku courier podalam. Naanga receive panni, check panni cost solliduvom. Okay sonnathum service panni safe-a return courier anuppiduvom."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2>Makkal <span className="text-gradient">Kelvigal</span> (FAQ)</h2>
          <p>Unkalukku irukkura doubts ku inga pathil irukku.</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass-panel ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question || faq.name}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown color={activeIndex === index ? 'var(--accent-color)' : '#a1a1aa'} />
                </motion.div>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer-wrapper"
                  >
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
