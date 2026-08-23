import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { Accent } from "@/components/ui/accent-text";
import type { LegalPageContent } from "@/lib/legal-content";
import { legalLinks } from "@/lib/legal-content";

type LegalDocumentProps = {
  content: LegalPageContent;
};

export function LegalDocument({ content }: LegalDocumentProps): ReactNode {
  const otherLinks = legalLinks.filter((link) => link.href !== content.path);

  return (
    <main id="main-content" className="flex flex-1 flex-col pt-28 sm:pt-32">
      <section className="mx-auto w-full max-w-160 px-6 pb-16 sm:px-10 sm:pb-24">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <p className="text-sm font-medium tracking-[0.22em] text-foreground/55 uppercase">
              {content.kicker}
            </p>
            <h1 className="mt-3 font-display text-[1.75rem] font-bold tracking-tight text-foreground sm:text-[2rem]">
              <Accent>{content.title}</Accent>
            </h1>
            <p className="mt-4 text-sm text-foreground/55">
              עודכן לאחרונה: {content.lastUpdated}
            </p>

            {content.intro ? (
              <p className="mt-8 text-pretty text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
                {content.intro}
              </p>
            ) : null}

            <div className="mt-10 space-y-10">
              {content.sections.map((section) => (
                <section key={section.title} aria-labelledby={section.title}>
                  <h2
                    id={section.title}
                    className="font-display text-xl font-bold tracking-tight text-foreground"
                  >
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="mt-4 text-pretty text-[17px] leading-[1.7] tracking-tight text-foreground/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-4 list-disc space-y-2 ps-5 text-[17px] leading-[1.7] text-foreground/75">
                      {section.list.map((item) => (
                        <li key={item.slice(0, 32)}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <nav
              className="mt-12 border-t border-foreground/10 pt-8"
              aria-label="מסמכים משפטיים נוספים"
            >
              <p className="text-sm font-medium text-foreground/55">מסמכים נוספים</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {otherLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="focus-ring text-accent hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/" className="focus-ring text-foreground/65 hover:text-foreground">
                    חזרה לדף הבית
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
