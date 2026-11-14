import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required so the route is prerendered by `output: "export"`.
export const dynamic = "force-static";

const ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/savor/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/campusflow/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/stockwise/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/worknest/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work/serverscope/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // No <lastmod>: a build timestamp is not a verified last significant change,
  // and Google only uses <lastmod> when it is consistently accurate.
  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
