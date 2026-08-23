"use client";

import { ArrowRight } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactButton } from "@/components/contact/contact-button";
import { siteContent } from "@/lib/site-content";
import { PROJECTS_PAGE_ENABLED } from "@/lib/projects-data";

const EASE = [0.22, 1, 0.36, 1] as const;

type HeroCtasProps = {
  variant?: "default" | "hero";
};

export function HeroCtas({ variant = "default" }: HeroCtasProps): ReactNode {
  const isHero = variant === "hero";
  const { hero } = siteContent;

  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: EASE } }}
        className="mt-2 flex flex-wrap items-center gap-3"
      >
        <ContactButton
          variant={isHero ? "hero" : "default"}
          {...(isHero ? { label: hero.primaryCta } : {})}
        />

        {PROJECTS_PAGE_ENABLED ? (
          <motion.div
            layout
            transition={{ layout: { duration: 0.55, ease: EASE } }}
          >
            <Link
              href="/projects"
              className={
                isHero
                  ? "focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  : "border border-foreground/5 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4"
              }
            >
              {isHero ? hero.secondaryCta : "תיק עבודות"}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </LayoutGroup>
  );
}
