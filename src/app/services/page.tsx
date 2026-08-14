import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Services — Web Design, AI, SEO & Ecommerce',
  description: 'Explore Preet Web Vision services: Website Design & Development, AI Automations, Web App Development, SEO & Digital Growth, and Ecommerce Solutions.',
  keywords: ['web design services', 'AI automation', 'web app development', 'SEO services', 'ecommerce solutions'],
  openGraph: {
    title: 'Preet Web Vision Services',
    description: 'Website Design, AI Automations, Web Apps, SEO & Ecommerce — all in one studio.',
    url: 'https://preetwebvision.com/services',
  },
  alternates: { canonical: 'https://preetwebvision.com/services' },
}

export default function ServicesPage() {
  redirect('/#services')
}
