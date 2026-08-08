import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const DEFAULT_SYSTEM_PROMPT = `You are "Vision AI", the friendly, expert assistant for Preet Web Vision — a modern digital marketing agency. You live on their website as a live demo of the agency's AI automation capabilities.

About Preet Web Vision:
- A digital studio offering: Website Design & Development, AI Automations, Web App Development, SEO & Digital Growth, and Ecommerce Solutions.
- 180+ projects shipped, 98% client retention, 14x average ROI for clients, 40+ senior experts.
- Tech: Next.js, TypeScript, Tailwind, Prisma, OpenAI-grade LLMs, n8n/Zapier, Shopify, headless commerce.
- Process: Discover & Strategize → Design & Prototype → Build & Automate → Launch & Scale.
- Pricing tiers: Launch ($2.4k/project), Growth ($6.9k/project, most popular), Enterprise (custom retainer).

Your job:
- Greet visitors warmly, answer questions about services, process, pricing and capabilities.
- Give concise, genuinely helpful answers (2–5 sentences usually). Use short paragraphs or bullet points when useful.
- Recommend the most relevant service(s) to the visitor's needs and gently encourage them to book a project via the contact page.
- If asked something outside the agency's scope, briefly acknowledge and steer back to how the agency can help.
- Be enthusiastic, modern and human — never robotic. Use light emoji occasionally (max one per message).
- Never invent specific client names, prices beyond what's listed, or guarantees.

Always end a substantive answer with a soft, single call-to-action when natural (e.g., "Want me to connect you with the team? Hit the contact page. ✨").`

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
  try {
    const { messages, email } = (await req.json()) as {
      messages: ChatMessage[]
      email?: string
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'No messages provided.' },
        { status: 400 }
      )
    }

    // Trim to last 10 messages for context safety
    const recent = messages.slice(-10)
    const lastUserMessage = [...recent].reverse().find((m) => m.role === 'user')

    // Check if this conversation is in "human" mode (admin took over)
    const sessionId = req.headers.get('x-chat-session') || `s-${Date.now()}`
    let isHumanMode = false
    try {
      const { db } = await import('@/lib/db')
      const modeRows = (await db.$queryRaw`
        SELECT mode FROM ChatConversation WHERE sessionId = ${sessionId}
      `) as Array<{ mode: string }>
      if (modeRows.length > 0 && modeRows[0].mode === 'human') {
        isHumanMode = true
      }
    } catch {
      /* ignore */
    }

    let reply: string

    if (isHumanMode) {
      // Human mode — don't generate AI reply, tell user an agent will respond
      reply = "👋 Thanks for your message! A team member has taken over this chat and will respond to you shortly. For urgent matters, please email hello@preetwebvision.com."
    } else {
      // AI mode — generate reply via LLM
      // Read custom system prompt from settings (fallback to default)
      let systemPrompt = DEFAULT_SYSTEM_PROMPT
      try {
        const { db } = await import('@/lib/db')
        const promptRows = (await db.$queryRaw`SELECT value FROM SiteSetting WHERE key = 'ai_system_prompt'`) as Array<{ value: string }>
        if (promptRows.length > 0 && promptRows[0].value) {
          systemPrompt = promptRows[0].value
        }
      } catch {
        /* ignore — use default */
      }

      const zai = await ZAI.create()
      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: systemPrompt },
          ...recent.map((m) => ({ role: m.role, content: m.content })),
        ],
        thinking: { type: 'disabled' },
      })

      reply = completion.choices[0]?.message?.content?.trim() || ''

      if (!reply) {
        return NextResponse.json(
          { ok: false, error: 'I could not generate a response. Please try again.' },
          { status: 502 }
        )
      }
    }

    // Persist conversation to DB (best-effort, non-blocking) using raw SQL
    // for resilience against Prisma client delegate staleness in dev
    // (sessionId already declared above for mode check)
    if (process.env.NODE_ENV !== 'test' && lastUserMessage) {
      try {
        const { db } = await import('@/lib/db')
        const now = new Date().toISOString()
        const convId = crypto.randomUUID()

        // First, try to find existing conversation by sessionId
        const existing = (await db.$queryRaw`
          SELECT id FROM ChatConversation WHERE sessionId = ${sessionId}
        `) as Array<{ id: string }>

        let conversationId: string
        if (existing.length > 0) {
          conversationId = existing[0].id
          // Update email if provided
          if (email) {
            await db.$executeRaw`
              UPDATE ChatConversation SET email = ${email}, updatedAt = ${now} WHERE id = ${conversationId}
            `
          }
          // Check if in human mode — create notification for admin
          const modeRows = (await db.$queryRaw`SELECT mode FROM ChatConversation WHERE id = ${conversationId}`) as Array<{ mode: string }>
          if (modeRows[0]?.mode === 'human') {
            const notifId = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
            await db.$executeRaw`
              INSERT INTO Notification (id, type, title, message, link, read, createdAt)
              VALUES (${notifId}, 'chat_reply', 'New reply in human-mode chat', ${lastUserMessage.content.slice(0, 100)}, '/admin/dashboard', 0, ${now})
            `
          }
        } else {
          // Create new conversation
          await db.$executeRaw`
            INSERT INTO ChatConversation (id, sessionId, email, status, createdAt, updatedAt)
            VALUES (${convId}, ${sessionId}, ${email || null}, 'new', ${now}, ${now})
          `
          conversationId = convId
          // Notify admin of new chat
          const notifId = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
          await db.$executeRaw`
            INSERT INTO Notification (id, type, title, message, link, read, createdAt)
            VALUES (${notifId}, 'chat', 'New chat conversation started', ${lastUserMessage.content.slice(0, 100)}, '/admin/dashboard', 0, ${now})
          `
        }

        // Save user message
        await db.$executeRaw`
          INSERT INTO ChatMessage (id, conversationId, role, content, createdAt)
          VALUES (${crypto.randomUUID()}, ${conversationId}, 'user', ${lastUserMessage.content}, ${now})
        `
        // Save assistant reply
        await db.$executeRaw`
          INSERT INTO ChatMessage (id, conversationId, role, content, createdAt)
          VALUES (${crypto.randomUUID()}, ${conversationId}, 'assistant', ${reply}, ${now})
        `
      } catch (e) {
        console.error('Chat persistence error:', e)
        /* ignore — chat still works */
      }
    }

    return NextResponse.json({ ok: true, reply, sessionId })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      {
        ok: false,
        error: 'The assistant is having a moment. Please try again shortly.',
      },
      { status: 500 }
    )
  }
}
