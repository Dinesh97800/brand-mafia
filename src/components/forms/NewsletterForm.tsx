"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { postForm } from "@/lib/api-client";
import { cn } from "@/lib/utils";

type Variant = "footer" | "sidebar" | "banner";

export function NewsletterForm({
  variant,
  source,
}: {
  variant: Variant;
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)
      ?.value;

    setStatus("loading");
    setMessage("");

    try {
      await postForm("/api/newsletter", {
        email,
        source,
        website: honeypot,
      });
      setStatus("success");
      setMessage("You're in. Check your inbox.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Could not subscribe."
      );
    }
  }

  const inputClass =
    variant === "footer"
      ? "flex-1 rounded-full bg-white/[0.05] border border-white/10 px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-orange/50 transition-colors"
      : variant === "sidebar"
        ? "w-full rounded-full border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-orange/40 focus:outline-none"
        : "flex-1 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-orange/40 focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "relative",
        variant === "sidebar" && "mt-5 space-y-3",
        variant === "banner" && "flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:max-w-md"
      )}
      aria-label="Newsletter signup"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <div
        className={cn(
          variant === "footer" && "flex gap-2",
          variant === "banner" && "flex w-full flex-col gap-3 sm:flex-row"
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={
            variant === "banner" ? "Enter your email" : "your@email.com"
          }
          className={inputClass}
          aria-label="Email address"
        />
        {variant === "footer" ? (
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-black transition-transform hover:scale-110 disabled:opacity-60"
            aria-label="Subscribe"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "font-heading text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-60",
              variant === "sidebar" && "w-full rounded-full bg-orange py-2.5",
              variant === "banner" && "shrink-0 rounded-full bg-orange px-6 py-3"
            )}
          >
            {status === "loading" ? "Joining..." : "Subscribe Now"}
          </button>
        )}
      </div>
      {message && (
        <p
          className={cn(
            "mt-2 text-xs",
            status === "success" ? "text-amber-400/90" : "text-orange"
          )}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
