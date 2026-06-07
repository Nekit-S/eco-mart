// Line-icon set (24×24, stroke = currentColor). Replaces emoji across the app for a
// consistent, branded look (diploma §3.1: thin line icons). Filled variants set fill.

const P = {
  // ===== Navigation / UI =====
  home: <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20v-7" />
      <path d="M12 13c0-3 2-5 6-5 0 3-2 5-6 5z" />
      <path d="M12 14c0-2.5-1.8-4.5-5-4.5 0 2.6 1.9 4.5 5 4.5z" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11.5a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.78L21 8H6.5" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  heart: (
    <path d="M12 20.4C12 20.4 3.6 14.8 3.6 9 C3.6 6.2 5.8 4.1 8.4 4.1 C10.1 4.1 11.4 5 12 6.2 C12.6 5 13.9 4.1 15.6 4.1 C18.2 4.1 20.4 6.2 20.4 9 C20.4 14.8 12 20.4 12 20.4 Z" />
  ),
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" />,
  pin: (
    <>
      <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.3 2.5 13.7 0 16M12 4c-2.5 2.3-2.5 13.7 0 16" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </>
  ),
  moon: <path d="M20 13.5A8 8 0 1 1 10.5 4 6.5 6.5 0 0 0 20 13.5z" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5a7 7 0 0 0 .1-1z" />
    </>
  ),
  chat: <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1z" />,
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 21z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13z" />
      <path d="M9 15c2.5-2.5 5-4 8-4.8" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>
  ),
  store: (
    <>
      <path d="M4 9 5.6 4.5h12.8L20 9" />
      <path d="M4 9h16v2.2a2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0z" />
      <path d="M5.2 12.6V20h13.6v-7.4" />
      <path d="M10 20v-4.2h4V20" />
    </>
  ),
  cash: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9.5h18M6.5 14.5h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  repeat: (
    <>
      <path d="M4 9a6 6 0 0 1 10-3l2 2M20 15a6 6 0 0 1-10 3l-2-2" />
      <path d="M16 4v4h-4M8 20v-4h4" />
    </>
  ),
  spark: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  alert: (
    <>
      <path d="M12 4 21.5 20H2.5z" />
      <path d="M12 10v4M12 17v.01" />
    </>
  ),

  // ===== Products / categories =====
  cup: (
    <>
      <path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M16 9h2.5a2 2 0 0 1 0 4H16" />
      <path d="M8 3.5c-.6.8-.6 1.7 0 2.5M11.5 3.5c-.6.8-.6 1.7 0 2.5" />
    </>
  ),
  croissant: (
    <>
      <path d="M4.5 16c0-4 3.2-6.8 7.5-6.8S19.5 12 19.5 16c-2.3-.8-4.6-1.2-7.5-1.2S6.8 15.2 4.5 16z" />
      <path d="M9 11 8.3 14.7M12 10.4v4.3M15 11l.8 3.8" />
    </>
  ),
  bread: (
    <>
      <path d="M5 13a4 4 0 0 1 .8-6.4C7 5.7 9 5.5 12 5.5s5 .2 6.2 1.1A4 4 0 0 1 19 13l-1 5.5H6z" />
      <path d="M10 9.5 9 13M14 9.5 13 13" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7z" />
      <path d="M4 14h16M12 10V6" />
      <circle cx="12" cy="4.5" r="1" />
    </>
  ),
  cookie: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9.5" cy="10" r="1" />
      <circle cx="14" cy="9.5" r="1" />
      <circle cx="13.5" cy="14.5" r="1" />
      <circle cx="9" cy="14.5" r="1" />
    </>
  ),
  cheese: (
    <>
      <path d="M3 16 14 6l7 4v6z" />
      <circle cx="9" cy="13.5" r="1" />
      <circle cx="14" cy="13" r="1" />
      <circle cx="17.5" cy="13.5" r=".9" />
    </>
  ),
  honey: (
    <>
      <path d="M7 9h10l-1 11H8z" />
      <path d="M7 9 6 5h12l-1 4" />
      <path d="M12 13v4" />
    </>
  ),
  jar: (
    <>
      <rect x="6" y="8" width="12" height="13" rx="2" />
      <path d="M8 8V5h8v3M6 12h12" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 3h4v3l1.5 2.5A3 3 0 0 1 16 10v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9a3 3 0 0 1 .5-1.5L10 6z" />
      <path d="M8 13h8" />
    </>
  ),
  butter: (
    <>
      <path d="M4 13 14 8l6 3-10 5z" />
      <path d="M4 13v3l6 3 10-5v-3" />
    </>
  ),
  bowl: (
    <>
      <path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z" />
      <path d="M8 11c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" />
      <path d="M12 4.5v1.8" />
    </>
  ),
  pancake: (
    <>
      <ellipse cx="12" cy="9" rx="7" ry="2.5" />
      <path d="M5 9v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V9" />
      <path d="M5 12.5v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" />
    </>
  ),
  bean: (
    <>
      <ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(35 12 12)" />
      <path d="M10 7c1.5 2.5 1.5 7.5 0 10" />
    </>
  ),
  berry: (
    <>
      <circle cx="10" cy="14" r="3.2" />
      <circle cx="14.5" cy="12.5" r="3.2" />
      <path d="M12 8c0-2 1-3.5 3-4" />
    </>
  ),
  basket: (
    <>
      <path d="M4 9h16l-1.5 10.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z" />
      <path d="M8 9 11 4M16 9 13 4M4 9h16M9 13v3M15 13v3" />
    </>
  ),
}

export default function Icon({ name, size = 24, filled = false, strokeWidth = 1.8, className = '', style }) {
  const inner = P[name]
  if (!inner) return null
  return (
    <svg
      className={['icon', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {inner}
    </svg>
  )
}
