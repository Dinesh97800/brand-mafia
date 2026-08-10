"use client";

import { useEffect, useState } from "react";
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
  const [resolvedSrc, setResolvedSrc] = useState<string>("");

  useEffect(() => {
    setResolvedSrc(assetPath(src));
  }, [src]);

  if (!resolvedSrc) {
    return (
      <span
        className={className}
        style={{ width, height, display: "inline-block" }}
        aria-hidden="true"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
