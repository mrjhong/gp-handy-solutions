"use client"

import { motion } from "framer-motion"
import { Check, Target, Heart, Award } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

interface EnhancedAboutSectionProps {
  data: any
  colors: any
}

export function AboutSection2({ data, colors }: EnhancedAboutSectionProps) {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: `${colors.primary}10` }}>
      <div className="container mx-auto px-4">
        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
              {data.title}
            </h2>
            <p className="text-lg mb-6" style={{ color: colors.text }}>
              {data.subtitle}
            </p>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.text }}>
              <BlocksRenderer content = {data.description}/>
              
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

        {/* Mission, Vision, Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${colors.primary}20` }}
                >
                  <Target className="w-8 h-8" style={{ color: colors.primary }} />
                </div>
                <CardTitle className="text-2xl" style={{ color: colors.secondary }}>
                  {data.titleMission || "Our Mission"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center leading-relaxed" style={{ color: colors.text }}>
                  <BlocksRenderer content = {data.mission}/>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  <Heart className="w-8 h-8" style={{ color: colors.accent }} />
                </div>
                <CardTitle className="text-2xl" style={{ color: colors.secondary }}>
                  {data.titlePromise || "Our Value Proposition"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center leading-relaxed" style={{ color: colors.text }}>
                   <BlocksRenderer content = {data.valueProposition}/>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${colors.secondary}20` }}
                >
                  <Award className="w-8 h-8" style={{ color: colors.secondary }} />
                </div>
                <CardTitle className="text-2xl" style={{ color: colors.secondary }}>
                  {data.titlePhilosophy || "Our Philosophy"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                    {data.subtitlePhilosophy || '"No Limits, Only Results!"'}
                  </p>
                  <p className="leading-relaxed" style={{ color: colors.text }}>
                    {data.descriptionPhilosophy}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

       
      </div>
    </section>
  )
}