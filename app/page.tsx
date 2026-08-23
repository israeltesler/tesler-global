import { HomeLanding } from "@/components/landing/home-landing";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "בית",
  description: `${siteConfig.description} ${siteConfig.name} — עיצוב ובניית אתרים לעסקים.`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return <HomeLanding />;
}
