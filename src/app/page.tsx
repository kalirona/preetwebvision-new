'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { AiAssistant } from '@/components/site/ai-assistant'
import { ScrollProgress, BackToTop, CookieConsent } from '@/components/site/site-chrome'
import { useNav } from '@/lib/nav-store'
import { HomePage } from '@/components/site/pages/home-page'
import { ServicesPage } from '@/components/site/pages/services-page'
import { PortfolioPage } from '@/components/site/pages/portfolio-page'
import { AboutPage } from '@/components/site/pages/about-page'
import { PricingPage } from '@/components/site/pages/pricing-page'
import { ContactPage } from '@/components/site/pages/contact-page'
import { BlogPage } from '@/components/site/pages/blog-page'

export default function Home() {
  const { page } = useNav()

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="relative flex-1 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
    </div>
  )
}
