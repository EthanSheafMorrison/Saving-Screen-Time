import type { Metadata } from "next";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { formatTalkDate, isUpcoming } from "../../../lib/talks";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Talks",
  description:
    "Upcoming and past talks from the Saving Screen Time project, with slides and brochures to download.",
};

interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  time?: string;
  event?: string;
  location?: string;
  excerpt?: string;
  downloadCount?: number;
}

function TalkRows({ talks }: { talks: Talk[] }) {
  return (
    <div className="index-container">
      {talks.map((talk) => (
        <div className="index-row" key={talk._id}>
          <div className="index-meta">
            {formatTalkDate(talk.date)}
            {talk.time && <span className="talk-time">{talk.time}</span>}
          </div>
          <div className="index-content">
            <Link href={`/talks/${talk.slug.current}`} className="index-title">
              {talk.title}
            </Link>
            {(talk.event || talk.location) && (
              <span className="index-author">
                {[talk.event, talk.location].filter(Boolean).join(" · ")}
              </span>
            )}
            {talk.excerpt && (
              <p style={{ marginTop: "0.5rem", lineHeight: "1.5", textTransform: "none" }}>{talk.excerpt}</p>
            )}
            {talk.downloadCount > 0 && (
              <span className="index-venue">
                {talk.downloadCount} {talk.downloadCount === 1 ? "PDF" : "PDFs"} to download
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function TalksPage() {
  const talks: Talk[] = await client.fetch(
    `*[_type == "talk" && defined(slug.current)] | order(date asc){
      _id, title, slug, date, time, event, location, excerpt,
      "downloadCount": count(downloads)
    }`
  );

  // Soonest first for upcoming talks, most recent first for past ones.
  const upcoming = talks.filter((talk) => isUpcoming(talk.date));
  const past = talks.filter((talk) => !isUpcoming(talk.date)).reverse();

  return (
    <main className="section-publications">
      <h1 className="section-header">Talks</h1>
      <h2 className="section-subheader">Upcoming and past talks from the Saving Screentime team.</h2>

      <h3 className="talks-group-label">Upcoming</h3>
      {upcoming.length > 0 ? (
        <TalkRows talks={upcoming} />
      ) : (
        <p className="talks-empty">No upcoming talks right now. Check back soon.</p>
      )}

      {past.length > 0 && (
        <>
          <h3 className="talks-group-label">Past Talks</h3>
          <TalkRows talks={past} />
        </>
      )}
    </main>
  );
}
