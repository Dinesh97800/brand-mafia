"use client";

import { assetPath } from "@/lib/base-path";

interface LocalImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/** Local public-folder images with correct GitHub Pages basePath. */
export function LocalImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
}: LocalImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetPath(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
