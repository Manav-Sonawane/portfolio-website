"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Disable the pointer spotlight (static display panels) */
  noHover?: boolean;
}

/** Frosted glass surface whose border and fill light up around the pointer. */
export default function GlassPanel({ noHover = false, className, children, onMouseMove, ...props }: GlassPanelProps) {
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    onMouseMove?.(e);
  };

  return (
    <div className={cn("glass", noHover && "glass-static", className)} onMouseMove={handleMove} {...props}>
      {children}
    </div>
  );
}
