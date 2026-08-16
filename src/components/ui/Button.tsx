"use client";

import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      magnetic = false,
      className,
      children,
      onClick,
      type = "button",
      ariaLabel,
      disabled = false,
    },
    ref
  ) => {
    const magneticRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!magnetic || !magneticRef.current) return;
      const rect = magneticRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magneticRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const handleMouseLeave = () => {
      if (!magneticRef.current) return;
      magneticRef.current.style.transform = "translate(0, 0)";
    };

    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wide transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap";

    const variants = {
      primary:
        "bg-orange text-black shadow-[0_0_30px_rgba(240,87,7,0.3)] hover:shadow-[0_0_50px_rgba(240,87,7,0.5)] hover:scale-105",
      secondary:
        "bg-transparent border border-orange text-orange hover:bg-orange/10 hover:scale-105",
      ghost: "bg-transparent text-offwhite hover:text-orange",
    };

    const sizes = {
      sm: "px-5 py-2 text-sm",
      md: "px-7 py-3 text-sm",
      lg: "px-9 py-4 text-base",
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      magnetic && "will-change-transform",
      className
    );

    const magneticHandlers = magnetic
      ? { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
      : {};

    if (href) {
      return (
        <Link
          ref={magnetic ? magneticRef : undefined}
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel}
          {...magneticHandlers}
        >
          {children}
        </Link>
      );
    }

    return (
      <motion.button
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          if (magnetic && node) {
            (magneticRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }
        }}
        type={type}
        disabled={disabled}
        className={cn(classes, disabled && "pointer-events-none opacity-60")}
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        aria-label={ariaLabel}
        {...magneticHandlers}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
