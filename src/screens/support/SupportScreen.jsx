import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import Section from '../../components/layout/Section.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useToast } from '../../hooks/useToast.js'

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={'faq card' + (open ? ' is-open' : '')}>
      <button className="faq__q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <Icon name={open ? 'minus' : 'plus'} size={18} strokeWidth={2.2} className="faq__chev" />
      </button>
      {open && <p className="faq__a t-body">{a}</p>}
    </div>
  )
}

export default function SupportScreen() {
  const { t } = useTranslation()
  const toast = useToast()
  const [msg, setMsg] = useState('')

  const FAQ = [
    { q: t('support:q1'), a: t('support:a1') },
    { q: t('support:q2'), a: t('support:a2') },
    { q: t('support:q3'), a: t('support:a3') },
  ]

  const send = (e) => {
    e.preventDefault()
    if (!msg.trim()) return
    setMsg('')
    toast(t('support:sentToast'), { tone: 'success' })
  }

  return (
    <>
      <AppHeader back title={t('support:title')} />
      <Page>
        <Section title={t('support:faq')}>
          <div className="faq-list">
            {FAQ.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </Section>

        <Section title={t('support:contact')}>
          <form className="support-form" onSubmit={send}>
            <textarea
              className="input textarea"
              rows={4}
              placeholder={t('support:messagePlaceholder')}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              aria-label={t('support:messagePlaceholder')}
            />
            <Button type="submit" fullWidth>
              {t('support:send')}
            </Button>
          </form>
        </Section>
      </Page>
    </>
  )
}
