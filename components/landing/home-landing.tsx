"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useSectionScrollProgress } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import {
  getLogoOrbitVerticalOffset,
  OrbitStudioLogo,
} from "@/components/brand/orbit-studio-logo";
import { ContactForm } from "@/components/contact/contact-form";
import { CinematicEarthCanvas } from "@/components/hero/cinematic-earth-canvas";
import { CinematicEarthPreload } from "@/components/hero/cinematic-earth-preload";
import { SplashScreen } from "@/components/layout/splash-screen";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProcessSection } from "@/components/process/process-section";
import {
  COHEN_CO_IMAGE,
  FEATURED_PROJECTS,
  PROJECTS_PAGE_ENABLED,
  ROMEMA_IMAGE,
} from "@/lib/projects-data";
import { ServicesStack } from "@/components/services/services-stack";
import { siteContent } from "@/lib/site-content";

const ORIGINAL_MARQUEE_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
] as const;

const MARQUEE_IMAGES = PROJECTS_PAGE_ENABLED
  ? ORIGINAL_MARQUEE_IMAGES.map((src, index) => {
      if (index === 0) return COHEN_CO_IMAGE;
      if (index === 11) return ROMEMA_IMAGE;
      return src;
    })
  : ORIGINAL_MARQUEE_IMAGES;

const HERO_LOGO_SCROLL: [number, number] = [0, 0.55];
const HERO_HEADLINE_SCROLL: [number, number] = [0, 0.85];
const HERO_SCALE_MIN = 0.24;
const HERO_SCALE_MAX = 1;
const HERO_WORD_REVEAL_SCALE_END =
  HERO_SCALE_MIN + (HERO_SCALE_MAX - HERO_SCALE_MIN) * 0.72;

export function HomeLanding(): ReactNode {
  const reducedMotion = useReducedMotion();
  const [splashComplete, setSplashComplete] = useState(false);
  const splashActive = !splashComplete && !reducedMotion;
  const contactSectionRef = useRef<HTMLElement>(null);
  const ctaBetweenGapRef = useRef<HTMLDivElement>(null);

  return (
    <main
      id="main-content"
      className="creator-page overflow-x-clip bg-[#0a0a0a]"
    >
      <CinematicEarthPreload />
      <HeroSection
        splashActive={splashActive}
        onSplashComplete={() => setSplashComplete(true)}
      />
      <AboutSection />
      <MarqueeSection />
      <ServicesSection />
      {PROJECTS_PAGE_ENABLED ? <ProjectsSection /> : null}
      <ProcessSection />
      <div
        ref={ctaBetweenGapRef}
        className="hero-cta-between-zone"
        aria-hidden="true"
      />
      <ContactSection sectionRef={contactSectionRef} />
      <SiteFooter />
      <PersistentHeroCta
        betweenGapRef={ctaBetweenGapRef}
        contactRef={contactSectionRef}
        label={siteContent.hero.primaryCta}
        splashActive={splashActive}
      />
    </main>
  );
}

type HeroCtaPhase = "hero" | "travel" | "pinned" | "done";

