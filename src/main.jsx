import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/globals.css' // imports fonts.css (self-hosted Manrope) + tokens.css + typography.css
import './i18n/index.js' // init i18next (ru/kz/en) before first render
import App from './app/App.jsx'
import Home from './routes/Home.jsx'
import CatalogTemp from './routes/CatalogTemp.jsx'

// M0–M1 skeleton router. The full route tree (TabLayout/PlainLayout/checkout/...) lands in M5–M7.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'catalog', element: <CatalogTemp /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
