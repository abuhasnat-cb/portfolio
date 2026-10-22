"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({
  getText,
  idleLabel,
  className,
}: {
  getText: () => string;
  idleLabel: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);

  async function onCopy() {
    const value = getText();
    setDone(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1800);
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const t = document.createElement("textarea");
      t.value = value;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      t.remove();
    }
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-[var(--line)] bg-[var(--bg)] px-1.5 py-1 font-mono text-[length:var(--text-min)] leading-none text-[var(--muted)] transition-[color,border-color] duration-200 hover:border-[var(--accent-line)] hover:text-[var(--accent)]",
        done && "border-[var(--accent-line)] text-[var(--accent)]",
        className,
      )}
      aria-live="polite"
      onClick={onCopy}
    >
      {done ? (
        <>
          <svg
            className="size-[11px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="m5 12 5 5 9-10" />
          </svg>
          <span>Copied</span>
        </>
      ) : (
        <>
          <svg
            className="size-[11px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          <span>{idleLabel}</span>
        </>
      )}
    </button>
  );
}
