"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react";
import Marquee from "@/components/fx/Marquee";
import LocalTime from "@/components/fx/LocalTime";
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
      <div className="border-b border-white/10 py-5">
        <Marquee
          items={["Full-stack", "AI agents", "Backend systems", "Real-time", "Cloud", "Open source", "Hackathons"]}
          duration={55}
          reverse
          className="display-md text-outline"
          separator={<span className="mx-8 text-signal">{"//"}</span>}
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-4">{"// status"}</p>
          <p className="display-md max-w-md normal-case">
            Open to hackathon teams, internships &amp; <em>open-source</em> collaboration.
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-xs text-mute">
            <span className="live-dot" />
            Mumbai, India · <LocalTime />
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="label mb-4">{"// sitemap"}</p>
          <ul className="space-y-2 font-mono text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="u-link text-paper/80 transition-colors hover:text-signal">
                  <span className="text-dim">./</span>
                  {n.name.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="label mb-4">{"// elsewhere"}</p>
          <ul className="space-y-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/10 py-2.5 font-mono text-sm text-paper/80 transition-colors hover:text-signal"
                >
                  {s.label}
                  <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-dim sm:flex-row sm:px-10">
        <p>© {new Date().getFullYear()} Manav Sonawane — Designed &amp; built in Mumbai</p>
        <button onClick={toTop} className="group flex items-center gap-2 text-mute transition-colors hover:text-signal" data-cursor="top">
          Back to top <ArrowUp size={13} className="transition-transform duration-500 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
}
