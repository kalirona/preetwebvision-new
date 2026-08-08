'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Send,
  Mail,
  Clock,
  MessageSquare,
  Search,
  Inbox as InboxIcon,
  CheckCheck,
  Archive,
  Bot,
  User,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Conversation = {
  id: string
  sessionId: string
  email: string | null
  name: string | null
  status: string
  createdAt: string
  updatedAt: string
  lastMessage: string | null
  lastRole: string | null
  messageCount: number
}

type Message = {
  id: string
  role: string
  content: string
  createdAt: string
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function ChatInboxPage() {
  const [conversations, setConversations] = React.useState<Conversation[]>([])
  const [selected, setSelected] = React.useState<Conversation | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [loadingList, setLoadingList] = React.useState(true)
  const [loadingMsgs, setLoadingMsgs] = React.useState(false)
  const [reply, setReply] = React.useState('')
  const [sending, setSending] = React.useState(false)
  const [filter, setFilter] = React.useState<'all' | 'new' | 'replied' | 'archived'>('all')
  const [search, setSearch] = React.useState('')
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const fetchConversations = React.useCallback(async () => {
    setLoadingList(true)
    try {
      const res = await fetch('/api/chat/conversations')
      const data = await res.json()
      setConversations(data.conversations || [])
    } catch {
      /* ignore */
    } finally {
      setLoadingList(false)
    }
  }, [])

  React.useEffect(() => {
    fetchConversations()
    const id = setInterval(fetchConversations, 30000)
    return () => clearInterval(id)
  }, [fetchConversations])

  const selectConversation = async (conv: Conversation) => {
    setSelected(conv)
    setLoadingMsgs(true)
    setMessages([])
    try {
      const res = await fetch(`/api/chat/reply?id=${conv.id}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch {
      /* ignore */
    } finally {
      setLoadingMsgs(false)
    }
  }

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendReply = async () => {
    if (!reply.trim() || !selected || sending) return
    setSending(true)
    try {
      const res = await fetch('/api/chat/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: selected.id, content: reply.trim() }),
      })
      const data = await res.json()
      if (data.ok) {
        setMessages((m) => [...m, { id: data.id, role: 'assistant', content: reply.trim(), createdAt: new Date().toISOString() }])
        setReply('')
        setConversations((prev) =>
          prev.map((c) => (c.id === selected.id ? { ...c, status: 'replied', lastMessage: reply.trim(), lastRole: 'assistant' } : c))
        )
      }
    } catch {
      /* ignore */
    } finally {
      setSending(false)
    }
  }

  const updateStatus = async (conv: Conversation, status: 'new' | 'replied' | 'archived') => {
    await fetch('/api/chat/conversations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conv.id, status }),
    })
    setConversations((prev) => prev.map((c) => (c.id === conv.id ? { ...c, status } : c)))
    if (selected?.id === conv.id) setSelected((s) => (s ? { ...s, status } : s))
  }

  const filtered = conversations.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return c.email?.toLowerCase().includes(q) || c.lastMessage?.toLowerCase().includes(q)
    }
    return true
  })

  const stats = {
    total: conversations.length,
    new: conversations.filter((c) => c.status === 'new').length,
    replied: conversations.filter((c) => c.status === 'replied').length,
    archived: conversations.filter((c) => c.status === 'archived').length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to site
            </a>
            <span className="text-border">|</span>
            <h1 className="flex items-center gap-2 font-display text-lg font-bold">
              <InboxIcon className="size-5" style={{ color: 'var(--brand-pink)' }} />
              Chat Inbox
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
            <span>{stats.total} conversations</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-0 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 p-4 sm:px-0 sm:pt-6">
          {[
            { label: 'Total', value: stats.total, color: 'from-orange-500 to-pink-500' },
            { label: 'New', value: stats.new, color: 'from-emerald-500 to-teal-500' },
            { label: 'Replied', value: stats.replied, color: 'from-amber-500 to-orange-500' },
            { label: 'Archived', value: stats.archived, color: 'from-fuchsia-500 to-rose-500' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-3 text-center sm:p-4">
              <p className={cn('font-display text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent', s.color)}>
                {s.value}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main split view */}
        <div className="grid gap-0 lg:grid-cols-[380px_1fr]">
          {/* Conversation list */}
          <div className="border-r border-border/60">
            {/* Search + filters */}
            <div className="space-y-3 border-b border-border/60 p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations…"
                  className="rounded-full bg-muted/30 pl-9"
                />
              </div>
              <div className="flex gap-1.5">
                {(['all', 'new', 'replied', 'archived'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors',
                      filter === f
                        ? 'bg-brand-gradient text-white'
                        : 'bg-muted/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="max-h-[60vh] overflow-y-auto lg:max-h-[calc(100vh-280px)]">
              {loadingList ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <MessageSquare className="size-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">No conversations yet.</p>
                  <p className="text-xs text-muted-foreground/70">Chat messages from the AI assistant will appear here.</p>
                </div>
              ) : (
                filtered.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => selectConversation(conv)}
                    className={cn(
                      'flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-colors hover:bg-muted/30',
                      selected?.id === conv.id && 'bg-brand-gradient-soft'
                    )}
                  >
                    <span className={cn(
                      'grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white',
                      conv.status === 'new' ? 'bg-emerald-500' : conv.status === 'replied' ? 'bg-amber-500' : 'bg-muted-foreground'
                    )}>
                      {conv.email ? conv.email[0].toUpperCase() : '?'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold">
                          {conv.email || 'Anonymous visitor'}
                        </p>
                        <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(conv.updatedAt)}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {conv.lastRole === 'user' ? '👤 ' : '🤖 '}
                        {conv.lastMessage || 'No messages'}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className={cn(
                          'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase',
                          conv.status === 'new' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                          conv.status === 'replied' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                          'bg-muted text-muted-foreground'
                        )}>
                          {conv.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{conv.messageCount} messages</span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message view */}
          <div className="flex h-[calc(100vh-200px)] flex-col">
            {selected ? (
              <>
                {/* Conversation header */}
                <div className="flex items-center justify-between border-b border-border/60 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-brand-gradient text-white">
                      {selected.email ? selected.email[0].toUpperCase() : '?'}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold">{selected.email || 'Anonymous visitor'}</p>
                      <p className="text-xs text-muted-foreground">
                        Started {timeAgo(selected.createdAt)} · {selected.messageCount} messages
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateStatus(selected, 'replied')}
                      className="rounded-full text-xs"
                    >
                      <CheckCheck className="size-3.5" />
                      Mark replied
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateStatus(selected, 'archived')}
                      className="rounded-full text-xs"
                    >
                      <Archive className="size-3.5" />
                      Archive
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
                  {loadingMsgs ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="size-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          'flex gap-2.5',
                          msg.role === 'user' ? 'justify-start' : 'justify-end'
                        )}
                      >
                        {msg.role === 'user' && (
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                            <User className="size-3.5" />
                          </span>
                        )}
                        <div className={cn(
                          'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                          msg.role === 'user'
                            ? 'rounded-bl-sm bg-muted/60 text-foreground'
                            : 'rounded-br-sm bg-brand-gradient text-white'
                        )}>
                          <p className="leading-relaxed">{msg.content}</p>
                          <p className={cn(
                            'mt-1 text-[10px]',
                            msg.role === 'user' ? 'text-muted-foreground' : 'text-white/60'
                          )}>
                            {timeAgo(msg.createdAt)}
                          </p>
                        </div>
                        {msg.role === 'assistant' && (
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                            <Bot className="size-3.5" />
                          </span>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Reply box */}
                <div className="border-t border-border/60 p-4">
                  <form
                    onSubmit={(e) => { e.preventDefault(); sendReply() }}
                    className="flex items-center gap-2"
                  >
                    <Input
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your reply…"
                      className="rounded-full bg-muted/30"
                      disabled={sending}
                    />
                    <Button
                      type="submit"
                      disabled={sending || !reply.trim()}
                      className="shrink-0 rounded-full bg-brand-gradient text-white"
                    >
                      {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                    </Button>
                  </form>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Your reply will be saved to the conversation. To email the client, use their address: {selected.email || 'No email provided'}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-muted/40">
                  <MessageSquare className="size-8 text-muted-foreground/40" />
                </span>
                <p className="mt-4 font-display text-lg font-bold">Select a conversation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a conversation from the list to view messages and reply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
