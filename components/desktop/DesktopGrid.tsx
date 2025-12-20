'use client';

import { motion } from 'framer-motion';
import Illustration from '@/components/cartoon/Illustration';
import JollyRoger from '@/components/cartoon/JollyRoger';
import TreasureChest from '@/components/cartoon/TreasureChest';
import { Luffy, Nami, GoldDRoger, Shanks } from '@/components/cartoon/OnePieceCharacters';

export default function DesktopGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-onepiece-sky via-onepiece-ocean to-onepiece-blue overflow-hidden">
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

        {/* One Piece Characters - Hidden on mobile */}
        <motion.div
          className="hidden md:block absolute bottom-24 right-16"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <Luffy size="lg" variant="waving" />
        </motion.div>
        
        <motion.div
          className="hidden lg:block absolute bottom-32 left-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          <Nami size="md" variant="idle" />
        </motion.div>
        
        <motion.div
          className="hidden lg:block absolute top-24 left-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <GoldDRoger size="md" variant="idle" />
        </motion.div>
        
        <motion.div
          className="hidden lg:block absolute top-32 right-24"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, type: "spring" }}
        >
          <Shanks size="md" variant="waving" />
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
          className="absolute top-20 left-10"
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Illustration type="cloud" size={80} />
        </motion.div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

