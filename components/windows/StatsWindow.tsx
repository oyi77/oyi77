'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { profileData } from '@/lib/data/profile';
import { projectsData } from '@/lib/data/projects';

export default function StatsWindow() {
  const [animatedTrading, setAnimatedTrading] = useState(0);
  const [animatedEfficiency, setAnimatedEfficiency] = useState(0);
  const [animatedProjects, setAnimatedProjects] = useState(0);
  const [animatedYears, setAnimatedYears] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const tradingTarget = profileData.metrics.tradingAccuracy;
    const efficiencyTarget = profileData.metrics.efficiencyGains;
    const projectsTarget = projectsData.length;
    const yearsTarget = 7;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedTrading(Math.min(tradingTarget * progress, tradingTarget));
      setAnimatedEfficiency(Math.min(efficiencyTarget * progress, efficiencyTarget));
      setAnimatedProjects(Math.min(projectsTarget * progress, projectsTarget));
      setAnimatedYears(Math.min(yearsTarget * progress, yearsTarget));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const chartData = [
    { name: 'Trading Accuracy', value: animatedTrading, color: '#39ff14' },
    { name: 'Efficiency Gains', value: animatedEfficiency, color: '#ff006e' },
  ];

  return (
    <div className="p-6 text-text-dark">
      <h2 className="text-2xl font-bold text-onepiece-red mb-8">Statistics Dashboard</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <motion.div
          className="bg-white/80 rounded-2xl p-6 border-4 border-onepiece-blue cartoon-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <h3 className="text-lg font-bold mb-4 text-onepiece-blue">Trading Accuracy</h3>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-gray-200 rounded-t-xl overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-onepiece-blue rounded-t-xl"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedTrading}%` }}
                  transition={{ duration: 2, type: "spring" }}
                />
              </div>
              <span className="text-2xl font-bold text-onepiece-blue mt-2">
                {Math.round(animatedTrading)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/80 rounded-2xl p-6 border-4 border-onepiece-gold cartoon-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <h3 className="text-lg font-bold mb-4 text-onepiece-blue">Efficiency Gains</h3>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-gray-200 rounded-t-xl overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-onepiece-gold rounded-t-xl"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedEfficiency}%` }}
                  transition={{ duration: 2, type: "spring" }}
                />
              </div>
              <span className="text-2xl font-bold text-onepiece-gold mt-2">
                {Math.round(animatedEfficiency)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          className="bg-white/80 rounded-2xl p-4 border-4 border-cartoon-blue cartoon-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <h3 className="text-lg font-bold mb-2 text-onepiece-blue">Projects Completed</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-onepiece-blue">
              {Math.round(animatedProjects)}+
            </span>
            <span className="text-sm text-text-dark/70 font-medium">active projects</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/80 rounded-2xl p-6 border-4 border-onepiece-red cartoon-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <h3 className="text-lg font-bold mb-2 text-onepiece-blue">Years of Experience</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-onepiece-red">
              {Math.round(animatedYears)}+
            </span>
            <span className="text-sm text-text-dark/70 font-medium">years in tech</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

