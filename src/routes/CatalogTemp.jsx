// Temporary M0 route. Its only job: prove client-side routing + the Vercel SPA rewrite
// (a hard refresh on /catalog must NOT 404). Replaced by the real CatalogScreen in M6.
export default function CatalogTemp() {
  return (
    <section>
      <h1>Каталог</h1>
      <p>
        Если эта страница открылась после прямого перехода на <code>/catalog</code> и
        переживает перезагрузку (F5) — SPA-роутинг и rewrite на Vercel работают.
      </p>
    </section>
  )
}
