'use client'

import Image from 'next/image'
import { urlFor } from '../lib/sanity.image'
import { HomepageData } from '../lib/types'

interface AboutProps {
  data: HomepageData
}

export default function About({ data }: AboutProps) {
  if (!data) return null

  // Default stats if none provided in Sanity
  const defaultStats = [
    { number: '10+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '100%', label: 'Satisfaction' }
  ]

  const stats = data.aboutStats || defaultStats

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-[#3A2B1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 bg-[#C5862B]/20 border border-[#C5862B]/30 rounded-full text-[#C5862B] font-accent text-xs sm:text-sm md:text-base uppercase tracking-wider mb-4 sm:mb-6 md:mb-8">
              About Us
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F4E1C6] mb-6 sm:mb-8 md:mb-10 leading-tight">
              {data.aboutHeading || 'Craftsmanship with Integrity'}
            </h2>
            
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-[#F4E1C6]/90">
              <p className="font-body text-base sm:text-lg md:text-xl leading-relaxed">
                {data.aboutBody || 'We combine traditional skills with modern tooling to deliver flawless finishes and long-lasting results.'}
              </p>
              
              {/* Additional content from Sanity */}
              {data.aboutAdditionalContent && (
                <p className="font-body text-base sm:text-lg md:text-xl leading-relaxed">
                  {data.aboutAdditionalContent}
                </p>
              )}
            </div>

            {/* Dynamic Stats from Sanity */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-8 sm:mt-10 md:mt-12 pt-8 sm:pt-10 md:pt-12 border-t border-[#C5862B]/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#C5862B] mb-1 sm:mb-2 md:mb-3">
                    {stat.number}
                  </div>
                  <div className="font-accent text-xs sm:text-sm md:text-base text-[#F4E1C6]/70 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Image from Sanity or Fallback */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            {data.aboutImage ? (
              // Real image from Sanity
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={urlFor(data.aboutImage).width(600).height(600).fit('crop').url()}
                  alt={data.aboutImage.alt || 'About Oswald Joinery'}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            ) : (
              // Fallback placeholder
              <div className="aspect-square bg-gradient-to-br from-[#C5862B]/20 to-[#6B4226]/20 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-[#C5862B]/30">
                <div className="w-full h-full bg-gradient-to-br from-[#F4E1C6]/10 to-[#C5862B]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-[#C5862B]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Floating Elements - Responsive positioning */}
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#C5862B] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-[#6B4226] rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

