'use client';

import { motion } from 'framer-motion';
import DesktopGrid from '@/components/desktop/DesktopGrid';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import IsometricBlock from '@/components/cartoon/IsometricBlock';
import { User, Briefcase, Terminal, BarChart3, FileText, FolderGit2 } from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import Window from '@/components/windows/Window';
import WelcomeWindow from '@/components/windows/WelcomeWindow';
import ProfileWindow from '@/components/windows/ProfileWindow';
import ExperienceWindow from '@/components/windows/ExperienceWindow';
import ProjectsTerminal from '@/components/windows/ProjectsTerminal';
import StatsWindow from '@/components/windows/StatsWindow';
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

  // Responsive icon positions
  const getIconPositions = () => {
    if (typeof window === 'undefined') {
      // SSR fallback
      return [
        { type: 'profile' as const, label: 'Profile.app', icon: <User className="w-12 h-12" />, x: 50, y: 50 },
        { type: 'experience' as const, label: 'Experience.exe', icon: <Briefcase className="w-12 h-12" />, x: 50, y: 150 },
        { type: 'projects' as const, label: 'Projects.terminal', icon: <Terminal className="w-12 h-12" />, x: 50, y: 250 },
        { type: 'stats' as const, label: 'Stats.dashboard', icon: <BarChart3 className="w-12 h-12" />, x: 50, y: 350 },
        { type: 'cv' as const, label: 'CV.pdf', icon: <FileText className="w-12 h-12" />, x: 50, y: 450 },
        { type: 'github' as const, label: 'GitHub', icon: <FolderGit2 className="w-12 h-12" />, x: 50, y: 550 },
      ];
    }

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (isMobile) {
      // Mobile: Grid layout (2 columns)
      return [
        { type: 'profile' as const, label: 'Profile.app', icon: <User className="w-10 h-10" />, x: 20, y: 20 },
        { type: 'experience' as const, label: 'Experience.exe', icon: <Briefcase className="w-10 h-10" />, x: window.innerWidth / 2 + 10, y: 20 },
        { type: 'projects' as const, label: 'Projects.terminal', icon: <Terminal className="w-10 h-10" />, x: 20, y: 140 },
        { type: 'stats' as const, label: 'Stats.dashboard', icon: <BarChart3 className="w-10 h-10" />, x: window.innerWidth / 2 + 10, y: 140 },
        { type: 'cv' as const, label: 'CV.pdf', icon: <FileText className="w-10 h-10" />, x: 20, y: 260 },
        { type: 'github' as const, label: 'GitHub', icon: <FolderGit2 className="w-10 h-10" />, x: window.innerWidth / 2 + 10, y: 260 },
      ];
    }

    if (isTablet) {
      // Tablet: Vertical list with more spacing
      return [
        { type: 'profile' as const, label: 'Profile.app', icon: <User className="w-12 h-12" />, x: 40, y: 40 },
        { type: 'experience' as const, label: 'Experience.exe', icon: <Briefcase className="w-12 h-12" />, x: 40, y: 160 },
        { type: 'projects' as const, label: 'Projects.terminal', icon: <Terminal className="w-12 h-12" />, x: 40, y: 280 },
        { type: 'stats' as const, label: 'Stats.dashboard', icon: <BarChart3 className="w-12 h-12" />, x: 40, y: 400 },
        { type: 'cv' as const, label: 'CV.pdf', icon: <FileText className="w-12 h-12" />, x: 40, y: 520 },
        { type: 'github' as const, label: 'GitHub', icon: <FolderGit2 className="w-12 h-12" />, x: 40, y: 640 },
      ];
    }

    // Desktop: Original positions
    return [
      { type: 'profile' as const, label: 'Profile.app', icon: <User className="w-12 h-12" />, x: 50, y: 50 },
      { type: 'experience' as const, label: 'Experience.exe', icon: <Briefcase className="w-12 h-12" />, x: 50, y: 150 },
      { type: 'projects' as const, label: 'Projects.terminal', icon: <Terminal className="w-12 h-12" />, x: 50, y: 250 },
      { type: 'stats' as const, label: 'Stats.dashboard', icon: <BarChart3 className="w-12 h-12" />, x: 50, y: 350 },
      { type: 'cv' as const, label: 'CV.pdf', icon: <FileText className="w-12 h-12" />, x: 50, y: 450 },
      { type: 'github' as const, label: 'GitHub', icon: <FolderGit2 className="w-12 h-12" />, x: 50, y: 550 },
    ];
  };

  const [iconPositions, setIconPositions] = useState(getIconPositions());

  useEffect(() => {
    const handleResize = () => {
      setIconPositions(getIconPositions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderWindowContent = (window: typeof windows[0]) => {
    switch (window.type) {
      case 'welcome':
        return <WelcomeWindow />;
      case 'profile':
        return <ProfileWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'projects':
        return <ProjectsTerminal />;
      case 'stats':
        return <StatsWindow />;
      default:
        return null;
    }
  };

  return (
    <ClientOnly>
      <DesktopGrid>
        {/* Isometric blocks spelling "OYI77" - Hidden on mobile */}
        <div className="hidden md:flex absolute top-20 left-1/2 transform -translate-x-1/2 gap-2 z-0">
          {['O', 'Y', 'I', '7', '7'].map((letter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
            >
              <IsometricBlock
                letter={letter}
                color={['#C8102E', '#FFD700', '#1E3A8A', '#4ECDC4', '#C8102E'][i]}
                size={50}
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop Icons */}
        {iconPositions.map((icon) => (
          <DesktopIcon
            key={icon.type}
            type={icon.type}
            label={icon.label}
            icon={icon.icon}
            x={icon.x}
            y={icon.y}
          />
        ))}

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

