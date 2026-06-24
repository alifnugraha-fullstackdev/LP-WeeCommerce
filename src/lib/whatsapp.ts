export const WHATSAPP_NUMBER = '62895402254310'
export const WHATSAPP_DISPLAY = '+62 895-4022-54310'

type WhatsAppOptions = {
  text?: string
}

export function buildWhatsAppUrl({ text }: WhatsAppOptions = {}): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (text) {
    return `${base}?text=${encodeURIComponent(text)}`
  }
  return base
}

export const WHATSAPP_LINK = buildWhatsAppUrl()
