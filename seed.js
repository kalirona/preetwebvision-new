// Seed script — runs on container startup after prisma db push
// Usage: node seed.js
const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function seed() {
  // Create all tables if not exist
  await p.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS BlogPost (id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT, content TEXT, category TEXT, author TEXT, authorRole TEXT, authorInitials TEXT, authorAccent TEXT, imageUrl TEXT, featured INTEGER DEFAULT 0, status TEXT DEFAULT "published", createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL)')
  await p.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS SeoSetting (id TEXT PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT, updatedAt TEXT NOT NULL)')
  await p.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS SiteSetting (id TEXT PRIMARY KEY, key TEXT UNIQUE NOT NULL, value TEXT, updatedAt TEXT NOT NULL)')
  await p.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS Notification (id TEXT PRIMARY KEY, type TEXT NOT NULL, title TEXT NOT NULL, message TEXT, link TEXT, read INTEGER DEFAULT 0, createdAt TEXT NOT NULL)')
  await p.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS Testimonial (id TEXT PRIMARY KEY, quote TEXT NOT NULL, name TEXT NOT NULL, role TEXT, company TEXT, rating INTEGER DEFAULT 5, initials TEXT, accent TEXT, active INTEGER DEFAULT 1, createdAt TEXT NOT NULL)')
  console.log('Tables ensured')

  const now = new Date().toISOString()

  // Seed blog posts if empty
  const blogCount = await p.$queryRawUnsafe('SELECT COUNT(*) as c FROM BlogPost')
  if (Number(blogCount[0].c) === 0) {
    const posts = [
      { title: 'AI Automations That Actually Move Revenue (Not Just Hype)', slug: 'ai-automations-that-actually-move-revenue', excerpt: 'Most AI projects fail because they chase novelty. Here is the framework we use to ship automations that genuinely cut costs and grow revenue.', category: 'AI', author: 'Elena Petrova', authorRole: 'Lead AI Engineer', authorInitials: 'EP', authorAccent: 'from-amber-500 to-orange-500', imageUrl: '/blog/b1.png', featured: 1, content: '## Start from the workflow, not the model\n\nThe biggest mistake teams make is starting with "what can we do with an LLM?" The right question is: where does our team spend hours on repetitive, judgment-light work?\n\n- Map the workflow end-to-end before touching a model\n- Identify the decision points a junior team member could make\n- Estimate hours saved per week\n\n## Ground your agent in your data (RAG)\n\nA generic chatbot hallucinates. An agent grounded in your docs answers like your best employee.\n\n> The model isn\'t the product. The workflow around the model is.\n\n## Measure what matters\n\nWe track three metrics: resolution rate, time saved, and downstream impact.' },
      { title: 'Core Web Vitals in 2025: The Checklist That Gets You to 95+', slug: 'core-web-vitals-2025-checklist', excerpt: 'LCP, INP, CLS — the three numbers that decide whether Google ranks you.', category: 'Web Design', author: 'Rohan Verma', authorRole: 'Head of Engineering', authorInitials: 'RV', authorAccent: 'from-fuchsia-500 to-rose-500', imageUrl: '/blog/b2.png', featured: 0, content: '## LCP — target < 2.0s\n\n- Preload hero images\n- Serve AVIF/WebP\n- Self-host fonts\n\n## INP — target < 200ms\n\nBreak up long JavaScript tasks.\n\n## CLS — target < 0.1\n\nAlways set width/height on images.\n\n> Performance is a feature.' },
      { title: '7 Ecommerce CRO Wins You Can Ship This Week', slug: 'ecommerce-cro-quick-wins', excerpt: 'No rebuild required. These seven conversion-rate optimizations consistently lift revenue.', category: 'Ecommerce', author: 'Preet Kaur', authorRole: 'Founder & Creative Director', authorInitials: 'PK', authorAccent: 'from-orange-500 to-pink-500', imageUrl: '/blog/b3.png', featured: 0, content: '## 1. Simplify checkout to one page\n## 2. Add express payments\n## 3. Show real reviews with photos\n- 4. Sticky add-to-cart on mobile\n- 5. Honest urgency\n- 6. Free shipping threshold\n- 7. Post-purchase upsell\n\n> CRO isn\'t about tricks. It\'s about removing reasons to say no.' },
      { title: 'Building an SEO Content Engine That Scales', slug: 'seo-content-engine-that-scales', excerpt: 'How we took a client from 12k to 380k monthly organic visits in 9 months.', category: 'SEO', author: 'Daniel Okafor', authorRole: 'Head of SEO & Growth', authorInitials: 'DO', authorAccent: 'from-emerald-500 to-teal-500', imageUrl: '/blog/b4.png', featured: 0, content: '## Topic clusters, not isolated keywords\n\nPick 5-8 pillar topics. Build clusters of 10-15 articles each.\n\n## Write from experience, then optimize\n\nAI to refine, not generate from scratch.\n\n> Content that earns a link is worth a hundred posts that beg for one.' },
      { title: 'Why Every Startup Needs a Design System', slug: 'design-systems-for-startups', excerpt: 'A design system isn\'t bureaucracy — it\'s leverage.', category: 'Web Design', author: 'Preet Kaur', authorRole: 'Founder', authorInitials: 'PK', authorAccent: 'from-orange-500 to-pink-500', imageUrl: '/blog/b5.png', featured: 0, content: '## Speed compounds\n\nNew pages take hours, not days.\n\n## What you need\n\n- Tokens: color, spacing, type\n- 8-12 core components\n- Usage guidelines\n\n> A design system is a shared language.' },
      { title: 'Headless Commerce: When It\'s Worth It', slug: 'headless-commerce-guide', excerpt: 'We break down the real tradeoffs so you can decide with clear eyes.', category: 'Ecommerce', author: 'Rohan Verma', authorRole: 'Head of Engineering', authorInitials: 'RV', authorAccent: 'from-fuchsia-500 to-rose-500', imageUrl: '/blog/b6.png', featured: 0, content: '## When headless wins\n\n- Custom storefront\n- Performance is competitive advantage\n- Multi-channel\n\n## When it\'s overkill\n\nSmall catalog + single channel = optimize Shopify theme.\n\n> The best architecture lets you ship fast and sleep at night.' },
    ]

    for (const post of posts) {
      const id = 'blog-' + post.slug + '-' + Date.now()
      await p.$executeRawUnsafe('INSERT INTO BlogPost (id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        id, post.title, post.slug, post.excerpt, post.content, post.category, post.author, post.authorRole, post.authorInitials, post.authorAccent, post.imageUrl, post.featured, 'published', now, now)
    }
    console.log('Seeded', posts.length, 'blog posts')
  }

  // Seed SEO settings if empty
  const seoCount = await p.$queryRawUnsafe('SELECT COUNT(*) as c FROM SeoSetting')
  if (Number(seoCount[0].c) === 0) {
    const defaults = [
      ['site_name', 'Preet Web Vision'],
      ['site_title', 'Preet Web Vision — Web Design, AI Automations & Digital Growth'],
      ['site_description', 'Preet Web Vision is a modern digital marketing agency.'],
      ['canonical_url', 'https://preetwebvision.com'],
      ['og_image_url', 'https://preetwebvision.com/og-image.png'],
      ['robots_allow_all', 'true'],
      ['robots_disallow_admin', 'true'],
      ['robots_disallow_api', 'true'],
      ['robots_sitemap_url', 'https://preetwebvision.com/sitemap.xml'],
    ]
    for (const [key, value] of defaults) {
      const id = 'seo-' + key + '-' + Date.now()
      await p.$executeRawUnsafe('INSERT OR IGNORE INTO SeoSetting (id, key, value, updatedAt) VALUES (?, ?, ?, ?)', id, key, value, now)
    }
    console.log('Seeded SEO settings')
  }

  // Seed site settings if empty
  const siteCount = await p.$queryRawUnsafe('SELECT COUNT(*) as c FROM SiteSetting')
  if (Number(siteCount[0].c) === 0) {
    const defaults = [
      ['ai_greeting', "Hey there! I'm Vision AI — ask me about websites, AI, web apps, SEO or ecommerce!"],
      ['contact_email', 'hello@preetwebvision.com'],
      ['contact_phone', '+63 963 311 2000'],
      ['admin_email', 'admin@preetwebvision.com'],
      ['admin_password', 'preet2025'],
      ['social_youtube', 'https://youtube.com/@preet_tech_ideas'],
    ]
    for (const [key, value] of defaults) {
      const id = 'set-' + key + '-' + Date.now()
      await p.$executeRawUnsafe('INSERT OR IGNORE INTO SiteSetting (id, key, value, updatedAt) VALUES (?, ?, ?, ?)', id, key, value, now)
    }
    console.log('Seeded site settings')
  }

  // Seed testimonials if empty
  const testCount = await p.$queryRawUnsafe('SELECT COUNT(*) as c FROM Testimonial')
  if (Number(testCount[0].c) === 0) {
    const testimonials = [
      { quote: 'Preet Web Vision rebuilt our store and revenue jumped 62% in a quarter.', name: 'Aarav Mehta', role: 'Founder', company: 'Lumen Beauty', rating: 5, initials: 'AM', accent: 'from-orange-500 to-pink-500' },
      { quote: 'The most thoughtful agency we\'ve worked with.', name: 'Sofia Romano', role: 'VP Product', company: 'Nova SaaS', rating: 5, initials: 'SR', accent: 'from-fuchsia-500 to-rose-500' },
      { quote: 'From SEO to web app, one team that delivers.', name: 'David Chen', role: 'COO', company: 'Atlas Finance', rating: 5, initials: 'DC', accent: 'from-amber-500 to-orange-500' },
      { quote: 'AI automation cut our support response time by 89%.', name: 'Priya Nair', role: 'Head of CX', company: 'Pulse Studios', rating: 5, initials: 'PN', accent: 'from-emerald-500 to-teal-500' },
      { quote: 'Stunning design, serious engineering.', name: 'Marcus Webb', role: 'CEO', company: 'Verdant Co.', rating: 5, initials: 'MW', accent: 'from-rose-500 to-pink-500' },
    ]
    for (const t of testimonials) {
      const id = 'test-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6)
      await p.$executeRawUnsafe('INSERT INTO Testimonial (id, quote, name, role, company, rating, initials, accent, active, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)',
        id, t.quote, t.name, t.role, t.company, t.rating, t.initials, t.accent, now)
    }
    console.log('Seeded testimonials')
  }

  console.log('Seeding complete')
}

seed().catch(e => { console.error('Seed error:', e.message); process.exit(0) }).finally(() => p.$disconnect())
