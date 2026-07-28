# MAAV_OS — Portfolio Revamp Design Doc

> **Thesis:** This isn't a website with a terminal theme. It's a terminal that happens to render as a website. Every surface, transition, and interaction should behave like you're inside a living machine — booting, rendering, compiling, connecting — not scrolling past static cards. The green-on-black identity stays exactly as-is; what changes is that the terminal starts to *breathe*.

---

## 0. Where we are vs. where we're going

Current site (v1): static terminal-flavored Tailwind cards, no motion beyond CSS `animate-in` on mount, flat `#151515` boxes, `img.shields.io` badges. It reads like a resume with a monospace font. Good bones (the terminal chrome, the green phosphor palette, the `manav@portfolio:~$` prompts) — but nothing *moves*, nothing *reacts*, nothing feels alive.

v2 direction: keep 100% of the terminal identity (prompts, monospace, green phosphor, black void) and layer in three things that are currently missing entirely — **depth** (glass + fluid blobs), **motion** (GSAP-choreographed reveals, not CSS fade-ins), and **feedback** (everything you touch responds).

---

## 1. Design Tokens

### 1.1 Color — expanded phosphor palette

The old palette was just `green-400` / `green-100` / `black`. That's one accent doing every job (links, borders, glows, badges), which is why it reads flat. Splitting phosphor into a proper scale gives hierarchy without ever leaving the green-terminal identity.

```css
:root {
  /* Void — not pure black. Pure #000 is dead on OLED; a hair of green keeps it feeling like a CRT, not a hole. */
  --void: #060907;
  --void-raised: #0b100d;      /* card backgrounds */
  --void-glass: rgba(10, 16, 12, 0.55); /* glass panel fill */

  /* Phosphor scale — the "how alive is this pixel" axis */
  --phosphor-100: #d7ffe8;     /* near-white green, used SPARINGLY for peak emphasis (e.g. cursor) */
  --phosphor-400: #4ade80;     /* existing brand green — primary accent, unchanged */
  --phosphor-600: #16a34a;     /* dim green — secondary text, inactive nav */
  --phosphor-900: #0d2e1a;     /* deep green — borders, hairlines */

  /* Amber — the ONE secondary accent. Real CRT terminals shipped in green OR amber;
     we use dim amber exclusively for "alert / security / prime-project" moments —
     ties directly into the MAArk (security) project without introducing a random new hue. */
  --amber-400: #ffb454;
  --amber-900: #4a2e0d;

  /* Structural grays — desaturated, slightly green-shifted so they never look "generic gray UI" */
  --ghost-400: #8fa596;
  --ghost-700: #465049;

  --glow-phosphor: 0 0 24px rgba(74, 222, 128, 0.35);
  --glow-phosphor-tight: 0 0 8px rgba(74, 222, 128, 0.55);
  --glow-amber: 0 0 20px rgba(255, 180, 84, 0.3);
}
```

### 1.2 Type

Keep monospace as the *only* family — introducing a display serif/sans would break the terminal illusion immediately. Instead, get a second monospace doing a different job:

- **Body / UI**: `JetBrains Mono` (already reads well at small sizes, has a true italic — current site likely uses this or similar)
- **Display / Hero**: same family, but set at `font-variation-settings` weight 800, `letter-spacing: -0.02em`, and rendered slightly larger than "safe" — monospace display type wants to feel oversized and structural, like ASCII art at scale.
- **Data / Stats**: `JetBrains Mono` tabular-nums variant for the GitHub/LeetCode counters — numbers must not shift width as they count up.

```css
--font-mono: "JetBrains Mono", ui-monospace, monospace;
--type-hero: 800 clamp(3rem, 9vw, 7.5rem) / 0.95 var(--font-mono);
--type-display: 700 clamp(2rem, 5vw, 3.5rem) / 1.05 var(--font-mono);
--type-body: 400 clamp(1rem, 1.2vw, 1.25rem) / 1.6 var(--font-mono);
--type-data: 700 1.5rem / 1 var(--font-mono);
--type-caption: 400 0.8rem / 1.4 var(--font-mono);
```

### 1.3 Motion tokens

