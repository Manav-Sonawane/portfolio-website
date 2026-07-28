"use client";

import GlassPanel from "@/components/fx/GlassPanel";
import ScrollReveal from "@/components/fx/ScrollReveal";
import Typewriter from "@/components/fx/Typewriter";
import PixelDecrypt from "@/components/fx/PixelDecrypt";

const contacts = [
  { label: "Email", value: "manavsonawane@zohomail.in", link: "mailto:manavsonawane@zohomail.in" },
  { label: "GitHub", value: "github.com/Manav-Sonawane", link: "https://github.com/Manav-Sonawane" },
  { label: "LinkedIn", value: "linkedin.com/in/manav-sonawane", link: "https://linkedin.com/in/manav-sonawane" },
  { label: "LeetCode", value: "leetcode.com/Manav_Sonawane", link: "https://leetcode.com/Manav_Sonawane" },
  { label: "Instagram", value: "instagram.com/_manav_sonawane", link: "https://www.instagram.com/_manav_sonawane" },
  { label: "X", value: "x.com/Code_with_Manav", link: "https://x.com/Code_with_Manav" },
];

export default function Contact() {
  return (
    <main className="flex-1 px-8 sm:px-10 py-10 flex flex-col justify-center w-full max-w-4xl mx-auto">
      <ScrollReveal delay={0}>
        <p className="text-[--phosphor-600] mb-4 text-sm font-mono">
          manav@portfolio:~/contact$
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <h2 className="text-5xl sm:text-7xl font-bold mb-8">
          <PixelDecrypt text="Contact Me" />
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="text-[--ghost-400] text-lg mb-10 max-w-2xl leading-relaxed">
          Interested in collaborating, hiring, or just having a tech chat?
          You can reach me through the platforms below.
        </p>
      </ScrollReveal>

      {/* Contact Cards — GlassPanel with MagneticButton behavior on the whole card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contacts.map((c, i) => (
          <ScrollReveal key={c.label} delay={0.2 + i * 0.07}>
            <a
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel block p-5 group transition-all duration-200 hover:scale-[1.01]"
            >
              <p className="text-[--phosphor-400] text-xs font-mono mb-1 uppercase tracking-widest">
                {c.label}
              </p>
              <p className="text-[--phosphor-100] group-hover:text-[--phosphor-400] transition-colors duration-200 text-sm">
                {c.value}
              </p>
            </a>
          </ScrollReveal>
        ))}
      </div>

      {/* Closing echo — re-types on scroll into view */}
      <ScrollReveal delay={0.55}>
        <p className="mt-14 text-[--ghost-400] text-sm font-mono">
          <span className="text-[--phosphor-600]">$</span>{" "}
          <Typewriter
            text={`echo "Let's build something meaningful."`}
            speed={40}
            showCursor
          />
        </p>
      </ScrollReveal>
    </main>
  );
}
