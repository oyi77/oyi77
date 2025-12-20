'use client';

import { useState, useEffect } from 'react';
import { useWindowStore } from '@/lib/store/windowStore';
import TaskbarItem from './TaskbarItem';

export default function Taskbar() {
  const { windows } = useWindowStore();
  const [time, setTime] = useState(new Date());

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

  const openWindows = windows.filter((w) => !w.minimized);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-cartoon-orange to-cartoon-yellow border-t-4 border-cartoon-purple flex items-center justify-between px-4 z-50 shadow-lg">
      <div className="flex items-center gap-2">
        {openWindows.map((window) => (
          <TaskbarItem key={window.id} window={window} />
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm font-bold text-white drop-shadow-md">
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
          <span>{formatDate(time)}</span>
          <span className="font-mono">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
}

