'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Mail,
  MessageSquare,
  Bot,
  LogOut,
  ExternalLink,
  Send,
  Search,
  Loader2,
  CheckCheck,
  Archive,
  UserCog,
  Bot as BotIcon,
  ArrowLeft,
  Clock,
  Inbox as InboxIcon,
  Phone,
  Building2,
  DollarSign,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'submissions' | 'chats' | 'ai'

type Submission = {
  id: string
  name: string
  email: string
  company: string | null
  service: string | null
  budget: string | null
  message: string
  status: string
  createdAt: string
}

type Conversation = {
  id: string
  sessionId: string
  email: string | null
  name: string | null
  status: string
  mode: string
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

export default function AdminDashboard() {
  const [tab, setTab] = React.useState<Tab>('overview')
  const [authChecked, setAuthChecked] = React.useState(false)

  React.useEffect(() => {
    // Check if admin is authenticated via API
    fetch('/api/admin/auth')
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          window.location.href = '/admin'
          return
        }
        setAuthChecked(true)
      })
      .catch(() => {
        window.location.href = '/admin'
      })
  }, [])

  if (!authChecked) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    window.location.href = '/admin'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4" />
              Site
            </a>
            <span className="text-border">|</span>
            <h1 className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid size-7 place-items-center rounded-lg bg-brand-gradient text-white">
                <LayoutDashboard className="size-4" />
              </span>
              Admin Dashboard
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="rounded-full text-muted-foreground hover:text-foreground">
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto flex max-w-7xl gap-1 px-4 sm:px-6">
          {([
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'submissions', label: 'Form Submissions', icon: Mail },
            { id: 'chats', label: 'Chat Inbox', icon: MessageSquare },
            { id: 'ai', label: 'AI Management', icon: Bot },
          ] as { id: Tab; label: string; icon: typeof Mail }[]).map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors',
                  tab === t.id
                    ? 'border-[var(--brand-pink)] text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {tab === 'overview' && <OverviewTab onNavigate={setTab} />}
        {tab === 'submissions' && <SubmissionsTab />}
        {tab === 'chats' && <ChatsTab />}
        {tab === 'ai' && <AITab />}
      </div>
    </div>
  )
}

