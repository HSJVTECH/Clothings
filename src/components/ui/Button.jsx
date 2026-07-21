import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ variant = 'primary', size = 'md', children, className = '', href, ...rest }) => {
  const baseClasses = "inline-flex items-center justify-center tracking-[0.12em] uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:text-secondary"
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[11px]",
    md: "px-8 py-4 text-[11px]",
    lg: "px-10 py-5 text-xs"
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
