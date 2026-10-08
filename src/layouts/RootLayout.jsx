import { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/common/PageTransition'
import RouteFallback from '@/components/common/RouteFallback'
import ScrollToTop from '@/components/common/ScrollToTop'
import CompareBar from '@/components/property/CompareBar'

export default function RootLayout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-control focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            <Suspense fallback={<RouteFallback />}>
              {outlet}
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <CompareBar />
    </div>
  )
}
