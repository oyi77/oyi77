export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  architecture?: string; // New field for Technical Lead showcase
  impact?: string; // New field
}

export const projectsData: Project[] = [
  {
    id: 'nuclear',
    name: 'Nuclear',
    description: 'High-performance web application framework built for scalability and developer experience.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Webpack'],
    category: 'Web Application',
    architecture: 'Component-based architecture with centralized state management and lazy-loading for optimal performance.',
    impact: 'Reduced development time for internal tools by 40%.',
  },
  {
    id: 'rbminer',
    name: 'RBMiner',
    description: 'Cross-platform crypto mining management tool supporting multiple algorithms and hardware',
    technologies: ['Bash', 'PowerShell', 'Python'],
    category: 'System Tool',
    architecture: 'Modular script architecture allowing easy plugin additions for new mining algorithms.',
    impact: 'Adopted by 500+ users for efficient mining farm management.',
  },
  {
    id: 'shopee-bot',
    name: 'Shopee Bot',
    description: 'Automated high-frequency trading bot for e-commerce flash sales.',
    technologies: ['Python', 'Telegram API', 'AsyncIO'],
    category: 'Automation',
    architecture: 'Event-driven architecture using Python AsyncIO to handle concurrent requests with millisecond latency.',
    impact: 'Achieved 95% success rate in high-traffic flash sale events.',
  },
  {
    id: 'wifi-jammer',
    name: 'Wifi Jammer',
    description: 'Network security testing tool for penetration testing and vulnerability assessment.',
    technologies: ['Python', 'Scapy', 'Network Programming'],
    category: 'Network Tool',
    architecture: 'Low-level packet injection architecture using Scapy for raw socket manipulation.',
    impact: 'Used for educational security workshops and network hardening.',
  },
  {
    id: 'ai-job-apply',
    name: 'AI Auto Job Apply',
    description: 'Intelligent agent that automates job applications using NLP to customize resumes.',
    technologies: ['Python', 'OpenAI API', 'Selenium'],
    category: 'Automation',
    architecture: 'Microservices architecture separating the scraping engine, NLP processor, and browser automation.',
    impact: 'Automated 1000+ applications with a 15% interview conversion rate.',
  },
];
