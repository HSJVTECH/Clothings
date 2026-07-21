import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const Product = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('M');
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="container-luxury section-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-display-md font-display mb-4 text-white">Product not found</h2>
        <Link to="/collection" className="bg-white text-primary px-8 py-4 text-xs uppercase tracking-widest font-medium">
          Back to Collection
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price);
  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.originalPrice) : null;
  
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <main className="relative z-10 bg-primary text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-50 bg-white text-primary px-6 py-4 border border-black/10 shadow-2xl flex items-center gap-3"
          >
            <span className="text-emerald-600 font-bold">✓</span>
            <span className="text-xs uppercase tracking-wider font-semibold">Added {product.name} (Size {size}) to Bag!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="container-luxury section-padding-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="aspect-[3/4] overflow-hidden bg-secondary/80 border border-white/10 relative">
              <img src={product.image || product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-white text-primary text-[10px] tracking-[0.1em] uppercase px-3 py-1 font-semibold">
                  {product.badge}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-caption text-white/50 mb-6">
              <Link to="/" className="hover:text-white">Home</Link> &gt; <Link to="/collection" className="hover:text-white">Collection</Link> &gt; <span className="text-white">{product.name}</span>
            </div>
            
            <div className="text-caption uppercase tracking-[0.2em] text-accent mb-2">
              {product.category}
            </div>
            <h1 className="text-display-sm font-display text-white mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-display text-white">{formattedPrice}</span>
              {formattedOriginalPrice && <span className="text-lg text-white/40 line-through">{formattedOriginalPrice}</span>}
            </div>
            
            <div className="divider my-6 border-b border-white/10" />
            
            <p className="text-body-md text-white/70 mb-6 font-light leading-relaxed">
              {product.description || 'A premium piece designed with impeccable attention to detail.'}
            </p>
            
            <div className="bg-secondary/60 p-4 border border-white/10 text-body-sm text-white/80 mb-6">
              <strong className="text-white font-medium">Fabric & Material:</strong> {product.fabric || '100% Premium Cotton'}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-white">Select Size</p>
                <span className="text-xs text-accent cursor-pointer hover:text-white transition-colors">Size Guide</span>
              </div>
              <div className="flex gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 border text-xs font-medium tracking-wider transition ${size === s ? 'bg-white text-primary border-white font-bold' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm font-medium text-white">Quantity:</span>
              <div className="flex items-center border border-white/20">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white">-</button>
                <span className="w-10 text-center text-sm font-mono text-white">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white">+</button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full mt-8 py-5 bg-white text-primary text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-white/90 transition-all duration-300 shadow-2xl"
            >
              Add to Shopping Bag
            </button>
            
            <div className="mt-8 space-y-2 text-xs text-white/50 border-t border-white/10 pt-6">
              <p>✓ Free store pickup at City Center Mall, Goregaon West</p>
              <p>✓ 100% genuine imported garment guarantee</p>
              <p>✓ Mention Google Maps for 10% in-store discount</p>
            </div>
          </div>
        </div>
      </section>
      
      {relatedProducts.length > 0 && (
        <section className="container-luxury section-padding-sm border-t border-white/10">
          <h2 className="text-display-sm font-display mb-8 text-white">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Product;
