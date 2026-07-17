import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import HoloTiltCard from '../components/HoloTiltCard'

// NOTE: prices below are placeholders — swap in your real numbers
// once you've decided on them. Everything else on this screen is wired up.
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    cadence: 'forever',
    features: ['Research & Study Notes', 'Study Calendar', 'Image to PDF', 'Student ID / CV', 'Quiz (limited)'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$4.99',
    cadence: '/ month',
    highlight: true,
    features: ['Everything in Free', 'Unlimited Assignments & Quiz', 'Slides & Video Scripts', 'Exam Prep (IELTS/SAT/GRE/TOEFL)', 'Art Studio'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99',
    cadence: '/ month',
    features: ['Everything in Pro', 'AI Voice Practice (20 min/day)', 'Freebook full library access', '50 GB storage', 'Priority generation speed'],
  },
]

export default function Upgrade() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col px-5 pt-[max(env(safe-area-inset-top),20px)] pb-8">
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--veil-1)]"
          aria-label="Back"
        >
          <ArrowLeft size={16} className="text-[var(--ink)]" />
        </button>
        <h1 className="font-display font-semibold text-xl holo-text">Choose your plan</h1>
      </div>

      <div className="space-y-3">
        {PLANS.map((plan) => {
          const Wrapper = plan.highlight ? HoloTiltCard : 'div'
          return (
          <Wrapper
            key={plan.id}
            className="relative rounded-[var(--radius-md)] p-4"
            style={{
              background: plan.highlight ? 'var(--board)' : 'var(--surface)',
              boxShadow: plan.highlight ? 'var(--shadow-board)' : 'var(--shadow-card)',
            }}
          >
            {plan.highlight && (
              <span
                className="absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wide"
                style={{ background: 'var(--chalk-yellow)', color: '#5a4109' }}
              >
                Most popular
              </span>
            )}
            <div className="mb-3 flex items-baseline justify-between">
              <h2
                className="font-display text-[17px]"
                style={{ color: plan.highlight ? 'var(--ink-on-board)' : 'var(--ink)' }}
              >
                {plan.name}
              </h2>
              <p style={{ color: plan.highlight ? 'var(--ink-on-board)' : 'var(--ink)' }}>
                <span className="text-[18px] font-semibold">{plan.price}</span>{' '}
                <span
                  className="text-[11px]"
                  style={{ color: plan.highlight ? 'var(--ink-on-board-soft)' : 'var(--ink-soft)' }}
                >
                  {plan.cadence}
                </span>
              </p>
            </div>
            <ul className="space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12.5px]" style={{ color: plan.highlight ? 'var(--ink-on-board-soft)' : 'var(--ink-soft)' }}>
                  <Check size={13} className="mt-0.5 shrink-0" style={{ color: plan.highlight ? 'var(--sprout)' : 'var(--sprout-deep)' }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`mt-4 w-full rounded-[var(--radius-sm)] py-2.5 text-[13px] font-semibold active:scale-[0.98] transition ${plan.highlight ? 'holo-sweep' : ''}`}
              style={{
                background: plan.highlight ? undefined : 'var(--chalk-dim)',
                color: plan.highlight ? 'var(--board-deep)' : 'var(--ink)',
              }}
            >
              {plan.id === 'free' ? 'Current plan' : `Get ${plan.name}`}
            </button>
          </Wrapper>
          )
        })}
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-[var(--ink-soft)]">
        Heavy use of a single tool (like Exam Prep extra sets) may carry a small
        pay-as-you-go add-on beyond your plan's limit.
      </p>
    </div>
  )
}
