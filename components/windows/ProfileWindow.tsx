'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Mail, Scroll, Users, TrendingUp } from 'lucide-react';
import { profileData } from '@/lib/data/profile';
import { getAssetPath } from '@/lib/utils/basePath';

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
    }, 20);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="flex flex-col md:flex-row h-full bg-tan text-retro-gray overflow-hidden">
      {/* Sidebar / Portrait Section */}
      <div className="w-full md:w-80 bg-retro-white border-b-2 md:border-b-0 md:border-r-2 border-retro-gray p-6 flex flex-col items-center gap-6 overflow-y-auto shrink-0">
        <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 bg-retro-gray p-2 border-4 border-retro-gray shadow-brutal rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="relative w-full h-full bg-retro-white overflow-hidden border-2 border-retro-gray">
            <Image
              src={getAssetPath("/assets/characters/captain.png")}
              alt="Captain Portrait"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-retro-red text-white px-3 py-1 font-mono font-bold text-xs border-2 border-retro-gray shadow-brutal-sm">
            LVL. 99
          </div>
        </div>

        <div className="w-full text-center space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-retro-gray">{profileData.name}</h2>
          <div className="inline-block px-3 py-1 bg-retro-blue text-white text-xs font-bold uppercase tracking-wider border border-retro-gray shadow-brutal-sm">
            {profileData.title}
          </div>
        </div>

        <div className="w-full space-y-3 pt-4 border-t-2 border-dashed border-retro-gray/30">
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-retro-gray shadow-brutal-sm hover:translate-x-1 transition-transform">
            <MapPin className="w-5 h-5 text-retro-red shrink-0" />
            <span className="text-sm font-bold truncate">{profileData.location}</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border-2 border-retro-gray shadow-brutal-sm hover:translate-x-1 transition-transform">
            <Mail className="w-5 h-5 text-retro-blue shrink-0" />
            <a href={`mailto:${profileData.email}`} className="text-sm font-bold truncate hover:text-retro-blue">
              {profileData.email}
            </a>
          </div>
        </div>

        <motion.a
          href="/assets/cv/resume.pdf"
          download="Fikri_Izzuddin_CV.pdf"
          className="w-full mt-auto flex items-center justify-center gap-2 px-4 py-3 bg-retro-gray text-white font-bold uppercase tracking-wider border-2 border-transparent hover:bg-retro-red hover:border-retro-gray shadow-brutal hover:shadow-brutal-lg transition-all active:translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Scroll className="w-5 h-5" />
          <span>Download CV</span>
        </motion.a>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-tan">
        {/* About Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-black uppercase flex items-center gap-2 border-b-4 border-retro-red pb-2 w-fit">
            <Scroll className="w-6 h-6 text-retro-red" />
            Captain&apos;s Log
          </h3>
          <div className="p-6 bg-white border-2 border-retro-gray shadow-brutal">
            <p className="text-lg leading-relaxed font-mono whitespace-pre-line text-retro-gray">
              {displayedText}
              <span className="inline-block w-2.5 h-5 bg-retro-red ml-1 animate-pulse align-middle" />
            </p>
          </div>
        </section>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-retro-white border-2 border-retro-gray shadow-brutal hover:shadow-brutal-hover transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs font-bold uppercase text-retro-gray/60 mb-1">Leadership</div>
                <div className="text-4xl font-black text-retro-blue">{profileData.metrics.teamVelocity}%</div>
              </div>
              <Users className="w-8 h-8 text-retro-blue" />
            </div>
            <div className="w-full h-3 bg-retro-gray/10 border border-retro-gray rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-retro-blue"
                initial={{ width: 0 }}
                animate={{ width: `${profileData.metrics.teamVelocity}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="p-5 bg-retro-white border-2 border-retro-gray shadow-brutal hover:shadow-brutal-hover transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs font-bold uppercase text-retro-gray/60 mb-1">Reliability</div>
                <div className="text-4xl font-black text-retro-yellow">{profileData.metrics.systemUptime}%</div>
              </div>
              <TrendingUp className="w-8 h-8 text-retro-yellow" />
            </div>
            <div className="w-full h-3 bg-retro-gray/10 border border-retro-gray rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-retro-yellow"
                initial={{ width: 0 }}
                animate={{ width: `${profileData.metrics.systemUptime}%` }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <section className="space-y-6">
          <h3 className="text-xl font-black uppercase flex items-center gap-2 border-b-4 border-retro-blue pb-2 w-fit">
            <TrendingUp className="w-6 h-6 text-retro-blue" />
            Voyage History
          </h3>
          <div className="space-y-0 relative border-l-2 border-retro-gray ml-3 pl-8 py-2">

            {/* Timeline Items */}
            <div className="relative mb-8 group">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-retro-red border-2 border-retro-gray rounded-full z-10 group-hover:scale-125 transition-transform" />
              <div className="p-5 bg-white border-2 border-retro-gray shadow-brutal group-hover:shadow-brutal-hover transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h4 className="font-bold text-lg text-retro-gray">Lead Software Engineer</h4>
                  <span className="px-2 py-0.5 bg-retro-red/10 text-retro-red text-xs font-bold border border-retro-red/20 rounded">2021 - Present</span>
                </div>
                <div className="text-sm font-semibold text-retro-gray/70 mb-3 uppercase tracking-wide">Tech Corp</div>
                <p className="text-retro-gray leading-snug">Leading a team of 8 engineers building high-performance microservices. Architected scalable systems with 99.9% uptime.</p>
              </div>
            </div>

            <div className="relative mb-8 group">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-retro-blue border-2 border-retro-gray rounded-full z-10 group-hover:scale-125 transition-transform" />
              <div className="p-5 bg-white border-2 border-retro-gray shadow-brutal group-hover:shadow-brutal-hover transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h4 className="font-bold text-lg text-retro-gray">Senior Full Stack Developer</h4>
                  <span className="px-2 py-0.5 bg-retro-blue/10 text-retro-blue text-xs font-bold border border-retro-blue/20 rounded">2018 - 2021</span>
                </div>
                <div className="text-sm font-semibold text-retro-gray/70 mb-3 uppercase tracking-wide">StartupCo</div>
                <p className="text-retro-gray leading-snug">Built DeFi trading platform from scratch. Implemented algo-trading engines with sub-millisecond latency.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-retro-yellow border-2 border-retro-gray rounded-full z-10 group-hover:scale-125 transition-transform" />
              <div className="p-5 bg-white border-2 border-retro-gray shadow-brutal group-hover:shadow-brutal-hover transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <h4 className="font-bold text-lg text-retro-gray">Software Engineer</h4>
                  <span className="px-2 py-0.5 bg-retro-yellow/10 text-retro-yellow text-xs font-bold border border-retro-yellow/20 rounded">2016 - 2018</span>
                </div>
                <div className="text-sm font-semibold text-retro-gray/70 mb-3 uppercase tracking-wide">Innovation Labs</div>
                <p className="text-retro-gray leading-snug">Developed cloud infrastructure and CI/CD pipelines. Mentored junior developers and established best practices.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-retro-gray/20">
          {['System Design', 'Mentor', 'Strategy', 'Scalability', 'React', 'Next.js', 'Node.js', 'Rust'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-retro-white border border-retro-gray shadow-brutal-sm text-xs font-bold font-mono text-retro-gray hover:-translate-y-0.5 transition-transform">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

