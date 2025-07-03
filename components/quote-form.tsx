"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Send, Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext" // Importar el hook de idioma

interface QuoteFormProps {
  colors: any
  fixedProperties?: any
}

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  description: string
}

interface FormErrors {
  [key: string]: string
}

export function QuoteForm({ colors, fixedProperties }: QuoteFormProps) {
  const { language } = useLanguage() // Obtener idioma actual
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const { toast } = useToast()

  // Traducciones para validación según el idioma
  const validationMessages = {
    es: {
      nameRequired: "El nombre es obligatorio",
      nameMin: "El nombre debe tener al menos 2 caracteres",
      emailRequired: "El email es obligatorio",
      emailInvalid: "Formato de email inválido",
      phoneRequired: "El teléfono es obligatorio",
      phoneInvalid: "Formato de teléfono inválido",
      serviceRequired: "Selecciona un servicio",
      descriptionRequired: "La descripción es obligatoria",
      descriptionMin: "La descripción debe tener al menos 10 caracteres",
      formErrors: "Errores en el formulario",
      formErrorsDesc: "Por favor corrige los errores antes de enviar"
    },
    en: {
      nameRequired: "Name is required",
      nameMin: "Name must be at least 2 characters",
      emailRequired: "Email is required",
      emailInvalid: "Invalid email format",
      phoneRequired: "Phone is required",
      phoneInvalid: "Invalid phone format",
      serviceRequired: "Select a service",
      descriptionRequired: "Description is required",
      descriptionMin: "Description must be at least 10 characters",
      formErrors: "Form errors",
      formErrorsDesc: "Please correct the errors before submitting"
    }
  }

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const messages = validationMessages[language]

    if (!formData.name.trim()) {
      newErrors.name = messages.nameRequired
    } else if (formData.name.trim().length < 2) {
      newErrors.name = messages.nameMin
    }

    if (!formData.email.trim()) {
      newErrors.email = messages.emailRequired
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = messages.emailInvalid
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = messages.phoneRequired
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = messages.phoneInvalid
      }
    }

    if (!formData.service) {
      newErrors.service = messages.serviceRequired
    }

    if (!formData.description.trim()) {
      newErrors.description = messages.descriptionRequired
    } else if (formData.description.trim().length < 10) {
      newErrors.description = messages.descriptionMin
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      const messages = validationMessages[language]
      toast({
        title: messages.formErrors,
        description: messages.formErrorsDesc,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          ...formData,
          language: language // Enviar el idioma actual
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar la cotización')
      }

      // Éxito
      setIsSuccess(true)
      toast({
        title: language === 'es' 
          ? "¡Cotización enviada exitosamente!" 
          : "Quote sent successfully!",
        description: language === 'es'
          ? "Te contactaremos dentro de las próximas 24 horas."
          : "We will contact you within the next 24 hours.",
      })

      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          description: "",
        })
        setIsSuccess(false)
      }, 3000)

    } catch (error: any) {
      console.error('Error:', error)
      toast({
        title: language === 'es' ? "Error al enviar" : "Error sending",
        description: error.message || (language === 'es' 
          ? "Hubo un problema al enviar tu cotización. Inténtalo nuevamente."
          : "There was a problem sending your quote. Please try again."),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handlePayPal = () => {
    window.open(fixedProperties.linkPayPal, "_blank")
  }

  // Mostrar estado de éxito
  if (isSuccess) {
    return (
      <section id="quote-form" className="py-20" style={{ backgroundColor: colors.background }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                {language === 'es' ? "¡Cotización Enviada!" : "Quote Sent!"}
              </h2>
              
              <p className="text-lg text-green-700 mb-6">
                {language === 'es' 
                  ? "Gracias por confiar en nosotros. Hemos recibido tu solicitud y te contactaremos dentro de las próximas 24 horas."
                  : "Thank you for trusting us. We have received your request and will contact you within the next 24 hours."
                }
              </p>
              
              <div className="bg-white rounded-lg p-6 border border-green-200">
                <p className="text-sm text-green-600 mb-2">
                  {language === 'es'
                    ? "📧 También te hemos enviado un email de confirmación a:"
                    : "📧 We have also sent you a confirmation email to:"
                  }
                </p>
                <p className="font-semibold text-green-800">{formData.email}</p>
              </div>
              
              <p className="text-sm text-green-600 mt-4">
                {language === 'es' 
                  ? "Redirigiendo en unos segundos..."
                  : "Redirecting in a few seconds..."
                }
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="py-20" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.secondary }}>
            {fixedProperties?.title || (language === 'es' ? "Obtén Tu Cotización Gratuita" : "Get Your Free Quote")}
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: colors.text }}>
            {fixedProperties?.subtitle || (language === 'es' 
              ? "Cuéntanos sobre tu proyecto y te proporcionaremos una estimación detallada"
              : "Tell us about your project and we'll provide a detailed estimate"
            )}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: colors.secondary }}>
                    {fixedProperties?.formText || (language === 'es' ? "Solicitar Cotización" : "Request Quote")}
                  </CardTitle>
                  <CardDescription>
                    {language === 'es'
                      ? "Completa todos los campos para recibir tu cotización personalizada"
                      : "Complete all fields to receive your personalized quote"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">
                          {fixedProperties?.formFields?.name || (language === 'es' ? "Tu Nombre" : "Your Name")} *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder={language === 'es' ? "Ej: Juan Pérez" : "Ex: John Smith"}
                          className={errors.name ? "border-red-500" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">
                          {fixedProperties?.formFields?.email || (language === 'es' ? "Tu Email" : "Your Email")} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder={language === 'es' ? "juan@ejemplo.com" : "john@example.com"}
                          className={errors.email ? "border-red-500" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">
                          {fixedProperties?.formFields?.phone || (language === 'es' ? "Tu Teléfono" : "Your Phone")} *
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className={errors.phone ? "border-red-500" : ""}
                          disabled={isSubmitting}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="service">
                          {language === 'es' ? "Servicio Necesario" : "Service Needed"} *
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => handleInputChange('service', value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                            <SelectValue placeholder={language === 'es' ? "Selecciona un servicio" : "Select a service"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">
                              {fixedProperties?.formFields?.serviceOptions?.residential || 
                               (language === 'es' ? "Servicios Residenciales" : "Residential Services")}
                            </SelectItem>
                            <SelectItem value="cleaning">
                              {fixedProperties?.formFields?.serviceOptions?.cleaning || 
                               (language === 'es' ? "Servicios de Limpieza" : "Cleaning Services")}
                            </SelectItem>
                            <SelectItem value="commercial">
                              {fixedProperties?.formFields?.serviceOptions?.commercial || 
                               (language === 'es' ? "Servicios Comerciales" : "Commercial Services")}
                            </SelectItem>
                            <SelectItem value="other">
                              {fixedProperties?.formFields?.serviceOptions?.other || 
                               (language === 'es' ? "Otro" : "Other")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.service && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.service}
                          </p>
                        )}
                      </div>
                    </div>

                   

                    <div>
                      <Label htmlFor="description">
                        {fixedProperties?.formFields?.description || 
                         (language === 'es' ? "Descripción del Proyecto" : "Project Description")} *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder={fixedProperties?.formFields?.descriptionPlaceholder || 
                          (language === 'es' 
                            ? "Por favor describe tu proyecto en detalle..."
                            : "Please describe your project in detail..."
                          )}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className={errors.description ? "border-red-500" : ""}
                        disabled={isSubmitting}
                        maxLength={500}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.description}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.description.length}/500 {language === 'es' ? 'caracteres' : 'characters'}
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full flex items-center justify-center"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: isSubmitting ? '#9ca3af' : colors.primary,
                        color: colors.background,
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {fixedProperties?.formFields?.buttonQuoteSending || 
                           (language === 'es' ? "Enviando..." : "Sending...")}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {fixedProperties?.formFields?.buttonQuote || 
                           (language === 'es' ? "Solicitar Cotización" : "Request Quote")}
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      {language === 'es'
                        ? "Al enviar este formulario, recibirás un email de confirmación y nos pondremos en contacto contigo dentro de 24 horas."
                        : "By submitting this form, you will receive a confirmation email and we will contact you within 24 hours."
                      }
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: colors.secondary }}>
                    {fixedProperties?.paysection?.title || 
                     (language === 'es' ? "Pago Rápido" : "Quick Payment")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4" style={{ color: colors.text }}>
                    {fixedProperties?.paysection?.subtitle || 
                     (language === 'es' 
                       ? "Para clientes existentes o pagos rápidos"
                       : "For existing customers or quick payments"
                     )}
                  </p>
                  <Button
                    onClick={handlePayPal}
                    className="w-full"
                    style={{
                      backgroundColor: "#0070ba",
                      color: "white",
                    }}
                  >
                    {fixedProperties?.paysection?.buttonText || 
                     (language === 'es' ? "Pagar con PayPal" : "Pay with PayPal")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ color: colors.secondary }}>
                    {fixedProperties?.whychooseUs?.title || 
                     (language === 'es' ? "¿Por Qué Elegirnos?" : "Why Choose Us?")}
                  </CardTitle>
                  <CardDescription style={{ color: colors.text }}>
                    {fixedProperties?.whychooseUs?.subtitle || 
                     (language === 'es'
                       ? "Ofrecemos más que servicios, brindamos tranquilidad."
                       : "We offer more than just services—we deliver peace of mind."
                     )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {(fixedProperties?.whychooseUs?.features || [
                      language === 'es' ? "Profesionales licenciados y asegurados" : "Licensed and insured professionals",
                      language === 'es' ? "Trabajo de calidad con atención al detalle" : "Quality workmanship with attention to detail", 
                      language === 'es' ? "Precios competitivos y cotizaciones transparentes" : "Competitive pricing and transparent quotes"
                    ]).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                        <span style={{ color: colors.text }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h4 className="font-bold text-purple-800 mb-2">
                      🎯 {language === 'es' ? "Respuesta Garantizada" : "Guaranteed Response"}
                    </h4>
                    <p className="text-purple-700 text-sm">
                      {language === 'es'
                        ? "Te contactaremos dentro de las próximas 24 horas para discutir tu proyecto y programar una visita si es necesario."
                        : "We will contact you within the next 24 hours to discuss your project and schedule a visit if necessary."
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}