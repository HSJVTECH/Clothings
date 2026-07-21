import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const filteredSearch = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 h-[72px] transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/90 backdrop-blur-md text-white border-b border-white/10 shadow-2xl'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="container-luxury h-full flex items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link
            to="/"
            className="font-display font-semibold tracking-[0.3em] uppercase text-lg hover:text-accent transition-colors"
          >
            ZMARKS
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-body text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-accent ${
                    isActive ? 'text-white font-medium border-b border-white pb-0.5' : 'text-white/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Icons (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hover:text-accent transition-colors p-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="hover:text-accent transition-colors p-2 relative"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-primary text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={() => setIsCartOpen(true)} className="p-2 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-primary text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-white">
              <div className="w-6 h-[1.5px] bg-current mb-1.5"></div>
              <div className="w-6 h-[1.5px] bg-current"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── 1. Interactive Sliding Cart Drawer ── */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-[#121212] border-l border-white/10 text-white z-[120] flex flex-col justify-between p-6 sm:p-8 shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-white/10">
                  <h3 className="font-display text-2xl">Shopping Bag ({totalItems})</h3>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-accent text-lg">
                    ✕
                  </button>
                </div>

                <div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center bg-secondary/60 p-4 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-surface" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{item.name}</h4>
                        <p className="text-xs text-white/50 mt-1">Size: {item.size}</p>
                        <p className="text-sm text-white/80 mt-2">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, item.size, -1)} className="w-6 h-6 border border-white/20 flex items-center justify-center text-xs hover:bg-white/10">-</button>
                          <span className="text-xs font-mono px-2">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, 1)} className="w-6 h-6 border border-white/20 flex items-center justify-center text-xs hover:bg-white/10">+</button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-xs text-white/40 hover:text-white p-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {cart.length === 0 && (
                    <p className="text-center text-white/40 py-12 text-sm">Your shopping bag is empty.</p>
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6 text-sm">
                    <span className="text-white/60">Subtotal</span>
                    <span className="text-lg font-display text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    onClick={() => alert('Demo Checkout: Thank you for testing the Zmarks luxury store demo!')}
                    className="w-full bg-white text-primary py-4 text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-white/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── 2. Live Search Modal ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-md z-[120] flex flex-col p-6 sm:p-12"
          >
            <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
              <span className="text-[11px] tracking-[0.3em] text-white/50 uppercase font-medium">SEARCH ZMARKS CATALOG</span>
              <button onClick={() => setIsSearchOpen(false)} className="text-white p-2 hover:text-accent text-sm tracking-wider">
                ✕ CLOSE
              </button>
            </div>

            <div className="max-w-4xl mx-auto w-full mt-12">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type jeans, hoodies, leather jackets..."
                autoFocus
                className="w-full bg-transparent border-b border-white/20 text-2xl sm:text-4xl font-display text-white placeholder:text-white/20 py-4 outline-none focus:border-white transition-colors"
              />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto no-scrollbar">
                {filteredSearch.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex gap-4 items-center bg-secondary/80 p-4 border border-white/10 hover:border-white/30 transition-all"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-12 h-16 object-cover bg-surface" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{p.name}</h4>
                      <p className="text-xs text-white/60 mt-1">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-primary z-[130] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-4xl text-white uppercase tracking-widest hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
