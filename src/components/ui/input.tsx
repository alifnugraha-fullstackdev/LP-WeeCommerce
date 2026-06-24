import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex w-full h-11 rounded-[var(--radius-sm)] border bg-[var(--color-canvas)] px-4 text-[var(--color-ink)] text-[14px]',
          'placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-link)]/40 focus:border-[var(--color-link)]',
          'transition-colors duration-150',
          error
            ? 'border-[var(--color-error)]'
            : 'border-[var(--color-hairline)]',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex w-full min-h-[120px] rounded-[var(--radius-sm)] border bg-[var(--color-canvas)] px-4 py-3 text-[var(--color-ink)] text-[14px]',
        'placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-link)]/40 focus:border-[var(--color-link)]',
        'transition-colors duration-150 resize-y',
        error
          ? 'border-[var(--color-error)]'
          : 'border-[var(--color-hairline)]',
        className,
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-[14px] font-medium text-[var(--color-ink)] mb-2 block', className)}
    {...props}
  />
))
Label.displayName = 'Label'

export { Input, Textarea, Label }
