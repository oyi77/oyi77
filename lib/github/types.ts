export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

export interface GitHubStats {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  totalStars: number;
  languages: Record<string, number>;
}

