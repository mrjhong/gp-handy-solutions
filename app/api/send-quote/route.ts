import { type NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'
import EmailTemplate from "@/components/emailTemplate"

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY)
const emailFrom = process.env.EMAIL_FROM
const emailCenter = process.env.EMAIL_CENTER

// Traducciones para el API
const translations = {
  es: {
    required: "Todos los campos son obligatorios",
    invalidEmail: "Formato de email inválido",
    success: "Cotización enviada exitosamente. Te contactaremos pronto.",
    error: "Error al enviar la cotización. Por favor intenta nuevamente.",
    newQuote: "🔔 Nueva Cotización",
    actionRequired: "⚡ ACCIÓN REQUERIDA: Nuevo cliente requiere cotización",
    clientInfo: "Información del Cliente",
    fullName: "NOMBRE COMPLETO",
    phone: "TELÉFONO",
    service: "SERVICIO",
    budget: "PRESUPUESTO",
    projectDescription: "📋 Descripción del Proyecto:",
    recommendedActions: "Acciones Recomendadas:",
    contactText: "Contacta al cliente dentro de las próximas 2 horas para mejor conversión",
    callNow: "📞 Llamar Ahora",
    sendEmail: "✉️ Enviar Email",
    tip: "💡 Tip: Los clientes que reciben respuesta en las primeras 2 horas tienen 60% más probabilidad de contratar el servicio.",
    services: {
      residential: "Servicios Residenciales",
      cleaning: "Servicios de Limpieza",
      commercial: "Servicios Comerciales",
      other: "Otros Servicios"
    }
  },
  en: {
    required: "All fields are required",
    invalidEmail: "Invalid email format",
    success: "Quote sent successfully. We will contact you soon.",
    error: "Error sending quote. Please try again.",
    newQuote: "🔔 New Quote Request",
    actionRequired: "⚡ ACTION REQUIRED: New client requires quote",
    clientInfo: "Client Information",
    fullName: "FULL NAME",
    phone: "PHONE",
    service: "SERVICE",
    budget: "BUDGET",
    projectDescription: "📋 Project Description:",
    recommendedActions: "Recommended Actions:",
    contactText: "Contact the client within the next 2 hours for better conversion",
    callNow: "📞 Call Now",
    sendEmail: "✉️ Send Email",
    tip: "💡 Tip: Clients who receive a response in the first 2 hours are 60% more likely to hire the service.",
    services: {
      residential: "Residential Services",
      cleaning: "Cleaning Services",
      commercial: "Commercial Services",
      other: "Other Services"
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, description,  language = 'es' } = body
    const t = translations[language as keyof typeof translations] || translations.es
    // Validación básica
    if (!name || !email || !phone || !service || !description) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" }, 
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Formato de email inválido" }, 
        { status: 400 }
      )
    }

    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Mapear los servicios a nombres más amigables
    const serviceName = t.services[service as keyof typeof t.services] || service

    // Preparar las props para el template
     const emailProps = {
      nombredinamico: name,
      servicio: serviceName,
      detalleservicio: description,
      numero: phone,
      correo: email,
      fecha: currentDate,
      language: language as 'es' | 'en'
    }

    // Enviar email al cliente usando el template de React
    const clientEmailResponse = await resend.emails.send({
      from: `GP Handy Solutions <${emailFrom}>`,
      to: [email],
      cc: emailCenter,
      subject: language === 'es' 
        ? '✅ Cotización Recibida - GP Handy Solutions LLC'
        : '✅ Quote Received - GP Handy Solutions LLC',
      react: EmailTemplate(emailProps), // Pasar las props aquí
    })

   

    console.log('✅ Emails enviados:', {
      client: clientEmailResponse
    })

    return NextResponse.json({ 
      success: true,
      message: "Cotización enviada exitosamente. Te contactaremos pronto.",
      emailIds: {
        client: clientEmailResponse.data?.id,
      }
    })

  } catch (error: any) {
    console.error("❌ Error sending emails:", error)
    
    return NextResponse.json({ 
      error: "Error al enviar la cotización. Por favor intenta nuevamente.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { 
      status: 500 
    })
  }
}