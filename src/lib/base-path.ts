/**
 * GitHub Pages serves project sites at /{repo-name}/.
 * Prefix public asset paths so videos, images, etc. load in deployment.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export { basePath };
