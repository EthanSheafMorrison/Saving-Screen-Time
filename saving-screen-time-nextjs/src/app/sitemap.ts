import { MetadataRoute } from "next";
import { client } from "../sanity/lib/client";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: { slug: { current: string }; date: string }[] = await client.fetch(
    `*[_type == "blogPost"]{ slug, date }`
  );

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug.current}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, priority: 1.0, changeFrequency: "weekly" },
    { url: `${siteUrl}/blog`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/publications`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/team`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/media`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${siteUrl}/Studies`, priority: 0.6, changeFrequency: "monthly" },
  ];

  return [...staticRoutes, ...blogEntries];
}
