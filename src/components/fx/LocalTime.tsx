"use client";

import { useEffect, useState } from "react";

/** Live Mumbai clock. Renders a placeholder until mounted to avoid hydration drift. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {time} IST
    </span>
  );
}
