function read(name: string, fallback = "") {
  return (process.env[name] ?? fallback).trim();
}

function safeDbName(value: string) {
  return /^[A-Za-z0-9_]+$/.test(value) ? value : "brand_mafia";
}

export function getDbConfig() {
  return {
    host: read("MYSQL_HOST", "127.0.0.1"),
    port: Number(read("MYSQL_PORT", "3306")) || 3306,
    user: read("MYSQL_USER", "root"),
    password: read("MYSQL_PASSWORD", ""),
    database: safeDbName(read("MYSQL_DATABASE", "brand_mafia")),
  };
}

export function getMailConfig() {
  const port = Number(read("SMTP_PORT", "465")) || 465;
  const secureEnv = read("SMTP_SECURE");
  const secure =
    port === 465 ? true : secureEnv ? secureEnv === "true" : false;

  return {
    host: read("SMTP_HOST"),
    port,
    secure,
    user: read("SMTP_USER"),
    pass: read("SMTP_PASS"),
    from: read("MAIL_FROM", "Brand Mafia <hello@brandmafia.com>"),
    admin: read("MAIL_ADMIN", "hello@brandmafia.com"),
  };
}

export function isSmtpConfigured() {
  const mail = getMailConfig();
  return Boolean(mail.host && mail.user && mail.pass);
}
