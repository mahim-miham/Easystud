import { Sparkles } from 'lucide-react'

/**
 * Every AI-dependent feature renders this until its own index.jsx is
 * filled in with the real UI. Swapping a feature from "coming soon" to
 * live is a two-step, one-file change:
 *   1. Build the real screen in that feature's own index.jsx
 *   2. Flip its `status` to 'active' in src/features/registry.js
 */
export default function FeatureComingSoon({ icon: Icon, name, blurb, note }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{ background: 'var(--board)', color: 'var(--sprout)' }}
      >
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <h2 className="font-display text-xl text-[var(--ink)]">{name}</h2>
      <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-[var(--ink-soft)]">{blurb}</p>

      <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--chalk-yellow)]/25 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wide text-[var(--warn-text)]">
        <Sparkles size={12} />
        Building this next
      </div>

      {note && (
        <p className="mt-4 max-w-[260px] text-[11px] leading-relaxed text-[var(--ink-soft)]/70 font-mono">
          {note}
        </p>
      )}
    </div>
  )
}
