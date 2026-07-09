import { Link } from 'react-router-dom'
import { Flame, Crown, ChevronRight } from 'lucide-react'
import Logo from '../components/Logo'
import FeatureCard from '../components/FeatureCard'
import { FEATURES } from '../features/registry'
import { getCurrentUser } from '../lib/authClient'
import { getStreak } from '../lib/progressStore'

export default function Home() {
  const activeCount = FEATURES.filter((f) => f.status === 'active').length
  const user = getCurrentUser()
  const firstName = user?.name?.split(' ')[0]
  const streak = getStreak()

  return (
    <div className="flex flex-1 flex-col">
      {/* greenboard header */}
      <header className="chalk-surface px-5 pb-6 pt-[max(env(safe-area-inset-top),20px)]">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={26} animate color="var(--sprout)" />
            <span className="font-display text-[17px] text-[var(--ink-on-board)]">Easystud</span>
          </div>
          <Link
            to="/feature/progress"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[var(--chalk-yellow)] active:bg-white/15 transition"
          >
            <Flame size={13} />
            <span className="font-mono text-[11px] font-medium">
              {streak} day{streak === 1 ? '' : 's'} streak
            </span>
          </Link>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--ink-on-board-soft)]">
          {firstName ? `Welcome back, ${firstName}` : 'Welcome'}
        </p>
        <h1 className="font-display text-[22px] text-[var(--ink-on-board)]">Ready to study?</h1>

        <Link
          to="/upgrade"
          className="mt-4 flex items-center justify-between rounded-[var(--radius-sm)] bg-white/8 px-4 py-3 active:bg-white/12 transition"
        >
          <div className="flex items-center gap-2.5">
            <Crown size={16} className="text-[var(--chalk-yellow)]" />
            <div>
              <p className="text-[13px] font-medium text-[var(--ink-on-board)]">You're on Free</p>
              <p className="text-[11px] text-[var(--ink-on-board-soft)]">Upgrade for exam prep, quiz & more</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[var(--ink-on-board-soft)]" />
        </Link>
      </header>

      {/* feature grid, paper surface */}
      <div className="notebook-lines flex-1 px-5 pb-6 pt-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-[15px] text-[var(--ink)]">Your tools</h2>
          <span className="font-mono text-[11px] text-[var(--ink-soft)]">{activeCount} live · {FEATURES.length - activeCount} coming soon</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.id} feature={f} />
          ))}
        </div>
      </div>
    </div>
  )
}
