# Task 3 — full-stack-developer

## Task
Add a premium service comparison table feature component (`src/components/site/comparison-table.tsx`) comparing the 3 pricing plans (Launch, Growth, Enterprise) across ~12 feature rows grouped into 3 sections. Client component, named export `ComparisonTable`, designed to be wired into the Pricing page by the integrator. Only this one file may be written.

## What was read
- `worklog.md` — design system, primitives, nav store, existing components.
- `src/components/site/pages/pricing-page.tsx` — reference design language.
- `src/components/site/primitives.tsx` — confirmed `Reveal`, `SectionHeading` (accepts `ReactNode` title), `GradientText`, `StaggerGroup`, `staggerItem` signatures.
- `src/app/globals.css` — verified `glass-strong`, `grid-bg`, `card-sheen`, `lift-glow`, `cmp-row`, `bg-brand-gradient`, `bg-brand-gradient-soft`, `text-gradient-brand`, `text-balance`, `glow-brand`, `gradient-border` all exist.

## What was written
- `src/components/site/comparison-table.tsx` (`'use client'`, `export function ComparisonTable()`).

### Data model
- `Cell` discriminated union: `{ kind: 'check'; label? } | { kind: 'cross' } | { kind: 'text'; value }`.
- `PLANS`: Launch ($2.4k), Growth ($6.9k, featured), Enterprise (Custom).
- `SECTIONS` (3): Project scope (4 rows), AI & Automation (4 rows), Growth & support (5 rows) → 13 feature rows total.

### Rendering
- **`CellContent`** — shared by desktop + mobile, `size` prop. Brand-gradient rounded Check tile with soft pink glow + optional bold label ("Custom", "SLA"); muted Minus with `sr-only` "Not included"; bold value text otherwise.
- **`DesktopTable`** (lg+): real semantic `<table>` with proper `scope` (`col`, `row`, `colgroup`). Sticky first column (`sticky left-0 z-10/20` + `bg-card/95 backdrop-blur`). Growth column highlighted: `bg-brand-gradient` header cell, white "Most popular" pill badge (Sparkles + `bg-white/15 backdrop-blur`), `bg-brand-gradient-soft` on every Growth `<td>`. Plan headers stack name + big price (gradient on non-featured, white on featured) + period. Section divider rows: `bg-muted/40` + `text-gradient-brand` micro-labels. Rows use `cmp-row` hover + `border-b border-border/40`. Wrapped in `rounded-3xl border glass-strong card-sheen` with a premium drop-shadow. Entrance via `Reveal`.
- **`MobileCards`** (<lg): stacked `Card` per plan in a `StaggerGroup` with `staggerItem`. Growth card: `gradient-border` + `glow-brand` + top `bg-brand-gradient` accent strip + `bg-brand-gradient` "Most popular" `Badge`. Each card lists ALL 13 features grouped by section with right-aligned `CellContent` (sm size).
- **CTA**: centered (stacks on mobile, row on `sm+`) in a `Reveal`. "Not sure? <GradientText>Talk to us</GradientText>" + brand-gradient pill Button → `setPage('contact')` with ArrowRight, soft pink shadow, hover lift.
- **Section shell**: `<section className="relative py-20 sm:py-28">` + `<div className="mx-auto max-w-7xl px-4 sm:px-6">`. Decorative backdrop: `grid-bg` with radial mask (`opacity-60`) + two soft radial brand orbs (orange top-left, rose bottom-right), all `-z-10 pointer-events-none aria-hidden`.
- **SectionHeading**: eyebrow "Compare plans", title `Every feature, <GradientText>side by side</GradientText>`, description "See exactly what's included in each plan."

## Style compliance
- Warm palette only (orange/pink/rose/amber/emerald) — zero indigo/blue.
- `font-display` on all headings.
- Mobile-first responsive; sticky first column; premium scannable layout.
- Semantic HTML with `scope` attributes; `sr-only` labels on excluded cells; decorative backdrops `aria-hidden`.
- Imports limited to allowed set: `Button`/`Card`/`Badge`, primitives, `useNav`, `Check`/`Minus`/`Sparkles`/`ArrowRight`, `motion`, `cn`.

## Verification
- `bun run lint` → clean (zero errors, zero warnings).
- Dev log shows successful incremental compiles; no module-resolution errors for `comparison-table.tsx`.
- No other files modified.

## Stage Summary
`ComparisonTable` is production-ready. One file written, lint-clean, fully responsive, matches the established site design language. Ready for the integrator to drop `<ComparisonTable />` into the Pricing page.
