import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import idDefault from '@/i18n/locales/id.json'
import enDefault from '@/i18n/locales/en.json'

// Key sections mapping for organized layout
const GROUPS = [
  {
    title: 'Navigasi & Branding',
    keys: ['brand.name', 'brand.tagline', 'nav.why', 'nav.services', 'nav.work', 'nav.process', 'nav.faq', 'nav.cta']
  },
  {
    title: 'Hero Section',
    keys: ['hero.eyebrow', 'hero.title', 'hero.subtitle', 'hero.ctaPrimary', 'hero.ctaSecondary']
  },
  {
    title: 'Why WeeCommerce',
    keys: ['why.label', 'why.title']
  },
  {
    title: 'Stats Section',
    keys: ['stats.projects', 'stats.uptime', 'stats.loadTime', 'stats.response']
  },
  {
    title: 'How We Work (Roadmap)',
    keys: ['process.label', 'process.title', 'process.subtitle']
  },
  {
    title: 'Services & Pricing',
    keys: [
      'services.hookLabel', 'services.hookTitle', 'services.hookBuildTitle', 'services.hookBuildDesc',
      'services.hookIntegrateTitle', 'services.hookIntegrateDesc', 'services.exploreBuild', 'services.exploreIntegrate',
      'services.tabBuild', 'services.tabIntegrate', 'services.startingFrom', 'services.mostPopular', 'services.retainNote',
      'services.ctaLaunch', 'services.ctaConvert', 'services.ctaScale', 'services.ctaModule'
    ]
  },
  {
    title: 'Our Work (NexaMart)',
    keys: ['work.label', 'work.title', 'work.subtitle', 'work.cta', 'work.demoLabel']
  },
  {
    title: 'FAQ Section',
    keys: ['faq.label', 'faq.title']
  },
  {
    title: 'CTA & Contact Settings',
    keys: [
      'cta.label', 'cta.title', 'cta.subtitle', 'cta.primary', 'cta.secondary',
      'contact.label', 'contact.name', 'contact.namePlaceholder', 'contact.email', 'contact.emailPlaceholder',
      'contact.business', 'contact.businessPlaceholder', 'contact.message', 'contact.messagePlaceholder',
      'contact.submit', 'contact.success'
    ]
  },
  {
    title: 'Footer settings',
    keys: [
      'footer.tagline', 'footer.quickLinks', 'footer.contactTitle', 'footer.email', 'footer.website',
      'footer.location', 'footer.locationValue', 'footer.response', 'footer.copyright'
    ]
  },
  {
    title: 'SEO & Metadata',
    keys: ['seo.title', 'seo.description']
  }
]

// Helpers for nested JSON paths
function getNestedValue(obj: any, path: string): string {
  const parts = path.split('.')
  let current = obj
  for (const part of parts) {
    if (current === undefined || current === null) return ''
    current = current[part]
  }
  return typeof current === 'string' ? current : ''
}

function setNestedValue(obj: any, path: string, value: string) {
  const parts = path.split('.')
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!(part in current)) {
      current[part] = {}
    }
    current = current[part]
  }
  current[parts[parts.length - 1]] = value
}

