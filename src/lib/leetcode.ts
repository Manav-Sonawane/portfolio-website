const LEETCODE_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

const EMPTY_STATS: LeetCodeStats = {
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
};

/**
 * Fetches LeetCode stats directly from LeetCode's own GraphQL endpoint.
 * Previously this used a third-party proxy (leetcode-stats-api.herokuapp.com)
 * which is an unmaintained free-tier Heroku app and was serving stale/failed
 * data. Querying LeetCode directly removes that single point of failure.
 */
export async function getLeetCodeStats(
  username: string,
): Promise<LeetCodeStats> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // LeetCode's edge rejects requests without a plausible Referer/UA.
        Referer: `https://leetcode.com/u/${username}/`,
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioStatsBot/1.0; +https://manav-sonawane.vercel.app)",
      },
      body: JSON.stringify({
        query: LEETCODE_PROFILE_QUERY,
        variables: { username },
      }),
      // Revalidate hourly; on failure Next.js keeps the last good cache
      // rather than falling back to EMPTY_STATS on every miss.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`LeetCode GraphQL responded ${res.status}`);
    }

    const json = await res.json();
    const submissions: { difficulty: string; count: number }[] | undefined =
      json?.data?.matchedUser?.submitStats?.acSubmissionNum;

    if (!submissions) {
      throw new Error(
        `LeetCode user "${username}" not found or response shape changed`,
      );
    }

    const countFor = (difficulty: string) =>
      submissions.find((s) => s.difficulty === difficulty)?.count ?? 0;

    return {
      totalSolved: countFor("All"),
      easySolved: countFor("Easy"),
      mediumSolved: countFor("Medium"),
      hardSolved: countFor("Hard"),
    };
  } catch (err) {
    console.error("[getLeetCodeStats] failed:", err);
    // Fail soft: the homepage renders zeros instead of crashing the page.
    return EMPTY_STATS;
  }
}