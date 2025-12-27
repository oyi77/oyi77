'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '@/lib/store/windowStore';
import TaskbarItem from './TaskbarItem';
import StartMenu from './StartMenu';
import { cn } from '@/lib/utils/cn';
import { Ghost } from 'lucide-react';

export default function Taskbar() {
  const { windows } = useWindowStore();
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const openWindows = windows; // Show all windows

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">

        {/* Dock Container */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-3",
          "bg-retro-white border-2 border-retro-gray shadow-brutal-lg rounded-2xl",
          "transition-all duration-300"
        )}>

          {/* Start Button */}
          <motion.button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={cn(
              "flex items-center justify-center p-2 rounded-xl transition-all border-2",
              startMenuOpen ? "bg-retro-red text-white border-retro-gray shadow-none translate-y-0.5" : "bg-black border-transparent hover:border-retro-gray/50 hover:bg-white"
            )}
            aria-label="Start Menu"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Ghost className="w-6 h-6" strokeWidth={2.5} />
          </motion.button>

          {/* Divider */}
          <div className="w-0.5 h-8 bg-retro-gray/20 mx-1" />

          {/* Windows / Apps */}
          <div className="flex items-center gap-2">
            {openWindows.length === 0 && (
              <span className="text-xs font-mono text-retro-gray/50 px-2 select-none">NO ACTIVE TASKS</span>
            )}
            {openWindows.map((window) => (
              <TaskbarItem key={window.id} window={window} />
            ))}
          </div>

          {/* Divider */}
          <div className="w-0.5 h-8 bg-retro-gray/20 mx-1" />

          {/* Clock */}
          <div className="flex flex-col items-end leading-none font-mono text-retro-gray select-none">
            <span className="text-xs font-bold">{formatTime(time)}</span>
            <span className="text-[10px] opacity-60">EST</span>
          </div>

        </div>

      </div>

      {/* Start Menu */}
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
    </>
  );
}

