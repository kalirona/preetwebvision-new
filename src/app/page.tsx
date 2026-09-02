'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { ScrollProgress, BackToTop, CookieConsent } from '@/components/site/site-chrome'
import { useNav } from '@/lib/nav-store'
import type { PageId } from '@/lib/site-data'

// Lazy-load non-critical components to reduce initial JS bundle
const AiAssistant = dynamic(() => import('@/components/site/ai-assistant').then((m) => m.AiAssistant), {
  ssr: false,
  loading: () => null,
})
const SocialProofNotifications = dynamic(() => import('@/components/site/social-proof').then((m) => m.SocialProofNotifications), {
  ssr: false,
  loading: () => null,
})
const CommandPalette = dynamic(() => import('@/components/site/command-palette').then((m) => m.CommandPalette), {
  ssr: false,
  loading: () => null,
})
const KeyboardShortcuts = dynamic(() => import('@/components/site/keyboard-shortcuts').then((m) => m.KeyboardShortcuts), {
  ssr: false,
  loading: () => null,
})
const WhatsAppButton = dynamic(() => import('@/components/site/whatsapp-button').then((m) => m.WhatsAppButton), {
  ssr: false,
  loading: () => null,
})
const Analytics = dynamic(() => import('@/components/site/analytics').then((m) => m.Analytics), {
  ssr: false,
  loading: () => null,
})

// Lazy-load page components — only the active page is loaded
const HomePage = dynamic(() => import('@/components/site/pages/home-page').then((m) => m.HomePage), { ssr: true, loading: () => null })
const ServicesPage = dynamic(() => import('@/components/site/pages/services-page').then((m) => m.ServicesPage), { ssr: true, loading: () => null })
const PortfolioPage = dynamic(() => import('@/components/site/pages/portfolio-page').then((m) => m.PortfolioPage), { ssr: true, loading: () => null })
const AboutPage = dynamic(() => import('@/components/site/pages/about-page').then((m) => m.AboutPage), { ssr: true, loading: () => null })
const PricingPage = dynamic(() => import('@/components/site/pages/pricing-page').then((m) => m.PricingPage), { ssr: true, loading: () => null })
const ContactPage = dynamic(() => import('@/components/site/pages/contact-page').then((m) => m.ContactPage), { ssr: true, loading: () => null })
const BlogPage = dynamic(() => import('@/components/site/pages/blog-page').then((m) => m.BlogPage), { ssr: true, loading: () => null })

// Per-page transition variants for a more dynamic feel
const PAGE_VARIANTS: Record<PageId, Variants> = {
  home: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  services: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  },
  portfolio: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.01 },
  },
  about: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  pricing: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  },
  blog: {
    initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
  },
  contact: {
    initial: { opacity: 0, scale: 0.99, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.99, y: -8 },
  },
}

export default function Home() {
  const { page } = useNav()
  const variants = PAGE_VARIANTS[page] ?? PAGE_VARIANTS.home

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      {/* SEO content for crawlers — hidden from visual users, visible to Google */}
      <noscript>
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Preet Web Vision — Web Design, AI Automations & Digital Growth</h1>
          <p>Preet Web Vision is a modern digital marketing agency crafting stunning websites, AI automations, web apps, SEO and ecommerce experiences that grow ambitious brands.</p>
          <h2>Our Services</h2>
          <ul>
            <li><strong>Website Design & Development</strong> — Custom, blazing-fast websites with Next.js, responsive design, CMS integration, Core Web Vitals optimization, and WCAG accessibility.</li>
            <li><strong>AI Automations</strong> — LLM agents, RAG knowledge bases, chatbots, workflow automation, and custom AI solutions that save time and grow revenue.</li>
            <li><strong>Web App Development</strong> — SaaS dashboards, realtime features, role-based auth, scalable architecture, and API design.</li>
            <li><strong>SEO & Digital Growth</strong> — Technical SEO, content strategy, keyword research, link building, and monthly growth reporting.</li>
            <li><strong>Ecommerce Solutions</strong> — Shopify, headless commerce, custom storefronts, payment integration, and conversion optimization.</li>
          </ul>
          <h2>Why Choose Us</h2>
          <p>180+ projects shipped, 98% client retention, 14x average ROI for clients. We are a senior, remote-first team serving clients across 12 countries. Our process: Discover → Design → Build → Launch & Scale.</p>
          <h2>Pricing</h2>
          <p>We offer custom quotes based on your project scope. Contact us for a free consultation and personalized quote.</p>
          <h2>Contact</h2>
          <p>Email: hello@preetwebvision.com | WhatsApp: +63 963 311 2000 | Remote-first, serving clients worldwide.</p>
        </div>
      </noscript>
      <main className="relative flex-1 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {page === 'home' && <HomePage />}
            {page === 'services' && <ServicesPage />}
            {page === 'portfolio' && <PortfolioPage />}
            {page === 'about' && <AboutPage />}
            {page === 'pricing' && <PricingPage />}
            {page === 'blog' && <BlogPage />}
            {page === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AiAssistant />
      <BackToTop />
      <CookieConsent />
      <SocialProofNotifications />
      <CommandPalette />
      <KeyboardShortcuts />
      <WhatsAppButton />
      <Analytics />
    </div>
  )
}
