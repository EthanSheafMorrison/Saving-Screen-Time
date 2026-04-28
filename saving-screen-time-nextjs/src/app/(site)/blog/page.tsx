import { client } from "../../../sanity/lib/client";
import BlogList, { BlogPost } from "./BlogList";

export const revalidate = 60;

export default async function BlogPage() {
  const posts: BlogPost[] = await client.fetch(
    `*[_type == "blogPost"] | order(date desc){ _id, title, author, date, excerpt, slug, link }`
  );

  return (
    <main className="section-publications">
      <h1 className="section-header">Blog</h1>
      <h2 className="section-subheader">Insights, updates, and research from the Saving Screentime team.</h2>
      <BlogList posts={posts} />
    </main>
  );
}
