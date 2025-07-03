
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:1337'

async function fetchAPI(endpoint: string, locale: string = 'en') {
  // Construir URL con locale
  const separator = endpoint.includes('?') ? '&' : '?'
  if (locale.includes('es')) {
    locale = 'es-CO'
  }
  const url = `${STRAPI_URL}/api${endpoint}${separator}locale=${locale}`
  
  console.log('🌍 Fetching from Strapi:', url) // Debug log
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  

  try {
    const res = await fetch(url, { headers })
    
    if (!res.ok) {
      console.error(`❌ Strapi fetch failed: ${res.status} ${res.statusText}`)
      throw new Error(`Failed to fetch ${endpoint}: ${res.status}`)
    }
    
    const data = await res.json()
    console.log(`✅ Strapi response for ${endpoint}:`, data) // Debug log
    return data
  } catch (error) {
    console.error('❌ Strapi fetch error:', error)
    throw error
  }
}

export async function getStrapiData(locale: string = 'en') {
  console.log('🚀 Getting Strapi data for locale:', locale)
  
  try {
    const [
      siteSettings,
      heroSection,
      about,
      founder,
      services,
      serviceSection,
      portfolio,
      contact,
      quote
    ] = await Promise.all([
      fetchAPI('/site-setting?populate=*'),
      fetchAPI('/hero-section?populate=*', locale),
      fetchAPI('/about?populate=*', locale),
      fetchAPI('/founder?populate=*', locale),
      fetchAPI('/services?populate=*', locale),
      fetchAPI('/service-section?populate=*', locale),
      fetchAPI('/portfolios?populate=*', locale),
      fetchAPI('/contact?populate=*', locale),
      fetchAPI('/quote-section?populate=*')
    ])


    // Transform the data to match your frontend structure
    return {
      siteSettings: {
        colors: {
          primary: siteSettings.data?.primaryColor || "#a855f7",
          secondary: siteSettings.data?.secondaryColor || "#1f2937",
          accent: siteSettings.data?.accentColor || "#10b981",
          background: siteSettings.data?.backgroundColor || "#ffffff",
          text: siteSettings.data?.textColor || "#111827",
          textSecondary: siteSettings.data?.textSecondaryColor || "#ffffff",
          backgroundSecondary: siteSettings.data?.backgroundSecondaryColor || "rgb(142, 142, 142)",
        },
        logo: siteSettings.data?.logo?.url || "logo.png",
        isMultilingual: siteSettings.data?.attributes?.isMultilingual || true,
      },
      hero: {
        title: heroSection.data?.title || "GP Handy Solutions LLC",
        subtitle: heroSection.data?.subtitle || "No limits, only results",
        description: heroSection.data?.description || "We're a woman-led handyman team offering comprehensive home improvement services.",
        backgroundImage: STORAGE_URL + heroSection.data?.backgroundImage?.url || "https://i.insider.com/61fd9496fa4f1f00182620d3?width=700",
        ctaText: heroSection.data?.ctaText || "Get Free Quote",
        servicesButton: heroSection.data?.servicesButton || "View Services",
      },
      about: {
        title: about.data?.title || "Who We Are",
        subtitle: about.data?.subtitle || "More than just a service company",
        description: about.data?.description || "",
        mission: about.data?.mission || "",
        valueProposition: about.data?.valueProposition || "",
        features: about.data?.features || [],
        image: STORAGE_URL + about.data?.image?.url || "",
        titleMission: about.data?.titleMission || "Our Mission",
        titlePromise: about.data?.titlePromise || "Our Value Proposition",
        titlePhilosophy: about.data?.titlePhilosophy || "Our Philosophy",
        subtitlePhilosophy: about.data?.subtitlePhilosophy || '"No Limits, Only Results!"',
        descriptionPhilosophy: about.data?.descriptionPhilosophy || "We believe that with the right approach, determination, and expertise, any challenge can become an opportunity for excellence.",

      },
      founder: {
        name: founder.data?.name || "Gina",
        title: founder.data?.title || "Founder & Lead Technician",
        subtitle: founder.data?.subtitle || "An empowered woman who believes there are no limits, only solutions",
        story: founder.data?.story || "",
        motivation: founder.data?.motivation || "",
        philosophy: founder.data?.philosophy || "",
        image: STORAGE_URL +  founder.data?.image?.url || "",
        buttonText: founder.data?.buttonText || "Work with Gina",
      },
      services: {
        residential: {
          title: locale.includes('en') ? "Residential Services": "Servicios Residenciales",
          categories: services.data?.filter((service: any) => service.category === 'residential').map((service: any) => ({
            name: service.name,
            icon: service.icon,
            services: service.services
          })) || []
        },
        cleaning: {
          title: locale.includes('en') ? "Cleaning Services" : "Servicios de Limpieza",
          services: services.data?.find((service: any) => service.category === 'cleaning')?.services || []
        },
        commercial: {
          title: locale.includes('en') ? "Commercial Services" : "Servicios Comerciales",
          services: services.data?.find((service: any) => service.category === 'commercial')?.services || []
        }
      },
      servicesSection: {
        title: serviceSection.data?.title || "Our Services",
        subtitle: serviceSection.data?.subtitleService || "Comprehensive handyman solutions for every need Comprehensive solutions for your home and business needs. Click to explore each service category.",
        getQuote: serviceSection.data?.getQuote || "Get Quote for",
        contactSectionTitle: locale.includes('en') ? "ContactUs for your Quote" : "Contáctenos para su Cotización",
        contactSectionSubtitle:  locale.includes('en') ? "Need assistance? Call our line" : "¿Necesita ayuda? Llame a nuestra línea",
        contactSectionButton: locale.includes('en') ? "Call Now" : "Llamar Ahora",
      },
      portfolio: portfolio.data?.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        type: item.type,
        src: STORAGE_URL + item.src?.url,
        thumbnail: STORAGE_URL + item.thumbnail?.url,
        beforeImage: STORAGE_URL + item.beforeImage?.url,
        afterImage: STORAGE_URL + item.afterImage?.url,
      })) || [],
      portfolioSection: {
        title: locale.includes('en') ? "Our Work" : "Nuestro Trabajo",
        subtitle: locale.includes('en') ? "Explore our portfolio of completed projects" : "Explore nuestro portafolio de proyectos completados", 
        allTag : locale.includes('en') ? "All" : "Todos",
      },
      quoteSection: {
        title: locale.includes('en') ? "Get Your Free Quote" : "Obtenga su Cotización Gratuita",
        subtitle: locale.includes('en') ? "Tell us about your project and we'll provide a detailed estimate" : "Cuéntenos su proyecto y le haremos un presupuesto detallado",
        formText: locale.includes('en') ? "Request Quote" : "Solicitar Cotización",
        formFields: {
          name: locale.includes('en') ? "Your Name" : "Su Nombre",
          email: locale.includes('en') ? "Your Email" : "Su Correo Electrónico",
          phone: locale.includes('en') ? "Your Phone" : "Su Teléfono",
          message: locale.includes('en') ? "Your Message" : "Su Mensaje",
          service: locale.includes('en') ? "Service Needed" : "Servicio Necesario",
          serviceOptions: {
            residential: locale.includes('en') ? "Residential Services" : "Servicios Residenciales",
            cleaning: locale.includes('en') ? "Cleaning Services" : "Servicios de Limpieza",
            commercial: locale.includes('en') ? "Commercial Services" : "Servicios Comerciales",
            other: locale.includes('en') ? "Other" : "Otro",
          },
          
          description: locale.includes('en') ? "Additional Information" : "Información Adicional",
          descriptionPlaceholder: locale.includes('en') ? "Please describe your project in detail..." : "Por favor, describa su proyecto en detalle...",
          buttonQuote: locale.includes('en') ? "Request Quote" : "Solicitar Cotización",
          buttonQuoteSending: locale.includes('en') ? "Sending" : "Enviando",
        },
        paysection: {
          title: locale.includes('en') ? "Quick Payment" : "Pago Rápido",
          subtitle: locale.includes('en') ? "For existing customers or quick payments" : "Para clientes existentes o pagos rápidos",
          buttonText: locale.includes('en') ? "Pay whit PayPal" : "Pagar con PayPal",
          linkPayPal: quote.data?.linkPayPal || "https://www.paypal.com/paypalme/gphandysolution"
        },
        whychooseUs: {
          title: locale.includes('en') ? "Why Choose Us?" : "¿Por Qué Elegirnos?",
          subtitle: locale.includes('en') ? "We offer more than just services—we deliver peace of mind." : "Ofrecemos más que servicios, brindamos tranquilidad.",
          features: [
            locale.includes('en') ? "Licensed and insured professionals" : "Profesionales licenciados y asegurados",
            locale.includes('en') ? "Quality workmanship with attention to detail" : "Trabajo de calidad con atención al detalle",
            locale.includes('en') ? "Competitive pricing and transparent quotes" : "Precios competitivos y cotizaciones transparentes",
          ]
        }
      },
      contact: {
        phone: contact.data?.phone || "(555) 123-4567",
        email: contact.data?.email || "info@gphandysolutions.com",
        address: contact.data?.address || "123 Main St, Your City, State 12345",
        hours: contact.data?.hours || "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
        emergencyContact: contact.data?.emergencyContact || "(555) 123-4568",
        languages: contact.data?.languages || ["English", "Spanish"],
        socialNetworks: contact.data?.socialNetworks
      },
      contactSection: {
        comment: locale.includes('en') ? "Professional handyman services led by a woman who believes there are no limits, only results.": "Servicios profesionales de mantenimiento y reparación liderados por una mujer que cree que no hay límites, solo resultados.",
        titleSections: locale.includes('en') ? "Quick Links" : "Enlaces Rápidos",
        about: locale.includes('en') ? "About Us" : "Sobre Nosotros",
        services: locale.includes('en') ? "Our Services" : "Nuestros Servicios",
        portfolio: locale.includes('en') ? "Portfolio" : "Portafolio",
        getQuote: locale.includes('en') ? "Get Quote" : "Obtener Cotización",
        phone: locale.includes('en') ? "Phone number" : "Número de Teléfono",
        titleContact: locale.includes('en') ? "Contact Info" : "Información de Contacto",
        mainLine: locale.includes('en') ? "Main Line" : "Línea Principal",
        sendusemail: locale.includes('en') ? "Send us an email" : "Envíenos un correo electrónico",
        getdirections: locale.includes('en') ? "Get Directions" : "Obtener Direcciones",
        bussinesHours: locale.includes('en') ? "Business Hours" : "Horario de Atención",
        followUs: locale.includes('en') ? "Follow Us" : "Síguenos",
      }
    }
  } catch (error) {
    console.error('Error fetching Strapi data:', error)
    // Return fallback data if API is not available
    return {
      siteSettings: {
        colors: {
          primary: "#a855f7", // purple-500
          secondary: "#1f2937", // gray-800
          accent: "#10b981", // emerald-500
          background: "#ffffff",
          text: "#111827",
          textSecondary: "#ffffff",
          backgroundSecondary: "rgb(142, 142, 142)",
        },
        logo: "logo.svg",
        isMultilingual: true, // Para futuras implementaciones bilingües
      },
      hero: {
        title: "GP Handy Solutions LLC",
        subtitle: "No limits, only results",
        description: "We're a woman-led handyman team offering comprehensive home improvement services. From minor repairs to complete renovations, we bring passion, precision, and feminine inspiration to every project.",
        backgroundImage: "https://i.insider.com/61fd9496fa4f1f00182620d3?width=700",
        ctaText: "Get Free Quote",
      },
      about: {
        title: "Who We Are",
        subtitle: "More than just a service company",
        description: "At GP Handy Solutions LLC, we are the result of the dream and determination of a strong, empowered woman and dedicated mother who decided to make her way in a traditionally male-dominated industry. Our founder combined passion, discipline, and a unique perspective to prove that even in the most demanding jobs, there is room for heart, precision, and feminine inspiration.",
        mission: "To transform homes and spaces through comprehensive maintenance, repair, and cleaning solutions—led by a female vision that combines strength, empathy, and excellence. We are committed to delivering honest, punctual, and high-quality services, building trust with every client through respectful, well-executed work.",
        valueProposition: "At GP Handy Solutions LLC, we offer more than just services—we deliver peace of mind. Our approach combines technical expertise with human sensitivity, ensuring reliable results, attention to detail, and personalized care. We proudly stand out as a woman-led company that proves every project has room for perfection, dedication, and passion.",
        features: [
          "Woman-led business with a unique perspective",
          "Licensed and insured professionals",
          "Quality workmanship with attention to detail",
          "Competitive pricing and transparent quotes",
          "Customer satisfaction guaranteed"
        ],
        image: "https://i2.wp.com/hechingerreport.org/wp-content/uploads/2021/11/Preston-workforce-training5-and-FEAT-scaled.jpg?fit=2560%2C1707",
      },
      founder: {
        name: "Gina",
        title: "Founder & Lead Technician",
        subtitle: "An empowered woman who believes there are no limits, only solutions",
        story: "The idea for GP Handy Solutions was born from a very personal experience: like many women, I often found myself waiting for help to hang a picture, fix a small issue at home, or bring a decorating idea to life. The problem? I had to wait for the 'right moment'—when my husband, father, or a friend was available to help.",
        motivation: "Then I thought: why not create a solution that allows us to take control of our spaces, without having to depend on anyone? That's how this project came to life—with the mission of offering professional, fast, and reliable services designed for those who value independence, efficiency, and great design.",
        philosophy: "At GP Handy Solutions, we turn small tasks into big wins for your home.",
        image: "https://images.pexels.com/photos/5691533/pexels-photo-5691533.jpeg", // Professional woman with tools
      },
      services: {
        residential: {
          title: "Residential Services",
          categories: [
            {
              name: "General Repairs",
              icon: "Wrench",
              services: [
                "Minor plumbing repairs (faucets, leaks, toilets)",
                "Basic electrical repairs (outlets, switches, lamps)",
                "Door and window repairs (locks, hinges, adjustments)",
                "Drywall repair (patches, cracks)",
                "Furniture assembly",
                "TV wall mounting",
                "Cabinet and drawer adjustments"
              ]
            },
            {
              name: "Installations",
              icon: "Settings",
              services: [
                "Curtains, blinds, and shades",
                "Shelves, pictures, mirrors, wall décor",
                "Ceiling fans and lamps",
                "Bathroom safety bars"
              ]
            },
            {
              name: "Minor Remodeling",
              icon: "Paintbrush",
              services: [
                "Interior and exterior painting",
                "Floor installation (laminate, vinyl, ceramic)",
                "Baseboard and molding repair or replacement",
                "Wall coverings (backsplash, decorative tiles)",
                "Small bathroom renovations"
              ]
            },
            {
              name: "Maintenance",
              icon: "Shield",
              services: [
                "Leak and drainage inspection",
                "Window and door sealing",
                "Preventive maintenance checks",
                "Seasonal home preparations"
              ]
            }
          ]
        },
        cleaning: {
          title: "Cleaning Services",
          services: [
            "Post-construction cleaning",
            "Deep cleaning of hard-to-reach areas",
            "General cleaning",
            "Move-in/move-out cleaning"
          ]
        },
        commercial: {
          title: "Commercial Services",
          services: [
            "General office or store maintenance",
            "Internal signage installation",
            "Office furniture adjustments",
            "Support for light commercial remodeling"
          ]
        }
      },
      serviceSection: {
        title: "Our Services",
        subtitle: "Comprehensive handyman solutions for every needComprehensive solutions for your home and business needs. Click to explore each service category.", 
        //description: "From minor repairs to complete renovations, we bring passion, precision, and feminine inspiration to every project.",
        getQuote: "Get Quote for",

      },
      portfolio: [
        {
          id: 1,
          title: "Modern Kitchen Renovation",
          description: "Complete kitchen transformation with custom cabinets and granite countertops",
          category: "remodeling",
          type: "image",
          src: "https://images.pexels.com/photos/3718434/pexels-photo-3718434.jpeg",
          beforeImage: "https://images.pexels.com/photos/32752647/pexels-photo-32752647.jpeg",
          afterImage: "https://images.pexels.com/photos/3718434/pexels-photo-3718434.jpeg",
        },
        {
          id: 2,
          title: "Hardwood Floor Installation",
          description: "Beautiful oak hardwood flooring installation in living room",
          category: "flooring",
          type: "video",
          src: "https://videos.pexels.com/video-files/6473954/6473954-uhd_1440_2560_25fps.mp4",
          thumbnail: "https://images.pexels.com/photos/6474507/pexels-photo-6474507.jpeg",
        },
        {
          id: 3,
          title: "Bathroom Tile Work",
          description: "Custom bathroom tile installation with modern design",
          category: "flooring",
          type: "image",
          src: "https://images.pexels.com/photos/2988865/pexels-photo-2988865.jpeg",
        },
        {
          id: 4,
          title: "Exterior House Painting",
          description: "Complete exterior house painting with weather-resistant paint",
          category: "painting",
          type: "video",
          src: "https://videos.pexels.com/video-files/6474181/6474181-uhd_1440_2560_25fps.mp4",
          thumbnail: "https://images.pexels.com/photos/6473977/pexels-photo-6473977.jpeg",
        },
        {
          id: 5,
          title: "Deck Repair and Staining",
          description: "Deck restoration including repairs and protective staining",
          category: "repairs",
          type: "image",
          src: "https://images.pexels.com/photos/449023/pexels-photo-449023.jpeg",
          beforeImage: "https://images.pexels.com/photos/10111302/pexels-photo-10111302.jpeg",
          afterImage: "https://images.pexels.com/photos/26756410/pexels-photo-26756410.jpeg",
        },
        {
          id: 6,
          title: "Interior Room Makeover",
          description: "Complete room transformation with painting and minor repairs",
          category: "painting",
          type: "image",
          src: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
          beforeImage: "https://images.pexels.com/photos/735319/pexels-photo-735319.jpeg",
          afterImage: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        },
        {
          id: 7,
          title: "Cabinet Installation",
          description: "Custom cabinet installation and hardware upgrade",
          category: "carpentry",
          type: "image",
          src: "https://images.pexels.com/photos/6944254/pexels-photo-6944254.jpeg",
        },
        {
          id: 8,
          title: "Office Space Renovation",
          description: "Commercial office renovation with modern fixtures",
          category: "commercial",
          type: "image",
          src: "https://images.pexels.com/photos/6753532/pexels-photo-6753532.jpeg",
        },
      ],
      portfolioSection: {
        title: locale.includes('en') ? "Our Work" : "Nuestro Trabajo",
        subtitle: locale.includes('en') ? "Explore our portfolio of completed projects" : "Explore nuestro portafolio de proyectos completados",
      },
      contact: {
        phone: "(555) 123-456",
        email: "info@gphandysolutions.com",
        address: "123 Main St, Your City, State 12345",
        hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
        emergencyContact: "(555) 123-4568",
        languages: ["English", "Spanish"]
      },
    }
  }
}



