import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import LoadingScreen from './components/LoadingScreen';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';

import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Contact from './pages/Contact';

import useFramePreloader from './hooks/useFramePreloader';
import { CartProvider, useCart } from './context/CartContext';

function ToastContainer() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="fixed bottom-20 md:bottom-8 right-6 z-[100] bg-white text-primary px-6 py-4 rounded-none shadow-2xl border border-black/10 flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs uppercase tracking-wider font-semibold">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MainApp() {
  const { images: heroImages, progress, isLoaded: heroLoaded } = useFramePreloader(226);
  const [showLoading, setShowLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (heroLoaded) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [heroLoaded]);

  return (
    <SmoothScroll>
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen progress={progress} isComplete={heroLoaded} />
        )}
      </AnimatePresence>

      <Navbar />
      <ToastContainer />

      <main className="bg-[#0B0B0B]">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route
                path="/"
                element={<Home heroImages={heroImages} heroLoaded={heroLoaded && !showLoading} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
      <MobileNav />
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