/* ============ OVERVIEW TAB ============ */
function OverviewTab({ onNavigate }: { onNavigate: (t: Tab) => void }) {
  const [stats, setStats] = React.useState({ submissions: 0, chats: 0, newSubs: 0, newChats: 0 })

  React.useEffect(() => {
    Promise.all([
      fetch('/api/admin/submissions').then((r) => r.json()),
      fetch('/api/admin/conversations').then((r) => r.json()),
    ]).then(([subs, convs]) => {
      setStats({
        submissions: subs.submissions?.length || 0,
        chats: convs.conversations?.length || 0,
        newSubs: subs.submissions?.filter((s: Submission) => s.status === 'new').length || 0,
        newChats: convs.conversations?.filter((c: Conversation) => c.status === 'new').length || 0,
      })
    }).catch(() => {})
  }, [])

  const cards = [
    { label: 'Form Submissions', value: stats.submissions, sub: `${stats.newSubs} new`, icon: Mail, accent: 'from-orange-500 to-pink-500', tab: 'submissions' as Tab },
    { label: 'Chat Conversations', value: stats.chats, sub: `${stats.newChats} new`, icon: MessageSquare, accent: 'from-fuchsia-500 to-rose-500', tab: 'chats' as Tab },
    { label: 'AI Auto-Replies', value: 'Active', sub: '24/7', icon: Bot, accent: 'from-emerald-500 to-teal-500', tab: 'ai' as Tab },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">Welcome back, Preet 👋</h2>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with your studio today.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.label}
              onClick={() => onNavigate(card.tab)}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={cn('pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity group-hover:opacity-20', card.accent)} />
              <span className={cn('grid size-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md', card.accent)}>
                <Icon className="size-5" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold">{card.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-0.5 text-xs font-semibold" style={{ color: 'var(--brand-pink)' }}>{card.sub}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ============ SUBMISSIONS TAB ============ */
function SubmissionsTab() {
  const [submissions, setSubmissions] = React.useState<Submission[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selected, setSelected] = React.useState<Submission | null>(null)
  const [filter, setFilter] = React.useState('all')
  const [search, setSearch] = React.useState('')

  const fetchSubs = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/submissions?status=${filter}`)
      const data = await res.json()
      setSubmissions(data.submissions || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [filter])

  React.useEffect(() => { fetchSubs() }, [fetchSubs])

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    if (selected?.id === id) setSelected((s) => (s ? { ...s, status } : s))
  }

  const filtered = submissions.filter((s) => {
    if (search) {
      const q = search.toLowerCase()
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.message.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="grid gap-0 lg:grid-cols-[420px_1fr]">
      {/* List */}
      <div className="border-r border-border/60">
        <div className="space-y-3 border-b border-border/60 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search submissions…" className="rounded-full bg-muted/30 pl-9" />
          </div>
          <div className="flex gap-1.5">
            {['all', 'new', 'read', 'replied', 'archived'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={cn('rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors', filter === f ? 'bg-brand-gradient text-white' : 'bg-muted/40 text-muted-foreground hover:text-foreground')}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto lg:max-h-[calc(100vh-280px)]">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Mail className="size-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">No submissions found.</p>
            </div>
          ) : (
            filtered.map((sub) => (
              <button key={sub.id} onClick={() => { setSelected(sub); if (sub.status === 'new') updateStatus(sub.id, 'read') }} className={cn('flex w-full flex-col gap-1 border-b border-border/40 p-4 text-left transition-colors hover:bg-muted/30', selected?.id === sub.id && 'bg-brand-gradient-soft')}>
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-semibold">{sub.name}</p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(sub.createdAt)}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{sub.email}</p>
                <p className="truncate text-xs text-muted-foreground/70">{sub.message}</p>
                <div className="mt-1 flex items-center gap-2">
                  {sub.service && <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">{sub.service}</span>}
                  <span className={cn('rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase', sub.status === 'new' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : sub.status === 'replied' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground')}>{sub.status}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="p-4 lg:p-6">
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{timeAgo(selected.createdAt)}</p>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="ghost" onClick={() => updateStatus(selected.id, 'replied')} className="rounded-full text-xs"><CheckCheck className="size-3.5" />Mark replied</Button>
                <Button size="sm" variant="ghost" onClick={() => updateStatus(selected.id, 'archived')} className="rounded-full text-xs"><Archive className="size-3.5" />Archive</Button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailRow icon={Mail} label="Email" value={selected.email} />
              <DetailRow icon={Building2} label="Company" value={selected.company || '—'} />
              <DetailRow icon={BotIcon} label="Service" value={selected.service || '—'} />
              <DetailRow icon={DollarSign} label="Budget" value={selected.budget || '—'} />
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</p>
              <p className="text-sm leading-relaxed">{selected.message}</p>
            </div>
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}?subject=Re: Your project inquiry&body=Hi ${selected.name},%0D%0A%0D%0AThanks for reaching out to Preet Web Vision! %0D%0A%0D%0A`}>
                <Button className="rounded-full bg-brand-gradient text-white">
                  <Send className="size-4" />Reply via email
                </Button>
              </a>
              <Button variant="outline" className="rounded-full" onClick={() => updateStatus(selected.id, 'replied')}>
                Mark as replied
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-muted/40"><Mail className="size-8 text-muted-foreground/40" /></span>
            <p className="mt-4 font-display text-lg font-bold">Select a submission</p>
            <p className="mt-1 text-sm text-muted-foreground">Choose a form submission from the list to view details.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted/40"><Icon className="size-4 text-muted-foreground" /></span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

/* ============ CHATS TAB ============ */
function ChatsTab() {
  const [conversations, setConversations] = React.useState<Conversation[]>([])
  const [selected, setSelected] = React.useState<Conversation | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [reply, setReply] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [loadingMsgs, setLoadingMsgs] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const fetchConvs = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/conversations')
      const data = await res.json()
      setConversations(data.conversations || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [])

  React.useEffect(() => {
    fetchConvs()
    const id = setInterval(fetchConvs, 30000)
    return () => clearInterval(id)
  }, [fetchConvs])

  const selectConv = async (conv: Conversation) => {
    setSelected(conv)
    setLoadingMsgs(true)
    setMessages([])
    try {
      const res = await fetch(`/api/chat/reply?id=${conv.id}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch { /* ignore */ } finally { setLoadingMsgs(false) }
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
        fetchConvs()
      }
    } catch { /* ignore */ } finally { setSending(false) }
  }

  const toggleMode = async (conv: Conversation) => {
    const newMode = conv.mode === 'ai' ? 'human' : 'ai'
    await fetch('/api/admin/conversations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conv.id, mode: newMode }),
    })
    setConversations((prev) => prev.map((c) => (c.id === conv.id ? { ...c, mode: newMode } : c)))
    if (selected?.id === conv.id) setSelected((s) => (s ? { ...s, mode: newMode } : s))
  }

  const updateStatus = async (conv: Conversation, status: string) => {
    await fetch('/api/admin/conversations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conv.id, status }),
    })
    setConversations((prev) => prev.map((c) => (c.id === conv.id ? { ...c, status } : c)))
    if (selected?.id === conv.id) setSelected((s) => (s ? { ...s, status } : s))
  }

  return (
    <div className="grid gap-0 lg:grid-cols-[380px_1fr]">
      {/* Conversation list */}
      <div className="border-r border-border/60">
        <div className="flex items-center justify-between border-b border-border/60 p-4">
          <p className="text-sm font-semibold">{conversations.length} conversations</p>
          <Button size="sm" variant="ghost" onClick={fetchConvs} className="rounded-full text-xs"><RefreshCw className="size-3.5" />Refresh</Button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto lg:max-h-[calc(100vh-280px)]">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <MessageSquare className="size-8 text-muted-foreground/40" />
              <p className="mt-2 text-sm text-muted-foreground">No conversations yet.</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button key={conv.id} onClick={() => selectConv(conv)} className={cn('flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-colors hover:bg-muted/30', selected?.id === conv.id && 'bg-brand-gradient-soft')}>
                <span className={cn('grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white', conv.mode === 'human' ? 'bg-amber-500' : 'bg-brand-gradient')}>
                  {conv.email ? conv.email[0].toUpperCase() : '?'}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{conv.email || 'Anonymous'}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(conv.updatedAt)}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{conv.lastRole === 'user' ? '👤 ' : '🤖 '}{conv.lastMessage || 'No messages'}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={cn('rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase', conv.mode === 'human' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400')}>
                      {conv.mode === 'human' ? '👤 Human' : '🤖 AI'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{conv.messageCount} msgs</span>
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
            <div className="flex items-center justify-between border-b border-border/60 p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-gradient text-white">{selected.email ? selected.email[0].toUpperCase() : '?'}</span>
                <div>
                  <p className="font-display text-sm font-bold">{selected.email || 'Anonymous'}</p>
                  <p className="text-xs text-muted-foreground">{selected.messageCount} messages · {timeAgo(selected.createdAt)}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant={selected.mode === 'ai' ? 'outline' : 'default'} onClick={() => toggleMode(selected)} className={cn('rounded-full text-xs', selected.mode === 'human' && 'bg-amber-500 text-white hover:bg-amber-600')}>
                  {selected.mode === 'ai' ? <><UserCog className="size-3.5" />Take over</> : <><BotIcon className="size-3.5" />Hand to AI</>}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => updateStatus(selected, 'archived')} className="rounded-full text-xs"><Archive className="size-3.5" /></Button>
              </div>
            </div>

            {selected.mode === 'human' && (
              <div className="flex items-center gap-2 border-b border-amber-500/20 bg-amber-500/5 px-4 py-2 text-xs text-amber-600 dark:text-amber-400">
                <UserCog className="size-3.5" />
                You've taken over this conversation. The AI will not auto-reply. Your messages will appear to the visitor.
              </div>
            )}

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {loadingMsgs ? (
                <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-start' : 'justify-end')}>
                    {msg.role === 'user' && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs">👤</span>}
                    <div className={cn('max-w-[75%] rounded-2xl px-4 py-2.5 text-sm', msg.role === 'user' ? 'rounded-bl-sm bg-muted/60' : 'rounded-br-sm bg-brand-gradient text-white')}>
                      <p className="leading-relaxed">{msg.content}</p>
                      <p className={cn('mt-1 text-[10px]', msg.role === 'user' ? 'text-muted-foreground' : 'text-white/60')}>{timeAgo(msg.createdAt)}</p>
                    </div>
                    {msg.role === 'assistant' && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs">🤖</span>}
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border/60 p-4">
              <form onSubmit={(e) => { e.preventDefault(); sendReply() }} className="flex items-center gap-2">
                <Input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply to the client…" className="rounded-full bg-muted/30" disabled={sending} />
                <Button type="submit" disabled={sending || !reply.trim()} className="shrink-0 rounded-full bg-brand-gradient text-white">
                  {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                </Button>
              </form>
              <p className="mt-2 text-[11px] text-muted-foreground">Your reply appears instantly to the visitor in the chat widget.</p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="grid size-16 place-items-center rounded-full bg-muted/40"><MessageSquare className="size-8 text-muted-foreground/40" /></span>
            <p className="mt-4 font-display text-lg font-bold">Select a conversation</p>
            <p className="mt-1 text-sm text-muted-foreground">View messages, reply to clients, or take over from the AI.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ============ AI MANAGEMENT TAB ============ */
function AITab() {
  const [conversations, setConversations] = React.useState<Conversation[]>([])

  React.useEffect(() => {
    fetch('/api/admin/conversations').then((r) => r.json()).then((d) => setConversations(d.conversations || [])).catch(() => {})
  }, [])

  const aiCount = conversations.filter((c) => c.mode === 'ai').length
  const humanCount = conversations.filter((c) => c.mode === 'human').length

  const toggleMode = async (conv: Conversation) => {
    const newMode = conv.mode === 'ai' ? 'human' : 'ai'
    await fetch('/api/admin/conversations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: conv.id, mode: newMode }),
    })
    setConversations((prev) => prev.map((c) => (c.id === conv.id ? { ...c, mode: newMode } : c)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">AI Management</h2>
        <p className="mt-1 text-sm text-muted-foreground">Control how the AI assistant handles client conversations. Take over anytime to reply personally.</p>
      </div>

      {/* AI status cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><BotIcon className="size-5" /></span>
            <div>
              <p className="font-display text-2xl font-bold">{aiCount}</p>
              <p className="text-xs text-muted-foreground">AI auto-replying</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400"><UserCog className="size-5" /></span>
            <div>
              <p className="font-display text-2xl font-bold">{humanCount}</p>
              <p className="text-xs text-muted-foreground">Human-managed</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient text-white"><Bot className="size-5" /></span>
            <div>
              <p className="font-display text-sm font-bold">Vision AI</p>
              <p className="text-xs text-muted-foreground">Active · 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <h3 className="font-display text-lg font-bold">How AI handover works</h3>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">1</span>
            <p>By default, all new conversations are handled by <strong className="text-foreground">Vision AI</strong> — it answers questions about services, pricing, and process automatically.</p>
          </div>
          <div className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">2</span>
            <p>When you want to step in, click <strong className="text-foreground">"Take over"</strong> on any conversation. The AI stops auto-replying, and the visitor is told a team member will respond.</p>
          </div>
          <div className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">3</span>
            <p>Your replies appear instantly in the visitor's chat widget. When you're done, click <strong className="text-foreground">"Hand to AI"</strong> to let the assistant take over again.</p>
          </div>
        </div>
      </div>

      {/* Conversation mode management */}
      <div className="rounded-2xl border border-border/60 bg-card">
        <div className="border-b border-border/60 p-4">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Active conversations</h3>
        </div>
        <div className="divide-y divide-border/40">
          {conversations.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">No conversations yet.</p>
          ) : (
            conversations.slice(0, 10).map((conv) => (
              <div key={conv.id} className="flex items-center justify-between p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{conv.email || 'Anonymous visitor'}</p>
                  <p className="truncate text-xs text-muted-foreground">{conv.lastMessage || 'No messages'}</p>
                </div>
                <Button
                  size="sm"
                  variant={conv.mode === 'ai' ? 'outline' : 'default'}
                  onClick={() => toggleMode(conv)}
                  className={cn('ml-3 shrink-0 rounded-full text-xs', conv.mode === 'human' && 'bg-amber-500 text-white hover:bg-amber-600')}
                >
                  {conv.mode === 'ai' ? <><UserCog className="size-3.5" />Take over</> : <><BotIcon className="size-3.5" />Hand to AI</>}
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
