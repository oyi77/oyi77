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
    <div className="p-6 text-text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-neon-cyan mb-2">{profileData.name}</h1>
        <h2 className="text-xl text-neon-magenta mb-6">{profileData.title}</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-white">About</h3>
          <p className="text-sm leading-relaxed">{displayedText}</p>
          {displayedText.length < fullText.length && (
            <span className="inline-block w-2 h-4 bg-neon-cyan ml-1 animate-cursor-blink" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="glass rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neon-green" />
              <span className="text-sm font-medium">Trading Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-neon-green"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.tradingAccuracy}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="text-sm font-bold text-neon-green">
                {profileData.metrics.tradingAccuracy}%
              </span>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-lg p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-neon-magenta" />
              <span className="text-sm font-medium">Efficiency Gains</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-neon-magenta"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.efficiencyGains}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              <span className="text-sm font-bold text-neon-magenta">
                {profileData.metrics.efficiencyGains}%
              </span>
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm">{profileData.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-neon-cyan" />
            <a
              href={`mailto:${profileData.email}`}
              className="text-sm text-neon-cyan hover:underline"
            >
              {profileData.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm">{profileData.phone}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-cyan-500/20">
          <p className="text-sm text-text-light/70">
            <span className="font-semibold text-white">{profileData.experience}</span> of professional experience
          </p>
        </div>
      </motion.div>
    </div>
  );
}

