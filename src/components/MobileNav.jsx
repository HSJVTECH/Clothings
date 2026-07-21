import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileNav = () => {
  const location = useLocation();
  const { setIsCartOpen, setIsSearchOpen, totalItems } = useCart();

  const getLinkClass = (path) => {
    return `flex flex-col items-center gap-1 py-3 transition-colors ${
      location.pathname === path ? 'text-white font-medium' : 'text-white/40 hover:text-white'
    }`;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-primary/95 backdrop-blur-md border-t border-white/10 z-50">
      <div className="flex flex-row justify-around items-center">
        <Link to="/" className={getLinkClass('/')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10px] tracking-wider">Home</span>
        </Link>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 py-3 text-white/40 hover:text-white transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[10px] tracking-wider">Search</span>
        </button>

        <Link to="/collection" className={getLinkClass('/collection')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <span className="text-[10px] tracking-wider">Shop</span>
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 py-3 text-white/40 hover:text-white transition-colors relative"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute top-2 right-4 w-3.5 h-3.5 bg-white text-primary text-[8px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="text-[10px] tracking-wider">Cart</span>
        </button>

        <Link to="/contact" className={getLinkClass('/contact')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[10px] tracking-wider">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
