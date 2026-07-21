import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-secondary/80 backdrop-blur-md border-t border-b border-white/10 text-white section-padding">
      <div className="container-narrow text-center">
        <h2 className="text-display-md font-display text-white mb-4">Stay in the Loop</h2>
        <p className="text-body-md text-white/40 mb-10 max-w-md mx-auto">
          Be the first to know about new collections and exclusive drops.
        </p>

        {submitted ? (
          <p className="text-sm text-white/60">Thank you for subscribing.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required
              className="flex-1 bg-transparent border-b border-white/20 text-white placeholder:text-white/25 py-3 text-sm outline-none focus:border-white/50 transition-colors"
            />
            <button 
              type="submit" 
              className="bg-white text-primary px-8 py-3 text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-white/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
