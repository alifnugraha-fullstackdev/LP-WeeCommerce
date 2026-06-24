import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import id from './locales/id.json'
import en from './locales/en.json'

// Load saved CMS overrides if any exist
const savedId = localStorage.getItem('weecommerce_cms_id')
const savedEn = localStorage.getItem('weecommerce_cms_en')

const resourceId = savedId ? JSON.parse(savedId) : id
const resourceEn = savedEn ? JSON.parse(savedEn) : en

i18n.use(initReactI18next).init({
  resources: {
    id: { translation: resourceId },
    en: { translation: resourceEn },
  },
  lng: 'id',
  fallbackLng: 'id',
  interpolation: { escapeValue: false },
})

export default i18n
