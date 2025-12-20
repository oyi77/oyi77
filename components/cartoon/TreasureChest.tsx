'use client';

import { motion } from 'framer-motion';

interface TreasureChestProps {
  size?: number;
  className?: string;
  open?: boolean;
}

export default function TreasureChest({ size = 80, className = '', open = false }: TreasureChestProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      whileHover={{ scale: 1.1, y: -5 }}
    >
      {/* Chest body */}
      <rect x="20" y="50" width="60" height="40" rx="3" fill="#8B4513" stroke="#654321" strokeWidth="2" />
      
      {/* Chest lid */}
      <motion.rect
        x="20"
        y={open ? "30" : "50"}
        width="60"
        height="25"
        rx="3"
        fill="#A0522D"
        stroke="#654321"
        strokeWidth="2"
        animate={{ y: open ? 30 : 50 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      
      {/* Lock */}
      <circle cx="50" cy={open ? "42" : "62"} r="4" fill="#FFD700" />
      <rect x="48" y={open ? "40" : "60"} width="4" height="6" fill="#FFD700" />
      
      {/* Treasure glow when open */}
      {open && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <circle cx="50" cy="45" r="15" fill="#FFD700" opacity="0.3" />
          <circle cx="50" cy="45" r="10" fill="#FFD700" opacity="0.5" />
          <circle cx="50" cy="45" r="5" fill="#FFD700" opacity="0.8" />
        </motion.g>
      )}
      
      {/* Metal bands */}
      <line x1="20" y1="60" x2="80" y2="60" stroke="#654321" strokeWidth="2" />
      <line x1="20" y1="75" x2="80" y2="75" stroke="#654321" strokeWidth="2" />
    </motion.svg>
  );
}

