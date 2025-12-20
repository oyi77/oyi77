export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-100
}

export const skillsData: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'Programming Languages', proficiency: 90 },
  { name: 'JavaScript', category: 'Programming Languages', proficiency: 85 },
  { name: 'TypeScript', category: 'Programming Languages', proficiency: 80 },
  { name: 'Java', category: 'Programming Languages', proficiency: 75 },
  { name: 'C#', category: 'Programming Languages', proficiency: 70 },
  { name: 'Solidity', category: 'Programming Languages', proficiency: 75 },
  
  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 85 },
  { name: 'Next.js', category: 'Frontend', proficiency: 80 },
  { name: 'Angular', category: 'Frontend', proficiency: 70 },
  { name: 'HTML/CSS', category: 'Frontend', proficiency: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 85 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 85 },
  { name: 'Django', category: 'Backend', proficiency: 80 },
  { name: 'Spring Boot', category: 'Backend', proficiency: 75 },
  { name: 'Laravel', category: 'Backend', proficiency: 75 },
  { name: 'Express.js', category: 'Backend', proficiency: 85 },
  
  // Databases
  { name: 'PostgreSQL', category: 'Database', proficiency: 80 },
  { name: 'MySQL', category: 'Database', proficiency: 85 },
  { name: 'MongoDB', category: 'Database', proficiency: 75 },
  { name: 'Redis', category: 'Database', proficiency: 80 },
  
  // DevOps & Tools
  { name: 'Docker', category: 'DevOps', proficiency: 80 },
  { name: 'AWS', category: 'DevOps', proficiency: 75 },
  { name: 'Git', category: 'Tools', proficiency: 90 },
  { name: 'Linux', category: 'Tools', proficiency: 85 },
  { name: 'Web3', category: 'Blockchain', proficiency: 75 },
];

