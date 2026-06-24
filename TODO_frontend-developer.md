# Code Review findings: WeeCommerce Landing Page

## Context
- **Target Framework**: React 19.0.0, Vite 6.0.0, Tailwind CSS v4.0.0, GSAP 3.12.0
- **Design Specifications Source**: Company Profile & Brand Blueprint matching high-end aesthetic guidelines
- **Performance Budget**: Initial script loading < 200KB gzipped, 60fps animations, FCP < 1.8s, CLS < 0.1
- **Accessibility Target**: WCAG 2.1 AA compliance (4.5:1 text contrast ratio, keyboard accessibility with visible focus rings, screen reader semantic updates)

---

## Findings Summary

During the code review, the following key findings and opportunities for improvement were identified:
1. **Focus States (A11y)**: Focus indicators are suppressed or missing on several interactive elements. Stepper toggle indicators in [HowWeWorkSection.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/sections/HowWeWorkSection.tsx) and [LanguageToggle.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/layout/LanguageToggle.tsx) lack visible rings when keyboard-navigated.
2. **Form Validation Messages (A11y)**: Validation errors in [ContactForm.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/sections/ContactForm.tsx) are not semantically linked to input boxes. Screen readers cannot match invalid inputs directly with their errors unless `aria-describedby` and `aria-invalid` attributes are applied.
3. **Application Error Boundaries**: A single crash (e.g. from telemetry animations, dynamic markdown loads, or Radix UI state sync issues) can take down the entire page. Introducing a standard [ErrorBoundary.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/brand/ErrorBoundary.tsx) keeps the landing page resilient.
4. **Vite Bundle Splitting**: Build logs show single chunk creation of `518.54 kB` for production. High-end frameworks require code splitting. Extracting `gsap`, `react-dom`, and `i18next` vendors reduces the initial footprint.

---

## Implementation Plan

- [x] **FE-PLAN-1.1 [Keyboard Accessibility & Focus States]**:
  - **Scope**: Ensure focus outlines appear correctly for keyboard interactions on all links, buttons, and form inputs.
  - **Components**: [index.css](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/index.css), [HowWeWorkSection.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/sections/HowWeWorkSection.tsx), [LanguageToggle.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/layout/LanguageToggle.tsx)
  - **State**: Focus outline is automatically rendered by browsers upon tab key trigger, but styles are customized using CSS tokens.
  - **Responsive**: Unaffected by breakpoints, standard behavior across device viewports.

- [x] **FE-PLAN-1.2 [Accessible Validation Forms]**:
  - **Scope**: Link validation tags to text fields inside the CTA contact form.
  - **Components**: [ContactForm.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/sections/ContactForm.tsx)
  - **State**: Sync local form error maps with reactive screen reader tags.
  - **Responsive**: Fluid label adjustments remain active.

- [x] **FE-PLAN-1.3 [Application Error Boundaries]**:
  - **Scope**: Build and register a functional React Error Boundary that acts as a fallback component.
  - **Components**: [ErrorBoundary.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/components/brand/ErrorBoundary.tsx), [App.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/App.tsx)
  - **State**: Catches dynamic rendering crashes during runtime execution and yields fallback markup.
  - **Responsive**: Fullscreen layout adapts cleanly to mobile and desktop displays.

- [x] **FE-PLAN-1.4 [Vite Bundle Optimization]**:
  - **Scope**: Update bundler options to split heavy libraries.
  - **Components**: [vite.config.ts](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/vite.config.ts)
  - **State**: Static bundler-level setting.
  - **Responsive**: Promotes faster FCP across cellular connections.

---

## Implementation Items

- [x] **FE-ITEM-1.1 [Global Focus Styles]**:
  - **Props**: N/A (CSS Rule)
  - **State**: Apply visible outlines when focus is triggered.
  - **Accessibility**: Meets WCAG 2.1 AA keyboard visibility rules.
  - **Performance**: High performance native CSS implementation.

- [x] **FE-ITEM-1.2 [Component Level Focus States]**:
  - **Props**: Add `focus-visible` Tailwind rings to buttons inside process timelines.
  - **State**: Interactive state highlighting active stepper index.
  - **Accessibility**: Clear visual response when tabbing through step lists.
  - **Performance**: Negligible DOM rendering overhead.

