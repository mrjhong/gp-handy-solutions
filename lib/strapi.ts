// Simulación de datos de Strapi - En producción conectarías a tu API de Strapi
export async function getStrapiData() {
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