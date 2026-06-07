import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

// Register plugins once for the whole app (GSAP + all former Club plugins are free).
gsap.registerPlugin(useGSAP, DrawSVGPlugin)

// Project-wide defaults — matches the diploma's 200–300ms / light easing guidance.
gsap.defaults({ duration: 0.25, ease: 'power2.out' })

export { gsap, useGSAP }
