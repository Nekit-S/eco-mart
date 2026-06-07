import { useEffect, useRef, useState } from 'react'
import { useUiStore } from '../../store/useUiStore.js'

// Floating stopwatch for demos — lets the presenter time scenario 1 (≤60s) and
// scenario 4 (≤30s) live. Toggled in Profile → Settings. Renders nothing when off.
export default function DemoTimer() {
  const enabled = useUiStore((s) => s.demoTimer)
  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)
  const startRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!running) return
    const tick = () => {
      setMs(Date.now() - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  if (!enabled) return null

  const start = () => {
    startRef.current = Date.now() - ms
    setRunning(true)
  }
  const stop = () => setRunning(false)
  const reset = () => {
    setRunning(false)
    setMs(0)
  }

  const sec = (ms / 1000).toFixed(1)

  return (
    <div className="demo-timer" role="timer" aria-label="Секундомер демо">
      <span className="demo-timer__val">{sec}s</span>
      <button onClick={running ? stop : start} aria-label={running ? 'Стоп' : 'Старт'}>
        {running ? '⏸' : '▶'}
      </button>
      <button onClick={reset} aria-label="Сброс">↺</button>
    </div>
  )
}
