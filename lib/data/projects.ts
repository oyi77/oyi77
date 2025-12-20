export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

export const projectsData: Project[] = [
  {
    id: 'nuclear',
    name: 'Nuclear',
    description: 'Advanced web application built with modern JavaScript frameworks',
    technologies: ['JavaScript', 'React', 'Node.js'],
    category: 'Web Application',
  },
  {
    id: 'rbminer',
    name: 'RBMiner',
    description: 'Cross-platform mining tool with support for multiple scripting languages',
    technologies: ['Bash', 'PowerShell', 'Python'],
    category: 'System Tool',
  },
  {
    id: 'shopee-bot',
    name: 'Shopee Bot',
    description: 'Automated bot for e-commerce platform interactions using Telegram API',
    technologies: ['Python', 'Telegram API'],
    category: 'Automation',
  },
  {
    id: 'wifi-jammer',
    name: 'Wifi Jammer',
    description: 'Network analysis and testing tool',
    technologies: ['Python', 'Network Programming'],
    category: 'Network Tool',
  },
  {
    id: 'ai-job-apply',
    name: 'AI Auto Job Apply',
    description: 'Intelligent job application automation using AI',
    technologies: ['Python', 'AI/ML', 'Web Automation'],
    category: 'Automation',
  },
  {
    id: 'tiktok-bot',
    name: 'Tiktok Bot',
    description: 'Social media automation and analytics tool',
    technologies: ['Python', 'API Integration'],
    category: 'Social Media',
  },
];

