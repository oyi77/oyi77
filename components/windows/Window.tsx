'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowStore, Window as WindowType } from '@/lib/store/windowStore';

interface WindowProps {
  window: WindowType;
  children: React.ReactNode;
}

const SNAP_THRESHOLD = 50;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
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
        className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden pointer-events-auto cartoon-shadow border-4 border-cartoon-orange"
        style={{
          ...windowStyle,
          position: 'absolute',
        }}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
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
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cartoon-orange to-cartoon-yellow border-b-4 border-cartoon-purple cursor-move select-none rounded-t-xl"
          onPointerDown={(e) => {
            if (!win.maximized) {
              dragControls.start(e);
            }
          }}
          drag={!win.maximized}
          dragControls={dragControls}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragConstraints={win.maximized ? false : {
            left: 0,
            top: 0,
            right: typeof window !== 'undefined' ? window.innerWidth - win.width : 0,
            bottom: typeof window !== 'undefined' ? window.innerHeight - win.height : 0,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white drop-shadow-md">{win.title}</span>
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
          className="bg-white/90 overflow-auto"
          style={{
            height: win.maximized ? 'calc(100vh - 56px)' : `${win.height - 56}px`,
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

