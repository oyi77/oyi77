'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowStore, Window as WindowType } from '@/lib/store/windowStore';
import WindowMenu from './WindowMenu';

interface WindowProps {
  window: WindowType;
  children: React.ReactNode;
}

const SNAP_THRESHOLD = 50;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;
const MIN_WIDTH_MOBILE = 320;
const MIN_HEIGHT_MOBILE = 400;

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const dragControls = useDragControls();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const minWidth = isMobile ? MIN_WIDTH_MOBILE : MIN_WIDTH;
  const minHeight = isMobile ? MIN_HEIGHT_MOBILE : MIN_HEIGHT;

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = win.zIndex.toString();
    }
  }, [win.zIndex]);

  const handleDragStart = () => {
    setIsDragging(true);
    startPositionRef.current = { x: win.x, y: win.y };
    focusWindow(win.id);
  };


  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    if (win.maximized) return;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    // Calculate new position based on start position + drag offset
    const newX = startPositionRef.current.x + info.offset.x;
    const newY = startPositionRef.current.y + info.offset.y;

    let snappedX = newX;
    let snappedY = newY;

    // Snap to left edge
    if (newX < SNAP_THRESHOLD) {
      snappedX = 0;
    }
    // Snap to right edge
    else if (newX + win.width > viewportWidth - SNAP_THRESHOLD) {
      snappedX = viewportWidth - win.width;
    }

    // Snap to top edge
    if (newY < SNAP_THRESHOLD) {
      snappedY = 0;
    }
    // Snap to bottom edge (account for taskbar)
    else if (newY + win.height > viewportHeight - SNAP_THRESHOLD - 64) {
      snappedY = viewportHeight - win.height - 64;
    }

    // Constrain within viewport
    snappedX = Math.max(0, Math.min(snappedX, viewportWidth - win.width));
    snappedY = Math.max(0, Math.min(snappedY, viewportHeight - win.height - 64));

    updatePosition(win.id, snappedX, snappedY);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    focusWindow(win.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = win.width;
    const startHeight = win.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newWidth = Math.max(minWidth, startWidth + deltaX);
      const newHeight = Math.max(minHeight, startHeight + deltaY);

      updateSize(win.id, newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTitleBarClick = () => {
    focusWindow(win.id);
  };

  if (win.minimized) {
    return null;
  }

  const windowStyle = win.maximized
    ? {
      x: 0,
      y: 0,
      width: '100vw',
      height: '100vh',
    }
    : {
      x: win.x,
      y: win.y,
      width: win.width,
      height: win.height,
    };

  return (
    <motion.div
      ref={windowRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: win.zIndex }}
    >
      <motion.div
        className="backdrop-blur-xl rounded-2xl overflow-hidden pointer-events-auto shadow-2xl border border-white/20"
        style={{
          position: 'absolute',
          background: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          left: win.maximized ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : `${win.x}px`),
          top: win.maximized ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : `${win.y}px`),
          width: win.maximized || (typeof window !== 'undefined' && window.innerWidth < 768) ? '100vw' : `${win.width}px`,
          height: win.maximized || (typeof window !== 'undefined' && window.innerWidth < 768) ? 'calc(100vh - 56px)' : `${win.height}px`,
        }}
        initial={{ scale: 0.8, opacity: 0, y: 50, filter: 'brightness(1) saturate(1)' }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: ['brightness(2) saturate(2)', 'brightness(1) saturate(1)'],
        }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4,
          filter: { duration: 0.3 }
        }}
        onClick={handleTitleBarClick}
        drag={!win.maximized && typeof window !== 'undefined' && window.innerWidth >= 768}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragConstraints={win.maximized || (typeof window !== 'undefined' && window.innerWidth < 768) ? false : {
          left: typeof window !== 'undefined' ? -win.x : 0,
          top: typeof window !== 'undefined' ? -win.y : 0,
          right: typeof window !== 'undefined' ? (window.innerWidth - win.width - win.x) : 0,
          bottom: typeof window !== 'undefined' ? (window.innerHeight - win.height - win.y - (window.innerWidth < 768 ? 56 : 64)) : 0,
        }}
      >
        {/* Title Bar - Wooden Texture Style */}
        <div
          className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#4a2c1a] border-b-2 border-onepiece-gold cursor-move select-none rounded-t-xl relative overflow-hidden"
          style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
          }}
          onPointerDown={(e) => {
            if (!win.maximized && typeof window !== 'undefined' && window.innerWidth >= 768) {
              e.stopPropagation();
              dragControls.start(e);
            }
          }}
        >
          <div className="flex items-center gap-2 md:gap-3 relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Window Menu"
              type="button"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <AnimatePresence>
              {showMenu && (
                <WindowMenu window={win} onClose={() => setShowMenu(false)} />
              )}
            </AnimatePresence>
            <span className="text-xs md:text-sm font-bold text-white drop-shadow-md truncate">{win.title}</span>
          </div>
          <div className="flex items-center gap-1 relative z-50">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-all relative z-50 cursor-pointer shadow-3d"
              aria-label="Minimize"
              type="button"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95, y: 1 }}
            >
              <Minus className="w-4 h-4 text-white pointer-events-none" />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                maximizeWindow(win.id);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 bg-white/20 hover:bg-white/40 rounded-lg transition-all relative z-50 cursor-pointer shadow-3d"
              aria-label={win.maximized ? 'Restore' : 'Maximize'}
              type="button"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95, y: 1 }}
            >
              {win.maximized ? (
                <Maximize2 className="w-4 h-4 text-white pointer-events-none" />
              ) : (
                <Square className="w-4 h-4 text-white pointer-events-none" />
              )}
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeWindow(win.id);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 bg-red-500/60 hover:bg-red-500/80 rounded-lg transition-all relative z-50 cursor-pointer shadow-3d"
              aria-label="Close"
              type="button"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95, y: 1 }}
            >
              <X className="w-4 h-4 text-white pointer-events-none" />
            </motion.button>
          </div>
        </div>

        {/* Window Content - Glassmorphic */}
        <div
          className="overflow-auto p-4 md:p-6 lg:p-8 bg-white/5 text-white"
          style={{
            height: win.maximized ? 'calc(100vh - 64px)' : (typeof window !== 'undefined' && window.innerWidth < 768 ? 'calc(100vh - 56px)' : `${win.height - 64}px`),
          }}
        >
          {children}
        </div>

        {/* Resize Handle */}
        {!win.maximized && (
          <div
            ref={resizeHandleRef}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={handleResizeStart}
            style={{
              background: 'linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255, 107, 53, 0.4) 50%, rgba(255, 217, 61, 0.4) 100%)',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

