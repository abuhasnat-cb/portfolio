/**
 * Inline markup used in content strings:
 * - ==text== → emphasized number/stat
 * - **text** → strong
 */

export function richToMarkdown(input: string): string {
  return input.replace(/==(.+?)==/g, "**$1**");
}

export function richToPlain(input: string): string {
  return richToMarkdown(input).replace(/\*\*/g, "");
}

export function splitRichText(
  input: string,
): Array<{ type: "text" | "num" | "strong"; value: string }> {
  const parts = input.split(/(==.+?==|\*\*.+?\*\*)/g);
  return parts.filter(Boolean).map((part) => {
    if (part.startsWith("==") && part.endsWith("==")) {
      return { type: "num" as const, value: part.slice(2, -2) };
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return { type: "strong" as const, value: part.slice(2, -2) };
    }
    return { type: "text" as const, value: part };
  });
}
