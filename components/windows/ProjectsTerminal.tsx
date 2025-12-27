'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Cpu, Layers, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { projectsData } from '@/lib/data/projects';

export default function ProjectsTerminal() {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  return (
    <div className="flex h-full text-retro-white font-mono overflow-hidden bg-retro-gray border-2 border-retro-gray">
      {/* Sidebar List */}
      <div className="w-1/3 border-r-2 border-retro-white/20 bg-retro-gray p-0 overflow-y-auto">
        <div className="p-4 border-b-2 border-retro-white/20 sticky top-0 bg-retro-gray z-10">
          <h2 className="text-xl font-black text-retro-yellow uppercase tracking-widest flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            Project_Log
          </h2>
        </div>
        <div className="p-2 space-y-1">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left p-3 border-2 transition-all group relative overflow-hidden ${selectedProject.id === project.id
                ? 'bg-retro-blue border-retro-blue text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-transparent border-transparent hover:border-retro-white/50 text-retro-white/70 hover:text-retro-white'
                }`}
            >
              <div className="flex flex-col relative z-10">
                <span className="font-bold flex items-center justify-between">
                  {project.name}
                  {selectedProject.id === project.id && <ChevronRight className="w-4 h-4" />}
                </span>
                <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${selectedProject.id === project.id ? 'text-retro-yellow' : 'text-retro-white/40'
                  }`}>{project.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#1e1e1e] relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 relative z-10 max-w-3xl"
          >
            {/* Header */}
            <div className="border-b-4 border-retro-yellow pb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-5xl font-black text-retro-white tracking-tighter uppercase leading-none">
                  {selectedProject.name}
                </h2>
                <span className="px-3 py-1 bg-retro-blue text-retro-white font-bold border-2 border-retro-white shadow-brutal-sm text-sm uppercase">
                  {selectedProject.category}
                </span>
              </div>
              <p className="text-retro-white/80 text-lg leading-relaxed border-l-4 border-retro-white/20 pl-4">
                {selectedProject.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Architecture Section */}
              {selectedProject.architecture && (
                <div className="bg-retro-gray border-2 border-retro-white/20 p-5 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300">
                  <h3 className="text-retro-blue font-black mb-4 uppercase flex items-center gap-2 border-b-2 border-retro-blue/20 pb-2">
                    <Layers className="w-5 h-5" />
                    Architecture
                  </h3>
                  <p className="text-sm text-retro-white/80 leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>
              )}

              {/* Impact Section */}
              {selectedProject.impact && (
                <div className="bg-retro-gray border-2 border-retro-white/20 p-5 shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300">
                  <h3 className="text-retro-yellow font-black mb-4 uppercase flex items-center gap-2 border-b-2 border-retro-yellow/20 pb-2">
                    <Cpu className="w-5 h-5" />
                    Impact
                  </h3>
                  <p className="text-sm text-retro-white/80 leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="bg-retro-white/5 p-6 border-2 border-dashed border-retro-white/30">
              <h3 className="text-retro-red font-black mb-4 uppercase flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technological_Arsenal
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-retro-gray border border-retro-white/40 text-retro-white text-xs font-bold uppercase tracking-wider hover:bg-retro-white hover:text-retro-gray transition-colors cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-retro-gray border-2 border-retro-white text-retro-white font-black uppercase hover:bg-retro-white hover:text-retro-gray transition-all active:scale-95 shadow-brutal-sm">
                  <Github className="w-5 h-5" />
                  Source Code
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-retro-blue border-2 border-retro-white text-white font-black uppercase hover:bg-retro-blue/90 transition-all active:scale-95 shadow-brutal-sm">
                  <ExternalLink className="w-5 h-5" />
                  Live Deployment
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
