export interface GitHubStats {
  login: string;
  public_repos: number;
  followers: number;
}

const EMPTY_STATS: GitHubStats = {
  login: "Manav-Sonawane",
  public_repos: 0,
  followers: 0,
};

/**
 * Fetches public GitHub profile stats. Unauthenticated requests are capped
 * at 60/hr per source IP, which Vercel's serverless functions can burn
 * through quickly. If GITHUB_TOKEN is set (a classic PAT with no scopes
 * needed for public data), the limit rises to 5000/hr.
 */
export async function getGitHubStats(username: string): Promise<GitHubStats> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("[getGitHubStats] failed:", err);
    return EMPTY_STATS;
  }
}