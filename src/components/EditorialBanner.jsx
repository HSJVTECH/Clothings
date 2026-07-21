import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const EditorialBanner = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;

    // Subtle parallax zoom on background
    gsap.fromTo(
      bgRef.current,
      { scale: 1 },
      {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Staggered text entrance
    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section className="w-full h-[85vh] relative overflow-hidden bg-primary" ref={containerRef}>
      {/* Background image with dark editorial overlay */}
      <img
        ref={bgRef}
        src="/frames/ezgif-frame-001.jpg"
        alt="Zmarks Luxury Campaign"
        className="absolute inset-0 w-full h-full object-cover opacity-40 filter brightness-90"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      
      {/* Ambient spotlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-black/40 to-primary/80 pointer-events-none" />

      {/* Content wrapper echoing the starting scene grandeur */}
      <div
        ref={textRef}
        className="z-10 relative flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mx-auto"
      >
        <span className="text-[11px] tracking-[0.35em] text-accent uppercase mb-6 font-medium">
          ZMARKS • MUMBAI FLAGSHIP
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display text-white mb-6 leading-[0.95] tracking-tight">
          DEFINED BY DARKNESS
        </h2>

        <p className="text-white/60 text-sm md:text-base mb-10 max-w-xl leading-relaxed font-light">
          Visit our store at Shop 227, City Center Mall, Goregaon West. Enjoy 10% off your purchase when you mention finding us via Google Maps.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/contact"
            className="bg-white text-primary px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-all duration-300 w-full sm:w-auto"
          >
            Visit Store
          </Link>
          <Link
            to="/collection"
            className="border border-white/30 text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white hover:text-primary transition-all duration-500 w-full sm:w-auto"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
