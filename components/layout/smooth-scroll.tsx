"use client";

import { cancelFrame, frame } from "motion/react";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  autoRaf: false,
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  syncTouch: false,
};

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || prefersCoarsePointer) return;

    const lenis = new Lenis(LENIS_OPTIONS);

    const syncLenisWithSplash = (): void => {
      if (document.documentElement.dataset.splashActive !== undefined) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    syncLenisWithSplash();

    const splashObserver = new MutationObserver(syncLenisWithSplash);
    splashObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-splash-active"],
    });

    function updateLenis(data: { timestamp: number }): void {
      lenis.raf(data.timestamp);
    }

    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    frame.update(updateLenis, true);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      splashObserver.disconnect();
      cancelFrame(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
