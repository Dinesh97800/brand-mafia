/**
 * GitHub Pages serves project sites at /{repo-name}/.
 * Prefix public asset paths so videos, images, etc. load in deployment.
 */
export function getBasePath(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (fromEnv) return fromEnv;

  if (typeof window !== "undefined") {
    const { hostname, pathname } = window.location;
    if (hostname.endsWith("github.io")) {
      const segment = pathname.split("/").filter(Boolean)[0];
      if (segment) return `/${segment}`;
    }
  }

  return "";
}

export function assetPath(path: string): string {
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const basePath = getBasePath();
