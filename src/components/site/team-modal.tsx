'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useNav } from '@/lib/nav-store'
import { TEAM_PROFILES, type TeamProfile } from '@/lib/content-data'
import { cn } from '@/lib/utils'

function SocialIcon({ label }: { label: string }) {
  const map: Record<string, string> = {
    LinkedIn: 'in',
    Twitter: 'X',
    GitHub: 'GH',
    Dribbble: 'Dr',
  }
  return <span className="text-[10px] font-bold">{map[label] ?? label[0]}</span>
}

export function TeamModal({
  profile,
  onClose,
}: {
  profile: TeamProfile | null
  onClose: () => void
}) {
  const { setPage } = useNav()

  React.useEffect(() => {
    if (profile) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [profile, onClose])

  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Profile: ${profile.name}`}
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
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-background shadow-2xl sm:rounded-3xl"
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden">
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-90', profile.accent)} />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close profile"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
              >
                <X className="size-4" />
              </button>
              <div className="relative flex items-center gap-4 p-6 sm:p-8">
                <Avatar className="size-20 border-4 border-white/20 shadow-xl">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="size-full object-cover"
                    />
                  ) : null}
                  <AvatarFallback className={cn('bg-gradient-to-br text-white font-display text-2xl font-bold')}>
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    {profile.role}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    {profile.name}
                  </h2>
                  <p className="mt-1 text-sm text-white/85">{profile.tagline}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {profile.stats.map((s) => (
                  <div
                    key={s.label}
                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-3 text-center"
                  >
                    <div className={cn('pointer-events-none absolute -right-3 -top-3 size-10 rounded-full bg-gradient-to-br opacity-15 blur-xl', profile.accent)} />
                    <p className="font-display text-lg font-bold text-gradient-brand sm:text-xl">{s.value}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="mt-6 space-y-3">
                {profile.bio.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  <span className="grid size-7 place-items-center rounded-lg bg-brand-gradient-soft">
                    <Sparkles className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
                  </span>
                  Expertise
                </h3>
                <div className="mt-3 space-y-3">
                  {profile.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="skill-bar-fill h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun fact */}
              <div className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fun fact</p>
                <p className="mt-1 text-sm italic leading-relaxed">&ldquo;{profile.funFact}&rdquo;</p>
              </div>

              {/* Socials */}
              <div className="mt-5 flex items-center gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={`${profile.name} on ${s.label}`}
                    className="grid size-9 place-items-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-border hover:bg-brand-gradient-soft hover:text-foreground"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-border/60 bg-muted/20 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Want to work with {profile.name.split(' ')[0]}?</p>
                <Button
                  onClick={() => {
                    onClose()
                    setPage('contact')
                  }}
                  className="rounded-full bg-brand-gradient text-white"
                >
                  Start a project
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
