"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  Check,
  Clock,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { services, siteConfig } from "@/data/site";
import { FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BlurRevealText } from "@/components/ui/BlurRevealText";
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
  "min-w-0 w-full max-w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-offwhite placeholder:text-offwhite/30 transition-colors focus:border-orange/50 focus:outline-none";

const trustItems = [
  "No Obligation",
  "Quick Response",
  "100% Confidential",
];

const reasons = [
  {
    title: "Strategy First",
    description: "Every campaign starts with a plan built around your market, offer, and goals.",
    icon: Target,
  },
  {
    title: "Results Focused",
    description: "We measure what matters — leads, bookings, and revenue, not vanity metrics.",
    icon: BarChart3,
  },
  {
    title: "Expert Team",
    description: "Specialists in SEO, ads, brand, and web working as one growth unit.",
    icon: Users,
  },
  {
    title: "Transparent",
    description: "Clear reporting, honest recommendations, and no black-box retainers.",
    icon: ShieldCheck,
  },
];

export function ContactSection({ variant = "embed" }: { variant?: "embed" | "page" }) {
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
        source: "contact",
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

  const methods = [
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
  ];

  return (
    <section
      id="contact"
      className={
        variant === "page"
          ? "relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
          : "section-padding relative overflow-hidden"
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-10" />

      <div
        className={
          variant === "page"
            ? "container-custom relative px-4 sm:px-6 lg:px-8 xl:px-16"
            : "container-custom relative"
        }
      >
        {variant === "page" ? (
          <div className="mb-12 grid items-center gap-10 lg:mb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div>
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.32em] text-orange">
                Contact Us
              </span>
              <BlurRevealText
                as="h1"
                trigger="mount"
                className="mt-4 max-w-xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-offwhite sm:text-5xl lg:text-[3.4rem]"
              >
                Let&apos;s Build Your Digital{" "}
                <span className="text-orange">Empire</span>
              </BlurRevealText>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-offwhite/55 sm:text-base md:text-lg">
                Ready to dominate your market? Let&apos;s talk strategy and
                create a growth plan that drives real results.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {trustItems.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-sm text-offwhite/75"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-black">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <LocalImage
                src="/images/contact-hero.jpg"
                alt="Brand Mafia — strategy that dominates"
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        ) : (
          <FadeUp className="mb-12 md:mb-16">
            <span className="mb-4 inline-block font-heading text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              Contact
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl md:text-5xl">
              Let&apos;s Build Your{" "}
              <span className="text-orange">Empire</span>
            </h2>
            <p className="mt-4 max-w-xl text-offwhite/55">
              Ready to dominate your market? Let&apos;s talk strategy.
            </p>
          </FadeUp>
        )}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:rounded-3xl">
          <div className="grid min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex min-w-0 flex-col justify-between border-b border-white/10 p-4 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <h2 className="font-heading text-xl font-bold text-offwhite sm:text-2xl">
                  Let&apos;s Start a Conversation
                </h2>
                <div className="mt-6 space-y-3 sm:mt-8">
                  {methods.map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3.5 transition-colors hover:border-orange/30 sm:gap-4 sm:px-4 sm:py-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange sm:h-11 sm:w-11">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-sm font-semibold text-offwhite">
                          {label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-offwhite/50">
                          {value}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-offwhite/40 sm:mt-8">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange" />
                We typically respond within a few hours during business days.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative min-w-0 space-y-4 p-4 sm:p-8 lg:p-10"
              aria-label="Contact form"
            >
              <h2 className="font-heading text-xl font-bold text-offwhite sm:text-2xl">
                Send Us a Message
              </h2>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
                {...register("website")}
              />
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className={fieldClass}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-orange">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
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
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    placeholder="Phone Number"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="sr-only">
                  Service
                </label>
                <select
                  id="service"
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

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className={`${fieldClass} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-orange">
                    {errors.message.message}
                  </p>
                )}
              </div>

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
            </form>
          </div>
        </div>

        {variant === "page" && (
          <div className="mt-16 md:mt-20">
            <h2 className="max-w-2xl font-heading text-3xl font-bold text-offwhite sm:text-4xl md:text-5xl">
              We Don&apos;t Just Market.{" "}
              <span className="text-orange">We Dominate.</span>
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((item) => (
                <div key={item.title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-offwhite">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/50">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
