"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isLoading: boolean
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traducciones estáticas para elementos de UI
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services', 
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'btn.getQuote': 'Get Quote',
    'btn.callNow': 'Call Now',
    'btn.emergency': 'Emergency',
    'btn.viewMore': 'View More',
    'btn.backToTop': 'Back to Top',
    'btn.workWith': 'Work with',
    'btn.requestQuote': 'Request Quote',
    'btn.getDirections': 'Get Directions',
    'btn.startProject': 'Start Your Project Today',
    'form.name': 'Full Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.service': 'Service Needed',
    'form.budget': 'Budget Range',
    'form.description': 'Project Description',
    'form.message': 'Message',
    'form.send': 'Send Quote Request',
    'form.sending': 'Sending...',
    'form.required': 'Required field',
    'form.selectService': 'Select a service',
    'form.selectBudget': 'Select budget range',
    'form.placeholder.description': 'Please describe your project in detail...',
    'services.painting': 'Painting Services',
    'services.flooring': 'Flooring Installation', 
    'services.carpentry': 'Carpentry Work',
    'services.repairs': 'Small Repairs',
    'services.cleaning': 'Cleaning Services',
    'services.commercial': 'Commercial Services',
    'services.getQuote': 'Get Quote',
    'services.emergency': 'Emergency Services Available',
    'services.emergencyDesc': 'Need immediate assistance? We offer same-day and emergency services.',
    'services.emergencyCall': 'Emergency Line',
    'portfolio.title': 'Our Work',
    'portfolio.description': 'See the quality and craftsmanship in our completed projects',
    'portfolio.all': 'All',
    'portfolio.beforeAfter': 'Before/After',
    'about.title': 'Who We Are',
    'about.mission': 'Our Mission',
    'about.promise': 'Our Promise', 
    'about.philosophy': 'Our Philosophy',
    'about.joinCustomers': 'Join Our Satisfied Customers',
    'about.testimonial': 'GP Handy Solutions transformed our home with their professional service and attention to detail. Gina and her team exceeded our expectations in every way!',
    'about.customer': 'Happy Customer',
    'founder.meetFounder': 'Meet the Founder',
    'footer.followUs': 'Follow Us',
    'footer.quickLinks': 'Quick Links',
    'footer.contactInfo': 'Contact Info',
    'footer.businessHours': 'Business Hours',
    'footer.languages': 'Languages',
    'footer.copyright': 'All rights reserved',
    'footer.licensed': 'Licensed • Insured • Woman-Owned Business',
    'footer.mainLine': 'Main Line',
    'footer.emergency24': '24/7 Emergency',
    'footer.sendEmail': 'Send us an email',
    'footer.getDirections': 'Get directions',
    'footer.emergencyService': 'Emergency: 24/7',
    'contact.getInTouch': 'Get In Touch',
    'contact.readyToStart': 'Ready to start your project? We\'re here to help you bring your vision to life.',
    'contact.ourLocation': 'Our Location',
    'contact.quickPayment': 'Quick Payment',
    'contact.existingCustomers': 'For existing customers or quick payments',
    'contact.payWithPayPal': 'Pay with PayPal',
    'contact.whyChoose': 'Why Choose Us?',
    'contact.freeEstimates': 'Free estimates',
    'contact.licensedInsured': 'Licensed & insured',
    'contact.responseTime': '24-hour response time',
    'contact.satisfaction': 'Satisfaction guaranteed',
    'hero.getQuote': 'Get Your Free Quote',
    'hero.quoteDescription': 'Tell us about your project and we\'ll provide a detailed estimate',
    'meta.description': 'Professional handyman services led by a woman. Painting, flooring, carpentry, and repairs. No limits, only results!',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio', 
    'nav.contact': 'Contacto',
    'btn.getQuote': 'Obtener Cotización',
    'btn.callNow': 'Llamar Ahora',
    'btn.emergency': 'Emergencia',
    'btn.viewMore': 'Ver Más',
    'btn.backToTop': 'Volver Arriba',
    'btn.workWith': 'Trabajar con',
    'btn.requestQuote': 'Solicitar Cotización',
    'btn.getDirections': 'Obtener Direcciones',
    'btn.startProject': 'Comience Su Proyecto Hoy',
    'form.name': 'Nombre Completo',
    'form.email': 'Correo Electrónico',
    'form.phone': 'Teléfono',
    'form.service': 'Servicio Necesario',
    'form.budget': 'Rango de Presupuesto',
    'form.description': 'Descripción del Proyecto',
    'form.message': 'Mensaje',
    'form.send': 'Enviar Solicitud de Cotización',
    'form.sending': 'Enviando...',
    'form.required': 'Campo requerido',
    'form.selectService': 'Seleccionar un servicio',
    'form.selectBudget': 'Seleccionar rango de presupuesto',
    'form.placeholder.description': 'Por favor describa su proyecto en detalle...',
    'services.painting': 'Servicios de Pintura',
    'services.flooring': 'Instalación de Pisos',
    'services.carpentry': 'Trabajo de Carpintería',
    'services.repairs': 'Reparaciones Menores',
    'services.cleaning': 'Servicios de Limpieza',
    'services.commercial': 'Servicios Comerciales',
    'services.getQuote': 'Obtener Cotización',
    'services.emergency': 'Servicios de Emergencia Disponibles',
    'services.emergencyDesc': '¿Necesita asistencia inmediata? Ofrecemos servicios de emergencia y el mismo día.',
    'services.emergencyCall': 'Línea de Emergencia',
    'portfolio.title': 'Nuestro Trabajo',
    'portfolio.description': 'Vea la calidad y artesanía en nuestros proyectos completados',
    'portfolio.all': 'Todos',
    'portfolio.beforeAfter': 'Antes/Después',
    'about.title': 'Quiénes Somos',
    'about.mission': 'Nuestra Misión',
    'about.promise': 'Nuestra Promesa',
    'about.philosophy': 'Nuestra Filosofía',
    'about.joinCustomers': 'Únase a Nuestros Clientes Satisfechos',
    'about.testimonial': 'GP Handy Solutions transformó nuestro hogar con su servicio profesional y atención al detalle. ¡Gina y su equipo superaron nuestras expectativas en todos los sentidos!',
    'about.customer': 'Cliente Satisfecho',
    'founder.meetFounder': 'Conoce a la Fundadora',
    'footer.followUs': 'Síguenos',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactInfo': 'Información de Contacto',
    'footer.businessHours': 'Horarios de Atención',
    'footer.languages': 'Idiomas',
    'footer.copyright': 'Todos los derechos reservados',
    'footer.licensed': 'Licenciados • Asegurados • Empresa de Mujeres',
    'footer.mainLine': 'Línea Principal',
    'footer.emergency24': 'Emergencia 24/7',
    'footer.sendEmail': 'Envíanos un email',
    'footer.getDirections': 'Obtener direcciones',
    'footer.emergencyService': 'Emergencia: 24/7',
    'contact.getInTouch': 'Póngase en Contacto',
    'contact.readyToStart': '¿Listo para comenzar su proyecto? Estamos aquí para ayudarle a hacer realidad su visión.',
    'contact.ourLocation': 'Nuestra Ubicación',
    'contact.quickPayment': 'Pago Rápido',
    'contact.existingCustomers': 'Para clientes existentes o pagos rápidos',
    'contact.payWithPayPal': 'Pagar con PayPal',
    'contact.whyChoose': '¿Por Qué Elegirnos?',
    'contact.freeEstimates': 'Estimaciones gratuitas',
    'contact.licensedInsured': 'Licenciados y asegurados',
    'contact.responseTime': 'Tiempo de respuesta de 24 horas',
    'contact.satisfaction': 'Satisfacción garantizada',
    'hero.getQuote': 'Obtenga Su Cotización Gratuita',
    'hero.quoteDescription': 'Cuéntanos sobre tu proyecto y te proporcionaremos una estimación detallada',
    'meta.description': 'Servicios profesionales de reparaciones liderados por una mujer. Pintura, pisos, carpintería y reparaciones. ¡Sin límites, solo resultados!',
  }
}

