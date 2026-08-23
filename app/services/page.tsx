import { ContactCard } from "@/components/contact/contact-card";
import { ServicesStack } from "@/components/services/services-stack";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Accent } from "@/components/ui/accent-text";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "שירותים",
  description:
    "עיצוב UI/UX, פיתוח Web, חנויות אונליין, מיתוג ו-SEO — סטודיו בוטיק מקצה לקצה.",
  path: "/services",
});

export default function ServicesPage(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-[calc(100dvh-4rem)] flex-1 flex-col pt-28 sm:pt-32"
    >
      <ServicesStack />

      <section className="mx-auto w-full max-w-160 px-6 pb-6 pt-2 sm:px-10">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-6 text-center sm:p-8 dark:bg-foreground/3">
            <h2 className="font-display text-[1.5rem] font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
              לא בטוחים <Accent>מה מתאים לכם?</Accent>
            </h2>
            <p className="mx-auto mt-3 max-w-[40ch] text-[16px] leading-[1.6] tracking-tight text-foreground/70">
              שלחו לי הודעה עם פרטים על העסק — ונבנה יחד אתר שמשרת את המטרות
              שלכם, בלי להתפשר על עיצוב או ביצועים.
            </p>
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-8 sm:h-12" />
    </main>
  );
}
