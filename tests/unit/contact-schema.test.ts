import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/contact/schema";

describe("contactFormSchema", () => {
  it("accepts a valid payload", () => {
    const parsed = contactFormSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines Ltd",
      message: "Hello",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const parsed = contactFormSchema.safeParse({
      name: "",
      email: "not-an-email",
      message: "",
    });
    expect(parsed.success).toBe(false);
  });
});
