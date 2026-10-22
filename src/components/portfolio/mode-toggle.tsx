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
        data-mode="human"
        aria-checked={mode === "human"}
        aria-label="Human view"
        aria-describedby="tip-human"
        className="modes-btn"
        onClick={() => onChange("human")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
        <span className="tip" role="tooltip" id="tip-human">
          Human view
        </span>
      </button>
      <button
        type="button"
        role="radio"
        data-mode="agent"
        aria-checked={mode === "agent"}
        aria-label="Agent view (markdown)"
        aria-describedby="tip-agent"
        className="modes-btn"
        onClick={() => onChange("agent")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="m7 10 3 2.5L7 15M12.5 15H17" />
        </svg>
        <span className="tip" role="tooltip" id="tip-agent">
          Agent view (markdown)
        </span>
      </button>
    </div>
  );
}
