import { client } from "../../../sanity/lib/client";

export const revalidate = 60;

interface Publication {
  _id: string;
  title: string;
  authors: string;
  year: string;
  link: string;
  description?: string;
}

export default async function Publications() {
  const publications: Publication[] = await client.fetch(
    `*[_type == "publication"] | order(year desc)`
  );

  return (
    <main className="section-publications">
      <h1 className="section-header">Publications & Projects</h1>
      
      <div className="index-container">
        {publications.map((pub) => (
          <div className="index-row" key={pub._id}>
            <div className="index-meta">{pub.year}</div>
            <div className="index-content">
              {pub.link ? (
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="index-title">
                  {pub.title}
                </a>
              ) : (
                <span className="index-title">{pub.title}</span>
              )}
              <span className="index-author">{pub.authors}</span>
              {pub.description && (
                <details style={{ marginTop: "0.75rem", textTransform: "none" }}>
                  <summary style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>
                    View Summary
                  </summary>
                  <p style={{ marginTop: "0.5rem", lineHeight: "1.5" }}>{pub.description}</p>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
