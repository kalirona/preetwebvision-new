'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Cookie, Mail, Database, Eye, Lock } from 'lucide-react'

export function PrivacyPolicyModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Privacy Policy"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-background shadow-2xl sm:rounded-3xl"
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden border-b border-border/60">
              <div className="absolute inset-0 bg-brand-gradient opacity-10" />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient text-white shadow-lg">
                    <Shield className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight">
                      Privacy <span className="text-gradient-brand">Policy</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">Last updated: August 2025</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close privacy policy"
                  className="grid size-9 place-items-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="policy-prose">
                <p className="text-sm text-muted-foreground">
                  At Preet Web Vision, we take your privacy seriously. This policy explains what we collect, why, and how you can control it.
                </p>

                <h3 className="flex items-center gap-2">
                  <Cookie className="size-4" style={{ color: 'var(--brand-pink)' }} />
                  Cookies we use
                </h3>
                <p>We use cookies for two purposes only:</p>
                <ul>
                  <li><strong>Essential:</strong> Remember your theme preference (dark/light) and cookie consent choice. These are stored in your browser&apos;s localStorage and are necessary for the site to function.</li>
                  <li><strong>Analytics:</strong> We track anonymous page views and form submissions to improve our content. No personal data is sold or shared with third parties.</li>
                </ul>
                <p>We do <strong>not</strong> use advertising cookies, cross-site tracking, or fingerprinting.</p>

                <h3 className="flex items-center gap-2">
                  <Database className="size-4" style={{ color: 'var(--brand-pink)' }} />
                  Data we collect
                </h3>
                <p>When you submit a form (contact, newsletter, project wizard), we collect:</p>
                <ul>
                  <li>Your name and email address</li>
                  <li>Company name (optional)</li>
                  <li>Project details you share with us</li>
                  <li>Timestamp of submission</li>
                </ul>
                <p>When you use the AI assistant, your messages are processed by our LLM provider to generate responses. We do not store conversation history beyond the current session.</p>

                <h3 className="flex items-center gap-2">
                  <Lock className="size-4" style={{ color: 'var(--brand-pink)' }} />
                  How we protect your data
                </h3>
                <p>All data is stored in a secure SQLite database with encrypted connections. Access is restricted to authorized team members. We follow SOC2-aligned security practices.</p>

                <h3 className="flex items-center gap-2">
                  <Eye className="size-4" style={{ color: 'var(--brand-pink)' }} />
                  Your rights
                </h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Request access to your personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Withdraw cookie consent (use the button below)</li>
                </ul>

                <h3 className="flex items-center gap-2">
                  <Mail className="size-4" style={{ color: 'var(--brand-pink)' }} />
                  Contact us
                </h3>
                <p>
                  Questions about privacy? Email us at{' '}
                  <a href="mailto:privacy@preetwebvision.com" className="text-[var(--brand-pink)] underline underline-offset-2">
                    privacy@preetwebvision.com
                  </a>{' '}
                  and we&apos;ll respond within 48 hours.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-border/60 bg-muted/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  We&apos;re GDPR and CCPA compliant.
                </p>
                <button
                  onClick={() => {
                    try {
                      localStorage.removeItem('pwv-cookie-consent-v1')
                    } catch {
                      /* ignore */
                    }
                    onClose()
                  }}
                  className="rounded-full border border-border/70 bg-background px-4 py-2 text-xs font-semibold transition-colors hover:border-border"
                >
                  Withdraw consent
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
