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
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  },
}))
