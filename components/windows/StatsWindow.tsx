'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Activity, Server, Zap, Compass } from 'lucide-react';
import { profileData } from '@/lib/data/profile';
import { projectsData } from '@/lib/data/projects';

export default function StatsWindow() {
  const [animatedTrading, setAnimatedTrading] = useState(0);
  const [animatedEfficiency, setAnimatedEfficiency] = useState(0);
  const [animatedVelocity, setAnimatedVelocity] = useState(0);
  const [animatedUptime, setAnimatedUptime] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const tradingTarget = profileData.metrics.tradingAccuracy;
    const efficiencyTarget = profileData.metrics.efficiencyGains;
    const velocityTarget = profileData.metrics.teamVelocity;
    const uptimeTarget = profileData.metrics.systemUptime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedTrading(Math.min(tradingTarget * progress, tradingTarget));
      setAnimatedEfficiency(Math.min(efficiencyTarget * progress, efficiencyTarget));
      setAnimatedVelocity(Math.min(velocityTarget * progress, velocityTarget));
      setAnimatedUptime(Math.min(uptimeTarget * progress, uptimeTarget));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 h-full bg-tan text-retro-gray overflow-y-auto">
      <h2 className="text-3xl font-black mb-8 italic uppercase tracking-widest flex items-center gap-3 border-b-4 border-retro-gray pb-4">
        <Map className="w-8 h-8 text-retro-gray" />
        Tactical Map
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Architectural Resilience */}
        <motion.div
          className="bg-retro-white border-2 border-retro-gray p-6 shadow-brutal relative overflow-hidden group hover:shadow-brutal-hover transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-6 border-b-2 border-retro-gray pb-2">
            <Activity className="w-5 h-5 text-retro-blue" />
            <h3 className="text-lg font-black uppercase text-retro-gray">System Resilience</h3>
          </div>

          <div className="flex items-end gap-4 h-40">
            <div className="flex-1 flex flex-col items-center group/bar">
              <div className="flex-1 w-full bg-retro-gray/5 rounded-t-sm overflow-hidden flex items-end border-b border-retro-gray relative">
                <div className="absolute inset-0 bg-retro-grid opacity-20 pointer-events-none" />
                <motion.div
                  className="w-full bg-retro-blue border-t-2 border-x-2 border-retro-gray relative z-10"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedTrading}%` }}
                  transition={{ duration: 2, type: "spring" }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <span className="text-xs font-bold font-mono text-retro-gray/60 mt-3 uppercase tracking-wider">Reliability</span>
              <span className="text-2xl font-black text-retro-blue mt-1 font-mono">
                {Math.round(animatedTrading)}%
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center group/bar">
              <div className="flex-1 w-full bg-retro-gray/5 rounded-t-sm overflow-hidden flex items-end border-b border-retro-gray relative">
                <div className="absolute inset-0 bg-retro-grid opacity-20 pointer-events-none" />
                <motion.div
                  className="w-full bg-retro-yellow border-t-2 border-x-2 border-retro-gray relative z-10"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedUptime}%` }}
                  transition={{ duration: 2.2, type: "spring" }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <span className="text-xs font-bold font-mono text-retro-gray/60 mt-3 uppercase tracking-wider">Uptime</span>
              <span className="text-2xl font-black text-retro-yellow mt-1 font-mono">
                {animatedUptime.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Operational Velocity */}
        <motion.div
          className="bg-retro-white border-2 border-retro-gray p-6 shadow-brutal relative overflow-hidden group hover:shadow-brutal-hover transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-6 border-b-2 border-retro-gray pb-2">
            <Zap className="w-5 h-5 text-retro-red" />
            <h3 className="text-lg font-black uppercase text-retro-gray">Operational Velocity</h3>
          </div>
          <div className="flex items-end gap-4 h-40">
            <div className="flex-1 flex flex-col items-center group/bar">
              <div className="flex-1 w-full bg-retro-gray/5 rounded-t-sm overflow-hidden flex items-end border-b border-retro-gray relative">
                <div className="absolute inset-0 bg-retro-grid opacity-20 pointer-events-none" />
                <motion.div
                  className="w-full bg-retro-red border-t-2 border-x-2 border-retro-gray relative z-10"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedEfficiency}%` }}
                  transition={{ duration: 2, type: "spring" }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <span className="text-xs font-bold font-mono text-retro-gray/60 mt-3 uppercase tracking-wider">Efficiency</span>
              <span className="text-2xl font-black text-retro-red mt-1 font-mono">
                {Math.round(animatedEfficiency)}%
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center group/bar">
              <div className="flex-1 w-full bg-retro-gray/5 rounded-t-sm overflow-hidden flex items-end border-b border-retro-gray relative">
                <div className="absolute inset-0 bg-retro-grid opacity-20 pointer-events-none" />
                <motion.div
                  className="w-full bg-retro-gray border-t-2 border-x-2 border-retro-gray relative z-10"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedVelocity}%` }}
                  transition={{ duration: 2.3, type: "spring" }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <span className="text-xs font-bold font-mono text-retro-gray/60 mt-3 uppercase tracking-wider">Velocity</span>
              <span className="text-2xl font-black text-retro-gray mt-1 font-mono">
                {Math.round(animatedVelocity)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          className="bg-retro-white rounded-none p-6 border-2 border-retro-gray shadow-brutal flex items-start gap-6 hover:shadow-brutal-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <div className="p-3 bg-retro-blue text-white border-2 border-retro-gray shadow-brutal-sm">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black mb-2 text-retro-blue uppercase italic">Strategic Focus</h3>
            <p className="text-base text-retro-gray font-medium leading-relaxed">
              Currently focused on <span className="font-bold bg-retro-red/10 px-1">scaling decentralized infrastructure</span> and optimizing high-frequency trading systems. Prioritizing robust architecture over quick fixes to ensure long-term stability and growth.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
