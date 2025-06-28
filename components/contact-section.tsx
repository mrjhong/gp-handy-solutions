"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

interface ContactSectionProps {
  data: any
  colors: any
}

export function ContactSection({ data, colors }: ContactSectionProps) {
  const contactItems = [
    {
      icon: Phone,
      title: "Phone",
      value: data.phone,
      href: `tel:${data.phone}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
    },
    {
      icon: MapPin,
      title: "Address",
      value: data.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(data.address)}`,
    },
    {
      icon: Clock,
      title: "Hours",
      value: data.hours,
      href: null,
    },
  ]

  return (
    <section className="py-20" style={{ backgroundColor: colors.secondary }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contact Us</h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Ready to start your project? Get in touch with us today!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, index) => {
            const IconComponent = item.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <IconComponent className="w-8 h-8" style={{ color: colors.primary }} />
                    </div>
                    <CardTitle style={{ color: colors.secondary }}>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="hover:underline"
                        style={{ color: colors.text }}
                        target={item.title === "Address" ? "_blank" : undefined}
                        rel={item.title === "Address" ? "noopener noreferrer" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: colors.text }}>{item.value}</span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-4">Follow us on social media for updates and project showcases</p>
          <div className="flex justify-center space-x-6">{/* Aquí puedes agregar iconos de redes sociales */}</div>
        </motion.div>
      </div>
    </section>
  )
}
