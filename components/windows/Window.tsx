'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useDragControls, PanInfo, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowStore, Window as WindowType } from '@/lib/store/windowStore';
import WindowMenu from './WindowMenu';

interface WindowProps {
  window: WindowType;
  children: React.ReactNode;
}

const SNAP_THRESHOLD = 50;
const MIN_WIDTH = typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 400;
const MIN_HEIGHT = typeof window !== 'undefined' && window.innerWidth < 768 ? 400 : 300;

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = win.zIndex.toString();
    }
  }, [win.zIndex]);

  const handleDragStart = () => {
    setIsDragging(true);
    focusWindow(win.id);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (win.maximized) return;
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return; // Disable dragging on mobile
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    const newX = Math.max(0, Math.min(win.x + info.delta.x, viewportWidth - win.width));
    const newY = Math.max(0, Math.min(win.y + info.delta.y, viewportHeight - win.height));
    
    updatePosition(win.id, newX, newY);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (win.maximized) return;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    const newX = win.x + info.offset.x;
    const newY = win.y + info.offset.y;
    
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
    // Snap to bottom edge
    else if (newY + win.height > viewportHeight - SNAP_THRESHOLD) {
      snappedY = viewportHeight - win.height;
    }

    // Constrain within viewport
    snappedX = Math.max(0, Math.min(snappedX, viewportWidth - win.width));
    snappedY = Math.max(0, Math.min(snappedY, viewportHeight - win.height));

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

      const newWidth = Math.max(MIN_WIDTH, startWidth + deltaX);
      const newHeight = Math.max(MIN_HEIGHT, startHeight + deltaY);

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
        className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden pointer-events-auto cartoon-shadow border-4 border-onepiece-red"
        style={{
          position: 'absolute',
          left: win.maximized ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : `${win.x}px`),
          top: win.maximized ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : `${win.y}px`),
          width: win.maximized || (typeof window !== 'undefined' && window.innerWidth < 768) ? '100vw' : `${win.width}px`,
          height: win.maximized || (typeof window !== 'undefined' && window.innerWidth < 768) ? 'calc(100vh - 64px)' : `${win.height}px`,
        }}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
        }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4 
        }}
        onClick={handleTitleBarClick}
      >
        {/* Title Bar */}
        <motion.div
          className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-onepiece-red to-onepiece-gold border-b-4 border-onepiece-blue cursor-move select-none rounded-t-xl"
          drag={!win.maximized && typeof window !== 'undefined' && window.innerWidth >= 768}
          dragControls={dragControls}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragConstraints={win.maximized || (typeof window !== 'undefined' && window.innerWidth < 768) ? false : {
            left: 0,
            top: 0,
            right: typeof window !== 'undefined' ? window.innerWidth - win.width : 0,
            bottom: typeof window !== 'undefined' ? window.innerHeight - win.height : 0,
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
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 hover:bg-white/30 rounded-lg transition-all relative z-50 cursor-pointer"
              aria-label="Minimize"
              type="button"
            >
              <Minus className="w-4 h-4 text-white pointer-events-none" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                maximizeWindow(win.id);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 hover:bg-white/30 rounded-lg transition-all relative z-50 cursor-pointer"
              aria-label={win.maximized ? 'Restore' : 'Maximize'}
              type="button"
            >
              {win.maximized ? (
                <Maximize2 className="w-4 h-4 text-white pointer-events-none" />
              ) : (
                <Square className="w-4 h-4 text-white pointer-events-none" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeWindow(win.id);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 hover:bg-red-500/80 rounded-lg transition-all relative z-50 cursor-pointer"
              aria-label="Close"
              type="button"
            >
              <X className="w-4 h-4 text-white pointer-events-none" />
            </button>
          </div>
        </motion.div>

        {/* Window Content */}
        <div
          className="bg-white/90 overflow-auto p-4 md:p-6 lg:p-8"
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

