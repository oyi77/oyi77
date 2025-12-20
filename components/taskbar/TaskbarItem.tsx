'use client';

import { useWindowStore, Window } from '@/lib/store/windowStore';
import { User, Briefcase, Terminal, BarChart3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskbarItemProps {
  window: Window;
}

const iconMap = {
  welcome: <Sparkles className="w-4 h-4" />,
  profile: <User className="w-4 h-4" />,
  experience: <Briefcase className="w-4 h-4" />,
  projects: <Terminal className="w-4 h-4" />,
  stats: <BarChart3 className="w-4 h-4" />,
};

export default function TaskbarItem({ window }: TaskbarItemProps) {
  const { focusWindow, restoreWindow, minimizeWindow } = useWindowStore();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.minimized) {
      restoreWindow(window.id);
    } else {
      minimizeWindow(window.id);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      type="button"
      className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all relative z-50 cursor-pointer font-semibold ${
        window.minimized
          ? 'bg-white/30 hover:bg-white/40 text-white/70'
          : 'bg-white/50 hover:bg-white/70 text-onepiece-blue border-2 border-white/50'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => focusWindow(window.id)}
    >
      <div className="text-onepiece-blue flex-shrink-0">{iconMap[window.type]}</div>
      <span className="text-[10px] md:text-xs truncate max-w-[80px] md:max-w-none">{window.title}</span>
    </motion.button>
  );
}

