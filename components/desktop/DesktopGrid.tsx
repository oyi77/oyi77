'use client';

import { motion } from 'framer-motion';
import Illustration from '@/components/cartoon/Illustration';
import Character from '@/components/cartoon/Character';

export default function DesktopGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-light-bg via-light-surface to-light-cream overflow-hidden">
      {/* Cartoon background elements */}
      <div className="absolute inset-0">
        {/* Floating clouds */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Illustration type="cloud" size={80} />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20"
          animate={{ x: [0, -30, 0], y: [0, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <Illustration type="cloud" size={100} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/4"
          animate={{ x: [0, 40, 0], y: [0, -15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <Illustration type="cloud" size={90} />
        </motion.div>

        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Illustration type="star" size={30 + i * 5} />
          </motion.div>
        ))}

        {/* Character in corner */}
        <motion.div
          className="absolute bottom-20 right-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
        >
          <Character variant="waving" size="md" />
        </motion.div>
        
        {/* Additional small characters */}
        <motion.div
          className="absolute top-1/4 left-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Character variant="idle" size="sm" />
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

