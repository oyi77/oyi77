import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowStore, Window as WindowType } from '@/lib/store/windowStore';
import WindowMenu from './WindowMenu';
import { cn } from '@/lib/utils/cn';

interface WindowProps {
  window: WindowType;
  children: React.ReactNode;
}

const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;
const MIN_WIDTH_MOBILE = 320;
const MIN_HEIGHT_MOBILE = 400;

const Window = forwardRef<HTMLDivElement, WindowProps>(({ window: win, children }, ref) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize } = useWindowStore();
  const [showMenu, setShowMenu] = useState(false);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Bring to front on click
  const handleFocus = () => {
    focusWindow(win.id);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newX = win.x + info.offset.x;
    const newY = win.y + info.offset.y;
    updatePosition(win.id, newX, newY);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFocus();

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
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (win.minimized) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        zIndex: win.zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
        width: win.maximized ? '100vw' : win.width,
        height: win.maximized ? '100vh' : win.height,
        x: win.maximized ? 0 : win.x,
        y: win.maximized ? 0 : win.y,
      }}
      className="pointer-events-auto flex flex-col"
      onClick={handleFocus}
      drag={!win.maximized}
      dragControls={dragControls}
      dragListener={false} // Only drag from header
      dragMomentum={true} // Physics!
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {/* Window Container */}
      <div className={cn(
        "flex flex-col w-full h-full overflow-hidden",
        "bg-retro-white border-2 border-retro-gray shadow-brutal",
        win.maximized ? "rounded-none" : "rounded-lg"
      )}>

        {/* Retro Header */}
        <div
          className="flex items-center justify-between px-3 py-2 bg-retro-white border-b-2 border-retro-gray select-none"
          onPointerDown={(e) => {
            dragControls.start(e);
          }}
        >
          <div className="flex items-center gap-3">
            {/* Window Icon/Menu */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-black/5 rounded border border-transparent hover:border-retro-gray/20 transition-all active:scale-95"
            >
              <div className="w-3 h-3 rounded-full bg-retro-red border border-retro-gray" />
            </button>
            <span className="font-bold font-mono text-sm text-retro-gray tracking-tight uppercase">
              {win.title}
            </span>
          </div>

          {/* Window Controls - Mac style but brutalist */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
              className="p-1 hover:bg-retro-gray/10 rounded active:translate-y-0.5 transition-transform"
            >
              <Minus className="w-4 h-4 text-retro-gray" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
              className="p-1 hover:bg-retro-gray/10 rounded active:translate-y-0.5 transition-transform"
            >
              {win.maximized ? <Maximize2 className="w-4 h-4 text-retro-gray" /> : <Square className="w-4 h-4 text-retro-gray" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
              className="p-1 hover:bg-retro-red/10 rounded active:translate-y-0.5 transition-transform group"
            >
              <X className="w-4 h-4 text-retro-gray group-hover:text-retro-red" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-retro-white relative">
          {children}
        </div>

        {/* Resize Handle */}
        {!win.maximized && (
          <div
            className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize flex items-end justify-end p-1"
            onMouseDown={handleResizeStart}
          >
            {/* Grip Texture */}
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] border-b-retro-gray/30" />
          </div>
        )}
      </div>
    </motion.div>
  );
});

Window.displayName = 'Window';

export default Window;

