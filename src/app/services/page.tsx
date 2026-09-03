import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Services — Website Design, AI Automation, SEO & Ecommerce',
  description: 'Preet Web Vision offers 5 core services: Website Design & Development with Next.js, AI Automations with LLM agents and RAG, Web App Development for SaaS, SEO & Digital Growth with technical SEO and content, and Ecommerce Solutions with Shopify and headless commerce. 180+ projects delivered.',
  keywords: ['web design services', 'AI automation agency', 'web app development', 'SEO services', 'ecommerce solutions', 'Shopify development', 'Next.js development', 'LLM chatbot'],
  openGraph: {
    title: 'Preet Web Vision Services — Web, AI, SEO & Ecommerce',
    description: 'Website Design, AI Automations, Web Apps, SEO & Ecommerce — all in one studio.',
    url: 'https://preetwebvision.com/services',
    siteName: 'Preet Web Vision',
    type: 'website',
  },
  alternates: { canonical: 'https://preetwebvision.com/services' },
}

export default function ServicesPage() {
  redirect('/')
}
