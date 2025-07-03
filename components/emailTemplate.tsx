import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
  Link,
} from '@react-email/components';

interface EmailTemplateProps {
  nombredinamico: string;
  servicio: string;
  detalleservicio: string;
  numero: string;
  correo: string;
  presupuesto?: string;
  fecha: string;
  language?: 'es' | 'en'; // Nuevo prop para el idioma
}

// Traducciones del email
const translations = {
  es: {
    preview: "Hemos recibido tu solicitud de cotización - Te contactaremos pronto",
    requestReceived: "¡Solicitud Recibida!",
    thankYou: "Gracias por confiar en nosotros",
    hello: "Hola",
    receivedRequest: "Hemos recibido tu solicitud de cotización para el servicio de",
    serviceDetails: "Detalles del servicio:",
    teamReview: "Nuestro equipo revisará tu solicitud y nos pondremos en contacto contigo muy pronto a través de:",
    phone: "📞 Teléfono:",
    email: "✉️ Correo:",
    questions: "Mientras tanto, si tienes alguna pregunta adicional, no dudes en contactarnos.",
    thanksForTrust: "¡Gracias por tu confianza!",
    teamName: "El equipo de GP Handy Solutions",
    nextSteps: "Próximos pasos:",
    step1: "Revisaremos tu solicitud en detalle",
    step2: "Te contactaremos dentro de las próximas 24 horas",
    step3: "Programaremos una visita si es necesario",
    step4: "Te enviaremos una cotización detallada y gratuita",
    summary: "📋 Resumen de tu solicitud:",
    service: "Servicio:",
    budget: "Presupuesto:",
    description: "🔧 Descripción de tu proyecto:",
    contactInfo: "Información de Contacto",
    mainLine: "LÍNEA PRINCIPAL",
    emergencyLine: "EMERGENCIAS",
    companyEmail: "EMAIL",
    tagline: "Licenciados • Asegurados • Empresa Liderada por Mujeres",
    automaticMessage: "Este es un mensaje automático de confirmación.",
    copyright: "© 2025 GP Handy Solutions LLC. Todos los derechos reservados.",
    noLimits: '"Sin Límites, Solo Resultados!"'
  },
  en: {
    preview: "We have received your quote request - We will contact you soon",
    requestReceived: "Quote Request Received!",
    thankYou: "Thank you for trusting us",
    hello: "Hello",
    receivedRequest: "We have received your quote request for the service of",
    serviceDetails: "Service details:",
    teamReview: "Our team will review your request and contact you very soon through:",
    phone: "📞 Phone:",
    email: "✉️ Email:",
    questions: "In the meantime, if you have any additional questions, don't hesitate to contact us.",
    thanksForTrust: "Thank you for your trust!",
    teamName: "The GP Handy Solutions team",
    nextSteps: "Next steps:",
    step1: "We will review your request in detail",
    step2: "We will contact you within the next 24 hours",
    step3: "We will schedule a visit if necessary",
    step4: "We will send you a detailed and free quote",
    summary: "📋 Summary of your request:",
    service: "Service:",
    budget: "Budget:",
    description: "🔧 Description of your project:",
    contactInfo: "Contact Information",
    mainLine: "MAIN LINE",
    emergencyLine: "EMERGENCY",
    companyEmail: "EMAIL",
    tagline: "Licensed • Insured • Woman-Led Business",
    automaticMessage: "This is an automatic confirmation message.",
    copyright: "© 2025 GP Handy Solutions LLC. All rights reserved.",
    noLimits: '"No Limits, Only Results!"'
  }
};

