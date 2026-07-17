import { Flame, CalendarCheck, Search, Award } from 'lucide-react'
import { getStreak, getLast7Days, getStats } from '../../lib/progressStore'

export default function ProgressTracking() {
  const streak = getStreak()
  const days = getLast7Days()
  const stats = getStats()
  const points = stats.eventsCompleted * 10 + stats.researchRuns * 5

  return (
    <div className="flex flex-1 flex-col px-5 pt-1 pb-6">
      <h1 className="font-display font-semibold text-xl text-[var(--ink)]">Progress</h1>
      <p className="mb-4 text-[12px] text-[var(--ink-soft)]">
        Your study activity, tracked right on this device.
      </p>

      {/* streak card */}
      <div
        className="chalk-surface mb-4 rounded-[var(--radius-md)] p-5 text-center"
        style={{ boxShadow: 'var(--shadow-board)' }}
      >
        <Flame size={26} className="mx-auto mb-1.5" style={{ color: 'var(--chalk-yellow)' }} />
        <p className="font-display text-[34px] leading-none text-[var(--ink-on-board)]">{streak}</p>
        <p className="mt-1 text-[11px] font-mono uppercase tracking-wide text-[var(--ink-on-board-soft)]">
          day{streak === 1 ? '' : 's'} streak
        </p>
      </div>

      {/* 7-day activity row */}
      <div className="mb-4 rounded-[var(--radius-md)] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
        <p className="mb-3 text-[12px] font-medium text-[var(--ink)]">Last 7 days</p>
        <div className="flex justify-between">
          {days.map((d) => (
            <div key={d.date} className="flex flex-col items-center gap-1.5">
              <div
                className="h-7 w-7 rounded-full transition"
                style={{ background: d.active ? 'var(--sprout)' : 'var(--chalk-dim)' }}
                title={d.date}
              />
              <span className="text-[10px] font-mono text-[var(--ink-soft)]">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={CalendarCheck} value={stats.eventsCompleted} label="Events completed" />
        <StatCard icon={Search} value={stats.researchRuns} label="Research queries" />
        <StatCard icon={Award} value={points} label="Study points" full />
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-[var(--ink-soft)]/80">
        Points: 10 for each calendar event you complete, 5 for each Research query.
        More activities will add to this as more features go live.
      </p>
    </div>
  )
}

function StatCard({ icon: Icon, value, label, full }) {
  return (
    <div
      className={`rounded-[var(--radius-md)] bg-[var(--surface)] p-4 ${full ? 'col-span-2' : ''}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <Icon size={16} style={{ color: 'var(--sprout-deep)' }} className="mb-2" />
      <p className="font-display text-[22px] text-[var(--ink)]">{value}</p>
      <p className="text-[11px] text-[var(--ink-soft)]">{label}</p>
    </div>
  )
}
