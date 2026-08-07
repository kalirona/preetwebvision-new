'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Image with blur-up placeholder + skeleton shimmer while loading.
 * Uses native lazy-loading + IntersectionObserver to add the `loaded` class.
 */
export function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string
}) {
  const [loaded, setLoaded] = React.useState(false)
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const img = imgRef.current
    if (!img) return
    if (img.complete) setLoaded(true)
  }, [])

  return (
    <div className={cn('relative overflow-hidden', !loaded && 'img-skeleton', wrapperClassName)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn('img-blur-up transition-opacity duration-500', loaded ? 'loaded opacity-100' : 'opacity-0', className)}
        {...props}
      />
    </div>
  )
}
