'use client';

import { useWindowStore, Window } from '@/lib/store/windowStore';
import { User, Briefcase, Terminal, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskbarItemProps {
  window: Window;
}

const iconMap = {
  profile: <User className="w-4 h-4" />,
  experience: <Briefcase className="w-4 h-4" />,
  projects: <Terminal className="w-4 h-4" />,
  stats: <BarChart3 className="w-4 h-4" />,
};

export default function TaskbarItem({ window }: TaskbarItemProps) {
  const { focusWindow, restoreWindow, minimizeWindow } = useWindowStore();

  const handleClick = () => {
    if (window.minimized) {
      restoreWindow(window.id);
    } else {
      minimizeWindow(window.id);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
        window.minimized
          ? 'bg-slate-800/40 hover:bg-slate-800/60'
          : 'bg-neon-cyan/20 hover:bg-neon-cyan/30'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => focusWindow(window.id)}
    >
      <div className="text-neon-cyan">{iconMap[window.type]}</div>
      <span className="text-xs text-text-light">{window.title}</span>
    </motion.button>
  );
}

