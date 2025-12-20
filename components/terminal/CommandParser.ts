import { projectsData } from '@/lib/data/projects';
import { skillsData } from '@/lib/data/skills';
import { profileData } from '@/lib/data/profile';

export function parseCommand(command: string): string[] {
  const [cmd, ...args] = command.trim().split(/\s+/);
  const lowerCmd = cmd.toLowerCase();

  switch (lowerCmd) {
    case 'whoami':
      return [
        `Name: ${profileData.name}`,
        `Title: ${profileData.title}`,
        `Experience: ${profileData.experience}`,
        `Location: ${profileData.location}`,
        `Email: ${profileData.email}`,
        '',
        profileData.summary,
      ];

    case 'ls':
      if (args[0] === 'projects') {
        return [
          'Projects:',
          ...projectsData.map(
            (p) => `  ${p.name.padEnd(20)} - ${p.description} [${p.technologies.join(', ')}]`
          ),
        ];
      } else if (args[0] === 'skills') {
        const categories = Array.from(new Set(skillsData.map((s) => s.category)));
        return [
          'Skills by Category:',
          ...categories.map((cat) => {
            const skills = skillsData.filter((s) => s.category === cat);
            return `  ${cat}: ${skills.map((s) => s.name).join(', ')}`;
          }),
        ];
      } else {
        return ['Available: projects, skills', 'Usage: ls [projects|skills]'];
      }

    case 'cat':
      if (args[0] === 'cv') {
        return [
          'CV: muchammadfikriizzuddin_cv.pdf',
          'Download: Click the CV.pdf icon on desktop or visit:',
          `/muchammadfikriizzuddin_cv.pdf`,
        ];
      } else {
        return ['Usage: cat cv'];
      }

    case 'help':
      return [
        'Available Commands:',
        '  whoami          - Display profile information',
        '  ls projects     - List all projects',
        '  ls skills       - List technical skills',
        '  cat cv          - Display CV information',
        '  clear           - Clear terminal history',
        '  help            - Show this help message',
      ];

    case 'clear':
      return [];

    default:
      return [`Command not found: ${cmd}. Type "help" for available commands.`];
  }
}

