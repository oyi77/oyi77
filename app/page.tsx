'use client';

import dynamic from 'next/dynamic';
import DesktopGrid from '@/components/desktop/DesktopGrid';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import { User, Scroll, Compass, Map, Users, FolderGit2 } from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import Window from '@/components/windows/Window';
import Taskbar from '@/components/taskbar/Taskbar';
import ClientOnly from '@/components/ClientOnly';
import LoadingOverlay from '@/components/LoadingOverlay';
import { useEffect, useRef, useState } from 'react';

// Lazy load window components
const WelcomeWindow = dynamic(() => import('@/components/windows/WelcomeWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const ProfileWindow = dynamic(() => import('@/components/windows/ProfileWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const ExperienceWindow = dynamic(() => import('@/components/windows/ExperienceWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const ProjectsTerminal = dynamic(() => import('@/components/windows/ProjectsTerminal'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const StatsWindow = dynamic(() => import('@/components/windows/StatsWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const CrewWindow = dynamic(() => import('@/components/windows/CrewWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const TerminalWindow = dynamic(() => import('@/components/windows/TerminalWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const FileManagerWindow = dynamic(() => import('@/components/windows/FileManagerWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

const BrowserWindow = dynamic(() => import('@/components/windows/BrowserWindow'), {
  loading: () => <div className="p-8 text-white">Loading...</div>,
});

export default function Home() {
  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const hasInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Open welcome window on first load - only once
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;

      // Use setTimeout to ensure we check the latest state
      const timer = setTimeout(() => {
        const currentWindows = useWindowStore.getState().windows;
        const hasWelcome = currentWindows.some((w) => w.type === 'welcome');

        if (!hasWelcome) {
          openWindow('welcome');
        }
      }, 300);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWindowContent = (window: typeof windows[0]) => {
    switch (window.type) {
      case 'welcome':
        return <WelcomeWindow />;
      case 'profile':
        return <ProfileWindow />;
      case 'bounty':
        return <ExperienceWindow />;
      case 'logpose':
        return <ProjectsTerminal />;
      case 'tactical':
        return <StatsWindow />;
      case 'crew':
        return <CrewWindow />;
      case 'terminal':
        return <TerminalWindow />;
      case 'fileManager':
        return <FileManagerWindow />;
      case 'browser':
        return <BrowserWindow />;
      default:
        return null;
    }
  };

  const icons = [
    { type: 'profile' as const, label: "Captain's Log", icon: <User className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'bounty' as const, label: 'Bounty Posters', icon: <Scroll className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'logpose' as const, label: 'Log Pose', icon: <Compass className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'tactical' as const, label: 'Tactical Map', icon: <Map className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'crew' as const, label: 'Crew Management', icon: <Users className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'github' as const, label: 'GitHub', icon: <FolderGit2 className="w-10 h-10 md:w-12 md:h-12" /> },
  ];

  return (
    <ClientOnly>
      <LoadingOverlay onComplete={handleLoadingComplete} />
      {!isLoading && (
        <DesktopGrid>
          {/* Responsive Desktop Icons Grid */}
          <div className="absolute inset-0 pt-6 px-6 pointer-events-none">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-8 max-w-7xl mx-auto">
              {icons.map((icon) => (
                <div key={icon.type} className="flex justify-center pointer-events-auto">
                  <DesktopIcon
                    type={icon.type}
                    label={icon.label}
                    icon={icon.icon}
                    x={0} // Using absolute=false in DesktopIcon or grid layout
                    y={0}
                    isGridItem={true}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Windows */}
          {windows.map((window) => (
            <Window key={window.id} window={window}>
              {renderWindowContent(window)}
            </Window>
          ))}

          {/* Taskbar */}
          <Taskbar />
        </DesktopGrid>
      )}
    </ClientOnly>
  );
}

