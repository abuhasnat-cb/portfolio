import type { ReactNode } from "react";
import { splitRichText } from "./rich-text-parse";

export function renderRichText(
  input: string,
  options?: { numClassName?: string },
): ReactNode[] {
  const numClass = options?.numClassName ?? "rt-num";
  return splitRichText(input).map((part, i) => {
    if (part.type === "num") {
      return (
        <span key={i} className={numClass}>
          {part.value}
        </span>
      );
    }
    if (part.type === "strong") {
      return <strong key={i}>{part.value}</strong>;
    }
    return <span key={i}>{part.value}</span>;
  });
}
