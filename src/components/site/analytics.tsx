'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || ''
  const gscCode = process.env.NEXT_PUBLIC_GSC_CODE || ''

  useEffect(() => {
    // Read from SEO settings API (client-side)
    fetch('/api/admin/seo', { credentials: 'include' })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.ok && data.settings) {
          const ga = data.settings.google_analytics_id
          const gsc = data.settings.google_search_console
          if (ga && ga !== gCurrentGA) {
            gCurrentGA = ga
            injectGA(ga)
          }
          if (gsc && gsc !== gCurrentGSC) {
            gCurrentGSC = gsc
            injectGSC(gsc)
          }
        }
      })
      .catch(() => {})
  }, [])

  return null
}

let gCurrentGA = ''
let gCurrentGSC = ''

function injectGA(gaId: string) {
  if (typeof window === 'undefined' || !gaId) return
  // @ts-ignore
  window.gtag = window.gtag || function(...args: unknown[]){(window.gtag.q=window.gtag.q||[]).push(args)}
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(s)
  // @ts-ignore
  window.gtag('js', new Date())
  // @ts-ignore
  window.gtag('config', gaId)
}

function injectGSC(code: string) {
  if (typeof window === 'undefined' || !code) return
  const m = document.createElement('meta')
  m.name = 'google-site-verification'
  m.content = code
  document.head.appendChild(m)
}
