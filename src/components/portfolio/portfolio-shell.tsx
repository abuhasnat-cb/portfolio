"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import type { Post } from "@/content/post-schema";
import { AgentView } from "./agent-view";
import { HumanView } from "./human-view";
import { SiteHeader } from "./site-header";

type Mode = "human" | "agent";

function readStoredMode(): Mode {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("mode");
  if (fromUrl === "agent" || fromUrl === "human") return fromUrl;
  try {
    const saved = localStorage.getItem("mode");
    if (saved === "agent" || saved === "human") return saved;
  } catch {
    /* ignore */
  }
  return "human";
}

export function PortfolioShell({
  content,
  posts,
}: {
  content: SiteContent;
  posts: Post[];
}) {
  const [mode, setMode] = useState<Mode>("human");
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef<number | null>(null);

  useEffect(() => {
    const initial = readStoredMode();
    // Hydrate interactive mode from URL / localStorage after mount.
    queueMicrotask(() => setMode(initial));
  }, []);

  const applyMode = useCallback((next: Mode) => {
    setMode(next);
    try {
      localStorage.setItem("mode", next);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (next === "agent") url.searchParams.set("mode", "agent");
    else url.searchParams.delete("mode");
    try {
      window.history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
  }, []);

  const changeMode = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) {
        applyMode(next);
        return;
      }
      setFading(true);
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => {
        applyMode(next);
        requestAnimationFrame(() => setFading(false));
      }, 200);
    },
    [mode, applyMode],
  );

  const onContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (mode !== "agent") return;
    const el = document.getElementById("md-contact");
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="page-shell">
      <main className="col-wrap">
        <SiteHeader
          profile={content.profile}
          mode={mode}
          onModeChange={changeMode}
          onContactClick={onContactClick}
        />
        <div className={`stage ${fading ? "is-fading" : ""}`}>
          {mode === "human" ? (
            <HumanView content={content} posts={posts} />
          ) : (
            <div className="fx [--i:1]">
              <AgentView content={content} posts={posts} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
