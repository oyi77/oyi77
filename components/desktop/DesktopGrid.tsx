'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Illustration from '@/components/cartoon/Illustration';
import JollyRoger from '@/components/cartoon/JollyRoger';
import TreasureChest from '@/components/cartoon/TreasureChest';
import Character2D from '@/components/2d/Character2D';
import CharacterInteraction from '@/components/interactions/CharacterInteraction';
import { getAssetPath } from '@/lib/utils/basePath';

// Lazy load 3D components
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
});

const Character3D = dynamic(() => import('@/components/3d/Character3D'), {
  ssr: false,
});

const ParticleSystem = dynamic(() => import('@/components/effects/ParticleSystem'), {
  ssr: false,
});

export default function DesktopGrid({ children }: { children: React.ReactNode }) {
  const [selectedCharacter, setSelectedCharacter] = useState<{ type: string; position: { x: number; y: number } } | null>(null);
  const [characterAnimations, setCharacterAnimations] = useState<Record<string, 'idle' | 'walking' | 'fighting' | 'emote'>>({
    luffy: 'idle',
    zoro: 'idle',
    crocodile: 'idle',
    doflamingo: 'idle',
    mihawk: 'idle',
    captain: 'idle',
    akainu: 'idle',
    kizaru: 'idle',
    trafalgar_law: 'idle',
  });
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Intersection observer to lazy load 3D scene
  useEffect(() => {
    // Skip 3D on mobile for better performance
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad3D(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    // Fallback: load after 1 second if not visible
    const timeout = setTimeout(() => {
      setShouldLoad3D(true);
      observer.disconnect();
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const handleCharacterClick = (character: string, event: React.MouseEvent) => {
    setSelectedCharacter({
      type: character,
      position: { x: event.clientX, y: event.clientY }
    });

    // Trigger fighting animation
    setCharacterAnimations(prev => ({
      ...prev,
      [character]: 'fighting'
    }));

    setTimeout(() => {
      setCharacterAnimations(prev => ({
        ...prev,
        [character]: 'idle'
      }));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#f4e4bc] overflow-hidden">
      {/* Background Nautical Map */}
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-multiply"
        style={{ backgroundImage: `url("${getAssetPath('/assets/images/map_bg.png')}")` }}
      />
      {/* 3D Characters Background Layer - Lazy loaded */}
      <div ref={sceneRef} className="absolute inset-0 z-0 pointer-events-none">
        {shouldLoad3D && (
          <Scene className="w-full h-full" enableControls={false}>
            <Suspense fallback={null}>
              {/* Initial characters - load first 3 for faster initial render */}
              <Suspense fallback={null}>
                <Character3D
                  character="captain"
                  position={[-0.5, -1, 0]}
                  animation={characterAnimations.captain || 'idle'}
                  scale={1}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="luffy"
                  position={[-1.4, -1.2, -1]}
                  animation={characterAnimations.luffy}
                  scale={0.8}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="zoro"
                  position={[-1.5, -1.1, -1.3]}
                  animation={characterAnimations.zoro}
                  scale={0.8}
                />
              </Suspense>
              {/* Remaining characters - loaded after initial render */}
              <Suspense fallback={null}>
                <Character3D
                  character="crocodile"
                  position={[0.4, -1.1, -1]}
                  animation={characterAnimations.crocodile}
                  scale={0.9}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="doflamingo"
                  position={[1, -1.1, -1.1]}
                  animation={characterAnimations.doflamingo}
                  scale={0.8}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="mihawk"
                  position={[1.5, -1.1, -1.2]}
                  animation={characterAnimations.mihawk}
                  scale={0.8}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="akainu"
                  position={[-2.6, -1.1, -1.7]}
                  animation={characterAnimations.akainu}
                  scale={0.9}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="kizaru"
                  position={[1.7, -1.1, -1.3]}
                  animation={characterAnimations.kizaru}
                  scale={0.9}
                />
              </Suspense>
              <Suspense fallback={null}>
                <Character3D
                  character="trafalgar_law"
                  position={[-2.3, -1, -1.5]}
                  animation={characterAnimations.trafalgar_law}
                  scale={0.9}
                />
              </Suspense>
              <Suspense fallback={null}>
                <ParticleSystem count={50} color="#FFD700" position={[0, 2, 0]} />
              </Suspense>
            </Suspense>
          </Scene>
        )}
      </div>

      {/* One Piece background elements */}
      <div className="absolute inset-0">
        {/* Ocean waves */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32"
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <path
              d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
              fill="#006994"
              opacity="0.6"
            />
            <path
              d="M0,120 Q300,70 600,120 T1200,120 L1200,200 L0,200 Z"
              fill="#1E3A8A"
              opacity="0.4"
            />
          </svg>
        </motion.div>

        {/* Jolly Roger flags - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute top-10 right-10"
          animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <JollyRoger size={80} animated={true} />
        </motion.div>

        <motion.div
          className="hidden lg:block absolute top-32 left-20"
          animate={{ rotate: [0, -8, 8, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <JollyRoger size={60} animated={true} />
        </motion.div>

        {/* IKI KARAKTER ONEPIECE COK! */}
        <motion.div
          className="hidden md:block absolute bottom-32 right-0 z-20 pointer-events-auto"
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
          onClick={(e) => handleCharacterClick('captain', e)}
        >
          <Character2D character="captain" variant="waving" size="lg" />
        </motion.div>

        <motion.div
          className="hidden lg:block absolute top-[20%] left-[20%] z-20 pointer-events-auto"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
          onClick={(e) => handleCharacterClick('luffy', e)}
        >
          <Character2D character="luffy" variant="excited" size="md" />
        </motion.div>

        <motion.div
          className="hidden lg:block absolute bottom-32 left-0 z-20 pointer-events-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          onClick={(e) => handleCharacterClick('zoro', e)}
        >
          <Character2D character="zoro" variant="idle" size="md" />
        </motion.div>

        <motion.div
          className="hidden lg:block absolute top-24 left-16 z-20 pointer-events-auto"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          onClick={(e) => handleCharacterClick('crocodile', e)}
        >
          <Character2D character="crocodile" variant="idle" size="md" />
        </motion.div>

        <motion.div
          className="hidden lg:block absolute top-32 right-24 z-20 pointer-events-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, type: "spring" }}
          onClick={(e) => handleCharacterClick('doflamingo', e)}
        >
          <Character2D character="doflamingo" variant="waving" size="md" />
        </motion.div>

        <motion.div
          className="hidden lg:block absolute top-60 left-1/2 z-20 pointer-events-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, type: "spring" }}
          onClick={(e) => handleCharacterClick('mihawk', e)}
        >
          <Character2D character="mihawk" variant="idle" size="md" />
        </motion.div>

        {/* Treasure chests - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute bottom-32 left-1/4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: "spring" }}
        >
          <TreasureChest size={70} open={false} />
        </motion.div>

        <motion.div
          className="hidden md:block absolute bottom-40 right-1/3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <TreasureChest size={60} open={true} />
        </motion.div>

        {/* Floating clouds */}
        <motion.div
          className="absolute top-10 left-[15%]"
          animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <Illustration type="cloud" size={100} />
        </motion.div>

        <motion.div
          className="absolute top-40 right-[20%]"
          animate={{ x: [0, -40, 0], y: [0, 15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 2 }}
        >
          <Illustration type="cloud" size={120} />
        </motion.div>

        <motion.div
          className="absolute top-1/4 left-[40%]"
          animate={{ x: [0, 60, 0], y: [0, -25, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 5 }}
        >
          <Illustration type="cloud" size={90} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[10%]"
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 1 }}
        >
          <Illustration type="cloud" size={80} />
        </motion.div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Character Interactions */}
      {selectedCharacter && (
        <CharacterInteraction
          character={selectedCharacter.type as any}
          position={selectedCharacter.position}
          onClose={() => setSelectedCharacter(null)}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
