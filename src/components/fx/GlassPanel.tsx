import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use amber variant for prime/security projects */
  variant?: "phosphor" | "amber";
  /** Disable hover glow (e.g. for static display panels) */
  noHover?: boolean;
}

/**
 * MAAV_OS — GlassPanel
 * Frosted glass container — replaces all flat bg-[#151515] cards.
 * Applies .glass-panel or .glass-panel-amber CSS class from globals.css.
 *
 * Usage:
 *   <GlassPanel>…</GlassPanel>
 *   <GlassPanel variant="amber">…</GlassPanel>
 */
export default function GlassPanel({
  variant = "phosphor",
  noHover = false,
  className,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        variant === "amber" ? "glass-panel-amber" : "glass-panel",
        noHover && "hover:border-inherit hover:shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
