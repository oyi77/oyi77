'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ReactNode, useMemo } from 'react';

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  className?: string;
}

export default function Scene({ 
  children, 
  cameraPosition = [0, 0, 5],
  enableControls = false,
  className = ''
}: SceneProps) {
  // Optimize settings based on device
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
  }, [isMobile]);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ antialias: !isMobile, alpha: true }}
        dpr={dpr}
        camera={{ position: cameraPosition, fov: 50 }}
        performance={{ min: 0.5 }}
      >
        {/* Lighting - removed Environment preset for better performance */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
        )}
        
        {/* Scene content */}
        {children}
      </Canvas>
    </div>
  );
}

