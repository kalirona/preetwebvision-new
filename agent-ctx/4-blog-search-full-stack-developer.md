# Task 4 — Blog Search + Author Filter (this session)

**Agent:** full-stack-developer
**File modified:** `src/components/site/pages/blog-page.tsx` (the only file touched)

> Note: A previous session also used the label "Task ID: 4" for the Services page. That record lives in `4-full-stack-developer.md` and was NOT overwritten. This file is the record for the current blog search/filter task.

## Task
Add a search input + author filter to the existing BlogGrid. Combine keyword search (title + excerpt + content block text) AND author filter with the existing category filter (AND logic). Hide the featured card while searching, show a "Showing N of M articles" result count, and render a "No results" empty state with a Clear-filters button. Preserve every existing behavior (featured card, category pills with `layoutId` spring, 3-col grid, article view, reading progress, related posts, CTA).

## Constraints honored
- `'use client'` component (unchanged).
- ONLY modified `blog-page.tsx`. No new files, no other files touched.
- Warm brand palette only (orange/pink/rose/amber/emerald). Used `bg-brand-gradient`, `bg-brand-gradient-soft`, and the `#ff2d75` brand-pink hex for the author-chip active ring. No indigo/blue.
- `font-display` on the empty-state heading. Reused existing utilities (`.no-scrollbar`, `bg-brand-gradient`, `bg-brand-gradient-soft`, glass `bg-muted/20 backdrop-blur`).
- Added imports only from allowed sources: `Search`, `X` from `lucide-react`; `Input` from `@/components/ui/input`. Everything else already in the file.
- Article-view state machine (`BlogPage` `activePost`, `open`, `back`, `ArticleView`) untouched.

## Implementation

### New module-level helpers (above `BlogGrid`)
- `type AuthorOption = { name; initials; accent }`
- `AUTHORS: AuthorOption[]` — deduped from `BLOG_POSTS` (first occurrence wins for `initials`/`accent`). Yields 4 authors: Elena Petrova (EP, amber→orange), Rohan Verma (RV, fuchsia→rose), Preet Kaur (PK, orange→pink), Daniel Okafor (DO, emerald→teal).
- `postSearchText(post)` — lowercased concatenation of `title + excerpt + content` where content joins `block.text` for prose blocks and `block.items.join(' ')` for `ul` blocks.

### `BlogGrid` rewrite
- **New state:** `author` (`'All'` default), `search` (`''` default). Existing `category` preserved.
- **`filtered` useMemo:** AND-combines category + author + search (case-insensitive substring match via `postSearchText`).
- **`hasActiveFilters`** = any filter is non-default. **`showFeatured = !hasActiveFilters`** — featured card hidden while the user is filtering/searching (featured is a fixed post, not search-relevant, per spec).
- **`rest`** = `showFeatured ? filtered minus featured : filtered`.
- **`clearFilters()`** resets all three states.

### Toolbar UI (glass card above the featured card)
1. **Search form** (`role="search"`, `onSubmit` prevents default): rounded-full `Input` (`h-11`, `pl-11` for `Search` icon, `pr-10` for clear button, webkit native clear button suppressed via `[&::-webkit-search-cancel-button]:appearance-none`), brand-colored focus ring (default `--ring` token is warm orange in dark mode). An animated `motion.button` clear-`X` (size-6 circle) fades/scales in/out via `AnimatePresence`. `aria-label="Search articles"`.
2. **Author chips** (`overflow-x-auto no-scrollbar`, "Authors" eyebrow + "Everyone" All chip + one chip per `AUTHORS` entry; each chip = `size-7` gradient avatar showing initials + name; active "All" = `bg-brand-gradient`; active author = `bg-brand-gradient-soft` + `ring-2 ring-[#ff2d75]/60`; clicking an active author toggles back to All). `aria-pressed` on each chip.
3. **Category pills + result count** row: original `CATEGORIES` pills with the unchanged `layoutId="blog-filter-pill"` spring; right-aligned `aria-live="polite"` line "Showing **N** of M articles" where N = `filtered.length`, M = `BLOG_POSTS.length`.

### Featured card
Preserved exactly (same `AnimatePresence` + initial/animate/exit), only shown when `showFeatured`. Wrapped in `mt-8` so it doesn't collide with the toolbar.

### Grid
Kept `StaggerGroup` (preserves initial-scroll stagger reveal) but children now wrapped in `AnimatePresence mode="popLayout"` with `layout` + `variants={staggerItem}` + `exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}` — so filter changes animate smoothly: removed cards fade/scale out, remaining cards reflow into place.

### Empty state
Replaced the old `<p>No articles in this category yet.</p>` with a centered empty state: `Search` icon in a `size-16` muted ringed circle, `font-display` "No articles found" heading, helper copy, and a `Clear filters` outline button (only rendered when `hasActiveFilters` is true — guards the impossible-but-safe "no posts at all" case).

## Quality
- `bun run lint` → clean (0 errors).
- Dev log shows `✓ Compiled` and `GET / 200` after the edit.
- ArticleView / BlogPage state machine untouched. `onOpen` is still passed through and called by every card.

## Notes for downstream agents
- The `AUTHORS` array is computed once at module load from `BLOG_POSTS` — if you add new authors to `content-data.ts`, they will automatically appear as filter chips (first occurrence wins for initials/accent).
- `postSearchText` only indexes `block.text` and `block.items` (per spec). If you add new block types (e.g. `image`, `code`), update the helper if you want them searchable.
- The active-author ring uses the hardcoded brand-pink hex `#ff2d75` because `--brand-pink` is not registered as a Tailwind color token in `@theme inline` (only as a raw CSS variable). If you register brand-* as theme tokens later, you can swap to `ring-brand-pink/60`.
