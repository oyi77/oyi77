'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, Terminal, BarChart3, FileText, FolderGit2, 
  Sparkles, Settings, Power, Search, X
} from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import { Luffy } from '@/components/cartoon/OnePieceCharacters';

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
      name: 'Welcome', 
      icon: <Sparkles className="w-8 h-8" />, 
      type: 'welcome' as const,
      description: 'Welcome to my portfolio'
    },
    { 
      name: 'Profile', 
      icon: <User className="w-8 h-8" />, 
      type: 'profile' as const,
      description: 'View my profile'
    },
    { 
      name: 'Experience', 
      icon: <Briefcase className="w-8 h-8" />, 
      type: 'experience' as const,
      description: 'Work experience'
    },
    { 
      name: 'Projects', 
      icon: <Terminal className="w-8 h-8" />, 
      type: 'projects' as const,
      description: 'Terminal projects'
    },
    { 
      name: 'Stats', 
      icon: <BarChart3 className="w-8 h-8" />, 
      type: 'stats' as const,
      description: 'Statistics dashboard'
    },
  ];

  const quickActions = [
    { 
      name: 'CV', 
      icon: <FileText className="w-6 h-6" />, 
      action: () => {
        const link = document.createElement('a');
        link.href = '/muchammadfikriizzuddin_cv.pdf';
        link.download = 'muchammadfikriizzuddin_cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      }
    },
    { 
      name: 'GitHub', 
      icon: <FolderGit2 className="w-6 h-6" />, 
      action: () => {
        window.open('https://github.com/oyi77', '_blank', 'noopener,noreferrer');
        onClose();
      }
    },
  ];

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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Start Menu */}
          <motion.div
            ref={menuRef}
            className="fixed bottom-14 md:bottom-16 left-2 md:left-4 right-2 md:right-auto w-auto md:w-96 max-w-md bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl border-2 md:border-4 border-onepiece-red z-50 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header with Luffy */}
            <div className="bg-gradient-to-r from-onepiece-red to-onepiece-gold p-3 md:p-4 flex items-center justify-between border-b-2 md:border-b-4 border-onepiece-blue">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden sm:block">
                  <Luffy size="sm" variant="excited" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-white">Start Menu</h3>
                  <p className="text-[10px] md:text-xs text-white/80">Muchammad Fikri Izzuddin</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-3 md:p-4 border-b-2 border-onepiece-gold/30">
              <div className="relative">
                <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-onepiece-blue" />
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 bg-white/80 border-2 border-onepiece-gold rounded-lg focus:outline-none focus:border-onepiece-red text-onepiece-blue text-sm md:text-base font-medium"
                  autoFocus
                />
              </div>
            </div>

            {/* Apps Grid */}
            <div className="p-3 md:p-4 max-h-[60vh] md:max-h-96 overflow-y-auto">
              <h4 className="text-xs md:text-sm font-bold text-onepiece-blue mb-2 md:mb-3 px-2">Applications</h4>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
                {filteredApps.map((app) => (
                  <motion.button
                    key={app.type}
                    onClick={() => {
                      openWindow(app.type);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 bg-white/60 hover:bg-onepiece-gold/20 rounded-lg md:rounded-xl border-2 border-transparent hover:border-onepiece-red transition-all group"
                    whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-onepiece-red group-hover:text-onepiece-blue transition-colors">
                      {app.icon}
                    </div>
                    <span className="text-[10px] md:text-xs font-semibold text-onepiece-blue text-center">
                      {app.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t-2 border-onepiece-gold/30">
                <h4 className="text-xs md:text-sm font-bold text-onepiece-blue mb-2 md:mb-3 px-2">Quick Actions</h4>
                <div className="flex gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="flex-1 flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-3 bg-white/60 hover:bg-onepiece-gold/20 rounded-lg md:rounded-xl border-2 border-transparent hover:border-onepiece-red transition-all group"
                      whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.05 : 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-onepiece-red group-hover:text-onepiece-blue transition-colors">
                        {action.icon}
                      </div>
                      <span className="text-[10px] md:text-xs font-semibold text-onepiece-blue">
                        {action.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 md:p-4 bg-onepiece-gold/10 border-t-2 border-onepiece-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-1.5 md:gap-2">
                <Settings className="w-4 h-4 md:w-5 md:h-5 text-onepiece-blue" />
                <span className="text-xs md:text-sm font-semibold text-onepiece-blue">Settings</span>
              </div>
              <button className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 hover:bg-onepiece-red/20 rounded-lg transition-colors">
                <Power className="w-4 h-4 md:w-5 md:h-5 text-onepiece-red" />
                <span className="text-xs md:text-sm font-semibold text-onepiece-red">Power</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

