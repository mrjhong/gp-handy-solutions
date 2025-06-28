import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { QuoteForm } from "@/components/quote-form"
import { PortfolioSection } from "@/components/portfolio-section"
import { getStrapiData } from "@/lib/strapi"

export default async function HomePage() {
  const data = await getStrapiData()

  return (
    <main className="min-h-screen">
      <HeroSection data={data.hero} colors={data.siteSettings.colors} />
      <ServicesSection data={data.services} colors={data.siteSettings.colors} />
      <AboutSection data={data.about} colors={data.siteSettings.colors} />
      <PortfolioSection data={data.portfolio} colors={data.siteSettings.colors} />
      <QuoteForm colors={data.siteSettings.colors} />
      <ContactSection data={data.contact} colors={data.siteSettings.colors} />
    </main>
  )
}
