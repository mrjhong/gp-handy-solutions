"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Paintbrush, 
  Home, 
  Hammer, 
  Wrench, 
  Settings, 
  Shield,
  Sparkles,
  Building2,
  CheckCircle,
  Phone,
  ArrowRight
} from "lucide-react"

const iconMap = {
  Paintbrush,
  Home,
  Hammer,
  Wrench,
  Settings,
  Shield,
  Sparkles,
  Building2,
}

interface AccordionServicesSectionProps {
  data: any
  colors: any
}

export function ServicesSection({ data, colors }: AccordionServicesSectionProps) {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: `${colors.primary}05` }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
            Our Services
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: colors.text }}>
            Comprehensive solutions for your home and business needs. Click to explore each service category.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Residential Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
              <CardHeader 
                className="text-center py-8"
                style={{ backgroundColor: `${colors.primary}10` }}
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Home className="w-8 h-8" style={{ color: colors.background }} />
                  </div>
                  <CardTitle className="text-3xl" style={{ color: colors.secondary }}>
                    {data.residential.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {data.residential.categories.map((category: any, index: number) => {
                    const IconComponent = iconMap[category.icon as keyof typeof iconMap]
                    
                    return (
                      <AccordionItem key={category.name} value={`residential-${index}`}>
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-6 h-6" style={{ color: colors.primary }} />
                            <span className="text-lg font-semibold">{category.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {category.services.map((service: string, serviceIndex: number) => (
                              <div key={serviceIndex} className="flex items-start space-x-3">
                                <CheckCircle 
                                  className="w-5 h-5 mt-0.5 flex-shrink-0" 
                                  style={{ color: colors.accent }} 
                                />
                                <span style={{ color: colors.text }} className="text-sm">
                                  {service}
                                </span>
                              </div>
                            ))}
                          </div>
                          <Button
                            className="mt-4"
                            style={{
                              backgroundColor: colors.primary,
                              color: colors.background,
                            }}
                            onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                          >
                            Get Quote for {category.name}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cleaning Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl" style={{ color: colors.secondary }}>
                    {data.cleaning.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {data.cleaning.services.map((service: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle 
                        className="w-5 h-5 mt-0.5 flex-shrink-0" 
                        style={{ color: colors.accent }} 
                      />
                      <span style={{ color: colors.text }}>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.background,
                    }}
                    onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Request Cleaning Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commercial Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl" style={{ color: colors.secondary }}>
                    {data.commercial.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {data.commercial.services.map((service: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle 
                        className="w-5 h-5 mt-0.5 flex-shrink-0" 
                        style={{ color: colors.accent }} 
                      />
                      <span style={{ color: colors.text }}>
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.background,
                    }}
                    onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Commercial Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency Services Banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div 
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: colors.background }}>
                    Emergency Services Available
                  </h3>
                  <p className="text-lg" style={{ color: colors.background }}>
                    Need immediate assistance? We offer same-day and emergency services.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 flex items-center gap-2 whitespace-nowrap"
                  style={{
                    borderColor: colors.background,
                    color: colors.background,
                  }}
                  onClick={() => window.open(`tel:${data.contact?.emergencyContact || '(555)123-4568'}`, '_self')}
                >
                  <Phone className="w-5 h-5" />
                  Emergency Line
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}