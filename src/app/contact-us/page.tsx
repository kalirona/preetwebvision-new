import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Contact Us — Start Your Project',
  description: 'Get in touch with Preet Web Vision. WhatsApp +63 963 311 2000 or email hello@preetwebvision.com. We reply within one business day.',
  keywords: ['contact web design agency', 'hire AI developers', 'website design quote', 'ecommerce development contact'],
  openGraph: {
    title: 'Contact Preet Web Vision',
    description: 'Start your project — websites, AI, web apps, SEO and ecommerce.',
    url: 'https://preetwebvision.com/contact-us',
  },
  alternates: { canonical: 'https://preetwebvision.com/contact-us' },
}

export default function ContactUsPage() {
  redirect('/#contact')
}
