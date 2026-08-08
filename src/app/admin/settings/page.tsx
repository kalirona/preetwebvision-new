'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Lock,
  Phone,
  Mail,
  Bell,
  Save,
  Loader2,
  Check,
  ArrowLeft,
  RotateCcw,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type Tab = 'ai' | 'password' | 'site' | 'notifications' | 'export'

export default function AdminSettingsPage() {
  const [tab, setTab] = React.useState<Tab>('ai')
  const [authChecked, setAuthChecked] = React.useState(false)
  const [settings, setSettings] = React.useState<Record<string, string>>({})
  const [saving, setSaving] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    fetch('/api/admin/auth')
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          window.location.href = '/admin'
          return
        }
        setAuthChecked(true)
        return fetch('/api/admin/settings')
      })
      .then((r) => r?.json())
      .then((data) => {
        if (data?.ok) {
          setSettings(data.settings)
        }
        setLoaded(true)
      })
      .catch(() => { window.location.href = '/admin' })
  }, [])

  const save = async (updates: Record<string, string>) => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || 'Save failed')
      setSettings((prev) => ({ ...prev, ...updates }))
      toast.success('Settings saved!', { description: 'Changes are now live.' })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (!authChecked || !loaded) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
  }

  const tabs = [
    { id: 'ai' as Tab, label: 'AI Assistant', icon: Bot },
    { id: 'password' as Tab, label: 'Password', icon: Lock },
    { id: 'site' as Tab, label: 'Site Info', icon: Phone },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell },
    { id: 'export' as Tab, label: 'Export Data', icon: Download },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/admin/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Dashboard
            </a>
            <span className="text-border">|</span>
            <h1 className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid size-7 place-items-center rounded-lg bg-brand-gradient text-white"><Lock className="size-4" /></span>
              Settings
            </h1>
          </div>
        </div>
      </header>

      <div className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 sm:px-6">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={cn('flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors', tab === t.id ? 'border-[var(--brand-pink)] text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                <Icon className="size-4" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {tab === 'ai' && <AISettings settings={settings} onSave={save} saving={saving} />}
        {tab === 'password' && <PasswordSettings settings={settings} onSave={save} saving={saving} />}
        {tab === 'site' && <SiteSettings settings={settings} onSave={save} saving={saving} />}
        {tab === 'notifications' && <NotificationSettings settings={settings} onSave={save} saving={saving} />}
        {tab === 'export' && <ExportTab />}
      </div>
    </div>
  )
}

