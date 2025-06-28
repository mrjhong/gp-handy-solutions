"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Paintbrush, Home, Hammer, Wrench } from "lucide-react"
import Image from "next/image"

const iconMap = {
  Paintbrush,
  Home,
  Hammer,
  Wrench,
}

interface ServicesSectionProps {
  data: any[]
  colors: any
}

export function ServicesSection({ data, colors }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: colors.background }}>
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
          <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.text }}>
            Professional handyman services tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <CardHeader className="text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <IconComponent className="w-8 h-8" style={{ color: colors.primary }} />
                    </div>
                    <CardTitle style={{ color: colors.secondary }}>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                      {service.price}
                    </p>
                    <Button
                      className="w-full"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.background,
                      }}
                      onClick={() => document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
