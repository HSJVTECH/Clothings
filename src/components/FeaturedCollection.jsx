import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { products, getFeaturedProducts } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const FeaturedCollection = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);

  const featuredItems = getFeaturedProducts ? getFeaturedProducts() : products.slice(0, 6);

  useEffect(() => {
    // Only apply GSAP horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      const pinScroll = gsap.to(scrollRef.current, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (scrollWidth - viewportWidth),
        }
      });
      
      return () => {
        pinScroll.kill();
      };
    });

    return () => mm.revert();
  }, [featuredItems]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <section className="py-20 overflow-hidden" ref={triggerRef}>
      <div className="container-luxury mb-12">
        <p className="text-caption uppercase tracking-[0.2em] text-accent mb-2">Featured</p>
        <h2 className="text-display-md font-display text-white">Curated Selection</h2>
      </div>
      
      <div className="w-full relative" ref={containerRef}>
        {/* Mobile: Native scroll, Desktop: GSAP horizontal scroll */}
        <div 
          className="flex lg:flex-nowrap overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 lg:gap-8 pb-4 lg:pb-0 no-scrollbar px-5 lg:px-12"
          ref={scrollRef}
        >
          {featuredItems.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id}
              className="w-[380px] lg:w-[420px] flex-shrink-0 snap-start aspect-[3/4] relative overflow-hidden bg-secondary/80 border border-white/10 group cursor-pointer block"
            >
              <img 
                src={product.images && product.images[0] ? product.images[0] : ''} 
                alt={product.name} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end pointer-events-none">
                <h3 className="text-lg font-display text-white mb-1">{product.name}</h3>
                <p className="text-sm text-white/70">{formatPrice(product.price)}</p>
              </div>

              {product.badge && (
                <div className="absolute top-4 right-4 bg-white text-primary text-[10px] tracking-[0.1em] uppercase px-3 py-1">
                  {product.badge}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
