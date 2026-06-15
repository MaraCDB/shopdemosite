import type { ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
  external?: boolean
  className?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  external = false,
  className = '',
}: ButtonLinkProps) {
  const base =
    'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-[var(--radius)] transition-colors'
  const styles =
    variant === 'solid'
      ? 'bg-[var(--primary)] text-[var(--primary-contrast)] hover:opacity-90'
      : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]'
  const extra = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...extra}>
      {children}
    </a>
  )
}
