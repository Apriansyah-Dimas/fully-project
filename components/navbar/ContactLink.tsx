'use client'

import { forwardRef } from 'react'

interface ContactLinkProps {
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export const ContactLink = forwardRef<HTMLButtonElement, ContactLinkProps>(
  ({ className, onMouseEnter, onMouseLeave, onClick }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={className}
      >
        Contact
      </button>
    )
  }
)

ContactLink.displayName = 'ContactLink'
