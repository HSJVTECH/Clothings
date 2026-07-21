import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef();
  
  const particlesCount = 50;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // x, y, z
      pos[i * 3] = (Math.random() - 0.5) * 6; // -3 to 3
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6; // -3 to 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6; // -3 to 3
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // y drift
      positions[i3 + 1] += 0.002;
      
      // x sin wave drift
      positions[i3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      
      // Reset if too high
      if (positions[i3 + 1] > 3) {
        positions[i3 + 1] = -3;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function FloatingParticles() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        gl={{ alpha: true, antialias: false }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
