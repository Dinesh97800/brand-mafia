import Link from "next/link";
import { BlurRevealText } from "@/components/ui/BlurRevealText";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <BlurRevealText
          as="h1"
          trigger="mount"
          text="404"
          className="font-heading text-8xl font-bold text-orange mb-4"
        />
        <p className="text-xl text-offwhite/60 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-black font-heading font-semibold hover:scale-105 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
