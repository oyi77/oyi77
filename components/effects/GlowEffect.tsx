'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface GlowEffectProps {
  intensity?: number;
  color?: string;
  children: React.ReactNode;
}

export default function GlowEffect({ 
  intensity = 1, 
  color = '#FFD700',
  children 
}: GlowEffectProps) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    timeRef.current += 0.02;
    
    const pulse = Math.sin(timeRef.current) * 0.2 + 0.8;
    // Glow effect is handled via CSS or post-processing
  });

  return (
    <group ref={groupRef}>
      {children}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={intensity} 
        color={color}
        distance={5}
      />
    </group>
  );
}

