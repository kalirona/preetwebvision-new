import { db } from '@/lib/db'

// Seed default blog posts if table is empty
export async function seedBlogPosts() {
  try {
    const count = (await db.$queryRaw`SELECT COUNT(*) as c FROM BlogPost`) as Array<{ c: number }>
    if (Number(count[0]?.c) > 0) return // Already has posts

    const now = new Date().toISOString()
    const posts = [
      { id: 'b1', title: 'AI Automations That Actually Move Revenue (Not Just Hype)', slug: 'ai-automations-that-actually-move-revenue', excerpt: 'Most AI projects fail because they chase novelty. Here is the framework we use to ship automations that genuinely cut costs and grow revenue.', category: 'AI', author: 'Elena Petrova', authorRole: 'Lead AI Engineer', authorInitials: 'EP', authorAccent: 'from-amber-500 to-orange-500', imageUrl: '/blog/b1.png', featured: 1, content: '## Start from the workflow, not the model\n\nThe biggest mistake teams make is starting with "what can we do with an LLM?" The right question is: where does our team spend hours on repetitive, judgment-light work?\n\n- Map the workflow end-to-end before touching a model\n- Identify the decision points a junior team member could make — those are automatable\n- Estimate hours saved per week. If it\'s under 10, keep looking\n\n## Ground your agent in your data (RAG)\n\nA generic chatbot hallucinates. An agent grounded in your docs, past tickets and product catalog answers like your best employee. We build a retrieval layer that pulls the 5 most relevant context chunks before the model responds — accuracy jumps from ~60% to 90%+.\n\n> The model isn\'t the product. The workflow around the model is.\n\n## Measure what matters\n\nWe track three metrics for every automation: resolution rate, time saved per task, and downstream impact (CSAT, conversion, revenue). If an automation doesn\'t move at least one of those meaningfully within 30 days, we kill it.\n\nAI automations aren\'t a science experiment. Treated with the same rigor as any product feature, they pay for themselves in weeks, not years.' },
      { id: 'b2', title: 'Core Web Vitals in 2025: The Checklist That Gets You to 95+', slug: 'core-web-vitals-2025-checklist', excerpt: 'LCP, INP, CLS — the three numbers that decide whether Google ranks you and whether users stay. Here is our field-tested checklist.', category: 'Web Design', author: 'Rohan Verma', authorRole: 'Head of Engineering', authorInitials: 'RV', authorAccent: 'from-fuchsia-500 to-rose-500', imageUrl: '/blog/b2.png', featured: 0, content: '## LCP (Largest Contentful Paint) — target < 2.0s\n\n- Preload your hero image or font with `rel=preload`\n- Serve images as AVIF/WebP with responsive `srcset`\n- Self-host fonts and use `font-display: swap`\n- Eliminate render-blocking CSS — inline critical, defer the rest\n\n## INP (Interaction to Next Paint) — target < 200ms\n\nINP replaced FID in 2024 and it\'s far stricter. The key: break up long JavaScript tasks. Use `requestIdleCallback` for non-critical work.\n\n## CLS (Cumulative Layout Shift) — target < 0.1\n\n- Always set width/height on images and embeds\n- Reserve space for ads and dynamic content slots\n- Avoid injecting content above existing content\n\n> Performance is a feature. Treat it with the same discipline as the design.\n\nRun Lighthouse in CI on every PR. If a change drops a Vital below threshold, block the merge. Culture beats heroics.' },
      { id: 'b3', title: '7 Ecommerce CRO Wins You Can Ship This Week', slug: 'ecommerce-cro-quick-wins', excerpt: 'No rebuild required. These seven conversion-rate optimizations consistently lift revenue for the stores we work with.', category: 'Ecommerce', author: 'Preet Kaur', authorRole: 'Founder & Creative Director', authorInitials: 'PK', authorAccent: 'from-orange-500 to-pink-500', imageUrl: '/blog/b3.png', featured: 0, content: '## 1. Simplify your checkout to a single page\n\nEvery extra step costs you customers. Collapse account creation, shipping and payment into one focused page.\n\n## 2. Add express payments above the fold\n\nApple Pay, Google Pay and Shop Pay buttons at the top of checkout capture the highest-intent shoppers in two taps.\n\n## 3. Show real reviews with photos\n\nText reviews help. Photo reviews convert. Incentivize UGC and surface it prominently on product pages.\n\n- 4. Sticky "Add to cart" on mobile\n- 5. Urgency that\'s honest (real stock, real deadlines)\n- 6. Free shipping threshold with a progress bar\n- 7. Post-purchase upsell on the thank-you page\n\n> CRO isn\'t about tricks. It\'s about removing the reasons a ready buyer would say no.\n\nShip one per week, measure for 14 days, keep what works. Compound gains beat one big launch every time.' },
      { id: 'b4', title: 'Building an SEO Content Engine That Scales (Without Junk)', slug: 'seo-content-engine-that-scales', excerpt: 'How we took a client from 12k to 380k monthly organic visits in 9 months — without AI slop or keyword stuffing.', category: 'SEO', author: 'Daniel Okafor', authorRole: 'Head of SEO & Growth', authorInitials: 'DO', authorAccent: 'from-emerald-500 to-teal-500', imageUrl: '/blog/b4.png', featured: 0, content: '## Topic clusters, not isolated keywords\n\nPick 5-8 pillar topics that map to your services. Build a cluster of 10-15 supporting articles around each, all internally linked.\n\n## Write from experience, then optimize\n\nEvery article starts as a human outline grounded in real client work. We use AI to expand and refine — never to generate from scratch.\n\n## Technical foundation first\n\n- Clean crawl budget: noindex thin tags, canonicals on faceted URLs\n- Schema markup for articles, products, FAQs and reviews\n- Internal linking with descriptive anchor text\n- XML sitemap + GSC monitoring weekly\n\n> Content that earns a link is worth a hundred posts that beg for one.\n\nThe result: 31x organic growth, 140+ keywords on page one, and a content asset that compounds every month.' },
      { id: 'b5', title: 'Why Every Startup Needs a Design System (Even Early-Stage)', slug: 'design-systems-for-startups', excerpt: 'A design system isn\'t bureaucracy — it\'s leverage. Here\'s how a lightweight system pays for itself in weeks.', category: 'Web Design', author: 'Preet Kaur', authorRole: 'Founder & Creative Director', authorInitials: 'PK', authorAccent: 'from-orange-500 to-pink-500', imageUrl: '/blog/b5.png', featured: 0, content: '## Speed compounds\n\nWith a documented component library, a new page takes hours, not days. Designers don\'t re-decide button states; engineers don\'t re-implement modals.\n\n## What a startup system actually needs\n\n- Tokens: color, spacing, type scale, radii, shadows\n- 8-12 core components: Button, Input, Card, Dialog, Toast, etc.\n- Usage guidelines (when to use what)\n- A single source of truth (Figma + code, in sync)\n\n> A design system isn\'t a library of components. It\'s a shared language.\n\nStart small. A Figma file with 20 tokens and 6 components is a system. Grow it as you grow.' },
      { id: 'b6', title: 'Headless Commerce: When It\'s Worth It (and When It\'s Not)', slug: 'headless-commerce-guide', excerpt: 'Headless is the buzzword of the decade. We break down the real tradeoffs so you can decide with clear eyes.', category: 'Ecommerce', author: 'Rohan Verma', authorRole: 'Head of Engineering', authorInitials: 'RV', authorAccent: 'from-fuchsia-500 to-rose-500', imageUrl: '/blog/b6.png', featured: 0, content: '## When headless wins\n\n- You need a highly custom storefront experience\n- Performance is a competitive advantage (sub-1s LCP)\n- You sell across web, app, kiosks and POS\n- Your team can maintain a Next.js + API architecture\n\n## When headless is overkill\n\nIf you\'re a small catalog, a single channel, and a lean team, a well-optimized Shopify theme will outperform a headless build — at a fraction of the cost.\n\n> The best architecture is the one that lets you ship fast and sleep at night.\n\nFor most clients under $5M GMV: optimize your Shopify theme. For clients above that, or with custom product experiences, headless on Next.js pays for itself within a year.' },
    ]

    for (const post of posts) {
      const id = `blog-${post.id}-${Date.now()}`
      await db.$executeRaw`
        INSERT INTO BlogPost (id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status, createdAt, updatedAt)
        VALUES (${id}, ${post.title}, ${post.slug}, ${post.excerpt}, ${post.content}, ${post.category}, ${post.author}, ${post.authorRole}, ${post.authorInitials}, ${post.authorAccent}, ${post.imageUrl}, ${post.featured}, 'published', ${now}, ${now})
      `
    }
    console.log(`Seeded ${posts.length} blog posts`)
  } catch (err) {
    console.error('Blog seed error:', err)
  }
}

