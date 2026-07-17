import { NavLink } from 'react-router-dom'
import { Home, CalendarDays, Library, User } from 'lucide-react'

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/feature/study-calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/feature/freebook', label: 'Freebook', icon: Library },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  return (
    <nav
      className="sticky bottom-0 z-40 flex justify-around border-t border-white/10 bg-[var(--chalk)]/95 px-2 pb-[max(env(safe-area-inset-bottom),10px)] pt-2 backdrop-blur"
    >
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="relative flex flex-1 flex-col items-center gap-1 py-1"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  aria-hidden
                  className="holo-sweep absolute -top-2 h-[3px] w-6 rounded-full"
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.4 : 1.8}
                color={isActive ? 'var(--sprout-deep)' : 'var(--ink-soft)'}
              />
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? 'var(--sprout-deep)' : 'var(--ink-soft)' }}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
