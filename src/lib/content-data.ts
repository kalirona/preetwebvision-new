// Blog articles + extended project case-study data

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Web Design" | "AI" | "SEO" | "Ecommerce" | "Growth";
  author: string;
  authorRole: string;
  authorInitials: string;
  authorAccent: string;
  date: string; // ISO
  readingMinutes: number;
  gradient: string;
  emoji: string;
  featured?: boolean;
  // Content as lightweight JSX-friendly blocks (rendered by the article view)
  content: { type: "p" | "h2" | "h3" | "ul" | "quote"; text?: string; items?: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "ai-automations-that-actually-move-revenue",
    title: "AI Automations That Actually Move Revenue (Not Just Hype)",
    excerpt:
      "Most AI projects fail because they chase novelty. Here's the framework we use to ship automations that genuinely cut costs and grow revenue.",
    category: "AI",
    author: "Elena Petrova",
    authorRole: "Lead AI Engineer",
    authorInitials: "EP",
    authorAccent: "from-amber-500 to-orange-500",
    date: "2025-07-22",
    readingMinutes: 7,
    gradient: "from-fuchsia-500 via-purple-500 to-rose-500",
    emoji: "🤖",
    featured: true,
    content: [
      { type: "p", text: "Everyone's talking about AI. Most of what ships is noise. The automations that actually move revenue aren't the flashiest — they're the ones that remove friction from a real, repeated business process." },
      { type: "h2", text: "Start from the workflow, not the model" },
      { type: "p", text: "The biggest mistake teams make is starting with \"what can we do with an LLM?\" The right question is: where does our team spend hours on repetitive, judgment-light work? Support triage, lead qualification, document drafting, scheduling — these are goldmines." },
      { type: "ul", items: [
        "Map the workflow end-to-end before touching a model.",
        "Identify the decision points a junior team member could make — those are automatable.",
        "Estimate hours saved per week. If it's under 10, keep looking.",
      ]},
      { type: "h2", text: "Ground your agent in your data (RAG)" },
      { type: "p", text: "A generic chatbot hallucinates. An agent grounded in your docs, past tickets and product catalog answers like your best employee. We build a retrieval layer that pulls the 5 most relevant context chunks before the model responds — accuracy jumps from ~60% to 90%+." },
      { type: "quote", text: "The model isn't the product. The workflow around the model is." },
      { type: "h2", text: "Measure what matters" },
      { type: "p", text: "We track three metrics for every automation: resolution rate (how often it handles the task without a human), time saved per task, and downstream impact (CSAT, conversion, revenue). If an automation doesn't move at least one of those meaningfully within 30 days, we kill it." },
      { type: "h3", text: "A real example" },
      { type: "p", text: "For a DTC skincare client, we deployed a support agent that resolved 71% of tickets autonomously, cut response time by 89%, and saved the equivalent of two full-time hires — in the first quarter. That's the bar." },
      { type: "p", text: "AI automations aren't a science experiment. Treated with the same rigor as any product feature, they pay for themselves in weeks, not years." },
    ],
  },
  {
    id: "b2",
    slug: "core-web-vitals-2025-checklist",
    title: "Core Web Vitals in 2025: The Checklist That Gets You to 95+",
    excerpt:
      "LCP, INP, CLS — the three numbers that decide whether Google ranks you and whether users stay. Here's our field-tested checklist.",
    category: "Web Design",
    author: "Rohan Verma",
    authorRole: "Head of Engineering",
    authorInitials: "RV",
    authorAccent: "from-fuchsia-500 to-rose-500",
    date: "2025-07-08",
    readingMinutes: 6,
    gradient: "from-orange-500 via-pink-500 to-rose-500",
    emoji: "⚡",
    content: [
      { type: "p", text: "Core Web Vitals aren't a vanity metric. They're a direct ranking signal and a direct driver of bounce rate. A 100ms improvement in LCP can lift conversion 1%. Here's how we hit 95+ on every site we ship." },
      { type: "h2", text: "LCP (Largest Contentful Paint) — target < 2.0s" },
      { type: "ul", items: [
        "Preload your hero image or font with `rel=preload`.",
        "Serve images as AVIF/WebP with responsive `srcset`.",
        "Self-host fonts and use `font-display: swap`.",
        "Eliminate render-blocking CSS — inline critical, defer the rest.",
      ]},
      { type: "h2", text: "INP (Interaction to Next Paint) — target < 200ms" },
      { type: "p", text: "INP replaced FID in 2024 and it's far stricter. The key: break up long JavaScript tasks. Use `requestIdleCallback` for non-critical work, debrrounce input handlers, and avoid layout thrashing." },
      { type: "h2", text: "CLS (Cumulative Layout Shift) — target < 0.1" },
      { type: "ul", items: [
        "Always set width/height on images and embeds.",
        "Reserve space for ads and dynamic content slots.",
        "Avoid injecting content above existing content.",
      ]},
      { type: "quote", text: "Performance is a feature. Treat it with the same discipline as the design." },
      { type: "p", text: "Run Lighthouse in CI on every PR. If a change drops a Vital below threshold, block the merge. Culture beats heroics." },
    ],
  },
  {
    id: "b3",
    slug: "ecommerce-cro-quick-wins",
    title: "7 Ecommerce CRO Wins You Can Ship This Week",
    excerpt:
      "No rebuild required. These seven conversion-rate optimizations consistently lift revenue for the stores we work with.",
    category: "Ecommerce",
    author: "Preet Kaur",
    authorRole: "Founder & Creative Director",
    authorInitials: "PK",
    authorAccent: "from-orange-500 to-pink-500",
    date: "2025-06-24",
    readingMinutes: 5,
    gradient: "from-rose-500 via-pink-500 to-orange-400",
    emoji: "🛍️",
    content: [
      { type: "p", text: "You don't always need a full rebuild to move the needle. These seven changes have lifted conversion by 15–40% across the stores we've audited this year." },
      { type: "h2", text: "1. Simplify your checkout to a single page" },
      { type: "p", text: "Every extra step costs you customers. Collapse account creation, shipping and payment into one focused page with a clear progress indicator." },
      { type: "h2", text: "2. Add express payments above the fold" },
      { type: "p", text: "Apple Pay, Google Pay and Shop Pay buttons at the top of checkout capture the highest-intent shoppers in two taps." },
      { type: "h2", text: "3. Show real reviews with photos" },
      { type: "p", text: "Text reviews help. Photo reviews convert. Incentivize UGC and surface it prominently on product pages." },
      { type: "ul", items: [
        "4. Sticky 'Add to cart' on mobile.",
        "5. Urgency that's honest (real stock, real deadlines).",
        "6. Free shipping threshold with a progress bar.",
        "7. Post-purchase upsell on the thank-you page.",
      ]},
      { type: "quote", text: "CRO isn't about tricks. It's about removing the reasons a ready buyer would say no." },
      { type: "p", text: "Ship one per week, measure for 14 days, keep what works. Compound gains beat one big launch every time." },
    ],
  },
  {
    id: "b4",
    slug: "seo-content-engine-that-scales",
    title: "Building an SEO Content Engine That Scales (Without Junk)",
    excerpt:
      "How we took a client from 12k to 380k monthly organic visits in 9 months — without AI slop or keyword stuffing.",
    category: "SEO",
    author: "Daniel Okafor",
    authorRole: "Head of SEO & Growth",
    authorInitials: "DO",
    authorAccent: "from-emerald-500 to-teal-500",
    date: "2025-06-10",
    readingMinutes: 8,
    gradient: "from-lime-400 via-emerald-500 to-teal-500",
    emoji: "🔍",
    content: [
      { type: "p", text: "SEO in 2025 rewards depth, not volume. Google's helpful content system penalizes generic AI content and rewards genuine expertise. Here's the engine we built that scaled a client from 12k to 380k monthly visits in 9 months." },
      { type: "h2", text: "Topic clusters, not isolated keywords" },
      { type: "p", text: "Pick 5–8 pillar topics that map to your services. Build a cluster of 10–15 supporting articles around each, all internally linked. This signals topical authority far more than 80 disconnected posts." },
      { type: "h2", text: "Write from experience, then optimize" },
      { type: "p", text: "Every article starts as a human outline grounded in real client work. We use AI to expand and refine — never to generate from scratch. The difference in quality is measurable: our AI-assisted posts rank 2.3x faster than fully-AI drafts in our tests." },
      { type: "h2", text: "Technical foundation first" },
      { type: "ul", items: [
        "Clean crawl budget: noindex thin tags, canonicals on faceted URLs.",
        "Schema markup for articles, products, FAQs and reviews.",
        "Internal linking with descriptive anchor text.",
        "XML sitemap + GSC monitoring weekly.",
      ]},
      { type: "quote", text: "Content that earns a link is worth a hundred posts that beg for one." },
      { type: "p", text: "The result: 31x organic growth, 140+ keywords on page one, and a content asset that compounds every month. The engine runs whether you're sleeping or shipping." },
    ],
  },
  {
    id: "b5",
    slug: "design-systems-for-startups",
    title: "Why Every Startup Needs a Design System (Even Early-Stage)",
    excerpt:
      "A design system isn't bureaucracy — it's leverage. Here's how a lightweight system pays for itself in weeks.",
    category: "Web Design",
    author: "Preet Kaur",
    authorRole: "Founder & Creative Director",
    authorInitials: "PK",
    authorAccent: "from-orange-500 to-pink-500",
    date: "2025-05-28",
    readingMinutes: 6,
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    emoji: "🎨",
    content: [
      { type: "p", text: "Foundembrace the design system. It feels like overhead when you're shipping fast, but it's the single highest-leverage investment a product team can make. Here's why." },
      { type: "h2", text: "Speed compounds" },
      { type: "p", text: "With a documented component library, a new page takes hours, not days. Designers don't re-decide button states; engineers don't re-implement modals. Every subsequent screen gets cheaper to build." },
      { type: "h2", text: "Consistency builds trust" },
      { type: "p", text: "Users don't consciously notice consistency, but they feel inconsistency. Mixed spacing, drifting button styles, three shades of grey — each one erodes credibility. A system enforces the details." },
      { type: "h2", text: "What a startup system actually needs" },
      { type: "ul", items: [
        "Tokens: color, spacing, type scale, radii, shadows.",
        "8–12 core components: Button, Input, Card, Dialog, Toast, etc.",
        "Usage guidelines (when to use what).",
        "A single source of truth (Figma + code, in sync).",
      ]},
      { type: "quote", text: "A design system isn't a library of components. It's a shared language." },
      { type: "p", text: "Start small. A Figma file with 20 tokens and 6 components is a system. Grow it as you grow. The cost of not having one shows up as rework, inconsistency and slower shipping — always more expensive than the system itself." },
    ],
  },
  {
    id: "b6",
    slug: "headless-commerce-guide",
    title: "Headless Commerce: When It's Worth It (and When It's Not)",
    excerpt:
      "Headless is the buzzword of the decade. We break down the real tradeoffs so you can decide with clear eyes.",
    category: "Ecommerce",
    author: "Rohan Verma",
    authorRole: "Head of Engineering",
    authorInitials: "RV",
    authorAccent: "from-fuchsia-500 to-rose-500",
    date: "2025-05-12",
    readingMinutes: 7,
    gradient: "from-pink-500 via-rose-500 to-amber-400",
    emoji: "🧩",
    content: [
      { type: "p", text: "Headless commerce — decoupling your storefront from your commerce backend — is powerful. It's also over-prescribed. Let's separate the signal from the hype." },
      { type: "h2", text: "When headless wins" },
      { type: "ul", items: [
        "You need a highly custom storefront experience.",
        "Performance is a competitive advantage (sub-1s LCP).",
        "You sell across web, app, kiosks and POS.",
        "Your team can maintain a Next.js + API architecture.",
      ]},
      { type: "h2", text: "When headless is overkill" },
      { type: "p", text: "If you're a small catalog, a single channel, and a lean team, a well-optimized Shopify theme will outperform a headless build — at a fraction of the cost and maintenance. Don't reach for headless to feel modern; reach for it when the constraints demand it." },
      { type: "quote", text: "The best architecture is the one that lets you ship fast and sleep at night." },
      { type: "h2", text: "Our default recommendation" },
      { type: "p", text: "For most clients under $5M GMV: optimize your Shopify theme. For clients above that, or with custom product experiences, headless on Next.js + Shopify Hydrogen or Storefront API pays for itself within a year." },
    ],
  },
];

