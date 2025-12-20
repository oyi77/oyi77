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

  const handleDoubleClick = () => {
    if (type === 'cv') {
      // Download CV
      const link = document.createElement('a');
      link.href = '/muchammadfikriizzuddin_cv.pdf';
      link.download = 'muchammadfikriizzuddin_cv.pdf';
      link.click();
    } else if (type === 'github') {
      // Open GitHub in new tab
      window.open('https://github.com/oyi77', '_blank');
    } else {
      openWindow(type as WindowType);
    }
  };

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer select-none group"
      style={{ position: 'absolute', left: x, top: y }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`p-3 rounded-lg transition-all duration-300 ${
          isSelected
            ? 'bg-cyan-500/30 neon-glow'
            : 'bg-slate-800/20 group-hover:bg-slate-800/40 group-hover:neon-glow'
        }`}
      >
        <div className="text-neon-cyan group-hover:text-neon-cyan transition-colors">
          {icon}
        </div>
      </div>
      <span
        className={`text-xs text-text-light px-2 py-1 rounded transition-all ${
          isSelected
            ? 'bg-cyan-500/30 text-white'
            : 'bg-slate-900/50 group-hover:bg-slate-900/70'
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}

