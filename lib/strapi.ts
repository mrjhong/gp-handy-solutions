// Simulación de datos de Strapi - En producción conectarías a tu API de Strapi
export async function getStrapiData() {
  // En producción: const response = await fetch(`${process.env.STRAPI_URL}/api/...`)
  return {
    siteSettings: {
      colors: {
        primary: "#f59e0b", // amber-500
        secondary: "#1f2937", // gray-800
        accent: "#10b981", // emerald-500
        background: "#ffffff",
        text: "#111827",
      },
      logo: "/placeholder.svg?height=60&width=200",
    },
    hero: {
      title: "GP Handy Solutions LLC",
      subtitle: "No limits, only results",
      description:
        "We're a woman-led handyman team offering painting, flooring, carpentry, and small repairs. Need a hand?",
      backgroundImage: "/placeholder.svg?height=600&width=1200",
      ctaText: "Get Free Quote",
    },
    services: [
      {
        id: 1,
        title: "Painting Services",
        description: "Professional interior and exterior painting with premium materials",
        icon: "Paintbrush",
        price: "Starting at $200",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 2,
        title: "Flooring Installation",
        description: "Expert flooring installation including hardwood, laminate, and tile",
        icon: "Home",
        price: "Starting at $500",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 3,
        title: "Carpentry Work",
        description: "Custom carpentry solutions for your home improvement needs",
        icon: "Hammer",
        price: "Starting at $150",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: 4,
        title: "Small Repairs",
        description: "Quick fixes and maintenance for all your household needs",
        icon: "Wrench",
        price: "Starting at $75",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    about: {
      title: "About GP Handy Solutions",
      description:
        "We are a woman-led handyman team dedicated to providing exceptional home improvement services. Our experienced professionals take pride in delivering quality workmanship and outstanding customer service.",
      features: [
        "Woman-led business",
        "Licensed and insured",
        "Quality workmanship",
        "Competitive pricing",
        "Customer satisfaction guaranteed",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    contact: {
      phone: "(555) 123-4567",
      email: "info@gphandysolutions.com",
      address: "123 Main St, Your City, State 12345",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    },
  }
}
