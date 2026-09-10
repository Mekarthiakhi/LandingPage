import './index.css'
import { useLenis } from './hooks/useLenis'
import CustomCursor from './components/CustomCursor'
import PageTransition from './components/PageTransition'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectStats from './components/ProjectStats'
import StorySection from './components/StorySection'
import ArchitectureSection from './components/ArchitectureSection'
import ResidenceSelector from './components/ResidenceSelector'
import AmenitiesSection from './components/AmenitiesSection'
import GreensSection from './components/GreensSection'
import LocationSection from './components/LocationSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  useLenis()

  return (
    <>
      {/* Infrastructure */}
      <PageTransition />
      <ScrollProgress />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <ProjectStats />
        <StorySection />
        <ArchitectureSection />
        <ResidenceSelector />
        <AmenitiesSection />
        <GreensSection />
        <LocationSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </>
  )
}

export default App
