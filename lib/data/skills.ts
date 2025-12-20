export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-100
}

export const skillsData: Skill[] = [
  // Leadership & Management
  { name: 'Technical Strategy', category: 'Leadership', proficiency: 90 },
  { name: 'Team Mentorship', category: 'Leadership', proficiency: 95 },
  { name: 'Agile/Scrum', category: 'Leadership', proficiency: 90 },
  { name: 'Stakeholder Management', category: 'Leadership', proficiency: 85 },
  { name: 'Resource Planning', category: 'Leadership', proficiency: 85 },

  // Architecture
  { name: 'System Design', category: 'Architecture', proficiency: 90 },
  { name: 'Microservices', category: 'Architecture', proficiency: 85 },
  { name: 'Cloud Native', category: 'Architecture', proficiency: 80 },
  { name: 'Event-Driven Arch', category: 'Architecture', proficiency: 85 },

  // Programming Languages
  { name: 'Python', category: 'Programming Languages', proficiency: 90 },
  { name: 'JavaScript/TypeScript', category: 'Programming Languages', proficiency: 90 },
  { name: 'Solidity', category: 'Programming Languages', proficiency: 85 },
  { name: 'Go', category: 'Programming Languages', proficiency: 75 },

  // Frontend
  { name: 'React/Next.js', category: 'Frontend', proficiency: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
  { name: 'Web Performance', category: 'Frontend', proficiency: 85 },

  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 90 },
  { name: 'Django', category: 'Backend', proficiency: 85 },

  // Database & Infrastructure
  { name: 'PostgreSQL', category: 'Database', proficiency: 85 },
  { name: 'Redis', category: 'Database', proficiency: 85 },
  { name: 'Docker/K8s', category: 'DevOps', proficiency: 80 },
  { name: 'AWS', category: 'DevOps', proficiency: 80 },
];
