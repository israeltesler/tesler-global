"use client";

import { useEffect, type ReactNode } from "react";

const HERO_TEXTURES = [
  "/cinematic-earth/8k_earth_daymap.jpg",
  "/cinematic-earth/8k_earth_nightmap.jpg",
  "/cinematic-earth/8k_earth_specular_map.jpg",
  "/cinematic-earth/8k_earth_normal_map.jpg",
  "/cinematic-earth/8k_earth_clouds.jpg",
] as const;

export function CinematicEarthPreload(): ReactNode {
  useEffect(() => {
    void import("@/lib/cinematic-earth/engine.js");

    for (const href of HERO_TEXTURES) {
      const existing = document.head.querySelector(`link[data-preload="${href}"]`);
      if (existing) continue;

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      link.dataset.preload = href;
      document.head.appendChild(link);
    }
  }, []);

  return null;
}
