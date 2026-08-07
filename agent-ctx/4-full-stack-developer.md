# Task 4 — Services Page

**Agent:** full-stack-developer
**File written:** `src/components/site/pages/services-page.tsx`
**Export:** `export function ServicesPage()` (`'use client'`)

## What I built

A single self-contained Services page for **Preet Web Vision**, matching the Home page's design language (warm brand palette, glass cards, gradient text, Framer Motion reveals, ambient orbs, grid backgrounds).

### Sections (in order)
1. **Hero** — `AmbientBackground variant="strong"`, eyebrow "Our Services", headline "Services that <GradientText>compound</GradientText> your growth", subheading, two CTAs (Start a project → `setPage('contact')`, View work → `setPage('portfolio')`), 4-stat trust row using `<Counter>` (180+, 98%, 14x, 40+), and a floating **HeroOrbit** visual: central pulsing brand-gradient orb + two dashed spin rings + all 5 service icons positioned around the ring with per-icon float animations.
2. **ServicesDetailed** — 5 alternating two-column rows (visual ↔ content swap on odd indexes via `lg:order-1/2`). Each row: gradient icon tile with `service.glow`, mono `0X / 05` index, title, tagline (brand-pink), description, 2-col features grid with `CheckCircle2`, "Deliverables" pill list, two CTAs. Vertical rhythm `gap-16 sm:gap-24`. Each row's `ServiceVisual` is unique:
   - Web Design → browser window mock + design-system swatches + Lighthouse 96 card
   - AI Automation → chatbot UI with typing dots + auto-resolved 71% / resp. -89% cards
   - Web Apps → SaaS dashboard with stats + bar chart + uptime 99.98% / 2M+ API cards
   - SEO → keyword ranking list + traffic bars + keywords #1 140 / leads +3.4x cards
   - Ecommerce → product card with discount, stars, Add-to-cart + conv. +38% / revenue +62% cards
3. **ProcessSection** — 4-step timeline using `PROCESS`; gradient connecting line (horizontal desktop / vertical mobile) in brand orange→pink→rose; numbered badge with `ring-4 ring-background`; "Step 0X" eyebrow per step.
4. **TechStackSection** — `<Marquee items={TECH_STACK} reverse />` with "Built on a modern, battle-tested stack" eyebrow.
5. **WhyChooseUs** — `FEATURES_GRID` in 2/4-col glass cards with brand-gradient-soft icon tiles and hover lift. Title "Built different, <GradientText>end to end</GradientText>".
6. **FaqSection** — `FAQS` in shadcn `Accordion`. Title "Services <GradientText>FAQ</GradientText>".
7. **FinalCta** — Gradient-bordered card (1.5px gradient wrapper + inner bg-card), grid-bg with radial mask, pulsing brand orb + floating amber orb, "3 project slots left" badge, headline "Ready to build <GradientText>with us?</GradientText>", two CTAs (Start a project, Book a call).

## Constraints honored
- `'use client'`; ONLY the one file written; no new routes.
- Used only allowed imports: `Reveal`, `SectionHeading`, `GradientText`, `StaggerGroup`, `staggerItem`, `Counter`, `Marquee`, `AmbientBackground`, `SERVICES`, `PROCESS`, `FAQS`, `FEATURES_GRID`, `TECH_STACK`, `type Service`, `useNav`, `Button`, `Accordion*`, lucide icons, `cn`.
- Warm palette only (orange #FF6B35, pink #FF2D75, rose #F72585, amber #F59E0B, emerald #10B981) — no indigo/blue.
- `font-display` on all headings; semantic `<section>`/`<h2>`/`<h3>`; mobile-first responsive; `py-20 sm:py-28` sections; hover lifts + smooth transitions throughout.
- Root wrapper is `<div className="relative">` — navbar/footer handled by shell.

## Quality checks
- `bun run lint` → clean (no errors).
- Removed unused `PROCESS_ACCENTS` const; replaced an arbitrary animation property with the home page's safer `animate-spin-slow [animation-direction:reverse]` pattern.
- Dev log shows `GET / 200` and successful compiles after file creation — page is wired into `src/app/page.tsx` (`{page === 'services' && <ServicesPage />}`) and resolves correctly.

## Notes for downstream agents
- The remaining module-not-found errors in `dev.log` are for `portfolio-page`, `about-page`, `pricing-page`, `contact-page` — not my file. Those are owned by other parallel subagents.
- My visual mocks use inline `style={{ transform: ... }}` for the orbit positioning (CSS-in-JS via the `transform` string with `calc()`). The floating cards use Framer Motion `animate={{ y: [...] }}` on inner wrappers so they don't conflict with the positioning transform on outer wrappers.
