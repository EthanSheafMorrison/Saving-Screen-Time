import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";
import { matchPages } from "../../../lib/searchPages";

// Live search endpoint used by the navbar search dropdown. Mirrors the GROQ
// query on the /search page but caps the result count for a compact preview,
// and merges in matching static pages (tools + key sections).
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = (searchParams.get("q") ?? "").trim();

  if (!term) {
    return NextResponse.json({ results: [] });
  }

  const pages = matchPages(term);

  const content = await client.fetch(
    `*[_type in ["blogPost", "publication", "mediaItem"] && (
      title match $q ||
      author match $q ||
      authors match $q ||
      outlet match $q ||
      excerpt match $q ||
      description match $q
    )] | order(_type asc)[0...8] {
      _id,
      _type,
      title,
      slug,
      author,
      authors,
      year,
      date,
      outlet,
      link
    }`,
    { q: `${term}*` }
  );

  return NextResponse.json({ results: [...pages, ...content] });
}
