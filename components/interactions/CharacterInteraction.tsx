'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharacterType } from '@/components/3d/Character3D';

interface CharacterInteractionProps {
  character: CharacterType;
  position: { x: number; y: number };
  onClose: () => void;
}

export default function CharacterInteraction({
  character,
  position,
  onClose
}: CharacterInteractionProps) {
  const [showInfo, setShowInfo] = useState(true);

  const characterInfo = {
    luffy: {
      name: 'Monkey D. Luffy',
      title: 'Straw Hat Captain',
      power: 'Gomu Gomu no Mi',
      quote: 'I&apos;m gonna be the Pirate King!',
    },
    zoro: {
      name: 'Roronoa Zoro',
      title: 'Swordsman',
      power: 'Three Sword Style',
      quote: 'I&apos;ll become the world&apos;s greatest swordsman!',
    },
    crocodile: {
      name: 'Sir Crocodile',
      title: 'Former Warlord',
      power: 'Suna Suna no Mi',
      quote: 'Weakness is a sin!',
    },
    doflamingo: {
      name: 'Donquixote Doflamingo',
      title: 'Heavenly Demon',
      power: 'Ito Ito no Mi',
      quote: 'Justice will prevail? Of course it will!',
    },
    mihawk: {
      name: 'Dracule Mihawk',
      title: 'World\'s Strongest Swordsman',
      power: 'Yoru',
      quote: 'Weaklings don\'t deserve to die.',
    },
    captain: {
      name: 'Captain Fikri',
      title: 'Technical Lead',
      power: 'Full Stack Haki',
      quote: 'Correctness is important. I don\'t accept mistakes.',
    },
    akainu: {
      name: 'Sakazuki (Akainu)',
      title: 'Fleet Admiral',
      power: 'Magu Magu no Mi',
      quote: 'Absolute Justice!',
    },
    kizaru: {
      name: 'Borsalino (Kizaru)',
      title: 'Admiral',
      power: 'Pika Pika no Mi',
      quote: 'Speed is weight. Have you ever been kicked at the speed of light?',
    },
    trafalgar_law: {
      name: 'Trafalgar D. Water Law',
      title: 'Surgeon of Death',
      power: 'Ope Ope no Mi',
      quote: 'The weak do not get to choose how they die.',
    },
  };

  const info = characterInfo[character];

  return (
    <AnimatePresence>
      {showInfo && (
        <motion.div
          className="fixed z-[200] bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border-4 border-onepiece-red max-w-xs"
          style={{ left: position.x, top: position.y - 150 }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-onepiece-red">{info.name}</h3>
            <button
              onClick={() => {
                setShowInfo(false);
                onClose();
              }}
              className="text-onepiece-red hover:text-onepiece-blue"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-onepiece-blue font-semibold mb-1">{info.title}</p>
          <p className="text-xs text-text-dark mb-2">Power: {info.power}</p>
          <p className="text-xs italic text-onepiece-gold">&quot;{info.quote}&quot;</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

