'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What services do you offer?',
  'How much does a website cost?',
  'Can you build an AI chatbot for my business?',
  'How long does a project take?',
]

const GREETING =
  "Hey there! 👋 I'm Vision AI — a live demo of the automations Preet Web Vision builds. Ask me about websites, AI, web apps, SEO or ecommerce!"

export function AiAssistant() {
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Msg[]>([
    { role: 'assistant', content: GREETING },
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [sessionId, setSessionId] = React.useState<string | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { setPage } = useNav()
  const [seen, setSeen] = React.useState(false)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  React.useEffect(() => {
    if (open) setSeen(true)
  }, [open])

  // Listen for custom event from Command Palette + Esc to close
  React.useEffect(() => {
    const onOpen = () => setOpen(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('open-ai-assistant', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('open-ai-assistant', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || loading) return
    const next: Msg[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionId ? { 'x-chat-session': sessionId } : {}),
        },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed')
      if (data.sessionId && !sessionId) setSessionId(data.sessionId)
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again, or reach us via the contact page — we reply within one business day. 🙏",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Keyboard hint — shows next to launcher on desktop when closed */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 2 }}
            className="fixed bottom-8 right-20 z-40 hidden items-center gap-1.5 lg:flex"
          >
            <span className="rounded-full border border-border/60 bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
              Press
            </span>
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_12px_40px_-6px_rgba(255,45,117,0.7)] hover:shadow-[0_16px_50px_-6px_rgba(255,45,117,0.9)] transition-shadow press"
        aria-label="Open AI assistant (Cmd+K)"
      >
        <span className="absolute inset-0 rounded-full bg-brand-gradient opacity-60 blur-md animate-pulse-glow -z-10" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && !seen && (
          <span className="absolute -right-0.5 -top-0.5 flex size-3.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-3.5 rounded-full bg-emerald-500" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed bottom-24 right-3 z-50 flex h-[30rem] max-h-[78vh] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl glass-strong shadow-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-border/60 bg-brand-gradient px-4 py-3.5 text-white">
              <span className="absolute inset-0 animate-shimmer opacity-30" />
              <span className="relative grid size-10 place-items-center rounded-full bg-white/20 backdrop-blur">
                <Sparkles className="size-5" />
              </span>
              <div className="relative">
                <p className="font-display text-sm font-bold leading-tight">Vision AI</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Live · powered by Preet Web Vision
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-3.5 no-scrollbar"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-brand-gradient text-white rounded-br-md'
                        : 'bg-muted/70 text-foreground rounded-bl-md'
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted/70 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-2 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-3.5 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border/70 bg-background/50 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:border-border"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* CTA to contact */}
            <div className="px-3.5 pb-2">
              <button
                onClick={() => {
                  setOpen(false)
                  setPage('contact')
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border/70 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border"
              >
                Prefer a human? Book a call
                <ArrowRight className="size-3" />
              </button>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 rounded-full bg-muted/50 px-4 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="shrink-0 rounded-full bg-brand-gradient text-white"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
