"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

import { siteContent } from "@/lib/site-content";

const WHATSAPP_URL = siteContent.whatsapp.url;
const EASE = [0.22, 1, 0.36, 1] as const;

type ContactButtonProps = {
  variant?: "default" | "hero" | "overlay";
  label?: string;
};

export function ContactButton({
  variant = "default",
  label,
}: ContactButtonProps): ReactNode {
  const isHero = variant === "hero";
  const isOverlay = variant === "overlay";
  const buttonLabel = label ?? "צור קשר";

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      layout
      transition={{ layout: { duration: 0.55, ease: EASE } }}
      style={{ borderRadius: 12 }}
      className={`focus-ring relative inline-flex h-11 cursor-pointer items-center justify-center px-5 text-sm font-medium ${
        isOverlay
          ? "bg-transparent px-0 text-[#D7E2EA] hover:opacity-70"
          : isHero
            ? "bg-white text-neutral-950"
            : "bg-foreground text-background"
      }`}
    >
      <span className="inline-flex items-center gap-2 whitespace-nowrap">
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{buttonLabel}</span>
      </span>
    </motion.a>
  );
}
