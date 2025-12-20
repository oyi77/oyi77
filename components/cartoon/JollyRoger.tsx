'use client';

import { motion } from 'framer-motion';

interface JollyRogerProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export default function JollyRoger({ size = 100, className = '', animated = true }: JollyRogerProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      animate={animated ? { rotate: [0, 5, -5, 0], y: [0, -5, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Skull */}
      <circle cx="50" cy="40" r="25" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      
      {/* Eye sockets */}
      <circle cx="42" cy="38" r="4" fill="#000000" />
      <circle cx="58" cy="38" r="4" fill="#000000" />
      
      {/* Nose */}
      <path d="M 50 42 L 46 48 L 54 48 Z" fill="#000000" />
      
      {/* Jaw */}
      <path d="M 30 40 Q 30 55 50 60 Q 70 55 70 40" stroke="#000000" strokeWidth="2" fill="#FFFFFF" />
      <rect x="38" y="50" width="24" height="8" rx="2" fill="#000000" />
      
      {/* Crossbones */}
      <motion.line
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
        animate={animated ? { rotate: [0, 360] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.line
        x1="80"
        y1="20"
        x2="20"
        y2="80"
        stroke="#000000"
        strokeWidth="4"
        strokeLinecap="round"
        animate={animated ? { rotate: [0, -360] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
}

