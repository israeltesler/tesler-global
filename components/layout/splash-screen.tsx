"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/motion";

const MIN_HOLD_AFTER_READY = 100;
const MAX_WAIT = 8000;
const CURTAIN_DELAY = 0;
const CURTAIN_DURATION = 1100;

type SplashPhase = "hold" | "rising" | "done";

type SplashScreenProps = {
  canvasReady: boolean;
  onComplete: () => void;
};

function lockPageScroll(): void {
  const scrollY = window.scrollY;
  document.body.dataset.splashScrollY = String(scrollY);
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
}

function unlockPageScroll(): void {
  const scrollY = Number.parseInt(document.body.dataset.splashScrollY ?? "0", 10);
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  delete document.body.dataset.splashScrollY;
  window.scrollTo(0, Number.isFinite(scrollY) ? scrollY : 0);
}

export function SplashScreen({
  canvasReady,
  onComplete,
}: SplashScreenProps): ReactNode {
  const reducedMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const canvasReadyAtRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<SplashPhase>("hold");

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (canvasReady && canvasReadyAtRef.current === null) {
      canvasReadyAtRef.current = performance.now();
    }
  }, [canvasReady]);

  useLayoutEffect(() => {
    if (reducedMotion || phase === "done") {
      delete document.documentElement.dataset.splashActive;
      unlockPageScroll();
      return;
    }

    document.documentElement.dataset.splashActive = "";
    lockPageScroll();
  }, [reducedMotion, phase]);

  useEffect(() => {
    if (reducedMotion) {
      onCompleteRef.current();
      return;
    }

    const start = performance.now();
    let frame = 0;
    let riseTimeout = 0;

    const tick = (now: number): void => {
      const readyAt = canvasReadyAtRef.current;
      const holdComplete =
        readyAt !== null && now - readyAt >= MIN_HOLD_AFTER_READY;
      const timedOut = now - start >= MAX_WAIT;
      const ready = canvasReady && (holdComplete || timedOut);

      if (ready) {
        riseTimeout = window.setTimeout(() => setPhase("rising"), CURTAIN_DELAY);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(riseTimeout);
    };
  }, [canvasReady, reducedMotion]);

  useEffect(() => {
    if (phase !== "done") return;
    onCompleteRef.current();
  }, [phase]);

  if (reducedMotion || phase === "done") return null;

  return (
    <motion.div
      className={`splash-screen${canvasReady ? "" : " splash-screen--loading"}`}
      role="status"
      aria-live="polite"
      aria-label={phase === "rising" ? "חושף את כדור הארץ" : "טוען את האתר"}
      initial={{ y: 0 }}
      animate={phase === "rising" ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: CURTAIN_DURATION / 1000,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (phase !== "rising") return;
        setPhase("done");
      }}
    />
  );
}
