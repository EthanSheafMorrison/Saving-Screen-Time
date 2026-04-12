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

interface Block {
  _type: string;
  _key?: string;
  style?: string;
  children?: { text: string }[];
}

const sectionThemes = [
  { bg: "var(--blue, #0F29EC)", fg: "var(--white, #CFCCD3)" },
  { bg: "var(--yellow, #E7FF00)", fg: "var(--blue, #0F29EC)" },
  { bg: "var(--white, #CFCCD3)", fg: "var(--blue, #0F29EC)" },
  { bg: "var(--black, #050505)", fg: "var(--white, #CFCCD3)" },
  { bg: "var(--red, #ff0000)", fg: "var(--white, #CFCCD3)" },
];

function groupByHeadings(blocks: Block[]): { heading: string | null; blocks: Block[] }[] {
  const groups: { heading: string | null; blocks: Block[] }[] = [];

  for (const block of blocks) {
    if (block._type === "block" && (block.style === "h1" || block.style === "h2" || block.style === "h3")) {
      const text = block.children?.map((c) => c.text).join("") || "";
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

  const sections = post.body ? groupByHeadings(post.body as Block[]) : [];

  return (
    <main className="blog-post">
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
        </div>
      </section>

      {/* Body sections grouped by headings */}
      {sections.map((section, i) => {
        const theme = sectionThemes[i % sectionThemes.length];
        return (
          <section
            key={i}
            className="blog-post-section"
            style={{
              background: theme.bg,
              color: theme.fg,
            }}
          >
            <div className="section-inner">
              {section.heading && (
                <h2 className="section-title">{section.heading}</h2>
              )}
              {section.blocks.length > 0 && (
                <div className="blog-post-body">
                  <PortableText
                    value={section.blocks as Parameters<typeof PortableText>[0]["value"]}
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
