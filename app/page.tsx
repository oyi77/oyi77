'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect } from 'react';
import { User, Scroll, Compass, Map, Users, FolderGit2, Monitor, Cpu, HardDrive } from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import Window from '@/components/windows/Window';
import Taskbar from '@/components/taskbar/Taskbar';
import ClientOnly from '@/components/ClientOnly';
import BootScreen from '@/components/system/BootScreen';

// Lazy load components
const DesktopGrid = dynamic(() => import('@/components/desktop/DesktopGrid'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#f4e4bc]" />,
});

const DesktopIcon = dynamic(() => import('@/components/desktop/DesktopIcon'), { ssr: false });

const WelcomeWindow = dynamic(() => import('@/components/windows/WelcomeWindow'));
const ProfileWindow = dynamic(() => import('@/components/windows/ProfileWindow'));
const ExperienceWindow = dynamic(() => import('@/components/windows/ExperienceWindow'));
const ProjectsTerminal = dynamic(() => import('@/components/windows/ProjectsTerminal'));
const StatsWindow = dynamic(() => import('@/components/windows/StatsWindow'));
const CrewWindow = dynamic(() => import('@/components/windows/CrewWindow'));
const TerminalWindow = dynamic(() => import('@/components/windows/TerminalWindow'));
const FileManagerWindow = dynamic(() => import('@/components/windows/FileManagerWindow'));
const BrowserWindow = dynamic(() => import('@/components/windows/BrowserWindow'));

export default function Home() {
  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const [booted, setBooted] = useState(false);
  const hasInitialized = useRef(false);

  // Open welcome window on first load - only once AFTER boot
  useEffect(() => {
    if (booted && !hasInitialized.current) {
      hasInitialized.current = true;
      setTimeout(() => {
        const currentWindows = useWindowStore.getState().windows;
        if (!currentWindows.some((w) => w.type === 'welcome')) {
          openWindow('welcome');
        }
      }, 500);
    }
  }, [booted, openWindow]);

  const renderWindowContent = (window: typeof windows[0]) => {
    switch (window.type) {
      case 'welcome': return <WelcomeWindow />;
      case 'profile': return <ProfileWindow />;
      case 'bounty': return <ExperienceWindow />;
      case 'logpose': return <ProjectsTerminal />;
      case 'tactical': return <StatsWindow />;
      case 'crew': return <CrewWindow />;
      case 'terminal': return <TerminalWindow />;
      case 'fileManager': return <FileManagerWindow />;
      case 'browser': return <BrowserWindow />;
      default: return null;
    }
  };

  const icons = [
    { type: 'profile' as const, label: 'Profile.sys', icon: <User className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'bounty' as const, label: 'Experience.log', icon: <Scroll className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'logpose' as const, label: 'Projects.exe', icon: <Monitor className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'tactical' as const, label: 'System_Stats', icon: <Cpu className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'crew' as const, label: 'Team_Link', icon: <Users className="w-10 h-10 md:w-12 md:h-12" /> },
    { type: 'github' as const, label: 'Source_Code', icon: <FolderGit2 className="w-10 h-10 md:w-12 md:h-12" /> },
  ];

  return (
    <ClientOnly>
      <AnimatePresence mode="wait">
        {!booted && (
          <BootScreen onComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>

      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-full"
        >
          <DesktopGrid>
            {/* Desktop Icons */}
            <div className="absolute inset-0 pt-6 px-6 pointer-events-none">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-8 max-w-7xl mx-auto">
                {icons.map((icon) => (
                  <div key={icon.type} className="flex justify-center pointer-events-auto">
                    <DesktopIcon
                      type={icon.type}
                      label={icon.label}
                      icon={icon.icon}
                      x={0}
                      y={0}
                      isGridItem={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Windows */}
            <AnimatePresence mode="popLayout">
              {windows.map((window) => (
                <Window key={window.id} window={window}>
                  {renderWindowContent(window)}
                </Window>
              ))}
            </AnimatePresence>

            {/* Taskbar */}
            <Taskbar />
          </DesktopGrid>
        </motion.div>
      )}
    </ClientOnly>
  );
}

