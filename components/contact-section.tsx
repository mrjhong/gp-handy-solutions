"use client"

import { motion } from "framer-motion"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  PhoneCall,
  MessageCircle,
  Star,
  ArrowUp
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface FooterContactSectionProps {
  data: any
  colors: any
}

export function ContactSection({ data, colors }: FooterContactSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative" style={{ backgroundColor: colors.secondary }}>
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info & Logo */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="mb-6">
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Image 
                      src="/logo.png" 
                      alt="GP Handy Solutions"
                      width={47}
                      height={47}
                      className="filter"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      GP Handy Solutions
                    </h3>
                    <p className="text-sm" style={{ color: colors.primary }}>
                      LLC
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  Professional handyman services led by a woman who believes there are no limits, only results.
                </p>

                <div className="flex space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-300 ml-2">5.0 Rating</span>
                </div>

                <p className="text-lg font-semibold" style={{ color: colors.primary }}>
                  "No Limits, Only Results!"
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', href: '#about' },
                  { name: 'Our Services', href: '#services' },
                  { name: 'Portfolio', href: '#portfolio' },
                  { name: 'Get Quote', href: '#quote-form' },
                  { name: 'Emergency Services', href: 'tel:' + (data.emergencyContact || '(555)123-4568') }
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault()
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      <span className="w-1 h-1 rounded-full group-hover:w-2 transition-all duration-300" style={{ backgroundColor: colors.primary }} />
                      <span>{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.open(`tel:${data.phone}`, '_self')}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Phone className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{data.phone}</p>
                    <p className="text-gray-400 text-sm">Main Line</p>
                  </div>
                </div>

                {/* Emergency */}
                <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.open(`tel:${data.emergencyContact || '(555)123-4568'}`, '_self')}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500/20 group-hover:scale-110 transition-transform duration-300">
                    <PhoneCall className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{data.emergencyContact || '(555) 123-4568'}</p>
                    <p className="text-gray-400 text-sm">24/7 Emergency</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.open(`mailto:${data.email}`, '_self')}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${colors.accent}20` }}
                  >
                    <Mail className="w-5 h-5" style={{ color: colors.accent }} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{data.email}</p>
                    <p className="text-gray-400 text-sm">Send us an email</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(data.address)}`, '_blank')}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{data.address}</p>
                    <p className="text-gray-400 text-sm">Get directions</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Hours & Social */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Business Hours</h4>
              
              <div className="flex items-start space-x-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  <Clock className="w-5 h-5" style={{ color: colors.accent }} />
                </div>
                <div>
                  <p className="text-white font-medium">{data.hours}</p>
                  <p className="text-gray-400 text-sm">Emergency: 24/7</p>
                </div>
              </div>

              {/* Languages */}
              {data.languages && (
                <div className="mb-6">
                  <p className="text-white font-medium mb-2">Languages:</p>
                  <p className="text-gray-300">{data.languages.join(' • ')}</p>
                </div>
              )}

              {/* Social Media */}
              <div>
                <p className="text-white font-medium mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: '#', color: '#1877f2' },
                    { icon: Instagram, href: '#', color: '#e4405f' },
                    { icon: Twitter, href: '#', color: '#1da1f2' },
                    { icon: MessageCircle, href: `https://wa.me/${data.phone.replace(/\D/g, '')}`, color: '#25d366' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors duration-300"
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © {currentYear} GP Handy Solutions LLC. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Licensed • Insured • Woman-Owned Business
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              
              {/* Back to Top */}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}