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
    <div className="p-6 text-text-dark overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-cartoon-orange mb-6">Work Experience</h2>
      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="bg-white/80 rounded-2xl overflow-hidden border-4 border-cartoon-yellow cartoon-shadow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <button
              onClick={() => toggleExpanded(exp.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-cartoon-yellow/20 transition-colors"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-cartoon-purple">{exp.position}</h3>
                  {exp.current && (
                    <span className="px-3 py-1 text-xs bg-cartoon-green text-white rounded-full font-bold">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-cartoon-orange mb-2 font-semibold">{exp.company}</p>
                <div className="flex items-center gap-4 text-xs text-text-dark/70 font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cartoon-blue" />
                    <span>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cartoon-blue" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>
              {expanded.has(exp.id) ? (
                <ChevronDown className="w-5 h-5 text-cartoon-orange" />
              ) : (
                <ChevronRight className="w-5 h-5 text-cartoon-orange" />
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
                  <div className="px-4 pb-4 space-y-4 bg-cartoon-yellow/10">
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-cartoon-purple mb-2">Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-text-dark">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="font-medium">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.techStack.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-cartoon-purple mb-2">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs bg-cartoon-blue text-white rounded-full font-semibold"
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

