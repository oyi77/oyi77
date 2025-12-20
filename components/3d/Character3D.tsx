'use client';

import { useRef, useState, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Group, TextureLoader, DoubleSide } from 'three';
import { Billboard, useTexture } from '@react-three/drei';
import { getAssetPath } from '@/lib/utils/basePath';

export type CharacterType = 'luffy' | 'zoro' | 'crocodile' | 'doflamingo' | 'mihawk' | 'captain';
export type AnimationType = 'idle' | 'walking' | 'fighting' | 'emote';

interface Character3DProps {
  character: CharacterType;
  position?: [number, number, number];
  animation?: AnimationType;
  scale?: number;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

export default function Character3D({
  character,
  position = [0, 0, 0],
  animation = 'idle',
  scale = 1,
  onClick,
  onHover
}: Character3DProps) {
  const groupRef = useRef<Group>(null);
  const scaleRef = useRef(scale);
  const [hovered, setHovered] = useState(false);
  const timeRef = useRef(0);

  // Smooth scale interpolation
  useFrame(() => {
    if (!groupRef.current) return;

    const targetScale = hovered ? scale * 1.1 : scale;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    groupRef.current.scale.setScalar(scaleRef.current);

    if (hovered) {
      groupRef.current.rotation.y += 0.02;
    }
  });

  // Idle animation
  useFrame(() => {
    if (!groupRef.current) return;

    timeRef.current += 0.01;

    if (animation === 'idle') {
      // Breathing animation
      const breathe = Math.sin(timeRef.current * 2) * 0.05;
      groupRef.current.position.y = position[1] + breathe;

      // Gentle sway
      if (!hovered) {
        groupRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.1;
      }
    } else if (animation === 'walking') {
      // Walking animation
      groupRef.current.position.x = position[0] + Math.sin(timeRef.current * 3) * 0.5;
      groupRef.current.rotation.y = Math.sin(timeRef.current * 3) * 0.2;
    } else if (animation === 'fighting') {
      // Fighting animation
      groupRef.current.rotation.y = Math.sin(timeRef.current * 5) * 0.3;
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(timeRef.current * 5)) * 0.2;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(false);
  };

  const handleClick = () => {
    onClick?.();
  };

  // Character colors
  const characterColors = {
    luffy: { primary: '#C8102E', secondary: '#FFD700', skin: '#FFDBAC' },
    zoro: { primary: '#2D5016', secondary: '#8B4513', skin: '#FFDBAC' },
    crocodile: { primary: '#8B7355', secondary: '#D4A574', skin: '#D4A574' },
    doflamingo: { primary: '#FF0000', secondary: '#FFD700', skin: '#FFDBAC' },
    mihawk: { primary: '#1a1a1a', secondary: '#FFD700', skin: '#FFDBAC' },
    captain: { primary: '#C8102E', secondary: '#FFD700', skin: '#FFDBAC' },
  };

  const colors = characterColors[character];
  const texture = useTexture(getAssetPath(`/assets/characters/${character}.png`));

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        {/* Character Sprite Plane */}
        <mesh position={[0, 0.8, 0]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial
            map={texture}
            transparent={true}
            side={DoubleSide}
            alphaTest={0.5}
          />
        </mesh>
      </Billboard>

      {/* Haki Glow under the character - Static Circle */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial
          color={colors.primary}
          transparent
          opacity={0.3}
          emissive={colors.primary}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}
