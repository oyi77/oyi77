import { GitHubStats, GitHubUser, GitHubRepo } from './types';

const GITHUB_USERNAME = 'oyi77';
const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(),
  ]);

  const languages: Record<string, number> = {};
  let totalStars = 0;

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  return {
    user,
    repos: repos.slice(0, 20), // Top 20 repos
    totalStars,
    languages,
  };
}

