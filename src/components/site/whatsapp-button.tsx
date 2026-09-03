'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const phone = '639633112000'
  const message = encodeURIComponent("Hi Preet Web Vision! I'd like to discuss a project.")
  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 left-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.6)] transition-shadow hover:shadow-[0_12px_40px_-6px_rgba(37,211,102,0.8)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 blur-md animate-pulse-glow -z-10" />
      <MessageCircle className="size-7" fill="white" />
      <span className="absolute -right-0.5 -top-0.5 flex size-3.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
        <span className="relative inline-flex size-3.5 rounded-full bg-emerald-500" />
      </span>
    </motion.a>
  )
}
