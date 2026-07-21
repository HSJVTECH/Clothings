import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ progress, isComplete }) => {
  return (
    <motion.div
      key="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center"
    >
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.3em] uppercase">
        ZMARKS
      </h1>
      <div className="font-mono text-sm text-accent tabular-nums mt-8">
        {Math.round(progress)}%
      </div>
      <div className="w-48 h-[1px] bg-white/10 mt-4 overflow-hidden relative">
        <div
          className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
