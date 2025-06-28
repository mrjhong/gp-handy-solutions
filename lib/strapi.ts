// Simulación de datos de Strapi - En producción conectarías a tu API de Strapi
export async function getStrapiData() {
  // En producción: const response = await fetch(`${process.env.STRAPI_URL}/api/...`)
  return {
    siteSettings: {
      colors: {
        primary: "#f3d200", // amber-500
        secondary: "#1f2937", // gray-800
        accent: "#10b981", // emerald-500
        background: "#ffffff",
        text: "#111827",
        textSecondary: "#ffffff", // gray-600
        backgroundSecondary: "rgb(142, 142, 142)", // gray-100
      },
      logo: "logo.svg",
    },
    hero: {
      title: "GP Handy Solutions LLC",
      subtitle: "No limits, only results",
      description:
        "We're a woman-led handyman team offering painting, flooring, carpentry, and small repairs. Need a hand?",
      backgroundImage: "https://i.insider.com/61fd9496fa4f1f00182620d3?width=700",
      ctaText: "Get Free Quote",
    },
    services: [
      {
        id: 1,
        title: "Painting Services",
        description: "Professional interior and exterior painting with premium materials",
        icon: "Paintbrush",
        price: "Starting at $200",
        image: "https://cdn.pixabay.com/photo/2017/09/15/10/24/painter-2751666_960_720.jpg",
      },
      {
        id: 2,
        title: "Flooring Installation",
        description: "Expert flooring installation including hardwood, laminate, and tile",
        icon: "Home",
        price: "Starting at $500",
        image: "https://cdn.prod.website-files.com/63a3580a87c65a794cfe8ba6/64adf0dc122a4dd4e0ec7354_6491edabf7b93bf51ee55887_floor-care-team.webp",
      },
      {
        id: 3,
        title: "Carpentry Work",
        description: "Custom carpentry solutions for your home improvement needs",
        icon: "Hammer",
        price: "Starting at $150",
        image: "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/483717698ConstructionLaborer.jpg=ws1280x960",
      },
      {
        id: 4,
        title: "Small Repairs",
        description: "Quick fixes and maintenance for all your household needs",
        icon: "Wrench",
        price: "Starting at $75",
        image: "https://cdn.prod.website-files.com/64d1eaa53f7e6a152b0a0722/67d88322581111d4590cf366_general-carpentry.webp",
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
      image: "https://i2.wp.com/hechingerreport.org/wp-content/uploads/2021/11/Preston-workforce-training5-and-FEAT-scaled.jpg?fit=2560%2C1707",
    },
    contact: {
      phone: "(555) 123-4567",
      email: "info@gphandysolutions.com",
      address: "123 Main St, Your City, State 12345",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    },
  }
}
