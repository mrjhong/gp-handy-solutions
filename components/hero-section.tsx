"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

interface HeroSectionProps {
  data: any
  colors: any
}

export function HeroSection({ data, colors }: HeroSectionProps) {
  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: colors.backgroundSecondary }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage || "/placeholder.svg"}
          alt="Hero background"
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* background: 'linear-gradient(90deg,rgba(0, 0, 0, 0.82) 32%, rgba(60, 47, 0, 0.57) 100%)'} */}
        <div className="absolute inset-0" style={{background: `linear-gradient(90deg,rgba(0, 0, 0, 0.82) 32%, color-mix(in srgb, ${colors.primary} 35%, transparent) 100%)`}} />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: colors.primary }}>
            {data.title}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ color: colors.textSecondary }}
          >
            {data.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={scrollToQuote}
              size="lg"
              className="text-lg px-8 py-6"
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
              }}
            >
              {data.ctaText}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
              }}
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Services
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: colors.primary }}>
            <div className="w-1 h-3 rounded-full mt-2 animate-pulse" style={{ backgroundColor: colors.primary }} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
