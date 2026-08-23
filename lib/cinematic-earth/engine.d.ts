export type CinematicEarthEngine = {
  dispose: () => void;
  handleResize: () => void;
  setHeroScrollProgress: (progress: number) => void;
  setEarthVisible: (visible: boolean) => void;
};

export type CreateHeroEngine = (
  canvas: HTMLCanvasElement,
  options?: {
    onProgress?: (message: string) => void;
    onReady?: () => void;
  }
) => Promise<CinematicEarthEngine>;

declare module "@/lib/cinematic-earth/engine.js" {
  export const createHeroEngine: CreateHeroEngine;
}
