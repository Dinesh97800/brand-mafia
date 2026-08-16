"use client";

import { useEffect, useState } from "react";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { team } from "@/data/site";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { FadeUp } from "@/components/ui/SectionHeading";
import { assetPath } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import styles from "./TeamSection.module.css";

type ShapeId = "eight" | "arch" | "oval" | "stack";

const memberVisuals: { shape: ShapeId; color: string; cutout: string }[] = [
  { shape: "eight", color: "#5831FF", cutout: "/images/team/alex.png" },
  { shape: "arch", color: "#FF9C5E", cutout: "/images/team/jordan.png" },
  { shape: "oval", color: "#E6E88B", cutout: "/images/team/mia.png" },
  { shape: "stack", color: "#42B6FF", cutout: "/images/team/chris.png" },
];

function ShapeGeometry({ shape }: { shape: ShapeId }) {
  switch (shape) {
    case "eight":
      return (
        <path d="M100 6c42 0 72 32 72 78 0 28-16 48-36 58 20 10 36 30 36 58 0 46-30 78-72 78s-72-32-72-78c0-28 16-48 36-58-20-10-36-30-36-58C28 38 58 6 100 6Z" />
      );
    case "arch":
      return (
        <path d="M18 256V108C18 46 62 6 100 6s82 40 82 102v148H18Z" />
      );
    case "oval":
      return <ellipse cx="100" cy="130" rx="78" ry="122" />;
    case "stack":
      return (
        <>
          <rect x="44" y="12" width="112" height="100" rx="50" />
          <rect x="10" y="76" width="180" height="108" rx="54" />
          <rect x="44" y="148" width="112" height="100" rx="50" />
        </>
      );
  }
}

function TeamPortrait({
  shape,
  color,
  src,
  name,
  clipId,
}: {
  shape: ShapeId;
  color: string;
  src: string;
  name: string;
  clipId: string;
}) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageSrc(assetPath(src));
  }, [src]);

  return (
    <svg
      viewBox="0 0 200 260"
      className={styles.portraitSvg}
      role="img"
      aria-label={name}
    >
      <defs>
        <clipPath id={clipId}>
          <ShapeGeometry shape={shape} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect width="200" height="260" fill={color} />
        {imageSrc ? (
          <image
            href={imageSrc}
            xlinkHref={imageSrc}
            x="0"
            y="0"
            width="200"
            height="260"
            preserveAspectRatio="xMidYMin slice"
            className={styles.photo}
          />
        ) : null}
      </g>
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function TeamCard({
  member,
  visual,
  index,
}: {
  member: (typeof team)[number];
  visual: (typeof memberVisuals)[number];
  index: number;
}) {
  return (
    <FadeUp delay={index * 0.1}>
      <motion.article
        className={cn(styles.card, "text-center")}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className={styles.portraitWrap}>
          <TeamPortrait
            shape={visual.shape}
            color={visual.color}
            src={visual.cutout}
            name={member.name}
            clipId={`team-clip-${index}`}
          />
        </div>

        <h3 className="mt-6 font-heading text-lg font-semibold tracking-tight text-offwhite md:text-xl">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-offwhite/45">{member.role}</p>

        <div className="mt-3 flex items-center justify-center gap-3.5">
          <a
            href={member.social.twitter}
            aria-label={`${member.name} on X`}
            className={styles.socialLink}
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={member.social.linkedin}
            aria-label={`${member.name} on LinkedIn`}
            className={styles.socialLink}
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.article>
    </FadeUp>
  );
}

export function TeamSection() {
  return (
    <section className="section-padding relative bg-black" aria-label="Team">
      <div className="container-custom">
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <BlurRevealText
            as="h2"
            trigger="inView"
            className="font-heading text-3xl font-bold leading-[1.2] tracking-tight text-offwhite sm:text-4xl md:text-5xl lg:text-[3.35rem]"
          >
            Meet the creative minds behind{" "}
            <span className="font-accent text-[1.15em] font-medium italic">
              our success
            </span>
          </BlurRevealText>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 md:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
          {team.map((member, i) => (
            <TeamCard
              key={member.name}
              member={member}
              visual={memberVisuals[i % memberVisuals.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
