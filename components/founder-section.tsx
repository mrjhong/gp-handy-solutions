"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

interface FounderSectionProps {
  data: any
  colors: any
}

export function FounderSection({ data, colors }: FounderSectionProps) {
  return (
    <section className="py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.secondary }}>
                {data.title}
              </h2>
              <h3 className="text-2xl font-semibold mb-6" style={{ color: colors.primary }}>
                {data.name}
              </h3>
              <p className="text-lg mb-6" style={{ color: colors.text }}>
                {data.subtitle}
              </p>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <div className="relative">
                <Quote 
                  className="absolute -top-2 -left-2 w-8 h-8 opacity-20" 
                  style={{ color: colors.primary }} 
                />
                <div className="text-lg leading-relaxed pl-6 prose prose-lg max-w-none" style={{ color: colors.text }}>
                  <div className="[&>p]:mb-4 [&>p]:leading-relaxed">
                    <BlocksRenderer content={data.story}/>
                  </div>
                </div>
              </div>

              <div className="text-lg leading-relaxed prose prose-lg max-w-none" style={{ color: colors.text }}>
                <div className="[&>p]:mb-4 [&>p]:leading-relaxed">
                  <BlocksRenderer content={data.motivation} />
                </div>
              </div>

              <div 
                className="p-6 rounded-lg border-l-4"
                style={{ 
                  backgroundColor: `${colors.primary}10`,
                  borderLeftColor: colors.primary 
                }}
              >
                <p className="text-lg font-medium" style={{ color: colors.secondary }}>
                  {data.philosophy}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <button
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.background,
                }}
              >
                {data.buttonText || "Work with Gina"}
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={data.image} 
                  alt={`${data.name} - Founder of GP Handy Solutions`}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay with gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                />
                
                {/* Quote overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm font-medium" style={{ color: colors.secondary }}>
                      "No limits, only results!"
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.text }}>
                      - {data.name}, Founder
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20"
                style={{ backgroundColor: colors.primary }}
              />
              <div 
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-20"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}