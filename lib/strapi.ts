// Simulación de datos de Strapi - En producción conectarías a tu API de Strapi
export async function getStrapiData() {
  // En producción: const response = await fetch(`${process.env.STRAPI_URL}/api/...`)
  return {
    siteSettings: {
      colors: {
        //primary: "#f3d200", // amber-500
        //morado "#a855f7", // purple-500
        primary : "#a855f7", // amber-500
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
    portfolio: [
      {
        id: 1,
        title: "Modern Kitchen Renovation",
        description: "Complete kitchen transformation with custom cabinets and granite countertops",
        category: "painting",
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