/* ============ AI SETTINGS ============ */
function AISettings({ settings, onSave, saving }: { settings: Record<string, string>; onSave: (u: Record<string, string>) => void; saving: boolean }) {
  const [prompt, setPrompt] = React.useState(settings.ai_system_prompt || '')
  const [greeting, setGreeting] = React.useState(settings.ai_greeting || '')
  const [suggestions, setSuggestions] = React.useState(() => {
    try { return JSON.parse(settings.ai_suggestions || '[]') as string[] } catch { return [] }
  })
  const [newSuggestion, setNewSuggestion] = React.useState('')

  const updateSuggestion = (i: number, value: string) => {
    setSuggestions((prev) => prev.map((s, idx) => (idx === i ? value : s)))
  }
  const removeSuggestion = (i: number) => {
    setSuggestions((prev) => prev.filter((_, idx) => idx !== i))
  }
  const addSuggestion = () => {
    if (newSuggestion.trim()) {
      setSuggestions((prev) => [...prev, newSuggestion.trim()])
      setNewSuggestion('')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">AI Assistant Configuration</h2>
        <p className="mt-1 text-sm text-muted-foreground">Customize how Vision AI behaves — the system prompt, greeting, and suggested questions. Changes are live instantly.</p>
      </div>

      {/* System Prompt */}
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <label className="mb-2 block text-sm font-bold">System Prompt</label>
        <p className="mb-3 text-xs text-muted-foreground">This is the instruction set the AI follows. Edit it to change personality, knowledge, or behavior.</p>
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={8} className="rounded-xl bg-muted/30 font-mono text-xs" />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{prompt.length} characters</span>
          <Button size="sm" variant="ghost" onClick={() => setPrompt(settings.ai_system_prompt || '')} className="text-xs">
            <RotateCcw className="size-3.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Greeting */}
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <label className="mb-2 block text-sm font-bold">Greeting Message</label>
        <p className="mb-3 text-xs text-muted-foreground">The first message visitors see when they open the chat.</p>
        <Textarea value={greeting} onChange={(e) => setGreeting(e.target.value)} rows={2} className="rounded-xl bg-muted/30" />
      </div>

      {/* Suggested Questions */}
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <label className="mb-2 block text-sm font-bold">Suggested Questions</label>
        <p className="mb-3 text-xs text-muted-foreground">Quick-start buttons shown to visitors. They click to send instantly.</p>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={s} onChange={(e) => updateSuggestion(i, e.target.value)} className="rounded-full bg-muted/30 text-sm" />
              <Button size="sm" variant="ghost" onClick={() => removeSuggestion(i)} className="rounded-full text-muted-foreground hover:text-destructive">✕</Button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input value={newSuggestion} onChange={(e) => setNewSuggestion(e.target.value)} placeholder="Add a new suggested question…" className="rounded-full bg-muted/30 text-sm" onKeyDown={(e) => e.key === 'Enter' && addSuggestion()} />
          <Button size="sm" variant="outline" onClick={addSuggestion} className="rounded-full shrink-0">Add</Button>
        </div>
      </div>

      <Button onClick={() => onSave({ ai_system_prompt: prompt, ai_greeting: greeting, ai_suggestions: JSON.stringify(suggestions) })} disabled={saving} className="rounded-full bg-brand-gradient text-white">
        {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save AI Settings
      </Button>
    </div>
  )
}

/* ============ PASSWORD SETTINGS ============ */
function PasswordSettings({ settings, onSave, saving }: { settings: Record<string, string>; onSave: (u: Record<string, string>) => void; saving: boolean }) {
  const [current, setCurrent] = React.useState('')
  const [newPw, setNewPw] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [localSaving, setLocalSaving] = React.useState(false)

  const change = async () => {
    if (current !== settings.admin_password) {
      toast.error('Current password is incorrect.')
      return
    }
    if (newPw.length < 6) {
      toast.error('New password must be at least 6 characters.')
      return
    }
    if (newPw !== confirm) {
      toast.error('Passwords do not match.')
      return
    }
    setLocalSaving(true)
    await onSave({ admin_password: newPw })
    setLocalSaving(false)
    setCurrent('')
    setNewPw('')
    setConfirm('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">Change Password</h2>
        <p className="mt-1 text-sm text-muted-foreground">Update your admin login password. Make it strong!</p>
      </div>
      <div className="max-w-md space-y-4 rounded-2xl border border-border/60 bg-card p-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current Password</label>
          <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className="rounded-xl bg-muted/30" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">New Password</label>
          <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="rounded-xl bg-muted/30" placeholder="Min 6 characters" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Confirm New Password</label>
          <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="rounded-xl bg-muted/30" />
        </div>
        <Button onClick={change} disabled={localSaving || saving || !current || !newPw || !confirm} className="rounded-full bg-brand-gradient text-white">
          {localSaving ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
          Update Password
        </Button>
      </div>
    </div>
  )
}

/* ============ SITE INFO SETTINGS ============ */
function SiteSettings({ settings, onSave, saving }: { settings: Record<string, string>; onSave: (u: Record<string, string>) => void; saving: boolean }) {
  const [contactEmail, setContactEmail] = React.useState(settings.contact_email || '')
  const [contactPhone, setContactPhone] = React.useState(settings.contact_phone || '')
  const [adminEmail, setAdminEmail] = React.useState(settings.admin_email || '')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">Site Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">Contact details shown across the website (footer, contact page, etc.)</p>
      </div>
      <div className="max-w-md space-y-4 rounded-2xl border border-border/60 bg-card p-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Public Contact Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="rounded-xl bg-muted/30 pl-9" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Public Contact Phone</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="rounded-xl bg-muted/30 pl-9" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Admin Notification Email</label>
          <p className="mb-1.5 text-xs text-muted-foreground">Where notification summaries are sent.</p>
          <Input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="rounded-xl bg-muted/30" />
        </div>
        <Button onClick={() => onSave({ contact_email: contactEmail, contact_phone: contactPhone, admin_email: adminEmail })} disabled={saving} className="rounded-full bg-brand-gradient text-white">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Site Info
        </Button>
      </div>
    </div>
  )
}

/* ============ NOTIFICATION SETTINGS ============ */
function NotificationSettings({ settings, onSave, saving }: { settings: Record<string, string>; onSave: (u: Record<string, string>) => void; saving: boolean }) {
  const [formNotif, setFormNotif] = React.useState(settings.notify_form_submission === 'true')
  const [chatNotif, setChatNotif] = React.useState(settings.notify_new_chat === 'true')
  const [humanReplyNotif, setHumanReplyNotif] = React.useState(settings.notify_human_reply === 'true')

  const toggles = [
    { key: 'notify_form_submission', label: 'New form submissions', desc: 'Get notified when someone submits the contact form.', value: formNotif, setter: setFormNotif },
    { key: 'notify_new_chat', label: 'New chat conversations', desc: 'Get notified when a visitor starts a new chat.', value: chatNotif, setter: setChatNotif },
    { key: 'notify_human_reply', label: 'Human-mode chat replies', desc: 'Get notified when a visitor replies in a conversation you\'ve taken over.', value: humanReplyNotif, setter: setHumanReplyNotif },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">Notification Preferences</h2>
        <p className="mt-1 text-sm text-muted-foreground">Choose which events trigger admin notifications. Notifications appear in the dashboard header bell icon.</p>
      </div>
      <div className="space-y-3">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-center justify-between rounded-2xl border border-border/60 bg-card p-4">
            <div className="flex-1">
              <p className="text-sm font-bold">{t.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
            </div>
            <button
              role="switch"
              aria-checked={t.value}
              onClick={() => t.setter(!t.value)}
              data-on={t.value}
              className="toggle-switch shrink-0"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={() => onSave({
          notify_form_submission: String(formNotif),
          notify_new_chat: String(chatNotif),
          notify_human_reply: String(humanReplyNotif),
        })}
        disabled={saving}
        className="rounded-full bg-brand-gradient text-white"
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Save Notification Preferences
      </Button>
    </div>
  )
}

/* ============ EXPORT TAB ============ */
function ExportTab() {
  const [exporting, setExporting] = React.useState<string | null>(null)

  const download = async (type: 'submissions' | 'chats') => {
    setExporting(type)
    try {
      const res = await fetch(`/api/admin/export?type=${type}`)
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${type}-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)
      toast.success(`${type === 'submissions' ? 'Form submissions' : 'Chat transcripts'} exported!`)
    } catch {
      toast.error('Export failed. Try again.')
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">Export Data</h2>
        <p className="mt-1 text-sm text-muted-foreground">Download your data as CSV files for backup or analysis.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient-soft text-[var(--brand-pink)]"><Mail className="size-5" /></span>
            <div>
              <p className="font-display text-sm font-bold">Form Submissions</p>
              <p className="text-xs text-muted-foreground">All contact form entries</p>
            </div>
          </div>
          <Button onClick={() => download('submissions')} disabled={exporting === 'submissions'} className="mt-4 w-full rounded-full bg-brand-gradient text-white">
            {exporting === 'submissions' ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Download CSV
          </Button>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient-soft text-[var(--brand-pink)]"><Bot className="size-5" /></span>
            <div>
              <p className="font-display text-sm font-bold">Chat Transcripts</p>
              <p className="text-xs text-muted-foreground">All AI chat conversations</p>
            </div>
          </div>
          <Button onClick={() => download('chats')} disabled={exporting === 'chats'} className="mt-4 w-full rounded-full bg-brand-gradient text-white">
            {exporting === 'chats' ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  )
}
