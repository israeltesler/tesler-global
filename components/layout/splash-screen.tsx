"use client";

import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useReducedMotion } from "@/lib/motion";

const MIN_WAIT_AFTER_READY_MS = 400;
const MAX_WAIT_MS = 4500;
const CURTAIN_DURATION_MS = 650;
const ANIMATION_FALLBACK_MS = CURTAIN_DURATION_MS + 400;
const ABSOLUTE_MAX_MS = 7000;

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
  const canvasReadyRef = useRef(canvasReady);
  const completedRef = useRef(false);
  const risingRef = useRef(false);
  const [phase, setPhase] = useState<SplashPhase>("hold");

  onCompleteRef.current = onComplete;
  canvasReadyRef.current = canvasReady;

  const finish = useCallback((): void => {
    if (completedRef.current) return;
    completedRef.current = true;
    delete document.documentElement.dataset.splashActive;
    unlockPageScroll();
    onCompleteRef.current();
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) {
      finish();
      return;
    }

    document.documentElement.dataset.splashActive = "";
    lockPageScroll();

    return () => {
      delete document.documentElement.dataset.splashActive;
      unlockPageScroll();
    };
  }, [reducedMotion, finish]);

  useEffect(() => {
    if (reducedMotion || completedRef.current) return;

    const startedAt = performance.now();
    let frame = 0;
    let animationFallback = 0;

    const beginRise = (): void => {
      if (risingRef.current || completedRef.current) return;
      risingRef.current = true;
      setPhase("rising");
      animationFallback = window.setTimeout(() => {
        setPhase("done");
      }, ANIMATION_FALLBACK_MS);
    };

    const tick = (now: number): void => {
      if (completedRef.current || risingRef.current) return;

      const elapsed = now - startedAt;
      const canvasIsReady = canvasReadyRef.current;
      const holdComplete =
        canvasIsReady && elapsed >= MIN_WAIT_AFTER_READY_MS;
      const timedOut = elapsed >= MAX_WAIT_MS;

      if (holdComplete || timedOut) {
        beginRise();
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const absoluteFallback = window.setTimeout(() => {
      if (completedRef.current) return;
      risingRef.current = true;
      setPhase("done");
    }, ABSOLUTE_MAX_MS);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(animationFallback);
      window.clearTimeout(absoluteFallback);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== "done") return;
    finish();
  }, [phase, finish]);

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
        duration: CURTAIN_DURATION_MS / 1000,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (phase !== "rising") return;
        setPhase("done");
      }}
    />
  );
}
