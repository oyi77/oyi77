'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Mail, Scroll, Users, TrendingUp } from 'lucide-react';
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
    <div className="p-8 text-text-dark bg-[#f4e4bc] min-h-full min-w-full">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Portrait */}
        <motion.div
          className="w-full md:w-1/3 flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative w-48 h-64 md:w-full md:h-80 bg-white p-4 border-8 border-onepiece-mahogany shadow-3d-premium transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute top-0 left-0 right-0 py-2 bg-onepiece-mahogany text-onepiece-gold text-center font-black text-xl tracking-[0.2em] mb-4">
              CAPTAIN
            </div>
            <div className="relative w-full h-full pt-8 overflow-hidden">
              <Image
                src="/assets/characters/captain.png"
                alt="Captain Portrait"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="w-full space-y-3 bg-white/50 p-4 rounded-xl border-2 border-onepiece-gold shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-onepiece-red shrink-0" />
              <span className="text-sm font-bold text-onepiece-mahogany">{profileData.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-onepiece-red shrink-0" />
              <a href={`mailto:${profileData.email}`} className="text-sm text-onepiece-red hover:text-onepiece-blue font-bold truncate">
                {profileData.email}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-onepiece-mahogany uppercase tracking-tight mb-2">
              {profileData.name}
            </h1>
            <div className="inline-block px-4 py-1 bg-onepiece-red text-white text-lg font-black uppercase tracking-widest rounded-r-full">
              {profileData.title}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-onepiece-mahogany">
              <Scroll className="w-6 h-6 text-onepiece-gold" />
              Captain&apos;s Orders
            </h3>
            <p className="text-base leading-relaxed text-onepiece-mahogany/80 font-medium whitespace-pre-line">
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="inline-block w-2 h-5 bg-onepiece-red ml-1 animate-pulse" />
              )}
            </p>
          </div>

          {/* Lead Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 border-4 border-onepiece-blue shadow-3d-premium hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black text-onepiece-blue uppercase">Leadership Score</span>
                <Users className="w-5 h-5 text-onepiece-blue" />
              </div>
              <div className="text-3xl font-black text-onepiece-mahogany">{profileData.metrics.teamVelocity}%</div>
              <div className="w-full bg-slate-100 h-2 mt-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-onepiece-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileData.metrics.teamVelocity}%` }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </div>
            </div>

            <div className="bg-white p-6 border-4 border-onepiece-gold shadow-3d-premium hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black text-onepiece-gold uppercase">System Reliability</span>
                <TrendingUp className="w-5 h-5 text-onepiece-gold" />
              </div>
              <div className="text-3xl font-black text-onepiece-mahogany">{profileData.metrics.systemUptime}%</div>
              <div className="w-full bg-slate-100 h-2 mt-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-onepiece-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(profileData.metrics.systemUptime, 100)}%` }}
                  transition={{ delay: 1.2, duration: 1 }}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t-2 border-dashed border-onepiece-mahogany/30">
            <div className="flex flex-wrap gap-3 mb-6">
              {['System Design', 'Mentor', 'Strategy', 'Scalability'].map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-onepiece-mahogany text-onepiece-gold font-black text-xs uppercase tracking-tighter">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Download CV Button */}
            <motion.a
              href="/assets/cv/resume.pdf"
              download="Fikri_Izzuddin_CV.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-onepiece-red text-white font-black text-lg uppercase tracking-wider rounded-lg shadow-3d-premium hover:bg-onepiece-blue transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Scroll className="w-6 h-6" />
              Download Captain's CV
            </motion.a>
          </div>

          {/* Journey Timeline */}
          <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-onepiece-mahogany">
              <TrendingUp className="w-6 h-6 text-onepiece-gold" />
              Journey Highlights
            </h3>
            <div className="space-y-4">
              <div className="bg-white/70 p-4 rounded-lg border-l-4 border-onepiece-red">
                <h4 className="font-bold text-onepiece-mahogany">Lead Software Engineer @ Tech Corp</h4>
                <p className="text-sm text-onepiece-mahogany/70 mb-2">2021 - Present</p>
                <p className="text-sm text-onepiece-mahogany/80">Leading a team of 8 engineers building high-performance microservices serving 1M+ users. Architected scalable systems with 99.9% uptime.</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border-l-4 border-onepiece-blue">
                <h4 className="font-bold text-onepiece-mahogany">Senior Full Stack Developer @ StartupCo</h4>
                <p className="text-sm text-onepiece-mahogany/70 mb-2">2018 - 2021</p>
                <p className="text-sm text-onepiece-mahogany/80">Built DeFi trading platform from scratch. Implemented algo-trading engines with sub-millisecond latency.</p>
              </div>
              <div className="bg-white/70 p-4 rounded-lg border-l-4 border-onepiece-gold">
                <h4 className="font-bold text-onepiece-mahogany">Software Engineer @ Innovation Labs</h4>
                <p className="text-sm text-onepiece-mahogany/70 mb-2">2016 - 2018</p>
                <p className="text-sm text-onepiece-mahogany/80">Developed cloud infrastructure and CI/CD pipelines. Mentored junior developers and established best practices.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

