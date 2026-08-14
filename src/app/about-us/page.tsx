import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'About Us — Preet Web Vision',
  description: 'Learn about Preet Web Vision — a senior, remote-first digital studio pairing design obsessiveness with AI-native engineering. 180+ projects shipped across 12 countries.',
  keywords: ['about preet web vision', 'digital agency team', 'web design company', 'AI automation experts'],
  openGraph: {
    title: 'About Preet Web Vision',
    description: 'A senior, remote-first digital studio pairing design obsessiveness with AI-native engineering.',
    url: 'https://preetwebvision.com/about-us',
  },
  alternates: { canonical: 'https://preetwebvision.com/about-us' },
}

export default function AboutUsPage() {
  redirect('/#about')
}
