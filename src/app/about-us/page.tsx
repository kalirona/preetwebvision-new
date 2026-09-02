import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'About Us — Preet Web Vision | Digital Marketing Agency',
  description: 'Preet Web Vision is a senior, remote-first digital studio. We pair design obsessiveness with AI-native engineering to ship websites, AI automations, web apps, SEO and ecommerce that grow ambitious brands. 180+ projects shipped across 12 countries with 98% client retention.',
  keywords: ['about preet web vision', 'digital agency team', 'web design company', 'AI automation experts', 'remote-first agency', 'digital marketing team'],
  openGraph: {
    title: 'About Preet Web Vision — Digital Marketing Agency',
    description: 'A senior, remote-first digital studio pairing design obsessiveness with AI-native engineering. 180+ projects, 98% retention, 14x ROI.',
    url: 'https://preetwebvision.com/about-us',
    siteName: 'Preet Web Vision',
    type: 'website',
  },
  alternates: { canonical: 'https://preetwebvision.com/about-us' },
}

export default function AboutUsPage() {
  redirect('/')
}
