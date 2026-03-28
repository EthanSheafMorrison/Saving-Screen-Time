import { client } from "../../../sanity/lib/client";

export const revalidate = 60;

interface MediaItem {
  _id: string;
  title: string;
  outlet?: string;
  date?: string;
  type?: string;
  link?: string;
  description?: string;
}

export default async function MediaPage() {
  const mediaItems: MediaItem[] = await client.fetch(
    `*[_type == "mediaItem"] | order(date desc)`
  );

  return (
    <main className="section-publications">
      <h1 className="section-header">Media</h1>
      <h2 className="section-subheader">Press coverage, podcasts, and other media featuring the team of Saving Screentime.</h2>

      <div className="index-container">
        {mediaItems.map((item) => (
          <div className="index-row" key={item._id}>
            <div className="index-meta">{item.date}</div>
            <div className="index-content">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="index-title">
                  {item.title}
                </a>
              ) : (
                <span className="index-title">{item.title}</span>
              )}
              <span className="index-author">
                {[item.outlet, item.type].filter(Boolean).join(" · ")}
              </span>
              {item.description && (
                <details style={{ marginTop: "0.75rem", textTransform: "none" }}>
                  <summary style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
                    View Summary
                  </summary>
                  <p style={{ marginTop: "0.5rem", lineHeight: "1.5" }}>{item.description}</p>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
