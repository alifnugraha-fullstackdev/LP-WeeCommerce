import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { processSteps } from '@/data/process'
import { pickLocalized, type Lang } from '@/lib/localized'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { Check, ChevronDown } from '@/components/icons'
import { cn } from '@/lib/utils'

const DELIVERABLES = {
  id: [
    ['Analisis Model Bisnis', 'Pemetaan Perjalanan Pelanggan', 'Cetak Biru Arsitektur Inti'],
    ['Rencana Cakupan Kerja Detail', 'Rincian Anggaran Transparan', 'Jadwal & Target Milestones'],
    ['Pratinjau Staging Berkala', 'Antarmuka Toko Responsif', 'Integrasi Panel Admin'],
    ['Pelatihan Basis Data Produk', 'Konfigurasi Sistem RAG', 'Pengujian Alur Kerja Otomatis'],
    ['Pengujian Kualitas Sistem (QA)', 'Setup Konfigurasi Server & CDN', 'Deployment Go-Live Resmi'],
    ['Pemantauan Kesehatan Sistem', 'Pembaruan Berkala Model AI', 'Dukungan Teknis Berkelanjutan']
  ],
  en: [
    ['Business Model Analysis', 'Customer Journey Mapping', 'Core Architecture Blueprint'],
    ['Detailed Scope of Work Plan', 'Transparent Cost Breakdown', 'Milestones & Targets Schedule'],
    ['Regular Staging Previews', 'Responsive Storefront Front-End', 'Admin Dashboard Integration'],
    ['Product Database Custom Training', 'RAG AI System Configuration', 'Workflow Automation Tests'],
    ['System Quality Assurance (QA)', 'Server & CDN Config Setup', 'Official Go-Live Deployment'],
    ['System Health Monitoring', 'AI Model Regular Updates', 'Ongoing Dedicated Support']
  ]
}

