"use client";

import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Palette,
  Search,
  Target,
  Code2,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveSelectorOption {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
  href?: string;
}

export interface InteractiveSelectorProps {
  options?: InteractiveSelectorOption[];
  heading?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_OPTIONS: InteractiveSelectorOption[] = [
  {
    title: "Luxora Rebrand",
    description: "Complete brand transformation for a luxury skincare line.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    icon: <Palette size={24} className="text-white" />,
    href: "/case-studies/luxora-rebrand",
  },
  {
    title: "TechVault SEO",
    description: "Organic traffic domination for a SaaS startup.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    icon: <Search size={24} className="text-white" />,
    href: "/case-studies/techvault-seo",
  },
  {
    title: "PrimeFit Campaign",
    description: "Multi-channel paid media strategy for a fitness brand.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    icon: <Target size={24} className="text-white" />,
    href: "/case-studies/primefit-ads",
  },
  {
    title: "NovaLabs Platform",
    description: "Award-winning web experience for an AI startup.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    icon: <Code2 size={24} className="text-white" />,
    href: "/case-studies/novalabs-web",
  },
  {
    title: "AuraSkin Social",
    description: "Viral social media strategy for a beauty brand.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    icon: <Share2 size={24} className="text-white" />,
    href: "/case-studies/auraskin-social",
  },
];

function InteractiveSelector({
  options = DEFAULT_OPTIONS,
  heading,
  subtitle,
  className,
}: InteractiveSelectorProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }

    const href = options[index]?.href;
    if (href) router.push(href);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionClick(index);
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setAnimatedOptions(options.map((_, i) => i));
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => (prev.includes(i) ? prev : [...prev, i]));
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options.length]);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center font-sans text-white",
        className
      )}
    >
      {(heading || subtitle) && (
        <div className="mb-2 mt-2 w-full max-w-2xl px-6 text-center">
          {heading && (
            <h2 className="animate-fadeInTop mb-3 font-heading text-4xl font-extrabold tracking-tight text-white drop-shadow-lg delay-300 md:text-5xl">
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className="animate-fadeInTop mx-auto max-w-xl text-lg font-medium text-offwhite/70 delay-600 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {(heading || subtitle) && <div className="h-12" />}

      <div
        className="options relative mx-auto flex h-[520px] w-full max-w-[1100px] min-w-0 flex-col items-stretch overflow-hidden rounded-2xl md:h-[400px] md:flex-row"
        role="listbox"
        aria-label="Case studies"
        aria-activedescendant={`selector-option-${activeIndex}`}
      >
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          const isAnimated = animatedOptions.includes(index);

          return (
            <div
              key={`${option.title}-${index}`}
              id={`selector-option-${index}`}
              role="option"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                "option relative flex cursor-pointer flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-inset",
                isActive && "active"
              )}
              style={{
                backfaceVisibility: "hidden",
                opacity: isAnimated ? 1 : 0,
                transform: isAnimated ? "translateX(0)" : "translateX(-60px)",
                minWidth: "120px",
                minHeight: "72px",
                margin: 0,
                borderRadius: 0,
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: isActive ? "#F05707" : "#292929",
                backgroundColor: "#18181b",
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.50)"
                  : "0 10px 30px rgba(0,0,0,0.30)",
                flex: isActive ? "5 1 0%" : "1.6 1 0%",
                zIndex: isActive ? 10 : 1,
                willChange: "flex-grow, box-shadow",
              }}
              onClick={() => handleOptionClick(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <div
                className="pointer-events-none absolute inset-0 transition-all duration-700 ease-in-out"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: isActive ? "auto 100%" : "auto 120%",
                  backgroundPosition: "center",
                  filter: isActive
                    ? "grayscale(0) brightness(1)"
                    : "grayscale(1) brightness(0.55)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  backgroundColor: isActive
                    ? "transparent"
                    : "rgba(0, 0, 0, 0.45)",
                }}
              />
              <div
                className="shadow pointer-events-none absolute left-0 right-0 z-[1] transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? "0" : "-40px",
                  height: "120px",
                  boxShadow: isActive
                    ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                    : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                }}
              />

              <div className="label pointer-events-none absolute bottom-5 left-0 right-0 z-[2] flex min-h-12 w-full items-center justify-start gap-3 px-4">
                <div
                  className={cn(
                    "flex h-[44px] max-w-[44px] min-w-[44px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-full border-2 bg-[rgba(32,32,32,0.85)] shadow-[0_1px_4px_rgba(0,0,0,0.18)] backdrop-blur-[10px] transition-all duration-200",
                    isActive ? "border-orange" : "border-[#444]"
                  )}
                >
                  {option.icon}
                </div>
                <div className="info relative min-w-0 flex-1 overflow-hidden text-white">
                  <div
                    className="main font-heading text-lg font-bold transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub truncate text-sm text-gray-300 transition-all duration-700 ease-in-out md:text-base"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(25px)",
                    }}
                  >
                    {option.description}
                  </div>
                </div>
                {option.href && (
                  <ArrowUpRight
                    className="ml-auto h-5 w-5 shrink-0 text-orange transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(12px)",
                    }}
                    aria-hidden
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { InteractiveSelector };
export default InteractiveSelector;
