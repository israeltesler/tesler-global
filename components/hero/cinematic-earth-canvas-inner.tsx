"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";

import { createHeroEngine } from "@/lib/cinematic-earth/engine.js";

function lockHeroStableHeight(): void {
  if (!window.matchMedia("(pointer: coarse)").matches) return;
  const stableHeight = window.innerHeight;
  document.documentElement.style.setProperty(
    "--hero-stable-height",
    `${stableHeight}px`
  );
  document.documentElement.style.setProperty(
    "--hero-scroll-height",
    `${stableHeight * 2.2}px`
  );
}

type CinematicEarthEngine = {
  dispose: () => void;
  handleResize: () => void;
  setHeroScrollProgress: (progress: number) => void;
  setEarthVisible: (visible: boolean) => void;
};

type CinematicEarthCanvasInnerProps = {
  scrollProgress?: MotionValue<number>;
  reducedMotion?: boolean;
  earthVisible?: boolean;
  onReady?: () => void;
};

export function CinematicEarthCanvasInner({
  scrollProgress,
  reducedMotion = false,
  earthVisible = true,
  onReady,
}: CinematicEarthCanvasInnerProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<CinematicEarthEngine | null>(null);
  const scrollProgressRef = useRef(scrollProgress);
  const reducedMotionRef = useRef(reducedMotion);
  const earthVisibleRef = useRef(earthVisible);
  const onReadyRef = useRef(onReady);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  scrollProgressRef.current = scrollProgress;
  reducedMotionRef.current = reducedMotion;
  earthVisibleRef.current = earthVisible;
  onReadyRef.current = onReady;

  useEffect(() => {
    const unsubscribe = scrollProgress?.on("change", (progress) => {
      engineRef.current?.setHeroScrollProgress(
        reducedMotionRef.current ? 1 : progress
      );
    });

    engineRef.current?.setHeroScrollProgress(
      reducedMotion ? 1 : (scrollProgress?.get() ?? 1)
    );

    return unsubscribe;
  }, [reducedMotion, scrollProgress]);

  useEffect(() => {
    engineRef.current?.setEarthVisible(earthVisible);
  }, [earthVisible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    lockHeroStableHeight();
    const onOrientationChange = (): void => {
      lockHeroStableHeight();
    };
    window.addEventListener("orientationchange", onOrientationChange);

    const canvas = document.createElement("canvas");
    canvas.className = "cinematic-earth-canvas__surface";
    container.appendChild(canvas);

    let disposed = false;
    let timeoutId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const boot = async (): Promise<void> => {
      try {
        timeoutId = window.setTimeout(() => {
          if (!disposed) {
            setErrorMessage(
              "הטעינה לוקחת יותר מהרגיל. ודא חיבור אינטרנט ורענן."
            );
          }
        }, 35000);

        let readyNotified = false;
        const notifyReady = (): void => {
          if (readyNotified || disposed) return;
          readyNotified = true;
          setErrorMessage(null);
          setStatus("ready");
          onReadyRef.current?.();
        };

        const engine = await createHeroEngine(canvas, { onReady: notifyReady });
        if (disposed) {
          engine.dispose();
          return;
        }

        engineRef.current = engine;
        engine.setEarthVisible(earthVisibleRef.current);
        engine.setHeroScrollProgress(
          reducedMotionRef.current ? 1 : (scrollProgressRef.current?.get() ?? 1)
        );
        engine.handleResize();
        notifyReady();
      } catch (error) {
        console.error("Cinematic Earth hero failed to start:", error);
        if (!disposed) {
          setStatus("error");
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "כדור הארץ לא נטען. נסה Chrome/Edge/Safari עדכני."
          );
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    void boot();

    const stage = container.closest(".cinematic-earth-hero__stage");
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (!prefersCoarsePointer) {
      resizeObserver = new ResizeObserver(() => {
        engineRef.current?.handleResize();
      });
      resizeObserver.observe(stage ?? container);
    }

    return () => {
      disposed = true;
      window.removeEventListener("orientationchange", onOrientationChange);
      document.documentElement.style.removeProperty("--hero-stable-height");
      document.documentElement.style.removeProperty("--hero-scroll-height");
      window.clearTimeout(timeoutId);
      resizeObserver?.disconnect();
      engineRef.current?.dispose();
      engineRef.current = null;
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cinematic-earth-canvas${status === "loading" ? " cinematic-earth-canvas--loading" : ""}`}
      data-status={status}
      aria-hidden="true"
    >
      {status === "error" ? (
        <div className="cinematic-earth-canvas__loader">
          <span>כדור הארץ לא נטען</span>
          {errorMessage ? (
            <p className="cinematic-earth-canvas__loader-detail">
              {errorMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
