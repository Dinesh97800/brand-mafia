const ORANGE = "#F05707";
const BLACK = "#020202";
const OFFWHITE = "#F4F2F2";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(options: {
  preheader: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const cta = options.ctaHref
    ? `<tr>
        <td style="padding: 8px 0 28px;">
          <a href="${escapeHtml(options.ctaHref)}" style="display:inline-block;background:${ORANGE};color:${BLACK};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px;">
            ${escapeHtml(options.ctaLabel ?? "Visit Brand Mafia")}
          </a>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BLACK};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BLACK};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0b0b0b;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 8px;border-bottom:1px solid rgba(240,87,7,0.25);">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:${ORANGE};font-weight:700;">Brand Mafia</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(244,242,242,0.45);">${escapeHtml(options.eyebrow)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:${OFFWHITE};font-weight:700;">${escapeHtml(options.title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:rgba(244,242,242,0.72);">
              ${options.bodyHtml}
            </td>
          </tr>
          ${cta}
          <tr>
            <td style="padding:8px 32px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:rgba(244,242,242,0.38);">
              Building brands that dominate.<br />
              If this was not you, you can ignore this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:120px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${ORANGE};">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${OFFWHITE};">${escapeHtml(value)}</td>
  </tr>`;
}

export type ContactLead = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

export function contactUserEmail(lead: ContactLead) {
  const first = lead.name.split(" ")[0] || lead.name;
  return {
    subject: "We received your request — Brand Mafia",
    html: layout({
      preheader: "Thanks for reaching out. We will connect with you soon.",
      eyebrow: "Request received",
      title: `Thanks, ${first}. We have your request.`,
      bodyHtml: `<p style="margin:0 0 14px;">We got your message and a strategist will review it shortly. You do not need to send anything else unless we ask.</p>
        <p style="margin:0;">If your project is time-sensitive, reply to this email and we will prioritise it.</p>`,
      ctaLabel: "Book a strategy call",
      ctaHref: "https://calendly.com/brandmafia/strategy-call",
    }),
    text: `Hi ${first},\n\nWe received your request and will connect with you soon.\n\n— Brand Mafia`,
  };
}

export function contactAdminEmail(lead: ContactLead) {
  return {
    subject: `New lead: ${lead.name} — Contact form`,
    html: layout({
      preheader: `${lead.name} submitted the contact form.`,
      eyebrow: "New lead",
      title: "Someone just reached out.",
      bodyHtml: `<p style="margin:0 0 18px;">A new contact request landed in the database. Details below.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Name", lead.name)}
          ${row("Email", lead.email)}
          ${row("Phone", lead.phone ?? "")}
          ${row("Service", lead.service ?? "")}
          ${row("Message", lead.message)}
        </table>`,
    }),
    text: `New contact lead\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone ?? "-"}\nService: ${lead.service ?? "-"}\n\n${lead.message}`,
  };
}

export function newsletterUserEmail(email: string) {
  return {
    subject: "You're on the list — Brand Mafia",
    html: layout({
      preheader: "Thanks for subscribing to Brand Mafia insights.",
      eyebrow: "Newsletter",
      title: "You're in. Growth notes are on the way.",
      bodyHtml: `<p style="margin:0;">Thanks for subscribing as ${escapeHtml(email)}. We will send practical notes on SEO, ads, and brand — not a daily blast.</p>`,
    }),
    text: `Thanks for subscribing (${email}) to the Brand Mafia newsletter.\n\n— Brand Mafia`,
  };
}

export function newsletterAdminEmail(email: string, source: string) {
  return {
    subject: `New newsletter subscriber: ${email}`,
    html: layout({
      preheader: `${email} joined the newsletter.`,
      eyebrow: "New subscriber",
      title: "Someone joined the list.",
      bodyHtml: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Email", email)}
          ${row("Source", source)}
        </table>`,
    }),
    text: `New newsletter subscriber: ${email}\nSource: ${source}`,
  };
}
