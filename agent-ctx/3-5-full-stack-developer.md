# Task ID: 3-5 — full-stack-developer

## Task
Enhance two existing pages of the Preet Web Vision site (no new files, no other files modified):

1. **Portfolio page** (`src/components/site/pages/portfolio-page.tsx`) — Replace the static `TestimonialSection` (featured quote + small cards) with an auto-rotating testimonials carousel mirroring the Home page pattern: 5.5s auto-rotation, pause-on-hover, prev/next arrow controls, dot indicators, `AnimatePresence mode="wait"` crossfade. Preserve the glass-card design language (Quote icon, stars, avatar, gradient text).
2. **Blog page** (`src/components/site/pages/blog-page.tsx`) — Use the real `post.image` field (e.g. `/blog/b1.png`) on `BlogCard`, `FeaturedCard` and `ArticleView` cover when available, falling back to the existing gradient+emoji pattern otherwise.
3. **Blog page** — Add a subtle, animated floating "X% read" badge to `ArticleView` (fixed bottom-right, above the AI assistant), shown only while actively reading (5% < progress < 95%), hidden on mobile, with a circular SVG progress ring.

## Files read for context
- `/home/z/my-project/worklog.md` — design system, primitives, brand palette (warm, no indigo/blue), glass-strong / grid-bg / bg-brand-gradient helpers, nav store.
- `/home/z/my-project/src/components/site/pages/home-page.tsx` — referenced the auto-rotating `Testimonials` component pattern (lines 585–693): `useState` for `active`+`paused`, `useCallback` `go(dir)`, `useEffect` with `setInterval(... 5500)` cleared on pause, `AnimatePresence mode="wait"` with `motion.div` keyed on `active` (initial y:16 / animate y:0 / exit y:-16, ease `[0.22,1,0.36,1]`), prev/next `ChevronLeft`/`ChevronRight` buttons, dot pills (`w-8 bg-brand-gradient` for active vs `w-2 bg-border`), `Pause` icon + "Auto"/"Paused" status label.
- `/home/z/my-project/src/components/site/pages/portfolio-page.tsx` — full read; confirmed `motion, AnimatePresence` already imported; `Quote`, `Star`, `Avatar`, `AvatarFallback`, `Card`, `SectionHeading`, `GradientText`, `Reveal`, `TESTIMONIALS`, `cn` all in scope.
- `/home/z/my-project/src/components/site/pages/blog-page.tsx` — full read; confirmed `BLOG_POSTS` `image?: string` field exists in `content-data.ts` (6 posts, all with `/blog/b*.png`); `ArticleView` already computes `progress` (0–100) from scroll position.
- `/home/z/my-project/src/app/globals.css` — confirmed `--brand-orange` (#ff6b35), `--brand-rose` (#f72585), `--brand-pink` (#ff2d75) raw CSS vars are available; `.glass-strong` class exists.

## Work Log

### File 1: `src/components/site/pages/portfolio-page.tsx`
- **Imports**: Added `ChevronLeft`, `ChevronRight`, `Pause` to the existing `lucide-react` import block. `motion` + `AnimatePresence` already imported from `framer-motion`.
- **`TestimonialSection`**: Rewrote completely. Replaced the old featured+3-card grid (`TESTIMONIALS[0]` + `slice(1,4)` in a `lg:grid-cols-[1.4fr_1fr]` layout) with a centered max-w-3xl single-card carousel:
  - `useState(0)` active index, `useState(false)` paused flag.
  - `useCallback go(dir: 1 | -1)` for circular prev/next.
  - `useEffect` mounts a `setInterval(..., 5500)` that advances `active`; cleanup on unmount; early-returns when `paused` so the effect re-runs (and re-creates the timer) whenever pause toggles.
  - Outer `<div>` has `onMouseEnter={() => setPaused(true)}` / `onMouseLeave={() => setPaused(false)}`.
  - Card retains the same design language as the prior featured card: ambient `bg-brand-gradient opacity-10 blur-3xl` glow behind it, `Quote` icon top-right at `text-muted-foreground/10`, left-edge gradient spine (`pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-brand-gradient`), star row (amber-400 filled), large `font-display` blockquote, avatar with gradient fallback + name + role/company.
  - `AnimatePresence mode="wait"` wraps a keyed `motion.div` (`key={active}`) with `initial={{opacity:0, y:16}}` / `animate={{opacity:1, y:0}}` / `exit={{opacity:0, y:-16}}` / `transition={{duration:0.4, ease:[0.22,1,0.36,1]}}` — identical motion recipe to Home.
  - Below the card: prev arrow (size-9 round border button with `ChevronLeft`), a row of dot pills (`h-2 rounded-full`, active `w-8 bg-brand-gradient`, inactive `w-2 bg-border hover:bg-muted-foreground/40`), next arrow (`ChevronRight`), then a status micro-label showing `Pause` icon + "Paused" or "Auto".
- `PortfolioPage` composition is unchanged (still renders `<TestimonialSection />`).

### File 2: `src/components/site/pages/blog-page.tsx`
- **No import changes** — `motion`, `AnimatePresence`, `cn`, `BookOpen` were already imported.
- **`FeaturedCard`**: The first child (gradient backdrop `<div>`) is replaced with the conditional image-or-gradient pattern copied from the portfolio `ProjectCard`:
  ```tsx
  {post.image ? (
    <>
      <img src={post.image} alt={post.title} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 mix-blend-multiply', post.gradient)} />
    </>
  ) : (
    <div className={cn('absolute inset-0 bg-gradient-to-br', post.gradient)} />
  )}
  ```
  Grid overlay, dark legibility gradient, "Featured" pill, emoji, content all kept untouched.
- **`BlogCard`**: Container `<div className={cn('relative h-40 overflow-hidden bg-gradient-to-br', post.gradient)}>` was changed to a non-gradient container `<div className="relative h-40 overflow-hidden">` whose first children are the same conditional image-or-gradient block. Grid overlay, dark-to-transparent vertical gradient, emoji, category pill, and the entire body section below are unchanged.
- **`ArticleView` cover**: The cover `<div className={cn('relative h-56 overflow-hidden rounded-3xl bg-gradient-to-br sm:h-72', post.gradient)}>` was changed to a plain container `<div className="relative h-56 overflow-hidden rounded-3xl sm:h-72">` whose first children are the same conditional image-or-gradient block (image without hover-zoom since the cover is not in a `group` hover context — kept identical to the rest of the pattern otherwise). Grid overlay, dark gradient, emoji preserved.
- **`ArticleView` floating progress badge**: Added just below the article body, before the Related section:
  - `AnimatePresence` wrapping a conditionally-rendered `motion.div` (`progress > 5 && progress < 95`).
  - Motion recipe: `initial={{opacity:0, y:12, scale:0.95}}` / `animate={{opacity:1, y:0, scale:1}}` / `exit={{opacity:0, y:12, scale:0.95}}` / `transition={{duration:0.25, ease:[0.22,1,0.36,1]}}`.
  - Position: `fixed bottom-24 right-5 z-40 hidden sm:flex` — sits above the bottom-5 AI assistant button, hidden on mobile.
  - Badge content: `glass-strong` rounded-full pill with border + shadow. Left: a circular SVG progress ring (24px, viewBox 36x36, rotated -90deg) with a muted background circle (`text-muted/40`) and a `linearGradient`-stroked progress circle (`var(--brand-orange)` → `var(--brand-rose)`) whose `strokeDashoffset` is computed as `2 * π * 15 * (1 - progress/100)` and animates via a 150ms linear `transition` on `stroke-dashoffset`. A `BookOpen` icon sits centered over the ring.
  - Right: `{Math.round(progress)}%` (tabular-nums, font-bold) + a muted "read" label.
  - `aria-hidden="true"` on the wrapper because the top reading-progress bar already conveys the same info non-visually; the badge is a redundant visual flourish.

## Lint
- `bun run lint` → clean (0 errors, 0 warnings) after one initial syntax error (missing `}` closing a JSX expression container in the SVG `strokeDashoffset` attribute — fixed immediately).
- Dev log shows successful `✓ Compiled` and `GET / 200` after the changes; no module-resolution or runtime errors.

## Stage Summary
Both files enhanced in place — no new files, no other files touched, all existing functionality preserved. The Portfolio page now has a polished auto-rotating testimonials carousel matching the Home page's interaction model (pause-on-hover, prev/next, dots, status label) while keeping its own design language (ambient glow, gradient spine, glass card). The Blog page renders real images on every card and the article cover when available, with a graceful gradient+emoji fallback, and adds a subtle, animated circular reading-progress badge in the bottom-right of the article view that fades in only while actively reading. Brand palette stays strictly warm (orange/rose/amber), no indigo/blue introduced.
