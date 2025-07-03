"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Image from "next/image"

interface AboutSectionProps {
  data: any
  colors: any
}

export function AboutSection({ data, colors }: AboutSectionProps) {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: `${colors.primary}10` }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
              {data.title}
            </h2>

            <p className="text-lg mb-8" style={{ color: colors.text }}>
              {data.description}
            </p>

            <ul className="space-y-4">
              {data.features.map((feature: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span style={{ color: colors.text }}>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <Image src={data.image || "/placeholder.svg"} alt="About us" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