// Extended case-study data for portfolio project modals
export type CaseStudy = {
  id: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  services: string[];
  testimonial?: { quote: string; name: string; role: string };
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  p1: {
    id: "p1",
    challenge:
      "Lumen Beauty's legacy Shopify theme was slow (4.2s LCP), rigid, and converting at just 1.1%. The brand needed a storefront that matched their premium positioning and loaded instantly on mobile.",
    solution:
      "We rebuilt the storefront headless on Next.js with Shopify Storefront API, designed a custom conversion-optimized PDP, added express payments, and implemented a personalized quiz-driven product recommendation engine.",
    results: [
      { label: "Conversion rate", value: "+38%" },
      { label: "LCP", value: "0.9s" },
      { label: "Revenue", value: "+62%" },
      { label: "Mobile revenue share", value: "71%" },
    ],
    services: ["Ecommerce", "Web Design", "CRO"],
    testimonial: {
      quote: "Preet Web Vision rebuilt our store and revenue jumped 62% in a quarter. The AI agent alone saved us two full-time hires.",
      name: "Aarav Mehta",
      role: "Founder, Lumen Beauty",
    },
  },
  p2: {
    id: "p2",
    challenge:
      "Nova SaaS was drowning in support tickets — 1,200/week, 6-hour median response time, and a growing churn risk from frustrated customers.",
    solution:
      "We deployed an LLM support agent grounded in Nova's docs, past tickets and product changelog via a RAG pipeline. Integrated into Intercom with human-escalation guardrails and a real-time analytics dashboard.",
    results: [
      { label: "Tickets auto-resolved", value: "71%" },
      { label: "Response time", value: "−89%" },
      { label: "CSAT", value: "4.8/5" },
      { label: "Cost / ticket", value: "−74%" },
    ],
    services: ["AI Automation", "Web App"],
    testimonial: {
      quote: "The most thoughtful agency we've worked with. They treat our roadmap like their own and the design quality is unreal.",
      name: "Sofia Romano",
      role: "VP Product, Nova SaaS",
    },
  },
  p3: {
    id: "p3",
    challenge:
      "Atlas Finance needed a realtime analytics platform that could process 2M+ events/day and present them to enterprise clients with sub-second query response.",
    solution:
      "We architected a Next.js + TypeScript dashboard with a Node/WebSocket realtime layer, time-series storage, and a custom charting library. Role-based access, audit logs, and SOC2-aligned security throughout.",
    results: [
      { label: "Events / day", value: "2M+" },
      { label: "Uptime", value: "99.98%" },
      { label: "Active users", value: "12k" },
      { label: "Query speed", value: "< 400ms" },
    ],
    services: ["Web App", "AI"],
    testimonial: {
      quote: "From SEO to web app, one team that actually delivers. Organic traffic tripled and our dashboard is buttery smooth.",
      name: "David Chen",
      role: "COO, Atlas Finance",
    },
  },
  p4: {
    id: "p4",
    challenge:
      "Verdant Co. had a beautiful product but a dated, slow website that undersold the brand. Bounce rate was 68% and time-on-site under 40 seconds.",
    solution:
      "We crafted an immersive scroll-driven brand site with motion design, a custom type system, and accessibility-first development. Achieved a 96 Lighthouse score across all categories.",
    results: [
      { label: "Lighthouse", value: "96" },
      { label: "Bounce rate", value: "−44%" },
      { label: "Time on site", value: "+3.1x" },
      { label: "Inbound leads", value: "+2.7x" },
    ],
    services: ["Web Design", "Branding"],
    testimonial: {
      quote: "Stunning design, serious engineering. The brand site they built won us deals before we even pitched.",
      name: "Marcus Webb",
      role: "CEO, Verdant Co.",
    },
  },
  p5: {
    id: "p5",
    challenge:
      "Pulse Studios ranked page 3+ for their target keywords in a saturated local fitness market. Organic traffic was flat for 18 months.",
    solution:
      "Technical SEO audit and fixes, a 40-article topic-cluster content engine, local SEO with schema markup, and a link-building campaign through industry partnerships.",
    results: [
      { label: "Keywords on page 1", value: "140" },
      { label: "Organic traffic", value: "+217%" },
      { label: "Qualified leads", value: "+3.4x" },
      { label: "Cost per lead", value: "−61%" },
    ],
    services: ["SEO", "Content"],
    testimonial: {
      quote: "Their AI automation cut our support response time by 89%. Customers are happier and our team can finally focus on growth.",
      name: "Priya Nair",
      role: "Head of CX, Pulse Studios",
    },
  },
  p6: {
    id: "p6",
    challenge:
      "Mira Events needed a two-sided wedding vendor marketplace from scratch — with bookings, payments, messaging, and trust signals for both sides.",
    solution:
      "We built a Next.js marketplace with Stripe Connect payments, realtime chat via WebSocket, vendor verification, review system, and an admin dashboard. Launched in 14 weeks.",
    results: [
      { label: "Vendors onboarded", value: "3.2k" },
      { label: "Bookings", value: "18k" },
      { label: "GMV processed", value: "$4.1M" },
      { label: "Take rate", value: "12%" },
    ],
    services: ["Web App", "Payments"],
  },
};
