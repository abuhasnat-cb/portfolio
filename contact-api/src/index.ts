import nodemailer from "nodemailer";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(10_000),
});

export interface ContactEnv {
  ZOHO_SMTP_HOST?: string;
  ZOHO_SMTP_PORT?: string;
  ZOHO_SMTP_USER?: string;
  ZOHO_SMTP_PASSWORD?: string;
  CONTACT_TO_EMAIL?: string;
  /** Comma-separated allowed Origins for CORS (optional). */
  ALLOWED_ORIGINS?: string;
}

const DEFAULT_ORIGINS = [
  "https://oveehasnat.com",
  "https://www.oveehasnat.com",
  "https://abuhasnat-cb.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function parseAllowedOrigins(env: ContactEnv): string[] {
  const extra = env.ALLOWED_ORIGINS?.split(",").map((s) => s.trim()) ?? [];
  return [...new Set([...DEFAULT_ORIGINS, ...extra.filter(Boolean)])];
}

function corsHeaders(origin: string | null, env: ContactEnv): HeadersInit {
  if (!origin) return {};
  const allowed = parseAllowedOrigins(env);
  const ok = allowed.some(
    (entry) => origin === entry || origin.startsWith(`${entry}/`),
  );
  if (!ok) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(
  data: unknown,
  status: number,
  extraHeaders?: HeadersInit,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

async function sendContactMail(
  env: ContactEnv,
  input: z.infer<typeof contactFormSchema>,
): Promise<void> {
  const host = env.ZOHO_SMTP_HOST ?? "smtp.zoho.com";
  const port = Number(env.ZOHO_SMTP_PORT ?? "587");
  const user = env.ZOHO_SMTP_USER?.trim();
  const pass = env.ZOHO_SMTP_PASSWORD?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();

  if (!user || !pass || !to) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const companyLine = input.company ? `Company: ${input.company}\n` : "";

  await transporter.sendMail({
    from: user,
    to,
    replyTo: input.email,
    subject: `Portfolio contact: ${input.name}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      companyLine,
      "",
      input.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

export async function handleContactRequest(
  request: Request,
  env: ContactEnv,
): Promise<Response> {
  const origin = request.headers.get("Origin");
  const cors = corsHeaders(origin, env);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, cors);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400, cors);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return json({ error: "Validation failed", fieldErrors }, 400, cors);
  }

  try {
    await sendContactMail(env, parsed.data);
    return json({ ok: true }, 200, cors);
  } catch (err) {
    if (err instanceof Error && err.message === "SMTP_NOT_CONFIGURED") {
      return json(
        {
          error: "Contact email is not configured yet",
          code: "SMTP_NOT_CONFIGURED",
        },
        503,
        cors,
      );
    }
    console.error("contact send failed", err);
    return json({ error: "Failed to send message" }, 500, cors);
  }
}

const worker = {
  async fetch(request: Request, env: ContactEnv): Promise<Response> {
    return handleContactRequest(request, env);
  },
};

export default worker;
