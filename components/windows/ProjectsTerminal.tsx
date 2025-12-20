'use client';

import Terminal from '@/components/terminal/Terminal';
import { parseCommand } from '@/components/terminal/CommandParser';

export default function ProjectsTerminal() {
  const handleCommand = (command: string): string[] => {
    if (command.toLowerCase() === 'clear') {
      return [];
    }
    return parseCommand(command);
  };

  return (
    <div className="h-full">
      <Terminal onCommand={handleCommand} prompt="oyi77@portfolio" />
    </div>
  );
}

