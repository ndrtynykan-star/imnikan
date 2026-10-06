import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Navbar } from '@/components/layout/Navbar'
import { SearchOverlay } from '@/components/search/SearchOverlay'
import AboutPage from '@/pages/AboutPage'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import ContactPage from '@/pages/ContactPage'
import Favorites from '@/pages/Favorites'
import Home from '@/pages/Home'
import Invest from '@/pages/Invest'
import NotFound from '@/pages/NotFound'
import Properties from '@/pages/Properties'
import PropertyDetail from '@/pages/PropertyDetail'
import { UiProvider } from '@/lib/store'

/** Resets scroll on navigation. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Any route change closes the overlay menu.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <Navbar onOpenMenu={() => setMenuOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
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
