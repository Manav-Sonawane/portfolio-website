export async function getGitHubStats(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch GitHub data");

  return res.json();
}
