// Formatting helpers that need the i18n `t` function passed in (kept out of hooks
// so they're usable in non-component code too).

/** size = { value, unit } where unit ∈ ml|l|g|kg|pcs. */
export function formatSize(size, t) {
  if (!size) return ''
  return `${size.value} ${t(`common:unit.${size.unit}`)}`
}

/** ISO datetime -> localized short date. */
export function formatDate(iso, locale = 'ru-RU') {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}
