import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle, align = 'left', className = '' }) => {
  return (
    <div className={`text-${align} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && (
          <span className="text-caption uppercase tracking-[0.2em] text-text-muted mb-3 block">
            {label}
          </span>
        )}
        {title && (
          <h2 className="text-display-md font-display text-text-primary mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-body-md text-text-secondary">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default SectionHeading;
