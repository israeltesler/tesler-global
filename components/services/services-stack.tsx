"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

import { Accent } from "@/components/ui/accent-text";
import { FadeIn } from "@/components/ui/motion-primitives";
import { SERVICES } from "@/lib/services-data";

const COLS = 3;
const ROWS = 2;
const CARD_SIZE = 220;
const OVERLAP = 56;
const STACK_WIDTH = COLS * CARD_SIZE - (COLS - 1) * OVERLAP;
const STACK_HEIGHT = ROWS * CARD_SIZE - (ROWS - 1) * OVERLAP;

function getStackPosition(index: number) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  return {
    x: col * (CARD_SIZE - OVERLAP),
    y: row * (CARD_SIZE - OVERLAP),
  };
}

const STACK_ASPECT = STACK_WIDTH / STACK_HEIGHT;

type ServicesStackProps = {
  variant?: "page" | "home";
  showHeader?: boolean;
};

export function ServicesStack({
  variant = "page",
  showHeader = true,
}: ServicesStackProps): ReactNode {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isHome = variant === "home";

  return (
    <section
      className={
        isHome
          ? "relative w-full"
          : "relative w-full overflow-x-clip pb-8 sm:pb-10"
      }
    >
      {!isHome ? (
        <div
          className="tech-grid-bg services-grid pointer-events-none absolute inset-0 opacity-35"
          aria-hidden="true"
        />
      ) : null}

      <div
        className={
          isHome
            ? "relative mx-auto flex w-full flex-col items-center"
            : "relative mx-auto flex w-full max-w-275 flex-col items-center px-6 sm:px-10"
        }
      >
        {showHeader ? (
          <FadeIn
            className={
              isHome
                ? "mb-8 flex flex-col items-center gap-4 text-center sm:mb-10 lg:mb-6"
                : "mb-8 flex max-w-3xl flex-col items-center gap-4 text-center sm:mb-10 lg:mb-6"
            }
          >
            {!isHome ? <p className="section-kicker">what we do</p> : null}
            <h2
              className={
                isHome
                  ? "hero-heading text-[clamp(3rem,12vw,160px)] leading-none font-black tracking-tight uppercase"
                  : "font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-foreground"
              }
            >
              {isHome ? (
                "שירותים"
              ) : (
                <>
                  מה הסטודיו <Accent>עושה</Accent>
                </>
              )}
            </h2>
            {!isHome ? (
              <p className="max-w-[36ch] text-[17px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[19px]">
                עיצוב UI/UX, פיתוח Web, אנימציות וחשיבה עסקית —{" "}
                <Accent>מדויק, לא גנרי.</Accent>
              </p>
            ) : null}
          </FadeIn>
        ) : null}

        <div
          className="services-stack-grid relative mx-auto w-full max-w-[min(100%,760px)] px-2 sm:px-0 lg:max-w-none"
          style={{
            aspectRatio: `${STACK_WIDTH} / ${STACK_HEIGHT}`,
            minHeight: isHome ? "min(58vh, 400px)" : "min(62vh, 420px)",
            ["--stack-aspect" as string]: STACK_ASPECT,
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;
            const { x, y } = getStackPosition(index);
            const xPercent = (x / STACK_WIDTH) * 100;
            const yPercent = (y / STACK_HEIGHT) * 100;
            const cardWidthPercent = (CARD_SIZE / STACK_WIDTH) * 100;

            return (
              <motion.button
                key={service.id}
                type="button"
                aria-pressed={isActive}
                aria-label={`${service.title}${isActive ? " — פתוח" : ""}`}
                onClick={() => setActiveIndex(isActive ? null : index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={
                  isHome
                    ? "focus-ring absolute flex aspect-square flex-col overflow-hidden rounded-[28px] border-2 border-[#D7E2EA]/20 bg-[#111111] p-4 text-right shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:rounded-[32px] sm:p-5 lg:p-6"
                    : "project-card focus-ring absolute flex aspect-square flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background/95 p-4 text-right shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl sm:rounded-3xl sm:p-5 lg:p-6"
                }
                style={{
                  width: `${cardWidthPercent}%`,
                  right: `${xPercent}%`,
                  top: `${yPercent}%`,
                  zIndex: isActive ? 30 : index + 1,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.06 : 1,
                  y: isActive ? -10 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={
                    isHome
                      ? "mb-3 inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-xl border border-[#D7E2EA]/15 bg-[#0C0C0C] sm:h-10 sm:w-10"
                      : "border-foreground/10 mb-3 inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-xl border bg-background sm:h-10 sm:w-10"
                  }
                >
                  <Icon
                    className={
                      isHome
                        ? "h-4 w-4 text-[#D7E2EA]"
                        : "h-4 w-4 text-foreground"
                    }
                    aria-hidden="true"
                  />
                </span>

                <h3
                  className={
                    isHome
                      ? "text-[15px] font-medium leading-[1.2] tracking-tight text-[#D7E2EA] sm:text-[17px] lg:text-[18px]"
                      : "text-[15px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[17px] lg:text-[18px]"
                  }
                >
                  {service.title}
                </h3>

                <p
                  className={`mt-2 flex-1 text-[12px] leading-relaxed tracking-tight sm:text-[13px] lg:text-[14px] ${
                    isHome ? "text-[#D7E2EA]/60" : "text-foreground/65"
                  } ${isActive ? "line-clamp-4" : "line-clamp-2"}`}
                >
                  {service.description}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className={
                        isHome
                          ? "rounded-full border border-[#D7E2EA]/12 bg-[#D7E2EA]/5 px-2 py-0.5 text-[10px] tracking-tight text-[#D7E2EA]/75 sm:text-[11px]"
                          : "rounded-full border border-foreground/8 bg-foreground/2 px-2 py-0.5 text-[10px] tracking-tight text-foreground/75 sm:text-[11px] dark:bg-foreground/5"
                      }
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>

        {!isHome ? (
          <p className="mt-6 text-center text-[13px] tracking-tight text-foreground/45 sm:mt-8 lg:mt-5">
            ריחוף או לחיצה על כרטיסיה להדגשה
          </p>
        ) : null}
      </div>
    </section>
  );
}
