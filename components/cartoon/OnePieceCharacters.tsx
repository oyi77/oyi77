'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils/basePath';

interface CharacterProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'idle' | 'waving' | 'excited';
}

const sizeMap = {
  sm: 64,
  md: 96,
  lg: 128,
};

function CharacterSprite({ name, size = 'md', className = '', variant = 'idle' }: CharacterProps & { name: string }) {
  const pixelSize = sizeMap[size];

  const animations = {
    idle: {
      y: [0, -5, 0],
      filter: ['drop-shadow(0 0 0px rgba(255,215,0,0))', 'drop-shadow(0 0 10px rgba(255,215,0,0.3))', 'drop-shadow(0 0 0px rgba(255,215,0,0))'],
      transition: { duration: 3, repeat: Infinity }
    },
    waving: {
      rotate: [0, 5, -5, 0],
      y: [0, -8, 0],
      transition: { duration: 2, repeat: Infinity }
    },
    excited: {
      scale: [1, 1.1, 1],
      filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))',
      transition: { duration: 0.5, repeat: Infinity }
    },
  };

  return (
    <motion.div
      className={`${className} relative flex items-center justify-center`}
      animate={animations[variant]}
      whileHover={{
        scale: 1.1,
        filter: 'drop-shadow(0 0 25px rgba(255,215,0,0.8))'
      }}
    >
      <Image
        src={getAssetPath(`/assets/characters/${name}.png`)}
        alt={name}
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
      />

      {/* Haki Aura Effect on Hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-onepiece-gold/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
      />
    </motion.div>
  );
}

export function Luffy(props: CharacterProps) {
  return <CharacterSprite name="luffy" {...props} />;
}

export function Zoro(props: CharacterProps) {
  return <CharacterSprite name="zoro" {...props} />;
}

export function Crocodile(props: CharacterProps) {
  return <CharacterSprite name="crocodile" {...props} />;
}

export function Doflamingo(props: CharacterProps) {
  return <CharacterSprite name="doflamingo" {...props} />;
}

export function Mihawk(props: CharacterProps) {
  return <CharacterSprite name="mihawk" {...props} />;
}

export function Captain(props: CharacterProps) {
  return <CharacterSprite name="captain" {...props} />;
}

// Keep Nami, GoldDRoger, Shanks as SVG for now or until assets are provided

