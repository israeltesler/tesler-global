import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Accent } from "@/components/ui/accent-text";
import { createMetadata } from "@/lib/metadata";
import { siteContent } from "@/lib/site-content";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "אודות",
  description: `${siteContent.brand} — סוכנות לעיצוב ופיתוח חוויות דיגיטל.`,
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="min-w-0 overflow-hidden rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <p className="text-sm font-medium tracking-[0.22em] text-foreground/55 uppercase">
              {siteContent.about.kicker}
            </p>
            <h1 className="mt-3 font-display text-[1.75rem] font-bold tracking-tight text-foreground sm:text-[2rem]">
              <Accent>{siteContent.about.title}</Accent>
            </h1>
            <div className="mt-8 space-y-6 text-pretty break-words text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              {siteContent.about.pageIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
