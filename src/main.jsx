import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/globals.css' // fonts.css (self-hosted Manrope) + tokens.css + typography.css
import './styles/components.css' // loaded after globals so it can extend the base layer
import './styles/screens.css'
import './i18n/index.js' // init i18next (ru/kz/en) before first render
import { router } from './router/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
