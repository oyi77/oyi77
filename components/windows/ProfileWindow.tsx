'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, TrendingUp, Zap } from 'lucide-react';
import { profileData } from '@/lib/data/profile';

export default function ProfileWindow() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = profileData.summary;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="text-text-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-onepiece-red mb-4">{profileData.name}</h1>
        <h2 className="text-xl text-onepiece-blue mb-8 font-semibold">{profileData.title}</h2>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-onepiece-blue">About</h3>
          <p className="text-sm leading-relaxed text-text-dark">{displayedText}</p>
          {displayedText.length < fullText.length && (
            <span className="inline-block w-2 h-4 bg-onepiece-red ml-1 animate-cursor-blink rounded" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-white/80 rounded-2xl p-6 border-4 border-onepiece-blue cartoon-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-onepiece-blue" />
              <span className="text-sm font-bold text-text-dark">Trading Accuracy</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-onepiece-blue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.tradingAccuracy}%` }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-onepiece-blue">
                {profileData.metrics.tradingAccuracy}%
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 rounded-2xl p-6 border-4 border-onepiece-gold cartoon-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-onepiece-gold" />
              <span className="text-sm font-bold text-text-dark">Efficiency Gains</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-onepiece-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.efficiencyGains}%` }}
                  transition={{ duration: 1, delay: 0.6, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-onepiece-gold">
                {profileData.metrics.efficiencyGains}%
              </span>
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-onepiece-red" />
            <span className="text-sm font-medium text-text-dark">{profileData.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-onepiece-red" />
            <a
              href={`mailto:${profileData.email}`}
              className="text-sm text-onepiece-red hover:text-onepiece-blue font-semibold hover:underline"
            >
              {profileData.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-onepiece-red" />
            <span className="text-sm font-medium text-text-dark">{profileData.phone}</span>
          </div>
        </div>

        <div className="pt-6 border-t-4 border-onepiece-gold">
          <p className="text-sm text-text-dark/70">
            <span className="font-bold text-onepiece-blue">{profileData.experience}</span> of professional experience
          </p>
        </div>
      </motion.div>
    </div>
  );
}

