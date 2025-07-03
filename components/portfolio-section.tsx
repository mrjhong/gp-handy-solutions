"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

interface Project {
  id: number
  title: string
  description: string
  category: string
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  beforeImage?: string
  afterImage?: string
}

interface PortfolioSectionProps {
  data: Project[]
  colors: any
  fixedProperties: any
}

export function PortfolioSection({ data, colors, fixedProperties}: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const allTag = fixedProperties.allTag || "All"
  const [filter, setFilter] = useState("All")
  const [currentIndex, setCurrentIndex] = useState(0)
  console.log('PortfolioSection data:', fixedProperties)
  const categories = ['All', ...Array.from(new Set(data.map(project => project.category)))]
  
  const filteredProjects = filter === 'All'
    ? data 
    : data.filter(project => project.category === filter)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentIndex(filteredProjects.findIndex(p => p.id === project.id))
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  const nextProject = () => {
    const nextIndex = (currentIndex + 1) % filteredProjects.length
    setCurrentIndex(nextIndex)
    setSelectedProject(filteredProjects[nextIndex])
  }

  const prevProject = () => {
    const prevIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedProject(filteredProjects[prevIndex])
  }

  return (
    <>
      <section  id="portfolio" className="py-20" style={{ backgroundColor: `${colors.primary}10` }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
              {fixedProperties ? fixedProperties.title : "Our Work"}
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8" style={{ color: colors.text }}>
              {fixedProperties.subtitle || "Explore our portfolio of completed projects"}
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className="capitalize"
                  style={{
                    backgroundColor: filter === category ? colors.primary : 'transparent',
                    borderColor: colors.primary,
                    color: filter === category ? colors.background : colors.primary,
                  }}
                >
                  {category === 'All' ? allTag : category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden cursor-pointer group" onClick={() => openModal(project)}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.thumbnail || project.src}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Video Play Button */}
                    {project.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${colors.primary}90` }}
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Before/After Indicator */}
                    {project.beforeImage && project.afterImage && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        Before/After
                      </div>
                    )}

                    {/* Category Badge */}
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.background 
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.secondary }}>
                      {project.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.text }}>
                      {Array.isArray(project.description) ? (
                        <BlocksRenderer content={project.description} />
                      ) : (
                        <span>{project.description}</span>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Content */}
            <div className="relative">
              {selectedProject.type === 'video' ? (
                <video
                  src={selectedProject.src}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              ) : selectedProject.beforeImage && selectedProject.afterImage ? (
                /* Before/After Images */
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={selectedProject.beforeImage}
                      alt={`${selectedProject.title} - Before`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                      Before
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src={selectedProject.afterImage}
                      alt={`${selectedProject.title} - After`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
                      After
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={selectedProject.src}
                  alt={selectedProject.title}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              )}

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${colors.accent}20`,
                      color: colors.accent 
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} of {filteredProjects.length}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.secondary }}>
                  {selectedProject.title}
                </h3>
                <p style={{ color: colors.text }}>
                  {Array.isArray(selectedProject.description) ? (
                    <BlocksRenderer content={selectedProject.description} />
                  ) : (
                    <span>{selectedProject.description}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}