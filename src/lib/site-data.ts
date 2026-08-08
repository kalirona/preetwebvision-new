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
  { id: "portfolio", label: "Work" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Pricing" },
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
  accent: string; // tailwind gradient stops
  glow: string;
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
    name: "Preet Kaur",
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
