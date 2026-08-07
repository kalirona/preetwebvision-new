'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

export type LightboxImage = {
  src: string
  alt: string
  caption?: string
}

export function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const [zoomed, setZoomed] = React.useState(false)
  const isOpen = index !== null && index >= 0 && index < images.length

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft' && index !== null) onIndexChange(Math.max(index - 1, 0))
        if (e.key === 'ArrowRight' && index !== null) onIndexChange(Math.min(index + 1, images.length - 1))
      }
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [isOpen, index, images.length, onClose, onIndexChange])

  const current = isOpen ? images[index!] : null

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lightbox-backdrop fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {index! + 1} / {images.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z) }}
                aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                {zoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
              </button>
              <button
                onClick={onClose}
                aria-label="Close lightbox"
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoomed ? 1.5 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            {current.caption && (
              <p className="mt-3 text-center text-sm text-white/80">{current.caption}</p>
            )}
          </motion.div>

          {/* Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onIndexChange(Math.max(index! - 1, 0)) }}
                disabled={index === 0}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onIndexChange(Math.min(index! + 1, images.length - 1)) }}
                disabled={index === images.length - 1}
                aria-label="Next image"
                className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 disabled:opacity-30"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
