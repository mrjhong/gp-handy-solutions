"use client"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection2 } from "@/components/about-section-2"
import { ContactSection } from "@/components/contact-section"
import { QuoteForm } from "@/components/quote-form"
import { PortfolioSection } from "@/components/portfolio-section"
import { FounderSection } from "@/components/founder-section"
import { getStrapiData } from "@/lib/strapi"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"
import { useEffect, useState, useMemo } from "react"

// Componente de loading
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-6"></div>
      <div className="space-y-2">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
        <p className="text-gray-500">Preparing your content</p>
      </div>
    </div>
  </div>
)

// Componente de error
const ErrorFallback = ({ error, retry }: { error: string; retry: () => void }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center max-w-md mx-auto p-6">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <button
        onClick={retry}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
)

export default function HomePage() {
  const { language, isLoading: langLoading } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Función para cargar datos
  const fetchData = useMemo(() => async (lang: string, attempt: number = 0) => {
    try {
      setIsDataLoading(true)
      setError(null)
      
      console.log('🔄 Fetching data for language:', lang, 'attempt:', attempt + 1)
      
      const strapiData = await getStrapiData(lang)
      
      if (!strapiData) {
        throw new Error('No data received from Strapi')
      }
      
      setData(strapiData)
      console.log('✅ Data loaded successfully for language:', lang)
      
    } catch (error) {
      console.error('❌ Error loading data:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to load content'
      setError(errorMessage)
    } finally {
      setIsDataLoading(false)
    }
  }, [])

  // Cargar datos cuando cambie el idioma
  useEffect(() => {
    if (!langLoading && language) {
      fetchData(language, retryCount)
    }
  }, [language, langLoading, fetchData, retryCount])

  // Función de retry
  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  // Mostrar loading si cualquiera de los estados está cargando
  const isLoading = langLoading || isDataLoading

  // Mostrar loading spinner
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Mostrar error si existe
  if (error) {
    return <ErrorFallback error={error} retry={handleRetry} />
  }

  // Mostrar mensaje si no hay datos
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No content available</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Language Selector - Floating */}
      <LanguageSelector 
        colors={data.siteSettings.colors} 
        variant="floating" 
      />
      
      <main className="min-h-screen">
        <HeroSection data={data.hero} colors={data.siteSettings.colors} />
        <AboutSection2 data={data.about} colors={data.siteSettings.colors} />
        <FounderSection data={data.founder} colors={data.siteSettings.colors} />
        <ServicesSection 
          data={data.services} 
          colors={data.siteSettings.colors} 
          fixedProperties={data.servicesSection}
        />
        <PortfolioSection 
          data={data.portfolio} 
          colors={data.siteSettings.colors} 
          fixedProperties={data.portfolioSection}
        />
        <QuoteForm 
          colors={data.siteSettings.colors} 
          fixedProperties={data.quoteSection} 
        />
        <ContactSection 
          data={data.contact} 
          colors={data.siteSettings.colors}  
          fixedProperties={data.contactSection}
        />
      </main>
    </>
  )
}