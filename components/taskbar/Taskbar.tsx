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
    <div className="fixed bottom-0 left-0 right-0 h-12 glass border-t border-cyan-500/20 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-2">
        {openWindows.map((window) => (
          <TaskbarItem key={window.id} window={window} />
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-text-light">
        <div className="flex items-center gap-2">
          <span>{formatDate(time)}</span>
          <span className="text-neon-cyan font-mono">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
}

