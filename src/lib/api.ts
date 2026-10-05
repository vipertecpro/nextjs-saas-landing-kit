import { changelog, comparison } from "@/data/pages";
import { posts } from "@/data/posts";
import { sections } from "@/data/sections";
import type { Comparison, Post, PostSummary, Release, SectionData, SectionId } from "@/data/types";

/**
 * How pages get their data. With API_URL unset, it comes from the dummy
 * data in src/data (the same data the routes in src/app/api serve). Set
 * API_URL to your backend's base URL and every page loads from there
 * instead, refreshed at most once a minute. Your backend only has to answer
 * the same paths with the same JSON (see src/data/types.ts).
 *
 * Pages call these functions rather than fetching /api themselves: during
 * `next build` there is no server running to answer, and it saves a
 * round trip at runtime.
 */
const apiUrl = process.env.API_URL?.replace(/\/$/, "");

async function load<T>(path: string, fallback: () => T): Promise<T> {
  if (!apiUrl) {
    return fallback();
  }

  const response = await fetch(`${apiUrl}${path}`, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`GET ${apiUrl}${path} answered ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getSection<Id extends SectionId>(id: Id): Promise<SectionData[Id]> {
  return load(`/sections/${id}`, () => sections[id]);
}

export function getPosts(): Promise<PostSummary[]> {
  return load("/posts", () =>
    posts
      .map(({ slug, title, description, date, author, readingMinutes }) => ({ slug, title, description, date, author, readingMinutes }))
      .sort((a, b) => b.date.localeCompare(a.date)),
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!apiUrl) {
    return posts.find((post) => post.slug === slug) ?? null;
  }

  const response = await fetch(`${apiUrl}/posts/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`GET ${apiUrl}/posts/${slug} answered ${response.status}`);
  }

  return (await response.json()) as Post;
}

export function getChangelog(): Promise<Release[]> {
  return load("/changelog", () => changelog);
}

export function getComparison(): Promise<Comparison> {
  return load("/comparison", () => comparison);
}
