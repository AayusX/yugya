import type { Metadata } from "next";
import { SITE_URL } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * Builds consistent per-page metadata: canonical URL, Open Graph, and Twitter card.
 * `path` must start and end with a slash to match `trailingSlash: true`.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/assets/brand/yugya-og.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: "Yugya",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Yugya — web development company in Nepal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: image,
          alt: "Yugya — web development company in Nepal",
        },
      ],
    },
  };
}
