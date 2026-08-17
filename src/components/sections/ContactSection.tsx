"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, MessageCircle, Calendar } from "lucide-react";
import { services, siteConfig } from "@/data/site";
import { SectionHeading, FadeUp } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
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

export function ContactSection() {
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

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-hero-glow opacity-10 pointer-events-none" />
      <div className="container-custom relative">
        <SectionHeading
          label="Contact"
          title="Let's Build Your Empire"
          description="Ready to dominate your market? Let's talk strategy."
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <FadeUp>
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: siteConfig.email,
                  href: `mailto:${siteConfig.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: siteConfig.phone,
                  href: `tel:${siteConfig.phone}`,
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: `${siteConfig.address.street}, ${siteConfig.address.city}`,
                  href: "#map",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-offwhite/40 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="text-offwhite group-hover:text-orange transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}

              <div className="flex gap-3 pt-4">
                <Button
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  external
                  variant="secondary"
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button href={siteConfig.calendly} external size="sm" magnetic>
                  <Calendar className="h-4 w-4" />
                  Book a Call
                </Button>
              </div>
            </div>

            <div id="map" className="mt-8 rounded-2xl overflow-hidden h-64 glass">
              <iframe
                title="Brand Mafia Office Location"
                src="https://maps.google.com/maps?q=New+York+NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-strong relative rounded-2xl p-8 space-y-5"
              aria-label="Contact form"
            >
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
                  className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-orange/50 transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-orange">{errors.name.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email Address"
                    className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-orange/50 transition-colors"
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
                    className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-orange/50 transition-colors"
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
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-offwhite transition-colors focus:border-orange/50 focus:outline-none [&_option]:bg-white [&_option]:text-black"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-white text-black">
                    Select a Service
                  </option>
                  {services.map((service) => (
                    <option
                      key={service.id}
                      value={service.id}
                      className="bg-white text-black"
                    >
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
                  rows={4}
                  className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:outline-none focus:border-orange/50 transition-colors resize-none"
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
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
