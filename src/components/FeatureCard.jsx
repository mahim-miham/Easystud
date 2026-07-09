import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import StatusPill from './StatusPill'

export default function FeatureCard({ feature }) {
  const { id, name, blurb, icon: Icon, status, tier } = feature
  const locked = status === 'coming-soon'

  return (
    <Link
      to={`/feature/${id}`}
      className="group relative flex flex-col justify-between rounded-[var(--radius-md)] bg-[var(--surface)] p-4 h-[136px] transition-all duration-200 active:scale-[0.97]"
      style={{
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: 'var(--board)', color: 'var(--sprout)' }}
        >
          <Icon size={18} strokeWidth={2} />
        </div>
        {locked ? (
          <Lock size={13} className="text-[var(--ink-soft)]/50 mt-1" />
        ) : tier === 'pro' ? (
          <StatusPill variant="yellow">Pro</StatusPill>
        ) : null}
      </div>

      <div>
        <h3 className="font-display text-[15px] leading-tight text-[var(--ink)]">{name}</h3>
        <p className="mt-0.5 text-[12px] leading-snug text-[var(--ink-soft)] line-clamp-2">{blurb}</p>
      </div>

      {/* subtle depth: a second "page" peeking out behind the card */}
      <div
        aria-hidden
        className="absolute inset-x-3 -bottom-1.5 -z-10 h-full rounded-[var(--radius-md)] bg-[var(--surface)]/70 transition-transform duration-200 group-active:translate-y-0.5"
        style={{ transform: 'scale(0.96) translateY(6px)' }}
      />
    </Link>
  )
}
