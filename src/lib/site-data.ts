import type { LucideIcon } from "lucide-react";
import {
  Palette,
  Bot,
  Code2,
  Search,
  ShoppingCart,
  Rocket,
  Sparkles,
  Gauge,
  ShieldCheck,
  LineChart,
  Smartphone,
  PenTool,
  Workflow,
  BrainCircuit,
  Zap,
  Globe,
  Users,
  Target,
  Heart,
  Lightbulb,
  Award,
} from "lucide-react";

export type PageId =
  | "home"
  | "services"
  | "portfolio"
  | "about"
  | "pricing"
  | "blog"
  | "contact";

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Tools" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export type Service = {
  id: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  accent: string;
  glow: string;
  // Rich content sections for SEO + buyer education
  overview?: string;
  benefits?: { title: string; description: string }[];
  process?: { step: string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  techStack?: string[];
};

export const SERVICES: Service[] = [
  {
    id: "web-design",
    slug: "website-design-development",
    icon: Palette,
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
    glow: "shadow-[0_0_60px_-12px_rgba(255,107,53,0.55)]",
    overview: "Your website is often the first impression potential customers have of your brand. We design and build websites that don't just look stunning — they're engineered to load fast, rank high on Google, and convert visitors into customers. Every site we build is custom-designed from scratch, responsive across all devices, and optimized for Core Web Vitals. We use modern frameworks like Next.js, TypeScript, and Tailwind CSS to ensure your site is not only beautiful but also maintainable, scalable, and future-proof. Whether you need a simple landing page, a multi-page corporate site, or a complex headless CMS-driven platform, we deliver pixel-perfect results that align with your brand identity and business goals.",
    benefits: [
      { title: "Higher conversion rates", description: "Our designs are built on conversion psychology — clear value propositions, strategic CTAs, and frictionless user journeys that turn visitors into leads and customers." },
      { title: "Lightning-fast performance", description: "We achieve 90+ Lighthouse scores and sub-second load times through code splitting, image optimization, and modern rendering techniques." },
      { title: "SEO-ready foundation", description: "Every site comes with structured data, semantic HTML, optimized meta tags, and clean URLs that Google loves to index and rank." },
      { title: "Accessible to everyone", description: "We build to WCAG 2.2 AA standards, ensuring your site is usable by people with disabilities and compliant with accessibility regulations." },
      { title: "Easy to manage", description: "We integrate headless CMS options like Sanity or Strapi so you can update content without touching code." },
      { title: "Future-proof architecture", description: "Built on Next.js with a component-based design system, your site can grow and evolve without requiring a rebuild." },
    ],
    process: [
      { step: "01", title: "Discovery & Strategy", description: "We dive deep into your brand, audience, competitors, and goals. We define the site architecture, user journeys, and conversion strategy before a single pixel is designed." },
      { step: "02", title: "Design & Prototype", description: "We create high-fidelity Figma designs and interactive prototypes. You'll see and feel the site before we build it, with multiple revision rounds." },
      { step: "03", title: "Development", description: "We build the site with Next.js, TypeScript, and Tailwind CSS. Clean, tested, documented code with weekly demos and progress updates." },
      { step: "04", title: "Launch & Optimize", description: "We deploy, test across devices, set up analytics, and monitor performance. Post-launch we provide training and ongoing optimization support." },
    ],
    faqs: [
      { question: "How long does a website take to build?", answer: "A 5-page marketing site typically takes 2-4 weeks. Larger sites with CMS, custom functionality, or ecommerce can take 4-8 weeks. We provide a detailed timeline after our discovery call." },
      { question: "Do you redesign existing websites?", answer: "Yes! We frequently redesign existing sites. We can migrate your content, preserve your SEO rankings, and improve performance while giving your brand a fresh, modern look." },
      { question: "Can I update the website myself after launch?", answer: "Absolutely. We integrate a headless CMS (Sanity, Strapi, or Contentful) so you can edit text, images, and pages without any technical knowledge. We also provide training documentation." },
      { question: "Will my website rank on Google?", answer: "Every site we build comes with a strong SEO foundation: semantic HTML, structured data, optimized meta tags, fast load times, and clean URLs. For ongoing SEO growth, we offer monthly SEO retainers." },
      { question: "What if I need changes after launch?", answer: "All projects include a post-launch support period. After that, we offer monthly maintenance retainers or can work on an ad-hoc basis for updates and new features." },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "Sanity CMS", "Vercel", "Framer Motion"],
  },
  {
    id: "ai-automation",
    slug: "ai-automations",
    icon: Bot,
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
    glow: "shadow-[0_0_60px_-12px_rgba(247,37,133,0.55)]",
    overview: "AI automation is no longer experimental — it's the most reliable way to remove repetitive work from your team and redirect those hours toward growth. We design, build, and deploy intelligent agents grounded in your own data so they understand your business context, products, tone of voice, and customers. Our automations connect directly to the tools you already use — your CRM, helpdesk, inbox, calendar, knowledge base, and internal databases — using platforms like n8n, Zapier, and custom Python services. Whether you need a customer-facing support agent that resolves 70%+ of tickets autonomously, a lead-qualification bot that books meetings while you sleep, or a back-office workflow that processes documents and updates records in seconds, we ship production-grade systems with proper guardrails, human handoff, analytics, and ongoing optimization. Every deployment is measurable, so you can see exactly how much time and money the automation is saving your business each month.",
    benefits: [
      { title: "Cut response time by up to 90%", description: "AI agents reply to your customers in seconds, around the clock, so tickets never pile up overnight and your human team focuses only on conversations that genuinely need them." },
      { title: "Resolve most tickets autonomously", description: "Properly trained RAG agents grounded in your docs and history typically resolve 60–80% of common queries without human help, freeing your team for complex cases." },
      { title: "Recover lost revenue instantly", description: "Lead qualification and follow-up automations engage every inbound within seconds, booking meetings and recovering revenue that would otherwise slip through the cracks." },
      { title: "Eliminate repetitive back-office work", description: "Document processing, data entry, CRM updates, and reporting that used to take hours now happen in seconds, executed reliably by automations that never get tired or bored." },
      { title: "Always-on, always consistent", description: "AI agents don't take breaks, get sick, or have bad days. Your customers get the same helpful, on-brand experience at 3am as they do at 3pm." },
      { title: "Measurable ROI from day one", description: "We instrument every automation with analytics dashboards that track tickets resolved, hours saved, meetings booked, and revenue influenced, so ROI is never a guess." },
    ],
    process: [
      { step: "01", title: "Audit & Opportunity Mapping", description: "We map your current workflows, identify the most painful and repetitive tasks, and quantify the time and cost savings each automation can deliver before any code is written." },
      { step: "02", title: "Knowledge Base & Agent Design", description: "We build a retrieval-augmented knowledge base from your docs, tickets, and FAQs, then design the agent's tone, guardrails, escalation paths, and tool integrations." },
      { step: "03", title: "Build, Train & Test", description: "We develop the agents and workflows in a staging environment, run them against real historical cases, and tune prompts and retrieval until accuracy and safety meet our bar." },
      { step: "04", title: "Deploy, Monitor & Optimize", description: "We roll out to production with human-in-the-loop fallbacks, hook up analytics dashboards, and continuously monitor, retrain, and expand the automation as your business evolves." },
    ],
    faqs: [
      { question: "Can AI agents really replace human support?", answer: "No — and that's not the goal. The best automations handle the repetitive 70–80% of common queries so your team can focus on the complex, high-empathy conversations that genuinely need a human. We always design clear escalation paths to a real person." },
      { question: "How do you prevent the AI from giving wrong answers?", answer: "We use retrieval-augmented generation (RAG) so the agent only answers from your approved knowledge base, not the open internet. We add guardrails, confidence thresholds, and human-in-the-loop review for anything ambiguous, then run continuous accuracy tests." },
      { question: "What tools and platforms do you use?", answer: "We use OpenAI and Anthropic models for reasoning, LangChain and LlamaIndex for orchestration, n8n and Zapier for workflow automation, Pinecone and pgvector for vector search, and custom Python services for anything the no-code tools can't handle." },
      { question: "How long does an AI automation project take?", answer: "A focused single-workflow automation (like lead follow-up or FAQ bot) ships in 2–3 weeks. A full support agent with RAG, integrations, and analytics typically takes 4–6 weeks. We always start with a quick-win automation to prove ROI before scaling." },
      { question: "What does it cost and how do you measure ROI?", answer: "Projects start around $4k for a single workflow and scale up with complexity. We track hours saved, tickets auto-resolved, meetings booked, and revenue influenced in a live dashboard, so you see real ROI numbers within the first 30 days of launch." },
    ],
    techStack: ["OpenAI GPT-4", "Anthropic Claude", "LangChain", "Pinecone", "n8n", "Zapier", "Python", "pgvector"],
  },
  {
    id: "web-apps",
    slug: "web-app-development",
    icon: Code2,
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
    glow: "shadow-[0_0_60px_-12px_rgba(245,158,11,0.55)]",
    overview: "A web app is more than a website with login — it's a product that real people rely on every day to get work done. We build SaaS platforms, internal tools, dashboards, customer portals, and marketplaces that are fast, reliable, and genuinely delightful to use. Our stack is built on Next.js and TypeScript with a Postgres (or MySQL) database, Prisma ORM, and a component-driven design system from shadcn/ui, giving us the speed and rigor to ship features weekly without accumulating technical debt. We architect for scale from day one: role-based auth, realtime updates over WebSockets, background jobs, file storage, payments via Stripe, observability, and CI/CD pipelines that ship safely several times a day. Whether you're an MVP-stage founder validating an idea with a v1 in six weeks, or a funded team migrating a legacy platform to a modern stack, we deliver production-grade software with the polish of a consumer app and the discipline of an engineering org.",
    benefits: [
      { title: "Ship features weekly, not quarterly", description: "Our component-driven architecture and CI/CD pipelines let us safely deploy multiple times a day, so your product improves continuously instead of waiting on slow, risky quarterly releases." },
      { title: "Built for scale from day one", description: "We architect for growth with proper database design, caching, background jobs, and observability, so the same codebase that powers your first 100 users carries you to your first million." },
      { title: "Realtime by default", description: "Whether it's live dashboards, chat, presence, or collaborative editing, we build realtime features over WebSockets so your users always see fresh data without refreshing the page." },
      { title: "Security and auth done right", description: "Role-based access control, OAuth, MFA, session management, and audit logs are baked in from the first commit — never bolted on after a breach or compliance audit." },
      { title: "Payments and billing wired in", description: "Stripe integration, subscription tiers, usage-based billing, trials, coupons, and dunning flows are implemented and tested, so revenue works end-to-end before launch." },
      { title: "A codebase your team can own", description: "Clean, typed, documented code with sensible architecture means your in-house engineers can take over maintenance any time — no lock-in, no black box." },
    ],
    process: [
      { step: "01", title: "Discovery & Architecture", description: "We map user personas, data models, key flows, and technical constraints, then produce an architecture diagram, database schema, and feature roadmap that scales with your business goals." },
      { step: "02", title: "Design & Prototype", description: "We design the UI in Figma with a reusable component library, validate flows with clickable prototypes, and run usability tests before writing production code to catch issues early." },
      { step: "03", title: "Build & Integrate", description: "We build the app in weekly sprints with live demos, implement auth, payments, realtime, and third-party integrations, and maintain a test suite that keeps regressions out of production." },
      { step: "04", title: "Launch, Scale & Maintain", description: "We deploy to a managed cloud with CI/CD, set up monitoring and alerting, fix bugs fast, and keep shipping features as your user base and revenue grow." },
    ],
    faqs: [
      { question: "How long does it take to build an MVP?", answer: "A focused MVP with core auth, one user role, and the essential feature set typically takes 6–8 weeks. We prioritize ruthlessly, ship a usable product fast, then iterate based on real user feedback instead of assumptions." },
      { question: "Can you take over an existing codebase?", answer: "Yes. We frequently inherit existing apps, audit the codebase for tech debt and security issues, document what we find, and either continue building on the current stack or migrate to a more maintainable architecture — depending on your goals." },
      { question: "Do you work with our in-house engineers?", answer: "Absolutely. We can embed alongside your team, pair-program, review PRs, and share our patterns so your engineers level up as the project progresses. Many of our clients eventually hire in-house and we hand off cleanly." },
      { question: "What about hosting and ongoing costs?", answer: "We typically deploy on Vercel, Railway, or AWS. Monthly infra costs for an early-stage SaaS start around $20–100 and scale with usage. We hand over full ownership of all accounts, code, and infrastructure from day one." },
      { question: "Can you handle payments, billing, and subscriptions?", answer: "Yes — Stripe is our default. We implement subscription tiers, one-time purchases, usage-based billing, trials, coupons, proration, tax, dunning emails, and customer portal self-service so your revenue operations work end-to-end on launch day." },
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS", "shadcn/ui", "Vercel"],
  },
  {
    id: "seo",
    slug: "seo-and-growth",
    icon: Search,
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
    glow: "shadow-[0_0_60px_-12px_rgba(16,185,129,0.5)]",
    overview: "SEO is the most underrated channel in modern marketing because it compounds — every piece of content and every technical improvement you ship keeps paying you back for years. We run SEO as a growth system, not a checklist. That means we start with deep technical auditing to make sure Google can crawl, render, and index your site without friction, then layer on rigorous keyword research, competitor gap analysis, and on-page optimization. From there we build a content engine that targets buyer-intent queries at every stage of the funnel, paired with a link and digital PR strategy that grows your domain authority month over month. We also handle local SEO for multi-location businesses, ecommerce SEO for stores with thousands of SKUs, and migration SEO so you never lose rankings during a redesign. Every engagement starts with a clear quarterly roadmap, weekly progress updates, and a live dashboard that shows you exactly how rankings, traffic, leads, and revenue are moving — so SEO stops being a black box.",
    benefits: [
      { title: "Compounding, owned traffic", description: "Unlike paid ads, SEO traffic keeps flowing long after the work is done. A well-ranked page can drive free, high-intent visitors to your site for years without another dollar spent." },
      { title: "Captures buyer intent at the moment", description: "Search is the only channel where users literally tell you what they want. Ranking for the right queries puts your brand in front of buyers who are already raising their hand." },
      { title: "Beats paid ads on unit economics", description: "Once you rank, the cost per acquisition drops dramatically because you're not paying per click. Over 12–24 months SEO typically becomes your cheapest channel by a wide margin." },
      { title: "Technical health that helps everything", description: "A fast, crawlable, well-structured site ranks better, converts better, costs less to run, and gives users a better experience — a rare win-win-win across marketing, engineering, and product." },
      { title: "Local and ecommerce specialized", description: "We optimize Google Business Profiles for multi-location brands and run large-scale product schema, faceted navigation, and indexation strategy for stores with thousands of SKUs." },
      { title: "Transparent, dashboard-driven reporting", description: "You get a live dashboard with rank tracking, traffic, leads, and revenue attribution, plus a quarterly roadmap and weekly updates — so SEO stops being a confusing monthly invoice." },
    ],
    process: [
      { step: "01", title: "Technical & Competitive Audit", description: "We crawl your site, audit Core Web Vitals, indexation, schema, and content quality, then benchmark your backlink profile and rankings against your top three competitors to find the biggest gaps." },
      { step: "02", title: "Keyword & Content Strategy", description: "We build a keyword map grouped by funnel stage and intent, prioritize topics by impact and difficulty, and produce a quarterly content roadmap that targets buyer-intent queries you can actually win." },
      { step: "03", title: "On-page, Technical & Link Building", description: "We optimize titles, meta, headings, internal links, and schema, fix technical issues, and run a digital PR and outreach program that earns authoritative backlinks month over month." },
      { step: "04", title: "Measure, Report & Scale", description: "We track rankings, traffic, conversions, and revenue in a live dashboard, review progress weekly, refine the strategy quarterly, and scale what works into a sustainable growth engine." },
    ],
    faqs: [
      { question: "How long until I see results from SEO?", answer: "Most clients see ranking improvements within 6–8 weeks and meaningful traffic gains by month three. SEO compounds, so months 6–12 typically deliver the biggest jumps. We set realistic expectations up front and show progress in your live dashboard every week." },
      { question: "Do you guarantee #1 rankings?", answer: "No serious SEO provider can guarantee specific rankings — Google's algorithm has hundreds of factors and competitors don't stand still. What we do guarantee is a transparent, data-driven process, weekly reporting, and measurable progress on traffic, leads, and revenue." },
      { question: "Can you fix a sudden drop in traffic?", answer: "Yes. We diagnose whether the drop is from an algorithm update, technical issue, lost backlinks, or competitor gains, then run a recovery plan. We've helped clients recover from core updates, migrations gone wrong, and manual penalties — usually within 60–90 days." },
      { question: "Do you handle local SEO for multi-location businesses?", answer: "Yes. We optimize Google Business Profiles for every location, build location landing pages, manage reviews, run citation cleanup, and implement local schema so each location ranks for 'near me' and city-level searches in its service area." },
      { question: "How is SEO priced — project or retainer?", answer: "The initial audit and roadmap is a one-time project, typically $2–5k. Ongoing SEO is a monthly retainer ranging from $1.5k for local businesses to $5k+ for ecommerce and competitive national niches. You can pause or cancel any time with 30 days' notice." },
    ],
    techStack: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "Looker Studio", "Surfer SEO", "Schema.org", "Google Analytics 4"],
  },
  {
    id: "ecommerce",
    slug: "ecommerce-solutions",
    icon: ShoppingCart,
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
    glow: "shadow-[0_0_60px_-12px_rgba(255,45,117,0.55)]",
    overview: "Your ecommerce store is the most important salesperson in your company — it works 24/7, never takes a vacation, and either converts or doesn't based on dozens of micro-decisions made in milliseconds. We build high-converting stores on Shopify, Shopify Plus, and headless commerce architectures that pair a blazing-fast Next.js storefront with Shopify's robust backend for inventory, orders, and payments. Every store we build is engineered for conversion: clear value propositions, frictionless checkout, smart upsells, urgency, social proof, and trust signals placed where buyers actually need them. We integrate your store with the rest of your stack — email and SMS via Klaviyo, reviews via Yotpo, subscriptions via Recharge, inventory and ERP sync, accounting, and analytics — so your data flows seamlessly and you can run the business from a single dashboard. Whether you're launching your first DTC brand, replatforming from WooCommerce, or scaling to eight figures a year, we deliver stores that load fast, rank well, and convert like crazy — backed by retention automations that turn one-time buyers into repeat customers.",
    benefits: [
      { title: "Higher conversion rate from day one", description: "We design every page — PDP, cart, checkout — using proven CRO patterns and buyer psychology, so a higher percentage of your traffic actually places an order instead of bouncing." },
      { title: "Sub-second load times on mobile", description: "Mobile shoppers abandon sites that take more than three seconds to load. We engineer stores with image optimization, edge caching, and code splitting to keep things snappy even on slow connections." },
      { title: "Omnichannel without the chaos", description: "Your store syncs cleanly with Amazon, TikTok Shop, retail POS, ERP, and accounting so inventory, orders, and finances stay accurate across every channel without manual reconciliation." },
      { title: "Retention automations that compound", description: "Email and SMS flows for welcome, abandoned cart, post-purchase, win-back, and replenishment turn one-time buyers into repeat customers, dramatically increasing lifetime value over time." },
      { title: "Built to rank and be discovered", description: "Product schema, faceted navigation, indexation strategy, and fast load times give your store a serious SEO foundation so you're not 100% dependent on paid ads for traffic." },
      { title: "Headless when you need it, simple when you don't", description: "We'll guide you to the right architecture — native Shopify for speed-to-market or headless commerce for full design control and performance when you're scaling past seven figures." },
    ],
    process: [
      { step: "01", title: "Strategy & Store Architecture", description: "We map your catalog, customer journey, and tech stack, then choose the right platform — Shopify, Shopify Plus, or headless — and define the integrations, payment, and shipping setup you'll need." },
      { step: "02", title: "Design the Conversion Machine", description: "We design the storefront, PDPs, cart, and checkout using CRO best practices, build a flexible theme or headless frontend, and prototype the post-purchase experience before development." },
      { step: "03", title: "Build, Integrate & Migrate", description: "We build the store, integrate payments, shipping, ERP, email, and reviews, migrate products and customers from your old platform with redirects, and run QA across devices and browsers." },
      { step: "04", title: "Launch, Optimize & Grow", description: "We launch, monitor conversion and performance, A/B test PDPs and checkout, and keep iterating with email flows, CRO experiments, and new features as your revenue grows." },
    ],
    faqs: [
      { question: "Shopify or headless — which should I choose?", answer: "Native Shopify is right for most brands launching or scaling to seven figures: faster to build, easier to manage, and lower total cost. Headless commerce (Next.js + Shopify backend) is worth it when you need full design control, sub-second performance, or complex custom features beyond what themes allow." },
      { question: "Can you migrate my existing store without losing SEO?", answer: "Yes. We map every old URL to its new equivalent, set up 301 redirects, preserve product schema and meta data, and monitor Google Search Console closely during the cutover. We've migrated dozens of stores from WooCommerce, Magento, and older Shopify themes with zero ranking loss." },
      { question: "Do you handle email and SMS marketing too?", answer: "Yes. We set up Klaviyo (or Omnisend) with welcome, abandoned cart, browse abandonment, post-purchase, win-back, and replenishment flows. We also write the copy, design the templates, and segment audiences so your retention engine works from launch day, not later." },
      { question: "What about inventory, ERP, and accounting integrations?", answer: "We integrate with NetSuite, DEAR, Cin7, Stocky, QuickBooks, Xero, and most major ERPs and accounting tools, so inventory syncs in real time, orders flow through automatically, and your books stay accurate without manual CSV exports." },
      { question: "How much does an ecommerce build cost?", answer: "A custom Shopify theme build starts around $5k and ships in 3–4 weeks. A full headless commerce build with custom integrations ranges from $15k–$50k depending on catalog size, integrations, and design complexity. We always share a detailed quote after a discovery call." },
    ],
    techStack: ["Shopify", "Shopify Plus", "Next.js", "Klaviyo", "Recharge", "Stripe", "Yotpo", "Gorgias"],
  },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  category: "Web Design" | "AI" | "Web App" | "SEO" | "Ecommerce";
  year: string;
  blurb: string;
  tags: string[];
  metric: { label: string; value: string }[];
  gradient: string;
  emoji: string;
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lumen Skincare DTC Store",
    client: "Lumen Beauty",
    category: "Ecommerce",
    year: "2024",
    blurb:
      "A headless Shopify rebuild with a 38% lift in conversion rate and a buttery 0.9s LCP.",
    tags: ["Shopify", "Next.js", "Headless", "CRO"],
    metric: [
      { label: "Conv. rate", value: "+38%" },
      { label: "LCP", value: "0.9s" },
      { label: "Revenue", value: "+62%" },
    ],
    gradient: "from-rose-500 via-pink-500 to-orange-400",
    emoji: "🛍️",
    image: "/projects/p1-lumen-v2.png",
  },
  {
    id: "p2",
    title: "Nova AI Support Agent",
    client: "Nova SaaS",
    category: "AI",
    year: "2024",
    blurb:
      "An LLM support agent resolving 71% of tickets autonomously with a RAG knowledge base.",
    tags: ["LLM", "RAG", "Automation", "Support"],
    metric: [
      { label: "Auto-resolved", value: "71%" },
      { label: "Resp. time", value: "-89%" },
      { label: "CSAT", value: "4.8/5" },
    ],
    gradient: "from-fuchsia-500 via-purple-500 to-rose-500",
    emoji: "🤖",
    image: "/projects/p2-nova-v2.png",
  },
  {
    id: "p3",
    title: "Atlas Analytics Dashboard",
    client: "Atlas Finance",
    category: "Web App",
    year: "2024",
    blurb:
      "A realtime fintech analytics platform processing 2M+ events/day with custom charts.",
    tags: ["SaaS", "Realtime", "Charts", "TypeScript"],
    metric: [
      { label: "Events/day", value: "2M+" },
      { label: "Uptime", value: "99.98%" },
      { label: "Users", value: "12k" },
    ],
    gradient: "from-amber-400 via-orange-500 to-pink-500",
    emoji: "📊",
    image: "/projects/p3-atlas-v2.png",
  },
  {
    id: "p4",
    title: "Verdant Organic Brand Site",
    client: "Verdant Co.",
    category: "Web Design",
    year: "2023",
    blurb:
      "An immersive brand site with scroll-driven storytelling and a 96 Lighthouse score.",
    tags: ["Branding", "Next.js", "Motion", "A11y"],
    metric: [
      { label: "Lighthouse", value: "96" },
      { label: "Bounce", value: "-44%" },
      { label: "Time on site", value: "+3.1x" },
    ],
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    emoji: "🌿",
    image: "/projects/p4-verdant.png",
  },
  {
    id: "p5",
    title: "Pulse Fitness SEO Sprint",
    client: "Pulse Studios",
    category: "SEO",
    year: "2024",
    blurb:
      "Technical SEO + content engine that took 140 keywords to page one in 90 days.",
    tags: ["Technical SEO", "Content", "Local", "Growth"],
    metric: [
      { label: "Keywords #1", value: "140" },
      { label: "Organic traffic", value: "+217%" },
      { label: "Leads", value: "+3.4x" },
    ],
    gradient: "from-lime-400 via-emerald-500 to-teal-500",
    emoji: "🔍",
    image: "/projects/p5-pulse.png",
  },
  {
    id: "p6",
    title: "Mira Wedding Platform",
    client: "Mira Events",
    category: "Web App",
    year: "2023",
    blurb:
      "A two-sided marketplace for wedding vendors with bookings, payments and chat.",
    tags: ["Marketplace", "Payments", "Realtime", "Auth"],
    metric: [
      { label: "Vendors", value: "3.2k" },
      { label: "Bookings", value: "18k" },
      { label: "GMV", value: "$4.1M" },
    ],
    gradient: "from-pink-500 via-rose-500 to-amber-400",
    emoji: "💍",
    image: "/projects/p6-mira.png",
  },
];

