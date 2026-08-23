import type { ReactNode } from "react";

type AccentProps = {
  children: ReactNode;
  className?: string;
  /** For text on dark backgrounds (hero) */
  light?: boolean;
};

export function Accent({ children, className = "", light = false }: AccentProps): ReactNode {
  return (
    <span className={light ? `text-accent-light ${className}`.trim() : `text-accent ${className}`.trim()}>
      {children}
    </span>
  );
}
