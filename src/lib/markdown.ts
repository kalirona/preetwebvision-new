// Tiny zero-dependency markdown → HTML renderer.
// Supports a curated subset used by the blog editor toolbar:
//   ## / ### headings, **bold**, *italic*, [text](url) links,
//   > blockquotes, - unordered lists, blank-line separated paragraphs.
//
// Escapes HTML first to prevent injection, then applies inline + block rules.
// Used both server-side (article route) and client-side (editor live preview).

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Apply inline formatting (**bold**, *italic*, [text](url), `code`) to a string
// that has already been HTML-escaped.
function renderInline(escaped: string): string {
  let out = escaped
  // Inline code first to protect its contents from other rules
  const codeStash: string[] = []
  out = out.replace(/`([^`]+)`/g, (_m, code) => {
    codeStash.push(code)
    return `\u0000CODE${codeStash.length - 1}\u0000`
  })
  // Bold: **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // Italic: *text*
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
  // Links: [text](url) — sanitize url to http(s) or relative
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_m, text, url) => {
      const safe = /^(https?:\/\/|\/|#)/i.test(url) ? url : '#'
      const target = /^https?:\/\//i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${safe}"${target}>${text}</a>`
    },
  )
  // Restore inline code
  out = out.replace(/\u0000CODE(\d+)\u0000/g, (_m, i) => `<code>${codeStash[Number(i)]}</code>`)
  return out
}

export function markdownToHtml(md: string): string {
  if (!md) return ''
  const text = md.replace(/\r\n/g, '\n')
  const lines = text.split('\n')

  const html: string[] = []
  let i = 0
  let inUl = false
  const closeUl = () => {
    if (inUl) {
      html.push('</ul>')
      inUl = false
    }
  }

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.trimEnd()

    // Blank line — paragraph separator
    if (line.trim() === '') {
      closeUl()
      i++
      continue
    }

    // Heading 3
    const h3 = line.match(/^###\s+(.*)$/)
    if (h3) {
      closeUl()
      html.push(`<h3>${renderInline(escapeHtml(h3[1]))}</h3>`)
      i++
      continue
    }

    // Heading 2
    const h2 = line.match(/^##\s+(.*)$/)
    if (h2) {
      closeUl()
      html.push(`<h2>${renderInline(escapeHtml(h2[1]))}</h2>`)
      i++
      continue
    }

    // Heading 1 (treat ## as h2, ### as h3 — single # allowed as h1 but discouraged)
    const h1 = line.match(/^#\s+(.*)$/)
    if (h1) {
      closeUl()
      html.push(`<h2>${renderInline(escapeHtml(h1[1]))}</h2>`)
      i++
      continue
    }

    // Blockquote — collapse consecutive `>` lines into one <blockquote>
    if (/^>\s?/.test(line)) {
      closeUl()
      const quoteLines: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i].trimEnd())) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      html.push(`<blockquote>${renderInline(escapeHtml(quoteLines.join(' ')))}</blockquote>`)
      continue
    }

    // Unordered list item
    const li = line.match(/^[-*+]\s+(.*)$/)
    if (li) {
      if (!inUl) {
        html.push('<ul>')
        inUl = true
      }
      html.push(`<li>${renderInline(escapeHtml(li[1]))}</li>`)
      i++
      continue
    }

    // Paragraph — consume consecutive non-blank, non-special lines
    closeUl()
    const paraLines: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{1,3}\s+/.test(lines[i].trimEnd()) &&
      !/^>\s?/.test(lines[i].trimEnd()) &&
      !/^[-*+]\s+/.test(lines[i].trimEnd())
    ) {
      paraLines.push(lines[i].trimEnd())
      i++
    }
    html.push(`<p>${renderInline(escapeHtml(paraLines.join(' ')))}</p>`)
  }

  closeUl()
  return html.join('\n')
}

// Approximate reading time in minutes (200 wpm). Works for both markdown
// and JSON-block content strings (best-effort word count).
export function estimateReadingMinutes(content: string): number {
  let text = content
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) {
      text = parsed
        .map((b: { text?: string; items?: string[] }) =>
          b.text || (Array.isArray(b.items) ? b.items.join(' ') : ''),
        )
        .join(' ')
    }
  } catch {
    // not JSON — treat as markdown / plain text
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
