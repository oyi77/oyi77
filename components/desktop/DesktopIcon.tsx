'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Terminal, BarChart3, FileText, FolderGit2 } from 'lucide-react';
import { useWindowStore, WindowType } from '@/lib/store/windowStore';

interface DesktopIconProps {
  type: WindowType | 'cv' | 'github';
  label: string;
  icon: React.ReactNode;
  x?: number;
  y?: number;
  isGridItem?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  profile: <User className="w-12 h-12" />,
  experience: <Briefcase className="w-12 h-12" />,
  projects: <Terminal className="w-12 h-12" />,
  stats: <BarChart3 className="w-12 h-12" />,
  cv: <FileText className="w-12 h-12" />,
  github: <FolderGit2 className="w-12 h-12" />,
};

export default function DesktopIcon({ type, label, icon, x = 0, y = 0, isGridItem = false }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const { openWindow } = useWindowStore();

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (type === 'cv') {
      // Download CV
      const link = document.createElement('a');
      link.href = '/muchammadfikriizzuddin_cv.pdf';
      link.download = 'muchammadfikriizzuddin_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (type === 'github') {
      // Open GitHub in new tab
      window.open('https://github.com/oyi77', '_blank', 'noopener,noreferrer');
    } else {
      openWindow(type as WindowType);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
  };

  // Handle touch for mobile (single tap = double click on mobile)
  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    const target = e.currentTarget;
    const now = Date.now();
    const lastTap = (target as any).lastTap || 0;
    const timeDiff = now - lastTap;

    if (timeDiff < 300 && timeDiff > 0) {
      // Double tap detected
      handleDoubleClick(e as any);
    } else {
      handleClick(e as any);
    }
    (target as any).lastTap = now;
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer select-none group relative z-10"
      style={!isGridItem ? { position: 'absolute', left: x, top: y } : {}}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={handleTouch}
      whileHover={{ scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.05 : 1, zIndex: 1000 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl transition-all duration-300 icon-3d ${isSelected
          ? 'bg-gradient-to-br from-onepiece-red/40 to-onepiece-red/20 border-2 md:border-4 border-onepiece-red'
          : 'bg-white/90 group-hover:bg-white border-2 md:border-4 border-onepiece-gold group-hover:border-onepiece-red'
          }`}
        whileHover={{
          scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.15 : 1,
          rotate: typeof window !== 'undefined' && window.innerWidth >= 768 ? [0, -5, 5, 0] : 0,
          y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -3 : 0
        }}
        whileTap={{ scale: 0.98, y: 1 }}
        animate={isSelected ? { y: [0, -5, 0] } : {}}
      >
        <div className="text-onepiece-red group-hover:text-onepiece-blue transition-colors">
          {icon}
        </div>
      </motion.div>
      <motion.div className="flex flex-col items-center gap-0.5 md:gap-1 relative z-50">
        <motion.span
          className={`text-xs md:text-sm font-bold text-text-dark px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 rounded-full transition-all opacity-0 group-hover:opacity-100 pointer-events-none relative z-[100] shadow-3d ${isSelected
            ? 'bg-onepiece-red text-white opacity-100'
            : 'bg-white/95 group-hover:bg-onepiece-gold text-onepiece-blue'
            }`}
          animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
        >
          {label}
        </motion.span>
        <motion.span
          className="text-[10px] md:text-xs text-text-dark/60 font-medium hidden md:block opacity-0 group-hover:opacity-100 transition-opacity relative z-[100]"
        >
          Double-click to open
        </motion.span>
        <motion.span
          className="text-[10px] text-text-dark/60 font-medium md:hidden opacity-0 group-hover:opacity-100 transition-opacity relative z-[100]"
        >
          Tap to open
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

