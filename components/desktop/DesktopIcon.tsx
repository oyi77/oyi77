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
}

const iconMap: Record<string, React.ReactNode> = {
  profile: <User className="w-12 h-12" />,
  experience: <Briefcase className="w-12 h-12" />,
  projects: <Terminal className="w-12 h-12" />,
  stats: <BarChart3 className="w-12 h-12" />,
  cv: <FileText className="w-12 h-12" />,
  github: <FolderGit2 className="w-12 h-12" />,
};

export default function DesktopIcon({ type, label, icon, x = 0, y = 0 }: DesktopIconProps) {
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

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer select-none group relative z-10"
      style={{ position: 'absolute', left: x, top: y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`p-4 rounded-2xl transition-all duration-300 cartoon-shadow ${
          isSelected
            ? 'bg-cartoon-orange/30 border-4 border-cartoon-orange'
            : 'bg-white/80 group-hover:bg-white border-4 border-cartoon-yellow group-hover:border-cartoon-orange'
        }`}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={isSelected ? { y: [0, -5, 0] } : {}}
      >
        <div className="text-cartoon-orange group-hover:text-cartoon-purple transition-colors">
          {icon}
        </div>
      </motion.div>
      <motion.span
        className={`text-sm font-bold text-text-dark px-3 py-1.5 rounded-full transition-all ${
          isSelected
            ? 'bg-cartoon-orange text-white'
            : 'bg-white/90 group-hover:bg-cartoon-yellow text-cartoon-purple'
        }`}
        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

