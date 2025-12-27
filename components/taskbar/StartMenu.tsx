'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, Terminal, BarChart3, FileText, FolderGit2,
  Sparkles, Settings, Power, Search, X, Folder, Globe,
  Compass, Command, RefreshCw, Cpu, Monitor
} from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import { cn } from '@/lib/utils/cn';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { openWindow } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const apps = [
    {
      name: 'Welcome.exe',
      icon: <Sparkles className="w-6 h-6" />,
      type: 'welcome' as const,
      description: 'System Intro'
    },
    {
      name: 'Profile.sys',
      icon: <User className="w-6 h-6" />,
      type: 'profile' as const,
      description: 'User Data'
    },
    {
      name: 'Experience.log',
      icon: <FileText className="w-6 h-6" />,
      type: 'bounty' as const,
      description: 'Work History'
    },
    {
      name: 'Projects.exe',
      icon: <Monitor className="w-6 h-6" />,
      type: 'logpose' as const,
      description: 'Portfolio'
    },
    {
      name: 'System_Stats',
      icon: <Cpu className="w-6 h-6" />,
      type: 'tactical' as const,
      description: 'Performance'
    },
    {
      name: 'Terminal',
      icon: <Terminal className="w-6 h-6" />,
      type: 'terminal' as const,
      description: 'Command Line'
    },
    {
      name: 'File_Explorer',
      icon: <Folder className="w-6 h-6" />,
      type: 'fileManager' as const,
      description: 'Browse Files'
    },
    {
      name: 'Netscape',
      icon: <Globe className="w-6 h-6" />,
      type: 'browser' as const,
      description: 'Web Browser'
    },
  ];

  const quickActions = [
    {
      name: 'Download_CV',
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        const link = document.createElement('a');
        link.href = '/assets/cv/resume.pdf';
        link.download = 'Fikri_Izzuddin_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      }
    },
    {
      name: 'GitHub_Repo',
      icon: <FolderGit2 className="w-4 h-4" />,
      action: () => {
        window.open('https://github.com/oyi77', '_blank', 'noopener,noreferrer');
        onClose();
      }
    },
  ];

  const handleRestart = () => {
    window.location.reload();
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-retro-gray/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Omni-bar / Start Menu */}
          <motion.div
            ref={menuRef}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] z-50 flex flex-col items-center"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {/* Main Card */}
            <div className="w-full bg-tan border-2 border-retro-gray shadow-brutal-lg rounded-lg overflow-hidden flex flex-col">

              {/* Search Header */}
              <div className="p-4 border-b-2 border-retro-gray bg-white flex items-center gap-3">
                <Command className="w-5 h-5 text-retro-gray/50" />
                <input
                  type="text"
                  placeholder="EXECUTE PROGRAM..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-lg font-bold text-retro-gray placeholder:text-retro-gray/40 font-mono uppercase"
                  autoFocus
                />
                <div className="hidden md:flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded border border-retro-gray/20 text-xs font-mono text-retro-gray/50">ESC</span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-2 bg-tan max-h-[60vh] overflow-y-auto">

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {filteredApps.map((app) => (
                    <motion.button
                      key={app.type}
                      onClick={() => {
                        openWindow(app.type);
                        onClose();
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 rounded-md border-2 border-transparent transition-all group",
                        "hover:bg-white hover:border-retro-gray hover:shadow-brutal-sm"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="p-3 bg-retro-white border-2 border-retro-gray rounded-full shadow-brutal-sm group-hover:shadow-none group-hover:translate-y-0.5 transition-all">
                        <div className="text-retro-gray">
                          {app.icon}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-sm text-retro-gray font-mono">{app.name}</div>
                        <div className="text-[10px] text-retro-gray/60 font-mono uppercase tracking-wider">{app.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Quick Actions Footer */}
                {quickActions.length > 0 && (
                  <div className="mt-4 pt-4 border-t-2 border-retro-gray/10 flex gap-2">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={action.action}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-retro-white border-2 border-retro-gray shadow-brutal-sm hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95"
                      >
                        {action.icon}
                        <span className="font-bold text-sm font-mono">{action.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* System Footer */}
              <div className="p-2 bg-retro-gray text-retro-white flex items-center justify-between text-xs font-mono">
                <span>PAIJO-OS v1.0.5</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 hover:text-retro-yellow transition-colors px-2 py-0.5 rounded hover:bg-white/10"
                  >
                    <RefreshCw className="w-3 h-3" /> RESTART
                  </button>
                  <button
                    onClick={handleRestart}
                    className="flex items-center gap-1 hover:text-retro-red transition-colors px-2 py-0.5 rounded hover:bg-white/10"
                  >
                    <Power className="w-3 h-3" /> SHUTDOWN
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

