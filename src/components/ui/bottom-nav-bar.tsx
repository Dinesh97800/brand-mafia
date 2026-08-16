"use client";

import { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  LineChart,
  CreditCard,
  MessageCircle,
  Trophy,
  User,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type BottomNavItem = {
  label: string;
  icon: LucideIcon;
  /** When set, the item renders as a link instead of a button. */
  href?: string;
};

const defaultNavItems: BottomNavItem[] = [
  { label: "Home", icon: Home },
  { label: "Portfolio", icon: LineChart },
  { label: "Transactions", icon: CreditCard },
  { label: "Messages", icon: MessageCircle },
  { label: "Rewards", icon: Trophy },
  { label: "Profile", icon: User },
];

const MOBILE_LABEL_WIDTH = 72;

type BottomNavBarProps = {
  items?: BottomNavItem[];
  className?: string;
  defaultIndex?: number;
  /** Controls the active item externally; falls back to internal state when omitted. */
  activeIndex?: number;
  onSelect?: (index: number) => void;
  stickyBottom?: boolean;
};

export function BottomNavBar({
  items = defaultNavItems,
  className,
  defaultIndex = 0,
  activeIndex,
  onSelect,
  stickyBottom = false,
}: BottomNavBarProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const currentIndex = activeIndex ?? internalIndex;

  const handleSelect = (index: number) => {
    if (activeIndex === undefined) setInternalIndex(index);
    onSelect?.(index);
  };

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn(
        "no-scrollbar flex h-[52px] max-w-[95vw] items-center space-x-1 overflow-x-auto rounded-full border border-white/[0.08] bg-black/80 p-2 shadow-xl backdrop-blur-xl sm:min-w-[320px]",
        stickyBottom && "fixed inset-x-0 bottom-4 z-20 mx-auto w-fit",
        className
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isActive = currentIndex === idx;

        const itemClasses = cn(
          "relative flex h-10 max-h-[44px] min-h-[40px] min-w-[44px] shrink-0 items-center justify-center gap-0 rounded-full px-3 py-2 transition-colors duration-200",
          isActive
            ? "gap-2 bg-orange/10 text-orange"
            : "bg-transparent text-offwhite/60 hover:bg-white/[0.06] hover:text-offwhite",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        );

        const itemContent = (
          <>
            <Icon
              size={22}
              strokeWidth={2}
              aria-hidden
              className="shrink-0 transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "8px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="flex max-w-[72px] items-center overflow-hidden"
            >
              <span
                className={cn(
                  "select-none overflow-hidden text-ellipsis whitespace-nowrap font-heading text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] font-medium leading-[1.9] transition-opacity duration-200",
                  isActive ? "text-orange" : "opacity-0"
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(itemClasses, "active:scale-[0.97]")}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleSelect(idx)}
            >
              {itemContent}
            </Link>
          );
        }

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            className={itemClasses}
            onClick={() => handleSelect(idx)}
            aria-label={item.label}
            aria-pressed={isActive}
            type="button"
          >
            {itemContent}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default BottomNavBar;
