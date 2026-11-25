"use client";

import { useCallback, useState } from "react";
import { contactFormSchema, type ContactFormInput } from "@/lib/contact/schema";
import { getContactApiUrl } from "@/lib/contact-api-url";
import { cn } from "@/lib/utils";

type FieldName = keyof ContactFormInput;

const emptyForm: ContactFormInput = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldName, string>>
  >({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [banner, setBanner] = useState<string | null>(null);

  const onChange = useCallback((field: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);

    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: flat.name?.[0],
        email: flat.email?.[0],
        company: flat.company?.[0],
        message: flat.message?.[0],
      });
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch(getContactApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        code?: string;
        fieldErrors?: Partial<Record<FieldName, string[]>>;
      } | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        setForm(emptyForm);
        setBanner("Thanks — your message was sent.");
        return;
      }

      if (data?.fieldErrors) {
        const next: Partial<Record<FieldName, string>> = {};
        for (const key of Object.keys(data.fieldErrors) as FieldName[]) {
          const msgs = data.fieldErrors[key];
          if (msgs?.[0]) next[key] = msgs[0];
        }
        setFieldErrors(next);
      }

      setStatus("error");
      if (data?.code === "SMTP_NOT_CONFIGURED") {
        setBanner(
          "The form is live, but email delivery is not configured yet. You can email me directly meanwhile.",
        );
      } else {
        setBanner(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setBanner("Network error. Check your connection and try again.");
    }
  };

  return (
    <form
      className="contact-form mt-6 grid gap-4 border border-[var(--line)] bg-[var(--soft)] p-6"
      onSubmit={onSubmit}
      noValidate
    >
      <h3 className="m-0 font-sans text-[length:var(--text-body)] font-medium text-[var(--fg)]">
        Chat with me
      </h3>
      <p className="m-0 text-[length:var(--text-min)] text-[var(--muted)]">
        Send a short note — hiring inquiries welcome.
      </p>

      {banner ? (
        <p
          role="status"
          className={cn(
            "m-0 rounded border px-3 py-2 text-[length:var(--text-min)]",
            status === "success"
              ? "border-[var(--line)] text-[var(--fg)]"
              : "border-[var(--line)] text-[var(--muted)]",
          )}
        >
          {banner}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[length:var(--text-min)]">
          <span>
            Name <span className="text-[var(--muted)]">*</span>
          </span>
          <input
            className="contact-input"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(ev) => onChange("name", ev.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            disabled={status === "submitting"}
            required
          />
          {fieldErrors.name ? (
            <span id="name-error" className="text-[var(--cobalt)]">
              {fieldErrors.name}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1.5 text-[length:var(--text-min)]">
          <span>
            Email <span className="text-[var(--muted)]">*</span>
          </span>
          <input
            className="contact-input"
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(ev) => onChange("email", ev.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            disabled={status === "submitting"}
            required
          />
          {fieldErrors.email ? (
            <span id="email-error" className="text-[var(--cobalt)]">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-1.5 text-[length:var(--text-min)]">
        <span>Company</span>
        <input
          className="contact-input"
          name="company"
          autoComplete="organization"
          value={form.company ?? ""}
          onChange={(ev) => onChange("company", ev.target.value)}
          disabled={status === "submitting"}
        />
      </label>

      <label className="grid gap-1.5 text-[length:var(--text-min)]">
        <span>
          Message <span className="text-[var(--muted)]">*</span>
        </span>
        <textarea
          className="contact-input min-h-[140px] resize-y"
          name="message"
          value={form.message}
          onChange={(ev) => onChange("message", ev.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          disabled={status === "submitting"}
          required
        />
        {fieldErrors.message ? (
          <span id="message-error" className="text-[var(--cobalt)]">
            {fieldErrors.message}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        className="btn-primary w-fit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
