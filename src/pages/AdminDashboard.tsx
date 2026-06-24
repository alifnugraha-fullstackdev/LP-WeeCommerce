import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import idDefault from '@/i18n/locales/id.json'
import enDefault from '@/i18n/locales/en.json'

// Friendly names for dynamic namespaces
const CATEGORY_NAMES: Record<string, string> = {
  brand: 'Brand & Branding',
  nav: 'Menu Navigasi',
  lang: 'Nama Bahasa',
  hero: 'Hero Banner',
  why: 'Why WeeCommerce',
  process: 'How We Work (Roadmap)',
  stats: 'Stats & Telemetri',
  services: 'Services & Pricing',
  work: 'Our Work (NexaMart)',
  faq: 'FAQ Accordion',
  cta: 'CTA Section',
  contact: 'Contact Form',
  footer: 'Footer & Informasi Kontak',
  seo: 'SEO & Meta Tags'
}

// Flatten nested JSON object to dotted paths (e.g., "hero.title")
function flattenObject(obj: any, prefix = ''): Record<string, string> {
  let results: Record<string, string> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      const newKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object' && value !== null) {
        Object.assign(results, flattenObject(value, newKey))
      } else {
        results[newKey] = String(value)
      }
    }
  }
  return results
}

// Restore flattened path back to nested JSON object
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

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function AdminDashboard() {
  const { i18n } = useTranslation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // CMS States
  const [currentLang, setCurrentLang] = useState<'id' | 'en'>('id')
  const [translations, setTranslations] = useState<any>({
    id: deepClone(idDefault),
    en: deepClone(enDefault)
  })
  
  const [activeTab, setActiveTab] = useState<'overview' | string>('overview')
  const [toastMessage, setToastMessage] = useState('')

  // Load from Storage
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

  // Flattened active translations for key traversal
  const flatTranslations = flattenObject(translations[currentLang])
  
  // Extract dynamic categories from active JSON root keys
  const dynamicCategories = Object.keys(translations[currentLang]).map((rootKey) => {
    return {
      key: rootKey,
      title: CATEGORY_NAMES[rootKey] || rootKey.charAt(0).toUpperCase() + rootKey.slice(1),
      keys: Object.keys(flatTranslations).filter((k) => k.startsWith(`${rootKey}.`))
    }
  })

  // Telemetry Calculations for Overview Tab
  const totalKeys = Object.keys(flatTranslations).length
  const savedIdString = localStorage.getItem('weecommerce_cms_id')
  const savedEnString = localStorage.getItem('weecommerce_cms_en')
  
  const editedKeysCount = {
    id: savedIdString ? Object.keys(flattenObject(JSON.parse(savedIdString))).length : 0,
    en: savedEnString ? Object.keys(flattenObject(JSON.parse(savedEnString))).length : 0
  }
  
  const localSizeId = savedIdString ? new Blob([savedIdString]).size : 0
  const localSizeEn = savedEnString ? new Blob([savedEnString]).size : 0
  const totalStorageSizeKb = ((localSizeId + localSizeEn) / 1024).toFixed(2)

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

  // Handle Input changes
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

    // Inject into i18n
    i18n.addResourceBundle(currentLang, 'translation', currentBundle, true, true)
    i18n.changeLanguage(i18n.language)

    triggerToast(`Konten [${currentLang.toUpperCase()}] berhasil disimpan & diterapkan secara live!`)
  }

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua kustomisasi dan kembali ke default?')) {
      const defaultValue = currentLang === 'id' ? idDefault : enDefault
      localStorage.removeItem(`weecommerce_cms_${currentLang}`)

      setTranslations((prev: any) => {
        const copy = deepClone(prev)
        copy[currentLang] = deepClone(defaultValue)
        return copy
      })

      i18n.addResourceBundle(currentLang, 'translation', defaultValue, true, true)
      i18n.changeLanguage(i18n.language)

      triggerToast('Konten berhasil dikembalikan ke bawaan pabrik!')
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
    triggerToast('File JSON berhasil diekspor! Siap disalin ke folder lokalisasi proyek.')
  }

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 4500)
  }

  // Login View
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

  // Active Category Data if not Overview
  const activeCategory = dynamicCategories.find((cat) => cat.key === activeTab)

  return (
    <div className="min-h-screen bg-[#181d26] text-white font-sans flex flex-col">
      {/* Toast message alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#e54a22] text-white text-sm font-semibold py-3 px-6 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}

      {/* Header bar */}
      <header className="h-16 bg-[#1d1f25] border-b border-[#2a2d35] flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight">WeeCommerce <span className="text-[#e54a22]">CMS</span></span>
          <span className="text-[10px] text-[#25d366] border border-[#25d366]/30 bg-[#25d366]/5 rounded px-1.5 py-0.5 uppercase tracking-wider font-mono">Dynamic Mode</span>
        </div>
        <div className="flex items-center gap-4">
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

      {/* Workspace Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-[#1d1f25] border-r border-[#2a2d35] p-4 flex flex-col gap-1 overflow-y-auto shrink-0 shadow-inner">
          <p className="text-[10px] font-semibold text-[#9297a0] uppercase tracking-wider mb-2 px-2">Kategori Utama</p>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors font-medium mb-4 flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-[#e54a22] text-white' : 'text-[#9297a0] hover:bg-[#181d26] hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span>Overview & Status</span>
          </button>

          <p className="text-[10px] font-semibold text-[#9297a0] uppercase tracking-wider mb-2 px-2">Modul Konten</p>
          {dynamicCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors font-medium flex items-center justify-between ${
                activeTab === cat.key ? 'bg-[#e54a22] text-white' : 'text-[#9297a0] hover:bg-[#181d26] hover:text-white'
              }`}
            >
              <span>{cat.title}</span>
              <span className="text-[10px] font-mono opacity-50">{cat.keys.length}</span>
            </button>
          ))}

          {/* Quick Actions at bottom */}
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

        {/* Content Pane */}
        <main className="flex-1 bg-[#181d26] p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'overview' ? (
              /* Overview Screen */
              <div className="flex flex-col gap-8">
                {/* Intro Title */}
                <div>
                  <h2 className="text-2xl font-bold">Dynamic CMS Overview</h2>
                  <p className="text-sm text-[#9297a0] mt-1">Status, telemetri sinkronisasi, dan ringkasan optimalisasi konten landing page.</p>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#1d1f25] border border-[#2a2d35] rounded-lg p-4 flex flex-col gap-1">
                    <span className="text-xs text-[#9297a0] uppercase tracking-wider font-semibold">Bahasa Edit</span>
                    <span className="text-xl font-bold uppercase text-white flex items-center gap-1.5 mt-1">
                      <span className="h-2 w-2 rounded-full bg-[#e54a22]" />
                      {currentLang === 'id' ? 'Bahasa Indonesia (ID)' : 'English (EN)'}
                    </span>
                  </div>
                  <div className="bg-[#1d1f25] border border-[#2a2d35] rounded-lg p-4 flex flex-col gap-1">
                    <span className="text-xs text-[#9297a0] uppercase tracking-wider font-semibold">Total Kunci (Keys)</span>
                    <span className="text-xl font-bold text-white mt-1">{totalKeys} <span className="text-xs text-[#9297a0] font-normal">Fields</span></span>
                  </div>
                  <div className="bg-[#1d1f25] border border-[#2a2d35] rounded-lg p-4 flex flex-col gap-1">
                    <span className="text-xs text-[#9297a0] uppercase tracking-wider font-semibold">Kustomisasi Aktif</span>
                    <span className="text-xl font-bold text-[#e54a22] mt-1">
                      {editedKeysCount[currentLang]} <span className="text-xs text-[#9297a0] font-normal">teredit ({currentLang.toUpperCase()})</span>
                    </span>
                  </div>
                  <div className="bg-[#1d1f25] border border-[#2a2d35] rounded-lg p-4 flex flex-col gap-1">
                    <span className="text-xs text-[#9297a0] uppercase tracking-wider font-semibold">Ukuran Database Lokal</span>
                    <span className="text-xl font-bold text-white mt-1">{totalStorageSizeKb} <span className="text-xs text-[#9297a0] font-normal">kB</span></span>
                  </div>
                </div>

                {/* Audit & Meta Tags Preview */}
                <div className="bg-[#1d1f25] border border-[#2a2d35] rounded-lg p-6 flex flex-col gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#9297a0]">Status Google Search SERP Preview</h3>
                  <div className="border-t border-[#2a2d35] pt-4 flex flex-col gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#9297a0]">Google Search Title (Judul)</span>
                      <span className="text-[17px] font-medium text-blue-400 hover:underline cursor-pointer font-sans leading-tight">
                        {flatTranslations['seo.title']}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#9297a0]">Google Search Snippet (Deskripsi Meta)</span>
                      <span className="text-xs text-gray-300 font-sans leading-relaxed max-w-2xl">
                        {flatTranslations['seo.description']}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Guide Section */}
                <div className="bg-[#1d1f25] border border-[#2a2d35] rounded-lg p-6 flex flex-col gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#9297a0]">Panduan Alur CMS</h3>
                  <ol className="list-decimal list-inside text-xs text-[#9297a0] leading-relaxed flex flex-col gap-3">
                    <li>
                      <strong className="text-white">Pilih Modul Konten:</strong> Gunakan menu navigasi di panel kiri untuk membuka bagian landing page yang ingin diubah.
                    </li>
                    <li>
                      <strong className="text-white">Ubah & Tinjau:</strong> Modifikasi teks kolom. Jika teks cukup panjang, area input secara otomatis berubah menjadi textarea agar mudah dibaca.
                    </li>
                    <li>
                      <strong className="text-white">Simpan Lokal:</strong> Klik <strong className="text-[#e54a22]">Simpan & Terapkan</strong> untuk merekam perubahan ke dalam database browser lokal dan melihat hasilnya secara live di beranda.
                    </li>
                    <li>
                      <strong className="text-white">Ekspor untuk Rilis Permanen:</strong> Klik <strong className="text-white">Ekspor File JSON</strong> setelah pengeditan selesai. Unduh file dan ganti file asli lokalisasi di folder proyek (`src/i18n/locales/[id/en].json`) lalu jalankan `npm run build` untuk merilis modifikasi secara permanen ke repositori git/production.
                    </li>
                  </ol>
                </div>
              </div>
            ) : (
              /* Fields Edit View */
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center border-b border-[#2a2d35] pb-4">
                  <div>
                    <h2 className="text-xl font-bold">{activeCategory?.title}</h2>
                    <p className="text-xs text-[#9297a0] mt-1">
                      Mengedit modul <span className="font-semibold text-white">{activeCategory?.key}</span> dalam bahasa:{' '}
                      <span className="font-bold text-white uppercase">{currentLang}</span>
                    </p>
                  </div>
                  <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#e54a22] hover:underline">
                    Lihat Hasil Live &rarr;
                  </a>
                </div>

                {/* Render Dynamic Inputs */}
                <div className="flex flex-col gap-6">
                  {activeCategory?.keys.map((key) => {
                    const value = flatTranslations[key] || ''
                    const isTextarea = key.includes('desc') || key.includes('subtitle') || key.includes('message') || key.includes('success') || value.length > 50

                    return (
                      <div key={key} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-mono text-[#9297a0]" htmlFor={key}>
                            {key}
                          </label>
                          <span className="text-[10px] text-gray-500 font-mono">Karakter: {value.length}</span>
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

                {/* Save Bar */}
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
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
