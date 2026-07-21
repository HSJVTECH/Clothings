import { useState, useEffect, useRef } from 'react';

export default function useMouseParallax() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      // Normalize from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRef.current = { x, y };
    };

    const updatePosition = () => {
      // Lerp factor
      const factor = 0.05;
      
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * factor;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * factor;

      setPosition({ x: currentRef.current.x, y: currentRef.current.y });
      requestRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return position;
}
