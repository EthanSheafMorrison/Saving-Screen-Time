import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "../../../../sanity/lib/client";
import { formatFileSize, formatTalkDate, isUpcoming } from "../../../../lib/talks";
import { portableComponents } from "../../components/portableTextComponents";
import ShareButton from "../../blog/[slug]/ShareButton";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const talk = await client.fetch<{ title: string; excerpt?: string } | null>(
    `*[_type == "talk" && slug.current == $slug][0]{ title, excerpt }`,
    { slug }
  );

  if (!talk) return {};

  return {
    title: talk.title,
    description: talk.excerpt ?? undefined,
    openGraph: {
      title: talk.title,
      description: talk.excerpt ?? undefined,
    },
  };
}

interface Download {
  _key: string;
  title?: string;
  url?: string;
  filename?: string;
  size?: number;
}

interface Talk {
  _id: string;
  title: string;
  date?: string;
  time?: string;
  event?: string;
  location?: string;
  eventLink?: string;
  speakers?: string;
  excerpt?: string;
  body?: unknown[];
  downloads?: Download[];
}

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const talk: Talk | null = await client.fetch(
    `*[_type == "talk" && slug.current == $slug][0]{
      _id, title, date, time, event, location, eventLink, speakers, excerpt, body,
      downloads[]{
        _key,
        title,
        "url": file.asset->url,
        "filename": file.asset->originalFilename,
        "size": file.asset->size
      }
    }`,
    { slug }
  );

  if (!talk) {
    notFound();
  }

  const downloads = (talk.downloads ?? []).filter((d) => d.url);
  const when = [formatTalkDate(talk.date), talk.time].filter(Boolean).join(", ");

  return (
    <main className="blog-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: talk.title,
            startDate: talk.date,
            description: talk.excerpt,
            location: talk.location ? { "@type": "Place", name: talk.location } : undefined,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className="blog-post-hero">
        <div className="section-inner">
          <Link href="/talks" className="blog-back-link">
            &larr; Back to Talks
          </Link>
          <div className="section-label">
            {isUpcoming(talk.date) ? "Upcoming talk" : "Past talk"}
            {when ? ` — ${when}` : ""}
          </div>
          <h1 className="section-title">{talk.title}</h1>
          {talk.excerpt && (
            <p className="blog-post-excerpt">{talk.excerpt}</p>
          )}

          {(talk.event || talk.eventLink || talk.location || talk.speakers) && (
            <dl className="talk-details">
              {(talk.event || talk.eventLink) && (
                <>
                  <dt>Event</dt>
                  <dd>
                    {talk.eventLink ? (
                      <a href={talk.eventLink} target="_blank" rel="noopener noreferrer">
                        {talk.event || "Event page"} ↗
                      </a>
                    ) : (
                      talk.event
                    )}
                  </dd>
                </>
              )}
              {talk.location && (
                <>
                  <dt>Location</dt>
                  <dd>{talk.location}</dd>
                </>
              )}
              {talk.speakers && (
                <>
                  <dt>Speakers</dt>
                  <dd>{talk.speakers}</dd>
                </>
              )}
            </dl>
          )}

          {/* ?dl= makes Sanity serve the file as a download under its original filename */}
          {downloads.length > 0 && (
            <ul className="talk-downloads" aria-label="Downloads">
              {downloads.map((d) => (
                <li key={d._key}>
                  <a href={`${d.url}?dl=`} className="talk-download">
                    <span className="talk-download-title">{d.title || d.filename}</span>
                    <span className="talk-download-meta">
                      PDF{d.size ? ` · ${formatFileSize(d.size)}` : ""} <span aria-hidden="true">↓</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <ShareButton title={talk.title} heading="Share this talk" />
        </div>
      </section>

      {talk.body && talk.body.length > 0 && (
        <section className="blog-post-section">
          <div className="section-inner">
            <div className="blog-post-body">
              <PortableText
                value={talk.body as Parameters<typeof PortableText>[0]["value"]}
                components={portableComponents}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
