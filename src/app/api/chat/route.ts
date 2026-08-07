import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const SYSTEM_PROMPT = `You are "Vision AI", the friendly, expert assistant for Preet Web Vision — a modern digital marketing agency. You live on their website as a live demo of the agency's AI automation capabilities.

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

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: SYSTEM_PROMPT },
        ...recent.map((m) => ({ role: m.role, content: m.content })),
      ],
      thinking: { type: 'disabled' },
    })

    const reply = completion.choices[0]?.message?.content?.trim()

    if (!reply) {
      return NextResponse.json(
        { ok: false, error: 'I could not generate a response. Please try again.' },
        { status: 502 }
      )
    }

    // Optionally capture the lead (best-effort, non-blocking)
    if (email && process.env.NODE_ENV !== 'test') {
      try {
        const { db } = await import('@/lib/db')
        await db.chatLead.create({
          data: { email, message: recent[recent.length - 1]?.content ?? '' },
        })
      } catch {
        /* ignore db errors for chat */
      }
    }

    return NextResponse.json({ ok: true, reply })
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
