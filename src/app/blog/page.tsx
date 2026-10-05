import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { formatPostDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building and shipping products with small teams.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="py-20">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading as="h1" eyebrow="Blog" title="Notes on shipping better products" subtitle="Practical ideas from our team and customers." />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <li key={post.slug}>
              <article className="group relative flex h-full flex-col gap-3 rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40">
                <p className="text-sm text-muted-foreground">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
                </p>
                <h2 className="text-lg font-semibold text-balance">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground">{post.description}</p>
                <p className="mt-auto text-sm font-medium text-primary">Read post →</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
