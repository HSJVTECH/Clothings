import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { filterCategories } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProducts = getProductsByCategory(activeCategory);

  return (
    <main className="relative z-10 bg-[#0B0B0B] text-white min-h-screen">
      <section className="h-[35vh] bg-[#121212] flex flex-col items-center justify-center border-b border-white/10 text-center px-4">
        <span className="text-[11px] tracking-[0.35em] text-accent uppercase mb-3 font-medium">ZMARKS CATALOG</span>
        <h1 className="text-4xl sm:text-6xl font-display text-white tracking-tight">THE COLLECTION</h1>
        <p className="text-xs text-white/50 tracking-[0.2em] uppercase mt-3">Imported Luxury Garments • Goregaon West, Mumbai</p>
      </section>

      <section className="container-luxury section-padding-sm">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {filterCategories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 text-[11px] tracking-[0.12em] uppercase transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-white text-primary border border-white font-bold shadow-lg'
                    : 'bg-secondary/80 text-white/70 border border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium">{filteredProducts.length} Items Found</p>
          <span className="text-xs text-white/40 hidden sm:inline">Click any item for full details & sizing</span>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
};

export default Collection;
