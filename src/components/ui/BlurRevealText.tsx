"use client";

import React, {
  isValidElement,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type WordSegment = {
  key: string;
  text: string;
  wrap?: (text: string) => ReactNode;
};

type BlurRevealTextProps = {
  as?: ElementType;
  className?: string;
  trigger?: "mount" | "inView";
  staggerMs?: number;
  durationMs?: number;
  text?: string;
  children?: ReactNode;
};

let segmentKey = 0;

function extractWordSegments(
  node: ReactNode,
  inheritWrap?: (text: string) => ReactNode
): WordSegment[] {
  const segments: WordSegment[] = [];

  if (node == null || node === false) return segments;

  if (typeof node === "string" || typeof node === "number") {
    String(node)
      .split(/(\s+)/)
      .forEach((token) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          segments.push({
            key: `space-${segmentKey++}`,
            text: "\u00A0",
            wrap: inheritWrap,
          });
        } else {
          segments.push({
            key: `word-${segmentKey++}`,
            text: token,
            wrap: inheritWrap,
          });
        }
      });
    return segments;
  }

  if (Array.isArray(node)) {
    node.forEach((child) => {
      segments.push(...extractWordSegments(child, inheritWrap));
    });
    return segments;
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const elementWrap = (text: string) => {
      const inner = inheritWrap ? inheritWrap(text) : text;
      return cloneElement(node, { key: undefined }, inner);
    };
    segments.push(...extractWordSegments(node.props.children, elementWrap));
  }

  return segments;
}

function isElementInView(el: HTMLElement, minRatio = 0.08): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (rect.height <= 0) return false;

  const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  const ratio = visibleHeight / rect.height;

  return ratio >= minRatio && rect.bottom > 0 && rect.top < vh;
}

export function BlurRevealText({
  as: Tag = "h2",
  className,
  trigger = "inView",
  staggerMs = 80,
  durationMs = 700,
  text,
  children,
}: BlurRevealTextProps) {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(trigger === "mount");

  const segments = useMemo(() => {
    segmentKey = 0;
    if (text != null) return extractWordSegments(text);
    return extractWordSegments(children);
  }, [text, children]);

  useEffect(() => {
    if (trigger === "mount") {
      setRevealed(true);
    }
  }, [trigger]);

  useEffect(() => {
    if (trigger !== "inView" || revealed) return;

    const el = rootRef.current;
    if (!el) return;

    let cancelled = false;
    const reveal = () => {
      if (!cancelled) setRevealed(true);
    };

    const checkVisibility = () => {
      if (isElementInView(el)) reveal();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.08) {
            reveal();
            break;
          }
        }
      },
      {
        threshold: [0, 0.08, 0.1, 0.25],
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(el);
    checkVisibility();

    const t1 = window.setTimeout(checkVisibility, 100);
    const t2 = window.setTimeout(checkVisibility, 400);

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [trigger, revealed]);

  const duration = prefersReducedMotion ? 200 : durationMs;

  return (
    <Tag ref={rootRef} className={cn("blur-reveal-heading", className)}>
      <span className="blur-reveal-inner inline">
        {segments.map((segment, index) => {
          const content = segment.wrap
            ? segment.wrap(segment.text)
            : segment.text;

          const wordStyle = {
            "--blur-duration": `${duration}ms`,
            "--blur-delay": `${index * staggerMs}ms`,
          } as CSSProperties;

          return (
            <span
              key={segment.key}
              className={cn(
                "blur-reveal-word inline-block",
                revealed &&
                  (prefersReducedMotion
                    ? "blur-reveal-word--animate-reduced"
                    : "blur-reveal-word--animate")
              )}
              style={wordStyle}
            >
              {content}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
