type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(token: string, ip?: string) {
  const secret = (process.env.RECAPTCHA_SECRET_KEY ?? "").trim();
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is missing");
    return false;
  }

  if (!token) return false;

  const params = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip && ip !== "unknown") params.set("remoteip", ip);

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = (await response.json()) as SiteVerifyResponse;
  if (!data.success) {
    console.warn("[recaptcha] verification failed", data["error-codes"]);
  }
  return data.success;
}
