import Link from "next/link";

export default function NotFound() {
  return (
    <main className="col-wrap flex min-h-screen flex-col items-start justify-center gap-4 px-[var(--pad)] py-20">
      <p className="font-mono text-sm text-[var(--faint)]">404</p>
      <h1 className="text-2xl font-medium tracking-tight">Page not found</h1>
      <Link className="ul-link text-sm text-[var(--muted)]" href="/">
        Back home
      </Link>
    </main>
  );
}
