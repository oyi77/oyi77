'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calendar, MapPin, Scroll } from 'lucide-react';
import { experienceData } from '@/lib/data/experience';

export default function ExperienceWindow() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([experienceData[0].id]));

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  return (
    <div className="p-6 text-white overflow-y-auto h-full space-y-8">
      <h2 className="text-3xl font-bold text-onepiece-gold mb-8 italic flex items-center gap-3">
        <Scroll className="w-8 h-8" />
        Bounty Posters & Strategic Expeditions
      </h2>
      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="bg-[#f4e4bc] text-[#4a2c1a] rounded-lg overflow-hidden border-8 border-[#8b4513] shadow-[10px_10px_0px_rgba(0,0,0,0.3)] relative"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            {/* "WANTED" Header */}
            <div className="bg-[#8b4513] text-[#f4e4bc] py-2 text-center font-black text-2xl tracking-[0.2em]">
              WANTED
            </div>
            <button
              onClick={() => toggleExpanded(exp.id)}
              className="w-full p-5 flex items-center justify-between hover:bg-onepiece-gold/20 transition-colors"
            >
              <div className="flex-1 text-center py-6 px-4">
                <h3 className="text-2xl font-black text-[#4a2c1a] uppercase mb-1 flex items-center justify-center gap-2">
                  {exp.position}
                  {exp.position.includes('Lead') && (
                    <span className="bg-onepiece-red text-white text-[10px] px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                      COMMANDER
                    </span>
                  )}
                </h3>
                <p className="text-xl font-bold text-[#8b4513] mb-4">@{exp.company}</p>

                <div className="border-y-2 border-[#8b4513]/30 py-4 my-4">
                  <p className="text-lg font-black text-[#4a2c1a] tracking-wider mb-2">BOUNTY</p>
                  <p className="text-3xl font-black text-onepiece-red">
                    {index === 0 ? '฿ 5,000,000,000' :
                      exp.position.includes('Lead') ? '฿ 4,500,000,000' :
                        '฿ 1,500,000,000'}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-bold text-[#8b4513]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  {exp.current && (
                    <div className="flex items-center gap-1 text-green-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span>ACTIVE</span>
                    </div>
                  )}
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expanded.has(exp.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-6 pt-4 border-t-2 border-dashed border-[#8b4513]/30">
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="text-lg font-black text-[#4a2c1a] mb-3 uppercase tracking-tight">Impact & Strategic Results:</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm font-bold text-[#4a2c1a]">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.techStack.length > 0 && (
                      <div>
                        <h4 className="text-sm font-black text-[#8b4513] mb-3 uppercase">Arsenal (Tech Stack):</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs bg-[#8b4513] text-[#f4e4bc] rounded font-black uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

