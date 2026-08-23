"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  type MotionProps,
  type MotionValue,
  type Variants,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";

function subscribeToReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

const ReducedMotionContext = createContext<boolean>(false);

export function useReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}

/** Scroll progress for tall sections — works with Lenis smooth scroll. */
export function useSectionScrollProgress(
  targetRef: RefObject<HTMLElement | null>
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    let rafId = 0;

    const measure = (): void => {
      const target = targetRef.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const viewport = window.innerHeight;
        const scrollRange = Math.max(
          target.scrollHeight - viewport,
          target.offsetHeight - viewport,
          1
        );
        const next = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
        progress.set(next);
      }
      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, [targetRef, progress]);

  return progress;
}

/** Reveal headline words one-by-one once scroll begins — not tied 1:1 to scroll speed. */
export function useStaggeredWordReveal(
  progress: MotionValue<number>,
  totalWords: number,
  enabled = true,
  scale?: MotionValue<number>
): number {
  const [revealedCount, setRevealedCount] = useState(0);
  const targetCountRef = useRef(0);

  const updateTarget = (next: number): void => {
    if (!enabled || totalWords === 0) return;
    const clamped = Math.min(totalWords, Math.max(0, next));
    if (clamped > targetCountRef.current) {
      targetCountRef.current = clamped;
    }
  };

  useMotionValueEvent(progress, "change", (value) => {
    const normalized = Math.min(Math.max(value, 0), 1);
    if (normalized <= 0.002) return;
    updateTarget(Math.ceil((normalized / 0.035) * totalWords));
  });

  useMotionValueEvent(scale ?? progress, "change", (value) => {
    if (!scale) return;
    if (value > 0.27) {
      updateTarget(totalWords);
      return;
    }
    if (value > 0.25) {
      updateTarget(
        Math.max(2, Math.ceil(((value - 0.24) / 0.76) * totalWords))
      );
    }
  });

  useEffect(() => {
    if (!enabled || totalWords === 0) return;

    const currentProgress = progress.get();
    if (currentProgress > 0.002) {
      updateTarget(Math.ceil((currentProgress / 0.035) * totalWords));
    }
    if (scale && scale.get() > 0.25) {
      updateTarget(totalWords);
    }

    const intervalId = window.setInterval(() => {
      setRevealedCount((current) => {
        const target = targetCountRef.current;
        if (current >= target || current >= totalWords) return current;
        return current + 1;
      });
    }, 95);

    return () => window.clearInterval(intervalId);
  }, [enabled, totalWords]);

  return enabled ? revealedCount : totalWords;
}

export function ReducedMotionProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const defaultTransition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

type MotionDivProps = {
  variants?: Variants;
  children?: ReactNode;
  className?: string;
} & MotionProps;

export function MotionDiv({
  variants = fadeInUp,
  children,
  className,
  ...props
}: MotionDivProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  const activeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={activeVariants}
      transition={activeTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionSection({
  variants = fadeInUp,
  children,
  className,
  ...props
}: MotionDivProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  const activeVariants = prefersReducedMotion ? reducedMotionVariants : variants;
  const activeTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : defaultTransition;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={activeVariants}
      transition={activeTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function StaggerContainer({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & MotionProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={prefersReducedMotion ? reducedMotionVariants : staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & MotionProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionVariants : fadeInUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
