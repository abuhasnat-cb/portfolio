import Link from "next/link";
import { cn } from "@/lib/utils";

/** Placeholder logo mark — replace with a real SVG when available. */
export function AoMark({
  className,
  initials = "AO",
}: {
  className?: string;
  initials?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Abu Hasnat Ovee, home"
      title="Abu Hasnat Ovee"
      className={cn(
        "grid size-[30px] place-items-center rounded-lg border border-[var(--line)] bg-[var(--soft)] font-mono text-[length:var(--text-min)] font-medium tracking-[0.02em] text-[var(--fg)] transition-[border-color,color] duration-200 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] hover:text-[var(--accent)]",
        className,
      )}
    >
      {initials}
    </Link>
  );
}
