import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import CallExpertProvider from '@/modules/call/components/CallExpertProvider'
import HomeBodyClient from '@/modules/home/components/HomeBodyClient'

/**
 * Server shell: hero/nav/footer stay outside the below-fold client chunk.
 */
export default function HomePage({ services, faqs, catalogError = null }) {
  return (
    <CallExpertProvider>
      <Navbar />
      <main id="main-content" className="overflow-x-clip">
        <HeroSection />
        <HomeBodyClient
          services={services}
          faqs={faqs}
          catalogError={catalogError}
        />
      </main>
      <Footer />
    </CallExpertProvider>
  )
}
