'use client'

import { create } from 'zustand'
import type { PageId } from '@/lib/site-data'

type NavState = {
  page: PageId
  setPage: (page: PageId) => void
}

export const useNav = create<NavState>((set) => ({
  page: 'home',
  setPage: (page) => {
    set({ page })
    if (typeof window !== 'undefined') {
      // If we're on a non-home route (e.g. /services/[slug], /admin/inbox),
      // redirect to the home route so the SPA can render the correct page
      if (window.location.pathname !== '/') {
        window.location.href = `/#${page}`
        return
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  },
}))
