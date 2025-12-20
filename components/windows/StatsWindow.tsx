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
    <div className="p-6 text-white h-full overflow-y-auto">
      <h2 className="text-2xl font-black text-onepiece-gold mb-8 italic uppercase tracking-widest flex items-center gap-3">
        <Map className="w-8 h-8" />
        Tactical Map: Strategy & Ops
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Architectural Resilience */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-onepiece-blue shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-onepiece-blue" />
            <h3 className="text-lg font-black text-onepiece-blue uppercase">System Resilience</h3>
          </div>

          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-white/10 rounded-t-xl overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-onepiece-blue rounded-t-xl shadow-[0_0_20px_rgba(30,58,138,0.5)]"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedTrading}%` }}
                  transition={{ duration: 2, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-gray-400 mt-2">Reliability</span>
              <span className="text-xl font-black text-onepiece-blue">
                {Math.round(animatedTrading)}%
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-white/10 rounded-t-xl overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-cyan-400 rounded-t-xl shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedUptime}%` }}
                  transition={{ duration: 2.2, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-gray-400 mt-2">Uptime</span>
              <span className="text-xl font-black text-cyan-400">
                {animatedUptime.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Operational Velocity */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-onepiece-gold shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-onepiece-gold" />
            <h3 className="text-lg font-black text-onepiece-gold uppercase">Operational Velocity</h3>
          </div>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-white/10 rounded-t-xl overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-onepiece-gold rounded-t-xl shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedEfficiency}%` }}
                  transition={{ duration: 2, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-gray-400 mt-2">Efficiency</span>
              <span className="text-xl font-black text-onepiece-gold">
                {Math.round(animatedEfficiency)}%
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-white/10 rounded-t-xl overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-orange-500 rounded-t-xl shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedVelocity}%` }}
                  transition={{ duration: 2.3, type: "spring" }}
                />
              </div>
              <span className="text-sm font-bold text-gray-400 mt-2">Velocity</span>
              <span className="text-xl font-black text-orange-500">
                {Math.round(animatedVelocity)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          className="bg-white/80 rounded-2xl p-4 border-4 border-cartoon-blue cartoon-shadow flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <Compass className="w-12 h-12 text-onepiece-blue mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-1 text-onepiece-blue">Strategic Focus</h3>
            <p className="text-sm text-text-dark/80 font-medium leading-relaxed">
              Currently focused on scaling decentralized infrastructure and optimizing high-frequency trading systems. Prioritizing robust architecture over quick fixes to ensure long-term stability and growth.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
