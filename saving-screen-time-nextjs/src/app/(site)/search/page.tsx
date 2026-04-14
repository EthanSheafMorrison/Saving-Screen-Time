import Link from "next/link";
import { client } from "../../../sanity/lib/client";

export const revalidate = 60;

interface SearchResult {
  _id: string;
  _type: "blogPost" | "publication" | "mediaItem";
  title: string;
  slug?: { current: string };
  authors?: string;
  author?: string;
  year?: string;
  date?: string;
  outlet?: string;
  excerpt?: string;
  description?: string;
  link?: string;
}

function groupByType(results: SearchResult[]) {
  const groups: Record<string, SearchResult[]> = {
    blogPost: [],
    publication: [],
    mediaItem: [],
  };
  for (const r of results) {
    if (groups[r._type]) groups[r._type].push(r);
  }
  return groups;
}

const groupLabels: Record<string, string> = {
  blogPost: "Blog posts",
  publication: "Publications",
  mediaItem: "Press",
};

function resultHref(r: SearchResult): string | null {
  if (r._type === "blogPost") {
    return r.slug?.current ? `/blog/${r.slug.current}` : null;
  }
  // publications and media items link out via their external URL
  return r.link ?? null;
}

function resultMeta(r: SearchResult): string {
  if (r._type === "blogPost") return r.date ?? "";
  if (r._type === "publication") return r.year ?? "";
  if (r._type === "mediaItem") return r.date ?? "";
  return "";
}

function resultByline(r: SearchResult): string {
  if (r._type === "blogPost") return r.author ?? "";
  if (r._type === "publication") return r.authors ?? "";
  if (r._type === "mediaItem") return r.outlet ?? "";
  return "";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const term = (q ?? "").trim();

  let results: SearchResult[] = [];
  if (term) {
    results = await client.fetch(
      `*[_type in ["blogPost", "publication", "mediaItem"] && (
        title match $q ||
        author match $q ||
        authors match $q ||
        outlet match $q ||
        excerpt match $q ||
        description match $q
      )] {
        _id,
        _type,
        title,
        slug,
        author,
        authors,
        year,
        date,
        outlet,
        excerpt,
        description,
        link
      }`,
      { q: `${term}*` }
    );
  }

  const groups = groupByType(results);
  const hasResults = results.length > 0;

  return (
    <main className="section-publications">
      <h1 className="section-header">Search</h1>
      <h2 className="section-subheader">
        {term
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${term}”`
          : "Enter a search term using the bar in the menu."}
      </h2>

      {term && !hasResults && (
        <p style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
          No matches. Try a different term, or{" "}
          <Link href="/" style={{ textDecoration: "underline", fontWeight: 700 }}>
            return to home
          </Link>
          .
        </p>
      )}

      {hasResults &&
        (Object.keys(groups) as Array<keyof typeof groups>).map((type) => {
          const items = groups[type];
          if (!items || items.length === 0) return null;
          return (
            <section key={type} style={{ marginTop: "2.5rem" }}>
              <h3
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "1rem",
                }}
              >
                {groupLabels[type]}
              </h3>
              <div className="index-container">
                {items.map((r) => {
                  const href = resultHref(r);
                  return (
                    <div className="index-row" key={r._id}>
                      <div className="index-meta">{resultMeta(r)}</div>
                      <div className="index-content">
                        {href ? (
                          href.startsWith("/") ? (
                            <Link href={href} className="index-title">
                              {r.title}
                            </Link>
                          ) : (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="index-title"
                            >
                              {r.title}
                            </a>
                          )
                        ) : (
                          <span className="index-title">{r.title}</span>
                        )}
                        {resultByline(r) && (
                          <span className="index-author">{resultByline(r)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
    </main>
  );
}
