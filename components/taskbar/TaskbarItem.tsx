'use client';

import { useWindowStore, Window } from '@/lib/store/windowStore';
import { User, Briefcase, Terminal, BarChart3, Sparkles, Map, Users, Scroll, AppWindow } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface TaskbarItemProps {
  window: Window;
}

const iconMap: Record<string, React.ReactNode> = {
  welcome: <Sparkles className="w-5 h-5" />,
  profile: <User className="w-5 h-5" />,
  bounty: <Briefcase className="w-5 h-5" />,
  logpose: <Terminal className="w-5 h-5" />,
  tactical: <BarChart3 className="w-5 h-5" />,
  crew: <Users className="w-5 h-5" />,
  fileManager: <AppWindow className="w-5 h-5" />,
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
      className={cn(
        "flex items-center justify-center p-2 rounded-xl transition-all relative group cursor-pointer border-2",
        window.minimized
          ? "bg-tan text-retro-gray/50 border-transparent hover:bg-white hover:text-retro-gray hover:border-retro-gray/30"
          : "bg-retro-blue text-white border-retro-gray shadow-brutal-sm"
      )}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95, y: 0 }}
      onMouseEnter={() => focusWindow(window.id)}
    >
      {iconMap[window.type] || <AppWindow className="w-5 h-5" />}
      {/* Tooltip on hover (simplified) */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-retro-gray text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
        {window.title}
      </span>
    </motion.button>
  );
}

