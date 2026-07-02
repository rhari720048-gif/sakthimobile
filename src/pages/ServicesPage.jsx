import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Accessories from '../components/Accessories';
import Footer from '../components/Footer';
import GoogleAd from '../components/GoogleAd';
import TextReveal from '../components/TextReveal';
import { HelpCircle } from 'lucide-react';

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      
      <div style={{ paddingTop: '80px' }}>
        <Services />
        <Accessories />
        
        <div className="container"><GoogleAd slotId="services-page-slot" /></div>

        {/* Extra Well-Planned Section for Services Page */}
        <section className="faq-section" style={{ padding: '60px 0', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <TextReveal text={<>Frequently Asked <span className="gradient-text-cyan">Questions</span></>} />
              <p>Got questions? We've got answers about our services and repairs.</p>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {faqs.map((faq, index) => (
                <div key={index} className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    <HelpCircle size={20} color="var(--accent-cyan)" />
                    {faq.question}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', marginLeft: '30px', fontSize: '0.95rem' }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ServicesPage;
