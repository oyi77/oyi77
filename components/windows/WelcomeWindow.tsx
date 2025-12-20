'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code, Rocket, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Illustration from '@/components/cartoon/Illustration';
import { Luffy } from '@/components/cartoon/OnePieceCharacters';

export default function WelcomeWindow() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Hello, welcome to my page!';
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

  const features = [
    { icon: <Code className="w-6 h-6" />, text: 'Explore my projects' },
    { icon: <Rocket className="w-6 h-6" />, text: 'View my experience' },
    { icon: <Sparkles className="w-6 h-6" />, text: 'Check out my skills' },
  ];

  return (
    <div className="p-8 text-text-dark h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-onepiece-red/10 via-onepiece-gold/10 to-onepiece-blue/10 animate-pulse" />
      
      {/* Luffy greeting - Hidden on mobile */}
      <motion.div
        className="hidden md:block absolute top-4 md:top-8 right-4 md:right-8"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Luffy variant="waving" size="lg" />
      </motion.div>
      
      {/* Floating illustrations - Hidden on mobile */}
      <motion.div
        className="hidden md:block absolute top-4 left-4"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Illustration type="sparkle" size={50} />
      </motion.div>
      
      <motion.div
        className="hidden md:block absolute bottom-4 right-4"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Illustration type="star" size={40} />
      </motion.div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cartoon-orange rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-2xl">
        {/* Main greeting with typewriter effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-onepiece-red via-onepiece-gold to-onepiece-blue bg-clip-text text-transparent">
              {displayedText}
            </span>
            {displayedText.length < fullText.length && (
              <span className="inline-block w-2 h-10 bg-onepiece-red ml-2 animate-cursor-blink rounded" />
            )}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-text-dark font-semibold mb-6 md:mb-8"
        >
          I&apos;m <span className="text-onepiece-red font-bold">Muchammad Fikri Izzuddin</span>, a Lead Software Engineer
        </motion.p>

        {/* Features grid */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-white/90 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 hover:cartoon-shadow border-2 md:border-4 border-onepiece-gold hover:border-onepiece-red transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <motion.div 
                    className="text-onepiece-red group-hover:text-onepiece-blue transition-colors"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  >
                    {feature.icon}
                  </motion.div>
                  <p className="text-sm font-bold text-text-dark">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to action */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8"
          >
            <p className="text-sm text-text-dark/70 mb-6 font-medium">
              Double-click on the desktop icons to explore my portfolio
            </p>
            <div className="flex items-center justify-center gap-3 text-onepiece-blue">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 fill-onepiece-red text-onepiece-red" />
              </motion.div>
              <span className="text-sm font-semibold text-text-dark">Built with Next.js, Framer Motion & Tailwind CSS</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