export function HowWeWorkSection() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('en') ? 'en' : 'id') as Lang
  const ref = useScrollReveal<HTMLElement>()
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  const deliverables = DELIVERABLES[lang]

  // Autoplay step changes every 6 seconds
  useEffect(() => {
    if (!isAutoplay) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoplay])

  const currentStep = processSteps[activeStep] || processSteps[0]

  // Renders beautiful custom mockups based on the active step index
  const renderMockup = (idx: number) => {
    switch (idx) {
      case 0: // Discovery
        return (
          <div className="w-full h-full flex flex-col justify-center items-center p-4">
            <div className="relative w-48 h-32 flex items-center justify-center">
              {/* Central Core */}
              <div className="absolute z-10 w-16 h-16 rounded-full bg-[var(--color-signature-coral)]/10 border-2 border-[var(--color-signature-coral)] flex items-center justify-center animate-pulse">
                <span className="text-[10px] font-bold text-[var(--color-signature-coral)] text-center font-mono">CORE</span>
              </div>
              {/* Satellite nodes */}
              <div className="absolute top-0 left-4 w-10 h-10 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-mono text-[var(--color-ink)]">Shop</span>
              </div>
              <div className="absolute bottom-0 right-2 w-12 h-12 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-mono text-[var(--color-ink)]">RAG AI</span>
              </div>
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-mono text-[var(--color-ink)]">ERP</span>
              </div>
              {/* Connections (Visual SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="96" y1="64" x2="36" y2="20" stroke="var(--color-hairline)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="96" y1="64" x2="148" y2="108" stroke="var(--color-hairline)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="96" y1="64" x2="160" y2="36" stroke="var(--color-hairline)" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="text-[10px] font-mono text-[var(--color-muted)] mt-2 text-center">
              {lang === 'en' ? 'System Topology Blueprint' : 'Denah Topologi Sistem'}
            </div>
          </div>
        )
      case 1: // Proposal
        return (
          <div className="w-full max-w-[280px] bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] rounded-[var(--radius-md)] p-4 shadow-sm font-mono text-[10px] text-[var(--color-body)] flex flex-col gap-2">
            <div className="flex justify-between items-center border-b border-[var(--color-hairline)] pb-2 mb-1">
              <span className="font-bold text-[var(--color-ink)]">{lang === 'en' ? 'Proposal SOW' : 'Cakupan Proposal'}</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-green-100 text-[var(--color-success)] font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--color-ink)]">
              <span>Setup Storefront</span>
              <span className="text-green-600">✔ Done</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--color-ink)]">
              <span>AI Engine Config</span>
              <span className="text-green-600">✔ Done</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--color-ink)]">
              <span>3 Months Retainer</span>
              <span className="text-green-600">✔ Done</span>
            </div>
            <div className="border-t border-[var(--color-hairline)] pt-2 mt-1 flex justify-between items-center text-[11px] font-bold text-[var(--color-signature-coral)]">
              <span>Investment cost:</span>
              <span>Fixed Quote</span>
            </div>
          </div>
        )
      case 2: // Design & Build
        return (
          <div className="w-full max-w-[280px] bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] rounded-[var(--radius-md)] overflow-hidden shadow-sm flex flex-col h-[150px]">
            {/* Mock browser header */}
            <div className="h-6 bg-[var(--color-surface-strong)] flex items-center px-2 gap-1 border-b border-[var(--color-hairline)]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <div className="bg-[var(--color-canvas)] text-[8px] text-[var(--color-muted)] px-3 py-0.5 rounded-sm mx-auto w-32 text-center truncate">
                staging.weecommerce.io
              </div>
            </div>
            {/* Mock website content */}
            <div className="p-3 flex-1 flex flex-col gap-2">
              <div className="w-12 h-2.5 bg-[var(--color-signature-coral)]/30 rounded-sm" />
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="border border-[var(--color-hairline)] rounded bg-[var(--color-canvas)] p-1.5 flex flex-col gap-1">
                  <div className="w-full h-8 bg-[var(--color-surface-soft)] rounded" />
                  <div className="w-8 h-1.5 bg-[var(--color-muted)] rounded" />
                </div>
                <div className="border border-[var(--color-hairline)] rounded bg-[var(--color-canvas)] p-1.5 flex flex-col gap-1">
                  <div className="w-full h-8 bg-[var(--color-surface-soft)] rounded" />
                  <div className="w-10 h-1.5 bg-[var(--color-muted)] rounded" />
                </div>
              </div>
            </div>
          </div>
        )
      case 3: // AI Integration
        return (
          <div className="w-full max-w-[280px] flex flex-col gap-2 p-2">
            <div className="flex gap-2 justify-start items-start">
              <div className="w-5 h-5 rounded-full bg-[var(--color-surface-strong)] flex items-center justify-center text-[8px] font-bold shrink-0">U</div>
              <div className="bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] text-[10px] text-[var(--color-body)] p-2 rounded-lg rounded-tl-none leading-normal">
                {lang === 'en' ? 'Find runner shoes under 500k' : 'Cari sepatu lari di bawah 500rb'}
              </div>
            </div>
            <div className="flex gap-2 justify-end items-start mt-1">
              <div className="bg-[var(--color-signature-coral)]/5 border border-[var(--color-signature-coral)]/20 text-[10px] text-[var(--color-ink)] p-2 rounded-lg rounded-tr-none leading-normal">
                {lang === 'en' ? 'Found 2 matching items:' : 'Menemukan 2 sepatu yang cocok:'}
                <div className="mt-1 font-mono text-[8px] text-[var(--color-signature-coral)] font-bold">RAG Match: 98%</div>
              </div>
              <div className="w-5 h-5 rounded-full bg-[var(--color-signature-coral)] text-white flex items-center justify-center text-[7px] font-bold shrink-0">AI</div>
            </div>
          </div>
        )
      case 4: // Launch
        return (
          <div className="w-full max-w-[280px] bg-slate-900 text-green-400 font-mono text-[9px] p-4 rounded-[var(--radius-md)] shadow-sm flex flex-col gap-1 border border-slate-800">
            <div>$ npm run deploy</div>
            <div className="text-gray-400">&gt; Building production system...</div>
            <div className="text-gray-400">&gt; Asset compression complete.</div>
            <div className="text-gray-400">&gt; Warming Edge Servers & CDN caches...</div>
            <div className="text-white font-bold mt-1 animate-pulse">&gt; STATUS: ONLINE (production 🟢)</div>
          </div>
        )
      case 5: // Retain
        return (
          <div className="w-full max-w-[280px] bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] rounded-[var(--radius-md)] p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-[var(--color-ink)] border-b border-[var(--color-hairline)] pb-1.5">
              <span>Telemetry Monitor</span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded p-2">
                <div className="text-[14px] font-bold text-[var(--color-signature-coral)] font-mono">99.98%</div>
                <div className="text-[8px] text-[var(--color-muted)] font-medium uppercase tracking-wider mt-0.5">Uptime</div>
              </div>
              <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded p-2">
                <div className="text-[14px] font-bold text-[var(--color-ink)] font-mono">112ms</div>
                <div className="text-[8px] text-[var(--color-muted)] font-medium uppercase tracking-wider mt-0.5">API Latency</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section ref={ref} id="process" className="bg-[var(--color-canvas)] section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="reveal text-center mb-16">
          <p className="text-caption font-semibold text-[var(--color-signature-coral)] tracking-wider mb-4">
            {t('process.label')}
          </p>
          <h2 className="text-display-md text-gradient-dark max-w-2xl mx-auto">
            {t('process.title')}
          </h2>
          <p className="text-body text-[var(--color-body)] max-w-xl mx-auto mt-4 leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Desktop Layout (Interactive Timeline Track & Content Cards) */}
        <div className="hidden md:block">
          {/* Progress Track */}
          <div className="relative w-full max-w-4xl mx-auto mb-24 px-4">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--color-hairline)] -translate-y-1/2" aria-hidden="true" />
            
            {/* Fill Line */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-[var(--color-signature-coral)] -translate-y-1/2 transition-all duration-500" 
              style={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              aria-hidden="true" 
            />

            {/* Stepper Buttons */}
            <div className="relative flex justify-between items-center w-full">
              {processSteps.map((step, idx) => {
                const isCompleted = idx < activeStep
                const isActive = idx === activeStep
                
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(idx)
                      setIsAutoplay(false) // Deactivate autoplay on click
                    }}
                    className={cn(
                      "group relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--color-canvas)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signature-coral)] focus-visible:ring-offset-2 cursor-pointer",
                      isActive || isCompleted ? "border-[var(--color-signature-coral)] shadow-sm" : "border-[var(--color-hairline)] hover:border-[var(--color-ink)]"
                    )}
                    aria-label={`Go to step ${step.number}: ${step.title}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[var(--color-signature-coral)]/20 animate-ping" />
                    )}
                    <span 
                      className={cn(
                        "text-[12px] font-mono font-bold transition-colors",
                        isActive || isCompleted ? "text-[var(--color-signature-coral)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-ink)]"
                      )}
                    >
                      {step.number}
                    </span>
                    <span 
                      className={cn(
                        "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-medium transition-all duration-300",
                        isActive ? "text-[var(--color-ink)] font-bold scale-105" : "text-[var(--color-muted)] opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stepper Main Card Detail Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-16 bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-8 md:p-12 shadow-sm animate-fade-in relative overflow-hidden">
            <div className="intelligence-grid opacity-30 pointer-events-none" aria-hidden="true" />
            
            {/* Content Display Left */}
            <div className="lg:col-span-7 flex flex-col justify-start relative z-10">
              <div>
                <span className="inline-flex items-center justify-center text-mono text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-[var(--color-signature-coral)]/10 text-[var(--color-signature-coral)] mb-4">
                  {lang === 'en' ? 'Phase' : 'Tahap'} {currentStep.number}
                </span>
                <h3 className="text-display-sm text-gradient-dark mb-4">{currentStep.title}</h3>
                <p className="text-body text-[var(--color-body)] leading-relaxed text-[16px] mb-8 max-w-xl">
                  {pickLocalized(currentStep.description, lang)}
                </p>
              </div>

              {/* Outputs/Deliverables block */}
              <div className="border-t border-[var(--color-hairline)] pt-6 mt-8">
                <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--color-ink)] mb-4">
                  {lang === 'en' ? 'Key Deliverables' : 'Output Utama'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {deliverables[activeStep]?.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2 text-[14px] text-[var(--color-muted)]">
                      <Check className="h-4.5 w-4.5 shrink-0 text-[var(--color-signature-coral)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Telemetry Mockup Right */}
            <div className="lg:col-span-5 flex items-center justify-center bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-[var(--radius-md)] p-6 relative min-h-[250px] shadow-inner overflow-hidden z-10">
              {renderMockup(activeStep)}
            </div>
          </div>
        </div>

        {/* Mobile Layout (Interactive Vertical Accordion stepper) */}
        <div className="md:hidden flex flex-col gap-4">
          {processSteps.map((step, idx) => {
            const isActive = idx === activeStep
            
            return (
              <div 
                key={step.id} 
                className={cn(
                  "border rounded-[var(--radius-md)] overflow-hidden transition-all duration-300",
                  isActive ? "bg-[var(--color-surface-soft)] border-[var(--color-signature-coral)]/40 shadow-sm" : "bg-[var(--color-canvas)] border-[var(--color-hairline)]"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveStep(isActive ? -1 : idx)
                    setIsAutoplay(false) // Turn off autoplay
                  }}
                  className="flex w-full items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className={cn(
                        "text-mono text-[13px] font-bold h-7 w-7 rounded-full border flex items-center justify-center transition-colors",
                        isActive 
                          ? "border-[var(--color-signature-coral)] text-[var(--color-signature-coral)] bg-[var(--color-signature-coral)]/10" 
                          : "border-[var(--color-hairline)] text-[var(--color-muted)]"
                      )}
                    >
                      {step.number}
                    </span>
                    <span className={cn(
                      "text-[15px] font-semibold transition-colors",
                      isActive ? "text-[var(--color-ink)] font-bold" : "text-[var(--color-body)]"
                    )}>
                      {step.title}
                    </span>
                  </div>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-[var(--color-muted)] transition-transform duration-300",
                      isActive && "rotate-180 text-[var(--color-signature-coral)]"
                    )} 
                  />
                </button>
                
                {/* Accordion Content Panel */}
                {isActive && (
                  <div className="px-5 pb-6 border-t border-[var(--color-hairline)]/40 pt-4 animate-fade-in flex flex-col gap-5">
                    <p className="text-body text-[var(--color-body)] leading-relaxed text-[14px]">
                      {pickLocalized(step.description, lang)}
                    </p>
                    
                    {/* Deliverables */}
                    <div className="border-t border-[var(--color-hairline)]/60 pt-4">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink)] mb-3">
                        {lang === 'en' ? 'Key Deliverables' : 'Output Utama'}
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {deliverables[idx]?.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2.5 text-[13px] text-[var(--color-muted)]">
                            <Check className="h-4 w-4 shrink-0 text-[var(--color-signature-coral)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile Visual Mockup Card */}
                    <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-[var(--radius-md)] p-4 overflow-hidden relative shadow-inner min-h-[160px] flex items-center justify-center">
                      {renderMockup(idx)}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
