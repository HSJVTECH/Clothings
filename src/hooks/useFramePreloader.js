import { useState, useEffect, useRef } from 'react';

export default function useFramePreloader(frameCount = 226, basePath = '/frames/ezgif-frame-') {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 3 : 1;
    const framesToLoad = [];
    
    for (let i = 1; i <= frameCount; i += step) {
      framesToLoad.push(i);
    }
    
    let loadedCount = 0;
    const totalToLoad = framesToLoad.length;
    const images = new Array(frameCount).fill(null);
    
    const promises = framesToLoad.map(frameNum => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedNum = String(frameNum).padStart(3, '0');
        img.src = `${basePath}${paddedNum}.jpg`;
        img.onload = () => {
          images[frameNum - 1] = img;
          loadedCount++;
          setProgress(Math.round((loadedCount / totalToLoad) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalToLoad) * 100));
          resolve();
        };
      });
    });
    
    Promise.all(promises).then(() => {
      // Fill gaps for mobile (copy nearest loaded frame)
      if (isMobile) {
        for (let i = 0; i < frameCount; i++) {
          if (!images[i]) {
            // Find nearest loaded frame
            for (let j = i - 1; j >= 0; j--) {
              if (images[j]) { images[i] = images[j]; break; }
            }
          }
        }
      }
      imagesRef.current = images.filter(Boolean);
      setIsLoaded(true);
    });
  }, [frameCount, basePath]);

  return { images: imagesRef.current, progress, isLoaded };
}
