import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const pages = ["", "/pricing", "/compare", "/changelog", "/waitlist", "/blog", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articles = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
