import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AboutBrand = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const el = containerRef.current;
    
    // Parallax image
    gsap.fromTo(
      imageRef.current,
      { y: -50 },
      {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Staggered text fade up
    gsap.fromTo(
      textRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section className="container-luxury section-padding" ref={containerRef}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="aspect-[4/5] overflow-hidden bg-surface relative">
          <img 
            ref={imageRef}
            src="/frames/ezgif-frame-001.jpg" 
            alt="About Zmarks" 
            className="w-full h-[120%] -top-[10%] relative object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        
        <div>
          <p ref={addToRefs} className="text-caption uppercase tracking-[0.2em] text-accent mb-4">OUR STORY</p>
          <h2 ref={addToRefs} className="text-display-md font-display text-white mb-8">Crafted for the Bold</h2>
          <p ref={addToRefs} className="text-body-md text-white/70 leading-relaxed mb-6">
            At Zmarks, we believe luxury isn't about logos — it's about the way a garment makes you feel. Every piece in our collection is hand-selected from the world's finest manufacturers.
          </p>
          <p ref={addToRefs} className="text-body-md text-white/70 leading-relaxed mb-8">
            Based in the heart of Mumbai, we bring international fashion to India. Premium fabrics, impeccable construction, and designs that transcend seasons.
          </p>
          <div ref={addToRefs}>
            <Link to="/about" className="inline-block px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-primary transition-colors duration-300 text-sm tracking-wider uppercase">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
