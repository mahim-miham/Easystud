import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { runResearch } from './api'
import AIResponse from '../../components/AIResponse'
import { incrementStat } from '../../lib/progressStore'

const HISTORY_KEY = 'easystud.research.history'

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}

function saveHistory(items) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 6)))
  } catch {
    /* storage unavailable — session still works, just won't persist */
  }
}

export default function Research() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null) // { topic, text }
  const [error, setError] = useState('')
  const [history, setHistory] = useState(loadHistory)

  async function submit(e) {
    e.preventDefault()
    const q = topic.trim()
    if (!q || loading) return

    setLoading(true)
    setError('')
    setResult(null)

    const res = await runResearch(q)
    setLoading(false)

    if (res.ok) {
      const text = res.data?.text || ''
      const entry = { id: crypto.randomUUID(), topic: q, text }
      setResult(entry)
      const next = [entry, ...history.filter((h) => h.topic !== q)].slice(0, 6)
      setHistory(next)
      saveHistory(next)
      incrementStat('researchRuns')
    } else {
      setError(res.message || 'Something went wrong — try again.')
    }
  }

  return (
    <div className="flex flex-1 flex-col px-5 pt-1 pb-6">
      <h1 className="font-display font-semibold text-xl text-[var(--ink)]">Research</h1>
      <p className="mb-4 text-[12px] text-[var(--ink-soft)]">
        Ask any topic — get a deep, structured explanation.
      </p>

      <form onSubmit={submit} className="mb-4">
        <div
          className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--surface)] px-3.5 py-2.5"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <Search size={16} className="text-[var(--ink-soft)] shrink-0" />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How does photosynthesis work?"
            className="flex-1 min-w-0 bg-transparent text-[13.5px] outline-none placeholder:text-[var(--ink-soft)]/60"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] py-3 text-[14px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-50"
          style={{ background: 'var(--board)' }}
        >
          <Sparkles size={15} />
          {loading ? 'Researching…' : 'Research this'}
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-[var(--radius-sm)] bg-[var(--coral)]/10 px-3.5 py-3 text-[12.5px] leading-relaxed text-[var(--danger-text)]">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {result ? (
          <div className="rounded-[var(--radius-md)] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-[var(--ink-soft)]">
              {result.topic}
            </p>
            <AIResponse text={result.text} />
          </div>
        ) : history.length > 0 ? (
          <>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--ink-soft)]">Recent</p>
            <div className="space-y-2">
              {history.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setResult(h)}
                  className="w-full rounded-[var(--radius-sm)] bg-[var(--surface)] px-3.5 py-3 text-left text-[13px] text-[var(--ink)] active:bg-black/[0.02]"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  {h.topic}
                </button>
              ))}
            </div>
          </>
        ) : (
          !loading && (
            <div className="mt-10 flex flex-col items-center text-center">
              <Search size={28} className="text-[var(--ink-soft)]/40 mb-3" />
              <p className="text-[13px] text-[var(--ink-soft)]">Ask something above to get started.</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
