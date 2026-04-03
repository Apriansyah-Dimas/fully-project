'use client'

import { forwardRef } from 'react'

interface ContactLinkProps {
  className?: string
  href?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export const ContactLink = forwardRef<HTMLAnchorElement, ContactLinkProps>(
  ({ className, href = '/contact', onMouseEnter, onMouseLeave, onClick }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={className}
      >
        Contact
      </a>
    )
  }
)

ContactLink.displayName = 'ContactLink'
