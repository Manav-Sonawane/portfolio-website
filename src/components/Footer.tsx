"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react";
import LocalTime from "@/components/fx/LocalTime";
import Marquee from "@/components/fx/Marquee";
import { getLenis } from "@/components/fx/SmoothScroll";
import { contacts, navItems } from "@/lib/profile";

const socials = contacts.filter((c) => ["GitHub", "LinkedIn", "LeetCode", "X"].includes(c.label));

export default function Footer() {
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      <div className="border-b border-white/10 py-6">
        <Marquee
          items={["Full-stack", "AI agents", "Backend systems", "Real-time", "Cloud", "Open source", "Hackathons"]}
          duration={55}
          reverse
          className="display-md text-outline"
          itemClassName="italic"
          separator={<span className="mx-8 text-signal not-italic">✦</span>}
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-4">Currently</p>
          <p className="display-md max-w-md">
            Open to hackathon teams, internships &amp; <em>open-source</em> collaboration.
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-xs text-mute">
            <span className="live-dot" />
            Mumbai, India · <LocalTime />
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="label mb-4">Sitemap</p>
          <ul className="space-y-2">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="u-link text-paper/80 transition-colors hover:text-paper">
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="label mb-4">Elsewhere</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-white/10 py-2 text-paper/80 transition-colors hover:text-signal">
                  {s.label}
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-dim sm:flex-row sm:px-10">
        <p>© {new Date().getFullYear()} Manav Sonawane — Designed &amp; built in Mumbai</p>
        <button onClick={toTop} className="group flex items-center gap-2 text-mute transition-colors hover:text-signal" data-cursor="top">
          Back to top <ArrowUp size={14} className="transition-transform duration-500 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
}