- [x] **FE-ITEM-1.3 [Screen-Reader Accessible Validation errors]**:
  - **Props**: Propagate `aria-describedby` and `aria-invalid` states to the base inputs.
  - **State**: Track reactive component inputs.
  - **Accessibility**: Semantic tag announcement of field constraints.
  - **Performance**: High efficiency DOM state syncing.

- [x] **FE-ITEM-1.4 [ErrorBoundary Setup]**:
  - **Props**: `children: React.ReactNode`
  - **State**: Tracks `hasError: boolean` state.
  - **Accessibility**: Announces application status fallback messages.
  - **Performance**: Lightweight React class structure.

- [x] **FE-ITEM-1.5 [Wrap Application with ErrorBoundary]**:
  - **Props**: N/A
  - **State**: Wrap core components of the landing page layout.
  - **Accessibility**: Direct fallback screen navigation if a crash occurs.
  - **Performance**: Core system wrapper.

- [x] **FE-ITEM-1.6 [Rollup Output Splits]**:
  - **Props**: N/A
  - **State**: Vite config setting.
  - **Accessibility**: Enhances perceived load performance for screen reader devices.
  - **Performance**: Reduces primary entrypoint script asset weights to optimize load times.

---

## Proposed Code Changes

### Spacing and Keyboard Accessibility Updates in index.css

```diff
--- src/index.css
+++ src/index.css
@@ -12,6 +12,12 @@
 body {
   font-family: var(--font-body);
   font-size: 14px;
   font-weight: 400;
   line-height: 1.5;
   color: var(--color-body);
   background-color: var(--color-canvas);
   margin: 0;
 }
+
+/* Keyboard visible focus rings */
+*:focus-visible {
+  outline: 2px solid var(--color-signature-coral) !important;
+  outline-offset: 4px !important;
+}
```

### Component Focus Updates in LanguageToggle.tsx

```diff
--- src/components/layout/LanguageToggle.tsx
+++ src/components/layout/LanguageToggle.tsx
@@ -26,8 +26,8 @@
           type="button"
           onClick={() => change(lng)}
           className={cn(
-            'px-3 py-1 text-[12px] font-medium rounded-[var(--radius-pill)] transition-colors duration-150',
+            'px-3 py-1 text-[12px] font-medium rounded-[var(--radius-pill)] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signature-coral)] focus-visible:ring-offset-2',
             current === lng
               ? 'bg-[var(--color-ink)] text-[var(--color-on-primary)]'
               : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]',
           )}
```

### Stepper Focus Ring Updates in HowWeWorkSection.tsx

```diff
--- src/components/sections/HowWeWorkSection.tsx
+++ src/components/sections/HowWeWorkSection.tsx
@@ -228,8 +228,8 @@
                     onClick={() => {
                       setActiveStep(idx)
                       setIsAutoplay(false) // Deactivate autoplay on click
                     }}
                     className={cn(
-                      "group relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--color-canvas)] transition-all duration-300 focus:outline-none cursor-pointer",
+                      "group relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--color-canvas)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signature-coral)] focus-visible:ring-offset-2 cursor-pointer",
                       isActive || isCompleted ? "border-[var(--color-signature-coral)] shadow-sm" : "border-[var(--color-hairline)] hover:border-[var(--color-ink)]"
                     )}
```

### Screen Reader Accessible Form Constraints in ContactForm.tsx

