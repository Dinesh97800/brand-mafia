import nodemailer from "nodemailer";
import { getMailConfig, isSmtpConfigured } from "./config";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!isSmtpConfigured()) return null;
  if (transporter) return transporter;

  const mail = getMailConfig();
  transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secure: mail.secure,
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });

  return transporter;
}

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}) {
  const transport = getTransporter();
  if (!transport) {
    console.warn("[mail] SMTP is not configured. Skipping send:", options.subject);
    return false;
  }

  const mail = getMailConfig();
  await transport.sendMail({
    from: mail.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  });

  return true;
}

export { isSmtpConfigured };