const EmailTemplate = (props: EmailTemplateProps) => {
  const storageUrl = process.env.NEXT_PUBLIC_URL_FE || 'https://gp-handysolutions.com';
  const lang = props.language || 'es'; // Default a español
  const t = translations[lang]; // Obtener traducciones para el idioma
  
  return (
    <Html lang={lang} dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{t.preview}</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="mx-auto bg-white rounded-[12px] shadow-lg overflow-hidden max-w-[600px]">
            
            {/* Header con gradiente morado */}
            <Section className="bg-gradient-to-r from-purple-600 to-purple-800 px-[40px] py-[32px] text-center">
              <Heading className="text-white text-[28px] font-bold m-0 mb-[8px]">
                {t.requestReceived}
              </Heading>
              <Text className="text-purple-600 text-[16px] m-0 mb-[4px]">
                GP Handy Solutions LLC
              </Text>
              <Text className="text-purple-400 text-[14px] m-0 font-semibold">
                {t.noLimits}
              </Text>
            </Section>

            {/* Logo de la empresa */}
            <Section className="px-[40px] py-[20px] text-center">
              <img
                src={`${storageUrl}/logo.png`}
                alt="GP Handy Solutions Logo"
                className="w-[120px] mx-auto"
              />
            </Section>

            {/* Contenido principal */}
            <Section className="px-[40px] py-[32px]">
              <Text className="text-gray-800 text-[18px] font-semibold mb-[24px] mt-0">
                {t.hello} {props.nombredinamico},
              </Text>
              
              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[20px] mt-0">
                {t.receivedRequest} <strong className="text-purple-700">{props.servicio}</strong> {lang === 'es' ? 'el' : 'on'} {props.fecha}.
              </Text>

              {/* Resumen de la solicitud */}
              <Section className="bg-purple-50 border border-purple-200 p-[20px] mb-[24px] rounded-[8px]">
                <Text className="text-purple-800 text-[16px] font-semibold m-0 mb-[16px]">
                  {t.summary}
                </Text>
                
                <div className="space-y-[8px]">
                  <div className="flex justify-between items-center border-b border-purple-200 pb-[8px]">
                    <Text className="text-purple-700 text-[14px] font-medium m-0">{t.service}</Text>
                    <Text className="text-purple-900 text-[14px] font-semibold m-0">{props.servicio}</Text>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-purple-200 pb-[8px]">
                    <Text className="text-purple-700 text-[14px] font-medium m-0">{t.phone.replace('📞 ', '')}</Text>
                    <Text className="text-purple-900 text-[14px] font-semibold m-0">{props.numero}</Text>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-purple-200 pb-[8px]">
                    <Text className="text-purple-700 text-[14px] font-medium m-0">{t.email.replace('✉️ ', '')}</Text>
                    <Text className="text-purple-900 text-[14px] font-semibold m-0">{props.correo}</Text>
                  </div>
                  
                  {props.presupuesto && props.presupuesto !== 'No especificado' && props.presupuesto !== 'Not specified' && (
                    <div className="flex justify-between items-center border-b border-purple-200 pb-[8px]">
                      <Text className="text-purple-700 text-[14px] font-medium m-0">{t.budget}</Text>
                      <Text className="text-purple-900 text-[14px] font-semibold m-0">{props.presupuesto}</Text>
                    </div>
                  )}
                </div>
              </Section>

              {/* Detalles del proyecto */}
              <Section className="bg-pink-50 border-l-[4px] border-pink-400 p-[20px] mb-[24px] rounded-r-[8px]">
                <Text className="text-pink-800 text-[14px] font-semibold m-0 mb-[8px]">
                  {t.description}
                </Text>
                <Text className="text-pink-700 text-[14px] m-0 leading-[20px] whitespace-pre-wrap">
                  {props.detalleservicio}
                </Text>
              </Section>

              {/* Próximos pasos */}
              <Section className="bg-green-50 border border-green-200 p-[20px] mb-[24px] rounded-[8px]">
                <Text className="text-green-800 text-[16px] font-semibold m-0 mb-[12px]">
                  ✅ {t.nextSteps}
                </Text>
                <ul className="text-green-700 text-[14px] leading-[20px] m-0 pl-[20px] space-y-[4px]">
                  <li>{t.step1}</li>
                  <li>{t.step2}</li>
                  <li>{t.step3}</li>
                  <li>{t.step4}</li>
                </ul>
              </Section>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[24px] mt-0">
                {t.questions}
              </Text>

              <Text className="text-gray-800 text-[16px] font-semibold mb-[8px] mt-0">
                {t.thanksForTrust}
              </Text>
              <Text className="text-purple-700 text-[16px] font-semibold m-0">
                {t.teamName}
              </Text>
            </Section>

            <Hr className="border-gray-200 mx-[40px]" />

            {/* Información de contacto
            <Section className="px-[40px] py-[24px] bg-gray-800 text-white">
              <Text className="text-purple-400 text-[18px] font-bold text-center m-0 mb-[16px]">
                GP Handy Solutions LLC
              </Text>
              
              <div className="flex justify-center gap-[30px] mb-[20px] flex-wrap">
                <div className="text-center">
                  <Text className="text-purple-400 text-[12px] font-semibold m-0 mb-[4px]">{t.mainLine}</Text>
                  <Text className="text-white text-[14px] m-0">(555) 123-4567</Text>
                </div>
                <div className="text-center">
                  <Text className="text-purple-400 text-[12px] font-semibold m-0 mb-[4px]">{t.companyEmail}</Text>
                  <Text className="text-white text-[14px] m-0">info@gphandysolutions.com</Text>
                </div>
                <div className="text-center">
                  <Text className="text-purple-400 text-[12px] font-semibold m-0 mb-[4px]">{t.emergencyLine}</Text>
                  <Text className="text-white text-[14px] m-0">(555) 123-4568</Text>
                </div>
              </div>
              
              <Text className="text-gray-300 text-[14px] text-center m-0 mb-[8px]">
                {t.tagline}
              </Text>
            </Section> */}

            {/* Footer */}
            <Section className="px-[40px] py-[16px] bg-gray-50">
              <Text className="text-gray-500 text-[12px] text-center leading-[16px] m-0 mb-[4px]">
                {t.automaticMessage}
              </Text>
              <Text className="text-gray-500 text-[12px] text-center leading-[16px] m-0">
                {t.copyright}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Props para preview en desarrollo
EmailTemplate.PreviewProps = {
  nombredinamico: "María González",
  servicio: "Servicios Residenciales",
  detalleservicio: "Necesito pintar mi sala y cocina. Son aproximadamente 40 metros cuadrados. Me gustaría que incluya la pintura y la mano de obra. Prefiero colores neutros como beige o gris claro.",
  numero: "+1 (555) 123-4567",
  correo: "maria.gonzalez@email.com",
  presupuesto: "$1,000 - $2,500",
  fecha: "3 de julio de 2025, 14:30",
  language: "es"
};

export default EmailTemplate;