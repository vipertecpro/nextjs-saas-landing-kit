import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { PostBody } from "@/components/post-body";
import { getPost, getPosts } from "@/lib/api";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article className="py-20">
      <div className="container-page flex max-w-3xl flex-col gap-8">
        <Link href="/blog" className="w-fit rounded-sm text-sm text-muted-foreground hover:text-foreground">
          ← All posts
        </Link>
        <header className="flex flex-col gap-4">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          <p className="text-sm text-muted-foreground">
            {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
        </header>
        <PostBody blocks={post.body} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </article>
  );
}
