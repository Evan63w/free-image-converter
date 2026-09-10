import type { MetadataRoute } from "next";
import { converterPages } from "./converterPages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [
        {
            url: "https://www.freeimageconverterfree.xyz/",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        ...["about", "privacy", "how-it-works", "faq"].map((slug) => ({
            url: `https://www.freeimageconverterfree.xyz/${slug}`,
            changeFrequency: "yearly" as const,
            priority: 0.5,
        })),
        ...converterPages.map(({ slug }) => ({
            url: `https://www.freeimageconverterfree.xyz/convert/${slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
    ];

    return pages;
}