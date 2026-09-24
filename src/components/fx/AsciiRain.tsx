"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const GLYPHS = "01{}[]<>/\\|=+-*#$%&@~^;:.";
const FONT_PX = 14;
const STEP_X = 11;
const STEP_Y = 17;

/**
 * Falling-glyph canvas, painted into whatever `relative` box contains it.
 * Pauses off-screen and when `enabled` is false. Static faint frame under reduced motion.
 */
export default function AsciiRain({ enabled = true, className = "" }: { enabled?: boolean; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const on = useRef(enabled);

  useEffect(() => {
    on.current = enabled;
    if (!enabled) {
      const c = canvas.current;
      c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
    }
  }, [enabled]);

  useEffect(() => {
    const c = canvas.current;
    const box = c?.parentElement;
    if (!c || !box) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let heads: number[] = [];
    let speeds: number[] = [];
    let lens: number[] = [];
    let visible = true;
    let last = 0;

    const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = box.getBoundingClientRect();
      c.width = width * dpr;
      c.height = height * dpr;
      c.style.width = `${width}px`;
      c.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_PX}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      cols = Math.ceil(width / STEP_X);
      rows = Math.ceil(height / STEP_Y);
      heads = Array.from({ length: cols }, () => -Math.random() * rows * 2);
      speeds = Array.from({ length: cols }, () => 0.18 + Math.random() * 0.42);
      lens = Array.from({ length: cols }, () => 6 + ((Math.random() * 16) | 0));
      if (reduce) drawStatic(width, height);
    };

    const drawStatic = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(86,216,255,0.10)";
      for (let i = 0; i < 260; i++) ctx.fillText(glyph(), Math.random() * w, Math.random() * h);
    };

    const draw = (time: number) => {
      if (!on.current || !visible || reduce) return;
      if (time - last < 0.04) return; // ~25fps
      last = time;
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < cols; i++) {
        heads[i] += speeds[i];
        if (heads[i] - lens[i] > rows) {
          heads[i] = -Math.random() * 10;
          speeds[i] = 0.18 + Math.random() * 0.42;
          lens[i] = 6 + ((Math.random() * 16) | 0);
        }
        const x = i * STEP_X;
        for (let k = 0; k < lens[i]; k++) {
          const row = Math.floor(heads[i]) - k;
          if (row < 0 || row > rows) continue;
          const fade = 1 - k / lens[i];
          ctx.fillStyle = k === 0 ? `rgba(200,240,255,${0.9 * fade})` : i % 9 === 0 ? `rgba(255,180,84,${0.34 * fade})` : `rgba(86,216,255,${0.32 * fade})`;
          ctx.fillText(k === 0 || Math.random() < 0.02 ? glyph() : GLYPHS[(i * 7 + row * 13) % GLYPHS.length], x, row * STEP_Y);
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(box);
    gsap.ticker.add(draw);

    return () => {
      gsap.ticker.remove(draw);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
