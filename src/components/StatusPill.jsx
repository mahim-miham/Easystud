const VARIANTS = {
  sprout: 'bg-[var(--sprout)]/15 text-[var(--sprout-deep)]',
  yellow: 'bg-[var(--chalk-yellow)]/25 text-[var(--warn-text)]',
  board: 'bg-[var(--board)]/8 text-[var(--board)]',
  muted: 'bg-black/5 text-[var(--ink-soft)]',
}

export default function StatusPill({ children, variant = 'muted', icon: Icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-mono font-medium tracking-wide uppercase ${VARIANTS[variant]}`}
    >
      {Icon && <Icon size={11} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
