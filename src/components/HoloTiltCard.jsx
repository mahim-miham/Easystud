import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * HoloTiltCard -- the app's signature interaction.
 *
 * A glass card that behaves like a foil trading card: it tilts toward
 * the pointer (or a finger drag on touch) and a holographic sheen
 * sweeps across it in response, driven by the same tilt values. Nothing
 * moves until the student touches it -- the reveal IS the reward.
 *
 * Kept as a wrapper so any card (feature tiles, stat tiles, upgrade
 * banners) can opt into the same physical language.
 */
export default function HoloTiltCard({ children, className = '', style = {}, as: Comp = 'div', ...rest }) {
  const ref = useRef(null)
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const sheenX = useMotionValue(50)
  const sheenY = useMotionValue(50)

  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 25, mass: 0.5 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 25, mass: 0.5 })
  const glow = useTransform([rotateX, rotateY], ([rx, ry]) => Math.min(1, (Math.abs(rx) + Math.abs(ry)) / 14))

  function handlePointerMove(e) {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const maxTilt = 10
    rotateYRaw.set((px - 0.5) * maxTilt * 2)
    rotateXRaw.set(-(py - 0.5) * maxTilt * 2)
    sheenX.set(px * 100)
    sheenY.set(py * 100)
  }

  function handlePointerLeave() {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
    sheenX.set(50)
    sheenY.set(50)
  }

  // motion['div'] works for plain tag strings, but a component reference
  // (e.g. react-router's Link) has to go through motion.create() instead --
  // bracket access on the motion proxy only recognizes string keys.
  const MotionComp = useMemo(
    () => (typeof Comp === 'string' ? motion[Comp] : motion.create(Comp)),
    [Comp]
  )

  return (
    <div className="tilt-scene">
      <MotionComp
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          ...style,
        }}
        className={`relative overflow-hidden touch-none ${className}`}
        {...rest}
      >
        {children}

        {/* holo sheen, position follows the pointer, intensity follows tilt */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            opacity: glow,
            background: useTransform(
              [sheenX, sheenY],
              ([sx, sy]) =>
                `radial-gradient(circle at ${sx}% ${sy}%, var(--holo-cyan) 0%, var(--sprout) 25%, var(--holo-magenta) 50%, var(--holo-lime) 75%, transparent 100%)`
            ),
          }}
        />

        {/* thin holo edge, always faintly present so the card reads as foil even at rest */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
          style={{
            padding: 1,
            background: 'linear-gradient(120deg, var(--sprout), var(--holo-cyan), var(--holo-magenta))',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      </MotionComp>
    </div>
  )
}
