# WeeCommerce Landing Page — PRD (Product Requirements Document)

**Date:** 2026-06-25
**Status:** Approved
**Author:** Alif Nugraha / WeeCommerce

---

## 1. Overview

**Project:** WeeCommerce Company Profile Landing Page
**Goal:** Conversion-focused single-page landing page untuk drive discovery calls via WhatsApp dan Contact Form
**URL Target:** weecommerce.id
**Status:** New project, greenfield

**Key Principles:**
- Fokus ke selling conversion, bukan tech showcase
- Editorial Airtable-style: white canvas, dark ink, signature cards, generous whitespace
- Bilingual ID/EN dengan toggle
- Semua section di satu halaman dengan anchor navigation

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@theme` token system) |
| Animation | GSAP + ScrollTrigger (subtle only) |
| i18n | i18next + react-i18next |
| Headless UI | Radix UI (Accordion untuk FAQ, Dialog untuk mobile nav) |
| Component Patterns | CVA (class-variance-authority) + clsx + tailwind-merge |
| Deployment Target | Static build (Cloudflare Pages / Vercel / Netlify) |

---

## 3. Visual Identity — Editorial Airtable Pattern

### 3.1 Color System

| Token | Hex | Role |
|---|---|---|
| `--color-canvas` | `#ffffff` | Page background |
| `--color-surface-soft` | `#f8fafc` | Cards, FAQ expanded, featured pricing tier |
| `--color-surface-strong` | `#e0e2e6` | CTA band near footer |
| `--color-surface-dark` | `#181d26` | Dark signature cards, primary CTA bg |
| `--color-surface-dark-elevated` | `#1d1f25` | Elevated dark surface (hover states) |
| `--color-signature-coral` | `#aa2d00` | Services hook signature card |
| `--color-signature-forest` | `#0a2e0e` | NexaMart showcase signature card |
| `--color-signature-cream` | `#f5e9d4` | Demo-grid card surface |
| `--color-signature-peach` | `#fcab79` | Demo-grid card surface |
| `--color-signature-mint` | `#a8d8c4` | Demo-grid card surface |
| `--color-signature-yellow` | `#f4d35e` | Demo-grid card surface |
| `--color-ink` | `#181d26` | Primary text, display headings |
| `--color-body` | `#333840` | Body copy |
| `--color-muted` | `#41454d` | Secondary text, labels, captions |
| `--color-on-primary` | `#ffffff` | Text on dark surfaces |
| `--color-hairline` | `#dddddd` | Borders, dividers, input outlines |
| `--color-link` | `#1b61c9` | Inline links |
| `--color-whatsapp` | `#25d366` | WhatsApp brand color |

### 3.2 Typography

| Role | Font | Weights | Size Range |
|---|---|---|---|
| Display / Heading | Inter Display | 400–500 | 32–48px |
| Body / UI | Inter | 400–500 | 14–16px |
| Pricing sub-system | Inter Display | 475 | 20–44px |
| Tech labels | JetBrains Mono | 400 | 14px |
| Caption | Inter | 500 | 14px |

### 3.3 Border Radius

| Token | Value | Use |
|---|---|---|
| `--rounded-sm` | 6px | Text inputs |
| `--rounded-md` | 10px | Content cards, demo-grid cards |
| `--rounded-lg` | 12px | Primary CTAs, signature cards |
| `--rounded-pill` | 9999px | Pricing CTA buttons only |

### 3.4 Spacing

| Token | Value | Use |
|---|---|---|
| `--spacing-xs` | 8px | Tight gaps |
| `--spacing-sm` | 12px | Small gaps |
| `--spacing-md` | 16px | Standard gap |
| `--spacing-lg` | 24px | Card internal padding, grid gutters |
| `--spacing-xl` | 32px | Larger card padding |
| `--spacing-xxl` | 48px | Signature card internal padding |
| `--spacing-section` | 96px | Vertical rhythm between major bands |

---

## 4. Page Architecture

**Approach:** Single-page scroll dengan anchor navigation.

**Section Order:**
1. Nav (sticky)
2. Hero
3. Why WeeCommerce (`#why`)
4. Services & Pricing (`#services`)
5. Our Work / NexaMart (`#work`)
6. FAQ (`#faq`)
7. Final CTA + Contact Form (`#contact`)
8. Footer
9. Floating WhatsApp Bubble (always visible)

---

## 5. Section Specifications

### 5.1 Navigation Bar
- Sticky top, z-50, height 64px
- Canvas surface with bottom hairline border
- Desktop: Wordmark left, anchor links center-left, lang toggle + CTA right
- Mobile: Hamburger → full-screen Radix Sheet
- Nav stays white on ALL sections (never inverts)

### 5.2 Hero Section
- Canvas, 96px vertical padding, centered max-width 800px
- Eyebrow + headline + sub-headline + CTA row
- Button-primary → WhatsApp, Button-secondary → scroll to #work
- Staggered fade-up entrance animation

### 5.3 Why WeeCommerce
- Signature-dark card (#181d26) full-bleed
- 2x2 grid: AI-Native, Specialist, End-to-End, Built to Scale
- Subtle scale reveal on scroll

### 5.4 Services & Pricing
- Signature-coral card (#aa2d00) hook band
- Tab switch: Build | Integrate (pill pricing buttons)
- Build: 3 tier cards (LAUNCH/CONVERT/SCALE), featured = surface-soft
- Integrate: 4 module cards (2x2 grid)
- Pricing typography: Inter Display 475

### 5.5 Our Work / NexaMart
- Signature-forest card (#0a2e0e) showcase
- 4 feature callouts in 2x2 grid
- Demo-grid cards: cream, peach, mint, yellow surfaces

### 5.6 FAQ Section
- Radix Accordion, 10 items from Company Profile
- Surface-soft bg when expanded

### 5.7 Final CTA + Contact Form
- Surface-strong CTA band
- Inline expandable contact form (name, email, business, message)
- Submit → hello@weecommerce.id

### 5.8 Footer
- 3 columns: brand, quick links, contact
- Copyright bottom bar

### 5.9 Floating WhatsApp Bubble
- Fixed bottom-right, 56px circular, #25d366
- Links to wa.me/62895402254310
- Pulse animation on load

---

## 6. i18n Strategy

- i18next + react-i18next, default Indonesian
- UI chrome via useTranslation().t()
- Content via LocalizedString type + pickLocalized()
- ID|EN pill toggle in nav

---

## 7. Animation (Subtle)

- Hero entrance: staggered fade-up (GSAP)
- Section reveal: ScrollTrigger fade-up at 88%
- Signature cards: subtle scale (1.02) on reveal
- FAQ accordion: CSS height transition
- Contact form: CSS slide-down
- WhatsApp bubble: pulse on load
- Full reduced-motion support

---

## 8. Responsive

- Mobile (<768px): Single column, hamburger nav
- Tablet (768-1024px): 2-up grids
- Desktop (1024-1440px): Full layout, max-width 1280px
- Wide (>1440px): Same with outer breathing room

---

## 9. Out of Scope

Blog, admin dashboard, backend API, images/photos, multi-page routing, CMS, analytics.
