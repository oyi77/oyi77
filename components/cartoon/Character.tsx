'use client';

import { motion } from 'framer-motion';

interface CharacterProps {
  variant?: 'idle' | 'working' | 'celebrating' | 'waving';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Character({ variant = 'idle', size = 'md', className = '' }: CharacterProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const animations = {
    idle: { scale: [1, 1.05, 1], transition: { duration: 3, repeat: Infinity } },
    working: { rotate: [0, 5, -5, 0], transition: { duration: 1, repeat: Infinity } },
    celebrating: { y: [0, -10, 0], rotate: [0, 10, -10, 0], transition: { duration: 0.5, repeat: Infinity } },
    waving: { rotate: [0, 20, -20, 0], transition: { duration: 0.6, repeat: Infinity } },
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      animate={animations[variant]}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Head */}
        <circle cx="50" cy="35" r="20" fill="#FFD93D" stroke="#FF6B35" strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="45" cy="32" r="3" fill="#2C3E50" />
        <circle cx="55" cy="32" r="3" fill="#2C3E50" />
        
        {/* Blink animation */}
        {variant === 'idle' && (
          <motion.rect
            x="42"
            y="30"
            width="6"
            height="4"
            fill="#FFD93D"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
        
        {/* Smile */}
        <path
          d="M 40 40 Q 50 45 60 40"
          stroke="#2C3E50"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Body */}
        <rect x="35" y="50" width="30" height="35" rx="5" fill="#4ECDC4" stroke="#FF6B35" strokeWidth="2" />
        
        {/* Arms */}
        <motion.line
          x1="35"
          y1="60"
          x2="20"
          y2="70"
          stroke="#FFD93D"
          strokeWidth="4"
          strokeLinecap="round"
          animate={variant === 'waving' ? { x2: [20, 25, 20] } : {}}
        />
        <line x1="65" y1="60" x2="80" y2="70" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" />
        
        {/* Legs */}
        <line x1="42" y1="85" x2="42" y2="95" stroke="#6BCB77" strokeWidth="4" strokeLinecap="round" />
        <line x1="58" y1="85" x2="58" y2="95" stroke="#6BCB77" strokeWidth="4" strokeLinecap="round" />
        
        {/* Accessories */}
        {variant === 'working' && (
          <>
            {/* Glasses */}
            <circle cx="45" cy="32" r="8" fill="none" stroke="#2C3E50" strokeWidth="1.5" />
            <circle cx="55" cy="32" r="8" fill="none" stroke="#2C3E50" strokeWidth="1.5" />
            <line x1="53" y1="32" x2="47" y2="32" stroke="#2C3E50" strokeWidth="1.5" />
          </>
        )}
        
        {variant === 'celebrating' && (
          <>
            {/* Party hat */}
            <path d="M 50 15 L 45 25 L 55 25 Z" fill="#FF6B9D" />
            <circle cx="50" cy="20" r="2" fill="#FFD93D" />
          </>
        )}
      </svg>
    </motion.div>
  );
}

