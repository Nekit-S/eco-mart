import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Register the useGSAP plugin once for the whole app.
gsap.registerPlugin(useGSAP)

// Project-wide defaults — matches the diploma's 200–300ms / light easing guidance.
gsap.defaults({ duration: 0.25, ease: 'power2.out' })

export { gsap, useGSAP }