// Clone helper to prevent mutation bugs
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function AdminDashboard() {
  const { i18n } = useTranslation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Edit States
  const [currentLang, setCurrentLang] = useState<'id' | 'en'>('id')
  const [translations, setTranslations] = useState<any>({
    id: deepClone(idDefault),
    en: deepClone(enDefault)
  })
  const [activeGroup, setActiveGroup] = useState(0)
  const [toastMessage, setToastMessage] = useState('')

  // Load from LocalStorage if available
  useEffect(() => {
    const savedId = localStorage.getItem('weecommerce_cms_id')
    const savedEn = localStorage.getItem('weecommerce_cms_en')
    const sessionAuth = sessionStorage.getItem('weecommerce_admin_authenticated')

    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
    }

    setTranslations({
      id: savedId ? JSON.parse(savedId) : deepClone(idDefault),
      en: savedEn ? JSON.parse(savedEn) : deepClone(enDefault)
    })
  }, [])

  // Handle Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin123' && password === 'admin123') {
      setIsAuthenticated(true)
      sessionStorage.setItem('weecommerce_admin_authenticated', 'true')
      setLoginError('')
    } else {
      setLoginError('Kredensial tidak valid. Silakan coba lagi.')
    }
  }

  // Handle Log Out
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('weecommerce_admin_authenticated')
  }

  // Handle Input Changes
  const handleFieldChange = (key: string, val: string) => {
    setTranslations((prev: any) => {
      const copy = deepClone(prev)
      setNestedValue(copy[currentLang], key, val)
      return copy
    })
  }

  // Save changes locally
  const handleSave = () => {
    const currentBundle = translations[currentLang]
    
    // Save to LocalStorage
    localStorage.setItem(`weecommerce_cms_${currentLang}`, JSON.stringify(currentBundle))

    // Inject into i18n instantly
    i18n.addResourceBundle(currentLang, 'translation', currentBundle, true, true)

    // Trigger i18n change update
    i18n.changeLanguage(i18n.language)

    triggerToast('Konten berhasil disimpan & diperbarui secara lokal!')
  }

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang semua konten pada bahasa ini ke setelan bawaan?')) {
      const defaultValue = currentLang === 'id' ? idDefault : enDefault
      localStorage.removeItem(`weecommerce_cms_${currentLang}`)

      setTranslations((prev: any) => {
        const copy = deepClone(prev)
        copy[currentLang] = deepClone(defaultValue)
        return copy
      })

      i18n.addResourceBundle(currentLang, 'translation', defaultValue, true, true)
      i18n.changeLanguage(i18n.language)

      triggerToast('Konten disetel ulang ke bawaan!')
    }
  }

  // Export JSON file
  const handleExport = () => {
    const currentBundle = translations[currentLang]
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentBundle, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `${currentLang}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    triggerToast('Unduhan JSON dimulai! Letakkan file ini di src/i18n/locales/ untuk rilis permanen.')
  }

  // Helper for notification toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4000)
  }

  // Authentication Interface
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#181d26] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-[#1d1f25] border border-[#2a2d35] rounded-xl p-8 shadow-2xl relative">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">WeeCommerce CMS</h1>
            <p className="text-sm text-[#9297a0]">Masuk dengan kredensial administrator Anda</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9297a0] mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-4 rounded bg-[#181d26] border border-[#2a2d35] text-white focus:outline-none focus:ring-2 focus:ring-[#e54a22] transition-colors"
                placeholder="admin123"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9297a0] mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded bg-[#181d26] border border-[#2a2d35] text-white focus:outline-none focus:ring-2 focus:ring-[#e54a22] transition-colors"
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-xs text-[#dc2626] font-medium mt-1">{loginError}</p>}
            <button
              type="submit"
              className="w-full h-11 bg-[#e54a22] hover:bg-[#aa2d00] transition-colors text-white font-bold rounded mt-4 focus:outline-none focus:ring-2 focus:ring-[#e54a22] focus:ring-offset-2"
            >
              Masuk
            </button>
          </form>
          <div className="mt-8 text-center">
            <a href="/" className="text-xs text-[#9297a0] hover:text-white transition-colors">
              &larr; Kembali ke Landing Page
            </a>
          </div>
        </div>
      </div>
    )
  }

  const activeGroupData = GROUPS[activeGroup] || GROUPS[0]

  return (
    <div className="min-h-screen bg-[#181d26] text-white font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#e54a22] text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-lg animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <header className="h-16 bg-[#1d1f25] border-b border-[#2a2d35] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight">WeeCommerce <span className="text-[#e54a22]">CMS</span></span>
          <span className="text-xs text-[#9297a0] border border-[#2a2d35] rounded px-1.5 py-0.5 uppercase tracking-wider font-mono">Static Editor</span>
        </div>
        <div className="flex items-center gap-4">
          {/* i18n lang toggle */}
          <div className="inline-flex rounded-lg border border-[#2a2d35] p-0.5 bg-[#181d26]">
            {(['id', 'en'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setCurrentLang(lang)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  currentLang === lang ? 'bg-[#e54a22] text-white' : 'text-[#9297a0] hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-[#9297a0] hover:text-white border border-[#2a2d35] px-3 py-1.5 rounded transition-colors"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Dashboard Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation (Sections List) */}
        <aside className="w-64 bg-[#1d1f25] border-r border-[#2a2d35] p-4 flex flex-col gap-1 overflow-y-auto shrink-0">
          <p className="text-xs font-semibold text-[#9297a0] uppercase tracking-wider mb-4 px-2">Daftar Bagian (Sections)</p>
          {GROUPS.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGroup(idx)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors font-medium flex items-center justify-between ${
                activeGroup === idx ? 'bg-[#e54a22] text-white' : 'text-[#9297a0] hover:bg-[#181d26] hover:text-white'
              }`}
            >
              <span>{group.title}</span>
              <span className="text-[10px] font-mono opacity-50">{group.keys.length}</span>
            </button>
          ))}
          <div className="mt-auto border-t border-[#2a2d35] pt-4 flex flex-col gap-2">
            <button
              onClick={handleSave}
              className="w-full py-2 bg-[#e54a22] hover:bg-[#aa2d00] transition-colors rounded text-xs font-bold text-center"
            >
              Simpan & Terapkan
            </button>
            <button
              onClick={handleExport}
              className="w-full py-2 bg-white/5 hover:bg-white/10 transition-colors border border-[#2a2d35] rounded text-xs font-semibold text-center"
            >
              Ekspor File JSON
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2 text-[#9297a0] hover:text-[#dc2626] transition-colors rounded text-xs font-semibold text-center"
            >
              Setel Ulang ke Bawaan
            </button>
          </div>
        </aside>

        {/* Content Editing Fields */}
        <main className="flex-1 bg-[#181d26] p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Context bar */}
            <div className="flex justify-between items-center mb-8 border-b border-[#2a2d35] pb-4">
              <div>
                <h2 className="text-xl font-bold">{activeGroupData.title}</h2>
                <p className="text-xs text-[#9297a0] mt-1">Mengedit salinan teks untuk bahasa: <span className="font-bold text-white uppercase">{currentLang}</span></p>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#e54a22] hover:underline"
              >
                Lihat Hasil Live &rarr;
              </a>
            </div>

            {/* Inputs List */}
            <div className="flex flex-col gap-6">
              {activeGroupData.keys.map((key) => {
                const value = getNestedValue(translations[currentLang], key)
                const isTextarea = key.includes('desc') || key.includes('subtitle') || key.includes('message') || key.includes('success') || value.length > 50

                return (
                  <div key={key} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono text-[#9297a0]" htmlFor={key}>
                        {key}
                      </label>
                      <span className="text-[10px] text-gray-500 font-mono">Character length: {value.length}</span>
                    </div>
                    {isTextarea ? (
                      <textarea
                        id={key}
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full min-h-[100px] p-3 rounded bg-[#1d1f25] border border-[#2a2d35] text-white focus:outline-none focus:ring-2 focus:ring-[#e54a22] transition-colors text-sm font-sans resize-y"
                      />
                    ) : (
                      <input
                        id={key}
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full h-11 px-4 rounded bg-[#1d1f25] border border-[#2a2d35] text-white focus:outline-none focus:ring-2 focus:ring-[#e54a22] transition-colors text-sm"
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Footer Action Bar */}
            <div className="mt-12 pt-6 border-t border-[#2a2d35] flex justify-end gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-[#2a2d35] hover:bg-[#2a2d35] transition-colors text-xs font-semibold rounded"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#e54a22] hover:bg-[#aa2d00] transition-colors text-xs font-bold rounded"
              >
                Simpan & Terapkan Perubahan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
