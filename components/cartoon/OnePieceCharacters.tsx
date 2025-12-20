'use client';

import { motion } from 'framer-motion';

interface CharacterProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'idle' | 'waving' | 'excited';
}

// Luffy - Straw Hat Captain
export function Luffy({ size = 'md', className = '', variant = 'idle' }: CharacterProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const animations = {
    idle: { y: [0, -5, 0], transition: { duration: 2, repeat: Infinity } },
    waving: { rotate: [0, 15, -15, 0], y: [0, -5, 0], transition: { duration: 1, repeat: Infinity } },
    excited: { scale: [1, 1.1, 1], rotate: [0, 10, -10, 0], transition: { duration: 0.5, repeat: Infinity } },
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      animate={animations[variant]}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Straw Hat */}
        <ellipse cx="50" cy="25" rx="30" ry="8" fill="#FFD700" stroke="#8B4513" strokeWidth="1.5" />
        <ellipse cx="50" cy="30" rx="28" ry="6" fill="#FFD700" />
        <line x1="20" y1="30" x2="80" y2="30" stroke="#8B4513" strokeWidth="1" />
        
        {/* Face */}
        <circle cx="50" cy="50" r="22" fill="#FFDBAC" stroke="#000" strokeWidth="1.5" />
        
        {/* Eyes */}
        <circle cx="42" cy="48" r="3" fill="#000" />
        <circle cx="58" cy="48" r="3" fill="#000" />
        
        {/* Scar under left eye */}
        <line x1="38" y1="52" x2="42" y2="52" stroke="#000" strokeWidth="1.5" />
        
        {/* Big smile */}
        <path
          d="M 35 58 Q 50 68 65 58"
          stroke="#000"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Body - Red vest */}
        <rect x="35" y="70" width="30" height="25" rx="3" fill="#C8102E" stroke="#000" strokeWidth="1.5" />
        <line x1="50" y1="70" x2="50" y2="95" stroke="#000" strokeWidth="1" />
        
        {/* Arms */}
        <line x1="35" y1="75" x2="20" y2="85" stroke="#FFDBAC" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="75" x2="80" y2="85" stroke="#FFDBAC" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// Nami - Navigator
export function Nami({ size = 'md', className = '', variant = 'idle' }: CharacterProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const animations = {
    idle: { y: [0, -3, 0], transition: { duration: 2.5, repeat: Infinity } },
    waving: { rotate: [0, 10, -10, 0], transition: { duration: 1, repeat: Infinity } },
    excited: { scale: [1, 1.05, 1], transition: { duration: 0.6, repeat: Infinity } },
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      animate={animations[variant]}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Orange hair */}
        <path
          d="M 30 20 Q 50 10 70 20 Q 75 35 70 50 Q 50 45 30 50 Q 25 35 30 20"
          fill="#FF8C00"
          stroke="#000"
          strokeWidth="1.5"
        />
        
        {/* Face */}
        <circle cx="50" cy="50" r="20" fill="#FFDBAC" stroke="#000" strokeWidth="1.5" />
        
        {/* Eyes */}
        <circle cx="45" cy="48" r="2.5" fill="#000" />
        <circle cx="55" cy="48" r="2.5" fill="#000" />
        
        {/* Smile */}
        <path
          d="M 40 58 Q 50 63 60 58"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Body - Orange top */}
        <rect x="38" y="68" width="24" height="20" rx="2" fill="#FF8C00" stroke="#000" strokeWidth="1.5" />
        
        {/* Arms */}
        <line x1="38" y1="72" x2="25" y2="80" stroke="#FFDBAC" strokeWidth="3" strokeLinecap="round" />
        <line x1="62" y1="72" x2="75" y2="80" stroke="#FFDBAC" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// Gold D. Roger - Pirate King
export function GoldDRoger({ size = 'md', className = '', variant = 'idle' }: CharacterProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const animations = {
    idle: { y: [0, -2, 0], transition: { duration: 3, repeat: Infinity } },
    waving: { rotate: [0, 5, -5, 0], transition: { duration: 1.5, repeat: Infinity } },
    excited: { scale: [1, 1.08, 1], transition: { duration: 0.7, repeat: Infinity } },
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      animate={animations[variant]}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Crown */}
        <path
          d="M 30 15 L 40 25 L 50 20 L 60 25 L 70 15 L 70 30 L 30 30 Z"
          fill="#FFD700"
          stroke="#000"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="22" r="3" fill="#FF6B6B" />
        
        {/* Face */}
        <circle cx="50" cy="50" r="22" fill="#FFDBAC" stroke="#000" strokeWidth="1.5" />
        
        {/* Mustache */}
        <path
          d="M 35 50 Q 50 55 65 50"
          stroke="#000"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Beard */}
        <path
          d="M 35 60 Q 50 75 65 60"
          fill="#000"
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Eyes */}
        <circle cx="42" cy="45" r="3" fill="#000" />
        <circle cx="58" cy="45" r="3" fill="#000" />
        
        {/* Body - Royal coat */}
        <rect x="32" y="70" width="36" height="25" rx="3" fill="#8B0000" stroke="#000" strokeWidth="1.5" />
        <line x1="50" y1="70" x2="50" y2="95" stroke="#FFD700" strokeWidth="2" />
      </svg>
    </motion.div>
  );
}

// Shanks - Red Hair
export function Shanks({ size = 'md', className = '', variant = 'idle' }: CharacterProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const animations = {
    idle: { y: [0, -4, 0], transition: { duration: 2.2, repeat: Infinity } },
    waving: { rotate: [0, 12, -12, 0], transition: { duration: 1.2, repeat: Infinity } },
    excited: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } },
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} relative`}
      animate={animations[variant]}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Red hair */}
        <path
          d="M 25 15 Q 50 5 75 15 Q 80 40 70 55 Q 50 50 30 55 Q 20 40 25 15"
          fill="#8B0000"
          stroke="#000"
          strokeWidth="1.5"
        />
        
        {/* Face */}
        <circle cx="50" cy="50" r="20" fill="#FFDBAC" stroke="#000" strokeWidth="1.5" />
        
        {/* Scar over left eye */}
        <line x1="38" y1="42" x2="42" y2="48" stroke="#000" strokeWidth="2" />
        <line x1="40" y1="40" x2="44" y2="46" stroke="#000" strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="45" cy="48" r="2.5" fill="#000" />
        <circle cx="55" cy="48" r="2.5" fill="#000" />
        
        {/* Smile */}
        <path
          d="M 40 58 Q 50 63 60 58"
          stroke="#000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Body - Red coat */}
        <rect x="35" y="68" width="30" height="25" rx="3" fill="#C8102E" stroke="#000" strokeWidth="1.5" />
        
        {/* Arms */}
        <line x1="35" y1="72" x2="20" y2="82" stroke="#FFDBAC" strokeWidth="4" strokeLinecap="round" />
        <line x1="65" y1="72" x2="80" y2="82" stroke="#FFDBAC" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