function PersistentHeroCta({
  betweenGapRef,
  contactRef,
  label,
  splashActive,
}: {
  betweenGapRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLElement | null>;
  label: string;
  splashActive: boolean;
}): ReactNode {
  const [phase, setPhase] = useState<HeroCtaPhase>("hero");
  const [pinnedTop, setPinnedTop] = useState(0);

  useEffect(() => {
    const update = (): void => {
      if (splashActive) {
        setPhase("hero");
        return;
      }

      const betweenGap = betweenGapRef.current;
      const contact = contactRef.current;
      const hero = document.querySelector<HTMLElement>(".cinematic-earth-hero-scroll");
      if (!betweenGap || !contact || !hero) return;

      const heroRect = hero.getBoundingClientRect();
      const contactRect = contact.getBoundingClientRect();
      const gapRect = betweenGap.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (contactRect.bottom <= 0 || contactRect.top < viewportHeight * 0.1) {
        setPhase("done");
        return;
      }

      const gapVisible =
        gapRect.height > 0 &&
        gapRect.bottom > 0 &&
        gapRect.top < viewportHeight;

      if (gapVisible) {
        setPinnedTop(Math.round(gapRect.top + gapRect.height / 2));
        setPhase("pinned");
        return;
      }

      if (heroRect.bottom > viewportHeight * 0.35) {
        setPhase("hero");
        return;
      }

      setPhase("travel");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [betweenGapRef, contactRef, splashActive]);

  if (phase === "done") return null;

  const button = <HeroStartButton label={label} />;

  if (phase === "pinned") {
    return (
      <div
        className="hero-start-cta-anchor hero-start-cta-anchor--pinned"
        style={{ top: pinnedTop }}
      >
        {button}
      </div>
    );
  }

  return (
    <div className={`hero-start-cta-anchor hero-start-cta-anchor--${phase}`}>
      {button}
    </div>
  );
}

function HeroSection({
  splashActive,
  onSplashComplete,
}: {
  splashActive: boolean;
  onSplashComplete: () => void;
}): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { hero } = siteContent;
  const [canvasReady, setCanvasReady] = useState(false);
  const [logoTravel, setLogoTravel] = useState(0);
  const [logoTravelX, setLogoTravelX] = useState(0);
  const [logoIntroOffset, setLogoIntroOffset] = useState(64);
  const scrollYProgress = useSectionScrollProgress(sectionRef);

  const logoX = useTransform(
    scrollYProgress,
    HERO_LOGO_SCROLL,
    [0, logoTravelX]
  );
  const logoY = useTransform(
    scrollYProgress,
    HERO_LOGO_SCROLL,
    [logoIntroOffset, -logoTravel]
  );
  const logoScale = useTransform(scrollYProgress, HERO_LOGO_SCROLL, [1, 0.17]);
  const sublineRuleOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.85],
    [0, 1]
  );
  const [scrollLogoClickable, setScrollLogoClickable] = useState(false);
  const logoClickable = reducedMotion || scrollLogoClickable;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const update = (progress: number): void => {
      setScrollLogoClickable(progress >= 0.5);
    };

    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [reducedMotion, scrollYProgress]);

  useEffect(() => {
    const updateLogoTravel = (): void => {
      const stableHeight = sectionRef.current?.querySelector<HTMLElement>(
        ".cinematic-earth-hero"
      )?.clientHeight;
      const height = stableHeight || window.innerHeight;
      const isDesktop = window.innerWidth >= 768;
      const logoWidth = Math.min(window.innerWidth * 0.96, 780);
      const finalScale = 0.17;
      const paddingTop = 16;
      const paddingRight = isDesktop ? 56 : 24;
      const scaledHalf = (logoWidth * finalScale) / 2;
      const headerCenter = isDesktop
        ? Math.max(54, paddingTop + scaledHalf)
        : 42;

      setLogoTravel(Math.max(0, height / 2 - headerCenter));
      setLogoTravelX(
        isDesktop
          ? Math.max(
              0,
              window.innerWidth / 2 - paddingRight - scaledHalf
            )
          : 0
      );
      setLogoIntroOffset(getLogoOrbitVerticalOffset(logoWidth));
    };

    updateLogoTravel();
    window.addEventListener("resize", updateLogoTravel);
    window.addEventListener("orientationchange", updateLogoTravel);
    return () => {
      window.removeEventListener("resize", updateLogoTravel);
      window.removeEventListener("orientationchange", updateLogoTravel);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cinematic-earth-hero-scroll">
      <div className="cinematic-earth-hero">
        <div className="cinematic-earth-hero__stage">
          <CinematicEarthCanvas
            scrollProgress={scrollYProgress}
            reducedMotion={Boolean(reducedMotion)}
            earthVisible={!splashActive || canvasReady}
            onReady={() => setCanvasReady(true)}
          />

          <div className="cinematic-earth-hero__under-curtain">
            <div className="hero-footer-left">
              <div className="hero-footer-copy">
                {reducedMotion ? (
                  <>
                    <h1 className="hero-footer-copy__lines">
                      {hero.footerLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h1>
                    <div className="hero-footer-copy__rule" aria-hidden="true" />
                    <p className="hero-footer-copy__subline">{hero.footerSubline}</p>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="hero-footer-copy__rule"
                      aria-hidden="true"
                      style={{ opacity: sublineRuleOpacity }}
                    />
                    <AnimatedText
                      text={hero.footerSubline}
                      progress={scrollYProgress}
                      progressRange={[0.72, 0.85]}
                      className="hero-footer-copy__subline"
                    />
                  </>
                )}
              </div>
            </div>
            <HeroScrollHint label={hero.scrollHint} />
          </div>

          {splashActive ? (
            <SplashScreen
              canvasReady={canvasReady}
              onComplete={onSplashComplete}
            />
          ) : null}

          <div className="cinematic-earth-hero__overlay">
            <div className="cinematic-earth-hero__logo">
              <motion.div
                style={
                  reducedMotion
                    ? {
                        x: logoTravelX,
                        y: -logoTravel,
                        scale: 0.17,
                        transformOrigin: "50% 50%",
                      }
                    : {
                        x: logoX,
                        y: logoY,
                        scale: logoScale,
                        transformOrigin: "50% 50%",
                      }
                }
                className="origin-center pointer-events-none"
              >
                <Link
                  href="/"
                  aria-label="tesler studio — דף הבית"
                  className={`focus-ring inline-flex items-center${logoClickable ? " is-interactive" : ""}`}
                  tabIndex={logoClickable ? 0 : -1}
                  aria-hidden={logoClickable ? undefined : true}
                >
                  <OrbitStudioLogo className="aspect-square h-auto w-[min(96vw,780px)] object-contain" />
                </Link>
              </motion.div>
            </div>

            {!reducedMotion ? (
              <HeroRisingHeadline
                lines={hero.footerLines}
                progress={scrollYProgress}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroRisingHeadline({
  lines,
  progress,
}: {
  lines: readonly string[];
  progress: MotionValue<number>;
}): ReactNode {
  const [motionConfig, setMotionConfig] = useState({
    startX: -420,
    startY: 340,
    maxWidth: 520,
    anchorTop: 48,
  });

  useEffect(() => {
    const update = (): void => {
      const heroStage = document.querySelector<HTMLElement>(".cinematic-earth-hero");
      const stageHeight =
        heroStage?.clientHeight ||
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--hero-stable-height"
          )
        ) ||
        window.innerHeight;
      const globeDiameter = Math.min(
        window.innerWidth * 0.92,
        stageHeight * 0.78
      );
      const globeCenterY = stageHeight * 0.5;

      setMotionConfig({
        startX: -(window.innerWidth * 0.28),
        startY: stageHeight * 0.2,
        maxWidth: globeDiameter * 0.82,
        anchorTop: (globeCenterY / stageHeight) * 100,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const x = useTransform(
    progress,
    HERO_HEADLINE_SCROLL,
    [motionConfig.startX, 0]
  );
  const y = useTransform(
    progress,
    HERO_HEADLINE_SCROLL,
    [motionConfig.startY, 0]
  );
  const scale = useTransform(progress, HERO_HEADLINE_SCROLL, [HERO_SCALE_MIN, 1]);
  const totalWords = lines.reduce(
    (count, line) => count + line.split(/\s+/).filter(Boolean).length,
    0
  );
  let runningWordIndex = 0;
  const linesWithWordIndices = lines.map((line) => {
    const lineWords = line.split(/\s+/).filter(Boolean);
    const words = lineWords.map((word, wordInLine) => ({
      word,
      wordInLine,
      index: runningWordIndex++,
    }));

    return { line, words };
  });

  return (
    <div
      className="hero-rising-headline-anchor"
      style={{ top: `${motionConfig.anchorTop}%` }}
    >
      <motion.div
        className="hero-rising-headline"
        style={{
          x,
          y,
          scale,
          width: motionConfig.maxWidth,
        }}
        aria-label={lines.join(" ")}
      >
      {linesWithWordIndices.map(({ line, words }, lineIndex) => {
        const isAccentLine = lineIndex === lines.length - 1;
        return (
          <p
            key={line}
            className={
              isAccentLine
                ? "hero-rising-headline__line hero-rising-headline__line--accent"
                : "hero-rising-headline__line"
            }
          >
            {words.map(({ word, wordInLine, index }) => (
              <HeroAnimatedWord
                key={`${line}-${wordInLine}-${word}`}
                word={word}
                scale={scale}
                index={index}
                total={totalWords}
                emphasized={isAccentLine}
                isLastInLine={wordInLine === words.length - 1}
              />
            ))}
          </p>
        );
      })}
    </motion.div>
    </div>
  );
}

function HeroAnimatedWord({
  word,
  scale,
  index,
  total,
  emphasized = false,
  isLastInLine,
}: {
  word: string;
  scale: MotionValue<number>;
  index: number;
  total: number;
  emphasized?: boolean;
  isLastInLine: boolean;
}): ReactNode {
  const revealSpan = HERO_WORD_REVEAL_SCALE_END - HERO_SCALE_MIN;
  const start = HERO_SCALE_MIN + (index / total) * revealSpan;
  const end = HERO_SCALE_MIN + ((index + 1) / total) * revealSpan;
  const opacity = useTransform(scale, [start, end], [0, 1], { clamp: true });
  const y = useTransform(scale, [start, end], [18, 0], { clamp: true });

  return (
    <motion.span
      className={
        emphasized
          ? "hero-rising-headline__word hero-rising-headline__word--accent"
          : "hero-rising-headline__word"
      }
      style={{ opacity, y }}
    >
      {word}
      {isLastInLine ? "" : "\u00A0"}
    </motion.span>
  );
}

function HeroStartButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}): ReactNode {
  return (
    <a
      href={siteContent.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`hero-start-cta focus-ring ${className}`.trim()}
      aria-label={label}
    >
      <span className="hero-start-cta__icon" aria-hidden="true">
        <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="hero-start-cta__label">{label}</span>
    </a>
  );
}

function HeroScrollHint({ label }: { label: string }): ReactNode {
  return (
    <div className="hero-footer-scroll hero-scroll-hint" aria-hidden="true">
      <div className="hero-scroll-hint__row">
        <span className="hero-scroll-hint__mouse">
          <span className="hero-scroll-hint__wheel" />
        </span>
        <span>{label}</span>
      </div>
      <div className="hero-footer-scroll__rule" />
    </div>
  );
}

function MarqueeSection(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#0a0a0a] px-0 pt-2 pb-8 sm:pb-10"
      aria-label="עבודות נבחרות"
    >
      <MarqueeStrip sectionRef={sectionRef} />
    </section>
  );
}

function MarqueeStrip({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}): ReactNode {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = (): void => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  return (
    <>
      <MarqueeRow images={MARQUEE_IMAGES.slice(0, 11)} x={offset - 200} />
      <div className="h-3" />
      <MarqueeRow images={MARQUEE_IMAGES.slice(11)} x={-(offset - 200)} />
    </>
  );
}

function MarqueeRow({
  images,
  x,
}: {
  images: readonly string[];
  x: number;
}): ReactNode {
  const repeated = [...images, ...images, ...images];
  return (
    <div
      className="flex w-max gap-3"
      style={{ transform: `translate3d(${x}px,0,0)`, willChange: "transform" }}
    >
      {repeated.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          width={420}
          height={270}
          loading="lazy"
          className="h-[190px] w-[296px] shrink-0 rounded-2xl object-cover sm:h-[230px] sm:w-[358px] md:h-[270px] md:w-[420px]"
        />
      ))}
    </div>
  );
}

function AboutSection(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { about } = siteContent;
  const paragraph = about.homeParagraph;
  const words = paragraph.split(/\s+/).filter(Boolean);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end 0.08"],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate bg-[#0C0C0C] px-5 py-8 sm:px-8 sm:py-10 md:px-10"
      style={{ minHeight: `calc(78vh + ${words.length * 1.5}vh)` }}
    >
      <div className="sticky top-[10vh] mx-auto w-full max-w-3xl px-5 sm:px-8 md:px-10">
        <div className="flex flex-col items-center text-center">
          <FadeIn y={40}>
            <p className="mb-3 text-sm font-medium tracking-[0.24em] text-[#D7E2EA]/55 uppercase sm:text-base">
              {about.kicker}
            </p>
            <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] leading-none font-black tracking-tight uppercase">
              {about.title}
            </h2>
          </FadeIn>
          <div className="mt-3 flex w-full min-w-0 flex-col items-center gap-5 sm:mt-4 sm:gap-6">
            <p dir="rtl" className="w-full max-w-[560px] min-w-0 break-normal text-center text-[clamp(1rem,2vw,1.35rem)] leading-[1.75] font-medium text-[#D7E2EA]">
              {words.map((word, index) => (
                <span key={`${word}-${index}`} className="contents">
                  {reducedMotion ? (
                    <span className="inline-block whitespace-nowrap">{word}</span>
                  ) : (
                    <AboutAnimatedWord
                      word={word}
                      progress={scrollYProgress}
                      index={index}
                      total={words.length}
                    />
                  )}
                  {index < words.length - 1 ? " " : null}
                </span>
              ))}
            </p>
            <ContactMailLink />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutAnimatedWord({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}): ReactNode {
  const revealSpan = 0.88;
  const start = (index / total) * revealSpan;
  const end = ((index + 1) / total) * revealSpan;
  const opacity = useTransform(progress, [0, start, end], [0, 0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-nowrap">
      {word}
    </motion.span>
  );
}

function ServicesSection(): ReactNode {
  return (
    <section
      id="services"
      className="relative rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-8 text-[#D7E2EA] sm:rounded-t-[50px] sm:px-8 sm:pt-24 sm:pb-10 md:rounded-t-[60px] md:px-10 md:pt-28 md:pb-12 lg:pt-24 lg:pb-10"
    >
      <ServicesStack variant="home" />
    </section>
  );
}

function ProjectsSection(): ReactNode {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] leading-none font-black tracking-tight uppercase sm:mb-20 md:mb-28">
          פרויקטים
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-[1500px]">
        {FEATURED_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={FEATURED_PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
  total: number;
}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh] min-h-[650px]">
      <motion.article
        className="sticky top-24 overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] sm:rounded-[50px] md:top-32 md:rounded-[60px]"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <div
          className="relative w-full md:!aspect-auto md:min-h-[clamp(520px,72vh,760px)]"
          style={{
            aspectRatio: `${project.imageWidth} / ${project.imageHeight}`,
          }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 768px) 1500px, 100vw"
            quality={95}
            priority={index === 0}
            className="object-contain md:object-cover md:object-top"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/35 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-[auto_1fr] items-end gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:p-7 md:gap-8 md:p-10">
            <span className="text-[clamp(3rem,8vw,120px)] leading-none font-black text-[#D7E2EA]">
              {project.number}
            </span>
            <div>
              <p className="text-xs font-medium tracking-[.2em] uppercase text-[#D7E2EA]/55 sm:text-sm">
                {project.category}
              </p>
              <h3 className="mt-1 text-[clamp(1.25rem,3vw,2.6rem)] font-medium uppercase text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
            <LiveProjectButton className="col-span-2 justify-self-end sm:col-span-1" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function ContactSection({
  sectionRef,
}: {
  sectionRef?: RefObject<HTMLElement | null>;
}): ReactNode {
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex min-h-0 items-center bg-[#0C0C0C] px-5 pt-4 pb-10 text-[#D7E2EA] sm:px-8 lg:min-h-screen lg:px-10 lg:pt-6 lg:pb-12"
    >
      <FadeIn className="w-full">
        <div
          dir="ltr"
          className="mx-auto grid w-full grid-cols-1 items-center gap-10 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2 lg:items-stretch lg:gap-0"
        >
          <div
            dir="rtl"
            className="order-2 flex flex-col justify-center lg:order-1 lg:px-10 lg:py-8 xl:px-14"
          >
            <p className="mb-4 text-xs font-medium tracking-[0.24em] text-[#D7E2EA]/55 uppercase sm:text-sm lg:mb-5 lg:text-sm">
              יצירת קשר
            </p>
            <ContactForm compact />
          </div>

          <div
            dir="rtl"
            className="order-1 flex flex-col items-center justify-center text-center lg:order-2 lg:px-10 lg:py-8 xl:px-14"
          >
            <h2 className="hero-heading w-full text-[clamp(2.25rem,5vw,4.5rem)] leading-[.95] font-black tracking-tight uppercase lg:text-[clamp(2rem,3.1vw,3.35rem)]">
              בואו ניצור משהו בלתי נשכח
            </h2>
            <p className="mt-4 w-full max-w-[34ch] text-base leading-relaxed text-[#D7E2EA]/65 lg:mt-5 lg:max-w-[36ch] lg:text-[1.05rem] lg:leading-[1.7]">
              {siteContent.description}
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function ContactMailLink(): ReactNode {
  return (
    <a
      href={siteContent.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-gradient focus-ring inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-medium tracking-widest text-white uppercase outline-2 outline-offset-[-3px] outline-white transition-transform hover:scale-[1.03] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      דברו איתי
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function LiveProjectButton({
  className = "",
}: {
  className?: string;
}): ReactNode {
  return (
    <a
      href={siteContent.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium tracking-widest text-[#D7E2EA] uppercase transition-colors hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      לפרויקט הבא
    </a>
  );
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedText({
  text,
  progress: externalProgress,
  progressRange = [0, 1],
  className = "w-full max-w-[560px] text-balance text-center text-[clamp(1rem,2vw,1.35rem)] leading-[1.75] font-medium text-[#D7E2EA]",
}: {
  text: string;
  progress?: MotionValue<number>;
  progressRange?: [number, number];
  className?: string;
}): ReactNode {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const progress = externalProgress ?? scrollYProgress;
  const [rangeStart, rangeEnd] = progressRange;
  const rangeSpan = rangeEnd - rangeStart;
  const characters = [...text];

  return (
    <p ref={ref} className={`${className} min-w-0 text-pretty break-words`}>
      {characters.map((character, index) => {
        const start = rangeStart + (index / characters.length) * rangeSpan;
        const end = rangeStart + ((index + 1) / characters.length) * rangeSpan;

        return (
          <AnimatedCharacter
            key={`${character}-${index}`}
            character={character}
            progress={progress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
}

function AnimatedCharacter({
  character,
  progress,
  start,
  end,
}: {
  character: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}): ReactNode {
  const opacity = useTransform(progress, [0, start, end], [0, 0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {character}
    </motion.span>
  );
}
