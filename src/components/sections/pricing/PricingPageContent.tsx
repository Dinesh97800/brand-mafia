"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  FileText,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  TrendingUp,
  User,
} from "lucide-react";
import { lalajiCaseStudy } from "@/data/case-studies/lalaji";
import { services, siteConfig } from "@/data/site";
import { PricingSection } from "@/components/sections/PricingSection";
import { FadeUp } from "@/components/ui/SectionHeading";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
import { Button } from "@/components/ui/Button";
import { LocalImage } from "@/components/ui/LocalImage";
import {
  RecaptchaBox,
  getRecaptchaToken,
  resetRecaptcha,
} from "@/components/forms/RecaptchaBox";
import { postForm } from "@/lib/api-client";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-12 pr-4 text-sm text-offwhite placeholder:text-offwhite/30 transition-colors focus:border-orange/50 focus:outline-none";

const trustItems = ["No Obligation", "Quick Response", "100% Confidential"];

const whatsappHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;

const connectMethods = [
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone,
    href: siteConfig.calendly,
  },
  {
    icon: Calendar,
    label: "Book a Call",
    value: "Schedule a free strategy call",
    href: siteConfig.calendly,
  },
  {
    icon: MessageCircle,
    label: "Chat on WhatsApp",
    value: "Quick chat with our team",
    href: whatsappHref,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "We typically respond within a few hours",
    href: null,
  },
  {
    icon: FileText,
    label: "Send a Brief",
    value: "Share your requirements with us",
    href: "#project-form",
  },
];

const featuredStats = [
  { icon: TrendingUp, value: "2.4M+", label: "People Reached" },
  { icon: Calendar, value: "8K+", label: "Appointments Generated" },
  { icon: MapPin, value: "6", label: "Locations Across Nova Scotia" },
];

export function PricingPageContent() {
  const recaptchaId = useRef<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formMessage, setFormMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus("idle");
    setFormMessage("");

    const recaptchaToken = getRecaptchaToken(recaptchaId.current);
    if (!recaptchaToken) {
      setFormStatus("error");
      setFormMessage("Please confirm you are not a robot.");
      return;
    }

    try {
      await postForm("/api/contact", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        source: "pricing",
        website: data.website,
        recaptchaToken,
      });
      setFormStatus("success");
      setFormMessage(
        "Request received. Check your inbox — we will connect with you soon."
      );
      reset();
      resetRecaptcha(recaptchaId.current);
    } catch (error) {
      resetRecaptcha(recaptchaId.current);
      setFormStatus("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Could not send your message. Please try again."
      );
    }
  };

  return (
    <>
      <section className="relative flex min-h-[78vh] flex-col justify-center overflow-hidden pt-28 pb-16 sm:pt-32 md:min-h-[88vh] md:pb-24">
        <LocalImage
          src="/images/pricing-hero.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[72%_center] select-none"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="max-w-xl">
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
              Pricing
            </span>
            <BlurRevealText
              as="h1"
              trigger="mount"
              className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-offwhite sm:text-5xl lg:text-[3.4rem]"
            >
              Let&apos;s Build Your{" "}
              <span className="text-orange">Empire</span>
            </BlurRevealText>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-offwhite/70 sm:text-base md:text-lg">
              Ready to dominate your market? Let&apos;s talk strategy and
              create a growth plan that drives real results.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-offwhite/80"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-black">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-8 sm:px-6 lg:px-8 xl:px-16">
        <div className="container-custom">
          <FadeUp className="mb-10 text-center">
            <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              Ways to Connect
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-5xl">
              We Make It Easy to Reach Us.
            </h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {connectMethods.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-sm font-semibold text-offwhite">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm text-offwhite/50">
                      {value}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-offwhite/25 transition-colors group-hover:text-orange" />
                </>
              );

              const className =
                "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 transition-colors hover:border-orange/30";

              if (!href) {
                return (
                  <div key={label} className={className}>
                    {inner}
                  </div>
                );
              }

              if (href.startsWith("#")) {
                return (
                  <a key={label} href={href} className={className}>
                    {inner}
                  </a>
                );
              }

              const isExternal = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  className={className}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="relative px-4 py-8 sm:px-6 md:py-12 lg:px-8 xl:px-16">
        <div className="container-custom">
          <FadeUp className="mb-10 text-center">
            <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              Featured Case Study
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-5xl">
              Real Strategy. Real Results.
            </h2>
          </FadeUp>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr_0.85fr]">
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-orange">
                  {lalajiCaseStudy.tags[0]}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold leading-tight text-offwhite sm:text-3xl">
                  From Local Barbershop to a Growing{" "}
                  <span className="text-orange">Nova Scotia Brand</span>
                </h3>
                <ul className="mt-6 space-y-3">
                  {lalajiCaseStudy.approach.points.slice(0, 4).map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-black">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-offwhite/70">{point}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={`/case-studies/${lalajiCaseStudy.slug}`}
                  variant="secondary"
                  className="mt-8 w-fit"
                  magnetic
                >
                  View Case Study
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative min-h-[240px] lg:min-h-[420px]">
                <LocalImage
                  src={lalajiCaseStudy.heroImage}
                  alt={lalajiCaseStudy.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center gap-6 border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                {featuredStats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-heading text-2xl font-bold text-offwhite">
                        {value}
                      </p>
                      <p className="mt-0.5 text-sm text-offwhite/50">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="project-form"
        className="section-padding relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-10" />
        <div className="container-custom relative">
          <FadeUp className="mb-10 text-center">
            <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              Let&apos;s Work Together
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-5xl">
              Tell Us About Your{" "}
              <span className="text-orange">Project</span>
            </h2>
          </FadeUp>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10"
            aria-label="Project inquiry form"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
              {...register("website")}
            />

            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orange" />
                  <label htmlFor="pricing-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="pricing-name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your Name"
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-orange">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orange" />
                  <label htmlFor="pricing-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="pricing-email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email Address"
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-orange">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orange" />
                  <label htmlFor="pricing-phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="pricing-phone"
                    {...register("phone")}
                    placeholder="Phone Number"
                    className={fieldClass}
                  />
                </div>
                <div className="relative">
                  <FileText className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orange" />
                  <label htmlFor="pricing-service" className="sr-only">
                    Service
                  </label>
                  <select
                    id="pricing-service"
                    {...register("service")}
                    className={`${fieldClass} appearance-none [&_option]:bg-white [&_option]:text-black`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="pricing-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="pricing-message"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Tell us about your project..."
                  className="h-full min-h-[220px] w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-offwhite placeholder:text-offwhite/30 transition-colors focus:border-orange/50 focus:outline-none lg:min-h-0"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-orange">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <RecaptchaBox
                onReady={(id) => {
                  recaptchaId.current = id;
                }}
              />
              <Button
                type="submit"
                className="w-full"
                magnetic
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              {formMessage && (
                <p
                  className={`text-center text-sm ${
                    formStatus === "success"
                      ? "text-amber-400/90"
                      : "text-orange"
                  }`}
                  role="status"
                >
                  {formMessage}
                </p>
              )}
              <p className="flex items-center justify-center gap-2 text-center text-[11px] text-offwhite/35">
                <Lock className="h-3 w-3" />
                Your information is safe with us. We never share your data.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
