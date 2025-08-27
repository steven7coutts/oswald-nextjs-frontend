'use client'

import { useState } from 'react'

interface Service {
  _id: string
  title: string
  excerpt: string
  category: 'residential' | 'commercial' | 'specialist'
  serviceType: string
  featured?: boolean
  iconName?: string
}

interface ServicesProps {
  data: any
  services: Service[]
}

export default function Services({ data, services }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'specialist'>('all')

  if (!data || !services) return null

  // Filter services based on active filter
  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(service => service.category === activeFilter)

  // Icon mapping
  const iconMap: Record<string, string> = {
    kitchen: '🏠',
    wardrobe: '👔',
    window: '🪟',
    door: '🚪',
    staircase: '🪜',
    flooring: '🏗️',
    commercial: '🏢',
    residential: '🏡',
    specialist: '🔨',
    custom: '✨'
  }

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-[#C5862B] text-[#3A2B1A] font-accent text-sm uppercase tracking-wider mb-6 rounded-full shadow-lg border-2 border-[#C5862B]/20">
            Our Services
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A2B1A] mb-6">
            Specialist Joinery Services
          </h2>
          <p className="font-body text-xl text-[#2E2B29]/80 max-w-3xl mx-auto leading-relaxed font-medium">
            At Oswald Joinery & Contractors, we deliver high-quality craftsmanship tailored to your home or business. Every project is built around precision, durability, and timeless design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'All Services', count: services.length },
            { key: 'residential', label: 'Residential', count: services.filter(s => s.category === 'residential').length },
            { key: 'commercial', label: 'Commercial', count: services.filter(s => s.category === 'commercial').length },
            { key: 'specialist', label: 'Specialist', count: services.filter(s => s.category === 'specialist').length }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as 'all' | 'residential' | 'commercial' | 'specialist')}
              className={`
                px-6 py-3 rounded-full font-accent font-semibold transition-all duration-300
                ${activeFilter === filter.key
                  ? 'bg-[#3A2B1A] text-white shadow-lg scale-105 border-2 border-[#3A2B1A]'
                  : 'bg-white text-[#3A2B1A] hover:bg-[#F4E1C6]/20 hover:scale-105 border-2 border-[#C5862B]/40 hover:border-[#C5862B] shadow-md'
                }
              `}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const icon = iconMap[service.iconName || ''] || '🔧'
            
            return (
              <div
                key={service._id}
                className={`
                  group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl 
                  transition-all duration-500 transform hover:-translate-y-2 
                  border-2 border-[#C5862B]/40 hover:border-[#C5862B]/60
                  ${service.featured ? 'ring-2 ring-[#C5862B] ring-opacity-60' : ''}
                `}
              >
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-4 py-1 bg-[#C5862B] text-white font-accent text-sm font-bold rounded-full shadow-lg border-2 border-white">
                      ⭐ Featured
                    </div>
                  </div>
                )}

                {/* Service Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#C5862B] to-[#F4E1C6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-3xl">{icon}</span>
                </div>

                {/* Service Content */}
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-[#3A2B1A] mb-3 group-hover:text-[#C5862B] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-[#2E2B29]/80 leading-relaxed font-medium">
                    {service.excerpt}
                  </p>
                </div>

                {/* Category & Service Type Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="px-3 py-1 bg-[#C5862B] text-[#3A2B1A] font-accent text-sm rounded-full border border-[#C5862B] font-bold shadow-lg">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </div>
                  <div className="px-3 py-1 bg-[#F4E1C6]/80 text-[#3A2B1A] font-accent text-sm rounded-full border border-[#C5862B]/60 font-semibold shadow-sm">
                    {service.serviceType}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5862B] to-[#F4E1C6] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#3A2B1A] text-white rounded-full font-accent font-semibold hover:bg-[#6B4226] transition-colors duration-300 cursor-pointer group shadow-lg">
            <span>View All Services</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
