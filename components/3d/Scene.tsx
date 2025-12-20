'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ReactNode } from 'react';

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
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 50 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment for better lighting */}
        <Environment preset="sunset" />
        
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

