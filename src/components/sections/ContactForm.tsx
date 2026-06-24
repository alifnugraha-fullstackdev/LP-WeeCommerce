import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input, Textarea, Label } from '@/components/ui/input'
import { Mail } from '@/components/icons'

type FormState = {
  name: string
  email: string
  business: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ open }: { open: boolean }) {
  const { t } = useTranslation()
  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    business: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = (vals: FormState): Errors => {
    const errs: Errors = {}
    if (!vals.name.trim()) errs.name = t('contact.errors.name')
    if (!vals.email.trim() || !EMAIL_RE.test(vals.email)) errs.email = t('contact.errors.email')
    if (!vals.business.trim()) errs.business = t('contact.errors.business')
    if (!vals.message.trim()) errs.message = t('contact.errors.message')
    return errs
  }

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        throw new Error(result.message)
      }
    } catch (err) {
      console.warn('API form submission failed, opening email client fallback:', err)
      const subject = encodeURIComponent(
        `Project Inquiry — ${values.business} (${values.name})`,
      )
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name}\n${values.email}\n${values.business}`,
      )
      window.location.href = `mailto:alifnugraha.studio@gmail.com?subject=${subject}&body=${body}`
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${
          open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-8 text-center">
          <Mail className="h-8 w-8 text-[var(--color-success)] mx-auto mb-4" />
          <p className="text-title-md mb-2">{t('contact.success')}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${
        open ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] p-6 md:p-8"
        noValidate
      >
        <p className="text-caption mb-6">{t('contact.label')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="name">{t('contact.name')}</Label>
            <Input
              id="name"
              value={values.name}
              onChange={update('name')}
              placeholder={t('contact.namePlaceholder')}
              error={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p id="name-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">{t('contact.email')}</Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={update('email')}
              placeholder={t('contact.emailPlaceholder')}
              error={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p id="email-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.email}</p>}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="business">{t('contact.business')}</Label>
          <Input
            id="business"
            value={values.business}
            onChange={update('business')}
            placeholder={t('contact.businessPlaceholder')}
            error={!!errors.business}
            aria-describedby={errors.business ? "business-error" : undefined}
            aria-invalid={!!errors.business}
          />
          {errors.business && <p id="business-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.business}</p>}
        </div>

        <div className="mb-6">
          <Label htmlFor="message">{t('contact.message')}</Label>
          <Textarea
            id="message"
            value={values.message}
            onChange={update('message')}
            placeholder={t('contact.messagePlaceholder')}
            error={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p id="message-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.message}</p>}
        </div>

        <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
          {sending ? t('contact.sending') : t('contact.submit')}
        </Button>
      </form>
    </div>
  )
}
