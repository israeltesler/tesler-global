import type { ReactNode } from "react";

type StudioWordmarkProps = {
  size?: "hero" | "footer" | "header";
  tone?: "light" | "auto";
  className?: string;
};

const sizeClasses = {
  hero: "text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem]",
  footer: "text-[1.35rem] sm:text-[1.5rem]",
  header: "text-[0.95rem] sm:text-[1.05rem] md:text-[1.15rem] tracking-[0.16em]",
} as const;

const toneClasses = {
  light: "text-white",
  auto: "text-foreground",
} as const;

export function StudioWordmark({
  size = "hero",
  tone = "light",
  className = "",
}: StudioWordmarkProps): ReactNode {
  return (
    <span
      aria-label="tesler studio"
      className={`font-sans font-extralight lowercase tracking-[0.14em] ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}
    >
      tesler studio
    </span>
  );
}
