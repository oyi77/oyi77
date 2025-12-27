'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calendar, MapPin, Scroll, Award } from 'lucide-react';
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
    <div className="p-6 md:p-8 h-full bg-tan text-retro-gray overflow-y-auto">
      <h2 className="text-3xl font-black mb-8 italic flex items-center gap-3 border-b-4 border-retro-gray pb-4">
        <Scroll className="w-8 h-8 text-retro-gray" />
        <span className="uppercase tracking-widest">Bounty Posters</span>
      </h2>
      <div className="space-y-6">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="bg-retro-white text-retro-gray rounded-none border-2 border-retro-gray shadow-brutal relative overflow-hidden group hover:shadow-brutal-hover transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            {/* "WANTED" Header */}
            <div className="bg-retro-gray text-retro-white py-2 text-center font-black text-2xl tracking-[0.3em] uppercase border-b-2 border-retro-gray">
              WANTED
            </div>

            <button
              onClick={() => toggleExpanded(exp.id)}
              className="w-full p-6 flex flex-col md:flex-row items-center gap-6 text-left hover:bg-tan/20 transition-colors"
            >
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-2xl font-black uppercase flex items-center gap-3">
                    {exp.position}
                    {exp.position.includes('Lead') && (
                      <span className="bg-retro-red text-white text-xs px-2 py-0.5 font-mono tracking-wider border border-retro-gray shadow-brutal-sm animate-pulse">
                        COMMANDER
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold font-mono border border-retro-gray px-2 py-1 bg-white shadow-brutal-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.startDate} - {exp.endDate}</span>
                    {exp.current && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-ping ml-1" />
                    )}
                  </div>
                </div>

                <p className="text-xl font-bold text-retro-blue mb-4 font-mono">@{exp.company}</p>

                <div className="border-y-2 border-dashed border-retro-gray/30 py-4 my-4 bg-tan/10 -mx-6 px-6">
                  <p className="text-sm font-black text-retro-gray/60 tracking-wider mb-1 uppercase">BOUNTY</p>
                  <p className="text-3xl md:text-4xl font-black text-retro-red font-mono tracking-tighter">
                    {index === 0 ? '฿ 5,000,000,000' :
                      exp.position.includes('Lead') ? '฿ 4,500,000,000' :
                        '฿ 1,500,000,000'}
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ rotate: expanded.has(exp.id) ? 180 : 0 }}
                className="p-2 border-2 border-retro-gray rounded-full bg-white shadow-brutal-sm"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expanded.has(exp.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-6 pt-2">
                    {exp.achievements.length > 0 && (
                      <div className="bg-white p-4 border-2 border-retro-gray shadow-brutal-sm">
                        <h4 className="text-sm font-black text-retro-gray mb-3 uppercase tracking-tight flex items-center gap-2">
                          <Award className="w-4 h-4 text-retro-yellow" />
                          Impact & Strategic Results:
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-sm font-bold text-retro-gray/80 ml-2 marker:text-retro-red">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="leading-relaxed">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.techStack.length > 0 && (
                      <div>
                        <h4 className="text-xs font-black text-retro-gray/60 mb-3 uppercase tracking-wider">Arsenal (Tech Stack):</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-retro-gray text-white font-bold font-mono border border-transparent hover:border-retro-gray hover:bg-retro-white hover:text-retro-gray transition-colors cursor-default"
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

