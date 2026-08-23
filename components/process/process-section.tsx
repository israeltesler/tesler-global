"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { Accent } from "@/components/ui/accent-text";
import { FadeIn } from "@/components/ui/motion-primitives";
import { PROCESS_STEPS, type ProcessStep } from "@/lib/process-data";

const PROCESS_STEP_COUNT = PROCESS_STEPS.length;
const STEP_SWITCH_MARGIN = 0.12 / PROCESS_STEP_COUNT;

function getActiveStepIndex(progress: number, currentIndex: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const stepSize = 1 / PROCESS_STEP_COUNT;

  if (
    currentIndex < PROCESS_STEP_COUNT - 1 &&
    clamped >= (currentIndex + 1) * stepSize + STEP_SWITCH_MARGIN
  ) {
    return currentIndex + 1;
  }

  if (
    currentIndex > 0 &&
    clamped <= currentIndex * stepSize - STEP_SWITCH_MARGIN
  ) {
    return currentIndex - 1;
  }

  return currentIndex;
}

export function ProcessSection(): ReactNode {
  const reducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 15%"],
  });

  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reducedMotion) return;

    const nextIndex = getActiveStepIndex(latest, activeIndexRef.current);
    if (nextIndex === activeIndexRef.current) return;

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  });

  return (
    <section className="process-home-section relative w-full overflow-x-clip py-10 sm:py-16">
      <div className="tech-grid-bg process-home-grid" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-275 px-6 sm:px-10">
        <div className="process-editorial">
          <div ref={timelineRef} className="process-timeline-wrap">
            <div className="process-rail" aria-hidden="true">
              <div className="process-rail-track" />
              {!reducedMotion ? (
                <motion.div
                  className="process-rail-fill"
                  style={{ scaleY: fillScale, transformOrigin: "top center" }}
                >
                  <span className="process-rail-marker" />
                </motion.div>
              ) : (
                <div className="process-rail-fill process-rail-fill--static">
                  <span className="process-rail-marker" />
                </div>
              )}
            </div>

            <ol className="process-list" aria-label="שלבי העבודה">
              {PROCESS_STEPS.map((step, index) => (
                <ProcessStepItem
                  key={step.id}
                  step={step}
                  index={index}
                  activeIndex={activeIndex}
                  isActive={reducedMotion ? true : activeIndex === index}
                  reducedMotion={Boolean(reducedMotion)}
                />
              ))}
            </ol>
          </div>

          <FadeIn className="process-intro">
            <p className="section-kicker process-kicker">התהליך</p>
            <h2 className="process-headline hero-heading font-bold tracking-tight">
              <span className="process-headline-line block">מרעיון</span>
              <span className="process-headline-line block">
                <Accent>לאתר שעובד</Accent>
              </span>
              <span className="process-headline-line block">בשביל העסק שלכם.</span>
            </h2>
            <p className="process-lead text-[17px] leading-[1.55] tracking-tight text-[#D7E2EA]/65 sm:text-[18px]">
              תהליך מדויק שמחבר בין אסטרטגיה, עיצוב וחוויה — כדי שהאתר
              ירגיש <Accent>בדיוק כמו העסק שלכם.</Accent>
            </p>

            <div className="process-diff">
              <p className="process-diff-lead font-medium tracking-tight text-[#D7E2EA]">
                לא מתחילים מהמסך.
                <br />
                <Accent>מתחילים מהעסק.</Accent>
              </p>
              <p className="process-diff-note mt-3 text-[14px] leading-[1.65] tracking-tight text-[#D7E2EA]/60 sm:text-[15px]">
                לפני העיצוב, מבינים מה צריך לקרות באתר כדי שהלקוח הנכון
                ירגיש שהוא הגיע למקום הנכון.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProcessStepItem({
  step,
  index,
  activeIndex,
  isActive,
  reducedMotion,
}: {
  step: ProcessStep;
  index: number;
  activeIndex: number;
  isActive: boolean;
  reducedMotion: boolean;
}): ReactNode {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      className={[
        "process-step",
        isActive ? "process-step--active" : "",
        !reducedMotion && index < activeIndex ? "process-step--past" : "",
        !reducedMotion && index > activeIndex ? "process-step--future" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={isActive ? "step" : undefined}
    >
      <span className="process-step-num font-mono tabular-nums" aria-hidden="true">
        {number}
      </span>
      <div className="process-step-body">
        <h3 className="process-step-title">{step.title}</h3>
        <p className="process-step-text">{step.description}</p>
      </div>
    </li>
  );
}
