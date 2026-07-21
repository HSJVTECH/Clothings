import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

gsap.registerPlugin(ScrollTrigger);

const FeaturedCategories = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Use first 5 categories or mock if not enough
  const displayCategories = categories && categories.length >= 5 
    ? categories.slice(0, 5) 
    : [
        { id: '1', name: 'Outerwear', image: '' },
        { id: '2', name: 'Knitwear', image: '' },
        { id: '3', name: 'Trousers', image: '' },
        { id: '4', name: 'Shirts', image: '' },
        { id: '5', name: 'Accessories', image: '' }
      ];

  useEffect(() => {
    const el = containerRef.current;
    
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="container-luxury section-padding" ref={containerRef}>
      <div className="mb-12">
        <p className="text-caption uppercase tracking-[0.2em] text-accent mb-2">Explore</p>
        <h2 className="text-display-md font-display text-white">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {displayCategories.map((category, index) => {
          const isLarge = index < 2;
          const colSpanClass = isLarge ? "col-span-2 lg:col-span-3" : "col-span-1 lg:col-span-2";
          const aspectClass = isLarge ? "aspect-[16/10]" : "aspect-square";
          
          return (
            <Link 
              to={`/category/${category.id}`} 
              key={category.id}
              ref={addToRefs}
              className={`${colSpanClass} ${aspectClass} relative overflow-hidden bg-secondary/80 border border-white/10 group cursor-pointer block`}
            >
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { 
                    e.target.style.display = 'none'; 
                    e.target.parentElement.classList.add('bg-secondary'); 
                  }}
                />
              ) : (
                <div className="w-full h-full bg-secondary group-hover:scale-105 transition-transform duration-700"></div>
              )}
              
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-display-sm font-display text-white">{category.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCategories;
