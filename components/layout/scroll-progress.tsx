"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";

export function ScrollProgress(): ReactNode {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 1000 : 120,
    damping: reducedMotion ? 100 : 30,
    restDelta: 0.001,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] origin-right"
      style={{ scaleX, willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