Motion needs its own token system too, or every animation gets hand-tuned and the site feels inconsistent.

```js
// lib/motion-tokens.ts
export const EASE = {
  boot: "power4.out",        // boot sequence, hero entrance — decisive, mechanical
  reveal: "power2.out",      // scroll reveals — smooth, no bounce (bounce reads "AI slop")
  glitch: "steps(4)",        // glitch-wipe transitions — deliberately stepped, not smooth
  magnetic: "power3.out",    // button/cursor magnetism
};

export const DURATION = {
  instant: 0.15,
  fast: 0.35,
  base: 0.6,
  slow: 1.1,
  boot: 1.8,
};
```

---

## 2. The Signature System

Per the design brief rule of "spend your boldness in one place" — here it's not one widget, it's one **coherent physical metaphor**: *you are looking at a CRT terminal that is alive*. Every signature element below is a different expression of that same metaphor, so they reinforce each other instead of competing.

### 2.1 Boot Sequence (first-load only)

On first visit (check `sessionStorage`, don't replay on every route change), before the hero renders:

```
[ 0.0s ]  screen is pure --void, cursor blinks alone, center screen
[ 0.2s ]  >> booting maav_os v3.0.0
[ 0.5s ]  >> loading kernel modules ......... [ OK ]
[ 0.8s ]  >> mounting /dev/manav ............ [ OK ]
[ 1.1s ]  >> initializing phosphor display ... [ OK ]
[ 1.4s ]  screen "flickers" (2 quick opacity pulses, CRT power-on feel)
[ 1.6s ]  hard cut to full hero, scanline overlay fades in over 0.4s
```

This is ~1.8s total, skippable on click/keypress, and **never replays on internal navigation** — only cold loads. It sets the entire tone in under 2 seconds without becoming an obstacle.

```tsx
// components/BootSequence.tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const LINES = [
  "booting maav_os v3.0.0",
  "loading kernel modules ......... [ OK ]",
  "mounting /dev/manav ............ [ OK ]",
  "initializing phosphor display .. [ OK ]",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    typeof window !== "undefined" &&
      !sessionStorage.getItem("booted"),
  );

  useGSAP(() => {
    if (!visible) return onDone();
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("booted", "1");
        setVisible(false);
        onDone();
      },
    });
    LINES.forEach((_, i) => {
      tl.from(`.boot-line-${i}`, { opacity: 0, duration: 0.15 }, `+=${i === 0 ? 0.2 : 0.25}`);
    });
    tl.to(root.current, { opacity: 0, repeat: 3, yoyo: true, duration: 0.06 }, "+=0.2") // CRT flicker
      .to(root.current, { autoAlpha: 0, duration: 0.3 });
  }, { scope: root, dependencies: [visible] });

  if (!visible) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[999] bg-[--void] flex items-center justify-center font-mono text-[--phosphor-400]">
      <div className="space-y-1 text-sm">
        {LINES.map((line, i) => (
          <p key={i} className={`boot-line-${i}`}>&gt;&gt; {line}</p>
        ))}
      </div>
    </div>
  );
}
```

### 2.2 Scanline + Vignette Overlay (persistent, ambient)

A fixed, `pointer-events-none`, very low-opacity overlay sits above everything, everywhere, always:

```tsx
// components/CRTOverlay.tsx
export default function CRTOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[998] mix-blend-overlay opacity-[0.06]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}
```

Pair with a radial vignette (`box-shadow: inset 0 0 200px rgba(0,0,0,0.6)` on `body`) so edges of the viewport darken like a CRT tube. **Subtlety is the whole point** — at 6% opacity this should be felt, not seen. Respect `prefers-reduced-motion` and also `prefers-contrast: more` by disabling entirely.

### 2.3 Route Transitions — the "glitch wipe"

Standard fade/slide route transitions are what every other portfolio does. Here, navigating between pages is a **terminal re-render**, not a slide:

1. Current page: horizontal RGB-split glitch (3 quick offset frames of the outgoing content, red/green channel shift via `filter: drop-shadow`)
2. Screen flashes to `--void` for 1 frame (~80ms)
3. New page's terminal prompt (`>> manav@portfolio:~/skills$`) types in first, *then* content resolves in underneath it

```tsx
// components/RouteTransition.tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.set(container.current, { filter: "none" })
      .to(container.current, {
        keyframes: [
          { x: -4, filter: "drop-shadow(3px 0 0 #ff004080) drop-shadow(-3px 0 0 #00fff980)", duration: 0.05 },
          { x: 3, duration: 0.05 },
          { x: 0, filter: "none", duration: 0.05 },
        ],
      })
      .to(container.current, { opacity: 0, duration: 0.08 })
      .fromTo(container.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, [pathname]);

  return <div ref={container}>{children}</div>;
}
```

*(For App Router, this pairs with `next/navigation`'s pathname key on a wrapping element, or View Transitions API where supported — GSAP handles the fallback everywhere else.)*

### 2.4 Fluid Morph Blobs (the depth layer)

The hard 90° corners of terminal chrome need *something* organic behind them or the whole page reads as a flat grid. Answer: soft, slow-morphing blob shapes, rendered in deep phosphor-900 / amber-900 at low opacity, drifting behind glass panels using an SVG goo filter so they merge and separate smoothly rather than just being blurry circles.

```tsx
// components/MorphBlob.tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const PATHS = [
  "M45.3,-58.5C58.5,-49.6,68.5,-33.6,71.8,-16.2C75.1,1.1,71.7,19.8,62.1,34.6C52.6,49.4,36.8,60.3,19.1,65.6C1.4,70.9,-18.3,70.7,-34.9,62.8C-51.6,54.9,-65.2,39.3,-70.6,21.1C-76.1,2.9,-73.4,-17.8,-63.3,-33.6C-53.2,-49.5,-35.7,-60.5,-17.4,-65.7C0.9,-70.8,20.9,-70.1,45.3,-58.5Z",
  "M39.5,-51.6C51.2,-44.1,60.5,-31.9,64.6,-17.8C68.7,-3.7,67.6,12.3,60.8,25.6C54.1,38.9,41.7,49.5,27.5,56.4C13.4,63.3,-2.5,66.5,-18.2,63.7C-33.9,60.9,-49.4,52.1,-58.9,38.9C-68.4,25.7,-71.9,8.1,-68.9,-8.1C-65.9,-24.3,-56.4,-39.1,-43.5,-46.6C-30.6,-54.1,-15.3,-54.3,-0.2,-54.1C14.9,-53.9,29.8,-53.4,39.5,-51.6",
];

export default function MorphBlob({ tone = "phosphor" }: { tone?: "phosphor" | "amber" }) {
  const path = useRef<SVGPathElement>(null);
  const color = tone === "phosphor" ? "var(--phosphor-900)" : "var(--amber-900)";

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(path.current, { duration: 8, attr: { d: PATHS[1] }, ease: "sine.inOut" });
    gsap.to(path.current, { duration: 14, rotate: 360, transformOrigin: "50% 50%", repeat: -1, ease: "none" });
  });

  return (
    <svg viewBox="-100 -100 200 200" className="absolute w-[600px] h-[600px] opacity-40 blur-3xl -z-10">
      <path ref={path} d={PATHS[0]} fill={color} />
    </svg>
  );
}
```

Placement: one blob drifting behind the GitHub/LeetCode stat panel on the homepage, one behind the About terminal card, one behind each *prime* project card (Citioyen/MAArk) in amber-tinted phosphor to visually mark them as featured. **Never** more than one blob per viewport — this is atmosphere, not wallpaper.

### 2.5 Glass panels (the surface language for stat cards, nav, project fronts)

```css
.glass-panel {
  background: var(--void-glass);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid var(--phosphor-900);
  border-radius: 6px; /* terminal windows aren't fully square, but close */
  box-shadow:
    inset 0 1px 0 rgba(74, 222, 128, 0.08),
    0 8px 32px rgba(0, 0, 0, 0.4);
}
.glass-panel:hover {
  border-color: var(--phosphor-600);
  box-shadow: var(--glow-phosphor), 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## 3. Component Library ("React Bits" for this project)

Reusable primitives every page composes from. Build these once in `components/fx/`, use everywhere.

| Component | Job |
|---|---|
| `<BootSequence />` | First-load boot animation (§2.1) |
| `<CRTOverlay />` | Persistent scanline/vignette layer (§2.2) |
| `<RouteTransition />` | Glitch-wipe between pages (§2.3) |
| `<MorphBlob tone="phosphor｜amber" />` | Ambient fluid background shape (§2.4) |
| `<GlassPanel />` | Frosted container, replaces flat `bg-[#151515]` cards |
| `<Typewriter text speed onDone />` | Char-by-char terminal typing, used for every `>>` prompt line and hero subtext |
| `<MagneticButton />` | Buttons/nav-links physically pull toward cursor within a radius, spring back on leave |
| `<CursorGlow />` | Custom cursor: small phosphor dot + soft trailing glow, snaps to a `[` `]` bracket shape when hovering any link (signals "this is clickable" without a generic pointer swap) |
| `<CountUp target duration /> ` | Animated number roll for GitHub repos/followers, LeetCode solved counts — never render final numbers statically |
| `<ScrollReveal /> ` | Wrapper: children animate in via GSAP ScrollTrigger (translateY + opacity + slight blur-to-focus) as they enter viewport |
| `<PixelDecrypt text />` | Headline text that resolves from random monospace characters into real text — used once, on page `<h2>` titles only (About/Skills/Projects/Experience), so it stays a *signature*, not noise |

### 3.1 `<MagneticButton />`

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, ...props }: React.ComponentProps<"button">) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power3.out" });
  };
  const onMouseLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });

  return (
    <button ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
      {children}
    </button>
  );
}
```

### 3.2 `<PixelDecrypt />` (headline decrypt-in effect)

```tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function PixelDecrypt({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const state = { progress: 0 };
    gsap.to(state, {
      progress: 1,
      duration: 1.1,
      ease: "power1.inOut",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        const revealCount = Math.floor(state.progress * text.length);
        el.textContent = text
          .split("")
          .map((c, i) => (i < revealCount ? c : c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("");
      },
    });
  });

  return <h2 ref={ref} className={className}>{text}</h2>;
}
```

---

## 4. Page-by-Page Choreography

### 4.1 Navbar
- Sits in a thin `glass-panel` strip, not flat black.
- Active route gets a persistent blinking `_` cursor suffix (`> projects_`) instead of just a color change.
- `<MagneticButton>` on "Download Resume" only — it's the one CTA that deserves the pull.

### 4.2 Home / Hero
- Boot sequence plays once, then:
- Timeline (GSAP, `power4.out`): `>> manav-sonawane@portfolio:~$` prompt types in (0.0s) → "Hi, I'm" fades/slides up (0.3s) → "Manav Sonawane." does a phosphor-flicker-on (three quick opacity steps like a CRT settling, 0.5s) → subtext lines type in sequentially (0.7–1.4s) → CTA buttons pop with slight overshoot (1.5s).
- Right panel (GitHub/LeetCode stats): panel itself fades/slides in from the right *after* the left column settles (stagger, not simultaneous — avoids the "everything arrives at once" look). Numbers use `<CountUp>` — repos count 0→31, followers 0→12, LeetCode 0→316, difficulty breakdown counts up last, staggered 80ms apart.
- Contribution graph: each cell fades in with a tiny stagger (`0.01s` per cell, left-to-right) instead of appearing instantly — reads like the graph is being *drawn*, not just rendered.
- One `<MorphBlob tone="phosphor">` drifting behind the stats panel, `z-index` below the glass.
- Idle micro-interaction: the trailing block cursor after "Manav Sonawane." keeps blinking forever at terminal-authentic ~530ms interval (not a generic CSS `animation: blink 1s` — real terminal cursors are slightly irregular; add tiny random jitter to the interval).

### 4.3 About
- `<PixelDecrypt text="About Me" />` for the h2.
- Body paragraphs: each `<br/><br/>` block becomes its own `<ScrollReveal>` — they rise + sharpen from a slight blur as they cross ~80% viewport, staggered 0.15s apart. Currently they all just exist statically; this makes reading feel like content is being decrypted paragraph by paragraph as you scroll, matching the terminal metaphor.
- Photo: on scroll-into-view, the circular photo does a one-time "scan reveal" — a horizontal phosphor-green scan-line sweeps top-to-bottom across it once (`clip-path` animated), like the photo is being rendered by the terminal rather than just fading in.
- `TerminalProfileCard`: keep the bash-window chrome, but the `cat system_profile.txt` output should actually *type* line by line via `<Typewriter>` when the card scrolls into view, not render instantly.

### 4.4 Skills
- Categories reveal in a staggered grid-cascade (`ScrollTrigger.batch`), not all six sections animating identically — left column staggers top-to-bottom slightly before right column, like two terminal panes populating in parallel.
- Individual skill badges: replace static `img.shields.io` badges (network dependency, inconsistent styling, no interactivity) with **custom `<GlassPanel>` chips** — icon (keep simple monochrome SVG icons, e.g. `simple-icons` set) + label, phosphor-glow border on hover, and a very subtle continuous "breathing" opacity pulse (8s cycle, ±5% opacity) on the 2-3 skills tied to your *current* focus (e.g. TypeScript, pgvector, GSAP) — signals "actively using this" vs. "have used this."
- New "Security & Privacy Engineering" category (per your updated resume) renders in **amber**, not phosphor green — the one deliberate palette break, reinforcing that this category is different in kind (defensive/security work) from the rest.

### 4.5 Projects
- This is where **prime vs. other** (from your resume decisions) needs to be visually, not just contextually, true:
  - **Citioyen** and **MAArk**: large `<GlassPanel>` cards, each with its own amber-tinted `<MorphBlob>` drifting behind it, front face shows a live-typed one-line tagline via `<Typewriter>` on hover-enter (instead of an instant flip).
  - **Codered IO**: standard-size card, phosphor (not amber) blob.
  - **Other Projects** (BookMySeat/Reclaim/etc.): collapse into a compact horizontal list/table below the fold — small `[ GitHub → ]` text links, no flip-card treatment. This matches the resume's "Other Projects: X | Y" compression and stops 7 project cards competing for equal attention.
- Card flip (already exists): keep the mechanic, but drive it with GSAP instead of a CSS class toggle so the flip can ease with a subtle Y-axis "settle" wobble at the end (`back.out(1.2)`) rather than linear rotation — makes it feel like a physical card, not a CSS trick.
- Fix the underlying bug first: `Reclaim`'s `github` field is `string[]`, the card expects `string` — this is currently silenced with `@ts-expect-error` and is very likely rendering a broken link. Normalize the data shape before any animation work touches this file.

### 4.6 Experience
- Vertical timeline rendered as a literal terminal `git log --graph`-style rail: a phosphor line down the left edge with commit-dot nodes per role, connecting lines draw themselves (`stroke-dashoffset` animated via ScrollTrigger `scrub: true`) as you scroll past each entry — the line "writes itself" in sync with scroll position rather than just appearing.
- Each role's bullets type in via `<Typewriter>` once its node crosses viewport center.

### 4.7 Contact
- Each contact card (Email/GitHub/LinkedIn/LeetCode/Instagram/X) is a `<GlassPanel>` with `<MagneticButton>` behavior on the whole card, not just a button inside it.
- Final line — `echo "Let's build something meaningful."` — should actually *execute*: on scroll-into-view, it clears and re-types itself once, then the cursor keeps blinking indefinitely. Small detail, disproportionately memorable.

### 4.8 Footer
- Persistent scanline overlay already covers this; keep footer minimal, just add the blinking cursor to `built_with_next.js` on hover (`built_with_next.js_`).

---

## 5. GSAP Setup Pattern (project-wide)

Use `@gsap/react`'s `useGSAP` hook everywhere — it auto-cleans up on unmount, which matters a lot in Next.js App Router where components mount/unmount on every route change (this is the #1 source of "animations break after navigating back" bugs in GSAP + Next projects).

```bash
npm install gsap @gsap/react
```

```tsx
// lib/gsap.ts — register plugins once, import this file at the app root
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
```

For scroll reveals, prefer `ScrollTrigger.batch()` over individual triggers per element when animating lists (skill badges, project cards, timeline entries) — batching groups near-simultaneous intersections into one callback, which is both a performance win and produces a cleaner stagger than N independent triggers firing at slightly different scroll positions.

---

## 6. Performance & Accessibility Guardrails

These are not optional — a "cool animations" pass that tanks Lighthouse or ignores motion sensitivity is a downgrade, not a revamp.

- **`prefers-reduced-motion: reduce`**: every component above must check this and fall back to instant/opacity-only transitions. Wrap once: `const reduced = useReducedMotion()` (small custom hook reading the media query) and branch GSAP duration to `0.01` when true, rather than skipping the timeline entirely (skipping can leave elements in their pre-animation state, e.g. `opacity: 0`).
- **CRTOverlay + vignette**: disable entirely under reduced motion *and* under `prefers-contrast: more` — it's a legibility cost some users shouldn't pay.
- **Blob morphing**: pure CSS/SVG, GPU-composited (`transform`, not layout properties) — verify no blob triggers layout thrashing by checking DevTools Performance tab for forced reflows.
- **Boot sequence**: must be skippable (keypress/click) and never block interaction — the "OK" lines are cosmetic, not gating anything.
- **Route glitch-wipe**: keep under 500ms total. Longer reads as lag, not style.
- **Custom cursor**: must fall back to system cursor on touch devices (`(hover: none)` media query) — do not hide the native cursor on mobile.
- **Contribution graph cell stagger**: cap total stagger time regardless of cell count (`gsap.utils.distribute` with a max total duration) so a denser graph doesn't make the reveal take longer.

---

## 7. What NOT to do (guardrails against generic AI-portfolio look)

- No bouncy/elastic easing on anything except the magnetic-button release and the card-flip settle — overuse of `elastic`/`back` easing is the single fastest way to make a site feel like a template.
- No rainbow/multi-hue gradients. The amber accent is the *only* second hue in the entire system, used exclusively for "prime/security/featured" signaling — never decoratively.
- No particle.js-style floating dot fields — too generic, and it competes with the intentional scanline texture.
- No glassmorphism on *everything* — glass is for elevated surfaces (stat panels, project cards, contact cards). Body text and terminal prompts stay flat against the void; if every surface is glass, none of them read as "elevated" anymore.
- Numbered section markers (01/02/03) — skip these unless a section is a genuine sequence (Experience timeline qualifies; Skills/Projects grids do not).

---

## 8. Implementation Roadmap

1. **Foundation**: install `gsap` + `@gsap/react`, add design tokens (`globals.css`), build `<CRTOverlay>`, `<GlassPanel>`, motion-tokens file. Ship with zero visible change yet — just plumbing.
2. **Signature layer**: `<BootSequence>`, `<RouteTransition>` (glitch-wipe), `<MorphBlob>`. This is the highest-impact, most "wow" phase — do it first so there's something to show early.
3. **Component library**: `<Typewriter>`, `<MagneticButton>`, `<CountUp>`, `<PixelDecrypt>`, `<ScrollReveal>`, `<CursorGlow>`.
4. **Page choreography**: Home → Projects → Skills → About → Experience → Contact, in that order (Home and Projects carry the most weight for a recruiter's first impression).
5. **Data fixes folded in**: fix `Reclaim` github-field type bug, add Citioyen/MAArk/Codered IO to `lib/projects.tsx`, update hero CGPA/year text — all while the files are already open for animation work, so it's one pass instead of two.
6. **Accessibility pass**: reduced-motion audit on every component, keyboard-focus visibility check (glass panels need visible focus rings — `backdrop-filter` can make default browser focus rings hard to see, needs an explicit `outline`).
7. **Perf pass**: Lighthouse run, check CLS from staggered reveals (reserve space before animating in), verify blob SVGs aren't triggering repaints outside their own bounding box.

---

*This doc is the plan, not the implementation. Once you've reviewed it, tell me which phase to start building first — I'd recommend Phase 1 + 2 together since the signature layer is what makes the revamp feel real, and everything after that is refinement.*
