import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";

export function ServiceProof({
  heading,
  projectIds,
}: {
  heading: string;
  projectIds: string[];
}) {
  const items = projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((item): item is (typeof projects)[number] => Boolean(item));

  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8 xl:px-16">
      <div className="container-custom">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-heading text-3xl font-bold text-offwhite md:text-4xl">
            {heading}
          </h2>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm text-offwhite/50 transition-colors hover:text-orange"
          >
            View all case studies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <Link
            href={`/case-studies/${featured.id}`}
            className="group relative min-h-[320px] overflow-hidden rounded-2xl lg:col-span-7 lg:min-h-[420px]"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-orange">
                {featured.category}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-offwhite md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-offwhite/65">
                {featured.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-4 text-sm text-offwhite/80">
                {featured.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          </Link>

          <div className="flex flex-col gap-5 lg:col-span-5">
            {rest.slice(0, 2).map((project) => (
              <Link
                key={project.id}
                href={`/case-studies/${project.id}`}
                className="group relative min-h-[190px] overflow-hidden rounded-2xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-heading text-xl font-bold text-offwhite">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-offwhite/60">
                    {project.results[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
