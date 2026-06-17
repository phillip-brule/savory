import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import { CartBar } from './components/cart/CartBar'
import { CartPanel } from './components/cart/CartPanel'
import { Hero } from './components/home/Hero'
import { NeonQuote } from './components/home/NeonQuote'
import { AboutSection } from './components/home/AboutSection'
import { MenuSection } from './components/menu/MenuSection'
import { CateringSection } from './components/catering/CateringSection'
import { ContactSection } from './components/contact/ContactSection'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NeonQuote />
        <MenuSection />
        <CateringSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <CartBar />
      <CartPanel />
      <WhatsAppFab />
    </>
  )
}

export default App
