export type LocalizedString = {
  id: string
  en: string
}

export type Lang = 'id' | 'en'

export function pickLocalized(value: LocalizedString, lang: Lang): string {
  return value[lang] ?? value.id
}
