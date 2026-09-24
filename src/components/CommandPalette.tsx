"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowBendDownLeft, Command, Copy, DownloadSimple, File, GithubLogo, LinkedinLogo, Code, House } from "@phosphor-icons/react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/components/fx/SmoothScroll";
import { navigateWithTransition } from "@/components/fx/PageTransition";
import { contacts, navItems, profile } from "@/lib/profile";

type Cmd = { id: string; group: string; label: string; hint: string; icon: React.ReactNode; run: () => void };

const FILE_NAMES: Record<string, string> = {
  "/": "README.md",
  "/about": "about.md",
  "/skills": "skills.json",
  "/projects": "projects/",
  "/experience": "experience.log",
  "/contact": "contact.sh",
};

const external = (label: string) => contacts.find((c) => c.label === label)!.link;

/** Ctrl/⌘+K (or `:`) command palette — every page and action, keyboard first. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(
    () => [
      ...navItems.map((n) => ({
        id: n.href,
        group: "Go to",
        label: n.name,
        hint: FILE_NAMES[n.href],
        icon: n.href === "/" ? <House size={16} /> : <File size={16} />,
        run: () => navigateWithTransition(n.href),
      })),
      {
        id: "copy",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <Copy size={16} />,
        run: () => navigator.clipboard?.writeText(profile.email),
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        hint: "Resume_Manav.docx",
        icon: <DownloadSimple size={16} />,
        run: () => {
          const a = document.createElement("a");
          a.href = "/Resume_Manav.docx";
          a.download = "";
          a.click();
        },
      },
      { id: "gh", group: "Elsewhere", label: "Open GitHub", hint: "github.com/Manav-Sonawane", icon: <GithubLogo size={16} />, run: () => window.open(external("GitHub"), "_blank", "noopener") },
      { id: "li", group: "Elsewhere", label: "Open LinkedIn", hint: "linkedin.com/in/manav-sonawane", icon: <LinkedinLogo size={16} />, run: () => window.open(external("LinkedIn"), "_blank", "noopener") },
      { id: "lc", group: "Elsewhere", label: "Open LeetCode", hint: "leetcode.com/Manav_Sonawane", icon: <Code size={16} />, run: () => window.open(external("LeetCode"), "_blank", "noopener") },
    ],
    []
  );

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? commands.filter((c) => `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(s)) : commands;
  }, [q, commands]);

  const close = () => {
    const el = panel.current;
    if (!el) return;
    gsap.to(el, { opacity: 0, y: -12, scale: 0.98, duration: 0.25, ease: "power2.in" });
    gsap.to("[data-palette-veil]", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setOpen(false);
        getLenis()?.start();
        window.dispatchEvent(new Event("palette:close"));
      },
    });
  };

  const run = (cmd?: Cmd) => {
    if (!cmd) return;
    close();
    setTimeout(cmd.run, 280);
  };

  // open triggers
  useEffect(() => {
    const show = () => {
      setQ("");
      setActive(0);
      setOpen(true);
      getLenis()?.stop();
      window.dispatchEvent(new Event("palette:open"));
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.matches?.("input, textarea, [contenteditable]");
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        show();
      } else if (e.key === ":" && !typing) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:request", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:request", show);
    };
  }, []);

  // enter animation
  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    gsap.fromTo("[data-palette-veil]", { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(panel.current, { opacity: 0, y: -24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out" });
    gsap.fromTo("[data-palette-row]", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.025, ease: "power3.out", delay: 0.08 });
  }, [open]);

  if (!open) return null;

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[1100] flex items-start justify-center px-4 pt-[14vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <div data-palette-veil className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={close} />
      <div ref={panel} className="glass glass-static relative w-full max-w-[640px] !bg-ink-2/95">
        <div className="titlebar">
          <Command size={13} /> command palette
          <span className="ml-auto flex items-center gap-2 normal-case tracking-normal">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span>
            <span className="kbd">esc</span>
          </span>
        </div>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <span className="font-mono text-signal">❯</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
              else if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => (a + 1) % Math.max(results.length, 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
              } else if (e.key === "Enter") run(results[active]);
            }}
            placeholder="type a command or page…"
            spellCheck={false}
            className="w-full bg-transparent font-mono text-sm text-paper placeholder:text-dim focus:outline-none"
          />
        </div>
        <ul className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-3 py-6 text-center font-mono text-xs text-dim">no matches for “{q}”</li>}
          {results.map((c, i) => {
            const head = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="option" aria-selected={i === active}>
                {head && <p className="label !text-[0.6rem] px-3 pb-1 pt-3">{head}</p>}
                <button
                  type="button"
                  data-palette-row
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                  className={`flex w-full items-center gap-3 rounded-[2px] px-3 py-2.5 text-left transition-colors ${i === active ? "bg-signal/12 text-paper" : "text-mute"}`}
                >
                  <span className={i === active ? "text-signal" : "text-dim"}>{c.icon}</span>
                  <span className="flex-1 text-sm">{c.label}</span>
                  <span className="hidden truncate font-mono text-[0.68rem] text-dim sm:inline">{c.hint}</span>
                  {i === active && <ArrowBendDownLeft size={14} className="text-signal" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