export type Stat = { value: number; suffix: string; label: string };

export const STATS: Stat[] = [
  { value: 180, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 14, suffix: "x", label: "Avg. ROI for clients" },
  { value: 40, suffix: "+", label: "Team experts" },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const PROCESS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Strategize",
    description:
      "We dig into your goals, audience and market to craft a sharp, data-backed roadmap.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Design & Prototype",
    description:
      "We design interactive prototypes and design systems you can feel before we build.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Build & Automate",
    description:
      "Engineering, AI and automation come together in clean, scalable, tested code.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Launch & Scale",
    description:
      "We ship, measure and optimize — turning launches into compounding growth.",
    icon: Rocket,
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  accent: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
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

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  accent: string;
  socials: { label: string; href: string }[];
};

export const TEAM: TeamMember[] = [
  {
    name: "Preet Kalirona",
    role: "Founder & Creative Director",
    initials: "PK",
    bio: "12+ years shaping brands and digital products. Obsessed with design that drives revenue.",
    accent: "from-orange-500 to-pink-500",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  {
    name: "Rohan Verma",
    role: "Head of Engineering",
    initials: "RV",
    bio: "Full-stack architect scaling SaaS to millions of users. Loves clean APIs and fast builds.",
    accent: "from-fuchsia-500 to-rose-500",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    name: "Elena Petrova",
    role: "Lead AI Engineer",
    initials: "EP",
    bio: "Builds LLM agents and automations that genuinely move the needle for businesses.",
    accent: "from-amber-500 to-orange-500",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
  {
    name: "Daniel Okafor",
    role: "Head of SEO & Growth",
    initials: "DO",
    bio: "Data-driven growth strategist. Has ranked 1000+ keywords on page one across industries.",
    accent: "from-emerald-500 to-teal-500",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
];

export type Value = { title: string; description: string; icon: LucideIcon };

export const VALUES: Value[] = [
  {
    title: "Outcomes over output",
    description:
      "We measure success in your revenue, rankings and retention — not deliverables shipped.",
    icon: Target,
  },
  {
    title: "Craft with soul",
    description:
      "Every pixel and line of code is intentional. Beautiful, accessible and performant.",
    icon: Heart,
  },
  {
    title: "Move fast, stay honest",
    description:
      "Weekly demos, transparent roadmaps and no jargon. You always know where things stand.",
    icon: Zap,
  },
  {
    title: "Always learning",
    description:
      "AI, design and the web evolve daily. We invest relentlessly to stay ahead for you.",
    icon: Lightbulb,
  },
];

export type TimelineEvent = { year: string; title: string; description: string };

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2016",
    title: "The spark",
    description:
      "Preet founded a small studio with one belief: design and engineering belong together.",
  },
  {
    year: "2019",
    title: "Going global",
    description:
      "Expanded to serve clients across 12 countries with a fully remote, senior team.",
  },
  {
    year: "2022",
    title: "AI practice launched",
    description:
      "Pioneered an AI automation practice, deploying LLM agents for real business workflows.",
  },
  {
    year: "2024",
    title: "180+ projects shipped",
    description:
      "Crossed 180 delivered projects with a 98% client retention rate and growing.",
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  accent: string;
};

export const PRICING: PricingPlan[] = [
  {
    name: "Launch",
    price: "$2.4k",
    period: "/ project",
    description: "For startups needing a sharp, fast, beautiful presence.",
    features: [
      "Up to 5 custom pages",
      "Responsive design",
      "Basic SEO setup",
      "Contact + analytics",
      "2 rounds of revisions",
      "2-week delivery",
    ],
    cta: "Start with Launch",
    accent: "from-amber-500 to-orange-500",
  },
  {
    name: "Growth",
    price: "$6.9k",
    period: "/ project",
    description: "For brands ready to scale with design, AI and growth working as one.",
    features: [
      "Up to 12 pages + CMS",
      "AI chatbot assistant",
      "Advanced SEO + content",
      "Automation workflows",
      "Conversion optimization",
      "Priority support",
      "4-week delivery",
    ],
    cta: "Scale with Growth",
    featured: true,
    accent: "from-orange-500 via-pink-500 to-rose-500",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "/ retainer",
    description: "For funded teams needing a dedicated, multi-disciplinary squad.",
    features: [
      "Unlimited scope",
      "Dedicated team & PM",
      "Web app / SaaS builds",
      "Custom AI agents + RAG",
      "Full SEO & growth retainer",
      "SLA & security reviews",
      "Ongoing optimization",
    ],
    cta: "Talk to sales",
    accent: "from-fuchsia-500 to-rose-500",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Marketing sites ship in 2–4 weeks, web apps and ecommerce in 6–10 weeks, and AI automations in 2–6 weeks depending on complexity. We share a detailed timeline after a discovery call.",
  },
  {
    question: "Do you work with startups and enterprises alike?",
    answer:
      "Yes. We adapt our process to your stage — from MVPs for funded startups to large-scale platforms and retainers for enterprises.",
  },
  {
    question: "Can you maintain and grow the site after launch?",
    answer:
      "Absolutely. Most clients move onto a growth retainer covering CRO, SEO, content, automation and ongoing engineering support.",
  },
  {
    question: "What tech stack do you use?",
    answer:
      "Next.js, TypeScript, Tailwind, Prisma, and shadcn/ui on the frontend; Node, Python and serverless on the backend; OpenAI-grade LLMs for AI; Shopify and headless commerce for ecommerce.",
  },
  {
    question: "Do you build AI agents that actually work for my business?",
    answer:
      "Yes — we design, train and deploy LLM agents grounded in your data (RAG), connected to your tools, with guardrails and analytics so you can measure real impact.",
  },
  {
    question: "How does pricing work?",
    answer:
      "We offer fixed-scope project pricing and monthly retainers. You'll always get a clear quote before any work begins — no surprises.",
  },
];

export const TECH_STACK: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Prisma",
  "PostgreSQL",
  "OpenAI",
  "LangChain",
  "Shopify",
  "Vercel",
  "Figma",
  "n8n",
  "Python",
  "Redis",
  "Stripe",
];

export const AWARDS: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Award, label: "Clutch Top 100", sub: "Design Agencies 2024" },
  { icon: Sparkles, label: "Awwwards", sub: "Site of the Day x4" },
  { icon: Gauge, label: "99+", sub: "Avg. Lighthouse score" },
  { icon: ShieldCheck, label: "SOC2-ready", sub: "Security practices" },
];

export const TRUSTED_BY: string[] = [
  "Lumen",
  "Nova",
  "Atlas",
  "Verdant",
  "Pulse",
  "Mira",
  "Orbit",
  "Northwind",
];

export const FEATURES_GRID: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Smartphone, title: "Mobile-first", description: "Flawless on every device, every breakpoint." },
  { icon: Gauge, title: "Lightning fast", description: "Sub-second loads and 90+ Core Web Vitals." },
  { icon: ShieldCheck, title: "Secure by default", description: "Best-practice auth, backups and monitoring." },
  { icon: LineChart, title: "Data-driven", description: "Analytics and experiments baked into every build." },
  { icon: Workflow, title: "Automated", description: "AI + automation remove repetitive work." },
  { icon: BrainCircuit, title: "AI-native", description: "LLM agents and RAG woven into your product." },
  { icon: Globe, title: "Scalable", description: "Architectures that grow with your ambitions." },
  { icon: Users, title: "Human-led", description: "Senior experts who care about your outcomes." },
];
