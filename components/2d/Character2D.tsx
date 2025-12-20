'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CharacterType } from '../3d/Character3D';
import { useState } from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils/basePath';

export type AnimationVariant = 'idle' | 'waving' | 'excited' | 'fighting' | 'walking' | 'thinking' | 'sleeping' | 'angry';

interface Character2DProps {
  character: CharacterType;
  variant?: AnimationVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

const pixelSizes = {
  sm: 64,
  md: 96,
  lg: 128,
};

const animations = {
  // ... existing animations
  idle: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  },
  waving: {
    rotate: [0, 15, -15, 0],
    y: [0, -5, 0],
    transition: { duration: 1, repeat: Infinity }
  },
  excited: {
    scale: [1, 1.15, 1],
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.5, repeat: Infinity }
  },
  fighting: {
    scale: [1, 1.1, 1],
    rotate: [0, -15, 15, 0],
    y: [0, -10, 0],
    transition: { duration: 0.3, repeat: Infinity }
  },
  walking: {
    x: [0, 5, 0],
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.8, repeat: Infinity }
  },
  thinking: {
    rotate: [0, -5, 5, 0],
    y: [0, -3, 0],
    transition: { duration: 2, repeat: Infinity }
  },
  sleeping: {
    rotate: [0, 2, -2, 0],
    scale: [1, 0.95, 1],
    transition: { duration: 3, repeat: Infinity }
  },
  angry: {
    scale: [1, 1.2, 1],
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.4, repeat: Infinity }
  },
};

export default function Character2D({
  character,
  variant: initialVariant = 'idle',
  size = 'md',
  className = '',
  onClick,
  animated = true
}: Character2DProps) {
  const [hakiActive, setHakiActive] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(initialVariant);
  const [isPoweringUp, setIsPoweringUp] = useState(false);

  const handleDoubleClick = () => {
    setIsPoweringUp(true);
    setCurrentVariant('fighting');
    setTimeout(() => {
      setIsPoweringUp(false);
      setCurrentVariant(initialVariant);
    }, 3000);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      className={`${sizeClasses[size]} ${className} relative cursor-grab active:cursor-grabbing group`}
      animate={animated ? animations[currentVariant] : {}}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setHakiActive(true)}
      onMouseLeave={() => setHakiActive(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Haki Aura Effect */}
      <AnimatePresence>
        {(hakiActive || isPoweringUp) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isPoweringUp ? 1 : 0.6,
              scale: isPoweringUp ? 1.5 : 1.2,
              rotate: isPoweringUp ? [0, 90, 180, 270, 360] : 0
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' } }}
            className={`absolute inset-0 rounded-full blur-xl z-0 ${isPoweringUp ? 'bg-onepiece-gold/40' : 'bg-onepiece-red/20'}`}
            style={{ filter: `drop-shadow(0 0 20px ${isPoweringUp ? '#FFD700' : '#C8102E'})` }}
          />
        )}
      </AnimatePresence>

      {/* Power-up Sparks */}
      {isPoweringUp && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-4 bg-onepiece-gold rounded-full"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      <Image
        src={getAssetPath(`/assets/characters/${character}.png`)}
        alt={character}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className="object-contain relative z-10 drop-shadow-2xl select-none"
        draggable={false}
      />
    </motion.div>
  );
}


