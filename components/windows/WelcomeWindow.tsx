'use client';

import { motion } from 'framer-motion';
import { Compass, Scroll, Map, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Illustration from '@/components/cartoon/Illustration';
import Character2D from '@/components/2d/Character2D';
import { useWindowStore } from '@/lib/store/windowStore';

export default function WelcomeWindow() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Welcome aboard, Captain!';
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  const { openWindow } = useWindowStore();

  const features = [
    { icon: <Compass className="w-8 h-8" />, text: 'Navigate Projects', type: 'logpose', color: 'text-retro-blue' },
    { icon: <Scroll className="w-8 h-8" />, text: 'Bounty Board', type: 'bounty', color: 'text-retro-yellow' },
    { icon: <Map className="w-8 h-8" />, text: 'Tactical Map', type: 'tactical', color: 'text-retro-red' },
  ];

  return (
    <div className="p-8 h-full bg-tan flex flex-col items-center justify-center relative overflow-hidden text-retro-gray">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Luffy greeting - Hidden on mobile */}
      <motion.div
        className="hidden md:block absolute top-8 right-8 z-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <Character2D character="captain" variant="waving" size="lg" />
          <div className="absolute -top-4 -right-4 bg-retro-red text-white text-xs font-bold px-2 py-1 rounded shadow-brutal-sm -rotate-6">
            Ahoy!
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 text-center space-y-8 max-w-3xl w-full">
        {/* Main greeting with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            <span className="text-retro-gray">
              {displayedText}
            </span>
            {displayedText.length < fullText.length && (
              <span className="inline-block w-4 h-10 md:h-14 bg-retro-red ml-2 animate-pulse align-middle" />
            )}
          </h1>
          <div className="h-2 w-32 bg-retro-gray mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-retro-white border-2 border-retro-gray shadow-brutal p-4 inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-bold font-mono">
            I&apos;m <span className="text-retro-red bg-retro-red/10 px-1">Fikri Izzuddin</span>, Lead Software Engineer
          </p>
        </motion.div>

        {/* Features grid */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
          >
            {features.map((feature, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                onClick={() => openWindow(feature.type as any)}
                className="group flex flex-col items-center gap-3 p-6 bg-retro-white border-2 border-retro-gray shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-200"
                whileTap={{ scale: 0.95, y: 2 }}
              >
                <div className={`p-3 rounded-full border-2 border-retro-gray bg-white group-hover:scale-110 transition-transform ${feature.color}`}>
                  {feature.icon}
                </div>
                <span className="font-bold text-lg uppercase tracking-tight">{feature.text}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-retro-gray text-retro-white text-sm font-bold font-mono rounded-full opacity-70 hover:opacity-100 transition-opacity">
              <span>EXPLORE THE GRAND LINE // OS v1.0</span>
              <Heart className="w-4 h-4 text-retro-red fill-retro-red animate-pulse" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

