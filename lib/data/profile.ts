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
  };
}

export const profileData: Profile = {
  name: 'Muchammad Fikri Izzuddin',
  title: 'Lead Software Engineer',
  summary: 'Experienced software engineer with expertise in blockchain development, full-stack engineering, and technical leadership. Specialized in onchain trading systems, backend infrastructure, and modern web technologies.',
  experience: '7+ years',
  location: 'Indonesia',
  email: 'mbahkoe.pendekar@gmail.com',
  phone: '+62 XXX XXX XXXX',
  metrics: {
    tradingAccuracy: 70,
    efficiencyGains: 30,
  },
};

