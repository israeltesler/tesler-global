"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { Accent } from "@/components/ui/accent-text";
import { SERVICES } from "@/lib/services-data";

export type ServicesProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
  limit?: number;
};

export function Services({
  withHeadline = false,
  viewMoreVisible = false,
  limit,
}: ServicesProps): ReactNode {
  const items =
    limit != null ? SERVICES.slice(0, limit) : viewMoreVisible ? SERVICES.slice(0, 4) : SERVICES;

  return (
    <section className="relative w-full overflow-x-clip">
      <div className="tech-grid-bg services-grid opacity-40" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="mx-auto flex max-w-3xl flex-col items-center gap-5 pt-12 pb-12 text-center sm:pt-20 sm:pb-16">
            <p className="section-kicker">what we do</p>
            <h2 className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              מה הסטודיו <Accent>עושה</Accent>
            </h2>
            <p className="max-w-[36ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              עיצוב, פיתוח ו-UX — <Accent>מקצה לקצה</Accent>, בדיוק לפי מה שהמותג שלכם צריך.
            </p>
            <hr className="tech-divider mt-2 max-w-xs" />
          </FadeIn>
        ) : null}

        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
          {items.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={index * 0.05}>
                <li>
                  <article className="project-card flex h-full flex-col rounded-3xl border border-foreground/8 bg-background/80 p-6 backdrop-blur-sm sm:p-7">
                    <header className="mb-4 flex items-center gap-3">
                      <span className="border-foreground/10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-background">
                        <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                      </span>
                      <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
                        {service.title}
                      </h3>
                    </header>
                    <p className="flex-1 text-[15px] leading-relaxed tracking-tight text-foreground/65 sm:text-[16px]">
                      {service.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full border border-foreground/8 bg-foreground/2 px-3 py-1.5 text-[13px] tracking-tight text-foreground/75 dark:bg-foreground/5"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              </FadeIn>
            );
          })}
        </ul>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/services"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              לכל השירותים
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
