import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Preet Web Vision services.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Terms of <span className="text-gradient-brand">Service</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2025</p>

        <div className="policy-prose mt-10">
          <p>Welcome to Preet Web Vision. By using our website and services, you agree to these terms. Please read them carefully.</p>

          <h3>1. Services</h3>
          <p>Preet Web Vision (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides digital marketing services including:</p>
          <ul>
            <li>Website design and development</li>
            <li>AI automation solutions</li>
            <li>Web application development</li>
            <li>SEO and digital growth services</li>
            <li>Ecommerce solutions</li>
          </ul>
          <p>Specific deliverables, timelines, and pricing are defined in individual project agreements.</p>

          <h3>2. Acceptance of Terms</h3>
          <p>By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.</p>

          <h3>3. Project Engagement</h3>
          <ul>
            <li>All projects begin with a discovery call and written proposal</li>
            <li>A 50% deposit is required before work begins (unless otherwise agreed)</li>
            <li>Project timelines are estimates and may change based on scope, feedback, and revisions</li>
            <li>Final payment is due upon project completion and before deployment</li>
          </ul>

          <h3>4. Revisions and Feedback</h3>
          <p>Each project includes a specified number of revision rounds in the project agreement. Additional revisions beyond the agreed scope are billed at our hourly rate. We require feedback within 5 business days of each deliverable to keep projects on schedule.</p>

          <h3>5. Intellectual Property</h3>
          <ul>
            <li>Upon full payment, all final deliverables (code, designs, content) are transferred to the client</li>
            <li>We retain the right to display completed work in our portfolio and marketing materials unless otherwise agreed in writing</li>
            <li>Third-party assets (fonts, stock images, plugins) are licensed under their respective terms</li>
            <li>Pre-existing frameworks, templates, and tools developed by us remain our intellectual property</li>
          </ul>

          <h3>6. Payment Terms</h3>
          <ul>
            <li>Invoices are due within 7 days unless otherwise stated</li>
            <li>Late payments may incur a 1.5% monthly interest charge</li>
            <li>Monthly retainers are billed in advance and are non-refundable</li>
            <li>Refunds for project work are assessed on a case-by-case basis</li>
          </ul>

          <h3>7. Limitation of Liability</h3>
          <p>Preet Web Vision is not liable for:</p>
          <ul>
            <li>Loss of revenue or profits due to website downtime or issues</li>
            <li>Damages caused by third-party services or hosting providers</li>
            <li>Loss of data not caused by our direct negligence</li>
            <li>SEO ranking changes due to search engine algorithm updates</li>
          </ul>
          <p>Our total liability is limited to the amount paid for the specific project in question.</p>

          <h3>8. Confidentiality</h3>
          <p>Both parties agree to keep confidential any proprietary information shared during the course of a project. This includes business strategies, financial information, and technical details. We are happy to sign NDAs upon request.</p>

          <h3>9. AI Assistant</h3>
          <p>Our AI chatbot is provided as a convenience tool. We do not guarantee the accuracy of AI-generated responses. The AI assistant should not be relied upon for legal, financial, or critical business decisions. Conversations with the AI assistant may be reviewed by our team to improve service quality.</p>

          <h3>10. Affiliate Links</h3>
          <p>Our website may contain affiliate links. We may earn a commission when you purchase through these links, at no additional cost to you. We only recommend products and services we genuinely believe add value.</p>

          <h3>11. Termination</h3>
          <p>Either party may terminate a project with 14 days written notice. In the event of termination, the client is responsible for payment for all work completed up to the termination date. Deposits are non-refundable.</p>

          <h3>12. Governing Law</h3>
          <p>These terms are governed by the laws applicable in the jurisdiction where Preet Web Vision operates. Any disputes will be resolved through good-faith negotiation first, then through arbitration if necessary.</p>

          <h3>13. Changes to Terms</h3>
          <p>We may update these terms from time to time. Continued use of our services after changes constitutes acceptance of the updated terms.</p>

          <h3>14. Contact</h3>
          <p>
            Questions about these terms? Email{' '}
            <a href="mailto:hello@preetwebvision.com">hello@preetwebvision.com</a>{' '}
            or WhatsApp{' '}
            <a href="https://wa.me/639633112000">+63 963 311 2000</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
