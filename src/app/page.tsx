import Image from "next/image";
import Link from "next/link";
import GlassPanel from "@/components/fx/GlassPanel";
import MorphBlob from "@/components/fx/MorphBlob";
import CountUp from "@/components/fx/CountUp";
import ScrollReveal from "@/components/fx/ScrollReveal";
import MagneticButton from "@/components/fx/MagneticButton";
import Typewriter from "@/components/fx/Typewriter";
import { getGitHubStats } from "@/lib/github";
import { getLeetCodeStats } from "@/lib/leetcode";

export default async function Home() {
  const githubData = await getGitHubStats("Manav-Sonawane");
  const leetCodeData = await getLeetCodeStats("Manav_Sonawane");

  return (
    <main className="flex-1 px-4 sm:px-6 md:px-10 py-6 flex flex-col justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">

        {/* LEFT: Hero */}
        <section>
          <ScrollReveal delay={0}>
            <p className="text-[--phosphor-400] text-sm sm:text-base md:text-lg mb-2 font-mono">
              {">> manav-sonawane@portfolio:~$"}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
              Hi, I&apos;m
              <br />
              <span className="text-[--phosphor-400]">
                Manav Sonawane
              </span>
              <span className="cursor-blink ml-1">_</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-[--ghost-400] mb-4 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed">
              Pursuing B.E. I.T. @ TSEC &nbsp;|&nbsp; Python &amp; Web Developer
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <ul className="text-sm sm:text-base text-[--phosphor-400]/80 space-y-1 mb-6 font-mono">
              <li><span className="text-[--phosphor-600]">&gt;</span> Location: Mumbai, India</li>
              <li><span className="text-[--phosphor-600]">&gt;</span> Focus: backend systems · ethical hacking · full-stack</li>
              <li><span className="text-[--phosphor-600]">&gt;</span> Currently: TE IT @ TSEC (CGPA 9.12)</li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/projects">
                <MagneticButton className="w-full sm:w-auto border border-[--phosphor-600] px-5 py-2 text-[--phosphor-400] hover:border-[--phosphor-400] hover:bg-[--phosphor-400]/10 transition-all duration-200 rounded-sm font-mono text-sm">
                  [&nbsp;View Projects&nbsp;]
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <MagneticButton className="w-full sm:w-auto border border-[--ghost-700] px-5 py-2 text-[--ghost-400] hover:border-[--phosphor-400] hover:text-[--phosphor-400] transition-all duration-200 rounded-sm font-mono text-sm">
                  [&nbsp;Contact Me&nbsp;]
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* RIGHT: Stats Panel */}
        <section className="flex justify-center w-full relative">
          <MorphBlob tone="phosphor" />
          <GlassPanel className="p-4 sm:p-5 space-y-4 w-full max-w-2xl">
            {/* GitHub header */}
            <ScrollReveal delay={0.15}>
              <div>
                <p className="text-[--phosphor-400] text-sm sm:text-base font-mono mb-0.5">
                  {">> github.com/"}{githubData.login}
                </p>
                <p className="text-[--ghost-400] text-xs">stats@realtime</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3">
              <ScrollReveal delay={0.2}>
                <GlassPanel className="p-3 rounded" noHover>
                  <p className="text-[--ghost-400] text-xs mb-1">Public Repos</p>
                  <p className="text-2xl font-bold text-[--phosphor-400]">
                    <CountUp target={githubData.public_repos} />
                  </p>
                  <p className="text-[--ghost-700] text-xs">repositories</p>
                </GlassPanel>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <GlassPanel className="p-3 rounded" noHover>
                  <p className="text-[--ghost-400] text-xs mb-1">Followers</p>
                  <p className="text-2xl font-bold text-[--phosphor-400]">
                    <CountUp target={githubData.followers} />
                  </p>
                  <p className="text-[--ghost-700] text-xs">developers</p>
                </GlassPanel>
              </ScrollReveal>
            </div>

            {/* Contribution Graph */}
            <ScrollReveal delay={0.3}>
              <div className="pt-3 border-t border-[--phosphor-900]">
                <p className="text-[--ghost-400] text-xs mb-2">Contribution Activity</p>
                <Image
                  src={`https://ghchart.rshah.org/2ea043/${githubData.login}`}
                  alt="GitHub Contribution Graph"
                  width={800}
                  height={150}
                  className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>
            </ScrollReveal>

            {/* LeetCode */}
            <ScrollReveal delay={0.35}>
              <div className="pt-3 border-t border-[--phosphor-900]">
                <p className="text-[--phosphor-400] text-sm sm:text-base font-mono mb-0.5">
                  {">> leetcode.com/Manav_Sonawane"}
                </p>
                <p className="text-[--ghost-400] text-xs">stats@realtime</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-3">
              <ScrollReveal delay={0.4}>
                <GlassPanel className="p-3 rounded" noHover>
                  <p className="text-[--ghost-400] text-xs mb-1">Problems Solved</p>
                  <p className="text-2xl font-bold text-[--phosphor-400]">
                    <CountUp target={leetCodeData.totalSolved} />
                  </p>
                </GlassPanel>
              </ScrollReveal>
              <ScrollReveal delay={0.45}>
                <GlassPanel className="p-3 rounded" noHover>
                  <p className="text-[--ghost-400] text-xs mb-1">Easy / Med / Hard</p>
                  <p className="text-lg font-bold text-[--phosphor-400]" style={{ fontVariantNumeric: "tabular-nums" }}>
                    <CountUp target={leetCodeData.easySolved} />
                    {" / "}
                    <CountUp target={leetCodeData.mediumSolved} duration={1.4} />
                    {" / "}
                    <CountUp target={leetCodeData.hardSolved} duration={1.6} />
                  </p>
                </GlassPanel>
              </ScrollReveal>
            </div>
          </GlassPanel>
        </section>

      </div>
    </main>
  );
}
