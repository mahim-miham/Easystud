import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone } from 'lucide-react'
import Logo from '../components/Logo'
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithPhone,
  signUpWithPhone,
} from '../lib/authClient'

export default function Login() {
  const navigate = useNavigate()
  const [method, setMethod] = useState('email') // 'email' | 'phone'
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    let res
    if (method === 'email') {
      res = mode === 'signup' ? await signUpWithEmail(name, email, password) : await signInWithEmail(email, password)
    } else {
      res = mode === 'signup' ? await signUpWithPhone(name, phone) : await signInWithPhone(phone)
    }

    setLoading(false)
    if (res.ok) {
      navigate('/profile', { replace: true })
    } else {
      setError(res.message || 'Something went wrong.')
    }
  }

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-[max(env(safe-area-inset-top),20px)]">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--veil-1)]"
        aria-label="Back"
      >
        <ArrowLeft size={16} className="text-[var(--ink)]" />
      </button>

      <div className="mb-8 flex flex-col items-center text-center">
        <Logo size={40} color="var(--sprout-deep)" />
        <h1 className="mt-3 font-display font-semibold text-[22px] holo-text">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="mt-1 text-[12.5px] text-[var(--ink-soft)]">
          {mode === 'signup' ? 'Set up Easystud in a few seconds' : 'Log in to pick up where you left off'}
        </p>
      </div>

      <div className="mb-5 flex gap-2 rounded-full bg-[var(--veil-1)] p-1">
        <button
          onClick={() => setMethod('email')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-medium transition"
          style={{
            background: method === 'email' ? 'var(--surface)' : 'transparent',
            color: method === 'email' ? 'var(--ink)' : 'var(--ink-soft)',
            boxShadow: method === 'email' ? 'var(--shadow-card)' : 'none',
          }}
        >
          <Mail size={14} /> Email
        </button>
        <button
          onClick={() => setMethod('phone')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[13px] font-medium transition"
          style={{
            background: method === 'phone' ? 'var(--surface)' : 'transparent',
            color: method === 'phone' ? 'var(--ink)' : 'var(--ink-soft)',
            boxShadow: method === 'phone' ? 'var(--shadow-card)' : 'none',
          }}
        >
          <Phone size={14} /> Phone
        </button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode === 'signup' && (
          <Field label="Full name" value={name} onChange={setName} placeholder="Your name" />
        )}

        {method === 'email' ? (
          <>
            <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
            <Field label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" />
          </>
        ) : (
          <Field label="Mobile number" value={phone} onChange={setPhone} placeholder="+60 1X-XXX XXXX" type="tel" />
        )}

        {error && (
          <p className="rounded-[var(--radius-sm)] bg-[var(--coral)]/10 px-3.5 py-2.5 text-[12px] text-[var(--danger-text)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="holo-sweep w-full rounded-[var(--radius-sm)] py-3.5 text-[14px] font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
          style={{ color: 'var(--board-deep)' }}
        >
          {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
        </button>
      </form>

      <p className="mt-5 text-center text-[12.5px] text-[var(--ink-soft)]">
        {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => {
            setMode(mode === 'signup' ? 'signin' : 'signup')
            setError('')
          }}
          className="font-medium text-[var(--sprout-deep)]"
        >
          {mode === 'signup' ? 'Log in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-mono uppercase text-[var(--ink-soft)]">{label}</span>
      <input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[var(--radius-sm)] border border-[var(--paper-line)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--ink)] outline-none focus:border-[var(--sprout)]"
      />
    </label>
  )
}
