"use client";

import type { ReactNode } from "react";

import { ScrollProgress } from "@/components/layout/scroll-progress";

export function SiteShell({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}
