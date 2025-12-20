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
    <div className="p-6 text-text-light">
      <h2 className="text-2xl font-bold text-neon-cyan mb-6">Statistics Dashboard</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <motion.div
          className="glass rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Trading Accuracy</h3>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-slate-800 rounded-t overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-neon-green"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedTrading}%` }}
                  transition={{ duration: 2 }}
                />
              </div>
              <span className="text-2xl font-bold text-neon-green mt-2">
                {Math.round(animatedTrading)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Efficiency Gains</h3>
          <div className="flex items-end gap-2 h-32">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex-1 w-full bg-slate-800 rounded-t overflow-hidden flex items-end">
                <motion.div
                  className="w-full bg-neon-magenta"
                  initial={{ height: 0 }}
                  animate={{ height: `${animatedEfficiency}%` }}
                  transition={{ duration: 2 }}
                />
              </div>
              <span className="text-2xl font-bold text-neon-magenta mt-2">
                {Math.round(animatedEfficiency)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          className="glass rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">Projects Completed</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-neon-cyan">
              {Math.round(animatedProjects)}+
            </span>
            <span className="text-sm text-text-light/70">active projects</span>
          </div>
        </motion.div>

        <motion.div
          className="glass rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-white">Years of Experience</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-neon-cyan">
              {Math.round(animatedYears)}+
            </span>
            <span className="text-sm text-text-light/70">years in tech</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

