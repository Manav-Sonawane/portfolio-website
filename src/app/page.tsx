import Hero from "@/components/home/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import Impact from "@/components/home/Impact";
import BigCTA from "@/components/BigCTA";
import Marquee from "@/components/fx/Marquee";
import { getGitHubStats } from "@/lib/github";
import { getLeetCodeStats } from "@/lib/leetcode";
import { stack } from "@/lib/profile";

export default async function Home() {
  const [github, leetcode] = await Promise.all([getGitHubStats("Manav-Sonawane"), getLeetCodeStats("Manav_Sonawane")]);

  return (
    <main className="flex-1">
      <Hero />

      <div className="border-y border-white/10 py-7">
        <Marquee items={stack} duration={70} className="display-md text-outline" itemClassName="italic" />
      </div>

      <FeaturedWork />
      <Impact github={github} leetcode={leetcode} />
      <BigCTA />
    </main>
  );
}
