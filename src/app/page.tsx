'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { AiAssistant } from '@/components/site/ai-assistant'
import { ScrollProgress, BackToTop, CookieConsent } from '@/components/site/site-chrome'
import { SocialProofNotifications } from '@/components/site/social-proof'
import { CommandPalette } from '@/components/site/command-palette'
import { useNav } from '@/lib/nav-store'
import type { PageId } from '@/lib/site-data'
import { HomePage } from '@/components/site/pages/home-page'
import { ServicesPage } from '@/components/site/pages/services-page'
import { PortfolioPage } from '@/components/site/pages/portfolio-page'
import { AboutPage } from '@/components/site/pages/about-page'
import { PricingPage } from '@/components/site/pages/pricing-page'
import { ContactPage } from '@/components/site/pages/contact-page'
import { BlogPage } from '@/components/site/pages/blog-page'

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
    </div>
  )
}
