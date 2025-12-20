'use client';

import { useState, useEffect } from 'react';
import { useWindowStore } from '@/lib/store/windowStore';
import TaskbarItem from './TaskbarItem';
import StartMenu from './StartMenu';

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
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const openWindows = windows; // Show all windows, including minimized

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-14 md:h-16 bg-gradient-to-r from-onepiece-red to-onepiece-gold border-t-2 md:border-t-4 border-onepiece-blue flex items-center justify-between px-3 md:px-4 lg:px-6 z-50 shadow-lg">
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all font-bold ${
            startMenuOpen
              ? 'bg-white/70 text-onepiece-red border-2 border-onepiece-blue'
              : 'bg-white/40 hover:bg-white/60 text-white border-2 border-transparent'
          }`}
          aria-label="Start Menu"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
          <span className="text-xs md:text-sm hidden sm:inline">Start</span>
        </button>

        {/* Open Windows */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 flex-1 overflow-x-auto scrollbar-hide">
          {openWindows.map((window) => (
            <TaskbarItem key={window.id} window={window} />
          ))}
        </div>

        {/* Clock */}
        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm font-bold text-white drop-shadow-md flex-shrink-0">
          <div className="flex items-center gap-1 md:gap-2 bg-white/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full">
            <span className="hidden md:inline">{formatDate(time)}</span>
            <span className="font-mono">{formatTime(time)}</span>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
    </>
  );
}

