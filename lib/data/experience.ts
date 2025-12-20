export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location?: string;
  achievements: string[];
  techStack: string[];
}

export const experienceData: Experience[] = [
  {
    id: 'bitwyre-1',
    company: 'Bitwyre',
    position: 'Onchain Trader & Blockchain Developer',
    startDate: 'Dec 2024',
    endDate: 'Present',
    current: true,
    location: 'Indonesia',
    achievements: [
      'Architected and executed high-frequency onchain trading strategies, managing significant portfolio value.',
      'Developed automated trading systems for multiple EVM-compatible networks, ensuring sub-second execution.',
      'Conducted deep technical analysis and risk planning for DeFi protocol integrations.',
    ],
    techStack: ['Solidity', 'Web3', 'Node.js', 'DeFi Protocols', 'Smart Contracts'],
  },
  {
    id: 'bitwyre-2',
    company: 'Bitwyre',
    position: 'Custodian/Backend Engineer',
    startDate: 'Jul 2024',
    endDate: 'Dec 2024',
    current: false,
    location: 'Indonesia',
    achievements: [
      'Engineered a secure, custodial wallet infrastructure supporting multi-sig authorization flows.',
      'Led the backend migration to a microservices architecture, improving system maintainability by 40%.',
      'Implemented rigorous security protocols and compliance audits for financial data protection.',
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS KMS'],
  },
  {
    id: 'linguise',
    company: 'Linguise',
    position: 'Senior Full Stack Engineer',
    startDate: 'Nov 2023',
    endDate: 'Jul 2024',
    current: false,
    location: 'Remote',
    achievements: [
      'Spearheaded the development of a core SaaS translation platform serving thousands of daily users.',
      'Optimized database query performance, reducing page load times by 60%.',
      'Collaborated with product teams to define technical roadmaps and feature prioritization.',
    ],
    techStack: ['React', 'Node.js', 'complete MERN Stack', 'Next.js'],
  },
  {
    id: 'viapulsa',
    company: 'Viapulsa',
    position: 'Technical Lead',
    startDate: 'Jan 2023',
    endDate: 'Jan 2024',
    current: false,
    location: 'Indonesia',
    achievements: [
      'Managed a cross-functional team of 8+ developers, fostering a culture of code quality and ownership.',
      'Architected a high-throughput payment processing gateway, handling millions of transactions monthly.',
      'Established CI/CD pipelines and automated testing frameworks, reducing deployment failures to near zero.',
      'Mentored junior engineers, resulting in 3 internal promotions to senior roles.',
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Team Leadership'],
  },
  {
    id: 'atech',
    company: 'Atech Solution',
    position: 'Senior Programmer',
    startDate: 'Sep 2022',
    endDate: 'Apr 2023',
    current: false,
    location: 'Indonesia',
    achievements: [
      'Led the modernization of legacy enterprise resource planning (ERP) systems.',
      'Designed RESTful APIs for third-party integrations, improving system interoperability.',
      'Conducted code reviews and technical planning sessions to align development with business goals.',
    ],
    techStack: ['Java', 'Spring Boot', 'MySQL', 'React', 'Agile'],
  },
  {
    id: 'lmesh',
    company: 'LMESH',
    position: 'Software Engineer',
    startDate: '2021',
    endDate: '2022',
    current: false,
    achievements: [
      'Developed and maintained scalable web applications for diverse client requirements.',
      'Implemented efficient database schemas for complex data relationships.',
    ],
    techStack: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
  },
  {
    id: 'forvia',
    company: 'Forvia',
    position: 'Software Developer',
    startDate: '2020',
    endDate: '2021',
    current: false,
    achievements: [
      'Built internal efficiency tools used by 50+ staff members.',
      'Participated in the full SDLC, from requirement gathering to deployment.',
    ],
    techStack: ['C#', '.NET', 'SQL Server', 'Angular'],
  },
  {
    id: 'solomon',
    company: 'PT. Solomon',
    position: 'Developer',
    startDate: '2019',
    endDate: '2020',
    current: false,
    achievements: [
      'Developed custom business logic modules for client-specific needs.',
      'Maintained 99% uptime for critical database systems.',
    ],
    techStack: ['PHP', 'MySQL', 'JavaScript', 'jQuery'],
  },
  {
    id: 'avee',
    company: 'PT. Avee',
    position: 'Junior Developer',
    startDate: '2018',
    endDate: '2019',
    current: false,
    achievements: [
      'Assisted senior developers in feature implementation and bug fixing.',
      'Gained foundational experience in agile development methodologies.',
    ],
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS'],
  },
];
