import Link from "next/link";
import Image from "next/image";
import { getRelatedServices, type Service } from "@/data/services";
import { LocalImage } from "@/components/ui/LocalImage";

export function ServiceRelated({ service }: { service: Service }) {
  const related = getRelatedServices(service);

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8 xl:px-16">
      <div className="container-custom">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-offwhite md:text-3xl">
            Related services
          </h2>
          <Link
            href="/services"
            className="text-sm text-offwhite/45 transition-colors hover:text-orange"
          >
            All services
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.id}
              href={`/services/${item.id}`}
              className="group overflow-hidden border-t border-white/10 pt-5 transition-colors hover:border-orange/40"
            >
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                {item.image.startsWith("/images/") ? (
                  <LocalImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
              </div>
              <h3 className="font-heading text-lg font-bold text-offwhite">
                {item.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-offwhite/50">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
