import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type WindowType = 'welcome' | 'profile' | 'bounty' | 'logpose' | 'tactical' | 'crew' | 'terminal' | 'fileManager' | 'browser';

export interface Window {
  id: string;
  type: WindowType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

interface WindowState {
  windows: Window[];
  maxZIndex: number;
  openWindow: (type: WindowType) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, x: number, y: number) => void;
  updateSize: (id: string, width: number, height: number) => void;
  isWindowOpen: (type: WindowType) => boolean;
  getWindowByType: (type: WindowType) => Window | undefined;
}

const getWindowTitle = (type: WindowType): string => {
  const titles: Record<WindowType, string> = {
    welcome: 'Grand Line Welcome',
    profile: 'Captain\'s Log',
    bounty: 'Bounty Posters (Experience)',
    logpose: 'Log Pose (Projects)',
    tactical: 'Tactical Map (Architecture)',
    crew: 'Crew Management (Mentorship)',
    terminal: 'Captain\'s Terminal',
    fileManager: 'File System',
    browser: 'Grand Line Net',
  };
  return titles[type];
};

const getDefaultSize = (type: WindowType): { width: number; height: number } => {
  // Default desktop sizes - will be adjusted on client side if needed
  const sizes: Record<WindowType, { width: number; height: number }> = {
    welcome: { width: 700, height: 600 },
    profile: { width: 600, height: 500 },
    bounty: { width: 800, height: 600 },
    logpose: { width: 700, height: 500 },
    tactical: { width: 600, height: 500 },
    crew: { width: 600, height: 500 },
    terminal: { width: 600, height: 400 },
    fileManager: { width: 700, height: 500 },
    browser: { width: 900, height: 600 },
  };
  return sizes[type];
};

const adjustSizeForViewport = (size: { width: number; height: number }, type: WindowType): { width: number; height: number } => {
  if (typeof window === 'undefined' || !size) return size || { width: 800, height: 600 };

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  if (isMobile) {
    return {
      width: window.innerWidth,
      height: window.innerHeight - 64,
    };
  }

  if (isTablet) {
    const tabletSizes: Record<WindowType, { width: number; height: number }> = {
      welcome: { width: 600, height: 500 },
      profile: { width: 550, height: 450 },
      bounty: { width: 700, height: 550 },
      logpose: { width: 600, height: 450 },
      tactical: { width: 550, height: 450 },
      crew: { width: 550, height: 450 },
      terminal: { width: 550, height: 400 },
      fileManager: { width: 600, height: 450 },
      browser: { width: 700, height: 500 },
    };
    return tabletSizes[type];
  }

  return size;
};

export const useWindowStore = create<WindowState>()(
  persist(
    (set, get) => ({
      windows: [],
      maxZIndex: 1000,

      openWindow: (type: WindowType) => {
        set((state) => {
          const existingWindow = state.windows.find((w) => w.type === type);

          if (existingWindow) {
            // If window exists, restore and focus it
            return {
              windows: state.windows.map((w) =>
                w.id === existingWindow.id
                  ? { ...w, minimized: false, zIndex: state.maxZIndex + 1 }
                  : w
              ),
              maxZIndex: state.maxZIndex + 1,
            };
          }

          // Create new window with cascade effect
          const windowCount = state.windows.length;
          const offset = 30;
          const baseSize = getDefaultSize(type);
          const { width, height } = adjustSizeForViewport(baseSize, type);

          // Center welcome window on first load
          let x = 100 + windowCount * offset;
          let y = 100 + windowCount * offset;

          if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth < 768;

            if (type === 'welcome' && windowCount === 0) {
              // Center the welcome window
              x = (window.innerWidth - width) / 2;
              y = (window.innerHeight - height) / 2;
            }

            // Mobile: Always center windows
            if (isMobile) {
              x = 0;
              y = 0;
            }
          }

          const newWindow: Window = {
            id: `${type}-${Date.now()}`,
            type,
            title: getWindowTitle(type),
            x,
            y,
            width,
            height,
            zIndex: state.maxZIndex + 1,
            minimized: false,
            maximized: false,
          };

          return {
            windows: [...state.windows, newWindow],
            maxZIndex: state.maxZIndex + 1,
          };
        });
      },

      closeWindow: (id: string) => {
        set((state) => ({
          windows: state.windows.filter((w) => w.id !== id),
        }));
      },

      minimizeWindow: (id: string) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, minimized: true } : w
          ),
        }));
      },

      maximizeWindow: (id: string) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, maximized: !w.maximized } : w
          ),
        }));
      },

      restoreWindow: (id: string) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id
              ? { ...w, minimized: false, zIndex: state.maxZIndex + 1 }
              : w
          ),
          maxZIndex: state.maxZIndex + 1,
        }));
      },

      focusWindow: (id: string) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, zIndex: state.maxZIndex + 1 } : w
          ),
          maxZIndex: state.maxZIndex + 1,
        }));
      },

      updatePosition: (id: string, x: number, y: number) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, x, y } : w
          ),
        }));
      },

      updateSize: (id: string, width: number, height: number) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, width, height } : w
          ),
        }));
      },

      isWindowOpen: (type: WindowType) => {
        return get().windows.some((w) => w.type === type && !w.minimized);
      },

      getWindowByType: (type: WindowType) => {
        return get().windows.find((w) => w.type === type);
      },
    }),
    {
      name: 'window-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Fallback for SSR - return a no-op storage
        return {
          getItem: () => null,
          setItem: () => { },
          removeItem: () => { },
        } as any;
      }),
      partialize: (state) => ({ windows: state.windows }),
    }
  )
);

