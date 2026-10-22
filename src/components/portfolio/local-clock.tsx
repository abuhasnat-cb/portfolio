"use client";

import { useEffect, useState } from "react";

export function LocalClock({
  timezone,
  label,
}: {
  timezone: string;
  label: string;
}) {
  const [time, setTime] = useState<string>("—");

  useEffect(() => {
    const tick = () => {
      setTime(
        `${new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timezone,
        }).format(new Date())} ${label}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timezone, label]);

  return <span>{time}</span>;
}
