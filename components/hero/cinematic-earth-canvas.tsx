"use client";

import type { ReactNode } from "react";
import type { MotionValue } from "motion/react";

import { CinematicEarthCanvasInner } from "@/components/hero/cinematic-earth-canvas-inner";

type CinematicEarthCanvasProps = {
  scrollProgress?: MotionValue<number>;
  reducedMotion?: boolean;
  earthVisible?: boolean;
  onReady?: () => void;
};

export function CinematicEarthCanvas({
  scrollProgress,
  reducedMotion = false,
  earthVisible = true,
  onReady,
}: CinematicEarthCanvasProps): ReactNode {
  return (
    <CinematicEarthCanvasInner
      {...(scrollProgress ? { scrollProgress } : {})}
      reducedMotion={reducedMotion}
      earthVisible={earthVisible}
      {...(onReady ? { onReady } : {})}
    />
  );
}
