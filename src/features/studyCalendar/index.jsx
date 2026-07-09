import { useEffect, useMemo, useState } from 'react'
import { Plus, X, CalendarDays, Trash2, Check } from 'lucide-react'
import { incrementStat } from '../../lib/progressStore'

const STORAGE_KEY = 'easystud.calendar.events'

const TYPES = [
  { id: 'class', label: 'Class', color: 'var(--sprout)' },
  { id: 'exam', label: 'Exam', color: 'var(--coral)' },
  { id: 'deadline', label: 'Deadline', color: 'var(--chalk-yellow)' },
  { id: 'other', label: 'Other', color: 'var(--board-soft)' },
]

function loadEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveEvents(events) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    /* storage unavailable — fail silently, state still holds for this session */
  }
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.round((d - today) / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function StudyCalendar() {
  const [events, setEvents] = useState(loadEvents)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'class', date: '', time: '' })

  useEffect(() => saveEvents(events), [events])

  const grouped = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const upcoming = events
      .filter((e) => new Date(e.date + 'T00:00:00') >= today)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

    const byDate = {}
    upcoming.forEach((e) => {
      byDate[e.date] = byDate[e.date] || []
      byDate[e.date].push(e)
    })
    return byDate
  }, [events])

  function addEvent(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.date) return
    setEvents((prev) => [...prev, { ...form, id: crypto.randomUUID(), completed: false }])
    setForm({ title: '', type: 'class', date: '', time: '' })
    setShowForm(false)
  }

  function removeEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  function toggleComplete(id) {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e
        const nextCompleted = !e.completed
        incrementStat('eventsCompleted', nextCompleted ? 1 : -1)
        return { ...e, completed: nextCompleted }
      })
    )
  }

  const dateKeys = Object.keys(grouped)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between px-5 pt-1 pb-3">
        <div>
          <h1 className="font-display text-xl text-[var(--ink)]">Study Calendar</h1>
          <p className="text-[12px] text-[var(--ink-soft)]">Classes, exams and deadlines</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md active:scale-95 transition"
          style={{ background: 'var(--sprout)' }}
          aria-label="Add event"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-6">
        {dateKeys.length === 0 && (
          <div className="mt-16 flex flex-col items-center text-center">
            <CalendarDays size={32} className="text-[var(--ink-soft)]/40 mb-3" />
            <p className="text-[13px] text-[var(--ink-soft)]">Nothing scheduled yet.</p>
            <p className="text-[12px] text-[var(--ink-soft)]/70 mt-1">Tap + to add your first class or exam.</p>
          </div>
        )}

        {dateKeys.map((date) => (
          <div key={date} className="mb-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-[var(--ink-soft)]">
              {formatDateLabel(date)}
            </p>
            <div className="space-y-2">
              {grouped[date].map((ev) => {
                const typeInfo = TYPES.find((t) => t.id === ev.type) || TYPES[3]
                return (
                  <div
                    key={ev.id}
                    className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-[var(--surface)] px-3.5 py-3"
                    style={{ boxShadow: 'var(--shadow-card)', opacity: ev.completed ? 0.55 : 1 }}
                  >
                    <button
                      onClick={() => toggleComplete(ev.id)}
                      aria-label={ev.completed ? 'Mark as not done' : 'Mark as done'}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition"
                      style={{
                        borderColor: ev.completed ? 'var(--sprout)' : typeInfo.color,
                        background: ev.completed ? 'var(--sprout)' : 'transparent',
                      }}
                    >
                      {ev.completed && <Check size={12} strokeWidth={3} color="white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className="truncate text-[13.5px] font-medium text-[var(--ink)]"
                        style={{ textDecoration: ev.completed ? 'line-through' : 'none' }}
                      >
                        {ev.title}
                      </p>
                      <p className="text-[11px] text-[var(--ink-soft)] font-mono">
                        {typeInfo.label}{ev.time ? ` · ${ev.time}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => removeEvent(ev.id)}
                      className="p-1.5 text-[var(--ink-soft)]/50 active:text-[var(--coral)]"
                      aria-label="Delete event"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <form
            onSubmit={addEvent}
            className="w-full max-w-md rounded-t-[24px] bg-[var(--chalk)] p-5 pb-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg">New event</h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Close">
                <X size={20} className="text-[var(--ink-soft)]" />
              </button>
            </div>

            <label className="mb-3 block">
              <span className="mb-1 block text-[11px] font-mono uppercase text-[var(--ink-soft)]">Title</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. SCB1003 Midterm"
                className="w-full rounded-[var(--radius-sm)] border border-black/10 bg-[var(--surface)] px-3.5 py-2.5 text-[14px] outline-none focus:border-[var(--sprout)]"
              />
            </label>

            <div className="mb-3 flex gap-2">
              {TYPES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setForm({ ...form, type: t.id })}
                  className="flex-1 rounded-[var(--radius-sm)] px-2 py-2 text-[12px] font-medium transition"
                  style={{
                    background: form.type === t.id ? t.color : 'var(--surface)',
                    color: form.type === t.id ? '#fff' : 'var(--ink-soft)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mb-4 flex gap-2">
              <label className="flex-1">
                <span className="mb-1 block text-[11px] font-mono uppercase text-[var(--ink-soft)]">Date</span>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-[var(--radius-sm)] border border-black/10 bg-[var(--surface)] px-3 py-2.5 text-[14px] outline-none focus:border-[var(--sprout)]"
                />
              </label>
              <label className="flex-1">
                <span className="mb-1 block text-[11px] font-mono uppercase text-[var(--ink-soft)]">Time</span>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full rounded-[var(--radius-sm)] border border-black/10 bg-[var(--surface)] px-3 py-2.5 text-[14px] outline-none focus:border-[var(--sprout)]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-[var(--radius-sm)] py-3 text-[14px] font-semibold text-white active:scale-[0.98] transition"
              style={{ background: 'var(--board)' }}
            >
              Add to calendar
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
