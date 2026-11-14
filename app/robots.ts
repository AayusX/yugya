import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required so the route is prerendered by `output: "export"`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Yandex's non-standard Host directive expects a hostname, not a URL.
    host: new URL(SITE_URL).host,
  };
}
