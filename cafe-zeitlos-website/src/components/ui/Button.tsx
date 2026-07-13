import React, { type ButtonHTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">;

export const Button = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cafe-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-cafe-ivory';
    
    const variants = {
      primary: 'bg-cafe-espresso text-cafe-ivory hover:bg-cafe-cocoa',
      secondary: 'bg-cafe-gold text-cafe-espresso hover:bg-[#b0915a]',
      outline: 'border-2 border-cafe-espresso text-cafe-espresso hover:bg-cafe-espresso hover:text-cafe-ivory',
      ghost: 'hover:bg-cafe-cream text-cafe-espresso',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-8 text-base',
      lg: 'h-14 px-10 text-lg',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
