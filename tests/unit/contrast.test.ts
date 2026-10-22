import { describe, expect, it } from "vitest";
import { contrastRatio } from "@/lib/contrast";

/** Tokens mirrored from globals.css :root / .dark — keep in sync. */
const light = {
  bg: "#ffffff",
  muted: "#6b6b70",
  faint: "#6b6b70",
  fg: "#111113",
};

const dark = {
  bg: "#09090b",
  muted: "#a0a0a8",
  faint: "#7c7c84",
  fg: "#ececee",
};

describe("WCAG AA contrast tokens", () => {
  it("light muted/faint meet 4.5:1 on white", () => {
    expect(contrastRatio(light.muted, light.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(light.faint, light.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(light.fg, light.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("dark muted/faint meet 4.5:1 on near-black", () => {
    expect(contrastRatio(dark.muted, dark.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(dark.faint, dark.bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(dark.fg, dark.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("dark faint is ~4.81:1 on #09090b", () => {
    expect(contrastRatio(dark.faint, dark.bg)).toBeGreaterThanOrEqual(4.8);
    expect(contrastRatio(dark.faint, dark.bg)).toBeLessThan(4.85);
  });
});
