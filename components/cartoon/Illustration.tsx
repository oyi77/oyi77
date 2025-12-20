'use client';

import { motion } from 'framer-motion';

interface IllustrationProps {
  type: 'cloud' | 'star' | 'heart' | 'sparkle';
  className?: string;
  size?: number;
}

export default function Illustration({ type, className = '', size = 40 }: IllustrationProps) {
  const renderIllustration = () => {
    switch (type) {
      case 'cloud':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M 20 40 Q 10 40 10 30 Q 10 20 20 20 Q 25 10 35 10 Q 45 10 50 20 Q 60 10 70 10 Q 80 10 85 20 Q 95 20 95 30 Q 95 40 85 40 Z"
              fill="#FFFFFF"
              opacity="0.9"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M 50 10 L 55 35 L 80 35 L 60 50 L 65 75 L 50 60 L 35 75 L 40 50 L 20 35 L 45 35 Z"
              fill="#FFD93D"
            />
          </svg>
        );
      case 'heart':
        return (
          <svg viewBox="0 0 100 90" className="w-full h-full">
            <path
              d="M 50 85 Q 10 50 10 30 Q 10 15 25 15 Q 35 15 50 30 Q 65 15 75 15 Q 90 15 90 30 Q 90 50 50 85 Z"
              fill="#FF6B9D"
            />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="8" fill="#FFD93D" />
            <line x1="50" y1="10" x2="50" y2="30" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="70" x2="50" y2="90" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="10" y1="50" x2="30" y2="50" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="50" x2="90" y2="50" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="20" x2="35" y2="35" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="80" x2="65" y2="65" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="20" x2="65" y2="35" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="80" x2="35" y2="65" stroke="#FFD93D" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {renderIllustration()}
    </motion.div>
  );
}