```diff
--- src/components/sections/ContactForm.tsx
+++ src/components/sections/ContactForm.tsx
@@ -94,8 +94,10 @@
             <Input
               id="name"
               value={values.name}
               onChange={update('name')}
               placeholder={t('contact.namePlaceholder')}
               error={!!errors.name}
+              aria-describedby={errors.name ? "name-error" : undefined}
+              aria-invalid={!!errors.name}
             />
-            {errors.name && <p className="mt-1 text-[12px] text-[var(--color-error)]">{errors.name}</p>}
+            {errors.name && <p id="name-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.name}</p>}
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
+              aria-describedby={errors.email ? "email-error" : undefined}
+              aria-invalid={!!errors.email}
             />
-            {errors.email && <p className="mt-1 text-[12px] text-[var(--color-error)]">{errors.email}</p>}
+            {errors.email && <p id="email-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.email}</p>}
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
+            aria-describedby={errors.business ? "business-error" : undefined}
+            aria-invalid={!!errors.business}
           />
-          {errors.business && <p className="mt-1 text-[12px] text-[var(--color-error)]">{errors.business}</p>}
+          {errors.business && <p id="business-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.business}</p>}
         </div>
 
         <div className="mb-6">
           <Label htmlFor="message">{t('contact.message')}</Label>
           <Textarea
             id="message"
             value={values.message}
             onChange={update('message')}
             placeholder={t('contact.messagePlaceholder')}
             error={!!errors.message}
+            aria-describedby={errors.message ? "message-error" : undefined}
+            aria-invalid={!!errors.message}
           />
-          {errors.message && <p className="mt-1 text-[12px] text-[var(--color-error)]">{errors.message}</p>}
+          {errors.message && <p id="message-error" className="mt-1 text-[12px] text-[var(--color-error)]">{errors.message}</p>}
         </div>
```

### Implementing React Error Boundary

Create the new file `src/components/brand/ErrorBoundary.tsx` with the following content:

```tsx
import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in landing page rendering context:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#181d26] text-white flex flex-col justify-center items-center p-6 text-center font-sans">
          <div className="max-w-md border border-[#2a2d35] rounded-xl p-8 bg-[#1d1f25] shadow-lg">
            <h1 className="text-xl font-bold text-[#e54a22] mb-3">Sistem Mengalami Kendala</h1>
            <p className="text-sm text-[#9297a0] mb-6 leading-relaxed">
              We encountered a client-side rendering issue. Please reload the tab or check your network.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-lg bg-[#e54a22] hover:bg-[#aa2d00] transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e54a22] focus:ring-offset-2"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      )
    }

    return this.children
  }
}
```

Wrap the React root tree in [App.tsx](file:///C:/Users/SMK%20IT%20IQRO/Documents/LP%20WeeCommerce/src/App.tsx) with the new ErrorBoundary:

```diff
--- src/App.tsx
+++ src/App.tsx
@@ -1,11 +1,14 @@
 import { HelmetProvider } from 'react-helmet-async'
 import { HomePage } from '@/pages/HomePage'
 import { SeoHead } from '@/components/brand/SeoHead'
+import { ErrorBoundary } from '@/components/brand/ErrorBoundary'
 
 export default function App() {
   return (
     <HelmetProvider>
-      <SeoHead />
-      <HomePage />
+      <ErrorBoundary>
+        <SeoHead />
+        <HomePage />
+      </ErrorBoundary>
     </HelmetProvider>
   )
 }
```

### Implementing Code Splitting optimization inside vite.config.ts

Configure rollup output configuration to dynamically segment node_modules:

```diff
--- vite.config.ts
+++ vite.config.ts
@@ -6,8 +6,23 @@
 export default defineConfig({
   plugins: [react(), tailwindcss()],
   resolve: {
     alias: {
       '@': path.resolve(__dirname, './src'),
     },
   },
+  build: {
+    rollupOptions: {
+      output: {
+        manualChunks(id) {
+          if (id.includes('node_modules')) {
+            if (id.includes('gsap')) return 'vendor-gsap';
+            if (id.includes('react')) return 'vendor-react';
+            if (id.includes('i18next')) return 'vendor-i18n';
+            return 'vendor-core';
+          }
+        }
+      }
+    }
+  }
 })
```

---

## Commands
- **Local Dev Server**: `npm run dev`
- **Verify Production Compile Check**: `npm run build`
- **Preview Production Bundle**: `npm run preview`

---

## Quality Assurance Task Checklist

Before finalizing, verify:

- [ ] All components compile without TypeScript errors
- [ ] Responsive design tested at 320px, 768px, 1024px, 1440px, and 2560px
- [ ] Keyboard navigation reaches all interactive elements
- [ ] Color contrast meets WCAG AA minimums verified with tooling
- [ ] Core Web Vitals pass Lighthouse audit with scores above 90
- [ ] Bundle size impact measured and within performance budget
- [ ] Cross-browser testing completed on Chrome, Firefox, Safari, and Edge
