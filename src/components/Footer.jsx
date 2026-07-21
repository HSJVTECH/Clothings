import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 lg:py-28 px-6 lg:px-12 border-t border-white/10 relative z-10">
      <div className="container-luxury">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display text-4xl sm:text-6xl tracking-[0.2em]">ZMARKS</h2>
          <p className="text-xs text-white/50 tracking-[0.2em] uppercase mt-3">
            Imported Luxury Clothing • Mumbai Flagship
          </p>
        </div>

        <div className="border-t border-white/10 my-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent mb-6 font-medium">Navigation</h3>
            <div className="space-y-3">
              <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors block">Home</Link>
              <Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors block">Collection</Link>
              <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors block">About Us</Link>
              <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors block">Store & Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent mb-6 font-medium">Collections</h3>
            <div className="space-y-3">
              <Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors block">Baggy Selvedge Jeans</Link>
              <Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors block">Heavyweight Hoodies</Link>
              <Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors block">Italian Leather Jackets</Link>
              <Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors block">Raw Denim Jackets</Link>
              <Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors block">One-Piece Silhouettes</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent mb-6 font-medium">Store Guarantee</h3>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p>✓ 100% Imported Clothing</p>
              <p>✓ Best Rates Guaranteed</p>
              <p>✓ 7-Day Easy Returns</p>
              <p className="text-white pt-2 font-medium">💡 10% Off Google Maps Walk-in Offer</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-accent mb-6 font-medium">Mumbai Flagship</h3>
            <div className="text-xs text-white/60 space-y-2 leading-relaxed">
              <p className="text-white font-medium">Zmarks Imported Clothing</p>
              <p>Shop 227, Second Floor, City Center Mall, Swami Vivekanand Rd, Goregaon West, Mumbai 400104</p>
              <p className="text-white/80 pt-1">📞 079779 35364</p>
              <p className="text-white/60">Open Daily: 10:00 AM — 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/30 border-t border-white/10 pt-8 mt-12">
          <p>&copy; {new Date().getFullYear()} ZMARKS Imported Clothing. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">City Center Mall, Goregaon West</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
