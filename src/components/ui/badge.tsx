import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors',
  {
    variants: {
      variant: {
        // Subtle label badge
        outline:
          'border border-[var(--color-hairline)] text-[var(--color-muted)] bg-transparent rounded-[var(--radius-pill)] px-3 py-1 text-[12px] uppercase tracking-wide',
        // Featured tier marker
        featured:
          'bg-[var(--color-ink)] text-[var(--color-on-primary)] rounded-[var(--radius-pill)] px-3 py-1 text-[12px] font-medium',
        // On-dark label
        onDark:
          'border border-white/15 text-[var(--color-muted-on-dark)] bg-transparent rounded-[var(--radius-pill)] px-3 py-1 text-[12px] uppercase tracking-wide',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
