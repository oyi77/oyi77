'use client';

import { useWindowStore, Window } from '@/lib/store/windowStore';
import { User, Briefcase, Terminal, BarChart3, Sparkles, Map, Users, Scroll } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskbarItemProps {
  window: Window;
}

const iconMap: Record<string, React.ReactNode> = {
  welcome: <Sparkles className="w-4 h-4" />,
  profile: <User className="w-4 h-4" />,
  bounty: <Scroll className="w-4 h-4" />,
  logpose: <Terminal className="w-4 h-4" />,
  tactical: <Map className="w-4 h-4" />,
  crew: <Users className="w-4 h-4" />,
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
      className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all relative z-50 cursor-pointer font-semibold group shadow-3d ${window.minimized
        ? 'bg-white/30 hover:bg-white/40 text-white/70'
        : 'bg-white/60 hover:bg-white/80 text-onepiece-blue border-2 border-white/50'
        }`}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95, y: 1 }}
      onMouseEnter={() => focusWindow(window.id)}
    >
      <div className="text-onepiece-blue flex-shrink-0 group-hover:scale-110 transition-transform">{iconMap[window.type]}</div>
      <span className="text-[10px] md:text-xs truncate max-w-[80px] md:max-w-none font-bold text-onepiece-mahogany group-hover:text-onepiece-red transition-colors">{window.title}</span>
    </motion.button>
  );
}

