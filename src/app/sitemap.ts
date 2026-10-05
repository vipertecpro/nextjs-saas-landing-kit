import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/blog", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
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