// Also seed SEO settings, SiteSettings, and Notification table defaults
export async function seedDefaults() {
  try {
    // Create SiteSetting table if not exists
    await db.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS SiteSetting (id TEXT PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT, updatedAt TEXT NOT NULL)')
    await db.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS SeoSetting (id TEXT PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT, updatedAt TEXT NOT NULL)')
    await db.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS Notification (id TEXT PRIMARY KEY, type TEXT NOT NULL, title TEXT NOT NULL, message TEXT, link TEXT, read INTEGER DEFAULT 0, createdAt TEXT NOT NULL)')
    await db.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS Testimonial (id TEXT PRIMARY KEY, quote TEXT NOT NULL, name TEXT NOT NULL, role TEXT, company TEXT, rating INTEGER DEFAULT 5, initials TEXT, accent TEXT, active INTEGER DEFAULT 1, createdAt TEXT NOT NULL)')
    await db.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS ServiceData (id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT, tagline TEXT, description TEXT, features TEXT, deliverables TEXT, accent TEXT, icon TEXT, active INTEGER DEFAULT 1, createdAt TEXT NOT NULL)')

    // Seed SEO settings if empty
    const seoCount = (await db.$queryRawUnsafe('SELECT COUNT(*) as c FROM SeoSetting')) as Array<{ c: number }>
    if (Number(seoCount[0]?.c) === 0) {
      const now = new Date().toISOString()
      const defaults: [string, string][] = [
        ['site_name', 'Preet Web Vision'],
        ['site_title', 'Preet Web Vision — Web Design, AI Automations & Digital Growth'],
        ['site_description', 'Preet Web Vision is a modern digital marketing agency crafting stunning websites, AI automations, web apps, SEO and ecommerce experiences.'],
        ['canonical_url', 'https://preetwebvision.com'],
        ['og_image_url', 'https://preetwebvision.com/og-image.png'],
        ['robots_index', 'true'],
        ['robots_follow', 'true'],
        ['twitter_handle', '@preetwebvision'],
        ['robots_allow_all', 'true'],
        ['robots_disallow_admin', 'true'],
        ['robots_disallow_api', 'true'],
        ['robots_sitemap_url', 'https://preetwebvision.com/sitemap.xml'],
      ]
      for (const [key, value] of defaults) {
        const id = `seo-${key}-${Date.now()}`
        await db.$executeRawUnsafe('INSERT OR IGNORE INTO SeoSetting (id, key, value, updatedAt) VALUES (?, ?, ?, ?)', id, key, value, now)
      }
      console.log('Seeded SEO settings')
    }

    // Seed site settings if empty
    const siteCount = (await db.$queryRawUnsafe('SELECT COUNT(*) as c FROM SiteSetting')) as Array<{ c: number }>
    if (Number(siteCount[0]?.c) === 0) {
      const now = new Date().toISOString()
      const defaults: [string, string][] = [
        ['ai_system_prompt', 'You are "Vision AI", the friendly, expert assistant for Preet Web Vision. Answer questions about services, pricing, and process. Be enthusiastic and helpful.'],
        ['ai_greeting', "Hey there! 👋 I'm Vision AI — a live demo of the automations Preet Web Vision builds. Ask me about websites, AI, web apps, SEO or ecommerce!"],
        ['contact_email', 'hello@preetwebvision.com'],
        ['contact_phone', '+63 963 311 2000'],
        ['admin_email', 'admin@preetwebvision.com'],
        ['admin_password', 'preet2025'],
        ['social_youtube', 'https://youtube.com/@preet_tech_ideas'],
      ]
      for (const [key, value] of defaults) {
        const id = `set-${key}-${Date.now()}`
        await db.$executeRawUnsafe('INSERT OR IGNORE INTO SiteSetting (id, key, value, updatedAt) VALUES (?, ?, ?, ?)', id, key, value, now)
      }
      console.log('Seeded site settings')
    }

    // Seed testimonials if empty
    const testCount = (await db.$queryRawUnsafe('SELECT COUNT(*) as c FROM Testimonial')) as Array<{ c: number }>
    if (Number(testCount[0]?.c) === 0) {
      const now = new Date().toISOString()
      const testimonials = [
        { quote: 'Preet Web Vision rebuilt our store and revenue jumped 62% in a quarter. The AI agent alone saved us two full-time hires.', name: 'Aarav Mehta', role: 'Founder', company: 'Lumen Beauty', rating: 5, initials: 'AM', accent: 'from-orange-500 to-pink-500' },
        { quote: 'The most thoughtful agency we\'ve worked with. They treat our roadmap like their own.', name: 'Sofia Romano', role: 'VP Product', company: 'Nova SaaS', rating: 5, initials: 'SR', accent: 'from-fuchsia-500 to-rose-500' },
        { quote: 'From SEO to web app, one team that actually delivers.', name: 'David Chen', role: 'COO', company: 'Atlas Finance', rating: 5, initials: 'DC', accent: 'from-amber-500 to-orange-500' },
        { quote: 'Their AI automation cut our support response time by 89%.', name: 'Priya Nair', role: 'Head of CX', company: 'Pulse Studios', rating: 5, initials: 'PN', accent: 'from-emerald-500 to-teal-500' },
        { quote: 'Stunning design, serious engineering. The brand site won us deals before we even pitched.', name: 'Marcus Webb', role: 'CEO', company: 'Verdant Co.', rating: 5, initials: 'MW', accent: 'from-rose-500 to-pink-500' },
      ]
      for (const t of testimonials) {
        const id = `test-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
        await db.$executeRawUnsafe('INSERT INTO Testimonial (id, quote, name, role, company, rating, initials, accent, active, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)', id, t.quote, t.name, t.role, t.company, t.rating, t.initials, t.accent, now)
      }
      console.log('Seeded testimonials')
    }
  } catch (err) {
    console.error('Seed defaults error:', err)
  }
}
