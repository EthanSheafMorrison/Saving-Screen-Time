'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { TeamMember } from './page'

export default function TeamMemberRow({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false)

  // Matching the striking blue from your screenshots
  const brandBlue = '#1222e5'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        padding: '3rem 0', // Spacing above and below the name
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)', // Subtle bottom border line
        cursor: 'pointer',
      }}
    >
      {/* Background Hover Image */}
      {member.imageUrl && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px', // Adjust size as needed
            height: '400px',
            zIndex: 0, // Keeps the image behind the text
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isHovered ? 0.4 : 0, // Fades in on hover
            filter: 'grayscale(100%) contrast(120%)', // Creates the washed-out black and white effect
            mixBlendMode: 'multiply', // Blends nicely with the light gray background
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
        {/* Name - Now with movement effect */}
        <h2
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)', // Massive, responsive text
            fontWeight: 700,
            color: brandBlue,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            // --- MOVEMENT EFFECT ---
            // Initial position (unhovered) is offset -10px, final position (hovered) is 0
            transform: isHovered ? 'translateX(0px)' : 'translateX(-10px)',
            transition: 'transform 0.3s ease-in-out',
            // ---------------------
          }}
        >
          {member.name}
        </h2>

        {/* Role */}
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

        {/* Keeping your existing Bio & Profile link, styled to match */}
        {member.bio && (
          <details style={{ marginTop: '1.5rem', color: brandBlue }}>
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