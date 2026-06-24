import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-link)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        // Near-black primary CTA
        primary:
          'bg-[var(--color-surface-dark)] text-[var(--color-on-primary)] hover:bg-[var(--color-surface-dark-elevated)] active:bg-black rounded-[var(--radius-lg)]',
        // White outline secondary
        secondary:
          'bg-[var(--color-canvas)] text-[var(--color-ink)] border border-[var(--color-hairline)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)] rounded-[var(--radius-lg)]',
        // White button on dark surfaces
        secondaryOnDark:
          'bg-[var(--color-canvas)] text-[var(--color-ink)] border border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)] rounded-[var(--radius-lg)]',
        // Pricing sub-system pill
        pricing:
          'bg-[var(--color-canvas)] text-[var(--color-ink)] border border-[var(--color-hairline)] hover:bg-[var(--color-surface-soft)] rounded-[var(--radius-pill)]',
        // WhatsApp branded
        whatsapp:
          'bg-[var(--color-whatsapp)] text-white hover:brightness-95 active:brightness-90 rounded-[var(--radius-lg)]',
        // Ghost / text link
        ghost:
          'bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-soft)] rounded-[var(--radius-md)]',
        ghostOnDark:
          'bg-transparent text-[var(--color-on-dark)] hover:bg-white/10 rounded-[var(--radius-md)]',
      },
      size: {
        default: 'h-11 px-6 text-[16px]',
        sm: 'h-9 px-4 text-[14px]',
        lg: 'h-12 px-8 text-[16px]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
