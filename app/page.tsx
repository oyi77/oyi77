'use client';

import { useEffect, useState } from 'react';
import DesktopGrid from '@/components/desktop/DesktopGrid';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import { User, Briefcase, Terminal, BarChart3, FileText, FolderGit2 } from 'lucide-react';
import { useWindowStore } from '@/lib/store/windowStore';
import Window from '@/components/windows/Window';
import ProfileWindow from '@/components/windows/ProfileWindow';
import ExperienceWindow from '@/components/windows/ExperienceWindow';
import ProjectsTerminal from '@/components/windows/ProjectsTerminal';
import StatsWindow from '@/components/windows/StatsWindow';
import Taskbar from '@/components/taskbar/Taskbar';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { windows } = useWindowStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const iconPositions = [
    { type: 'profile' as const, label: 'Profile.app', icon: <User className="w-12 h-12" />, x: 50, y: 50 },
    { type: 'experience' as const, label: 'Experience.exe', icon: <Briefcase className="w-12 h-12" />, x: 50, y: 150 },
    { type: 'projects' as const, label: 'Projects.terminal', icon: <Terminal className="w-12 h-12" />, x: 50, y: 250 },
    { type: 'stats' as const, label: 'Stats.dashboard', icon: <BarChart3 className="w-12 h-12" />, x: 50, y: 350 },
    { type: 'cv' as const, label: 'CV.pdf', icon: <FileText className="w-12 h-12" />, x: 50, y: 450 },
    { type: 'github' as const, label: 'GitHub', icon: <FolderGit2 className="w-12 h-12" />, x: 50, y: 550 },
  ];

  const renderWindowContent = (window: typeof windows[0]) => {
    switch (window.type) {
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

  if (!mounted) {
    return (
      <DesktopGrid>
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
        {/* Taskbar */}
        <Taskbar />
      </DesktopGrid>
    );
  }

  return (
    <DesktopGrid>
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
  );
}

