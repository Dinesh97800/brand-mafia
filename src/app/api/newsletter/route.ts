import { NextResponse } from "next/server";
import { getDb } from "@/lib/server/db";
import { getMailConfig } from "@/lib/server/config";
import { sendMail } from "@/lib/server/mail";
import {
  newsletterAdminEmail,
  newsletterUserEmail,
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
  if (!rateLimit(`newsletter:${ip}`, 8, 60 * 60 * 1000)) {
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

  if (asString(body.website, 120)) {
    return NextResponse.json({ ok: true });
  }

  const email = asString(body.email, 190).toLowerCase();
  const source = asString(body.source, 80) || "website";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    await db.execute(
      `INSERT INTO newsletter_subscribers (email, source, ip)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE source = VALUES(source), ip = VALUES(ip)`,
      [email, source, ip]
    );
  } catch (error) {
    console.error("[newsletter] database error", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your subscription. Try again." },
      { status: 500 }
    );
  }

  const userMail = newsletterUserEmail(email);
  const adminMail = newsletterAdminEmail(email, source);
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
      }),
    ]);
  } catch (error) {
    console.error("[newsletter] mail error", error);
  }

  return NextResponse.json({ ok: true });
}
