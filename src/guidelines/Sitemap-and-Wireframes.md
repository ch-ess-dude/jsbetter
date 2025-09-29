# Sitemap & Wireframes — JsBetter (derived from PRD)

This document converts the provided PRD into a compact sitemap and page wireframes to guide routing, design, and implementation.

## Overview

Primary pages:

- Home (/)
- About (/about)
- See Products (/products)
- Product Detail (modal over /products)
- Dashboard (/dashboard) — authenticated only
- Contact (/contact)

## Sitemap (mermaid)

```mermaid
flowchart TD
  A[Home] --> B[About]
  A --> C[See Products]
  A --> D[Contact]
  A --> E[Dashboard]
  C --> C1[JsBetter Study]
  C --> C2[JsBetter Create (Coming Soon)]
  C --> C3[JsBetter Flow (Coming Soon)]
  C --> C4[JsBetter Insight (Coming Soon)]
  C1 -->|Open App| F[External: JsBetter Study App]
  C2 -->|Modal| M2[Create Modal]
  C3 -->|Modal + Waitlist| M3[Flow Modal]
  C4 -->|Modal + Waitlist| M4[Insight Modal]
```

## Page flow & wireframes (mermaid)

```mermaid
flowchart LR
  subgraph NAV[Top Navigation]
    navLogo[Logo]
    navHome(Home)
    navAbout(About)
    navProducts(See Products)
    navContact(Contact)
    navAuth(Login / Sign Up)
  end

  Home -->|See Products CTA| Products
  Home -->|Enter Dashboard (auth)| Dashboard

  Products --> ProductCard1[JsBetter Study Card]
  Products --> ProductCard2[JsBetter Create Card]
  Products --> ProductCard3[JsBetter Flow Card]
  Products --> ProductCard4[JsBetter Insight Card]

  ProductCard1 -->|Open App| ExternalStudyApp
  ProductCard2 -->|Click| ModalCreate
  ProductCard3 -->|Click| ModalFlow
  ProductCard4 -->|Click| ModalInsight

  Dashboard -->|Open Study| ExternalStudyApp
  Dashboard -->|Show upcoming| Products

  style navLogo fill:#fff,stroke:var(--accent)
  style ExternalStudyApp fill:#f3f4f6,stroke:var(--muted)
```

## Page-level notes

- Navigation bar: persistent. Logo links to `/`. Auth buttons on the right show Login/Sign Up or user menu when authenticated.
- Home: hero with tagline, background gradient, primary CTAs: "See Products" and "Enter Dashboard" (only enabled when logged in).
- Products page: responsive grid of cards (icons, title, short description, CTA). Coming soon products show disabled CTA with optional "Join Waitlist".
- Product modals: slide-in from bottom/right; include logo, short description, core features, and a clear CTA (Open App / Coming Soon / Join Waitlist).
- Dashboard: gated route; shows greeting "Welcome back, [User]", quick access to Study app and links to upcoming products (subtle/gray).

## Routing suggestions

- Use React Router with routes for /, /about, /products, /contact, /dashboard. Product details handled as route-aware modals (e.g., /products/:id with modal overlay).

## Components to implement (suggested)

- NavBar
- Hero
- ProductGrid
- ProductCard
- ProductModal
- AuthButtons (Login / SignUp)
- DashboardShell

## Design tokens (from PRD)

Design tokens (permanent dark theme)

- Background: var(--background) = #121212
- Card surface: var(--card) = #181818
- Primary / foreground: var(--foreground) = #F8F8F8
- Accent / UI elements: var(--accent) = #EAEAEA
- Muted text: var(--muted) = #BDBDBD
- Border / subtle separators: var(--border) = rgba(255,255,255,0.06)

## Next steps

1. Convert the mermaid diagrams into Figma frames (optional).
2. Implement routes and skeleton components in the repo.
3. Add tests for route accessibility and modal render behavior.


---
Generated from the PRD provided by Aayaan Sultan, September 2025.
