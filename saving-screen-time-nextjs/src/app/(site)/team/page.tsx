import { client } from "../../../sanity/lib/client";
import TeamMemberRow from "./TeamMemberRow";

export const revalidate = 60;

export interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  link?: string;
}

export default async function TeamPage() {
  const teamMembers: TeamMember[] = await client.fetch(
    `*[_type == "teamMember"] | order(name asc) {
      _id,
      name,
      role,
      bio,
      "imageUrl": image.asset->url,
      link
    }`
  );

  return (
    <main className="section-publications">
      <h1 className="section-header">Our Team</h1>

      <div className="index-container">
        {teamMembers.map((member) => (
          <TeamMemberRow key={member._id} member={member} />
        ))}
      </div>
    </main>
  );
}