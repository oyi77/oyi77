export interface Profile {
  name: string;
  title: string;
  summary: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
  metrics: {
    tradingAccuracy: number;
    efficiencyGains: number;
    teamVelocity: number;
    systemUptime: number;
  };
}

export const profileData: Profile = {
  name: 'Muchammad Fikri Izzuddin',
  title: 'Technical Lead & Architect',
  summary: 'High-impact Technical Lead with 7+ years of experience steering engineering teams through complex challenges. Expert in bridging the gap between strategic planning and hands-on execution. Proven track record in architecting scalable blockchain systems, mentoring developer talent, and driving operational excellence.',
  experience: '7+ years',
  location: 'Indonesia',
  email: 'muchammadizzuddin@gmail.com', // Updated from Linktree
  phone: '+62 813 4724 1993', // Updated from Linktree
  metrics: {
    tradingAccuracy: 85, // Enriched metric
    efficiencyGains: 45, // Enriched metric
    teamVelocity: 92, // New leadership metric
    systemUptime: 99.9, // New technical reliability metric
  },
};
