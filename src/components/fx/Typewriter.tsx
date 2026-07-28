"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterProps {
  text: string;
  speed?: number; // duration between chars in ms
  delay?: number; // delay before starting in ms
  onDone?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 30,
  delay = 0,
  onDone,
  className,
  showCursor = true,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const prefersReduced = useReducedMotion();
  const index = useRef(0);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text);
      onDone?.();
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let startTimeoutId: NodeJS.Timeout;

    const startTyping = () => {
      const type = () => {
        if (index.current < text.length) {
          setDisplayText((prev) => prev + text.charAt(index.current));
          index.current += 1;
          timeoutId = setTimeout(type, speed);
        } else {
          onDone?.();
        }
      };
      type();
    };

    startTimeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startTimeoutId);
    };
  }, [text, speed, delay, onDone, prefersReduced]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && index.current < text.length && (
        <span className="cursor-blink">█</span>
      )}
    </span>
  );
}
