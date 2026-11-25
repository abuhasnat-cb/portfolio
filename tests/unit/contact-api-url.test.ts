import { afterEach, describe, expect, it } from "vitest";
import { getContactApiUrl } from "@/lib/contact-api-url";

describe("getContactApiUrl", () => {
  const env = process.env;

  afterEach(() => {
    process.env = { ...env };
  });

  it("uses NEXT_PUBLIC_CONTACT_API_URL when set", () => {
    process.env.NEXT_PUBLIC_CONTACT_API_URL =
      "https://example.com/api/contact/";
    expect(getContactApiUrl()).toBe("https://example.com/api/contact");
  });

  it("uses production worker URL on GitHub Pages base path", () => {
    delete process.env.NEXT_PUBLIC_CONTACT_API_URL;
    process.env.NEXT_PUBLIC_BASE_PATH = "/portfolio";
    expect(getContactApiUrl()).toBe("https://oveehasnat.com/api/contact");
  });

  it("uses same-origin path on Cloudflare production", () => {
    delete process.env.NEXT_PUBLIC_CONTACT_API_URL;
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    expect(getContactApiUrl()).toBe("/api/contact");
  });
});
