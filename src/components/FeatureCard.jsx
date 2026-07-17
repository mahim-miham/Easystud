import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import StatusPill from './StatusPill'
import HoloTiltCard from './HoloTiltCard'

export default function FeatureCard({ feature }) {
  const { id, name, blurb, icon: Icon, status, tier } = feature
  const locked = status === 'coming-soon'

  return (
    <HoloTiltCard
      as={Link}
      to={`/feature/${id}`}
      className="group flex flex-col justify-between rounded-[var(--radius-md)] bg-[var(--surface)] p-4 h-[136px] active:scale-[0.97] border border-[var(--paper-line)]"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <div className="flex items-start justify-between" style={{ transform: 'translateZ(24px)' }}>
        <div
          className="holo-sweep flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ color: 'var(--board-deep)' }}
        >
          <Icon size={18} strokeWidth={2.25} />
        </div>
        {locked ? (
          <Lock size={13} className="text-[var(--ink-soft)]/50 mt-1" />
        ) : tier === 'pro' ? (
          <StatusPill variant="yellow">Pro</StatusPill>
        ) : null}
      </div>

      <div style={{ transform: 'translateZ(16px)' }}>
        <h3 className="font-display font-semibold text-[15px] leading-tight text-[var(--ink)]">{name}</h3>
        <p className="mt-0.5 text-[12px] leading-snug text-[var(--ink-soft)] line-clamp-2">{blurb}</p>
      </div>
    </HoloTiltCard>
  )
}
