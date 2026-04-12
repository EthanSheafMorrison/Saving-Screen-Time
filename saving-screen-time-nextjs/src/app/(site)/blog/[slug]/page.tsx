import { client } from "../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface BlogPost {
  _id: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  body?: unknown[];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post: BlogPost | null = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="section-publications">
      <Link href="/blog" style={{ display: "inline-block", marginBottom: "1.5rem", textDecoration: "underline" }}>
        &larr; Back to Blog
      </Link>

      <h1 className="section-header">{post.title}</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        {post.date && <span className="index-meta">{post.date}</span>}
        {post.author && <span className="index-author" style={{ marginLeft: "1rem" }}>{post.author}</span>}
      </div>

      {post.body && (post.body as unknown[]).length > 0 && (
        <div style={{ lineHeight: "1.6", textTransform: "none" }}>
          <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} />
        </div>
      )}
    </main>
  );
}
