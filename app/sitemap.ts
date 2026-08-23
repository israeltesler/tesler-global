import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { PROJECTS_PAGE_ENABLED } from "@/lib/projects-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const routes = [
    "/",
    "/services",
    ...(PROJECTS_PAGE_ENABLED ? ["/projects" as const] : []),
    "/about",
    "/terms",
    "/privacy",
    "/accessibility",
  ] as const;

  return routes.map((path, index) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith("/terms") || path.startsWith("/privacy") || path.startsWith("/accessibility")
      ? ("monthly" as const)
      : ("weekly" as const),
    priority:
      path === "/"
        ? 1
        : path === "/terms" || path === "/privacy" || path === "/accessibility"
          ? 0.3
          : index === 1
            ? 0.9
            : 0.8,
  }));
}
