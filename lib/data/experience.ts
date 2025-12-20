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
      'Developed onchain trading strategies and smart contract integrations',
      'Built automated trading systems for blockchain networks',
      'Optimized trading algorithms for improved performance',
    ],
    techStack: ['Solidity', 'Web3', 'JavaScript', 'Python', 'Blockchain'],
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
      'Designed and implemented secure custodian systems',
      'Built robust backend infrastructure for financial services',
      'Ensured compliance with security standards',
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
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
      'Led development of multilingual web applications',
      'Implemented complex translation workflows',
      'Optimized application performance and scalability',
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Next.js'],
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
      'Led technical team in developing payment solutions',
      'Architected scalable payment processing systems',
      'Mentored junior developers and established best practices',
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
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
      'Developed enterprise software solutions',
      'Improved system performance and reliability',
      'Collaborated on complex technical projects',
    ],
    techStack: ['Java', 'Spring Boot', 'MySQL', 'React', 'JavaScript'],
  },
  {
    id: 'lmesh',
    company: 'LMESH',
    position: 'Software Engineer',
    startDate: '2021',
    endDate: '2022',
    current: false,
    achievements: [
      'Developed web applications and APIs',
      'Maintained legacy systems',
    ],
    techStack: ['PHP', 'JavaScript', 'MySQL', 'Laravel'],
  },
  {
    id: 'forvia',
    company: 'Forvia',
    position: 'Software Developer',
    startDate: '2020',
    endDate: '2021',
    current: false,
    achievements: [
      'Built internal tools and applications',
      'Participated in agile development processes',
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
      'Developed business applications',
      'Maintained database systems',
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
      'Learned and applied software development best practices',
      'Contributed to team projects',
    ],
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
  },
];

