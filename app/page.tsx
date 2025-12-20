'use client';

import { motion } from 'framer-motion';
import DesktopGrid from '@/components/desktop/DesktopGrid';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import IsometricBlock from '@/components/cartoon/IsometricBlock';
import { User, Scroll, Compass, Map, Users, FileText, FolderGit2 } from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import Window from '@/components/windows/Window';
import WelcomeWindow from '@/components/windows/WelcomeWindow';
import ProfileWindow from '@/components/windows/ProfileWindow';
import ExperienceWindow from '@/components/windows/ExperienceWindow';
import ProjectsTerminal from '@/components/windows/ProjectsTerminal';
import StatsWindow from '@/components/windows/StatsWindow';
import CrewWindow from '@/components/windows/CrewWindow';
import Taskbar from '@/components/taskbar/Taskbar';
import ClientOnly from '@/components/ClientOnly';
import { useEffect, useState } from 'react';

export default function Home() {
  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const hasWelcomeWindow = windows.some((w) => w.type === 'welcome');

  // Open welcome window on first load
  useEffect(() => {
    if (!hasWelcomeWindow) {
      // Small delay for smooth animation
      setTimeout(() => {
        openWindow('welcome');
      }, 300);
    }
  }, [hasWelcomeWindow, openWindow]);

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
    </ClientOnly>
  );
}

