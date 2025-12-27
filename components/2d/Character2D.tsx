'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CharacterType } from '@/lib/types/character';
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

const animations: Record<string, import('framer-motion').TargetAndTransition> = {
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

const characterPowers: Record<string, string> = {
  luffy: "Gomu Gomu no... Pistol!",
  zoro: "Santoryu... Onigiri!",
  sanji: "Diable Jambe!",
  nami: "Thunderbolt Tempo!",
  chopper: "Rumble Ball!",
  robin: "Gigantesco Mano!",
  franky: "Super... Franky Radical Beam!",
  brook: "Soul Solid!",
  jimbei: "Kairyu Ipponzeoi!",
  ace: "Hiken!",
  sabo: "Hiken!",
  law: "Room... Shambles!",
  shanks: "Divine Departure!",
  whitebeard: "Gura Gura no... Tremor!",
  blackbeard: "Black Hole!",
  kaido: "Thunder Bagua!",
  bigmom: "Heavenly Fire!",
  mihawk: "Kokuto... Yoru!",
  crocodile: "Desert Spada!",
  doflamingo: "Overheat!",
  akainu: "Dai Funka!",
  kizaru: "Yasakani no Magatama!",
  aokiji: "Ice Age!",
  captain: "Code Compilation... Deploy!",
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
      {/* Haki Aura Effect - Enhanced */}
      <AnimatePresence>
        {(hakiActive || isPoweringUp) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isPoweringUp ? [0.5, 1, 0.5] : 0.6,
              scale: isPoweringUp ? [1.2, 2, 1.2] : 1.2,
              rotate: isPoweringUp ? [0, 180, 360] : 0
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.2, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
            }}
            className={`absolute inset-0 rounded-full blur-xl z-0 ${isPoweringUp ? 'bg-retro-red/60 mix-blend-screen' : 'bg-retro-yellow/40'}`}
            style={{
              filter: `drop-shadow(0 0 ${isPoweringUp ? '40px' : '20px'} ${isPoweringUp ? '#f54e00' : '#d4af37'})`
            }}
          />
        )}
      </AnimatePresence>

      {/* Super Power Shockwaves */}
      {isPoweringUp && (
        <>
          <motion.div
            className="absolute inset-0 border-4 border-retro-red rounded-full z-0"
            animate={{ scale: [1, 2.5], opacity: [1, 0], borderWidth: ["4px", "0px"] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-retro-yellow rounded-full z-0"
            animate={{ scale: [1, 2], opacity: [1, 0], borderWidth: ["4px", "0px"] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}

      {/* Power-up Sparks */}
      {isPoweringUp && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-8 bg-retro-yellow rounded-full"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
                rotate: Math.random() * 360
              }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
      )}

      <Image
        src={getAssetPath(`/assets/characters/${character}.png`)}
        alt={character}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain relative z-10 drop-shadow-2xl select-none"
        draggable={false}
      />
    </motion.div>
  );
}


