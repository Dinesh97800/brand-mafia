"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/base-path";

export function BlogHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc(assetPath("/videos/blogs.mp4"));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    video.load();
    video.play().catch(() => {});
  }, [videoSrc]);

  const scrollToArticles = () => {
    document.getElementById("blog-articles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden md:min-h-[78vh]">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={videoSrc || undefined}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="container-custom relative z-10 px-4 pb-16 pt-32 sm:px-6 lg:px-8 xl:px-16 md:pt-36">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 inline-block font-heading text-xs font-semibold uppercase tracking-[0.35em] text-orange"
          >
            Our Blog
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-offwhite sm:text-5xl md:text-6xl lg:text-[4rem]"
          >
            Insights that drive{" "}
            <span className="bg-gradient-to-r from-orange via-[#ff8c42] to-orange bg-clip-text text-transparent">
              growth &amp; impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/55 md:text-lg"
          >
            Explore expert articles on digital marketing, SEO, branding, and
            growth strategies to help your business thrive in a competitive
            landscape.
          </motion.p>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={scrollToArticles}
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-orange/50 bg-black/40 px-7 py-3.5 font-heading text-sm font-semibold text-offwhite backdrop-blur-sm transition-all duration-300 hover:border-orange hover:bg-orange/10"
          >
            Explore Articles
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
