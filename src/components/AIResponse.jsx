/**
 * Shared renderer for AI-generated text across every feature.
 * Understands a minimal subset: "## heading", "- bullet", and plain
 * paragraphs — enough for study content without pulling in a full
 * markdown library. Reused by Research now, and by Study Notes,
 * Assignments, Quiz, etc. once they go live.
 */
export default function AIResponse({ text }) {
  const blocks = parseBlocks(text)

  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        if (b.type === 'h') {
          return (
            <h3 key={i} className="font-display text-[15px] text-[var(--ink)] mt-1">
              {b.text}
            </h3>
          )
        }
        if (b.type === 'ul') {
          return (
            <ul key={i} className="space-y-1.5 pl-0.5">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-2 text-[13.5px] leading-relaxed text-[var(--ink)]">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: 'var(--sprout)' }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-[13.5px] leading-relaxed text-[var(--ink)]">
            {b.text}
          </p>
        )
      })}
    </div>
  )
}

function parseBlocks(text) {
  const lines = (text || '').split('\n')
  const blocks = []
  let currentList = null

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      currentList = null
      continue
    }
    if (/^#{1,3}\s/.test(line)) {
      currentList = null
      blocks.push({ type: 'h', text: line.replace(/^#{1,3}\s/, '') })
      continue
    }
    if (/^[-*]\s/.test(line)) {
      if (!currentList) {
        currentList = { type: 'ul', items: [] }
        blocks.push(currentList)
      }
      currentList.items.push(line.replace(/^[-*]\s/, ''))
      continue
    }
    currentList = null
    blocks.push({ type: 'p', text: line })
  }
  return blocks
}
