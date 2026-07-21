import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    { q: 'Do you offer returns?', a: 'Yes, within 7 days of purchase with original tags intact.' },
    { q: 'Where are you located?', a: 'We are located on the second floor, Shop 227, City Center Mall, Swami Vivekanand Rd, Goregaon West, Mumbai.' },
    { q: 'Are all products genuine imported clothing?', a: 'Yes, 100% genuine hand-selected imported clothing from top global manufacturing hubs.' },
    { q: 'Is there a discount if I find you via Google Maps?', a: 'Yes! Walk in and mention Google Maps for an instant 10% discount on your total bill.' },
    { q: 'Do you offer alterations?', a: 'Yes, basic fitting and hem alterations are available in-store.' }
  ];

  return (
    <main className="relative z-10 bg-primary text-white">
      <section className="h-[40vh] bg-secondary flex items-center justify-center border-b border-white/10">
        <div className="text-center px-4">
          <span className="text-[11px] tracking-[0.3em] text-accent uppercase mb-2 block font-medium">VISIT US IN MUMBAI</span>
          <h1 className="text-display-lg font-display text-white">Get in Touch</h1>
        </div>
      </section>

      <section className="container-luxury section-padding-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-2xl font-display mb-8">Send us a message</h2>
            {submitted ? (
              <div className="bg-secondary/80 border border-white/10 p-8 text-center rounded-none">
                <h3 className="font-display text-xl mb-2 text-white">Message Received</h3>
                <p className="text-white/60 text-sm">Thank you for reaching out to Zmarks. Our team will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-caption uppercase tracking-[0.1em] text-white/50 mb-2 block">Name</label>
                  <input required type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-body-md text-white outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="text-caption uppercase tracking-[0.1em] text-white/50 mb-2 block">Email</label>
                  <input required type="email" className="w-full bg-transparent border-b border-white/20 py-3 text-body-md text-white outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="text-caption uppercase tracking-[0.1em] text-white/50 mb-2 block">Phone</label>
                  <input type="tel" className="w-full bg-transparent border-b border-white/20 py-3 text-body-md text-white outline-none focus:border-white transition-colors" />
                </div>
                <div>
                  <label className="text-caption uppercase tracking-[0.1em] text-white/50 mb-2 block">Message</label>
                  <textarea required className="w-full bg-transparent border-b border-white/20 py-3 text-body-md text-white outline-none focus:border-white transition-colors h-32 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full mt-8 bg-white text-primary py-4 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white/90 transition-colors">
                  Submit Message
                </button>
              </form>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-display mb-8">Visit Our Flagship Store</h2>
            
            <div className="space-y-6 bg-secondary/80 border border-white/10 p-8">
              <div>
                <div className="text-caption uppercase tracking-[0.15em] text-accent mb-1">Address</div>
                <div className="text-body-md text-white">
                  Shop 227, Second Floor, City Center Mall,<br />
                  Swami Vivekanand Rd, Divyapuri CHS, Shri Nagar,<br />
                  Goregaon West, Mumbai, Maharashtra 400104
                </div>
              </div>

              <div>
                <div className="text-caption uppercase tracking-[0.15em] text-accent mb-1">Phone / WhatsApp</div>
                <a href="tel:07977935364" className="text-body-md text-white hover:text-accent transition-colors">
                  079779 35364
                </a>
              </div>

              <div>
                <div className="text-caption uppercase tracking-[0.15em] text-accent mb-1">Store Hours</div>
                <div className="text-body-md text-white">Open Daily: 10:00 AM — 10:00 PM</div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="bg-white/5 p-4 border border-white/10 mb-6">
                  <p className="text-xs text-white/80">
                    💡 <strong>Special Offer:</strong> Walk in and mention finding us via Google Maps to get <span className="text-white font-semibold">10% OFF</span> your bill!
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=City+Center+Mall+Swami+Vivekanand+Rd+Goregaon+West+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center border border-white/30 text-white py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Get Directions on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow section-padding-sm border-t border-white/10">
        <h2 className="text-display-sm font-display text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center py-5 text-left text-body-md font-medium text-white hover:text-accent transition-colors"
              >
                {faq.q}
                <span className="text-lg font-light">{openIndex === idx ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden text-body-sm text-white/70"
                  >
                    <div className="pb-5 leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