// Función para detectar el idioma del navegador
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language || navigator.languages[0]
  return browserLang.startsWith('es') ? 'es' : 'en'
}

// Función para obtener el idioma guardado
const getSavedLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const saved = localStorage.getItem('preferred-language')
    return saved === 'en' || saved === 'es' ? saved : null
  } catch (error) {
    console.warn('Error accessing localStorage:', error)
    return null
  }
}

// Función para guardar el idioma
const saveLanguage = (language: Language): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('preferred-language', language)
  } catch (error) {
    console.warn('Error saving to localStorage:', error)
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isLoading, setIsLoading] = useState(true)

  // Inicializar idioma
  useEffect(() => {
    const initializeLanguage = () => {
      const savedLanguage = getSavedLanguage()
      const browserLanguage = detectBrowserLanguage()
      
      // Prioridad: idioma guardado > idioma del navegador > inglés por defecto
      const initialLanguage = savedLanguage || browserLanguage
      
      console.log('🌍 Language initialization:', {
        saved: savedLanguage,
        browser: browserLanguage,
        selected: initialLanguage
      })
      
      setLanguageState(initialLanguage)
      
      // Si no había idioma guardado, guardar el seleccionado
      if (!savedLanguage) {
        saveLanguage(initialLanguage)
      }
      
      setIsLoading(false)
    }

    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(initializeLanguage, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Función para cambiar idioma
  const changeLanguage = useCallback((newLang: Language) => {
    if (newLang === language) {
      console.log('🌍 Language already set to:', newLang)
      return
    }

    console.log('🌍 Changing language from', language, 'to', newLang)
    
    setLanguageState(newLang)
    saveLanguage(newLang)
    
    // Mostrar notificación de cambio
    const message = newLang === 'es' 
      ? 'Idioma cambiado a Español' 
      : 'Language changed to English'
    
    console.log('✅', message)
    
    // Opcional: Mostrar toast de notificación
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('language-changed', { 
        detail: { language: newLang, message } 
      }))
    }
  }, [language])

  // Función de traducción
  const t = useCallback((key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[typeof language]]
    
    if (!translation) {
      console.warn(`🔍 Translation missing for key: ${key} in language: ${language}`)
      return key
    }
    
    return translation
  }, [language])

  const value = {
    language,
    setLanguage: changeLanguage,
    isLoading,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}