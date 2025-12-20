'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2, RefreshCw } from 'lucide-react';
import { useWindowStore, Window as WindowType } from '@/lib/store/windowStore';

interface WindowMenuProps {
  window: WindowType;
  onClose: () => void;
}

export default function WindowMenu({ window: win, onClose }: WindowMenuProps) {
  const { minimizeWindow, maximizeWindow, closeWindow } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      label: win.maximized ? 'Restore' : 'Maximize',
      icon: win.maximized ? <RefreshCw className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />,
      action: () => {
        maximizeWindow(win.id);
        onClose();
      },
    },
    { 
      label: 'Minimize', 
      icon: <Minus className="w-4 h-4" />, 
      action: () => { 
        minimizeWindow(win.id); 
        onClose(); 
      } 
    },
    { 
      label: 'Close', 
      icon: <X className="w-4 h-4" />, 
      action: () => { 
        closeWindow(win.id); 
        onClose(); 
      }, 
      danger: true 
    },
  ];

  return (
    <motion.div
      ref={menuRef}
      className="absolute top-14 left-0 bg-white rounded-xl shadow-2xl border-4 border-onepiece-red z-[100] min-w-[200px] overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`w-full px-5 py-3 text-left flex items-center gap-4 text-sm font-semibold transition-colors ${
            item.danger
              ? 'text-onepiece-red hover:bg-red-50'
              : 'text-onepiece-blue hover:bg-onepiece-gold/20'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </motion.div>
  );
}

