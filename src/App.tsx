import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { MenuOverlay } from '@/components/layout/MenuOverlay'
import { Navbar } from '@/components/layout/Navbar'
import { PromotionalSidebar } from '@/components/layout/PromotionalSidebar'
import { SearchOverlay } from '@/components/search/SearchOverlay'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Properties from '@/pages/Properties'
import PropertyDetail from '@/pages/PropertyDetail'
import ServicesPage from '@/pages/ServicesPage'
import { UiProvider } from '@/lib/store'

/** Resets scroll on navigation — the fixed sidebar keeps its own position. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink">
      <div className="lg:pr-72 xl:pr-80">
        <Navbar onOpenMenu={() => setMenuOpen(true)} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:slug" element={<PropertyDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Tablet/mobile: the promotional panel joins the normal page flow. */}
        <PromotionalSidebar variant="inline" />
        <Footer />
      </div>

      {/* Desktop: the reference's fixed right-hand rail. */}
      <PromotionalSidebar variant="rail" />

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay />
    </div>
  )
}

export default function App() {
  return (
    <UiProvider>
      <ScrollToTop />
      <Shell />
    </UiProvider>
  )
}
