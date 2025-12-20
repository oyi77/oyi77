'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calendar, MapPin } from 'lucide-react';
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
    <div className="p-6 text-text-light overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-neon-cyan mb-6">Work Experience</h2>
      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="glass rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleExpanded(exp.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
                  {exp.current && (
                    <span className="px-2 py-0.5 text-xs bg-neon-green/20 text-neon-green rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-neon-magenta mb-2">{exp.company}</p>
                <div className="flex items-center gap-4 text-xs text-text-light/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>
              {expanded.has(exp.id) ? (
                <ChevronDown className="w-5 h-5 text-neon-cyan" />
              ) : (
                <ChevronRight className="w-5 h-5 text-neon-cyan" />
              )}
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
                  <div className="px-4 pb-4 space-y-4">
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-text-light/80">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.techStack.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-neon-cyan/20 text-neon-cyan rounded"
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

