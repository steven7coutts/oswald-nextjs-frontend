'use client'

import { useState } from 'react'
import { Service as SharedService, HomepageData } from '@/lib/types'

interface ServicesProps {
  data: HomepageData
  services: SharedService[]
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
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-[#C5862B] text-[#3A2B1A] font-accent text-xs sm:text-sm md:text-base uppercase tracking-wider mb-4 sm:mb-6 md:mb-8 rounded-full shadow-lg border-2 border-[#C5862B]/20">
            Our Services
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3A2B1A] mb-4 sm:mb-6 md:mb-8 leading-tight">
            Specialist Joinery Services
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-[#2E2B29]/80 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-medium px-4">
            At Oswald Joinery & Contractors, we deliver high-quality craftsmanship tailored to your home or business. Every project is built around precision, durability, and timeless design.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16 px-4">
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
                px-4 py-2 rounded-lg font-accent font-medium transition-all duration-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C5862B] focus:ring-offset-2
                ${activeFilter === filter.key
                  ? 'bg-[#C5862B] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0">
          {filteredServices.map((service) => {
            const icon = iconMap[service.iconName || ''] || '🔧'
            
            return (
              <div
                key={service._id}
                className={`
                  group relative bg-white rounded-xl p-6 sm:p-8 
                  transition-all duration-300 ease-out
                  border border-gray-100 hover:border-[#C5862B]/30
                  shadow-sm hover:shadow-md
                  ${service.featured ? 'ring-1 ring-[#C5862B]/20' : ''}
                `}
                tabIndex={0}
              >
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="px-2.5 py-1 bg-[#C5862B]/10 text-[#C5862B] font-accent text-xs font-medium rounded-full border border-[#C5862B]/20">
                      Featured
                    </div>
                  </div>
                )}

                {/* Service Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F4E1C6]/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#C5862B]/10 transition-colors duration-300">
                  <span className="text-lg sm:text-xl text-[#3A2B1A]">{icon}</span>
                </div>

                {/* Service Content */}
                <div className="mb-4">
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#3A2B1A] mb-3 group-hover:text-[#C5862B] transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#2E2B29]/70 leading-relaxed">
                    {service.excerpt}
                  </p>
                </div>

                {/* Category & Service Type Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 bg-[#C5862B]/10 text-[#C5862B] font-accent text-xs font-medium rounded-md border border-[#C5862B]/20">
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </div>
                  <div className="px-3 py-1.5 bg-gray-50 text-gray-600 font-accent text-xs font-medium rounded-md border border-gray-200">
                    {service.serviceType}
                  </div>
                </div>
              </div>
            )
          })}
        </div>


      </div>
    </section>
  )
}
