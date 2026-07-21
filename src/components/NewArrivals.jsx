import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ui/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const NewArrivals = () => {
  const containerRef = useRef(null);
  const newArrivals = products.slice(0, 4);

  useEffect(() => {
    const el = containerRef.current;
    
    gsap.fromTo(
      el.querySelectorAll('.new-arrival-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section className="container-luxury section-padding" ref={containerRef}>
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-caption uppercase tracking-[0.2em] text-accent mb-2">New In</p>
          <h2 className="text-display-md font-display text-white">New Arrivals</h2>
        </div>
        <Link to="/collection" className="text-sm text-white/70 hover:text-white transition-colors pb-1">
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {newArrivals.map((product, index) => (
          <div key={product.id} className="new-arrival-card">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
