"use client";

type Mode = "human" | "agent";

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div
      className="modes-pill ml-auto"
      role="radiogroup"
      aria-label="View mode"
      data-mode={mode}
    >
      <button
        type="button"
        role="radio"
        aria-checked={mode === "human"}
        title="Human view"
        className="relative z-1 rounded-full px-2.5 py-2 font-mono text-[11px] font-medium tracking-[0.02em] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--fg)] aria-checked:text-[var(--accent)]"
        onClick={() => onChange("human")}
      >
        Human
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={mode === "agent"}
        title="Agent view: the whole page as markdown"
        className="relative z-1 rounded-full px-2.5 py-2 font-mono text-[11px] font-medium tracking-[0.02em] text-[var(--faint)] transition-colors duration-200 hover:text-[var(--fg)] aria-checked:text-[var(--accent)]"
        onClick={() => onChange("agent")}
      >
        Agent
      </button>
    </div>
  );
}
