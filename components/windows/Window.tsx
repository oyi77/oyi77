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
        className="glass rounded-lg overflow-hidden pointer-events-auto shadow-2xl"
        style={{
          ...windowStyle,
          position: 'absolute',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleTitleBarClick}
      >
        {/* Title Bar */}
        <motion.div
          className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-cyan-500/20 cursor-move select-none"
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
            <span className="text-sm font-medium text-text-light">{win.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
              aria-label="Minimize"
            >
              <Minus className="w-4 h-4 text-text-light" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(win.id);
              }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
              aria-label={win.maximized ? 'Restore' : 'Maximize'}
            >
              {win.maximized ? (
                <Maximize2 className="w-4 h-4 text-text-light" />
              ) : (
                <Square className="w-4 h-4 text-text-light" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
              className="p-1 hover:bg-red-500/50 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-text-light" />
            </button>
          </div>
        </motion.div>

        {/* Window Content */}
        <div
          className="bg-slate-900/40 overflow-auto"
          style={{
            height: win.maximized ? 'calc(100vh - 40px)' : `${win.height - 40}px`,
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
              background: 'linear-gradient(135deg, transparent 0%, transparent 50%, rgba(0, 240, 255, 0.3) 50%, rgba(0, 240, 255, 0.3) 100%)',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

