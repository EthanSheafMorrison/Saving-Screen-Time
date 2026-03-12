export default function Team() {
  return (
    <section className="section-publications">
    <h1 className="section-header">Research Team</h1>
    
    <div className="team-list">
        <div className="team-member">
            <h3 className="team-name">Alex Beattie</h3>
            <div className="team-role">Lead Researcher</div>
            <img className="team-hover-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Portrait of Alex Beattie" />
        </div>

        <div className="team-member">
            <h3 className="team-name">Jane Doe</h3>
            <div className="team-role">Digital Sociologist</div>
            <img className="team-hover-img" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" alt="Portrait of Jane Doe" />
        </div>

        <div className="team-member">
            <h3 className="team-name">Marcus Chen</h3>
            <div className="team-role">Data Analyst</div>
            <img className="team-hover-img" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80" alt="Portrait of Marcus Chen" />
        </div>
    </div>
</section>
  );
}
