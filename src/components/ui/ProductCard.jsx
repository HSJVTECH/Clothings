import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', 1);
    setIsCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="aspect-[3/4] overflow-hidden bg-secondary/80 border border-white/10 mb-4 relative">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center text-sm font-medium text-accent p-4 text-center">
              {product.name}
            </div>
          ) : (
            <img
              src={product.image || product.images?.[0]}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          )}

          {product.badge && (
            <div className="absolute top-3 left-3 bg-white text-primary text-[10px] tracking-[0.1em] uppercase px-3 py-1 font-semibold z-10">
              {product.badge}
            </div>
          )}

          {/* Quick Add Button on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-white text-primary py-2.5 text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              + Quick Add
            </button>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors">{product.name}</h3>
            <p className="text-xs text-white/50 mt-0.5">{product.category}</p>
          </div>
          <p className="text-sm font-display text-white">{formattedPrice}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
