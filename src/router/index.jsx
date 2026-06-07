import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../app/App.jsx'
import RootBoot from './RootBoot.jsx'
import ErrorScreen from './ErrorScreen.jsx'
import TabLayout from './TabLayout.jsx'
import PlainLayout from './PlainLayout.jsx'

// First-run
import OnboardingScreen from '../screens/onboarding/OnboardingScreen.jsx'
import LanguageSelectScreen from '../screens/language/LanguageSelectScreen.jsx'
import AuthStubScreen from '../screens/auth/AuthStubScreen.jsx'

// Tabs
import HomeScreen from '../screens/home/HomeScreen.jsx'
import CatalogScreen from '../screens/catalog/CatalogScreen.jsx'
import FarmersScreen from '../screens/farmers/FarmersScreen.jsx'
import CartScreen from '../screens/cart/CartScreen.jsx'
import ProfileScreen from '../screens/profile/ProfileScreen.jsx'
import SettingsScreen from '../screens/profile/SettingsScreen.jsx'
import FavoritesScreen from '../screens/favorites/FavoritesScreen.jsx'
import OrderHistoryScreen from '../screens/order/OrderHistoryScreen.jsx'

// Detail / flow (outside tab bar)
import ProductDetailScreen from '../screens/catalog/ProductDetailScreen.jsx'
import FarmerDetailScreen from '../screens/farmers/FarmerDetailScreen.jsx'
import CheckoutLayout from '../screens/checkout/CheckoutLayout.jsx'
import Step1Fulfillment from '../screens/checkout/Step1Fulfillment.jsx'
import Step2Where from '../screens/checkout/Step2Where.jsx'
import Step3Payment from '../screens/checkout/Step3Payment.jsx'
import Step4Confirm from '../screens/checkout/Step4Confirm.jsx'
import OrderStatusScreen from '../screens/order/OrderStatusScreen.jsx'
import SupportScreen from '../screens/support/SupportScreen.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: <RootBoot /> },

      // Screens outside the tab bar
      {
        element: <PlainLayout />,
        children: [
          { path: 'onboarding', element: <OnboardingScreen /> },
          { path: 'language', element: <LanguageSelectScreen /> },
          { path: 'auth', element: <AuthStubScreen /> },
          { path: 'product/:productId', element: <ProductDetailScreen /> },
          { path: 'farmers/:farmerId', element: <FarmerDetailScreen /> },
          {
            path: 'checkout',
            element: <CheckoutLayout />,
            children: [
              { index: true, element: <Navigate to="fulfillment" replace /> },
              { path: 'fulfillment', element: <Step1Fulfillment /> },
              { path: 'where', element: <Step2Where /> },
              { path: 'payment', element: <Step3Payment /> },
              { path: 'confirm', element: <Step4Confirm /> },
            ],
          },
          { path: 'orders/:orderId', element: <OrderStatusScreen /> },
          { path: 'support', element: <SupportScreen /> },
        ],
      },

      // Screens with the bottom tab bar
      {
        element: <TabLayout />,
        children: [
          { path: 'home', element: <HomeScreen /> },
          { path: 'catalog', element: <CatalogScreen /> },
          { path: 'farmers', element: <FarmersScreen /> },
          { path: 'cart', element: <CartScreen /> },
          { path: 'profile', element: <ProfileScreen /> },
          { path: 'profile/settings', element: <SettingsScreen /> },
          { path: 'favorites', element: <FavoritesScreen /> },
          { path: 'orders', element: <OrderHistoryScreen /> },
        ],
      },
    ],
  },
])
