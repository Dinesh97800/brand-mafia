"use client";

import { useEffect } from "react";

const RELOAD_KEY = "bm-chunk-reload";

function isChunkFailure(value: string) {
  return /ChunkLoadError|Loading chunk \d+ failed|Failed to fetch dynamically imported module/i.test(
    value
  );
}

export function ChunkLoadRecovery() {
  useEffect(() => {
    const clearFlag = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        /* ignore */
      }
    }, 4000);

    const recover = () => {
      try {
        if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
        sessionStorage.setItem(RELOAD_KEY, "1");
      } catch {
        /* continue */
      }
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => {
      const message = event.message || "";
      const filename = event.filename || "";
      if (isChunkFailure(message) || filename.includes("/_next/static/chunks/")) {
        recover();
      }
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { message?: string; name?: string } | string;
      const message =
        typeof reason === "string" ? reason : reason?.message || "";
      const name = typeof reason === "object" && reason ? reason.name : "";
      if (name === "ChunkLoadError" || isChunkFailure(message)) {
        recover();
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.clearTimeout(clearFlag);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
