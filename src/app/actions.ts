"use server";

/**
 * Form handlers. Each one validates on the server and forwards the
 * submission as JSON to a webhook you set in .env, so any tool that accepts
 * webhooks (Zapier, Make, Slack, Formspree, your CRM) can receive it.
 * Without a webhook, submissions are logged on the server, which is handy in
 * development.
 */

export type FormState = { status: "idle" | "success" | "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function forward(webhook: string | undefined, kind: string, payload: Record<string, string>): Promise<boolean> {
  if (!webhook) {
    console.info(`[${kind}] no webhook set, submission:`, payload);

    return true;
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: kind, ...payload, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });

    return response.ok;
  } catch (error) {
    console.error(`[${kind}] webhook failed:`, error);

    return false;
  }
}

function field(formData: FormData, name: string, max: number): string {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

export async function subscribe(_previous: FormState, formData: FormData): Promise<FormState> {
  // A hidden field people leave empty; bots that fill every field are ignored.
  if (field(formData, "company_website", 200) !== "") {
    return { status: "success", message: "Thanks! You're on the list." };
  }

  const email = field(formData, "email", 254).toLowerCase();

  if (!EMAIL.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const ok = await forward(process.env.NEWSLETTER_WEBHOOK_URL, "newsletter", { email });

  return ok
    ? { status: "success", message: "Thanks! You're on the list." }
    : { status: "error", message: "Something went wrong. Please try again in a minute." };
}

export async function sendContactMessage(_previous: FormState, formData: FormData): Promise<FormState> {
  if (field(formData, "company_website", 200) !== "") {
    return { status: "success", message: "Thanks! We'll get back to you within one business day." };
  }

  const name = field(formData, "name", 120);
  const email = field(formData, "email", 254).toLowerCase();
  const message = field(formData, "message", 5000);

  if (name === "" || !EMAIL.test(email) || message.length < 10) {
    return { status: "error", message: "Please add your name, a valid email and a message of at least 10 characters." };
  }

  const ok = await forward(process.env.CONTACT_WEBHOOK_URL, "contact", {
    name,
    email,
    company: field(formData, "company", 120),
    message,
  });

  return ok
    ? { status: "success", message: "Thanks! We'll get back to you within one business day." }
    : { status: "error", message: "Your message couldn't be sent. Please email us instead." };
}

export async function sendInquiry(_previous: FormState, formData: FormData): Promise<FormState> {
  if (field(formData, "company_website", 200) !== "") {
    return { status: "success", message: "Thanks! We'll reply within one working day." };
  }

  const name = field(formData, "name", 120);
  const email = field(formData, "email", 254).toLowerCase();
  const message = field(formData, "message", 5000);

  if (name === "" || !EMAIL.test(email) || message.length < 10) {
    return { status: "error", message: "Please add your name, a valid work email and a question of at least 10 characters." };
  }

  const ok = await forward(process.env.CONTACT_WEBHOOK_URL, "inquiry", {
    name,
    email,
    company: field(formData, "company", 120),
    teamSize: field(formData, "team_size", 60),
    goal: field(formData, "goal", 120),
    message,
  });

  return ok
    ? { status: "success", message: "Thanks! We'll reply within one working day." }
    : { status: "error", message: "Your question couldn't be sent. Please email us instead." };
}

export type WaitlistState = FormState & { referralCode?: string; position?: number };

/**
 * Join the waitlist. The referral code is derived from the email, so the same
 * person always gets the same link. If your webhook answers with JSON such as
 * {"position": 214}, that position is shown; otherwise none is.
 */
export async function joinWaitlist(_previous: WaitlistState, formData: FormData): Promise<WaitlistState> {
  if (field(formData, "company_website", 200) !== "") {
    return { status: "success", message: "You're on the list!" };
  }

  const email = field(formData, "email", 254).toLowerCase();

  if (!EMAIL.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const referralCode = await shortCode(email);
  const referredBy = field(formData, "ref", 32);
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  let position: number | undefined;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "waitlist", email, referralCode, referredBy, submittedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        return { status: "error", message: "Something went wrong. Please try again in a minute." };
      }

      const body: unknown = await response.json().catch(() => null);
      const reported = typeof body === "object" && body !== null ? (body as { position?: unknown }).position : undefined;
      position = typeof reported === "number" && reported > 0 ? Math.round(reported) : undefined;
    } catch (error) {
      console.error("[waitlist] webhook failed:", error);

      return { status: "error", message: "Something went wrong. Please try again in a minute." };
    }
  } else {
    console.info("[waitlist] no webhook set, submission:", { email, referralCode, referredBy });
  }

  return { status: "success", message: "You're on the list!", referralCode, position };
}

async function shortCode(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));

  return Array.from(new Uint8Array(digest).slice(0, 5), (byte) => byte.toString(36).padStart(2, "0")).join("");
}
