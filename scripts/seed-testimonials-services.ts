/**
 * One-off seed script: creates Testimonial + Service tables in SQLite and
 * seeds them with the existing data from src/lib/site-data.ts.
 *
 * Run with:  bun run scripts/seed-testimonials-services.ts
 *
 * Uses raw SQL (db.$executeRaw) — no Prisma model delegates. Safe to re-run
 * (CREATE TABLE IF NOT EXISTS + only seeds when table is empty).
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

type TestimonialSeed = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  accent: string;
};

type ServiceSeed = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  accent: string;
  icon: string;
};

const TESTIMONIALS: TestimonialSeed[] = [
  {
    id: "tst-1",
    quote:
      "Preet Web Vision rebuilt our store and revenue jumped 62% in a quarter. The AI agent alone saved us two full-time hires.",
    name: "Aarav Mehta",
    role: "Founder",
    company: "Lumen Beauty",
    rating: 5,
    initials: "AM",
    accent: "from-orange-500 to-pink-500",
  },
  {
    id: "tst-2",
    quote:
      "The most thoughtful agency we've worked with. They treat our roadmap like their own and the design quality is unreal.",
    name: "Sofia Romano",
    role: "VP Product",
    company: "Nova SaaS",
    rating: 5,
    initials: "SR",
    accent: "from-fuchsia-500 to-rose-500",
  },
  {
    id: "tst-3",
    quote:
      "From SEO to web app, one team that actually delivers. Organic traffic tripled and our dashboard is buttery smooth.",
    name: "David Chen",
    role: "COO",
    company: "Atlas Finance",
    rating: 5,
    initials: "DC",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: "tst-4",
    quote:
      "Their AI automation cut our support response time by 89%. Customers are happier and our team can finally focus on growth.",
    name: "Priya Nair",
    role: "Head of CX",
    company: "Pulse Studios",
    rating: 5,
    initials: "PN",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "tst-5",
    quote:
      "Stunning design, serious engineering. The brand site they built won us deals before we even pitched.",
    name: "Marcus Webb",
    role: "CEO",
    company: "Verdant Co.",
    rating: 5,
    initials: "MW",
    accent: "from-rose-500 to-pink-500",
  },
];

const SERVICES: ServiceSeed[] = [
  {
    id: "svc-web-design",
    slug: "website-design-development",
    title: "Website Design & Development",
    tagline: "Pixel-perfect sites that convert",
    description:
      "Bespoke, blazing-fast websites engineered with thoughtful UX, accessible interfaces and conversion psychology baked in — built on modern frameworks like Next.js.",
    features: [
      "Custom UI/UX design system",
      "Responsive, mobile-first layouts",
      "CMS integration (Sanity, Strapi)",
      "Core Web Vitals optimization",
      "Accessibility (WCAG 2.2 AA)",
      "Animation & micro-interactions",
    ],
    deliverables: [
      "Brand-aligned design system",
      "Up to 8 custom pages",
      "Headless CMS setup",
      "Analytics & SEO foundation",
    ],
    accent: "from-orange-500 to-pink-500",
    icon: "Palette",
  },
  {
    id: "svc-ai-automation",
    slug: "ai-automations",
    title: "AI Automations",
    tagline: "Workflows that run themselves",
    description:
      "We deploy intelligent AI agents and automations that handle support, lead qualification, content, scheduling and data tasks — so your team ships outcomes, not busywork.",
    features: [
      "Custom GPT & LLM agents",
      "Chatbot & voice assistants",
      "CRM + email automation",
      "Document & data processing",
      "RAG knowledge bases",
      "Workflow orchestration (n8n/Zapier)",
    ],
    deliverables: [
      "AI assistant deployment",
      "3 automated workflows",
      "Knowledge base training",
      "Analytics dashboard",
    ],
    accent: "from-fuchsia-500 to-rose-500",
    icon: "Bot",
  },
  {
    id: "svc-web-apps",
    slug: "web-app-development",
    title: "Web App Development",
    tagline: "Products users love to use",
    description:
      "From MVP to scale, we build robust SaaS dashboards, internal tools and customer platforms with realtime data, role-based access and delightful interfaces.",
    features: [
      "SaaS & dashboard builds",
      "Realtime features (WebSocket)",
      "Role-based auth & payments",
      "Scalable cloud architecture",
      "API design & integrations",
      "CI/CD & DevOps",
    ],
    deliverables: [
      "Production web app",
      "Admin dashboard",
      "API & database schema",
      "Deployment pipeline",
    ],
    accent: "from-amber-500 to-orange-500",
    icon: "Code2",
  },
  {
    id: "svc-seo",
    slug: "seo-and-growth",
    title: "SEO & Digital Growth",
    tagline: "Be found. Be chosen.",
    description:
      "Technical, on-page and content SEO combined with data-driven growth experiments to climb rankings, capture intent and turn search traffic into revenue.",
    features: [
      "Technical SEO audit",
      "Keyword & competitor research",
      "On-page optimization",
      "Content & link strategy",
      "Local & ecommerce SEO",
      "Monthly growth reporting",
    ],
    deliverables: [
      "Full SEO audit + roadmap",
      "12 optimized pages",
      "Rank tracking dashboard",
      "Quarterly growth plan",
    ],
    accent: "from-emerald-500 to-teal-500",
    icon: "Search",
  },
  {
    id: "svc-ecommerce",
    slug: "ecommerce-solutions",
    title: "Ecommerce Solutions",
    tagline: "Stores engineered to sell",
    description:
      "High-converting Shopify, headless commerce and custom storefronts with seamless checkout, payments, inventory and marketing automation wired in.",
    features: [
      "Shopify & headless commerce",
      "Conversion-optimized UX",
      "Payment & shipping setup",
      "Inventory & ERP sync",
      "Email & retention flows",
      "Performance optimization",
    ],
    deliverables: [
      "Custom storefront",
      "Checkout & payments",
      "Email automation flows",
      "Sales analytics setup",
    ],
    accent: "from-rose-500 to-pink-500",
    icon: "ShoppingCart",
  },
];

async function main() {
  // 1) Create Testimonial table
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Testimonial (
      id        TEXT NOT NULL PRIMARY KEY,
      quote     TEXT NOT NULL,
      name      TEXT NOT NULL,
      role      TEXT,
      company   TEXT,
      rating    INTEGER NOT NULL DEFAULT 5,
      initials  TEXT,
      accent    TEXT,
      active    BOOLEAN NOT NULL DEFAULT 1,
      createdAt DATETIME NOT NULL
    )
  `);
  console.log("✓ Testimonial table ready");

  // 2) Create Service table
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Service (
      id           TEXT NOT NULL PRIMARY KEY,
      title        TEXT NOT NULL,
      slug         TEXT NOT NULL,
      tagline      TEXT,
      description  TEXT,
      features     TEXT,
      deliverables TEXT,
      accent       TEXT,
      icon         TEXT,
      active       BOOLEAN NOT NULL DEFAULT 1,
      createdAt    DATETIME NOT NULL
    )
  `);
  console.log("✓ Service table ready");

  // 3) Seed testimonials if empty
  const existingT = (await db.$queryRawUnsafe(
    `SELECT COUNT(*) as cnt FROM Testimonial`
  )) as Array<{ cnt: number }>;
  if (Number(existingT[0]?.cnt ?? 0) === 0) {
    const now = new Date().toISOString();
    for (const t of TESTIMONIALS) {
      await db.$executeRawUnsafe(
        `INSERT INTO Testimonial (id, quote, name, role, company, rating, initials, accent, active, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        t.id,
        t.quote,
        t.name,
        t.role,
        t.company,
        t.rating,
        t.initials,
        t.accent,
        now
      );
    }
    console.log(`✓ Seeded ${TESTIMONIALS.length} testimonials`);
  } else {
    console.log(`• Testimonials already seeded (${existingT[0].cnt} rows) — skipping`);
  }

  // 4) Seed services if empty
  const existingS = (await db.$queryRawUnsafe(
    `SELECT COUNT(*) as cnt FROM Service`
  )) as Array<{ cnt: number }>;
  if (Number(existingS[0]?.cnt ?? 0) === 0) {
    const now = new Date().toISOString();
    for (const s of SERVICES) {
      await db.$executeRawUnsafe(
        `INSERT INTO Service (id, title, slug, tagline, description, features, deliverables, accent, icon, active, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        s.id,
        s.title,
        s.slug,
        s.tagline,
        s.description,
        JSON.stringify(s.features),
        JSON.stringify(s.deliverables),
        s.accent,
        s.icon,
        now
      );
    }
    console.log(`✓ Seeded ${SERVICES.length} services`);
  } else {
    console.log(`• Services already seeded (${existingS[0].cnt} rows) — skipping`);
  }

  // 5) Show final state
  const tRows = (await db.$queryRawUnsafe(
    `SELECT id, name, company, rating, active FROM Testimonial ORDER BY createdAt ASC`
  )) as Array<{ id: string; name: string; company: string; rating: number; active: number }>;
  console.log("\nTestimonials now:");
  for (const r of tRows) {
    console.log(`  ${r.id} | ${r.name} @ ${r.company} | ★${r.rating} | active=${r.active}`);
  }

  const sRows = (await db.$queryRawUnsafe(
    `SELECT id, title, slug, icon, active FROM Service ORDER BY createdAt ASC`
  )) as Array<{ id: string; title: string; slug: string; icon: string; active: number }>;
  console.log("\nServices now:");
  for (const r of sRows) {
    console.log(`  ${r.id} | ${r.title} | /${r.slug} | icon=${r.icon} | active=${r.active}`);
  }

  await db.$disconnect();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
