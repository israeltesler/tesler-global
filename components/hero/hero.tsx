import type { ReactNode } from "react";

import { StudioWordmark } from "@/components/brand/studio-wordmark";
import { HeroCtas } from "./hero-ctas";
import { Accent } from "@/components/ui/accent-text";
import { FadeIn } from "@/components/ui/motion-primitives";
import { siteContent } from "@/lib/site-content";

export function Hero(): ReactNode {
  const { hero } = siteContent;

  return (
    <section className="relative w-full overflow-hidden bg-[#1A1D21]">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-l from-[#1A1D21] via-[#1F2226] to-[#25282C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_50%,rgba(59,130,246,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(148,163,184,0.06),transparent_60%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center md:grid-cols-12 md:gap-10">
          <FadeIn className="flex flex-col gap-5 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
            <div className="flex flex-col gap-2">
              <StudioWordmark size="header" tone="light" className="opacity-70" />
              <p className="text-[15px] font-medium tracking-tight text-white/50">
                {hero.signatureBefore}
                <Accent light>{hero.signatureAccent}</Accent>
              </p>
            </div>

            <h1 className="font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight text-white md:text-[2.75rem] lg:text-[4rem]">
              {hero.headlineLine1}
              <br />
              {hero.headlineLine2}
            </h1>

            <p className="max-w-[38ch] text-[19px] leading-[1.55] tracking-tight text-white/60 sm:text-[21px]">
              {hero.subBefore}
              <Accent light>{hero.subAccent}</Accent>
            </p>

            <HeroCtas variant="hero" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
