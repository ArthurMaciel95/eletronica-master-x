"use client";

import { useState, useEffect } from 'react'

interface Service {
  _id: string
  title: string
  description: string
  features: string[]
  icon: string
  active: boolean
  order: number
}

interface FallbackService {
  icon: JSX.Element
  title: string
  description: string
  features: string[]
}

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (err) {
      console.error('Erro ao carregar serviços:', err)
    } finally {
      setLoading(false)
    }
  }

  const brands = [
    {
      name: "Samsung",
      logo: "https://cdn.worldvectorlogo.com/logos/samsung-2.svg",
    },
    {
      name: "LG",
      logo: "https://cdn.worldvectorlogo.com/logos/lg-3.svg",
    },
    {
      name: "Sony",
      logo: "https://cdn.worldvectorlogo.com/logos/sony-6.svg",
    },
    {
      name: "Philips",
      logo: "https://cdn.worldvectorlogo.com/logos/philips-2.svg",
    },
    {
      name: "Panasonic",
      logo: "https://cdn.worldvectorlogo.com/logos/panasonic-2.svg",
    },
    {
      name: "Sharp",
      logo: "https://cdn.worldvectorlogo.com/logos/sharp-2.svg",
    },
    {
      name: "TCL",
      logo: "https://cdn.worldvectorlogo.com/logos/tcl-1.svg",
    },
    {
      name: "Hisense",
      logo: "https://cdn.worldvectorlogo.com/logos/hisense-1.svg",
    },
    {
      name: "AOC",
      logo: "https://cdn.worldvectorlogo.com/logos/aoc-1.svg",
    },
    {
      name: "JVC",
      logo: "https://cdn.worldvectorlogo.com/logos/jvc-1.svg",
    },
    {
      name: "Toshiba",
      logo: "https://cdn.worldvectorlogo.com/logos/toshiba-1.svg",
    },
    {
      name: "Hitachi",
      logo: "https://cdn.worldvectorlogo.com/logos/hitachi-1.svg",
    },
  ];

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      tv: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      smartphone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      electronics: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      computer: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      camera: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      headphones: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    }
    return icons[iconName] || icons.electronics
  }

  // Fallback services se não houver dados do banco
  const fallbackServices: FallbackService[] = [
    {
      icon: getIconComponent('tv'),
      title: "Conserto de TVs",
      description: "Reparo especializado em TVs de todas as marcas, incluindo Smart TVs, 4K e OLED.",
      features: ["Diagnóstico gratuito", "Garantia de 90 dias", "Peças originais"],
    },
    {
      icon: getIconComponent('smartphone'),
      title: "Manutenção de Smartphones",
      description: "Conserto de smartphones e tablets com técnicos certificados e peças de qualidade.",
      features: ["Troca de tela", "Substituição de bateria", "Reparo de placa"],
    },
    {
      icon: getIconComponent('electronics'),
      title: "Reparo de Eletrônicos",
      description: "Serviços de manutenção para diversos equipamentos eletrônicos domésticos.",
      features: ["Sistemas de som", "Videogames", "Eletrodomésticos"],
    },
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section id="servicos" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Especialistas em conserto e manutenção de eletrônicos com anos de
            experiência no mercado
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {displayServices.map((service, index) => (
            <div
              key={'_id' in service ? service._id : index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-primary-600 mb-4">
                {'icon' in service && typeof service.icon === 'string' ? getIconComponent(service.icon) : service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brands Marquee */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Marcas que Trabalhamos
          </h3>

          <div className="marquee-container">
            <div className="marquee">
              {/* First set of brands */}
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center w-32 h-16 bg-gray-50 rounded-lg  mx-2"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-600 font-semibold text-sm">${brand.name}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {brands.map((brand, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 flex  items-center justify-center w-32 h-16 bg-gray-50 rounded-lg  mx-2"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-600 font-semibold text-sm">${brand.name}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}
