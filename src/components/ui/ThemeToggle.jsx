import { useUiStore } from '../../store/useUiStore.js'
import Icon from './Icon.jsx'

// Light/dark toggle. Icon reflects the *resolved* theme.
export default function ThemeToggle() {
  const resolved = useUiStore((s) => s.resolvedTheme)
  const toggle = useUiStore((s) => s.toggleTheme)
  const isDark = resolved === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
      title={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={20} />
    </button>
  )
}
