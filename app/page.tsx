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
import { useEffect, useState } from "react"




export default function HomePage() {
  const { language } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      console.log('🔄 Fetching data for language:', language)
      
      try {
        const strapiData = await getStrapiData(language)
        setData(strapiData)
      } catch (error) {
        console.error('❌ Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [language]) // Recargar cuando cambie el idioma

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading...</p>
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
      <ServicesSection data={data.services} colors={data.siteSettings.colors} fixedProperties={data.servicesSection}/>
      <PortfolioSection data={data.portfolio} colors={data.siteSettings.colors} fixedProperties={data.portfolioSection}/>
      <QuoteForm colors={data.siteSettings.colors} fixedProperties= {data.quoteSection} />
      <ContactSection data={data.contact} colors={data.siteSettings.colors}  fixedProperties={data.contactSection}/>
    </main>
    </>
  )
}
