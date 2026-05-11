"use client";

import { useState } from "react";
import Link from "next/link";

export interface BlogPost {
  _id: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  slug?: { current: string };
  link?: string;
  tags?: string[];
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [query, setQuery] = useState("");

  const needle = query.toLowerCase();

  const sortedPosts = [...posts]
    .filter((post) => {
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.author?.toLowerCase().includes(needle) ||
        post.excerpt?.toLowerCase().includes(needle) ||
        post.tags?.some((t) => t.toLowerCase().includes(needle))
      );
    })
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return order === "desc" ? db - da : da - db;
    });

  return (
    <>
      <div className="sort-controls">
        <input
          className="blog-search"
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="sort-toggle"
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
        >
          {order === "desc" ? "Oldest First" : "Newest First"}
        </button>
      </div>

      <div className="index-container">
        {sortedPosts.map((post) => (
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
    </>
  );
}
