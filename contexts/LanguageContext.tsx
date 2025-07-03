"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // Detectar idioma del navegador o localStorage
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    const browserLanguage = navigator.language.startsWith('es') ? 'es' : 'en'
    
    setLanguage(savedLanguage || browserLanguage)
  }, [])

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang)
    localStorage.setItem('preferred-language', newLang)
    
    // Opcional: recargar la página para aplicar cambios
    window.location.reload()
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      t 
    }}>
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