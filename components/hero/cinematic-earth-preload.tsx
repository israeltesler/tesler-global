"use client";

import { useEffect, type ReactNode } from "react";

const CRITICAL_TEXTURES = [
  "/cinematic-earth/8k_earth_daymap.jpg",
  "/cinematic-earth/8k_earth_normal_map.jpg",
] as const;

const DEFERRED_TEXTURES = [
  "/cinematic-earth/8k_earth_nightmap.jpg",
  "/cinematic-earth/8k_earth_specular_map.jpg",
  "/cinematic-earth/8k_earth_clouds.jpg",
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
    void import("@/lib/cinematic-earth/engine.js");

    for (const href of CRITICAL_TEXTURES) {
      preloadTexture(href, "high");
    }

    const deferId = window.setTimeout(() => {
      for (const href of DEFERRED_TEXTURES) {
        preloadTexture(href, "low");
      }
    }, 1500);

    return () => window.clearTimeout(deferId);
  }, []);

  return null;
}
