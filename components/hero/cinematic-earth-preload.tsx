"use client";

import { useEffect, type ReactNode } from "react";

const CRITICAL_TEXTURE = "/cinematic-earth/hero/8k_earth_daymap.jpg";

const DEFERRED_TEXTURES = [
  "/cinematic-earth/hero/8k_earth_normal_map.jpg",
  "/cinematic-earth/hero/8k_earth_specular_map.jpg",
  "/cinematic-earth/hero/8k_earth_clouds.jpg",
  "/cinematic-earth/hero/8k_earth_nightmap.jpg",
] as const;

function preloadTexture(href: string, priority: "high" | "low"): void {
  const existing = document.head.querySelector(`link[data-preload="${href}"]`);
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  link.dataset.preload = href;
  if (priority === "high") {
    link.setAttribute("fetchpriority", "high");
  }
  document.head.appendChild(link);
}

export function CinematicEarthPreload(): ReactNode {
  useEffect(() => {
    preloadTexture(CRITICAL_TEXTURE, "high");
    void import("@/lib/cinematic-earth/engine.js");

    const deferId = window.setTimeout(() => {
      for (const href of DEFERRED_TEXTURES) {
        preloadTexture(href, "low");
      }
    }, 1200);

    return () => window.clearTimeout(deferId);
  }, []);

  return null;
}
