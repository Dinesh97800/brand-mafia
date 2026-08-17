import { getServiceById } from "@/data/services";
import { siteConfig } from "@/data/site";

const ORANGE = "#F05707";
const BLACK = "#0A0A0A";
const CARD = "#111111";
const PANEL = "#161616";
const OFFWHITE = "#F4F2F2";
const MUTED = "rgba(244,242,242,0.55)";
const LINE = "rgba(255,255,255,0.08)";
const FONT = "Arial,Helvetica,sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(name: string) {
  return name.split(" ")[0] || name;
}

function serviceLabel(id?: string) {
  if (!id) return "";
  return getServiceById(id)?.title ?? id;
}

function logoMark(size = 36) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table;">
    <tr>
      <td width="${size}" height="${size}" align="center" valign="middle" style="width:${size}px;height:${size}px;background:${ORANGE};border-radius:9px;color:${BLACK};font-family:${FONT};font-size:${Math.round(size * 0.48)}px;font-weight:800;letter-spacing:-0.04em;">B</td>
    </tr>
  </table>`;
}

function iconBox(symbol: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0">
    <tr>
      <td width="32" height="32" align="center" valign="middle" style="width:32px;height:32px;border:1px solid rgba(240,87,7,0.4);border-radius:8px;color:${ORANGE};font-family:${FONT};font-size:13px;line-height:32px;">${symbol}</td>
    </tr>
  </table>`;
}

function requestRow(
  symbol: string,
  label: string,
  value: string,
  last = false
) {
  if (!value) return "";
  return `<tr>
    <td valign="top" style="padding:14px 12px 14px 0;width:44px;${last ? "" : `border-bottom:1px solid ${LINE};`}">${iconBox(symbol)}</td>
    <td valign="middle" style="padding:14px 0;${last ? "" : `border-bottom:1px solid ${LINE};`}">
      <p style="margin:0 0 4px;font-family:${FONT};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(244,242,242,0.42);">${escapeHtml(label)}</p>
      <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.5;color:${OFFWHITE};">${escapeHtml(value)}</p>
    </td>
  </tr>`;
}

