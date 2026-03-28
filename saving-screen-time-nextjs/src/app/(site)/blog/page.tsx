import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

interface BlogPost {
  _id: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  body?: unknown[];
  link?: string;
}

export default async function BlogPage() {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == "blogPost"] | order(date desc)`
  );

  return (
    <main className="section-publications">
      <h1 className="section-header">Blog</h1>
      <h2 className="section-subheader">Insights, updates, and research from the Saving Screentime team.</h2>

      <div className="index-container">
        {posts.map((post) => (
          <div className="index-row" key={post._id}>
            <div className="index-meta">{post.date}</div>
            <div className="index-content">
              {post.link ? (
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="index-title">
                  {post.title}
                </a>
              ) : (
                <span className="index-title">{post.title}</span>
              )}
              {post.author && (
                <span className="index-author">{post.author}</span>
              )}
              {post.excerpt && !post.body && (
                <p style={{ marginTop: "0.5rem", lineHeight: "1.5", textTransform: "none" }}>{post.excerpt}</p>
              )}
              {post.body && (post.body as unknown[]).length > 0 && (
                <details style={{ marginTop: "0.75rem", textTransform: "none" }}>
                  <summary style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
                    Read More
                  </summary>
                  <div style={{ marginTop: "0.5rem", lineHeight: "1.6" }}>
                    <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} />
                  </div>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
