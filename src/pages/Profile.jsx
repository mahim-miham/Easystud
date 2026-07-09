import { Link, useNavigate } from 'react-router-dom'
import { Crown, HardDrive, Bell, Info, ChevronRight, User, Moon, Sun, LogOut } from 'lucide-react'
import { getCurrentUser, signOut } from '../lib/authClient'
import { useTheme } from '../lib/theme'

const STORAGE_USED_GB = 2.4
const STORAGE_LIMIT_GB = 16

export default function Profile() {
  const navigate = useNavigate()
  const pct = Math.min(100, Math.round((STORAGE_USED_GB / STORAGE_LIMIT_GB) * 100))
  const user = getCurrentUser()
  const { theme, toggleTheme } = useTheme()

  async function handleAccountRowTap() {
    if (user) return
    navigate('/login')
  }

  async function handleLogout() {
    await signOut()
    navigate(0) // simple refresh so the UI reflects the logged-out state
  }

  return (
    <div className="flex flex-1 flex-col px-5 pt-[max(env(safe-area-inset-top),20px)] pb-6">
      <h1 className="mb-4 font-display text-xl text-[var(--ink)]">Profile</h1>

      <button
        onClick={handleAccountRowTap}
        className="mb-4 flex w-full items-center gap-3 rounded-[var(--radius-md)] bg-[var(--surface)] p-4 text-left"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ background: 'var(--board)', color: 'var(--sprout)' }}
        >
          <User size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-[var(--ink)]">
            {user ? user.name : 'Not logged in'}
          </p>
          <p className="truncate text-[12px] text-[var(--ink-soft)]">
            {user ? user.identifier : 'Tap to log in or create an account'}
          </p>
        </div>
        {!user && <ChevronRight size={16} className="text-[var(--ink-soft)]/50 shrink-0" />}
      </button>

      <Link
        to="/upgrade"
        className="mb-5 flex items-center justify-between rounded-[var(--radius-md)] p-4 text-white"
        style={{ background: 'var(--board)', boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex items-center gap-2.5">
          <Crown size={18} className="text-[var(--chalk-yellow)]" />
          <div>
            <p className="text-[13.5px] font-medium">Upgrade to Pro</p>
            <p className="text-[11px] text-[var(--ink-on-board-soft)]">Unlock exam prep, quiz, slides & more</p>
          </div>
        </div>
        <ChevronRight size={16} />
      </Link>

      <div
        className="mb-5 rounded-[var(--radius-md)] bg-[var(--surface)] p-4"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <div className="mb-2 flex items-center gap-2 text-[var(--ink)]">
          <HardDrive size={15} />
          <span className="text-[13px] font-medium">Storage</span>
        </div>
        <div className="mb-1.5 h-2 w-full overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: 'var(--sprout)' }}
          />
        </div>
        <p className="font-mono text-[11px] text-[var(--ink-soft)]">
          {STORAGE_USED_GB} GB of {STORAGE_LIMIT_GB} GB used
        </p>
      </div>

      <div className="mb-5 divide-y divide-black/5 rounded-[var(--radius-md)] bg-[var(--surface)]" style={{ boxShadow: 'var(--shadow-card)' }}>
        <button onClick={toggleTheme} className="flex w-full items-center justify-between px-4 py-3.5 active:bg-black/[0.02]">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon size={16} className="text-[var(--ink-soft)]" /> : <Sun size={16} className="text-[var(--ink-soft)]" />}
            <span className="text-[13.5px] text-[var(--ink)]">Appearance</span>
          </div>
          <span className="text-[12.5px] font-mono text-[var(--ink-soft)]">
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>
        <Link to="/notifications" className="flex w-full items-center justify-between px-4 py-3.5 active:bg-black/[0.02]">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-[var(--ink-soft)]" />
            <span className="text-[13.5px] text-[var(--ink)]">Notifications</span>
          </div>
          <ChevronRight size={15} className="text-[var(--ink-soft)]/50" />
        </Link>
        <SettingsRow icon={Info} label="About Easystud" />
      </div>

      {user && (
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--surface)] py-3 text-[13px] font-medium text-[var(--coral)]"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <LogOut size={15} />
          Log out
        </button>
      )}
    </div>
  )
}

function SettingsRow({ icon: Icon, label }) {
  return (
    <button className="flex w-full items-center justify-between px-4 py-3.5 active:bg-black/[0.02]">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-[var(--ink-soft)]" />
        <span className="text-[13.5px] text-[var(--ink)]">{label}</span>
      </div>
      <ChevronRight size={15} className="text-[var(--ink-soft)]/50" />
    </button>
  )
}
