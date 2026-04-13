'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { TeamMember } from './page'

export default function TeamMemberRow({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false)

  const brandBlue = '#1222e5'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '3rem 0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
      }}
    >
      {/* Hover Image — bottom-right corner */}
      {member.imageUrl && (
        <div
          className="team-member-image"
          style={{
            position: 'absolute',
            top: '3rem',
            right: 0,
            width: '350px',
            height: '350px',
            zIndex: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isHovered ? 0.5 : 0,
            filter: 'grayscale(100%) contrast(120%)',
            mixBlendMode: 'multiply',
          }}
        >
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 700,
            color: brandBlue,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            transform: isHovered ? 'translateX(0px)' : 'translateX(-10px)',
            transition: 'transform 0.3s ease-in-out',
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
          <details className="team-member-bio" style={{ marginTop: '1.5rem', color: brandBlue, maxWidth: 'calc(100% - 370px)' }}>
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
