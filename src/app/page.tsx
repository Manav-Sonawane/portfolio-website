/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import { getGitHubStats } from "@/lib/github";
import { getLeetCodeStats } from "@/lib/leetcode";

export default async function Home() {
  const githubData = await getGitHubStats("Manav-Sonawane");
  const leetCodeData = await getLeetCodeStats("Manav_Sonawane");
  return (
    <main className="min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-10 pt-10 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <section>
          <p className="text-green-500 text-lg sm:text-xl md:text-2xl mb-3">
            {">>"} manav-sonawane@portfolio:~$
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold mb-4">
            Hi, I'm
            <br />
            <span className="text-green-500">Manav Sonawane</span>.
          </h1>

          <p className="text-gray-300 mb-6 max-w-xl text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Pursuing B.E. I.T. |<br /> Python and Web
            Developer |
          </p>

          <ul className="text-base sm:text-lg md:text-xl text-green-200 space-y-1 mb-8">
            <li>Location: Mumbai, India</li>
            <li>
              Focus: backend systems, ethical hacking, full-stack web apps
            </li>
            <li>Currently: SE IT @ TSEC (CGPA 9.3)</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/projects">
              <button className="w-full sm:w-auto border border-gray-600 px-4 py-2 hover:border-green-500 hover:text-green-200">
                View Projects
              </button>
            </Link>
            <button className="w-full sm:w-auto border border-gray-600 px-4 py-2 hover:border-green-500 hover:text-green-200">
              Contact Me
            </button>
          </div>
        </section>

        {/* GitHub Stats Panel */}
        <section className="flex justify-center w-full">
          <div className="border border-gray-700 rounded-lg p-4 sm:p-6 md:p-8 bg-black/30 space-y-4 md:space-y-6 w-full max-w-2xl">
            <div className="mb-2">
              <p className="text-green-400 text-lg sm:text-xl md:text-2xl font-medium mb-2 break-words">
                {">>"} github.com/{githubData.login}
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                stats@realtime
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <StatCard
                title="Public Repos"
                value={githubData.public_repos}
                subtitle="repositories"
              />
              <StatCard
                title="Followers"
                value={githubData.followers}
                subtitle="developers"
              />
            </div>

            {/* GitHub Contribution Graph */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm mb-3">
                Contribution Activity
              </p>
              <Image
                src={`https://ghchart.rshah.org/2ea043/${githubData.login}`}
                alt="GitHub Contribution Graph"
                width={800}
                height={150}
                className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </div>
            {/* LeetCode Stats */}
            <div className="mt-8 pt-6 border-t border-gray-800 mb-2">
              <p className="text-green-400 text-lg sm:text-xl md:text-2xl font-medium mb-2 break-words">
                {">>"} leetcode.com/Manav_Sonawane
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                stats@realtime
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <StatCard
                title="LeetCode Solved"
                value={leetCodeData.totalSolved}
                subtitle="Problems solved"
              />

              <StatCard
                title="Easy / Medium / Hard"
                value={`${leetCodeData.easySolved}/${leetCodeData.mediumSolved}/${leetCodeData.hardSolved}`}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
