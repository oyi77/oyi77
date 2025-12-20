'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code, Rocket, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Character from '@/components/cartoon/Character';
import Illustration from '@/components/cartoon/Illustration';

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
      <div className="absolute inset-0 bg-gradient-to-br from-cartoon-orange/10 via-cartoon-yellow/10 to-cartoon-green/10 animate-pulse" />
      
      {/* Character greeting */}
      <motion.div
        className="absolute top-8 right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Character variant="waving" size="lg" />
      </motion.div>
      
      {/* Floating illustrations */}
      <motion.div
        className="absolute top-4 left-4"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Illustration type="sparkle" size={50} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 right-4"
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="cartoon-gradient bg-clip-text text-transparent">
              {displayedText}
            </span>
            {displayedText.length < fullText.length && (
              <span className="inline-block w-2 h-10 bg-cartoon-orange ml-2 animate-cursor-blink rounded" />
            )}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-dark font-semibold"
        >
          I&apos;m <span className="text-cartoon-orange font-bold">Muchammad Fikri Izzuddin</span>, a Lead Software Engineer
        </motion.p>

        {/* Features grid */}
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="bg-white/90 rounded-2xl p-6 hover:cartoon-shadow border-4 border-cartoon-yellow hover:border-cartoon-orange transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.div 
                    className="text-cartoon-orange group-hover:text-cartoon-purple transition-colors"
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
            <p className="text-sm text-text-dark/70 mb-4 font-medium">
              Click on the desktop icons to explore my portfolio
            </p>
            <div className="flex items-center justify-center gap-2 text-cartoon-green">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 fill-cartoon-pink text-cartoon-pink" />
              </motion.div>
              <span className="text-sm font-semibold text-text-dark">Built with Next.js, Framer Motion & Tailwind CSS</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

