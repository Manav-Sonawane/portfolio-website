export async function getLeetCodeStats(username: string) {
  const res = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch LeetCode data");
  }

  return res.json();
}
