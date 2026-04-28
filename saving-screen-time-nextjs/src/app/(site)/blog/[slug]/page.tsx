import type { Metadata } from "next";
import { client } from "../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollProgress from "./ScrollProgress";
import SectionReveal from "./SectionReveal";
import ShareButton from "./ShareButton";
import { urlFor } from "../../../../sanity/lib/image";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<{
    title: string;
    excerpt?: string;
    date?: string;
    imageUrl?: string;
  } | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title, excerpt, date,
      "imageUrl": body[_type == "image"][0].asset->url
    }`,
    { slug }
  );

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.date ?? undefined,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

interface BlogPost {
  _id: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  body?: unknown[];
}

interface Block {
  _type: string;
  _key?: string;
  style?: string;
  children?: { text: string }[];
}

const portableComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <figure className="blog-pullquote">
        <blockquote>{children}</blockquote>
      </figure>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1200).url();
      return (
        <figure className="blog-post-image">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto" }}
          />
          {value.caption && (
            <figcaption className="blog-post-image-caption">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function groupByHeadings(
  blocks: Block[],
  postTitle?: string
): { heading: string | null; blocks: Block[] }[] {
  const groups: { heading: string | null; blocks: Block[] }[] = [];
  const normalizedTitle = (postTitle ?? "").trim().toLowerCase();

  for (const block of blocks) {
    if (
      block._type === "block" &&
      (block.style === "h1" || block.style === "h2" || block.style === "h3")
    ) {
      const text = block.children?.map((c) => c.text).join("") || "";
      if (groups.length === 0 && text.trim().toLowerCase() === normalizedTitle) {
        continue; // skip: duplicate of the hero h1
      }
      groups.push({ heading: text, blocks: [] });
    } else {
      if (groups.length === 0) {
        groups.push({ heading: null, blocks: [] });
      }
      groups[groups.length - 1].blocks.push(block);
    }
  }

  return groups;
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

  const sections = post.body ? groupByHeadings(post.body as Block[], post.title) : [];

  return (
    <main className="blog-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            author: post.author ? { "@type": "Person", name: post.author } : undefined,
            description: post.excerpt,
          }),
        }}
      />
      <ScrollProgress />
      <SectionReveal />
      {/* Hero section */}
      <section className="blog-post-hero">
        <div className="section-inner">
          <Link href="/blog" className="blog-back-link">
            &larr; Back to Blog
          </Link>
          <div className="section-label">
            {post.date}{post.author ? ` — ${post.author}` : ""}
          </div>
          <h1 className="section-title">{post.title}</h1>
          {post.excerpt && (
            <p className="blog-post-excerpt">{post.excerpt}</p>
          )}
          <ShareButton title={post.title} />
        </div>
      </section>

      {/* Body sections grouped by headings */}
      {sections.map((section, i) => {
        return (
          <section key={i} className="blog-post-section">
            <div className="section-inner">
              {section.heading && (
                <h2 id={slugify(section.heading)} className="section-title">
                  {section.heading}
                </h2>
              )}
              {section.blocks.length > 0 && (
                <div className="blog-post-body">
                  <PortableText
                    value={section.blocks as Parameters<typeof PortableText>[0]["value"]}
                    components={portableComponents}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
