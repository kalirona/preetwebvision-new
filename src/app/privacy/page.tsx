import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Preet Web Vision collects, uses, and protects your data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Privacy <span className="text-gradient-brand">Policy</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2025</p>

        <div className="policy-prose mt-10">
          <p>At Preet Web Vision, we take your privacy seriously. This policy explains what we collect, why, and how you can control it.</p>

          <h3>1. Cookies We Use</h3>
          <p>We use cookies for two purposes only:</p>
          <ul>
            <li><strong>Essential:</strong> Remember your theme preference (dark/light) and cookie consent choice. These are stored in your browser&apos;s localStorage and are necessary for the site to function.</li>
            <li><strong>Analytics:</strong> We track anonymous page views and form submissions to improve our content. No personal data is sold or shared with third parties.</li>
          </ul>
          <p>We do <strong>not</strong> use advertising cookies, cross-site tracking, or fingerprinting.</p>

          <h3>2. Data We Collect</h3>
          <p>When you submit a form (contact, newsletter, project wizard), we collect:</p>
          <ul>
            <li>Your name and email address</li>
            <li>Company name (optional)</li>
            <li>Project details you share with us</li>
            <li>Timestamp of submission</li>
          </ul>
          <p>When you use the AI assistant, your messages are processed by our LLM provider to generate responses. We store conversation history in our database so our team can review and respond to your inquiries.</p>

          <h3>3. How We Use Your Data</h3>
          <ul>
            <li>To respond to your inquiries and provide quotes</li>
            <li>To send you our newsletter (only if you subscribe)</li>
            <li>To improve our services and website content</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h3>4. How We Protect Your Data</h3>
          <p>All data is stored in a secure database with encrypted connections. Access is restricted to authorized team members. We follow SOC2-aligned security practices including:</p>
          <ul>
            <li>Rate limiting on all public API endpoints</li>
            <li>Brute force protection on admin login</li>
            <li>HTTP-only, SameSite=Strict cookies for sessions</li>
            <li>Security headers (HSTS, X-Frame-Options, X-Content-Type-Options)</li>
            <li>Input validation and sanitization on all forms</li>
          </ul>

          <h3>5. Third-Party Services</h3>
          <p>We use the following third-party services that may process your data:</p>
          <ul>
            <li><strong>LLM Provider:</strong> To power our AI chatbot (messages are processed to generate responses)</li>
            <li><strong>Hosting Provider:</strong> To host our website and database</li>
          </ul>
          <p>We do not sell, rent, or share your personal data with any other third parties.</p>

          <h3>6. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Withdraw cookie consent (use the &quot;Cookie preferences&quot; button in the footer)</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:hello@preetwebvision.com">hello@preetwebvision.com</a>.</p>

          <h3>7. Data Retention</h3>
          <p>We retain form submissions and chat conversations for up to 24 months. Newsletter subscriptions are retained until you unsubscribe. You can request early deletion at any time.</p>

          <h3>8. Children&apos;s Privacy</h3>
          <p>Our website is not directed to children under 13. We do not knowingly collect personal data from children.</p>

          <h3>9. Changes to This Policy</h3>
          <p>We may update this policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.</p>

          <h3>10. Contact Us</h3>
          <p>
            Questions about privacy? Email us at{' '}
            <a href="mailto:hello@preetwebvision.com">hello@preetwebvision.com</a>{' '}
            or message us on WhatsApp at{' '}
            <a href="https://wa.me/639633112000">+63 963 311 2000</a>. We&apos;ll respond within 48 hours.
          </p>
          <p className="mt-8 text-sm text-muted-foreground">
            We&apos;re GDPR and CCPA compliant.
          </p>
        </div>
      </div>
    </div>
  )
}
