"use client";

import { useMemo } from "react";
import type { SiteContent } from "@/content";
import { toMarkdown } from "@/lib/markdown";
import { slugifyHeading } from "@/lib/utils";
import { CopyButton } from "./copy-button";

function highlightInline(s: string, noBold = false): string {
  const re =
    /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|(\[[^\]]+\])|(20XX–20XX)|(?:^|(?<=\s))_([^_]+)_/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    out += escapeHtml(s.slice(last, m.index));
    last = re.lastIndex;
    if (m[1] !== undefined) {
      out += `<a class="t-link" href="${escapeHtml(m[2]!)}"><span class="t-p">[</span><span class="t-lt">${escapeHtml(m[1])}</span><span class="t-p">](</span><span class="t-url">${escapeHtml(m[2]!)}</span><span class="t-p">)</span></a>`;
    } else if (m[3] !== undefined) {
      out += noBold
        ? escapeHtml(m[0])
        : `<span class="t-p">**</span><span class="t-b">${highlightInline(m[3], true)}</span><span class="t-p">**</span>`;
    } else if (m[4] !== undefined || m[5] !== undefined) {
      out += `<span class="t-ph">${escapeHtml(m[0])}</span>`;
    } else if (m[6] !== undefined) {
      out += `<span class="t-p">_</span><span class="t-i">${escapeHtml(m[6])}</span><span class="t-p">_</span>`;
    }
  }
  return out + escapeHtml(s.slice(last));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightMarkdown(src: string): string {
  let fm = 0;
  return src
    .replace(/\n$/, "")
    .split("\n")
    .map((line) => {
      let h: string;
      let id = "";
      if (line === "---" && fm < 2) {
        fm += 1;
        h = `<span class="t-p">---</span>`;
      } else if (fm === 1) {
        h = escapeHtml(line).replace(
          /^([\w-]+)(:)(.*)$/,
          '<span class="t-key">$1</span><span class="t-p">$2</span><span class="t-val">$3</span>',
        );
      } else if (/^#{1,6} /.test(line)) {
        const match = line.match(/^(#{1,6}) (.*)$/);
        const hs = match?.[1] ?? "#";
        const t = match?.[2] ?? "";
        id = ` id="md-${slugifyHeading(t)}"`;
        h = `<span class="t-mk">${hs}</span> <span class="t-h">${highlightInline(t, true)}</span>`;
      } else if (line.startsWith("> ")) {
        h = `<span class="t-mk">&gt;</span> ${highlightInline(line.slice(2))}`;
      } else if (line.startsWith("- ")) {
        h = `<span class="t-mk">-</span> ${highlightInline(line.slice(2))}`;
      } else if (line.startsWith("<!--")) {
        h = `<span class="t-c">${escapeHtml(line)}</span>`;
      } else {
        h = highlightInline(line);
      }
      return `<div class="md-line"${id}><span>${h || " "}</span></div>`;
    })
    .join("");
}

export function AgentView({ content }: { content: SiteContent }) {
  const markdown = useMemo(() => toMarkdown(content), [content]);
  const html = useMemo(() => highlightMarkdown(markdown), [markdown]);

  return (
    <div className="px-[var(--pad)] pb-6">
      <div className="mdbar screen-line-bottom mx-[calc(-1*var(--pad))] flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 border-b border-[var(--line)] px-[var(--pad)] py-4 font-mono text-[11.5px] leading-normal text-[var(--faint)]">
        <span>
          <span className="text-[var(--fg)]">index.md</span>
          <span className="mx-2 opacity-60">·</span>
          Also at{" "}
          <a
            className="underline decoration-[var(--line)] underline-offset-[3px] transition-colors duration-200 hover:text-[var(--accent)]"
            href="/index.md"
          >
            /index.md
          </a>{" "}
          and{" "}
          <a
            className="underline decoration-[var(--line)] underline-offset-[3px] transition-colors duration-200 hover:text-[var(--accent)]"
            href="/llms.txt"
          >
            /llms.txt
          </a>
        </span>
        <CopyButton getText={() => markdown} idleLabel="Copy as markdown" />
      </div>

      <div
        className="md-view"
        role="document"
        aria-label="Markdown source of this page"
        // Highlighted markdown is generated from trusted static content.
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-7 border-t border-[var(--line)] pt-3 font-mono text-[11.5px] leading-relaxed text-[var(--faint)]">
        Same content as the Human view, generated from one source. Agents: fetch
        /index.md or /llms.txt.
      </div>
    </div>
  );
}
