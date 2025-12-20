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
    <div className="p-6 text-text-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-cartoon-orange mb-2">{profileData.name}</h1>
        <h2 className="text-xl text-cartoon-purple mb-6 font-semibold">{profileData.title}</h2>

        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-cartoon-purple">About</h3>
          <p className="text-sm leading-relaxed text-text-dark">{displayedText}</p>
          {displayedText.length < fullText.length && (
            <span className="inline-block w-2 h-4 bg-cartoon-orange ml-1 animate-cursor-blink rounded" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="bg-white/80 rounded-2xl p-4 border-4 border-cartoon-green cartoon-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-cartoon-green" />
              <span className="text-sm font-bold text-text-dark">Trading Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-cartoon-green rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.tradingAccuracy}%` }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-cartoon-green">
                {profileData.metrics.tradingAccuracy}%
              </span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 rounded-2xl p-4 border-4 border-cartoon-pink cartoon-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-cartoon-pink" />
              <span className="text-sm font-bold text-text-dark">Efficiency Gains</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-cartoon-pink rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.efficiencyGains}%` }}
                  transition={{ duration: 1, delay: 0.6, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-cartoon-pink">
                {profileData.metrics.efficiencyGains}%
              </span>
            </div>
          </motion.div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cartoon-orange" />
            <span className="text-sm font-medium text-text-dark">{profileData.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-cartoon-orange" />
            <a
              href={`mailto:${profileData.email}`}
              className="text-sm text-cartoon-orange hover:text-cartoon-purple font-semibold hover:underline"
            >
              {profileData.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-cartoon-orange" />
            <span className="text-sm font-medium text-text-dark">{profileData.phone}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t-4 border-cartoon-yellow">
          <p className="text-sm text-text-dark/70">
            <span className="font-bold text-cartoon-purple">{profileData.experience}</span> of professional experience
          </p>
        </div>
      </motion.div>
    </div>
  );
}

