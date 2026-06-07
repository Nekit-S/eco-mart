import { useTranslation } from 'react-i18next'
import AppHeader from '../../components/layout/AppHeader.jsx'
import Page from '../../components/layout/Page.jsx'
import FarmerCard from '../../components/farmer/FarmerCard.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { useLang } from '../../hooks/useLang.js'
import { getFarmers, localizeList } from '../../data/index.js'

export default function FarmersScreen() {
  const { t } = useTranslation()
  const lng = useLang()
  const farmers = localizeList(getFarmers(), lng)

  return (
    <>
      <AppHeader title={t('farmer:title')} />
      <Page>
        <div className="farmer-list">
          {farmers.map((f) => (
            <div key={f.id} className="farmer-list__item">
              {f.farmerOfWeek && (
                <div className="farmer-list__tag">
                  <Badge tone="accent">⭐ {t('farmer:ofWeek')}</Badge>
                </div>
              )}
              <FarmerCard farmer={f} />
            </div>
          ))}
        </div>
      </Page>
    </>
  )
}
