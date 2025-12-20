'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  position?: [number, number, number];
}

export default function ParticleSystem({
  count = 100,
  color = '#FFD700',
  speed = 0.02,
  size = 0.05,
  position = [0, 0, 0]
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = Math.random() * speed * 2;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }
    
    return { positions, velocities };
  }, [count, speed]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = particles.velocities;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
      
      if (positions[i3 + 1] > 5) {
        positions[i3 + 1] = -5;
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.6} />
    </points>
  );
}

