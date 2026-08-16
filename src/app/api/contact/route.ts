import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/db";
import { getMailConfig } from "@/lib/server/config";
import { sendMail } from "@/lib/server/mail";
import {
  contactAdminEmail,
  contactUserEmail,
} from "@/lib/server/email-templates";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`contact:${ip}`, 6, 60 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  if (asString(body.website, 120) || asString(body.company, 120)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name, 120);
  const email = asString(body.email, 190).toLowerCase();
  const phone = asString(body.phone, 40);
  const service = asString(body.service, 120);
  const message = asString(body.message, 4000);
  const source = asString(body.source, 80) || "contact";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    await db.execute(
      `INSERT INTO contact_requests (name, email, phone, service, message, source, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, service || null, message, source, ip]
    );
  } catch (error) {
    console.error("[contact] database error", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your request. Try again." },
      { status: 500 }
    );
  }

  const lead = { name, email, phone, service, message };
  const userMail = contactUserEmail(lead);
  const adminMail = contactAdminEmail(lead);
  const adminTo = getMailConfig().admin;

  try {
    await Promise.all([
      sendMail({
        to: email,
        subject: userMail.subject,
        html: userMail.html,
        text: userMail.text,
      }),
      sendMail({
        to: adminTo,
        subject: adminMail.subject,
        html: adminMail.html,
        text: adminMail.text,
        replyTo: email,
      }),
    ]);
  } catch (error) {
    console.error("[contact] mail error", error);
  }

  return NextResponse.json({ ok: true });
}
