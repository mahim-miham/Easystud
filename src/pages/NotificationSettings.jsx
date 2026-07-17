import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Mail } from 'lucide-react'
import { getPreferences, savePreferences } from '../lib/notificationsClient'

export default function NotificationSettings() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState(getPreferences)

  function update(patch) {
    const next = { ...prefs, ...patch }
    setPrefs(next)
    savePreferences(next)
  }

  return (
    <div className="flex flex-1 flex-col px-5 pt-[max(env(safe-area-inset-top),20px)] pb-8">
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--veil-1)]"
          aria-label="Back"
        >
          <ArrowLeft size={16} className="text-[var(--ink)]" />
        </button>
        <h1 className="font-display font-semibold text-xl text-[var(--ink)]">Notifications</h1>
      </div>

      <div className="mb-4 rounded-[var(--radius-md)] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
        <Row
          icon={Bell}
          title="Push notifications"
          subtitle="Deadline reminders, straight to your phone's notification bar"
          checked={prefs.pushEnabled}
          onChange={(v) => update({ pushEnabled: v })}
        />
      </div>

      <div className="mb-2 rounded-[var(--radius-md)] bg-[var(--surface)] p-4" style={{ boxShadow: 'var(--shadow-card)' }}>
        <Row
          icon={Mail}
          title="Email notifications"
          subtitle="Also get a copy by email"
          checked={prefs.emailEnabled}
          onChange={(v) => update({ emailEnabled: v })}
        />
        {prefs.emailEnabled && (
          <input
            type="email"
            value={prefs.notifyEmail}
            onChange={(e) => update({ notifyEmail: e.target.value })}
            placeholder="you@example.com"
            className="mt-3 w-full rounded-[var(--radius-sm)] border border-[var(--paper-line)] bg-[var(--chalk)] px-3.5 py-2.5 text-[13.5px] text-[var(--ink)] outline-none focus:border-[var(--sprout)]"
          />
        )}
      </div>

      <p className="mt-4 text-[11.5px] leading-relaxed text-[var(--ink-soft)]">
        These preferences are saved on this device now. Actually delivering a
        push or email notification needs a backend trigger, which isn't wired
        up yet — this screen is ready for that once it is.
      </p>
    </div>
  )
}

function Row({ icon: Icon, title, subtitle, checked, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: 'var(--board)', color: 'var(--sprout)' }}
      >
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-medium text-[var(--ink)]">{title}</p>
        <p className="text-[11.5px] text-[var(--ink-soft)]">{subtitle}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 shrink-0 rounded-full transition"
        style={{ background: checked ? 'var(--sprout)' : 'var(--veil-2)' }}
        aria-pressed={checked}
        aria-label={`Toggle ${title}`}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
          style={{ left: checked ? '22px' : '2px' }}
        />
      </button>
    </div>
  )
}
