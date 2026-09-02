import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Contact Us — Start Your Project Today',
  description: 'Get in touch with Preet Web Vision for websites, AI automations, web apps, SEO and ecommerce. WhatsApp +63 963 311 2000 or email hello@preetwebvision.com. We reply within one business day. Free consultation available.',
  keywords: ['contact web design agency', 'hire AI developers', 'website design quote', 'ecommerce development contact', 'SEO services contact', 'project inquiry'],
  openGraph: {
    title: 'Contact Preet Web Vision — Start Your Project',
    description: 'Websites, AI, web apps, SEO and ecommerce — let\'s build something extraordinary.',
    url: 'https://preetwebvision.com/contact-us',
    siteName: 'Preet Web Vision',
    type: 'website',
  },
  alternates: { canonical: 'https://preetwebvision.com/contact-us' },
}

export default function ContactUsPage() {
  redirect('/')
}
