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
  Settings,
  Bell,
  X,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// Icons used across tabs
import { Save, BookOpen } from 'lucide-react'

type Tab = 'overview' | 'submissions' | 'chats' | 'ai' | 'affiliates' | 'seo' | 'blog'

/* ============ Notification Bell ============ */
function NotificationBell() {
  const [open, setOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<Array<{ id: string; type: string; title: string; message: string; read: boolean; createdAt: string }>>([])
  const [unread, setUnread] = React.useState(0)
  const ref = React.useRef<HTMLDivElement>(null)

  const fetchNotifs = React.useCallback(async () => {
    try {
      const res = await fetch('/api/admin/notifications')
      const data = await res.json()
      setNotifications(data.notifications || [])
      setUnread(data.unreadCount || 0)
    } catch { /* ignore */ }
  }, [])

  React.useEffect(() => {
    fetchNotifs()
    const id = setInterval(fetchNotifs, 15000)
    return () => clearInterval(id)
  }, [fetchNotifs])

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const markAllRead = async () => {
    await fetch('/api/admin/notifications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ markAllRead: true }) })
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnread(0)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid size-9 place-items-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid min-w-[18px] h-[18px] place-items-center rounded-full bg-brand-gradient px-1 text-[10px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 p-3">
              <p className="text-sm font-bold">Notifications</p>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs font-semibold text-[var(--brand-pink)] hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">No notifications yet.</p>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <a key={n.id} href={n.link || '/admin/dashboard'} className={cn('block border-b border-border/40 p-3 transition-colors hover:bg-muted/30', !n.read && 'bg-brand-gradient-soft')}>
                    <div className="flex items-start gap-2">
                      <span className={cn('mt-1 size-2 shrink-0 rounded-full', n.read ? 'bg-muted-foreground/30' : 'bg-[var(--brand-pink)]')} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{n.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{n.message}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{timeAgo(n.createdAt)}</p>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
          <div className="flex items-center gap-2">
            <a href="/admin/settings">
              <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">
                <Settings className="size-4" />
                Settings
              </Button>
            </a>
            <NotificationBell />
            <Button variant="ghost" size="sm" onClick={logout} className="rounded-full text-muted-foreground hover:text-foreground">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
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
            { id: 'affiliates', label: 'Affiliates', icon: ExternalLink },
            { id: 'seo', label: 'SEO Settings', icon: Search },
            { id: 'blog', label: 'Blog Posts', icon: BookOpen },
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
        {tab === 'affiliates' && <AffiliatesTab />}
        {tab === 'seo' && <SeoTab />}
        {tab === 'blog' && <BlogTab />}
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

/* ============ AFFILIATES TAB ============ */
type AffiliateRow = {
  id: string
  title: string
  description: string | null
  price: string | null
  imageUrl: string | null
  affiliateUrl: string
  category: string | null
  featured: boolean
  order: number
  active: boolean
  createdAt: string
}

function AffiliatesTab() {
  const [affiliates, setAffiliates] = React.useState<AffiliateRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<AffiliateRow | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const fetchAffiliates = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/affiliates')
      const data = await res.json()
      setAffiliates(data.affiliates || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { fetchAffiliates() }, [fetchAffiliates])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this affiliate?')) return
    await fetch('/api/admin/affiliates', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setAffiliates((prev) => prev.filter((a) => a.id !== id))
  }

  const handleToggleActive = async (a: AffiliateRow) => {
    await fetch('/api/admin/affiliates', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: a.id, active: !a.active }),
    })
    setAffiliates((prev) => prev.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))
  }

  const handleToggleFeatured = async (a: AffiliateRow) => {
    await fetch('/api/admin/affiliates', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: a.id, featured: !a.featured }),
    })
    setAffiliates((prev) => prev.map((x) => (x.id === a.id ? { ...x, featured: !x.featured } : x)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Affiliates</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage the affiliate boxes shown on the pricing page.</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true) }} className="rounded-full bg-brand-gradient text-white">
          <ExternalLink className="size-4" />
          Add affiliate
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <AffiliateForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); setEditing(null); fetchAffiliates() }}
        />
      )}

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
      ) : affiliates.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <ExternalLink className="size-10 text-muted-foreground/40" />
          <p className="mt-3 font-display text-lg font-bold">No affiliates yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add your first affiliate link to display it on the pricing page.</p>
          <Button onClick={() => { setEditing(null); setShowForm(true) }} className="mt-4 rounded-full bg-brand-gradient text-white">
            Add affiliate
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
          <div className="divide-y divide-border/40">
            {affiliates.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-4">
                <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-muted/40">
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.title} className="size-full object-cover" />
                  ) : (
                    <ExternalLink className="size-5 text-muted-foreground/50" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-display text-sm font-bold">{a.title}</p>
                    {a.featured && (
                      <span className="rounded-full bg-brand-gradient px-2 py-0.5 text-[9px] font-bold uppercase text-white">Featured</span>
                    )}
                    {!a.active && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold uppercase text-muted-foreground">Hidden</span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{a.affiliateUrl}</p>
                  {a.price && <p className="text-xs font-semibold text-gradient-brand">{a.price}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Button size="sm" variant="ghost" onClick={() => handleToggleFeatured(a)} className="rounded-full text-xs">
                    {a.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleToggleActive(a)} className="rounded-full text-xs">
                    {a.active ? 'Hide' : 'Show'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(a); setShowForm(true) }} className="rounded-full text-xs">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(a.id)} className="rounded-full text-xs text-red-500 hover:text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AffiliateForm({ initial, onClose, onSaved }: { initial: AffiliateRow | null; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = React.useState(initial?.title || '')
  const [description, setDescription] = React.useState(initial?.description || '')
  const [price, setPrice] = React.useState(initial?.price || '')
  const [imageUrl, setImageUrl] = React.useState(initial?.imageUrl || '')
  const [affiliateUrl, setAffiliateUrl] = React.useState(initial?.affiliateUrl || '')
  const [category, setCategory] = React.useState(initial?.category || '')
  const [featured, setFeatured] = React.useState(initial?.featured || false)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !affiliateUrl.trim()) {
      setError('Title and affiliate URL are required.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/affiliates', {
        method: initial ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(initial ? { id: initial.id } : {}),
          title: title.trim(),
          description: description.trim() || null,
          price: price.trim() || null,
          imageUrl: imageUrl.trim() || null,
          affiliateUrl: affiliateUrl.trim(),
          category: category.trim() || null,
          featured,
        }),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Failed to save')
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">{initial ? 'Edit affiliate' : 'Add new affiliate'}</h3>
        <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Title *</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Hostinger Web Hosting" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Affiliate URL *</label>
          <Input value={affiliateUrl} onChange={(e) => setAffiliateUrl(e.target.value)} placeholder="https://affiliate.example.com/ref=you" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price</label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. $2.99/mo" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Hosting, AI, SEO" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image URL</label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/logo.png" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the tool/service…"
            rows={3}
            className="w-full rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--brand-pink)]"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="size-4 accent-[var(--brand-pink)]" />
          Featured
        </label>
      </div>
      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      <div className="mt-5 flex gap-2">
        <Button type="submit" disabled={saving} className="rounded-full bg-brand-gradient text-white">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
          {initial ? 'Save changes' : 'Add affiliate'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
          Cancel
        </Button>
      </div>
    </form>
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

/* ============ SEO SETTINGS TAB ============ */
import { Textarea } from '@/components/ui/textarea'

function SeoTab() {
  const [settings, setSettings] = React.useState<Record<string, string>>({})
  const [loaded, setLoaded] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    fetch('/api/admin/seo')
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setSettings(data.settings)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const save = async (updates: Record<string, string>) => {
    setSaving(true)
    try {
      await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      setSettings((prev) => ({ ...prev, ...updates }))
      toast.success('SEO settings saved!')
    } catch {
      toast.error('Failed to save SEO settings')
    } finally {
      setSaving(false)
    }
  }

  if (!loaded) {
    return <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">SEO Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">Manage site-wide SEO, sitemap, robots.txt, schema.org, and social metadata.</p>
      </div>

      {/* General SEO */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">General SEO</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold">Site Name</label>
            <Input value={settings.site_name || ''} onChange={(e) => setSettings((s) => ({ ...s, site_name: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Canonical URL</label>
            <Input value={settings.canonical_url || ''} onChange={(e) => setSettings((s) => ({ ...s, canonical_url: e.target.value }))} className="bg-muted/30" placeholder="https://preetwebvision.com" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Site Title (meta title)</label>
          <Input value={settings.site_title || ''} onChange={(e) => setSettings((s) => ({ ...s, site_title: e.target.value }))} className="bg-muted/30" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Meta Description</label>
          <Textarea value={settings.site_description || ''} onChange={(e) => setSettings((s) => ({ ...s, site_description: e.target.value }))} rows={2} className="bg-muted/30" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Keywords (comma-separated)</label>
          <Input value={settings.site_keywords || ''} onChange={(e) => setSettings((s) => ({ ...s, site_keywords: e.target.value }))} className="bg-muted/30" />
        </div>
      </div>

      {/* Open Graph / Social */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Open Graph & Social</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold">OG Image URL</label>
            <Input value={settings.og_image_url || ''} onChange={(e) => setSettings((s) => ({ ...s, og_image_url: e.target.value }))} className="bg-muted/30" placeholder="/og-image.png" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Twitter Handle</label>
            <Input value={settings.twitter_handle || ''} onChange={(e) => setSettings((s) => ({ ...s, twitter_handle: e.target.value }))} className="bg-muted/30" placeholder="@preetwebvision" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold">Google Analytics ID</label>
            <Input value={settings.google_analytics_id || ''} onChange={(e) => setSettings((s) => ({ ...s, google_analytics_id: e.target.value }))} className="bg-muted/30" placeholder="G-XXXXXXXXXX" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Google Search Console (verification code)</label>
            <Input value={settings.google_search_console || ''} onChange={(e) => setSettings((s) => ({ ...s, google_search_console: e.target.value }))} className="bg-muted/30" placeholder="google-site-verification code" />
          </div>
        </div>
      </div>

      {/* Schema.org */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Schema.org Structured Data</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold">Organization Name</label>
            <Input value={settings.schema_organization_name || ''} onChange={(e) => setSettings((s) => ({ ...s, schema_organization_name: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Organization URL</label>
            <Input value={settings.schema_organization_url || ''} onChange={(e) => setSettings((s) => ({ ...s, schema_organization_url: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Logo URL</label>
            <Input value={settings.schema_organization_logo || ''} onChange={(e) => setSettings((s) => ({ ...s, schema_organization_logo: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Email</label>
            <Input value={settings.schema_organization_email || ''} onChange={(e) => setSettings((s) => ({ ...s, schema_organization_email: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Phone</label>
            <Input value={settings.schema_organization_phone || ''} onChange={(e) => setSettings((s) => ({ ...s, schema_organization_phone: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Address</label>
            <Input value={settings.schema_organization_address || ''} onChange={(e) => setSettings((s) => ({ ...s, schema_organization_address: e.target.value }))} className="bg-muted/30" />
          </div>
        </div>
      </div>

      {/* Sitemap Settings */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Sitemap Configuration</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold">Home Priority (0.0–1.0)</label>
            <Input value={settings.sitemap_priority_home || '1.0'} onChange={(e) => setSettings((s) => ({ ...s, sitemap_priority_home: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Services Priority</label>
            <Input value={settings.sitemap_priority_services || '0.9'} onChange={(e) => setSettings((s) => ({ ...s, sitemap_priority_services: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Blog Priority</label>
            <Input value={settings.sitemap_priority_blog || '0.8'} onChange={(e) => setSettings((s) => ({ ...s, sitemap_priority_blog: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Other Pages Priority</label>
            <Input value={settings.sitemap_priority_other || '0.6'} onChange={(e) => setSettings((s) => ({ ...s, sitemap_priority_other: e.target.value }))} className="bg-muted/30" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Home Change Freq</label>
            <select value={settings.sitemap_changefreq_home || 'weekly'} onChange={(e) => setSettings((s) => ({ ...s, sitemap_changefreq_home: e.target.value }))} className="h-9 w-full rounded-md border border-border bg-muted/30 px-3 text-sm">
              <option value="always">always</option><option value="hourly">hourly</option><option value="daily">daily</option><option value="weekly">weekly</option><option value="monthly">monthly</option><option value="yearly">yearly</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Blog Change Freq</label>
            <select value={settings.sitemap_changefreq_blog || 'weekly'} onChange={(e) => setSettings((s) => ({ ...s, sitemap_changefreq_blog: e.target.value }))} className="h-9 w-full rounded-md border border-border bg-muted/30 px-3 text-sm">
              <option value="daily">daily</option><option value="weekly">weekly</option><option value="monthly">monthly</option>
            </select>
          </div>
        </div>
        <a href="/sitemap.xml" target="_blank" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-pink)] hover:underline">
          View sitemap.xml <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Robots.txt Settings */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Robots.txt Configuration</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.robots_allow_all !== 'false'} onChange={(e) => setSettings((s) => ({ ...s, robots_allow_all: String(e.target.checked) }))} className="size-4 rounded" />
            Allow all crawlers to index the site
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.robots_disallow_admin !== 'false'} onChange={(e) => setSettings((s) => ({ ...s, robots_disallow_admin: String(e.target.checked) }))} className="size-4 rounded" />
            Disallow /admin (block admin pages from indexing)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={settings.robots_disallow_api !== 'false'} onChange={(e) => setSettings((s) => ({ ...s, robots_disallow_api: String(e.target.checked) }))} className="size-4 rounded" />
            Disallow /api (block API routes from indexing)
          </label>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Sitemap URL in robots.txt</label>
          <Input value={settings.robots_sitemap_url || ''} onChange={(e) => setSettings((s) => ({ ...s, robots_sitemap_url: e.target.value }))} className="bg-muted/30" />
        </div>
        <a href="/robots.txt" target="_blank" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-pink)] hover:underline">
          View robots.txt <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">Social Links (for schema.org)</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1 block text-xs font-semibold">YouTube</label><Input value={settings.social_youtube || ''} onChange={(e) => setSettings((s) => ({ ...s, social_youtube: e.target.value }))} className="bg-muted/30" /></div>
          <div><label className="mb-1 block text-xs font-semibold">LinkedIn</label><Input value={settings.social_linkedin || ''} onChange={(e) => setSettings((s) => ({ ...s, social_linkedin: e.target.value }))} className="bg-muted/30" /></div>
          <div><label className="mb-1 block text-xs font-semibold">Twitter</label><Input value={settings.social_twitter || ''} onChange={(e) => setSettings((s) => ({ ...s, social_twitter: e.target.value }))} className="bg-muted/30" /></div>
          <div><label className="mb-1 block text-xs font-semibold">Instagram</label><Input value={settings.social_instagram || ''} onChange={(e) => setSettings((s) => ({ ...s, social_instagram: e.target.value }))} className="bg-muted/30" /></div>
          <div><label className="mb-1 block text-xs font-semibold">GitHub</label><Input value={settings.social_github || ''} onChange={(e) => setSettings((s) => ({ ...s, social_github: e.target.value }))} className="bg-muted/30" /></div>
        </div>
      </div>

      <Button onClick={() => save(settings)} disabled={saving} className="rounded-full bg-brand-gradient text-white">
        {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save All SEO Settings
      </Button>
    </div>
  )
}

/* ============ BLOG MANAGEMENT TAB ============ */
type BlogPostRow = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  authorRole: string
  authorInitials: string
  authorAccent: string
  imageUrl: string | null
  featured: boolean
  status: string
  createdAt: string
  updatedAt: string
}

function BlogTab() {
  const [posts, setPosts] = React.useState<BlogPostRow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState<BlogPostRow | null>(null)
  const [showForm, setShowForm] = React.useState(false)

  const fetchPosts = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/blog')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [])

  React.useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return
    await fetch('/api/admin/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setPosts((prev) => prev.filter((p) => p.id !== id))
    toast.success('Post deleted')
  }

  const handleToggleFeatured = async (post: BlogPostRow) => {
    await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, featured: !post.featured }),
    })
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, featured: !p.featured } : p)))
  }

  const handleToggleStatus = async (post: BlogPostRow) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, status: newStatus }),
    })
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Blog Posts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Create, edit, and publish blog articles. Changes appear instantly on the website.</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true) }} className="rounded-full bg-brand-gradient text-white">
          <BookOpen className="size-4" />
          New post
        </Button>
      </div>

      {showForm && (
        <BlogPostForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { setShowForm(false); setEditing(null); fetchPosts() }}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <BookOpen className="size-10 text-muted-foreground/40" />
          <p className="mt-3 font-display text-lg font-bold">No blog posts yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Write your first article to publish it on the blog.</p>
          <Button onClick={() => { setEditing(null); setShowForm(true) }} className="mt-4 rounded-full bg-brand-gradient text-white">
            Write first post
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="size-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold">{post.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{post.excerpt || 'No excerpt'}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button onClick={() => handleToggleFeatured(post)} className={cn('rounded-full px-2 py-1 text-[10px] font-bold uppercase', post.featured ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground')} title="Toggle featured">
                      ★
                    </button>
                    <button onClick={() => handleToggleStatus(post)} className={cn('rounded-full px-2 py-1 text-[10px] font-bold uppercase', post.status === 'published' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground')}>
                      {post.status}
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(post); setShowForm(true) }} className="rounded-full text-xs">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(post.id)} className="rounded-full text-xs text-destructive hover:text-destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ============ BLOG POST FORM ============ */
function BlogPostForm({ initial, onClose, onSaved }: { initial: BlogPostRow | null; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = React.useState(initial?.title || '')
  const [slug, setSlug] = React.useState(initial?.slug || '')
  const [excerpt, setExcerpt] = React.useState(initial?.excerpt || '')
  const [content, setContent] = React.useState(initial?.content || '[{"type":"p","text":""}]')
  const [category, setCategory] = React.useState(initial?.category || 'Web Design')
  const [author, setAuthor] = React.useState(initial?.author || 'Preet Kaur')
  const [authorRole, setAuthorRole] = React.useState(initial?.authorRole || 'Founder & Creative Director')
  const [authorInitials, setAuthorInitials] = React.useState(initial?.authorInitials || 'PK')
  const [authorAccent, setAuthorAccent] = React.useState(initial?.authorAccent || 'from-orange-500 to-pink-500')
  const [imageUrl, setImageUrl] = React.useState(initial?.imageUrl || '')
  const [featured, setFeatured] = React.useState(initial?.featured || false)
  const [status, setStatus] = React.useState(initial?.status || 'published')
  const [saving, setSaving] = React.useState(false)
  const [contentType, setContentType] = React.useState<'json' | 'plain'>('json')

  // Parse content for editing
  React.useEffect(() => {
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) {
        setContentType('json')
      }
    } catch {
      setContentType('plain')
    }
  }, [])

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!initial) setSlug(generateSlug(val))
  }

  const save = async () => {
    if (!title || !slug) {
      toast.error('Title and slug are required')
      return
    }
    setSaving(true)
    try {
      const method = initial ? 'PUT' : 'POST'
      const body = { id: initial?.id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status }
      const res = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Save failed')
      toast.success(initial ? 'Post updated!' : 'Post created!')
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const parseContentToPlainText = () => {
    try {
      const blocks = JSON.parse(content)
      return blocks.map((b: { text?: string }) => b.text || '').join('\n\n')
    } catch {
      return content
    }
  }

  const plainToContent = (plain: string) => {
    const paragraphs = plain.split(/\n\n+/).filter(Boolean)
    const blocks = paragraphs.map((text) => ({ type: 'p', text: text.trim() }))
    return JSON.stringify(blocks)
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">{initial ? 'Edit Post' : 'New Blog Post'}</h3>
        <Button size="sm" variant="ghost" onClick={onClose} className="rounded-full">✕</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold">Title *</label>
          <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} className="bg-muted/30" placeholder="How to scale your ecommerce store..." />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Slug *</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-muted/30 font-mono text-xs" placeholder="how-to-scale-ecommerce" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold">Excerpt (summary shown in card)</label>
        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="bg-muted/30" placeholder="A short summary of the article..." />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-xs font-semibold">Content</label>
          <div className="flex gap-1">
            <button onClick={() => { setContent(plainToContent(parseContentToPlainText())); setContentType('plain') }} className={cn('rounded px-2 py-0.5 text-[10px] font-bold', contentType === 'plain' ? 'bg-brand-gradient text-white' : 'bg-muted text-muted-foreground')}>
              Plain text
            </button>
            <button onClick={() => setContentType('json')} className={cn('rounded px-2 py-0.5 text-[10px] font-bold', contentType === 'json' ? 'bg-brand-gradient text-white' : 'bg-muted text-muted-foreground')}>
              JSON blocks
            </button>
          </div>
        </div>
        {contentType === 'plain' ? (
          <Textarea
            value={parseContentToPlainText()}
            onChange={(e) => setContent(plainToContent(e.target.value))}
            rows={10}
            className="bg-muted/30 font-mono text-xs"
            placeholder="Write your article here. Separate paragraphs with a blank line."
          />
        ) : (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="bg-muted/30 font-mono text-xs"
            placeholder='[{"type":"p","text":"Your paragraph"},{"type":"h2","text":"Heading"},{"type":"ul","items":["Item 1","Item 2"]}]'
          />
        )}
        <p className="mt-1 text-[10px] text-muted-foreground">
          {contentType === 'plain' ? 'Separate paragraphs with blank lines. Each becomes a <p> block.' : 'JSON array of content blocks: {type, text} or {type:"ul", items:[]}'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-9 w-full rounded-md border border-border bg-muted/30 px-3 text-sm">
            <option>Web Design</option><option>AI</option><option>SEO</option><option>Ecommerce</option><option>Growth</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Image URL</label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="bg-muted/30" placeholder="/blog/b1.png" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 w-full rounded-md border border-border bg-muted/30 px-3 text-sm">
            <option value="published">Published</option><option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-semibold">Author</label>
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-muted/30" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Author Role</label>
          <Input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} className="bg-muted/30" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Initials</label>
          <Input value={authorInitials} onChange={(e) => setAuthorInitials(e.target.value)} className="bg-muted/30" maxLength={3} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold">Accent (tailwind)</label>
          <Input value={authorAccent} onChange={(e) => setAuthorAccent(e.target.value)} className="bg-muted/30 text-xs" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="size-4 rounded" />
        Featured post (shown as the large highlighted card)
      </label>

      <div className="flex gap-2">
        <Button onClick={save} disabled={saving} className="rounded-full bg-brand-gradient text-white">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {initial ? 'Update post' : 'Create post'}
        </Button>
        <Button variant="outline" onClick={onClose} className="rounded-full">Cancel</Button>
      </div>
    </div>
  )
}
