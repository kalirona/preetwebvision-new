'use client'

import { motion } from 'framer-motion'

/**
 * Animated SVG line illustration divider — a flowing wave path that draws
 * itself on scroll into view. Used between major sections for visual rhythm.
 */
export function SvgDivider({ className }: { className?: string }) {
  return (
    <div className={`svg-divider ${className ?? ''}`} aria-hidden>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="div-grad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--brand-orange)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--brand-orange)" />
            <stop offset="50%" stopColor="var(--brand-pink)" />
            <stop offset="80%" stopColor="var(--brand-rose)" />
            <stop offset="100%" stopColor="var(--brand-rose)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20"
          stroke="url(#div-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
