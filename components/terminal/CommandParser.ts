import { projectsData } from '@/lib/data/projects';
import { skillsData } from '@/lib/data/skills';
import { profileData } from '@/lib/data/profile';

export function parseCommand(command: string): string[] {
  const [cmd, ...args] = command.trim().split(/\s+/);
  const lowerCmd = cmd.toLowerCase();

  switch (lowerCmd) {
    case 'whoami':
    case 'identity':
      return [
        `🏴‍☠️ Identity: ${profileData.name}`,
        `Rank: ${profileData.title}`,
        `Sea Experience: ${profileData.experience}`,
        `Current Port: ${profileData.location}`,
        `Signal (Email): ${profileData.email}`,
        '',
        `" ${profileData.summary} "`,
      ];

    case 'ls':
    case 'voyages':
    case 'routes':
      if (args[0] === 'projects' || args[0] === 'log') {
        return [
          '⚓ Logged Voyages (Projects):',
          ...projectsData.map(
            (p) => `  ${p.name.padEnd(20)} - ${p.description} [${p.technologies.join(', ')}]`
          ),
        ];
      } else if (args[0] === 'skills' || args[0] === 'arsenal') {
        const categories = Array.from(new Set(skillsData.map((s) => s.category)));
        return [
          '⚔️ Combat Arsenal (Technical Skills):',
          ...categories.map((cat) => {
            const skills = skillsData.filter((s) => s.category === cat);
            return `  ${cat}: ${skills.map((s) => s.name).join(', ')}`;
          }),
        ];
      } else {
        return [
          'Available: projects (log), skills (arsenal)',
          'Usage: ls [projects|skills]',
          'Pirate Aliases: voyages, routes',
        ];
      }

    case 'treasure':
    case 'bounty':
      return [
        '💰 Total Bounty: ฿ 8,464,000,000',
        'Top Rewards:',
        '  - snap-perpetual-trading: High Impact Platform',
        '  - solxdap: Full-stack Excellence',
      ];

    case 'nakama':
    case 'crew':
      return [
        '🤝 The Crew (Mentorship & Collaboration):',
        '  - Frontend Fleet: Lead Strategist',
        '  - Algorithmic Aces: Tactical Advisor',
        '  - Junior Nakama: Mentor & Architect',
        '',
        'Use "Crew Management" window for more details.',
      ];

    case 'cat':
      if (args[0] === 'cv' || args[0] === 'paper') {
        return [
          '📜 Log Excerpt (CV): muchammadfikriizzuddin_cv.pdf',
          'Search for the CV.pdf icon on your map or visit:',
          `/muchammadfikriizzuddin_cv.pdf`,
        ];
      } else {
        return ['Usage: cat cv'];
      }

    case 'help':
      return [
        '🏴‍☠️ Captain\'s Manual (Available Commands):',
        '  voyages/ls projects  - List all logged voyages',
        '  arsenal/ls skills     - List combat arsenal',
        '  identity/whoami       - Reveal identity',
        '  treasure/bounty       - View achieved rewards',
        '  nakama/crew           - Show loyal companions',
        '  cat cv               - Display sea log access',
        '  clear                - Scrub the deck (clear)',
        '  help                 - Show this manual',
      ];

    case 'clear':
      return [];

    default:
      return [`Command not found: ${cmd}. Type "help" for available commands.`];
  }
}

