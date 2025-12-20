'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Cpu, Layers, ExternalLink, Github } from 'lucide-react';
import { projectsData } from '@/lib/data/projects';

export default function ProjectsTerminal() {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  return (
    <div className="flex h-full text-white overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-white/20 bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
        <h2 className="text-sm font-bold text-onepiece-gold mb-4 uppercase tracking-widest flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Project Log
        </h2>
        <div className="space-y-2">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all ${selectedProject.id === project.id
                  ? 'bg-onepiece-blue text-white shadow-lg'
                  : 'hover:bg-white/10 text-gray-300'
                }`}
            >
              <div className="flex flex-col">
                <span>{project.name}</span>
                <span className="text-[10px] opacity-70 font-mono">{project.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0a0f1c]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-black text-onepiece-gold tracking-tight">{selectedProject.name}</h2>
                <span className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-cyan-400 border border-cyan-400/30">
                  {selectedProject.category}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>
            </div>

            {/* Architecture Section (New for Technical Lead) */}
            {selectedProject.architecture && (
              <div className="bg-onepiece-blue/10 border border-onepiece-blue/30 rounded-xl p-5">
                <h3 className="text-sm font-bold text-onepiece-blue mb-3 uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  System Architecture
                </h3>
                <p className="text-sm text-gray-300 font-mono leading-relaxed">
                  {selectedProject.architecture}
                </p>
              </div>
            )}

            {/* Impact Section (New) */}
            {selectedProject.impact && (
              <div className="bg-onepiece-gold/10 border border-onepiece-gold/30 rounded-xl p-5">
                <h3 className="text-sm font-bold text-onepiece-gold mb-3 uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Business Impact
                </h3>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase flex items-center gap-2">
                <Code className="w-4 h-4" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-white/10">
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-white hover:text-onepiece-gold transition-colors">
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-white hover:text-onepiece-gold transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
