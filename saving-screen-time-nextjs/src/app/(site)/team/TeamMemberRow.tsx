import type { TeamMember } from './page'

export default function TeamMemberRow({ member }: { member: TeamMember }) {
  const brandBlue = '#1222e5'

  return (
    <div
      style={{
        position: 'relative',
        padding: '3rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <h2
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 700,
            color: brandBlue,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {member.name}
        </h2>

        <div
          style={{
            marginTop: '1rem',
            fontSize: '1rem',
            fontWeight: 500,
            color: brandBlue,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {member.role || 'LEAD RESEARCHER'}
        </div>

        {member.bio && (
          <details className="team-member-bio" style={{ marginTop: '1.5rem', color: brandBlue }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              View Bio
            </summary>
            <p style={{ marginTop: '0.5rem', lineHeight: '1.5', maxWidth: '45em' }}>
              {member.bio}
            </p>
            {member.link && (
              <a
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  fontWeight: 'bold',
                  color: brandBlue,
                  textDecoration: 'underline',
                }}
              >
                View Profile
              </a>
            )}
          </details>
        )}
      </div>
    </div>
  )
}
