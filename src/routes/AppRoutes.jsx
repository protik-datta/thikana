import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import RouteFallback from '@/components/common/RouteFallback'

const Home = lazy(() => import('@/pages/Home'))
const Properties = lazy(() => import('@/pages/Properties'))
const PropertyDetails = lazy(() => import('@/pages/PropertyDetails'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const Compare = lazy(() => import('@/pages/Compare'))
const Locations = lazy(() => import('@/pages/Locations'))
const LocationDetail = lazy(() => import('@/pages/Locations/LocationDetail'))
const Agents = lazy(() => import('@/pages/Agents'))
const AgentProfile = lazy(() => import('@/pages/Agents/AgentProfile'))
const Sell = lazy(() => import('@/pages/Sell'))
const MortgageCalculator = lazy(() => import('@/pages/Mortgage'))
const AccountLayout = lazy(() => import('@/pages/Account/AccountLayout'))
const AccountProfile = lazy(() => import('@/pages/Account/AccountProfile'))
const AccountInquiries = lazy(() => import('@/pages/Account/AccountInquiries'))
const AccountViewings = lazy(() => import('@/pages/Account/AccountViewings'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const FAQ = lazy(() => import('@/pages/FAQ'))
const Guides = lazy(() => import('@/pages/Guides'))
const GuideArticle = lazy(() => import('@/pages/Guides/GuideArticle'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function S({ children }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

function PropertiesRoute({ transaction }) {
  return (
    <S>
      <Properties transaction={transaction} />
    </S>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Home */}
        <Route index element={<S><Home /></S>} />

        {/* Properties */}
        <Route path="properties" element={<PropertiesRoute />} />
        <Route path="buy" element={<PropertiesRoute transaction="sale" />} />
        <Route path="rent" element={<PropertiesRoute transaction="rent" />} />
        <Route path="properties/:slug" element={<S><PropertyDetails /></S>} />

        {/* Phase 5 — Favorites + Comparison */}
        <Route path="favorites" element={<S><Favorites /></S>} />
        <Route path="compare" element={<S><Compare /></S>} />

        {/* Phase 6 — Business features */}
        <Route path="locations" element={<S><Locations /></S>} />
        <Route path="locations/:slug" element={<S><LocationDetail /></S>} />
        <Route path="agents" element={<S><Agents /></S>} />
        <Route path="agents/:slug" element={<S><AgentProfile /></S>} />
        <Route path="sell" element={<S><Sell /></S>} />

        {/* Phase 7 — Tools + Account + Static pages */}
        <Route path="mortgage-calculator" element={<S><MortgageCalculator /></S>} />
        <Route path="account" element={<S><AccountLayout /></S>}>
          <Route index element={<AccountProfile />} />
          <Route path="inquiries" element={<AccountInquiries />} />
          <Route path="viewings" element={<AccountViewings />} />
        </Route>
        <Route path="guides" element={<S><Guides /></S>} />
        <Route path="guides/:slug" element={<S><GuideArticle /></S>} />
        <Route path="about" element={<S><About /></S>} />
        <Route path="contact" element={<S><Contact /></S>} />
        <Route path="faq" element={<S><FAQ /></S>} />

        {/* 404 */}
        <Route path="404" element={<S><NotFound /></S>} />
        <Route path="*" element={<S><NotFound /></S>} />
      </Route>
    </Routes>
  )
}
