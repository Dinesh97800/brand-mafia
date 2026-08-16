const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/$/, "");

export async function postForm<T extends Record<string, unknown>>(
  path: "/api/contact" | "/api/newsletter",
  payload: T
) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: { ok?: boolean; error?: string } = {};
  try {
    data = (await response.json()) as { ok?: boolean; error?: string };
  } catch {
    data = {};
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
}
