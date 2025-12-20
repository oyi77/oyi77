'use client';

import { motion } from 'framer-motion';

interface IsometricBlockProps {
  letter?: string;
  color?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export default function IsometricBlock({
  letter,
  color = '#FF6B35',
  size = 60,
  className = '',
  onClick,
}: IsometricBlockProps) {
  const depth = size * 0.3;
  
  // Calculate isometric points (simplified for SVG)
  const centerX = 50;
  const centerY = 50;
  const halfSize = size / 2;
  const depthOffset = depth;
  
  // Top face (isometric square)
  const topPoints = `${centerX - halfSize},${centerY - halfSize} ${centerX + halfSize},${centerY - halfSize} ${centerX + halfSize + depthOffset},${centerY - halfSize - depthOffset} ${centerX - halfSize + depthOffset},${centerY - halfSize - depthOffset}`;
  
  // Right face
  const rightPoints = `${centerX + halfSize},${centerY - halfSize} ${centerX + halfSize},${centerY + halfSize} ${centerX + halfSize + depthOffset},${centerY + halfSize - depthOffset} ${centerX + halfSize + depthOffset},${centerY - halfSize - depthOffset}`;
  
  // Left face
  const leftPoints = `${centerX - halfSize},${centerY - halfSize} ${centerX - halfSize},${centerY + halfSize} ${centerX - halfSize + depthOffset},${centerY + halfSize - depthOffset} ${centerX - halfSize + depthOffset},${centerY - halfSize - depthOffset}`;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, rotateY: -45 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
        {/* Left face */}
        <polygon
          points={leftPoints}
          fill={color}
          opacity="0.8"
        />
        
        {/* Right face */}
        <polygon
          points={rightPoints}
          fill={color}
          opacity="0.7"
        />
        
        {/* Top face */}
        <polygon
          points={topPoints}
          fill={color}
          opacity="0.9"
        />
        
        {/* Letter on top */}
        {letter && (
          <text
            x={centerX + depthOffset / 2}
            y={centerY - halfSize - depthOffset / 2 + 5}
            fontSize="35"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            {letter}
          </text>
        )}
      </svg>
    </motion.div>
  );
}
