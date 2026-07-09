import { useEffect, useRef, useState } from 'react'

/**
 * The Easystud mark: an open book with a pen laid across it, drawn
 * as a single chalk-line sketch. `animate` makes it "write itself"
 * on mount — meant to be used once, on the splash/first paint, not
 * repeated on every screen (per the app's one-signature-move rule).
 */
export default function Logo({ size = 40, animate = false, color = 'currentColor', className = '' }) {
  const pathRefs = useRef([])
  const [ready, setReady] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const t = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(t)
  }, [animate])

  const strokeStyle = (delay) =>
    animate
      ? {
          strokeDasharray: 140,
          strokeDashoffset: ready ? 0 : 140,
          transition: `stroke-dashoffset 900ms cubic-bezier(.34,1,.5,1) ${delay}ms`,
        }
      : undefined

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-label="Easystud"
      role="img"
    >
      {/* left page */}
      <path
        d="M23 12.5C18 10.8 11.4 10 5.5 12.2C5 12.4 4.5 12.9 4.5 13.6V33.4C4.5 34.3 5.4 34.9 6.2 34.5C11.7 32 17.9 32.7 22.4 35"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={strokeStyle(0)}
      />
      {/* right page */}
      <path
        d="M25 12.5C30 10.8 36.6 10 42.5 12.2C43 12.4 43.5 12.9 43.5 13.6V33.4C43.5 34.3 42.6 34.9 41.8 34.5C36.3 32 30.1 32.7 25.6 35"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={strokeStyle(80)}
      />
      {/* spine */}
      <path
        d="M24 13V35.5"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        style={strokeStyle(150)}
      />
      {/* pen, laid diagonally across the book */}
      <path
        d="M10.5 30.5L34.5 8.5"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        style={strokeStyle(260)}
      />
      {/* pen nib */}
      <path
        d="M34.5 8.5L39 6.5L37.2 11.2L34.5 8.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        style={strokeStyle(340)}
      />
    </svg>
  )
}