function requestPanel(lead: ContactLead, heading = "Your request") {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PANEL};border:1px solid ${LINE};border-radius:16px;">
    <tr>
      <td style="padding:22px 22px 8px;">
        <p style="margin:0;font-family:${FONT};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${ORANGE};font-weight:700;">${escapeHtml(heading)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:4px 22px 10px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${requestRow("●", "Name", lead.name)}
          ${requestRow("@", "Email", lead.email)}
          ${requestRow("#", "Phone", lead.phone ?? "")}
          ${requestRow("▣", "Service", serviceLabel(lead.service))}
          ${requestRow("✎", "Project message", lead.message, true)}
        </table>
      </td>
    </tr>
  </table>`;
}

function nextStep(n: string, title: string, copy: string) {
  return `<td width="33%" valign="top" style="padding:8px 10px;">
    <p style="margin:0 0 8px;font-family:${FONT};font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:${ORANGE};font-weight:700;">${n}</p>
    <p style="margin:0 0 6px;font-family:${FONT};font-size:14px;font-weight:700;color:${OFFWHITE};">${escapeHtml(title)}</p>
    <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.55;color:${MUTED};">${escapeHtml(copy)}</p>
  </td>`;
}

function brandShell(options: {
  preheader: string;
  status: string;
  title: string;
  innerHtml: string;
}) {
  const year = new Date().getFullYear();
  const site = siteConfig.url;
  const social = siteConfig.social;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BLACK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BLACK};">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BLACK};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${CARD};border:1px solid ${LINE};border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 18px;border-bottom:1px solid rgba(240,87,7,0.28);">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle" style="padding-right:12px;">${logoMark(36)}</td>
                  <td valign="middle">
                    <p style="margin:0;font-family:${FONT};font-size:13px;letter-spacing:0.28em;text-transform:uppercase;color:${OFFWHITE};font-weight:700;">Brand Mafia</p>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-family:${FONT};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${ORANGE};">● &nbsp;${escapeHtml(options.status)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 12px;">
              ${options.innerHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;border-top:1px solid ${LINE};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top" style="padding-top:18px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="middle" style="padding-right:10px;">${logoMark(28)}</td>
                        <td valign="middle">
                          <p style="margin:0;font-family:${FONT};font-size:14px;font-weight:700;color:${OFFWHITE};">Brand Mafia</p>
                          <p style="margin:4px 0 0;font-family:${FONT};font-size:12px;color:${MUTED};">Building brands that dominate.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-family:${FONT};font-size:12px;color:${MUTED};">
                    Need to add something? Reply to this email.
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;font-family:${FONT};font-size:11px;line-height:1.7;color:rgba(244,242,242,0.38);">
                    © ${year} Brand Mafia. All rights reserved.<br />
                    <a href="${site}" style="color:${ORANGE};text-decoration:none;">Website</a>
                    &nbsp;·&nbsp;
                    <a href="${site}/privacy" style="color:${ORANGE};text-decoration:none;">Privacy Policy</a>
                    &nbsp;·&nbsp;
                    <a href="${social.instagram}" style="color:${ORANGE};text-decoration:none;">Instagram</a>
                    &nbsp;·&nbsp;
                    <a href="${social.linkedin}" style="color:${ORANGE};text-decoration:none;">LinkedIn</a>
                    &nbsp;·&nbsp;
                    <a href="${social.twitter}" style="color:${ORANGE};text-decoration:none;">X</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;font-family:${FONT};font-size:11px;color:rgba(244,242,242,0.32);">
                    If you didn't submit this request, you can ignore this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export type ContactLead = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

export function contactUserEmail(lead: ContactLead) {
  const first = firstName(lead.name);
  const title = `Thanks, ${first}. We've got your request.`;

  const innerHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td valign="top" width="64" style="padding:0 16px 18px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td width="56" height="56" align="center" valign="middle" style="width:56px;height:56px;border:2px solid ${ORANGE};border-radius:50%;box-shadow:0 0 18px rgba(240,87,7,0.35);color:${ORANGE};font-family:${FONT};font-size:22px;font-weight:700;line-height:56px;">✓</td>
            </tr>
          </table>
        </td>
        <td valign="middle" style="padding:0 0 18px;">
          <h1 style="margin:0;font-family:${FONT};font-size:26px;line-height:1.25;color:${OFFWHITE};font-weight:700;">${escapeHtml(title)}</h1>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 12px;font-family:${FONT};font-size:15px;line-height:1.7;color:${MUTED};">We've got your details. A strategist will review them and get back to you soon.</p>
    <p style="margin:0 0 24px;font-family:${FONT};font-size:15px;line-height:1.7;color:${MUTED};">If this is time-sensitive, reply to this email and we'll prioritise it.</p>
    ${requestPanel(lead)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td align="center" style="padding:8px 0 18px;">
          <p style="margin:0;font-family:${FONT};font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${ORANGE};">— &nbsp;What happens next&nbsp; —</p>
        </td>
      </tr>
      <tr>
        ${nextStep("01", "We review", "We look through your goals, scope and context.")}
        ${nextStep("02", "We respond", "A strategist will reply with the right next step.")}
        ${nextStep("03", "We talk", "If it makes sense, we'll schedule a focused call.")}
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;">
      <tr>
        <td align="center" style="padding:10px 0 8px;">
          <a href="${escapeHtml(siteConfig.calendly)}" style="display:inline-block;background:${ORANGE};color:${BLACK};font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:999px;">Book a Strategy Call →</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 0 22px;font-family:${FONT};font-size:12px;color:rgba(244,242,242,0.38);">Already booked? You're all set.</td>
      </tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td width="3" style="background:${ORANGE};border-radius:2px;"></td>
        <td style="padding:2px 0 2px 16px;font-family:${FONT};font-size:14px;line-height:1.65;color:${OFFWHITE};">No sales maze. No endless back-and-forth. We'll tell you clearly what makes sense from here.</td>
      </tr>
    </table>
  `;

  return {
    subject: "We received your request — Brand Mafia",
    html: brandShell({
      preheader: "Thanks for reaching out. We will connect with you soon.",
      status: "Request received",
      title,
      innerHtml,
    }),
    text: `Hi ${first},\n\nWe've got your request and will connect with you soon.\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone || "-"}\nService: ${serviceLabel(lead.service) || "-"}\n\n${lead.message}\n\nBook a call: ${siteConfig.calendly}\n\n— Brand Mafia`,
  };
}

