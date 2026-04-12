import { client } from "../../../sanity/lib/client";
import Link from "next/link";

export const revalidate = 60;

interface BlogPost {
  _id: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  slug?: { current: string };
  link?: string;
}

export default async function BlogPage() {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == "blogPost"] | order(date desc){ _id, title, author, date, excerpt, slug, link }`
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
              ) : post.slug?.current ? (
                <Link href={`/blog/${post.slug.current}`} className="index-title">
                  {post.title}
                </Link>
              ) : (
                <span className="index-title">{post.title}</span>
              )}
              {post.author && (
                <span className="index-author">{post.author}</span>
              )}
              {post.excerpt && (
                <p style={{ marginTop: "0.5rem", lineHeight: "1.5", textTransform: "none" }}>{post.excerpt}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
