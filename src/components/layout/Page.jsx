import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap.js'

// Route page wrapper with a scoped entrance animation.
// entrance: 'rise' (fade+slide up) | 'fade' | 'none' (screen animates its own content).
// Honors prefers-reduced-motion via gsap.matchMedia (content shown instantly).
export default function Page({ className = '', entrance = 'rise', children }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (entrance === 'none') return
      const mm = gsap.matchMedia()
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          ok: '(prefers-reduced-motion: no-preference)',
        },
        (ctx) => {
          if (ctx.conditions.reduce) {
            gsap.set(ref.current, { autoAlpha: 1, y: 0 })
            return
          }
          gsap.from(ref.current, {
            autoAlpha: 0,
            y: entrance === 'rise' ? 14 : 0,
            duration: 0.3,
          })
        },
      )
    },
    { scope: ref, dependencies: [entrance] },
  )

  return (
    <div ref={ref} className={['page', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