export function contactAdminEmail(lead: ContactLead) {
  const innerHtml = `
    <h1 style="margin:0 0 12px;font-family:${FONT};font-size:26px;line-height:1.25;color:${OFFWHITE};font-weight:700;">New lead from the contact form.</h1>
    <p style="margin:0 0 22px;font-family:${FONT};font-size:15px;line-height:1.7;color:${MUTED};">${escapeHtml(lead.name)} just submitted a request. Details are below — reply to this email to reach them directly.</p>
    ${requestPanel(lead, "Lead details")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td align="center">
          <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:${ORANGE};color:${BLACK};font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:999px;">Reply to ${escapeHtml(firstName(lead.name))} →</a>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `New lead: ${lead.name} — Contact form`,
    html: brandShell({
      preheader: `${lead.name} submitted the contact form.`,
      status: "New lead",
      title: "New lead from the contact form.",
      innerHtml,
    }),
    text: `New contact lead\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone ?? "-"}\nService: ${serviceLabel(lead.service) || "-"}\n\n${lead.message}`,
  };
}

export function newsletterUserEmail(email: string) {
  const innerHtml = `
    <h1 style="margin:0 0 12px;font-family:${FONT};font-size:26px;line-height:1.25;color:${OFFWHITE};font-weight:700;">You're in. Growth notes are on the way.</h1>
    <p style="margin:0 0 22px;font-family:${FONT};font-size:15px;line-height:1.7;color:${MUTED};">Thanks for subscribing as ${escapeHtml(email)}. We'll send practical notes on SEO, ads, and brand — not a daily blast.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="${siteConfig.url}" style="display:inline-block;background:${ORANGE};color:${BLACK};font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;padding:14px 26px;border-radius:999px;">Visit Brand Mafia →</a>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: "You're on the list — Brand Mafia",
    html: brandShell({
      preheader: "Thanks for subscribing to Brand Mafia insights.",
      status: "Newsletter",
      title: "You're in. Growth notes are on the way.",
      innerHtml,
    }),
    text: `Thanks for subscribing (${email}) to the Brand Mafia newsletter.\n\n— Brand Mafia`,
  };
}

export function newsletterAdminEmail(email: string, source: string) {
  const innerHtml = `
    <h1 style="margin:0 0 12px;font-family:${FONT};font-size:26px;line-height:1.25;color:${OFFWHITE};font-weight:700;">Someone joined the list.</h1>
    <p style="margin:0 0 22px;font-family:${FONT};font-size:15px;line-height:1.7;color:${MUTED};">A new subscriber just signed up.</p>
    ${requestPanel(
      {
        name: "Newsletter",
        email,
        service: source,
        message: "New newsletter subscriber.",
      },
      "Subscriber"
    )}
  `;

  return {
    subject: `New newsletter subscriber: ${email}`,
    html: brandShell({
      preheader: `${email} joined the newsletter.`,
      status: "New subscriber",
      title: "Someone joined the list.",
      innerHtml,
    }),
    text: `New newsletter subscriber: ${email}\nSource: ${source}`,
  };
}
