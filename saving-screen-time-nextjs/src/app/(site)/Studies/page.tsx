import type { Metadata } from "next";
import Image from "next/image";
import { client } from "../../../sanity/lib/client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Studies",
  description:
    "Current and upcoming research studies exploring ADHD and digital technology use.",
};

interface Study {
  _id: string;
  title: string;
  status: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export default async function CurrentStudies() {
  // Fetch studies and use a GROQ projection to grab the direct URL of the uploaded image
  const studies: Study[] = await client.fetch(`
    *[_type == "study"] | order(_createdAt desc) {
      _id,
      title,
      status,
      description,
      "imageUrl": image.asset->url,
      link
    }
  `);

  return (
    <main className="section-publications">
      <h1 className="section-header">Current Studies</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        {studies.map((study) => (
          <article key={study._id} style={{ borderBottom: "2px solid var(--black)", paddingBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
              <h2 className="index-title" style={{ fontSize: "2.5rem", color: "var(--black)" }}>
                {study.title}
              </h2>
              <div className="index-meta" style={{ color: "var(--blue)", fontWeight: "bold", flexShrink: 0, marginLeft: '1rem' }}>
                {study.status}
              </div>
            </div>

            {study.imageUrl && (
              <div style={{ position: "relative", width: "100%", height: "350px", margin: "2rem 0" }}>
                <Image src={study.imageUrl} alt={study.title} fill style={{ objectFit: "cover", border: "2px solid var(--black)" }} />
              </div>
            )}

            {study.description && (
              <p style={{ fontSize: "1.2rem", lineHeight: 1.7, maxWidth: "45em", marginBottom: "2rem" }}>
                {study.description}
              </p>
            )}

            {study.link && (
              <a href={study.link} target="_blank" rel="noopener noreferrer" className="stripe-link" style={{ backgroundColor: "var(--blue)", color: "var(--white)", padding: "0.75rem 1.5rem" }}>
                READ MORE ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}