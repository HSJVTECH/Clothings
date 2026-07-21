import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAnimation({ images, isLoaded }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const currentFrameRef = useRef(0);
  const requestRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Limit maximum frame index to 224 (Frame 225) so garment on pedestal stays proudly displayed
    const maxFrameIndex = Math.min(images.length - 1, 224);

    const drawFrame = () => {
      const imgIndex = Math.min(currentFrameRef.current, maxFrameIndex);
      const img = images[imgIndex] || images[maxFrameIndex] || images[0];
      if (!img || !ctx) {
        requestRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Crop out Veo watermark: 15% bottom, 15% right (guarantees logo removal)
      const srcW = Math.floor(img.width * 0.85);
      const srcH = Math.floor(img.height * 0.85);
      const srcRatio = srcW / srcH;

      // Cover calculation to fill canvas
      const canvasRatio = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > srcRatio) {
        drawW = canvas.width;
        drawH = canvas.width / srcRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * srcRatio;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, 0, 0, srcW, srcH, drawX, drawY, drawW, drawH);
      requestRef.current = requestAnimationFrame(drawFrame);
    };

    requestRef.current = requestAnimationFrame(drawFrame);

    // ── GSAP ScrollTrigger: Scrub frames as user scrolls through the 250vh hero ──
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * maxFrameIndex),
          maxFrameIndex
        );
        currentFrameRef.current = frameIndex;
        setScrollProgress(self.progress);
      }
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, [images, isLoaded]);

  // Initial text overlay at top of scroll
  const showIntroOverlay = scrollProgress < 0.2;
  // Final static hero overlay when animation reaches the peak product pedestal frame
  const showFinalOverlay = scrollProgress > 0.82;

  return (
    <section ref={sectionRef} className="relative h-[250vh] w-full bg-primary">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Subtle radial dark overlay for spotlight text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

        {/* ── 1. Intro overlay (Progress < 20%) ── */}
        <AnimatePresence>
          {showIntroOverlay && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="text-[11px] tracking-[0.35em] text-white/60 uppercase mb-6 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                ZMARKS PRESENTS
              </motion.p>
              <motion.h1
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                THE NOIR<br />COLLECTION
              </motion.h1>
              <motion.p
                className="text-white/60 text-base md:text-lg mt-6 max-w-md font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Imported luxury. Defined by darkness.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 2. Final Hero overlay (Progress > 82%) ── Appears over peak pedestal shot ── */}
        <AnimatePresence>
          {showFinalOverlay && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="text-[11px] tracking-[0.35em] text-accent uppercase mb-4 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                LIMITED EDITIONS
              </motion.span>
              <motion.h2
                className="font-display text-4xl md:text-6xl text-white mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Curated Luxury Display
              </motion.h2>
              <motion.p
                className="text-white/70 text-sm md:text-base max-w-md mb-8 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hand-selected imported streetwear & tailored silhouettes. Available now in Mumbai.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/collection"
                  className="inline-block bg-white text-primary px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white/90 transition-all duration-300 shadow-2xl"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scroll hint ── */}
        {scrollProgress < 0.05 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-3">Scroll to unveil</span>
            <motion.div
              className="w-[1px] h-8 bg-white/40"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
